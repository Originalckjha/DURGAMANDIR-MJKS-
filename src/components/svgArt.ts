import type { SvgPaletteConfig, FishMotif } from '../types.ts';

const PALETTE: SvgPaletteConfig = {
  primary:   '#B5121B',
  secondary: '#D4A017',
  accent:    '#2D6A2D',
  outline:   '#1A0A00',
  bg:        '#FDF6E3',
};

export function createFishSvg(flip = false, color = PALETTE.primary): string {
  const t = flip ? 'scale(-1,1) translate(-60,0)' : '';
  return `<svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" width="60" height="30">
    <g transform="${t}">
      <ellipse cx="28" cy="15" rx="20" ry="9" fill="${color}" stroke="${PALETTE.outline}" stroke-width="1.5"/>
      <polygon points="50,15 60,6 60,24" fill="${color}" stroke="${PALETTE.outline}" stroke-width="1.5"/>
      <circle cx="14" cy="12" r="2.5" fill="${PALETTE.bg}" stroke="${PALETTE.outline}" stroke-width="1"/>
      <circle cx="14" cy="12" r="1" fill="${PALETTE.outline}"/>
      <path d="M20,10 Q26,6 32,10" stroke="${PALETTE.bg}" stroke-width="1.2" fill="none"/>
      <path d="M20,20 Q26,24 32,20" stroke="${PALETTE.bg}" stroke-width="1.2" fill="none"/>
    </g>
  </svg>`;
}

export function renderFishRow(containerId: string, count = 6): void {
  const el = document.getElementById(containerId);
  if (!el) return;
  const colors = [PALETTE.primary, PALETTE.secondary, PALETTE.accent, '#1A3A6B', '#E8650A'];
  const fishes: FishMotif[] = Array.from({ length: count }, (_, i) => ({
    color: colors[i % colors.length],
    flip: i % 2 === 1,
  }));
  el.innerHTML = fishes.map(f => createFishSvg(f.flip, f.color)).join('');
}

