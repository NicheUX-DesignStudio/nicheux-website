# Step 1: Create theme constants file
Write-Host "Creating theme constants file..." -ForegroundColor Cyan

$themeContent = @"
// Brand color constants used throughout the application
export const GOLD = "#E9C672";
export const BLUE = "#89B1CC";
export const LAVENDER = "#B097BE";
export const BLACK = "#121212";

// Optional: Export as object for easier importing
export const COLORS = {
  GOLD,
  BLUE,
  LAVENDER,
  BLACK
} as const;
"@

$constantsDir = "src\constants"
if (!(Test-Path $constantsDir)) {
    New-Item -ItemType Directory -Path $constantsDir -Force | Out-Null
}
Set-Content -Path "$constantsDir\theme.ts" -Value $themeContent
Write-Host "Created src/constants/theme.ts" -ForegroundColor Green

# Step 2: Add imports to files that need them
Write-Host "`nAdding imports to files..." -ForegroundColor Cyan

$filesToAddImport = @(
    "src\components\about\ComparisonSection.tsx",
    "src\components\about\Faq.tsx",
    "src\components\about\Introtext.tsx",
    "src\components\about\Steps.tsx",
    "src\components\about\Team.tsx",
    "src\components\about\TheWhy.tsx",
    "src\components\home\About.tsx",
    "src\components\home\Hero.tsx",
    "src\components\home\Portfolio.tsx",
    "src\pages\AIVisualsMotionPage.tsx",
    "src\pages\ContactPage.tsx",
    "src\pages\FeaturedWork.tsx",
    "src\pages\IllustrationCharacterDesignPage.tsx",
    "src\pages\PrintAndBrandDesignPage.tsx",
    "src\pages\SocialMediaMarketingPage.tsx",
    "src\pages\StrategyAndDesignPage.tsx",
    "src\pages\WebDevelopmentAndECommercePage.tsx"
)

$importLine = 'import { GOLD, BLUE, LAVENDER, BLACK } from "@/constants/theme";'

foreach ($file in $filesToAddImport) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        if ($content -notmatch '@/constants/theme') {
            # Find the last import line
            $lines = $content -split "`r?`n"
            $lastImportIndex = -1
            
            for ($i = 0; $i -lt $lines.Count; $i++) {
                if ($lines[$i].Trim() -match '^import ') {
                    $lastImportIndex = $i
                }
            }
            
            if ($lastImportIndex -ge 0) {
                $newLines = @()
                $newLines += $lines[0..$lastImportIndex]
                $newLines += $importLine
                if ($lastImportIndex + 1 -lt $lines.Count) {
                    $newLines += $lines[($lastImportIndex + 1)..($lines.Count - 1)]
                }
                $newContent = $newLines -join "`n"
                Set-Content -Path $file -Value $newContent -NoNewline
                Write-Host "Added import to: $file" -ForegroundColor Green
            }
        }
    }
}

# Step 3: Remove unused imports and fix errors
Write-Host "`nFixing specific files..." -ForegroundColor Cyan

# Fix Steps.tsx
$file = "src\components\about\Steps.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace 'import \{ ArrowRight \} from "lucide-react";', ''
    $content = $content -replace 'import \{ ArrowRight \} from ''lucide-react'';', ''
    Set-Content $file $content -NoNewline
    Write-Host "Fixed: $file" -ForegroundColor Green
}

# Fix CountrySelector.tsx
$file = "src\components\ui\CountrySelector.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', switchCountry', ''
    $content = $content -replace 'switchCountry\(e\.target\.value\)', '""'
    Set-Content $file $content -NoNewline
    Write-Host "Fixed: $file" -ForegroundColor Green
}

# Fix Services.tsx - Add TrendingUp
$file = "src\components\home\Services.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    if ($content -notmatch 'TrendingUp') {
        $pattern = '\} from [''"]lucide-react[''"]'
        $replacement = ', TrendingUp } from ''lucide-react'''
        $content = $content -replace $pattern, $replacement
        Set-Content $file $content -NoNewline
        Write-Host "Fixed: $file" -ForegroundColor Green
    }
}

# Fix FeaturedWork.tsx
$file = "src\pages\FeaturedWork.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace 'PaletteOpen', 'Palette'
    # Add missing imports
    if ($content -notmatch ', Palette') {
        $pattern = '\} from [''"]lucide-react[''"]'
        $replacement = ', Palette, BookOpen, Sparkles } from ''lucide-react'''
        $content = $content -replace $pattern, $replacement
    }
    $content = $content -replace '  const IconComponent = performance\.icon;', ''
    Set-Content $file $content -NoNewline
    Write-Host "Fixed: $file" -ForegroundColor Green
}

