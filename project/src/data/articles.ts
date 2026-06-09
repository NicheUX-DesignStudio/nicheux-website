// NicheUX Blog / Journal,Article Data
// To add a new article: add an entry to this array.
// Images go in public/images/blog/
// Videos go in public/videos/blog/

export interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'image' | 'video' | 'quote' | 'list' | 'divider';
  content?: string;
  src?: string;
  alt?: string;
  caption?: string;
  items?: string[];
  author?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Case Study' | 'Process' | 'Studio' | 'Industry' | 'Behind the Scenes';
  date: string;
  readTime: string;
  coverImage?: string;
  coverAlt?: string;
  accent: string;
  body: ArticleBlock[];
}

export const articles: Article[] = [
  {
    id: 'design-meets-storytelling',
    slug: 'where-design-meets-storytelling',
    title: 'Where design meets storytelling: what that actually means to us',
    excerpt: 'It is not a tagline. It is a discipline. Every piece we make has a narrative logic. The visuals exist because a story needed to be told. Here is how that shapes every brief.',
    category: 'Studio',
    date: '1 May 2026',
    readTime: '5 min',
    coverImage: '/images/GrandTheatreOfCreation.webp',
    coverAlt: 'Grand Theatre of Creation illustration by NicheUX',
    accent: '#B097BE',
    body: [
      { type: 'paragraph', content: 'The tagline came before the website. It came before we had clients. It came before we had a name. It came from a problem we kept seeing: design without a story to tell. Technically competent work that communicated nothing about the people behind it, the problem it was solving, or the audience it was made for.' },
      { type: 'heading', content: 'What storytelling actually means in design' },
      { type: 'paragraph', content: 'Storytelling in design is not decoration. It is not adding a brand voice to a website or writing witty microcopy on a button. It is a structural discipline. Every element (the hierarchy of information, the sequence of revelation, the emotional register of the typography, the relationship between negative space and content) is a narrative decision.' },
      { type: 'paragraph', content: 'A poster that communicates one idea, clearly, is a story. A website that leads a visitor from uncertainty to trust is a story. A tournament identity that makes athletes feel like players is a story. A LinkedIn banner that makes a recruiter stop scrolling is a story.' },
      { type: 'heading', content: 'The stage metaphor' },
      { type: 'paragraph', content: 'We use theatre as a metaphor because it is honest about what we are actually doing. When you open a website, you are entering a designed space that someone built to create a specific experience. That is exactly what a stage is. The lighting, the set, the blocking. All of it is designed to make you feel something and understand something.' },
      { type: 'quote', content: 'Every story deserves a stage. We build the stage.', author: 'NicheUX' },
      { type: 'heading', content: 'What it means for your brief' },
      { type: 'paragraph', content: 'When we take a brief, the first questions are not about colours or fonts or platforms. They are about the story. What does this person, this brand, this product need to communicate? Who needs to hear it? What do they currently believe, and what do we need them to believe after they encounter this piece? The design comes from the story, not the other way around.' },
    ],
  },
  {
    id: 'bloom-brew-case-study',
    slug: 'bloom-brew-how-we-built-it',
    title: 'How we built Bloom & Brew,from local coffee cart to three international markets in six weeks',
    excerpt: 'A custom merchify Liquid theme built from scratch. A Canadian pâtissière\'s brand built for international retail. What we designed, what we decided, and what the numbers looked like on day one.',
    category: 'Case Study',
    date: '15 May 2026',
    readTime: '10 min',
    coverImage: '/images/bloombrewhero.webp',
    coverAlt: 'Bloom and Brew Coffee Company website by NicheUX',
    accent: '#E9C672',
    body: [
      { type: 'paragraph', content: 'Bloom & Brew Coffee Company is run by Aishwarya,a pâtissière trained at École Nationale Supérieure de Pâtisserie in France, now building a mobile coffee cart and bakery across the Greater Toronto Area with her husband Sahil. They had built a devoted following through farmers markets and festivals. Their online presence was a merchify template that felt nothing like the experience of visiting them in person.' },
      { type: 'heading', content: 'The problem with most merchify stores' },
      { type: 'paragraph', content: 'merchify\'s template ecosystem exists to get people selling quickly. That is also its limitation: every template-based store looks like every other template-based store. For a brand built on craft, provenance, and warmth,a brand that earned loyalty through face-to-face connection,a generic template was actively undermining what made Bloom & Brew worth buying from.' },
      { type: 'paragraph', content: 'The brief was clear: build something from scratch that felt as considered as the products themselves. Custom Liquid. Zero templates. Built for Canada, the UK, and Ireland on day one.' },
      { type: 'heading', content: 'What we found when we looked harder' },
      { type: 'paragraph', content: 'Before touching a design tool, we spent time looking at the brand as it actually existed. The social media presence was warm and personal. Post after post showed Aishwarya making pastries, setting up the booth, talking to customers at the market. The comments were the same way: regulars checking in, people asking about upcoming markets, families recommending the brand to each other. The online store felt like a different business entirely.' },
      { type: 'quote', content: 'The website is not selling coffee and croissants. It is selling membership in the Coffee Family. Every pixel should feel like a warm welcome, not a transaction.', author: 'NicheUX design brief, January 2026' },
      { type: 'image', src: '/images/bloom-process/ia.png', alt: 'Bloom and Brew Information Architecture diagram', caption: 'Information Architecture,maximum two clicks to any product. Story before selling: About appears before merch in the navigation.' },
      { type: 'heading', content: 'How the site was structured' },
      { type: 'paragraph', content: 'The IA emerged from one constraint: the brand story had to come before the product. Customers who discovered Bloom & Brew at a market already had the story. Online, they needed to build it first. The About section comes before the merch in the navigation. The founders\' story,including Aishwarya\'s French pastry training,appears on the homepage, not buried in a secondary page.' },
      { type: 'image', src: '/images/bloom-process/journey.png', alt: 'Bloom and Brew user journey map', caption: 'User Journey Map,the emotional arc from market discovery to online repeat purchase.' },
      { type: 'heading', content: 'The user flows that shaped the build' },
      { type: 'paragraph', content: 'We mapped four distinct journeys: the primary conversion path (market discovery to online purchase), the B2B path (event planner requesting a custom quote), the dietary restriction edge case (customer filtering by allergen), and the out-of-stock error state. Every flow was designed to keep the user moving. No dead ends.' },
      { type: 'image', src: '/images/bloom-process/flow-primary.png', alt: 'Bloom and Brew primary user flow diagram', caption: 'Primary Flow,Market Discovery to Online Purchase. Mapped to eliminate friction between physical discovery and digital checkout.' },
      { type: 'image', src: '/images/bloom-process/flow-quote.png', alt: 'Bloom and Brew event planner custom quote flow', caption: 'Event Planner Flow,B2B path for custom order requests. Different intent, different information needs, different conversion point.' },
      { type: 'heading', content: 'Six weeks. Three markets. One build.' },
      { type: 'paragraph', content: 'Custom Liquid was built from scratch. Every section, every component, every animation. Multi-currency for Canada, UK, and Ireland was built in before launch,not added afterwards. The SEO foundation was structural, not bolted on at the end: semantic HTML, structured data, canonical URLs, performance budgets.' },
      { type: 'image', src: '/images/Desktop-home-design.webp', alt: 'Bloom and Brew homepage desktop design by NicheUX', caption: 'Homepage,warm landing page. Rotating hero images, featured products, brand tone established in the first scroll.' },
      { type: 'heading', content: 'What happened on day one' },
      { type: 'paragraph', content: 'The site launched simultaneously into Canada, the UK, and Ireland. SEO score: 100/100. Average load time: 2.9 seconds. Custom theme verified by merchify: zero templates.' },
      { type: 'quote', content: 'The packaging alone got us picked up by two boutique stockists in the first month.', author: 'Priya R.,Bloom & Brew Coffee Company' },
      { type: 'paragraph', content: 'Six weeks from brief to live. A brand that now has a digital presence as considered as its products. The Coffee Family has a home on the internet.' },
    ],
  },
  {
    id: 'ssjc-game-on',
    slug: 'ssjc-gaming-identity-junior-squash',
    title: 'GAME ON: designing a gaming-universe identity for Malaysia\'s premier junior squash circuit',
    excerpt: 'Two legs, two colour systems, 36 medal designs. How we built a tournament identity that treats junior athletes like players. Plus the story of why we chose cyan-green for the girl silhouette and pink-purple for the boy.',
    category: 'Case Study',
    date: '14 May 2026',
    readTime: '9 min',
    coverImage: '/images/poster-leg2.jpeg',
    coverAlt: 'SSJC GAME ON event poster Leg 2 Cyber Blue by NicheUX',
    accent: '#B97BE8',
    body: [
      { type: 'paragraph', content: 'The Selangor Super Junior Circuit is Malaysia\'s leading junior squash competition. Now in its 10th year, sponsored by redONE Mobile, organised by SRAS. The brief was to design a complete event identity for both tournament legs: t-shirts, lanyards, medals, and event posters.' },
      { type: 'heading', content: 'The concept that changed everything' },
      { type: 'paragraph', content: 'The obvious approach would be to design a clean, professional sports event identity. Bold typography, national colours, sponsor logos prominent. Safe. Forgettable. We asked a different question: who are these athletes, and what would make them actually want to wear this t-shirt?' },
      { type: 'paragraph', content: 'Junior squash players (ages 9 to 13) are the same generation as serious video game players. The visual language of gaming: loading bars, XP indicators, RPG stat screens, player silhouettes on fire,this is the language they already live in. GAME ON.' },
      { type: 'heading', content: 'Two legs. Two identities. One system.' },
      { type: 'paragraph', content: 'Rather than designing each leg separately, we built one visual system with two colourway switches. Leg 1: Retro Purple and Pink Neon. Leg 2: Cyber Blue and Green. Same compositional logic, same grid, same gaming-universe concept. Different energy for each event. A player who attended both could collect both t-shirts and see the connection.' },
      { type: 'image', src: '/images/poster-leg1.jpeg', alt: 'SSJC GAME ON Leg 1 poster Retro Purple by NicheUX', caption: 'GAME ON Poster,Leg 1, Retro Purple. Male squash player silhouette, purple fire, XP indicators. "Loading Player..." Designed by NicheUX.' },
      { type: 'image', src: '/images/poster-leg2.jpeg', alt: 'SSJC GAME ON Leg 2 poster Cyber Blue by NicheUX', caption: 'GAME ON Poster,Leg 2, Cyber Blue. Female squash player, cyan fire, matrix rain. Stats: Level 10, Skill 95, Wins 42, Score 1000.' },
      { type: 'heading', content: 'The t-shirts' },
      { type: 'paragraph', content: 'All-over-print jerseys with circuit-board patterns that trace the shape of the body. The MSN and redONE Mobile branding is front-facing on the chest. The back carries the event text: 10th SSJC Leg 1/2 2026. Both t-shirts were print-ready in the correct colour mode, resolution, and bleed spec. Production without a revision round.' },
      { type: 'image', src: '/images/ssjc/tshirt-leg1.jpeg', alt: 'SSJC Retro Purple t-shirt all-over print design by NicheUX', caption: 'T-shirt Leg 1,Retro Purple & Pink Neon. Circuit-board all-over print. Front: redONE Mobile. Back: 10th SSJC Leg 1 2026.' },
      { type: 'image', src: '/images/ssjc/tshirt-leg2.jpeg', alt: 'SSJC Cyber Blue t-shirt all-over print design by NicheUX', caption: 'T-shirt Leg 2,Cyber Blue & Green. Full sublimation print, production-ready files.' },
      { type: 'heading', content: '36 medal designs' },
      { type: 'paragraph', content: '6 age categories (Boys and Girls U9, U11, U13) × 2 colourways (Leg 1 and Leg 2) × 3 positions = 36 individual medal designs. Every file built to the correct print resolution and CMYK colour mode, ready for the production vendor without revisions.' },
      { type: 'image', src: '/images/ssjc/medal-leg1.jpg', alt: 'SSJC Boys U11 Retro Purple medal design by NicheUX', caption: 'Medal,Boys U11, Leg 1. One of 192 Leg 1 medal files. Retro Purple colourway.' },
      { type: 'heading', content: 'What makes it work' },
      { type: 'list', items: [
        'Gaming as identity, not decoration: junior athletes are the same age as serious gamers. Borrowing their visual language makes the tournament feel exciting before they pick up a racket.',
        'One system, two colourways: Leg 1 and Leg 2 are visually distinct but clearly related. The system is consistent; the energy is different.',
        'Print-ready from day one: every file built to specification. No revision round before production.',
      ]},
      { type: 'heading', content: 'The deliberate colour decisions behind the bunting: why we chose cyan-green for girls and pink-purple for boys' },
      { type: 'paragraph', content: 'When the brief expanded to include event bunting, we had one more design decision to make: which colourway goes with which player silhouette. The conventional answer would have been straightforward. Pink tones for the girl silhouette. Blue tones for the boy. Safe. Expected. And a missed opportunity.' },
      { type: 'paragraph', content: 'Pink for girls and blue for boys is not a design principle. It is a cultural shorthand that became a default somewhere in the mid-twentieth century. These are athletes aged 9 to 13 who have grown up with a far more fluid relationship to colour and gender than previous generations. Applying the pink-blue convention in a tournament context sends a subtle but real signal: the sport is gendered in a particular way. We did not think that was the story worth telling.' },
      { type: 'quote', content: 'Colour choices in sport communicate values. We chose colours that said: this tournament belongs to all of them equally, and it looks extraordinary doing it.', author: 'NicheUX design rationale, SSJC 2026' },
      { type: 'heading', content: 'Cyan-green for the girl silhouette' },
      { type: 'paragraph', content: 'Cyan-green is not a traditionally feminine colour. That is precisely why it works. On the Leg 2 poster, the female player silhouette is rendered in cyan fire against the Cyber Blue and Green colourway. The result is electric. The colour reads as powerful, technical, and forward-moving. It positions her as exactly what she is: a competitor at speed. From a print production standpoint, cyan-green also performs exceptionally well on sublimation jersey fabric and banner vinyl. The saturation holds in ways that softer pinks often do not at event scale.' },
      { type: 'heading', content: 'Pink-purple for the boy silhouette' },
      { type: 'paragraph', content: 'Leg 1 runs in Retro Purple and Pink Neon. The male player silhouette appears in purple fire. Purple has historically been associated with royalty, prestige, and competition at the highest level. In the gaming universe visual language we adopted for SSJC, purple is the colour of the final boss, the veteran player, the level-100 character. The pink neon accent in Leg 1 is not soft pink. It is the kind of acid pink you see in competitive esports branding and high-intensity athletic gear. It reads as intensity, not convention.' },
      { type: 'paragraph', content: 'When bunting is hung across a sports hall, it is not read closely. It is experienced as environment. By assigning cyan-green to the girl silhouette and pink-purple to the boy, the bunting tells every athlete who walks in: this event was designed for you specifically, and it was designed with care. Both colourways are equally loud, equally striking, equally present. No hierarchy. Just two distinct energies sharing the same space.' },
    ],
  },
  {
    id: 'nandhinidc-website',
    slug: 'nandhinidc-website-architecture-storytelling',
    title: 'NandhiniDC: building a website worthy of a practice built in her name',
    excerpt: 'A studio founded to honour a late sister. A daylight study, a draggable horizontal reel, Tamil script as identity. How we built nandhinidc.com.',

    category: 'Case Study',
    date: '10 May 2026',
    readTime: '8 min',
    coverImage: '/images/nandhinidc/stone-facade-1.webp',
    coverAlt: 'Stone One residence by NandhiniDC featured on nandhinidc.com designed by NicheUX',
    accent: '#C8973A',
    body: [
      { type: 'paragraph', content: 'NandhiniDC was founded by Saran, an architect based in Tamil Nadu, in honour of his late sister Nandhini. The name is not branding,it is tribute. Every spatial decision the studio makes is guided by Vastu philosophy and the conviction that a designed space should change the lives of the people who live in it. Before we built nandhinidc.in, the studio had no website at all. This was their first digital presence.' },
      { type: 'heading', content: 'The question that shaped everything' },
      { type: 'paragraph', content: 'Most architecture portfolio websites show projects the same way. Clean grid. Professional photography. Minimal copy. We asked a different question: what if visitors could experience what these spaces feel like? Not just see them,feel them.' },
      { type: 'paragraph', content: 'The signature interaction came from a single idea: what if you could choose what time of day you visit a room? Architecture lives differently in every light. Morning clarity. Golden-hour warmth. Twilight introspection. We built it.' },
      { type: 'heading', content: 'The design language' },
      { type: 'paragraph', content: 'The website uses Cormorant Garamond for display text,a serif with history, weight, and a slight formality that matches a studio that takes 3-generation thinking seriously. DM Sans for body text and UI. IBM Plex Mono for coordinates, labels, and technical details. The colour system is forest-night (a very dark forest green), warm gold, and warm paper.' },
      { type: 'paragraph', content: 'The Tamil watermark,நந்தினி,appears in vertical writing mode on the right edge of the hero section, in gold at 13% opacity. It is not decorative. It is the name the studio was built in. It should be felt more than read.' },
      { type: 'heading', content: 'The technical decisions' },
      { type: 'list', items: [
        'Daylight study toggle,Morning / Golden Hour / Twilight,applied as CSS filter transformations on the Stone One render. Not three different images. One image, three emotional registers.',
        'Horizontal project reel,draggable, pointer-capture, momentum-physics on release. Each project has its own aspect ratio. The reel feels like leafing through a portfolio.',
        'Custom animated cursor,dot + ring that changes behaviour over images, links, and interactive elements. On desktop only.',
        'Blueprint grid background,subtle technical overlay that positions the studio as rigorous without being cold.',
        'FAB WhatsApp integration,the primary conversion point for the Tamil Nadu market.',
      ]},
      { type: 'heading', content: 'Four projects. Four chapters.' },
      { type: 'paragraph', content: 'Stone One (Marakkanam), Second Gear (Kumbakonam), Third Moon (Nannilam), Fourth Pillar (in design, Nannilam). Each project is presented as a spatial narrative: entry through the project reel, then deep exploration through the project page. Every photograph is shown with purpose. Not as decoration but as evidence of how the studio thinks about space.' },
    ],
  },
  {
    id: 'overnight-content',
    slug: 'eight-slides-by-4am',
    title: 'Eight slides by 4am: what overnight LinkedIn content actually requires',
    excerpt: 'Brief received evening. Eight Wanted poster slides for LinkedIn. Live before morning. The story of the Generation Conversation campaign for Sooraj Nikam.',
    category: 'Process',
    date: '5 May 2026',
    readTime: '4 min',
    coverImage: '/images/sooraj/carousel/slide-1.png',
    coverAlt: 'The Generation Conversation Wanted poster LinkedIn slide by NicheUX',
    accent: '#E9C672',
    body: [
      { type: 'paragraph', content: 'Sooraj Nikam attended the Generation Conversation, an entrepreneurship event at PorterShed Galway, supported by AIB and the Local Enterprise Office Gaillimh. He wanted to share that on LinkedIn in a way that felt like him. Not a reshare of the organiser\'s flyer. Something that told the story.' },
      { type: 'paragraph', content: 'The brief arrived in the evening. Eight slides needed to be live before the next morning.' },
      { type: 'heading', content: 'Why Wanted posters' },
      { type: 'paragraph', content: 'Most LinkedIn posts about attending an event look the same: a photo of the speaker, a paragraph of takeaways, a reshare of the event account\'s graphic. None of that feels personal. The Wanted poster format creates immediate visual contrast in a scroll. People stop, read, and get the feeling that this person thinks differently. That is the story worth telling.' },
      { type: 'image', src: '/images/sooraj/carousel/slide-1.png', alt: 'Generation Conversation Wanted poster slide 1 Sinead D Arcy', caption: 'Slide 1. Wanted for brutal honesty. The visual recall of a Wanted poster applied to an entrepreneurship event.' },
      { type: 'heading', content: 'The process at speed' },
      { type: 'paragraph', content: 'Overnight design is not the same as rushed design. The difference is a system. One typographic grid. Consistent colour logic. A structural template applied to each slide. This is what makes eight slides possible in a single session without each one requiring a fresh set of decisions.' },
      { type: 'paragraph', content: 'The system was established in the first 20 minutes. The remaining time was content: writing the copy for each slide, selecting the subject of each "Wanted" poster, applying the template, checking consistency.' },
      { type: 'quote', content: 'Systematic design is what makes overnight possible without losing quality. The system does the heavy lifting. You direct the system.', author: 'NicheUX process note' },
      { type: 'heading', content: 'What it looked like live' },
      { type: 'paragraph', content: 'Eight slides, live on LinkedIn before the next morning. The campaign felt like Sooraj made it: personal, confident, with a distinct visual register. That is the correct result for personal brand content: it should feel like the person, not like the studio.' },
    ],
  },
  {
    id: 'ai-cant-do-this',
    slug: 'what-ai-actually-cant-do-for-your-brand',
    title: 'What AI actually cannot do for your brand (and the moment you will feel the difference)',
    excerpt: 'AI generates. It does not decide. There is a gap between those two things, and brands that fall into it are noticing it now. Here is what that gap looks like when money is on the line.',
    category: 'Industry',
    date: '22 May 2026',
    readTime: '7 min',
    coverImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Brand designer working at a computer, crafting identity for a client',
    accent: '#89B0CC',
    body: [
      { type: 'paragraph', content: 'Someone sent me a Canva AI logo last month. They had typed a prompt, chosen the best result from a grid of twelve, and changed the colour to match their existing website. The whole thing took eight minutes. It was not ugly. It had a clean sans-serif mark, a small geometric shape underneath, and the right shade of teal.' },
      { type: 'paragraph', content: 'Then they launched their coaching business with it.' },
      { type: 'paragraph', content: 'Six weeks later, they came back. Not because the logo had done anything wrong. Because it had done nothing at all. No one had remembered it. No one had mentioned it. It existed on the website and the business cards and the Instagram profile and it was, in the truest sense of the word, invisible. The kind of invisible that costs you the introduction, the referral, the Google search that turns into a booking.' },
      { type: 'heading', content: 'The thing AI is actually very good at' },
      { type: 'paragraph', content: 'Before this becomes a polemic: AI is extraordinary at certain things. It can generate twelve credible logo variations in thirty seconds. It can write a client email in fifteen. It can produce a social media caption, a product description, a job posting, a FAQ page, a blog post intro. It does these things faster and cheaper than any human can.' },
      { type: 'paragraph', content: 'The question is never whether AI can produce the output. It almost always can. The question is what happens after the output exists. Who decides if it is right? Who knows what right means for this specific person, in this specific market, talking to this specific audience? Who understands what the brand needs to communicate that it has not said yet?' },
      { type: 'quote', content: 'Generating is not the same as deciding. And deciding is the entire job.', author: 'NicheUX' },
      { type: 'heading', content: 'The moment the gap becomes visible' },
      { type: 'paragraph', content: 'Here is the moment. You are in a meeting with a potential client. You have a pitch deck. The cover slide has your AI-generated logo on it. The deck is clean, the fonts are consistent, the colours match. You present.' },
      { type: 'paragraph', content: 'And nothing lands.' },
      { type: 'paragraph', content: 'Not because you said the wrong things. Because the visual language around the words did not carry any of the weight. The design had no argument to make. It just sat there, neither warm nor cold, neither confident nor humble, neither specialist nor accessible. It occupied space without communicating anything. And the client went with someone else whose brand felt like something.' },
      { type: 'paragraph', content: 'This is not a hypothetical. It is the most common thing I hear from people who come to us six months after trying to do it themselves or trying to let the tools do it for them.' },
      { type: 'heading', content: 'What design actually is' },
      { type: 'paragraph', content: 'Design is a series of decisions made on behalf of an argument. The argument is: here is what this brand believes, here is who it serves, here is why those people should trust it. Every colour, every typeface, every amount of white space, every photograph chosen or not chosen is a decision within that argument.' },
      { type: 'paragraph', content: 'AI does not know your argument. It knows patterns. It has seen ten million logos and learned what logos generally look like. That knowledge is genuinely useful. But it is useful the way a very fast typist is useful: it can execute at speed. Execution at speed is not the same as knowing what to execute.' },
      { type: 'paragraph', content: 'When we start a project, the first two conversations are not about aesthetics. They are about position. Where is this brand in its market? Who does it need to reach, and what do those people currently believe about the category? What do we need them to feel the moment they encounter this brand, before they have read a single word? That is the work. The visual language comes from it.' },
      { type: 'heading', content: 'The brands that will win the next three years' },
      { type: 'paragraph', content: 'Here is a genuine prediction. The brands that will stand out over the next three years will not be the ones that produced the most content fastest. They will be the ones that decided most clearly. They will have a visual language that is not interchangeable with twelve other brands in their category. They will have a website that makes the right person feel immediately understood. They will have social content that sounds like a person, not a prompt.' },
      { type: 'paragraph', content: 'Every market is about to be flooded with AI-generated everything. The logos, the websites, the posts, the pitch decks. And in that flood, the brands that made actual decisions (with a human who understood what the decision needed to serve) will be the ones people remember.' },
      { type: 'paragraph', content: 'The gap is not between human and AI. The gap is between brands that have an argument and brands that have an output. The first kind earns the client. The second kind earns the scroll past.' },
      { type: 'divider' },
      { type: 'paragraph', content: 'If you want to understand what that gap looks like for your brand specifically, the brief is open.' },
    ],
  },
];
