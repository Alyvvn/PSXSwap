#!/bin/bash

echo "🚀 Setting up PSX PFP Maker System..."

# Create necessary directories
echo "📁 Creating directory structure..."
mkdir -p public/uploads/pfp-assets/{background,base,skin,clothing,eyewear,hair,headgear,effects}
mkdir -p public/images

# Set permissions
echo "🔐 Setting directory permissions..."
chmod 755 public/uploads/pfp-assets
chmod 755 public/uploads/pfp-assets/*

# Create placeholder files
echo "🖼️  Creating placeholder files..."
touch public/images/placeholder.png
touch public/images/cyber-city-bg.png
touch public/images/matrix-grid-bg.png
touch public/images/neon-void-bg.png
touch public/images/human-male-base.png
touch public/images/human-female-base.png
touch public/images/android-base.png

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version check passed: $(node -v)"

# Install dependencies if package.json exists
if [ -f "package.json" ]; then
    echo "📦 Installing dependencies..."
    if command -v pnpm &> /dev/null; then
        pnpm install
    elif command -v npm &> /dev/null; then
        npm install
    else
        echo "❌ Neither pnpm nor npm is installed. Please install one of them."
        exit 1
    fi
else
    echo "⚠️  package.json not found. Skipping dependency installation."
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "🔧 Creating .env.local file..."
    cat > .env.local << EOF
# PFP Maker Configuration
MAX_FILE_SIZE=10485760
ALLOWED_IMAGE_TYPES=image/png,image/jpeg,image/jpg,image/webp
UPLOAD_PATH=/public/uploads/pfp-assets
DEBUG_PFP_MAKER=false

# Database Configuration (for future use)
# DATABASE_URL=postgresql://username:password@localhost:5432/psx_pfp
# DATABASE_TYPE=postgresql
EOF
    echo "✅ Created .env.local file"
else
    echo "ℹ️  .env.local already exists"
fi

echo ""
echo "🎉 PFP Maker setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start your development server: npm run dev"
echo "2. Navigate to /pfp-maker to test the PFP maker"
echo "3. Navigate to /pfp-maker/cms to test the CMS"
echo "4. Upload some test assets to get started"
echo ""
echo "📚 For detailed documentation, see PFP_MAKER_SETUP.md"
echo ""
echo "🔗 Quick links:"
echo "   PFP Maker: http://localhost:3000/pfp-maker"
echo "   CMS: http://localhost:3000/pfp-maker/cms"
echo ""
