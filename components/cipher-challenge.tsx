"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Terminal,
  Eye,
  Shield,
  Zap,
  AlertTriangle
} from "lucide-react";

interface CipherMessage {
  encrypted: string;
  decrypted: string;
  shift: number;
  hint: string;
  priority: string;
}

const CIPHER_MESSAGES: CipherMessage[] = [
  {
    encrypted: "XLI QIWWEKI XS: GLZZY-WORLD-ACCESS",
    decrypted: "THE SECRET IS: GLZZY-WORLD-ACCESS",
    shift: 4,
    hint: "Agent 44's primary shift: 4 positions forward",
    priority: "CRITICAL"
  },
  {
    encrypted: "VJG QVJGTM KU: PSX-AGENCY-TOP-SECRET",
    decrypted: "THE PORTAL IS: PSX-AGENCY-TOP-SECRET",
    shift: 2,
    hint: "Secondary protocol: shift by 2",
    priority: "HIGH"
  },
  {
    encrypted: "YMF BTHP XS: BASE-NETWORK-SECURE",
    decrypted: "THE CODE IS: BASE-NETWORK-SECURE",
    shift: 5,
    hint: "Tertiary encryption: 5-position shift",
    priority: "MEDIUM"
  },
  {
    encrypted: "QBT YVGGRE VF: AGENT-44-CLEARANCE",
    decrypted: "THE PORTAL IS: AGENT-44-CLEARANCE",
    shift: 13,
    hint: "Fallback ROT13: classic 13-shift",
    priority: "LOW"
  },
  {
    encrypted: "GUR FRPERG VF: PSX-AGENCY-TOP-SECRET",
    decrypted: "THE SECRET IS: PSX-AGENCY-TOP-SECRET",
    shift: 13,
    hint: "Standard ROT13 protocol",
    priority: "STANDARD"
  }
];

