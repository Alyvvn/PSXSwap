# PSX PFP Maker Setup Guide

## Overview
The PSX PFP Maker is a comprehensive profile picture generator with a CMS for managing assets. It allows users to create custom characters by combining different visual elements like backgrounds, clothing, accessories, and effects.

## Features

### PFP Maker (`/pfp-maker`)
- **Character Customization**: 8 asset categories with layering system
- **Real-time Preview**: Canvas-based character rendering
- **Effects System**: Glitch, hologram, particle effects
- **Advanced Controls**: Opacity, rotation, scale, color tinting
- **Download Options**: Multiple resolutions (256x256 to 2048x2048)
- **Rarity System**: Dynamic scoring based on asset combinations
- **Character Codes**: Shareable character configurations

### CMS (`/pfp-maker/cms`)
- **Asset Management**: Upload, organize, and manage visual assets
- **Category Organization**: 8 predefined asset categories
- **Metadata Management**: Rarity, themes, tags, character specificity
- **Drag & Drop Upload**: Intuitive file upload system
- **Asset Library**: Search, filter, and organize assets
- **Status Control**: Activate/deactivate assets

## Asset Categories

1. **Background** (Layer 0): Base backgrounds
2. **Base Character** (Layer 1): Main character models
3. **Skin Tone** (Layer 2): Character skin variations
4. **Clothing** (Layer 4): Outfits and apparel
5. **Eyewear** (Layer 8): Glasses, visors, implants
6. **Hair** (Layer 9): Hair styles and colors
7. **Headgear** (Layer 10): Hats, helmets, accessories
8. **Effects** (Layer 12): Visual effects and overlays

## File Structure

```
app/
├── pfp-maker/
│   ├── page.tsx          # Main PFP maker interface
│   └── cms/
│       └── page.tsx      # CMS management interface
├── api/
│   └── pfp-assets/
│       └── upload/
│           └── route.ts  # Asset upload API
public/
└── uploads/
    └── pfp-assets/       # Asset storage directory
        ├── background/
        ├── base/
        ├── skin/
        ├── clothing/
        ├── eyewear/
        ├── hair/
        ├── headgear/
        └── effects/
```

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ 
- Next.js 14+
- TypeScript
- Tailwind CSS

### 2. Installation
```bash
# Navigate to project directory
cd psx

# Install dependencies (if not already installed)
npm install
# or
pnpm install
```

### 3. Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Follow the prompts to connect your GitHub repo
# Vercel will automatically detect Next.js and configure everything
```

### 3. Directory Setup
```bash
# Create asset storage directories
mkdir -p public/uploads/pfp-assets/{background,base,skin,clothing,eyewear,hair,headgear,effects}
```

### 4. Environment Configuration
Create or update your `.env.local` file:
```env
# File upload settings
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_IMAGE_TYPES=image/png,image/jpeg,image/jpg,image/webp
UPLOAD_PATH=/public/uploads/pfp-assets
```

### 5. Database Migration (Future)
When ready to migrate from file system to database:

#### Option A: PostgreSQL (Recommended)
```sql
-- Create assets table
CREATE TABLE pfp_assets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    rarity VARCHAR(20) DEFAULT 'common',
    theme VARCHAR(50) DEFAULT 'base',
    character_specific VARCHAR(100),
    layer INTEGER DEFAULT 0,
    file_path VARCHAR(500) NOT NULL,
    preview_url VARCHAR(500),
    tags TEXT[],
    is_active BOOLEAN DEFAULT true,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

-- Create indexes for performance
CREATE INDEX idx_pfp_assets_category ON pfp_assets(category);
CREATE INDEX idx_pfp_assets_rarity ON pfp_assets(rarity);
CREATE INDEX idx_pfp_assets_theme ON pfp_assets(theme);
CREATE INDEX idx_pfp_assets_active ON pfp_assets(is_active);
```

#### Option B: SQLite (Development)
```sql
CREATE TABLE pfp_assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    rarity TEXT DEFAULT 'common',
    theme TEXT DEFAULT 'base',
    character_specific TEXT,
    layer INTEGER DEFAULT 0,
    file_path TEXT NOT NULL,
    preview_url TEXT,
    tags TEXT,
    is_active INTEGER DEFAULT 1,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    metadata TEXT
);
```

## Usage

### For Users
1. Navigate to `/pfp-maker`
2. Use navigation arrows to cycle through assets in each category
3. Adjust effects and visual properties
4. Download your character in various resolutions
5. Share character codes with others

### For Developers/Creative Team
1. Navigate to `/pfp-maker/cms`
2. Use the Upload tab to add new assets
3. Drag & drop files onto category zones
4. Fill in asset metadata (name, description, rarity, theme)
5. Organize assets by category in the Organize tab
6. Monitor asset status and performance

## Asset Requirements

### Image Specifications
- **Format**: PNG, JPG, JPEG, WebP
- **Size**: Maximum 10MB per file
- **Dimensions**: Recommended 512x512 or higher (will be scaled)
- **Transparency**: PNG with alpha channel supported
- **Quality**: High quality, optimized for web

### Naming Convention
```
{category}-{name}-{variant}.{extension}
Examples:
- clothing-cyber-hoodie-red.png
- eyewear-smart-glasses-gold.png
- headgear-neural-crown-legendary.png
```

## API Endpoints

### Upload Asset
```http
POST /api/pfp-assets/upload
Content-Type: multipart/form-data

