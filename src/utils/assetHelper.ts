/**
 * Asset Helper for NEST Bible College
 *
 * Automatically resolves asset paths with Vite's import.meta.env.BASE_URL
 * (e.g., '/1/' on GitHub Pages or '/' locally) so that all official uploaded photos
 * resolve seamlessly with zero broken links.
 *
 * STRICT REQUIREMENT: Only authentic college photos from /assets/aistudio/
 * are used. No external Unsplash, 3D, or generic stock placeholders.
 */

// Authentic official college photos provided by NEST Bible College
export const AUTHENTIC_FALLBACKS = {
  college: 'assets/aistudio/college_48f40f17.webp',
  campus: 'assets/aistudio/campas1_cd942b74.webp',
  campus1: 'assets/aistudio/campas1_cd942b74.webp',
  campus2: 'assets/aistudio/campas2_f33241ae.webp',
  campus3: 'assets/aistudio/campas3_49c79e1d.webp',
  campus4: 'assets/aistudio/campas4_e0178398.png',
  chapel: 'assets/aistudio/chapel_d7e08b0f.webp',
  classroom: 'assets/aistudio/classroom_3ee27e65.webp',
  classroom2: 'assets/aistudio/classroom2_00d3372c.webp',
  dining: 'assets/aistudio/dinig_hall_3a8b4555.webp',
  faculty: 'assets/aistudio/techers_e3355ac8.webp',
  principal: 'assets/aistudio/pricipal_7db520a9.webp',
  student: 'assets/aistudio/3_e50ff7c9.webp',
  library: 'assets/aistudio/classroom2_00d3372c.webp',
  ground: 'assets/aistudio/spots_00f2ae6c.webp',
  convocation: 'assets/aistudio/5_81316861.webp',
  logo: 'assets/aistudio/logo_9f1d35a7.jpg',
};

// Backwards-compatible alias for existing imports
export const FALLBACK_IMAGES = AUTHENTIC_FALLBACKS;

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
 * Safely handles absolute paths ('/assets/...'), relative paths ('assets/...'),
 * and prevents double-prefixing if the path already contains the base.
 *
 * If path is missing, empty, or points to an obsolete external stock URL (Unsplash),
 * it returns the clean authentic local asset path.
 */
export function getAssetUrl(
  path: string | undefined | null,
  fallbackKey?: keyof typeof AUTHENTIC_FALLBACKS
): string {
  const rawBase = import.meta.env.BASE_URL || '/';
  const cleanBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  // Determine authentic fallback asset path
  const defaultAsset = fallbackKey && AUTHENTIC_FALLBACKS[fallbackKey] 
    ? AUTHENTIC_FALLBACKS[fallbackKey] 
    : AUTHENTIC_FALLBACKS.college;

  if (!path || typeof path !== 'string' || path.trim() === '') {
    return `${cleanBase}${defaultAsset.startsWith('/') ? defaultAsset.slice(1) : defaultAsset}`;
  }

  // Intercept and purge any legacy external stock URLs
  if (path.includes('unsplash.com') || path.includes('placeholder')) {
    return `${cleanBase}${defaultAsset.startsWith('/') ? defaultAsset.slice(1) : defaultAsset}`;
  }

  // Preserve user-uploaded data URLs or blob previews
  if (path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }

  // If path is already a valid non-stock external URL (not unsplash), keep it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  let cleanPath = path.trim();

  // If cleanBase is e.g. '/1/' and path already starts with '/1/' or '1/', do not prepend again
  if (cleanBase !== '/' && cleanPath.startsWith(cleanBase)) {
    return cleanPath;
  }
  const cleanBaseNoLeadingSlash = cleanBase.startsWith('/') ? cleanBase.slice(1) : cleanBase;
  if (cleanBaseNoLeadingSlash && cleanPath.startsWith(cleanBaseNoLeadingSlash)) {
    return `/${cleanPath}`;
  }

  // Strip leading slash from path before joining with cleanBase
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }

  return `${cleanBase}${cleanPath}`;
}

/**
 * Image onError handler to automatically replace a broken image with an authentic college photo.
 * Strictly avoids infinite error loops by checking data-fallback-applied.
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackKey: keyof typeof AUTHENTIC_FALLBACKS = 'college'
) {
  const target = event.currentTarget;
  if (target.dataset.fallbackApplied === 'true') {
    return; // Already fell back, avoid recursion
  }

  target.dataset.fallbackApplied = 'true';
  const fallbackAsset = AUTHENTIC_FALLBACKS[fallbackKey] || AUTHENTIC_FALLBACKS.college;
  const fallbackUrl = getAssetUrl(fallbackAsset);
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
}

/**
 * Specific error handler for logos to switch to the authentic official logo JPEG,
 * or fallback inline SVG if needed.
 */
export function handleLogoError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = event.currentTarget;
  if (target.dataset.fallbackApplied === 'true') {
    if (target.src !== FALLBACK_LOGO_SVG) {
      target.src = FALLBACK_LOGO_SVG;
    }
    return;
  }

  target.dataset.fallbackApplied = 'true';
  const officialLogoUrl = getAssetUrl('assets/aistudio/logo_9f1d35a7.jpg');
  if (target.src !== officialLogoUrl) {
    target.src = officialLogoUrl;
  }
}
