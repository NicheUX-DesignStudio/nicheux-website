// Unified portfolio work strip — same across all service pages

const WORK_IMAGES = [
  "/images/sooraj/linkedin/banner-green.png",
  "/images/sooraj/carousel/slide-1.png",
  "/images/sooraj/carousel/slide-3.png",
  "/images/BenzPoster.webp",
  "/images/AIHeroWork.webp",
  "/images/Akash-ai-visual-nicheux.webp",
  "/images/Dragon.webp",
  "/images/MysticalPanda.webp",
  "/images/ComicHeroWork.webp",
  "/images/ConceptualArtHeroWork.webp",
  "/images/Desktop-home-design.webp",
  "/images/Mobile-home-design-web-ecommerce.webp",
  "/images/nandhinidc/ndc-home-desktop.png",
  "/images/kishore-process/kishore-home-desktop.png",
  "/images/ssjc/poster-leg1.jpeg",
  "/images/PrintBrandHeroWork.webp",
  "/images/ssjc/tshirt-leg1.jpeg",
  "/images/BusinessCards.webp",
  "/images/SocialMediaGraphics.webp",
  "/images/stage-book.png",
];

export default function WorkStrip() {
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "#0e0e0e", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <style>{`@keyframes strip-march{0%{transform:translateX(0)}100%{transform:translateX(-50%)}} .work-strip-track{display:flex;gap:3px;animation:strip-march 44s linear infinite;width:max-content} .work-strip-track:hover{animation-play-state:paused}`}</style>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right,#0e0e0e,transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left,#0e0e0e,transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div className="work-strip-track">
        {[...WORK_IMAGES, ...WORK_IMAGES].map((src, i) => (
          <div key={i} style={{ width: "clamp(220px,20vw,300px)", height: "clamp(160px,15vw,210px)", flexShrink: 0, overflow: "hidden" }}>
            <img src={src} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.8) contrast(1.05)", display: "block" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