Fields:
- file: Image file
- category: Asset category
- name: Asset name
```

### Response Format
```json
{
  "success": true,
  "filename": "cyber-hoodie-1703123456789.png",
  "filepath": "/uploads/pfp-assets/clothing/cyber-hoodie-1703123456789.png",
  "category": "clothing",
  "name": "Cyber Hoodie",
  "size": 245760,
  "type": "image/png"
}
```

## Customization

### Adding New Categories
1. Update `ASSET_CATEGORIES` in both PFP maker and CMS
2. Add category to database schema (if using database)
3. Create corresponding upload directory
4. Update API validation

### Adding New Effects
1. Extend effects state in PFP maker
2. Add effect controls to UI
3. Implement effect logic in canvas rendering
4. Update download function to include new effects

### Theme System
The system supports multiple themes:
- **base**: Universal assets
- **cyberpunk**: Futuristic, neon aesthetic
- **digital**: Tech-focused elements
- **neon**: Bright, colorful effects
- **human**: Realistic human features
- **tech**: Modern technology elements
- **corporate**: Business/professional style
- **hologram**: Transparent, glowing effects
- **glitch**: Digital corruption effects

## Performance Considerations

### File Optimization
- Compress images before upload
- Use appropriate formats (WebP for photos, PNG for graphics)
- Implement lazy loading for asset previews
- Cache frequently used assets

### Database Optimization
- Index frequently queried fields
- Implement pagination for large asset libraries
- Use connection pooling for database connections
- Consider CDN for asset delivery

## Security

### File Upload Security
- Validate file types and sizes
- Sanitize filenames
- Implement rate limiting
- Scan for malware (consider integration with antivirus services)

### Access Control
- Implement authentication for CMS access
- Role-based permissions for asset management
- Audit logging for all operations
- Secure file storage paths

## Troubleshooting

### Common Issues

1. **Assets not loading**
   - Check file paths and permissions
   - Verify image format compatibility
   - Check browser console for errors

2. **Upload failures**
   - Verify file size limits
   - Check directory permissions
   - Validate file format

3. **Performance issues**
   - Optimize image sizes
   - Implement lazy loading
   - Use CDN for asset delivery

### Debug Mode
Enable debug logging by setting environment variable:
```env
DEBUG_PFP_MAKER=true
```

## Future Enhancements

### Planned Features
- **AI Generation**: AI-powered asset creation
- **Community Assets**: User-submitted content
- **Marketplace**: Asset trading system
- **Animation**: Animated character effects
- **3D Support**: 3D model integration
- **Mobile App**: Native mobile application

### Integration Opportunities
- **NFT Minting**: Direct NFT creation
- **Social Sharing**: Enhanced social media integration
- **Analytics**: Usage and performance metrics
- **A/B Testing**: Asset performance testing
- **Machine Learning**: Asset recommendation system

## Support

For technical support or feature requests:
- Create an issue in the project repository
- Contact the development team
- Check the documentation wiki
- Join the community Discord

## Vercel Deployment

### Quick Deploy
The PFP Maker is **100% ready for Vercel deployment**:

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   Add these to your Vercel dashboard:
   ```
   ALLOWED_CMS_USERS=dev1@psx.com,dev2@psx.com,creative@psx.com
   NODE_ENV=production
   ```

3. **File Storage Options**
   
   **Option A: Vercel Blob (Recommended)**
   ```bash
   npm install @vercel/blob
   ```
   
   **Option B: AWS S3**
   ```bash
   npm install @aws-sdk/client-s3
   ```

### Vercel-Specific Features
- ✅ **Serverless functions** for API endpoints
- ✅ **Edge caching** for static assets
- ✅ **Automatic scaling** based on traffic
- ✅ **Global CDN** for fast asset delivery
- ✅ **Built-in analytics** and monitoring

### Production Considerations
- **File uploads** work via API routes
- **Static assets** served from `public/` directory
- **Environment variables** configured in dashboard
- **Custom domains** supported
- **SSL certificates** automatically managed

## License

This project is part of the PSX ecosystem and follows the same licensing terms.
