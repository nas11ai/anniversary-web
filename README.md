# 💕 Anniversary Website

Website anniversary yang dibuat dengan **Nuxt 4, TypeScript, Tailwind CSS, dan GSAP** untuk storytelling experience yang cinematic.

## 🚀 Setup & Run

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build
```

Server akan berjalan di `http://localhost:3000`

## 📁 Struktur Project

```
anniversary/
├── assets/css/main.css        # Global styles & Tailwind
├── components/
│   ├── AppNavbar.vue           # Sticky navbar dengan scroll indicator
│   ├── PolaroidCard.vue        # Reusable polaroid photo card
│   └── TornPaperFrame.vue      # 🆕 Bingkai foto sobekan kertas untuk couple
├── composables/
│   └── useIntersection.ts      # Intersection Observer hook
├── plugins/
│   └── gsap.client.ts          # 🆕 GSAP ScrollTrigger plugin
├── pages/
│   └── index.vue               # Main page dengan GSAP storytelling
├── nuxt.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## ✨ Fitur GSAP Storytelling

### 🎬 Cinematic Animations
Setiap section punya animasi storytelling unik dengan GSAP ScrollTrigger:

1. **Hero Section**
   - Counter animations (Years/Days/Hours)
   - Parallax blobs background
   - Torn paper frame untuk foto couple (kanan atas)
   - Smooth entrance animations

2. **Food Highlights**
   - Featured polaroids dengan rotation reveal
   - Staggered card animations
   - Parallax featured items

3. **Our Fits**
   - Cards flip dengan rotation effect
   - Scale & rotation dari sudut berbeda
   - Smooth hover states

4. **Journey Story**
   - 3D rotationY flip untuk cards
   - Timeline dots dengan scale reveal
   - Timeline lines dengan scaleX effect

5. **Games Section**
   - Cards explode dari center dengan rotation
   - Playful stagger animations
   - Caption fade-in

6. **Footer**
   - Heart scale & rotation reveal
   - Stats counter dengan stagger

### 🖼️ Torn Paper Frame (Hero)
Spot khusus di hero section dengan:
- Bingkai sobekan kertas (torn/ripped paper effect)
- SVG clip-path untuk edge yang tidak rata
- Paper texture overlay
- Tape & pins decoration
- Hover animations dengan tape reveal

## 📸 Cara Tambah Foto

### 🖼️ Foto Couple di Hero (Torn Paper Frame)
Di `pages/index.vue`, cari component `TornPaperFrame`:
```vue
<TornPaperFrame 
  image-src="/photos/couple-photo.jpg"
  image-alt="Us together forever"
/>
```

Ganti `image-src=""` dengan path foto kalian yang ada di `public/photos/`.

### 📷 Foto di Section Lain
Di `pages/index.vue`, ganti setiap bagian:
```html
<div class="photo-placeholder h-32 bg-gray-200 ...">
  <span class="text-3xl">🍜</span>
</div>
```

Jadi:
```html
<img src="/photos/nama-foto.jpg" alt="caption" class="w-full h-full object-cover" />
```

Atau pakai `PolaroidCard` component dengan prop `image-src`:
```vue
<PolaroidCard
  caption="Padang Restaurant"
  image-src="/photos/padang.jpg"
  rotate="-3deg"
/>
```

**📁 Simpan semua foto di folder `public/photos/`.**

## 🎨 Warna & Font

- **Peach**: #E8A98C (primary background)
- **Sage Green**: #7D9B76 (accent)
- **Cream**: #FBF5EE (light sections)
- **Dark**: #2C2015 (text)

- **Display Font**: Playfair Display (serif)
- **Body Font**: Nunito (sans-serif)
- **Handwriting**: Caveat (cursive)

## 🎬 Animasi GSAP + Tailwind

### GSAP ScrollTrigger (Storytelling)
- **Hero**: Parallax blobs, entrance animations, counter effects
- **Food**: Rotation reveals, staggered cards, parallax featured items
- **Fits**: 3D rotation flips, scale & rotate dari berbagai sudut
- **Journey**: rotationY flip (seperti foto terbalik), timeline animations
- **Games**: Exploding cards dari center dengan rotation
- **Footer**: Scale & rotation reveals untuk ending

### Tailwind CSS Utilities
- `animate-float` / `animate-float-alt` — floating hearts & elements
- `animate-heartbeat` — pulsing heart di navbar & timeline
- `animate-blob` — morphing background blobs
- `animate-fade-up`, `animate-scale-in` — entrance animations
- Custom delays dengan `animate-delay-{n}` classes

Semua animasi GSAP di-trigger saat scroll menggunakan **ScrollTrigger** untuk pengalaman storytelling yang smooth dan cinematic! 🎥