# Fix illustration files
$illustrationFiles = @(
    "src\components\Illustration And Character Design\Comic.tsx",
    "src\components\Illustration And Character Design\ConceptualAnatomy.tsx"
)

foreach ($file in $illustrationFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace ', useInView', ''
        $content = $content -replace '  TrendingUp,', ''
        $content = $content -replace '  Target,', ''
        $content = $content -replace '  MessageCircle,', ''
        $content = $content -replace '  Expand,', ''
        $content = $content -replace '  Share2,', ''
        $content = $content -replace '  Heart,', ''
        $content = $content -replace '  BarChart3,', ''
        $content = $content -replace '  Repeat,', ''
        Set-Content $file $content -NoNewline
        Write-Host "Fixed: $file" -ForegroundColor Green
    }
}

# Fix AICanvas.tsx
$file = "src\components\MotionDesignAIVisuals\AICanvas.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  ExternalLink,', ''
    $content = $content -replace '  Target,', ''
    $content = $content -replace '  Rocket,', ''
    $content = $content -replace '  Palette,', ''
    $content = $content -replace '  MessageCircle,', ''
    $content = $content -replace '  BarChart3,', ''
    $content = $content -replace '  Repeat,', ''
    $content = $content -replace '  Layers,', ''
    $content = $content -replace '  Heart,', ''
    Set-Content $file $content -NoNewline
    Write-Host "Fixed: $file" -ForegroundColor Green
}

# Fix page files - remove unused variables
$pageFiles = @{
    "src\pages\ContactPage.tsx" = 'const percentValue = parseFloat\(priceMatch\[0\]\) / 100;'
    "src\pages\HomePage.tsx" = 'const \[selectedProject, setSelectedProject\] = useState<number \| null>\(null\);'
    "src\pages\PrintAndBrandDesignPage.tsx" = '\(key, index\)'
    "src\utils\packageMappings.ts" = 'const cleanName = serviceName\.replace\(/\\\([^\)]\*\\\)/g, ''''\)\.trim\(\);'
}

foreach ($file in $pageFiles.Keys) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($file -eq "src\pages\PrintAndBrandDesignPage.tsx") {
            $content = $content -replace '\(key, index\)', '(key)'
        } else {
            $content = $content -replace $pageFiles[$file], ''
        }
        Set-Content $file $content -NoNewline
        Write-Host "Fixed: $file" -ForegroundColor Green
    }
}

# Fix IllustrationCharacterDesignPage.tsx
$file = "src\pages\IllustrationCharacterDesignPage.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  Book,', ''
    $content = $content -replace '  Rocket,', ''
    Set-Content $file $content -NoNewline
    Write-Host "Fixed: $file" -ForegroundColor Green
}

# Fix SocialMediaMarketingPage.tsx
$file = "src\pages\SocialMediaMarketingPage.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  MessageSquare,', ''
    $content = $content -replace '  Search,', ''
    $content = $content -replace '  X,', ''
    $content = $content -replace '  Users as UsersIcon,', ''
    $content = $content -replace '  Palette,', ''
    $content = $content -replace '  Code,', ''
    $content = $content -replace '  merchpingBag,', ''
    $content = $content -replace '  Globe,', ''
    $content = $content -replace '  Gauge,', ''
    $content = $content -replace '  Star', ''
    Set-Content $file $content -NoNewline
    Write-Host "Fixed: $file" -ForegroundColor Green
}

# Fix StrategyAndDesignPage.tsx
$file = "src\pages\StrategyAndDesignPage.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  Package as PackageIcon', ''
    $content = $content -replace ', getServiceNameWithoutPrice', ''
    Set-Content $file $content -NoNewline
    Write-Host "Fixed: $file" -ForegroundColor Green
}

# Fix Navigation.tsx
$file = "src\components\ui\Navigation.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  onProjectClick,', ''
    $content = $content -replace 'onProjectClick\?: \(\) => void;', ''
    Set-Content $file $content -NoNewline
    Write-Host "Fixed: $file" -ForegroundColor Green
}

Write-Host "`n======================================" -ForegroundColor Cyan
Write-Host "All fixes completed!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Run: npx tsc --noEmit" -ForegroundColor White
Write-Host "2. Run: npm run build" -ForegroundColor White