export function createLotusArt(): string {
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect width="200" height="200" fill="${PALETTE.bg}"/>
    <!-- petals -->
    ${[0,45,90,135,180,225,270,315].map(a => `
      <ellipse cx="100" cy="100" rx="18" ry="48"
        transform="rotate(${a} 100 100)"
        fill="${a % 90 === 0 ? PALETTE.primary : PALETTE.secondary}"
        stroke="${PALETTE.outline}" stroke-width="1.2" opacity="0.85"/>
    `).join('')}
    <circle cx="100" cy="100" r="22" fill="${PALETTE.secondary}" stroke="${PALETTE.outline}" stroke-width="2"/>
    <circle cx="100" cy="100" r="12" fill="${PALETTE.primary}" stroke="${PALETTE.outline}" stroke-width="1.5"/>
    <!-- border dots -->
    ${Array.from({length:16},(_,i)=>{
      const a = (i/16)*Math.PI*2;
      return `<circle cx="${100+88*Math.cos(a)}" cy="${100+88*Math.sin(a)}" r="3" fill="${PALETTE.accent}"/>`;
    }).join('')}
  </svg>`;
}

export function createDurgaArt(): string {
  return `<svg viewBox="0 0 260 340" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect width="260" height="340" fill="${PALETTE.bg}"/>
    <!-- border frame -->
    <rect x="6" y="6" width="248" height="328" rx="4"
      fill="none" stroke="${PALETTE.primary}" stroke-width="3"/>
    <rect x="12" y="12" width="236" height="316" rx="3"
      fill="none" stroke="${PALETTE.secondary}" stroke-width="1.5" stroke-dasharray="6 3"/>
    <!-- halo -->
    <circle cx="130" cy="90" r="58" fill="${PALETTE.secondary}" opacity="0.25" stroke="${PALETTE.secondary}" stroke-width="2"/>
    <circle cx="130" cy="90" r="44" fill="none" stroke="${PALETTE.primary}" stroke-width="1.5" stroke-dasharray="4 3"/>
    <!-- face -->
    <ellipse cx="130" cy="88" rx="30" ry="35"
      fill="#F5D5B0" stroke="${PALETTE.outline}" stroke-width="2"/>
    <!-- eyes -->
    <ellipse cx="120" cy="84" rx="6" ry="4" fill="${PALETTE.outline}"/>
    <ellipse cx="140" cy="84" rx="6" ry="4" fill="${PALETTE.outline}"/>
    <circle cx="120" cy="84" r="2" fill="${PALETTE.bg}"/>
    <circle cx="140" cy="84" r="2" fill="${PALETTE.bg}"/>
    <!-- bindi -->
    <circle cx="130" cy="76" r="4" fill="${PALETTE.primary}"/>
    <!-- crown -->
    <polygon points="100,58 115,30 130,52 145,30 160,58"
      fill="${PALETTE.secondary}" stroke="${PALETTE.outline}" stroke-width="1.5"/>
    <circle cx="130" cy="42" r="7" fill="${PALETTE.primary}" stroke="${PALETTE.outline}" stroke-width="1"/>
    <!-- body -->
    <rect x="100" y="122" width="60" height="80" rx="8"
      fill="${PALETTE.primary}" stroke="${PALETTE.outline}" stroke-width="1.5"/>
    <!-- saree pattern dots -->
    ${Array.from({length:15},(_,i)=>`
      <circle cx="${108+( i%5)*10}" cy="${132+Math.floor(i/5)*18}" r="2.5"
        fill="${PALETTE.secondary}"/>
    `).join('')}
    <!-- arms (4) -->
    <line x1="100" y1="138" x2="60"  y2="110" stroke="${PALETTE.outline}" stroke-width="3" stroke-linecap="round"/>
    <line x1="100" y1="148" x2="55"  y2="150" stroke="${PALETTE.outline}" stroke-width="3" stroke-linecap="round"/>
    <line x1="160" y1="138" x2="200" y2="110" stroke="${PALETTE.outline}" stroke-width="3" stroke-linecap="round"/>
    <line x1="160" y1="148" x2="205" y2="150" stroke="${PALETTE.outline}" stroke-width="3" stroke-linecap="round"/>
    <!-- trishul -->
    <line x1="60" y1="96" x2="60" y2="72" stroke="${PALETTE.primary}" stroke-width="2.5"/>
    <line x1="54" y1="82" x2="66" y2="82" stroke="${PALETTE.primary}" stroke-width="2.5"/>
    <line x1="54" y1="75" x2="60" y2="68" stroke="${PALETTE.primary}" stroke-width="2"/>
    <line x1="66" y1="75" x2="60" y2="68" stroke="${PALETTE.primary}" stroke-width="2"/>
    <!-- lotus in right hand -->
    <circle cx="202" cy="106" r="10" fill="${PALETTE.secondary}" stroke="${PALETTE.outline}" stroke-width="1.5"/>
    <circle cx="202" cy="106" r="5"  fill="${PALETTE.primary}"   stroke="${PALETTE.outline}" stroke-width="1"/>
    <!-- feet -->
    <ellipse cx="116" cy="208" rx="12" ry="6" fill="#F5D5B0" stroke="${PALETTE.outline}" stroke-width="1.5"/>
    <ellipse cx="144" cy="208" rx="12" ry="6" fill="#F5D5B0" stroke="${PALETTE.outline}" stroke-width="1.5"/>
    <!-- base lotus -->
    ${[0,36,72,108,144,180,216,252,288,324].map(a=>`
      <ellipse cx="130" cy="240" rx="10" ry="26"
        transform="rotate(${a} 130 240)"
        fill="${a%72===0?PALETTE.primary:PALETTE.secondary}"
        stroke="${PALETTE.outline}" stroke-width="1" opacity="0.8"/>
    `).join('')}
    <!-- Om symbol -->
    <text x="130" y="300" text-anchor="middle"
      font-size="28" fill="${PALETTE.primary}"
      font-family="serif" stroke="${PALETTE.outline}" stroke-width="0.5">ॐ</text>
    <!-- corner flowers -->
    ${[[20,20],[240,20],[20,320],[240,320]].map(([cx,cy])=>`
      <circle cx="${cx}" cy="${cy}" r="8" fill="${PALETTE.accent}" stroke="${PALETTE.outline}" stroke-width="1"/>
      <circle cx="${cx}" cy="${cy}" r="3" fill="${PALETTE.secondary}"/>
    `).join('')}
  </svg>`;
}

export function createMandalaArt(): string {
  const rings = [80, 60, 40, 20];
  const petalCounts = [16, 12, 8, 6];
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect width="200" height="200" fill="${PALETTE.bg}"/>
    <!-- outer decorative ring -->
    <circle cx="100" cy="100" r="94" fill="none" stroke="${PALETTE.secondary}" stroke-width="2" stroke-dasharray="4 3" opacity="0.5"/>
    ${rings.map((r, ri) =>
      Array.from({ length: petalCounts[ri] }, (_, i) => {
        const a = (i / petalCounts[ri]) * Math.PI * 2;
        const x = 100 + r * Math.cos(a);
        const y = 100 + r * Math.sin(a);
        const colors = [PALETTE.primary, PALETTE.secondary, PALETTE.accent, '#1A3A6B'];
        const size = 6 - ri;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size}"
          fill="${colors[ri]}" stroke="${PALETTE.outline}" stroke-width="0.8"/>`;
      }).join('')
    ).join('')}
    <!-- spokes -->
    ${Array.from({length: 8}, (_, i) => {
      const a = (i / 8) * Math.PI * 2;
      const x2 = (100 + 85 * Math.cos(a)).toFixed(1);
      const y2 = (100 + 85 * Math.sin(a)).toFixed(1);
      return `<line x1="100" y1="100" x2="${x2}" y2="${y2}" stroke="${PALETTE.secondary}" stroke-width="0.5" opacity="0.3"/>`;
    }).join('')}
    <circle cx="100" cy="100" r="18" fill="${PALETTE.primary}" stroke="${PALETTE.outline}" stroke-width="2"/>
    <circle cx="100" cy="100" r="10" fill="${PALETTE.secondary}" stroke="${PALETTE.outline}" stroke-width="1.5"/>
    <text x="100" y="105" text-anchor="middle" font-size="11"
      fill="${PALETTE.bg}" font-family="serif">ॐ</text>
  </svg>`;
}

export function createTreeOfLifeArt(): string {
  const branchColor = '#2D6A2D';
  const trunkColor  = '#7B4A1E';
  const leafColors  = [PALETTE.primary, PALETTE.secondary, PALETTE.accent, '#E8650A', '#1A3A6B'];

  const branches = [
    // trunk
    `<line x1="100" y1="190" x2="100" y2="130" stroke="${trunkColor}" stroke-width="7" stroke-linecap="round"/>`,
    // main branches
    `<line x1="100" y1="155" x2="55"  y2="115" stroke="${branchColor}" stroke-width="4.5" stroke-linecap="round"/>`,
    `<line x1="100" y1="155" x2="145" y2="115" stroke="${branchColor}" stroke-width="4.5" stroke-linecap="round"/>`,
    `<line x1="100" y1="135" x2="70"  y2="95"  stroke="${branchColor}" stroke-width="3.5" stroke-linecap="round"/>`,
    `<line x1="100" y1="135" x2="130" y2="95"  stroke="${branchColor}" stroke-width="3.5" stroke-linecap="round"/>`,
    `<line x1="100" y1="130" x2="100" y2="80"  stroke="${branchColor}" stroke-width="3"   stroke-linecap="round"/>`,
    // sub-branches left
    `<line x1="55"  y1="115" x2="30"  y2="85"  stroke="${branchColor}" stroke-width="2.5" stroke-linecap="round"/>`,
    `<line x1="55"  y1="115" x2="55"  y2="78"  stroke="${branchColor}" stroke-width="2.5" stroke-linecap="round"/>`,
    `<line x1="70"  y1="95"  x2="50"  y2="65"  stroke="${branchColor}" stroke-width="2"   stroke-linecap="round"/>`,
    `<line x1="70"  y1="95"  x2="80"  y2="65"  stroke="${branchColor}" stroke-width="2"   stroke-linecap="round"/>`,
    // sub-branches right
    `<line x1="145" y1="115" x2="170" y2="85"  stroke="${branchColor}" stroke-width="2.5" stroke-linecap="round"/>`,
    `<line x1="145" y1="115" x2="145" y2="78"  stroke="${branchColor}" stroke-width="2.5" stroke-linecap="round"/>`,
    `<line x1="130" y1="95"  x2="150" y2="65"  stroke="${branchColor}" stroke-width="2"   stroke-linecap="round"/>`,
    `<line x1="130" y1="95"  x2="120" y2="65"  stroke="${branchColor}" stroke-width="2"   stroke-linecap="round"/>`,
  ];

  const leaves: [number, number, number, number][] = [
    [30,85,9,0],[55,78,9,1],[50,65,8,2],[80,65,8,3],[100,80,10,4],
    [120,65,8,0],[150,65,8,1],[145,78,9,2],[170,85,9,3],
    [100,50,11,0],[75,45,8,1],[125,45,8,2],
    // small top leaves
    [90,32,7,3],[110,32,7,4],[100,22,8,1],
  ];

  const svgLeaves = leaves.map(([cx, cy, r, ci]) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${leafColors[ci % leafColors.length]}" stroke="${PALETTE.outline}" stroke-width="1" opacity="0.85"/>`
  ).join('');

  // roots
  const roots = [
    `<line x1="100" y1="190" x2="70"  y2="210" stroke="${trunkColor}" stroke-width="3.5" stroke-linecap="round"/>`,
    `<line x1="100" y1="190" x2="130" y2="210" stroke="${trunkColor}" stroke-width="3.5" stroke-linecap="round"/>`,
    `<line x1="100" y1="195" x2="100" y2="215" stroke="${trunkColor}" stroke-width="3"   stroke-linecap="round"/>`,
    `<line x1="70"  y1="210" x2="50"  y2="225" stroke="${trunkColor}" stroke-width="2"   stroke-linecap="round"/>`,
    `<line x1="130" y1="210" x2="150" y2="225" stroke="${trunkColor}" stroke-width="2"   stroke-linecap="round"/>`,
  ];

  return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect width="200" height="240" fill="${PALETTE.bg}"/>
    <rect x="4" y="4" width="192" height="232" rx="4" fill="none" stroke="${PALETTE.primary}" stroke-width="2"/>
    <!-- ground line -->
    <line x1="20" y1="200" x2="180" y2="200" stroke="${trunkColor}" stroke-width="1.5" opacity="0.4"/>
    ${roots.join('')}
    ${branches.join('')}
    ${svgLeaves}
    <!-- small birds -->
    <path d="M36,55 Q40,50 44,55" stroke="${PALETTE.outline}" stroke-width="1.5" fill="none"/>
    <path d="M156,60 Q160,55 164,60" stroke="${PALETTE.outline}" stroke-width="1.5" fill="none"/>
    <text x="100" y="235" text-anchor="middle" font-family="serif" font-size="10" fill="${PALETTE.primary}">जीवन वृक्ष</text>
  </svg>`;
}
