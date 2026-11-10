/**
 * Asset Helper for GitHub Pages and Local Hosting
 *
 * Automatically resolves asset paths with Vite's import.meta.env.BASE_URL
 * so that all images work seamlessly whether hosted at root ('/'),
 * in subdirectories (like '/1/' on GitHub Pages), or loaded with relative paths.
 *
 * Also provides high-reliability Unsplash fallbacks and SVG data URLs
 * so that no broken image or icon is ever shown to the user.
 */

// Fallback high-quality academic and theological images from Unsplash
export const FALLBACK_IMAGES = {
  college: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  campus: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  chapel: 'https://images.unsplash.com/photo-1548625361-195973a8e9e1?auto=format&fit=crop&w=1200&q=80',
  classroom: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
  dining: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  faculty: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
  principal: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  student: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  library: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80',
  ground: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
};

// Inline SVG Fallback for Logo so logo is 100% resilient
export const FALLBACK_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
  <defs>
    <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A365D" />
      <stop offset="100%" stop-color="#0F2027" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE082" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#AA820A" />
    </linearGradient>
  </defs>
  <!-- Shield Outline -->
  <path d="M 20 20 Q 100 10 180 20 L 180 130 C 180 180 100 220 100 220 C 100 220 20 180 20 130 Z" fill="url(#shieldGrad)" stroke="url(#goldGrad)" stroke-width="6" />
  <!-- Inner Shield Line -->
  <path d="M 32 32 Q 100 24 168 32 L 168 126 C 168 168 100 206 100 206 C 100 206 32 168 32 126 Z" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.6" />
  <!-- Cross -->
  <rect x="94" y="50" width="12" height="70" fill="url(#goldGrad)" rx="2" />
  <rect x="76" y="70" width="48" height="12" fill="url(#goldGrad)" rx="2" />
  <!-- Open Bible Base -->
  <path d="M 50 145 Q 100 135 100 155 Q 100 135 150 145 L 146 175 Q 100 162 100 178 Q 100 162 54 175 Z" fill="#FFFDF8" stroke="url(#goldGrad)" stroke-width="2" />
  <!-- Text -->
  <text x="100" y="200" font-family="serif" font-weight="bold" font-size="14" fill="#FFE082" text-anchor="middle" letter-spacing="3">NEST</text>
</svg>
`)}`;

/**
 * Resolves an asset path to work with the Vite base URL (e.g., '/1/' on GitHub Pages).
 * Handles absolute paths ('/assets/...'), relative paths, full http(s) URLs, and data URLs.
 */
export function getAssetUrl(path: string | undefined | null, fallbackKey?: keyof typeof FALLBACK_IMAGES): string {
  if (!path) {
    if (fallbackKey && FALLBACK_IMAGES[fallbackKey]) {
      return FALLBACK_IMAGES[fallbackKey];
    }
    return FALLBACK_IMAGES.campus;
  }

  // Already a full external URL or data URL
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  
  // Clean path by stripping leading slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}${cleanPath}`;
}

/**
 * Image onError handler to automatically replace a broken image with a clean fallback.
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackKey: keyof typeof FALLBACK_IMAGES = 'campus'
) {
  const target = event.currentTarget;
  const fallback = FALLBACK_IMAGES[fallbackKey] || FALLBACK_IMAGES.campus;
  if (target.src !== fallback) {
    target.src = fallback;
  }
}

/**
 * Specific error handler for logos to switch to the robust inline SVG fallback.
 */
export function handleLogoError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = event.currentTarget;
  if (target.src !== FALLBACK_LOGO_SVG) {
    target.src = FALLBACK_LOGO_SVG;
  }
}
