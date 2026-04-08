// iconGenerator.ts - Menggunakan SVG statis yang sudah siap pakai
// Tidak perlu API Gemini untuk generate ikon — hemat kuota & tidak crash

const staticIcons: Record<string, string> = {
  colocation: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none'>
    <rect width='64' height='64' rx='12' fill='%23e31e24'/>
    <rect x='12' y='14' width='40' height='10' rx='2' fill='white' opacity='0.9'/>
    <rect x='12' y='27' width='40' height='10' rx='2' fill='white' opacity='0.7'/>
    <rect x='12' y='40' width='40' height='10' rx='2' fill='white' opacity='0.5'/>
    <circle cx='46' cy='19' r='2' fill='%23e31e24'/>
    <circle cx='46' cy='32' r='2' fill='%23e31e24'/>
    <circle cx='46' cy='45' r='2' fill='%23e31e24'/>
  </svg>`,

  vps: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none'>
    <rect width='64' height='64' rx='12' fill='%23e31e24'/>
    <path d='M32 12 C20 12 12 20 12 32 C12 44 20 52 32 52 C44 52 52 44 52 32 C52 20 44 12 32 12Z' fill='white' opacity='0.2'/>
    <rect x='22' y='22' width='20' height='20' rx='4' fill='white' opacity='0.9'/>
    <path d='M28 32 L32 28 L36 32 L32 36 Z' fill='%23e31e24'/>
  </svg>`,

  dedicated: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none'>
    <rect width='64' height='64' rx='12' fill='%23e31e24'/>
    <rect x='14' y='16' width='36' height='32' rx='3' fill='white' opacity='0.9'/>
    <rect x='18' y='22' width='16' height='3' rx='1' fill='%23e31e24' opacity='0.7'/>
    <rect x='18' y='28' width='12' height='3' rx='1' fill='%23e31e24' opacity='0.5'/>
    <rect x='18' y='34' width='14' height='3' rx='1' fill='%23e31e24' opacity='0.5'/>
    <circle cx='42' cy='26' r='3' fill='%23e31e24'/>
  </svg>`
};

export async function generateServiceIcons(): Promise<Record<string, string>> {
  // Cek cache dulu
  try {
    const cached = localStorage.getItem('rackh_ai_icons');
    if (cached) return JSON.parse(cached);
  } catch {
    // Abaikan error localStorage
  }

  // Langsung return ikon SVG statis — tidak perlu API call
  return staticIcons;
}