export function CipherChallenge({ onComplete }: { onComplete: (password: string) => void }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [securityLevel, setSecurityLevel] = useState("SECURE");

  const currentMessage = CIPHER_MESSAGES[currentMessageIndex];
  const decryptedParts = currentMessage?.decrypted?.split(": ") || [];
  const portalKey = decryptedParts.length > 1 ? decryptedParts[1] : currentMessage?.decrypted || "";

  useEffect(() => {
    setIsTyping(true);
    setTypedText("");

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < currentMessage.encrypted.length) {
        setTypedText(prev => prev + currentMessage.encrypted[index]);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentMessageIndex]);

  useEffect(() => {
    if (attempts > 5) {
      setSecurityLevel("COMPROMISED");
    } else if (attempts > 3) {
      setSecurityLevel("WARNING");
    } else {
      setSecurityLevel("SECURE");
    }
  }, [attempts]);

  const handleSubmit = () => {
    const cleanInput = userInput.trim().toUpperCase();
    const expected = currentMessage.decrypted.toUpperCase();

    if (cleanInput === expected) {
      setIsCorrect(true);
      setError("");
      onComplete(portalKey);
    } else {
      setAttempts(prev => prev + 1);
      setError("Incorrect decryption. Try again.");

      if (attempts >= 3) setHintLevel(1);
      if (attempts >= 5) setHintLevel(2);
      if (attempts >= 7) setHintLevel(3);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const resetPuzzle = () => {
    setCurrentMessageIndex(0);
    setUserInput("");
    setIsCorrect(false);
    setHintLevel(0);
    setAttempts(0);
    setError("");
    setSecurityLevel("SECURE");
  };

  const nextMessage = () => {
    if (currentMessageIndex < CIPHER_MESSAGES.length - 1) {
      setCurrentMessageIndex(prev => prev + 1);
      setUserInput("");
      setIsCorrect(false);
      setHintLevel(0);
      setAttempts(0);
      setError("");
      setSecurityLevel("SECURE");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL": return "text-red-400";
      case "HIGH": return "text-orange-400";
      case "MEDIUM": return "text-yellow-400";
      case "LOW": return "text-green-400";
      default: return "text-blue-400";
    }
  };

  const getSecurityColor = (level: string) => {
    switch (level) {
      case "COMPROMISED": return "text-red-400";
      case "WARNING": return "text-yellow-400";
      default: return "text-green-400";
    }
  };

  return (
    <Card className="w-full max-w-6xl bg-black/90 border-blue-400/30 backdrop-blur-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-mono font-bold text-blue-400 flex items-center justify-center gap-2">
          <Terminal className="h-6 w-6" />
          PSX Cryptanalysis Terminal – Agent 44 Protocol
        </CardTitle>
        <p className="text-blue-300/70 text-sm">
          Decrypt classified transmissions using advanced cipher analysis
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel */}
          <div className="space-y-4">
            <div className="bg-black/50 border border-blue-400/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-blue-400 text-sm font-mono">
                    CLASSIFIED TRANSMISSION #{currentMessageIndex + 1}
                  </span>
                </div>
                <div className={`text-xs font-mono ${getPriorityColor(currentMessage.priority)}`}>
                  PRIORITY: {currentMessage.priority}
                </div>
              </div>

              <div className="bg-black/30 border border-blue-400/20 rounded p-3 font-mono">
                <div className="text-blue-300 text-sm mb-2 flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  ENCRYPTED DATA:
                </div>
                <div className="text-blue-200 text-lg font-mono tracking-wider leading-relaxed">
                  {typedText}
                  {isTyping && <span className="animate-pulse text-blue-400">|</span>}
                </div>
              </div>
            </div>

            <div className="bg-black/50 border border-blue-400/30 rounded-lg p-4">
              <h3 className="text-blue-400 font-mono font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                SECURITY STATUS
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-300/70 text-sm">System Status:</span>
                  <span className={`font-mono text-sm ${getSecurityColor(securityLevel)}`}>
                    {securityLevel}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-300/70 text-sm">Decryption Attempts:</span>
                  <span className="text-blue-300 font-mono text-sm">{attempts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-300/70 text-sm">Encryption Type:</span>
                  <span className="text-blue-300 font-mono text-sm">Caesar Cipher</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            <div className="bg-black/50 border border-blue-400/30 rounded-lg p-4">
              <h3 className="text-blue-400 font-mono font-bold mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                DECODER INTERFACE
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-blue-300/70 text-sm block mb-2">Enter Decrypted Message:</label>
                  <Input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter the decrypted message..."
                    className="bg-black/50 border-blue-400/50 text-blue-300 placeholder:text-blue-300/50 focus:border-blue-400 font-mono"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-mono"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    DECRYPT TRANSMISSION
                  </Button>
                </div>

                {hintLevel >= 1 && (
                  <div className="p-3 bg-yellow-900/20 border border-yellow-400/30 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-3 w-3 text-yellow-400" />
                      <span className="text-yellow-400 font-mono text-xs font-bold">LEVEL 1 HINT</span>
                    </div>
                    <p className="text-yellow-300 font-mono text-sm">{currentMessage.hint}</p>
                  </div>
                )}

                {hintLevel >= 2 && (
                  <div className="p-3 bg-orange-900/20 border border-orange-400/30 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-3 w-3 text-orange-400" />
                      <span className="text-orange-400 font-mono text-xs font-bold">LEVEL 2 HINT</span>
                    </div>
                    <p className="text-orange-300 font-mono text-sm">
                      Shift by {currentMessage.shift} positions
                    </p>
                  </div>
                )}

                {hintLevel >= 3 && (
                  <div className="p-3 bg-red-900/20 border border-red-400/30 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-3 w-3 text-red-400" />
                      <span className="text-red-400 font-mono text-xs font-bold">LEVEL 3 HINT</span>
                    </div>
                    <p className="text-red-300 font-mono text-sm">First word should be "THE"</p>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-900/20 border border-red-400/30 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle className="h-3 w-3 text-red-400" />
                      <span className="text-red-400 font-mono text-xs font-bold">DECRYPTION FAILED</span>
                    </div>
                    <p className="text-red-300 font-mono text-sm">{error}</p>
                  </div>
                )}

                {isCorrect && (
                  <div className="p-3 bg-green-900/20 border border-green-400/30 rounded">
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <p className="text-green-400 font-mono font-bold">DECRYPTION SUCCESSFUL</p>
                      <p className="text-green-300 font-mono text-sm mt-1">
                        Portal Key: {portalKey || "Unknown"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={resetPuzzle}
                variant="outline"
                className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              {currentMessageIndex < CIPHER_MESSAGES.length - 1 && (
                <Button
                  onClick={nextMessage}
                  variant="outline"
                  className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10"
                >
                  Next Message
                </Button>
              )}
            </div>

            <div className="text-center text-blue-300/50 text-xs">
              Transmission {currentMessageIndex + 1} of {CIPHER_MESSAGES.length}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-blue-300/70 text-sm max-w-2xl mx-auto">
          <p>Use the Caesar cipher to decrypt the classified transmission.</p>
          <p className="mt-2">Each letter is shifted by a fixed number of positions in the alphabet.</p>
          <p className="mt-2">Enter the decrypted message to reveal the portal key.</p>
        </div>
      </CardContent>
    </Card>
  );
}
