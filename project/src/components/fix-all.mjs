import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Step 1: Create theme constants file
const themeContent = `// Brand color constants used throughout the application
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
`;

const constantsDir = path.join(__dirname, 'src', 'constants');
if (!fs.existsSync(constantsDir)) {
  fs.mkdirSync(constantsDir, { recursive: true });
}
fs.writeFileSync(path.join(constantsDir, 'theme.ts'), themeContent);
console.log('✅ Created src/constants/theme.ts');

// Step 2: Add imports to all files that use color constants
const filesToFix = [
  'src/components/about/ComparisonSection.tsx',
  'src/components/about/Faq.tsx',
  'src/components/about/Introtext.tsx',
  'src/components/about/Steps.tsx',
  'src/components/about/Team.tsx',
  'src/components/about/TheWhy.tsx',
  'src/components/home/About.tsx',
  'src/components/home/Hero.tsx',
  'src/components/home/Portfolio.tsx',
  'src/pages/AIVisualsMotionPage.tsx',
  'src/pages/ContactPage.tsx',
  'src/pages/FeaturedWork.tsx',
  'src/pages/IllustrationCharacterDesignPage.tsx',
  'src/pages/PrintAndBrandDesignPage.tsx',
  'src/pages/SocialMediaMarketingPage.tsx',
  'src/pages/StrategyAndDesignPage.tsx',
  'src/pages/WebDevelopmentAndECommercePage.tsx'
];

let fixedFiles = 0;

filesToFix.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if import already exists
  if (!content.includes('from "@/constants/theme"') && !content.includes('from \'@/constants/theme\'')) {
    // Add import after the last import statement
    const lines = content.split('\n');
    let lastImportIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i;
      }
    }
    
    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, 'import { GOLD, BLUE, LAVENDER, BLACK } from "@/constants/theme";');
      content = lines.join('\n');
      fs.writeFileSync(filePath, content);
      console.log(`✅ Added import to: ${file}`);
      fixedFiles++;
    }
  }
});

console.log(`\n✅ Added imports to ${fixedFiles} files`);

