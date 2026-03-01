#!/bin/bash
# Build verification script

echo "🔧 Building SnUi project..."
cd /home/swapnil/Dev/github/sn-ui

echo "📦 Running build..."
npm run build 2>&1 | tee build.log

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    exit 0
else
    echo "❌ Build failed. Check build.log for details"
    exit 1
fi

