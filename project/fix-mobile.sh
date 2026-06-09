#!/bin/bash
echo "=== FIXING ALL MOBILE ISSUES ==="

# 1. Fix hero spacing - reduce video height and remove gaps
sed -i 's/#hero-video-col { height: 60vw; min-height: 220px; max-height: 480px;/#hero-video-col { height: 35vw; min-height: 140px; max-height: 240px;/g' src/components/home/Hero.tsx
sed -i 's/#hero-text-col { padding-bottom: 24px !important; }/#hero-text-col { padding-bottom: 0px !important; }/g' src/components/home/Hero.tsx

# 2. Fix pagination circles - make them SMALL dots, not big boxes
find src -name "*.tsx" -exec sed -i 's/rounded-full transition-all w-[0-9]* h-[0-9]*/rounded-full transition-all w-1.5 h-1.5/g' {} \;
find src -name "*.tsx" -exec sed -i 's/w-2 h-2 rounded-full/w-1.5 h-1.5 rounded-full/g' {} \;

# 3. Fix services page mobile spacing
find src/components/home -name "*.tsx" -exec sed -i 's/py-20/py-8/g; s/py-16/py-6/g' {} \;
find src/components/home -name "*.tsx" -exec sed -i 's/gap-8/gap-4/g; s/gap-12/gap-6/g' {} \;

# 4. Add viewport meta for proper mobile scaling
if ! grep -q "viewport" index.html; then
  sed -i 's/<head>/<head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"\/>/' index.html
fi

echo "=== MOBILE FIXES APPLIED ==="
echo "Restart server: npm run dev"
echo "Then hard refresh: Ctrl+Shift+R"
