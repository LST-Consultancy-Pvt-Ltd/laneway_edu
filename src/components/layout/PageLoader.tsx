import Image from "next/image";
import { images } from "@/data/images";

/**
 * Full-screen loading screen shown from the very first paint of a full page
 * load until the page has finished loading (images, fonts, scripts).
 *
 * Lifecycle (driven by `loaderScript`, inlined in <head> so it runs before paint):
 *   html[data-loader="loading"]  → logo entrance + looping shine / progress
 *   html[data-loader="leaving"]  → progress completes, screen slides away
 *   html[data-loader="done"]     → removed (display: none)
 *
 * Self-contained: its CSS (`loaderStyles`) is inlined in <head> too, so it
 * never depends on the main stylesheet. The markup has an inline
 * `display: none` and is only revealed by that CSS while loading — if anything
 * fails, it stays hidden.
 *
 * It stays at least MIN_MS so it never flickers, and gives up after MAX_MS so
 * a slow asset can never trap the visitor. Without JavaScript it never shows.
 * Client-side navigations don't re-run it. Decorative only → aria-hidden.
 */
export function PageLoader() {
  return (
    // Inline display:none is the fail-safe: only the loader CSS (with !important) can reveal it
    <div className="page-loader" aria-hidden="true" style={{ display: "none" }}>
      <div className="loader-logo">
        {/* Same artwork twice: one clipped to the "Lw." monogram, one to the wordmark */}
        <Image src={images.logo} alt="" priority sizes="21rem" className="loader-mark" />
        <Image src={images.logo} alt="" priority sizes="21rem" className="loader-word" />
        <span className="loader-shine" />
        <span className="loader-track">
          <span className="loader-bar" />
        </span>
      </div>
    </div>
  );
}

const MIN_MS = 1500;
const MAX_MS = 8000;
const EXIT_MS = 1150; // 0.25s delay + 0.85s slide (see .page-loader below), plus a small buffer

export const loaderScript = `(function(){var d=document.documentElement,t=Date.now(),f=0;d.dataset.loader='loading';function done(){if(f)return;f=1;setTimeout(function(){d.dataset.loader='leaving';setTimeout(function(){d.dataset.loader='done'},${EXIT_MS})},Math.max(0,${MIN_MS}-(Date.now()-t)))}if(document.readyState==='complete')done();else addEventListener('load',done);setTimeout(done,${MAX_MS})})();`;

const INK = "#111111";
const TEAL = "#7fcbcf";

export const loaderStyles = `
/* !important overrides the element's inline display:none — only while loading */
html[data-loader="loading"] .page-loader,
html[data-loader="leaving"] .page-loader {
  position: fixed; inset: 0; z-index: 200;
  display: grid !important; place-items: center;
  background-color: ${INK};
}
html[data-loader="leaving"] .page-loader {
  pointer-events: none;
  animation: loader-exit 0.85s cubic-bezier(0.76, 0, 0.24, 1) 0.25s forwards;
}
.loader-logo {
  position: relative;
  width: min(64vw, 21rem);
  animation: loader-breathe 2.4s ease-in-out 1.4s infinite alternate;
}
.loader-mark, .loader-word {
  display: block; width: 100%; height: auto;
  filter: brightness(0) invert(1);
}
/* "Lw." monogram occupies the left ~30% of the logo artwork */
.loader-mark {
  clip-path: inset(0 69% 0 0);
  transform-origin: 15% 50%;
  animation: loader-mark 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
}
.loader-word {
  position: absolute; inset: 0;
  clip-path: inset(0 0 0 31%);
  animation: loader-word 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.5s both;
}
/* Teal light sweeping across the logo, masked to the logo's shape */
.loader-shine {
  position: absolute; inset: 0; opacity: 0;
  background: linear-gradient(105deg, transparent 30%, color-mix(in srgb, ${TEAL} 85%, white) 48%, transparent 66%);
  background-size: 260% 100%;
  background-position: 130% 0;
  -webkit-mask: url("/images/brand/laneway-logo.png") center / 100% 100% no-repeat;
  mask: url("/images/brand/laneway-logo.png") center / 100% 100% no-repeat;
  animation: loader-shine 1.7s ease-in-out 1.2s infinite;
}
/* Progress line: indeterminate while loading, fills when done */
.loader-track {
  position: absolute; left: 0; right: 0; bottom: -1.5rem;
  height: 2px; overflow: hidden; border-radius: 2px;
  background-color: rgb(255 255 255 / 0.12);
  animation: loader-fade-in 0.4s ease 0.4s both;
}
.loader-bar {
  position: absolute; top: 0; bottom: 0; left: 0;
  width: 38%; border-radius: 2px;
  background-color: ${TEAL};
  animation: loader-indeterminate 1.15s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
html[data-loader="leaving"] .loader-bar {
  width: 100%;
  animation: loader-fill 0.3s ease-out forwards;
}
@keyframes loader-mark { from { opacity: 0; transform: scale(0.55) rotate(-120deg); } to { opacity: 1; transform: none; } }
@keyframes loader-word { from { clip-path: inset(0 100% 0 31%); transform: translateX(-0.75rem); } to { clip-path: inset(0 0 0 31%); transform: none; } }
@keyframes loader-shine { 0% { opacity: 1; background-position: 130% 0; } 70%, 100% { opacity: 1; background-position: -30% 0; } }
@keyframes loader-breathe { from { transform: scale(1); } to { transform: scale(1.025); } }
@keyframes loader-indeterminate { from { transform: translateX(-105%); } to { transform: translateX(270%); } }
@keyframes loader-fill { from { transform: scaleX(0.4); transform-origin: left; } to { transform: scaleX(1); transform-origin: left; } }
@keyframes loader-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes loader-exit { to { transform: translateY(-100%); visibility: hidden; } }
@media (prefers-reduced-motion: reduce) {
  .loader-logo, .loader-mark, .loader-word, .loader-shine, .loader-bar { animation: none; }
}
`;
