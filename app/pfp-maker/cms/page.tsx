"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Upload, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Database,
  Image as ImageIcon,
  Layers,
  ArrowLeft,
  Shield,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react"
import Link from "next/link"

// Asset categories matching the PFP generator
const ASSET_CATEGORIES = [
  { id: "shoes", name: "Shoes", layer: 1, icon: "👟" },
  { id: "pants", name: "Pants", layer: 2, icon: "👖" },
  { id: "tops", name: "Tops", layer: 3, icon: "👕" },
  { id: "eyewear", name: "Eyewear", layer: 4, icon: "👓" },
  { id: "hair", name: "Hair", layer: 5, icon: "💇" },
  { id: "headgear", name: "Headgear", layer: 6, icon: "🎩" },
  { id: "accessories", name: "Accessories", layer: 7, icon: "⌚" },
]

interface Asset {
  filename: string
  name: string
  category: string
  uploadDate: Date
}

export default function PFPCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessCode, setAccessCode] = useState("")
  
  const [activeTab, setActiveTab] = useState("upload")
  const [assets, setAssets] = useState<Record<string, string[]>>({})
  const [selectedCategory, setSelectedCategory] = useState("shoes")
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [showUploadForm, setShowUploadForm] = useState(false)
  
  const [newAssetName, setNewAssetName] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [uploadMessage, setUploadMessage] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAuthentication = () => {
    // Multiple valid access codes for different team members
    const validCodes = [
      "PSX-ADMIN-2024",
      "DEV-ACCESS-7891",
      "CREATOR-KEY-5432",
      process.env.NEXT_PUBLIC_CMS_OVERRIDE // Allow env override
    ].filter(Boolean)
    
    if (validCodes.includes(accessCode)) {
      setIsAuthenticated(true)
      // Use session storage instead of localStorage for better security
      sessionStorage.setItem('cmsAuth', 'true')
      sessionStorage.setItem('cmsAuthTime', Date.now().toString())
    } else {
      // Generic error message to avoid revealing system details
      alert("Access denied.")
      setAccessCode("")
      // Log failed attempts (in production, this would go to a security service)
      console.warn(`Failed CMS access attempt at ${new Date().toISOString()}`)
    }
  }

  useEffect(() => {
    const auth = sessionStorage.getItem('cmsAuth')
    const authTime = sessionStorage.getItem('cmsAuthTime')
    
    // Check if auth exists and is less than 4 hours old
    if (auth === 'true' && authTime) {
      const timeDiff = Date.now() - parseInt(authTime)
      const fourHours = 4 * 60 * 60 * 1000
      
      if (timeDiff < fourHours) {
        setIsAuthenticated(true)
      } else {
        // Clear expired auth
        sessionStorage.removeItem('cmsAuth')
        sessionStorage.removeItem('cmsAuthTime')
      }
    }
  }, [])

  // Load current assets from assets.json
  const loadAssets = async () => {
    try {
      const response = await fetch('/src/data/assets.json')
      const assetsData = await response.json()
      setAssets(assetsData)
    } catch (error) {
      console.error('Failed to load assets:', error)
      // Initialize with empty arrays for each category
      const emptyAssets: Record<string, string[]> = {}
      ASSET_CATEGORIES.forEach(cat => {
        emptyAssets[cat.id] = []
      })
      setAssets(emptyAssets)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadAssets()
    }
  }, [isAuthenticated])

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    const newFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/') && 
      ['png', 'jpg', 'jpeg', 'webp'].includes(file.type.split('/')[1])
    )
    setUploadedFiles(newFiles)
    if (newFiles.length > 0) {
      setShowUploadForm(true)
    }
  }

  const handleDragOver = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault()
    setDragOver(categoryId)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(null)
  }

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault()
    setDragOver(null)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setSelectedCategory(categoryId)
      handleFileUpload(files)
    }
  }

  const saveAsset = async () => {
    if (!newAssetName || !selectedCategory || uploadedFiles.length === 0) {
      setUploadMessage("Please provide asset name and select files")
      setUploadStatus("error")
      return
    }

    setUploadStatus("uploading")
    setUploadMessage("Uploading assets...")

    try {
      console.log('Starting upload process...', { 
        category: selectedCategory, 
        name: newAssetName, 
        fileCount: uploadedFiles.length 
      })

      const uploadPromises = uploadedFiles.map(async (file, index) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('category', selectedCategory)
        formData.append('name', uploadedFiles.length > 1 ? `${newAssetName}-${index + 1}` : newAssetName)

        console.log(`Uploading file ${index + 1}:`, file.name, file.type, file.size)

        const response = await fetch('/api/pfp-assets/upload', {
          method: 'POST',
          body: formData,
        })

        const responseText = await response.text()
        console.log('Upload response:', response.status, responseText)

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.status} - ${responseText}`)
        }

        return JSON.parse(responseText)
      })

      const results = await Promise.all(uploadPromises)
      console.log('Upload results:', results)
      
      // Update assets.json
      const updatedAssets = { ...assets }
      results.forEach(result => {
        const filename = result.filename
        if (!updatedAssets[selectedCategory]) {
          updatedAssets[selectedCategory] = []
        }
        updatedAssets[selectedCategory].push(filename)
      })

      console.log('Updating assets.json:', updatedAssets)

      // Save updated assets.json
      const jsonResponse = await fetch('/api/pfp-assets/update-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAssets),
      })

      if (!jsonResponse.ok) {
        console.error('Failed to update assets.json:', await jsonResponse.text())
        throw new Error('Failed to update asset metadata')
      }

      setAssets(updatedAssets)
      setUploadStatus("success")
      setUploadMessage(`Successfully uploaded ${results.length} asset(s)`)
      
      // Reset form
      setNewAssetName("")
      setUploadedFiles([])
      setShowUploadForm(false)
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setUploadStatus("idle")
        setUploadMessage("")
      }, 3000)

    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus("error")
      setUploadMessage(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const deleteAsset = async (category: string, filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) return

    try {
      // Remove from file system
      const response = await fetch('/api/pfp-assets/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, filename }),
      })

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      // Update assets.json
      const updatedAssets = { ...assets }
      updatedAssets[category] = updatedAssets[category].filter(f => f !== filename)

      await fetch('/api/pfp-assets/update-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAssets),
      })

      setAssets(updatedAssets)
      alert('Asset deleted successfully')
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete asset')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
        
        <Card className="bg-black/80 border-cyan-400/30 backdrop-blur-3xl w-full max-w-md relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-cyan-400 flex items-center justify-center gap-3">
              <Shield className="h-6 w-6" />
              CMS Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="accessCode" className="text-cyan-400 font-medium">
                Access Code
              </Label>
              <Input
                id="accessCode"
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
                className="bg-black/40 border-cyan-400/30 text-white placeholder-gray-400 focus:border-cyan-400/50 rounded-xl mt-2"
                placeholder="Enter CMS access code"
              />
            </div>
            <Button
              onClick={handleAuthentication}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
            >
              Authenticate
            </Button>
            <div className="text-center">
              <Link 
                href="/pfp-maker" 
                className="text-cyan-400/60 hover:text-cyan-400 text-sm transition-colors"
              >
                ← Back to PFP Maker
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              href="/pfp-maker" 
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to PFP Maker
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PFP Asset CMS
            </h1>
            <p className="text-gray-300 mt-2">
              Manage your PFP generator assets with drag & drop simplicity
            </p>
          </div>
          <Button
            onClick={loadAssets}
            variant="outline"
            className="border-cyan-400/30 hover:border-cyan-400/50 text-cyan-400"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-black/40 border border-cyan-400/20 rounded-xl p-1">
            <TabsTrigger 
              value="upload" 
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 text-gray-400 rounded-lg px-6 py-2"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Assets
            </TabsTrigger>
            <TabsTrigger 
              value="manage" 
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 text-gray-400 rounded-lg px-6 py-2"
            >
              <Database className="h-4 w-4 mr-2" />
              Manage Assets
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400 text-gray-400 rounded-lg px-6 py-2"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Drag & Drop Areas */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                  Drag & Drop Upload
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {ASSET_CATEGORIES.map((category) => (
                    <div
                      key={category.id}
                      onDragOver={(e) => handleDragOver(e, category.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, category.id)}
                      className={`
                        border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer
                        ${dragOver === category.id 
                          ? 'border-cyan-400 bg-cyan-400/10' 
                          : 'border-gray-600 hover:border-gray-500'
                        }
                      `}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        fileInputRef.current?.click()
                      }}
                    >
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="text-sm font-medium text-cyan-400">{category.name}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {assets[category.id]?.length || 0} assets
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload Form */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">
                  Upload Details
                </h3>
                
                {showUploadForm && (
                  <Card className="bg-black/60 border-purple-400/20 backdrop-blur-3xl">
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <Label className="text-purple-400 font-medium">Asset Name</Label>
                        <Input
                          value={newAssetName}
                          onChange={(e) => setNewAssetName(e.target.value)}
                          className="bg-black/40 border-purple-400/30 text-white placeholder-gray-400 focus:border-purple-400/50 rounded-xl mt-2"
                          placeholder="Enter asset name"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-purple-400 font-medium">Category</Label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="bg-black/40 border-purple-400/30 text-white focus:border-purple-400/50 rounded-xl mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-purple-400/30">
                            {ASSET_CATEGORIES.map((category) => (
                              <SelectItem key={category.id} value={category.id} className="text-white hover:bg-purple-500/20">
                                {category.icon} {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div>
                          <Label className="text-purple-400 font-medium">Files to Upload</Label>
                          <div className="mt-2 space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-black/40 rounded-lg">
                                <ImageIcon className="h-4 w-4 text-purple-400" />
                                <span className="text-sm text-white flex-1">{file.name}</span>
                                <span className="text-xs text-gray-400">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button
                          onClick={saveAsset}
                          disabled={uploadStatus === "uploading"}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all"
                        >
                          {uploadStatus === "uploading" ? "Uploading..." : "Save Asset"}
                        </Button>
                        <Button
                          onClick={() => {
                            setShowUploadForm(false)
                            setUploadedFiles([])
                            setNewAssetName("")
                          }}
                          variant="outline"
                          className="border-gray-600 hover:border-gray-500 text-gray-400 rounded-xl"
                        >
                          Cancel
                        </Button>
                      </div>

                      {uploadMessage && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${
                          uploadStatus === "success" 
                            ? "bg-green-500/20 text-green-400" 
                            : uploadStatus === "error"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}>
                          {uploadStatus === "success" && <CheckCircle className="h-4 w-4" />}
                          {uploadStatus === "error" && <XCircle className="h-4 w-4" />}
                          <span className="text-sm">{uploadMessage}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
          </TabsContent>

          {/* Manage Tab */}
          <TabsContent value="manage" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {ASSET_CATEGORIES.map((category) => (
                <Card key={category.id} className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl">
                  <CardHeader>
                    <CardTitle className="text-lg text-cyan-400 flex items-center gap-3">
                      <span className="text-xl">{category.icon}</span>
                      {category.name}
                      <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-1 rounded">
                        {assets[category.id]?.length || 0}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {assets[category.id]?.length > 0 ? (
                      assets[category.id].map((filename) => (
                        <div key={filename} className="flex items-center gap-3 p-3 bg-black/40 rounded-lg">
                          <img
                            src={`/assets/${category.id}/${filename}`}
                            alt={filename}
                            className="w-12 h-12 object-cover rounded-lg border border-cyan-400/20"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg'
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">{filename}</div>
                            <div className="text-xs text-gray-400">Layer {category.layer}</div>
                          </div>
                          <Button
                            onClick={() => deleteAsset(category.id, filename)}
                            variant="outline"
                            size="sm"
                            className="border-red-400/30 hover:border-red-400/50 text-red-400 hover:bg-red-500/10 p-2 rounded-lg"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No assets uploaded</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-400 flex items-center gap-3">
                  <Settings className="h-5 w-5" />
                  CMS Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-4">Storage Info</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-cyan-400 font-medium">Asset Path</Label>
                        <Input
                          value="/public/assets/[category]/"
                          className="bg-black/40 border-cyan-400/20 rounded-xl focus:border-cyan-400/40 transition-colors mt-2"
                          readOnly
                        />
                      </div>
                      <div>
                        <Label className="text-cyan-400 font-medium">Metadata File</Label>
                        <Input
                          value="/src/data/assets.json"
                          className="bg-black/40 border-cyan-400/20 rounded-xl focus:border-cyan-400/40 transition-colors mt-2"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-4">System Status</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">System Online</span>
                        </div>
                        <p className="text-emerald-400/80 text-sm">
                          All CMS functions operational
                        </p>
                      </div>
                      
                      <div className="text-sm text-gray-400 space-y-2">
                        <div>• Drag & drop upload: ✓ Active</div>
                        <div>• Asset management: ✓ Active</div>
                        <div>• Dynamic loading: ✓ Active</div>
                        <div>• No rebuild required: ✓ Active</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-pink-400 mb-4">Suggested Categories</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <h4 className="font-medium text-pink-400">Future Expansions:</h4>
                      <ul className="text-gray-400 space-y-1">
                        <li>• Background styles (gradients, patterns)</li>
                        <li>• Masks / Face accessories</li>
                        <li>• Props (hand-held objects)</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-pink-400">Creative Options:</h4>
                      <ul className="text-gray-400 space-y-1">
                        <li>• Pets / Side characters</li>
                        <li>• Animated overlays</li>
                        <li>• Themed scenes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