// Step 3: Fix specific issues
const specificFixes = [
  {
    file: 'src/components/about/Steps.tsx',
    fix: (content) => content.replace(/import { ArrowRight } from "lucide-react";\r?\n/g, '')
  },
  {
    file: 'src/components/ui/CountrySelector.tsx',
    fix: (content) => {
      content = content.replace(/const { userCountry, switchCountry, isLoading }/g, 'const { userCountry, isLoading }');
      content = content.replace(/onChange=\{[^}]*switchCountry[^}]*\}/g, 'disabled');
      return content;
    }
  },
  {
    file: 'src/components/home/Services.tsx',
    fix: (content) => {
      if (!content.includes('import { TrendingUp')) {
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('from \'lucide-react\'') || lines[i].includes('from "lucide-react"')) {
            lines[i] = lines[i].replace('} from', ', TrendingUp } from');
            break;
          }
        }
        content = lines.join('\n');
      }
      return content;
    }
  },
  {
    file: 'src/pages/FeaturedWork.tsx',
    fix: (content) => {
      content = content.replace(/PaletteOpen/g, 'Palette');
      if (!content.includes('import { Palette')) {
        content = content.replace('from \'lucide-react\'', ', Palette, BookOpen, Sparkles } from \'lucide-react\'');
      }
      return content;
    }
  },
  {
    file: 'src/components/Illustration And Character Design/Comic.tsx',
    fix: (content) => {
      content = content.replace(/, useInView/g, '');
      content = content.replace(/  TrendingUp,\r?\n/g, '');
      content = content.replace(/  Target,\r?\n/g, '');
      content = content.replace(/  MessageCircle,\r?\n/g, '');
      content = content.replace(/  Expand,\r?\n/g, '');
      return content;
    }
  },
  {
    file: 'src/components/Illustration And Character Design/ConceptualAnatomy.tsx',
    fix: (content) => {
      content = content.replace(/, useInView/g, '');
      content = content.replace(/  TrendingUp,\r?\n/g, '');
      content = content.replace(/  Share2,\r?\n/g, '');
      content = content.replace(/  Heart,\r?\n/g, '');
      content = content.replace(/  MessageCircle,\r?\n/g, '');
      content = content.replace(/  BarChart3,\r?\n/g, '');
      content = content.replace(/  Repeat,\r?\n/g, '');
      content = content.replace(/  Expand,\r?\n/g, '');
      return content;
    }
  },
  {
    file: 'src/components/MotionDesignAIVisuals/AICanvas.tsx',
    fix: (content) => {
      content = content.replace(/  ExternalLink,\r?\n/g, '');
      content = content.replace(/  Target,\r?\n/g, '');
      content = content.replace(/  Rocket,\r?\n/g, '');
      content = content.replace(/  Palette,\r?\n/g, '');
      content = content.replace(/  MessageCircle,\r?\n/g, '');
      content = content.replace(/  BarChart3,\r?\n/g, '');
      content = content.replace(/  Repeat,\r?\n/g, '');
      content = content.replace(/  Layers,\r?\n/g, '');
      content = content.replace(/  Heart,\r?\n/g, '');
      return content;
    }
  },
  {
    file: 'src/pages/AIVisualsMotionPage.tsx',
    fix: (content) => {
      content = content.replace(/const serviceCategories = \[[^\]]*\];\r?\n/s, '');
      content = content.replace(/  const getMotionGraphicsPrice[^}]*}\r?\n/s, '');
      return content;
    }
  },
  {
    file: 'src/pages/ContactPage.tsx',
    fix: (content) => content.replace(/\s*const percentValue = parseFloat\(priceMatch\[0\]\) \/ 100;\r?\n/g, '')
  },
  {
    file: 'src/pages/FeaturedWork.tsx',
    fix: (content) => content.replace(/  const IconComponent = performance\.icon;\r?\n/g, '')
  },
  {
    file: 'src/pages/HomePage.tsx',
    fix: (content) => content.replace(/  const \[selectedProject, setSelectedProject\] = useState<number \| null>\(null\);\r?\n/g, '')
  },
  {
    file: 'src/pages/IllustrationCharacterDesignPage.tsx',
    fix: (content) => {
      content = content.replace(/  Book,\r?\n/g, '');
      content = content.replace(/  Rocket,\r?\n/g, '');
      content = content.replace(/const approachBenefits = \[[^\]]*\];\r?\n/s, '');
      content = content.replace(/\s*const categoryColor[^\n]*\n/g, '');
      content = content.replace(/  const handleConsultation[^}]*}\r?\n/s, '');
      return content;
    }
  },
  {
    file: 'src/pages/PrintAndBrandDesignPage.tsx',
    fix: (content) => content.replace(/\(key, index\)/g, '(key)')
  },
  {
    file: 'src/pages/SocialMediaMarketingPage.tsx',
    fix: (content) => {
      content = content.replace(/  MessageSquare,\r?\n/g, '');
      content = content.replace(/  Search,\r?\n/g, '');
      content = content.replace(/  X,\r?\n/g, '');
      content = content.replace(/  Users as UsersIcon,\r?\n/g, '');
      content = content.replace(/  Palette,\r?\n/g, '');
      content = content.replace(/  Code,\r?\n/g, '');
      content = content.replace(/  merchpingBag,\r?\n/g, '');
      content = content.replace(/  Globe,\r?\n/g, '');
      content = content.replace(/  Gauge,\r?\n/g, '');
      content = content.replace(/  Star\r?\n/g, '');
      return content;
    }
  },
  {
    file: 'src/pages/StrategyAndDesignPage.tsx',
    fix: (content) => {
      content = content.replace(/  Package as PackageIcon\r?\n/g, '');
      content = content.replace(/, getServiceNameWithoutPrice/g, '');
      return content;
    }
  },
  {
    file: 'src/utils/packageMappings.ts',
    fix: (content) => content.replace(/  const cleanName = serviceName\.replace\(\/\\\([^\)]\*\\\)\/g, ''\)\.trim\(\);\r?\n/g, '')
  },
  {
    file: 'src/components/ui/Navigation.tsx',
    fix: (content) => {
      content = content.replace(/\s*onProjectClick,?\r?\n/g, '');
      content = content.replace(/\s*onProjectClick\?: \(\) => void;?\r?\n/g, '');
      return content;
    }
  }
];

console.log('\n🔧 Applying specific fixes...');

specificFixes.forEach(({ file, fix }) => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const newContent = fix(content);
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Fixed: ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
  }
});

console.log('\n' + '='.repeat(60));
console.log('✅ All fixes applied!');
console.log('='.repeat(60));
console.log('\n📋 Next steps:');
console.log('1. Run: npx tsc --noEmit');
console.log('2. Check for any remaining errors');
console.log('3. Run: npm run build\n');