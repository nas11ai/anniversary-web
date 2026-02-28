<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Counter animation for hero stats
const years = ref(0)
const days = ref(0)
const hours = ref(0)

const animateCounter = (target: Ref<number>, end: number, duration: number) => {
  const start = 0
  const increment = end / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= end) {
      target.value = end
      clearInterval(timer)
    } else {
      target.value = Math.floor(current)
    }
  }, 16)
}

// Data
const foodItems = [
  { caption: 'Padang Restaurant', rotate: '-3deg', delay: 0 },
  { caption: 'Boba & Tea', rotate: '2deg', delay: 150 },
  { caption: 'Afrimaya Bakery', rotate: '-1deg', delay: 300 },
  { caption: 'Burger Drops', rotate: '3deg', delay: 450 }
]

const outfitItems = [
  { caption: 'Date 1, but make it comfy', rotate: '-2deg' },
  { caption: 'Latte Girls', rotate: '3deg' },
  { caption: 'Malemester Kimbap', rotate: '-3deg' }
]

const journeyItems = [
  { caption: 'Awal Ketemu', rotate: '-2deg' },
  { caption: 'Mil Bestivan', rotate: '2deg' },
  { caption: 'Date Milestone: Pertama', rotate: '-1deg' },
  { caption: 'Anniversary ke: Completed', rotate: '3deg' }
]

const gameImages = Array(6).fill(null).map((_, i) => ({ alt: `Roblox ${i + 1}` }))

onMounted(() => {
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  // ───────────────────────────────────────────
  // CUTE CURSOR
  // ───────────────────────────────────────────
  const dot = document.querySelector('.cute-cursor-dot') as HTMLElement | null
  const ring = document.querySelector('.cute-cursor-ring') as HTMLElement | null

  if (dot && ring) {
    // posisi awal offscreen
    gsap.set([dot, ring], { x: -100, y: -100 })

    // bikin follow smooth
    const pos = { x: 0, y: 0 }
    const ringPos = { x: 0, y: 0 }

    const move = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY

      // dot nempel
      gsap.to(dot, {
        x: pos.x,
        y: pos.y,
        duration: 0.05,
        ease: 'power2.out'
      })

      // ring ngikut lebih lambat (feel “cute”)
      gsap.to(ring, {
        x: pos.x,
        y: pos.y,
        duration: 0.18,
        ease: 'power3.out'
      })
    }

    window.addEventListener('mousemove', move)

    // click "pop"
    const down = () => {
      gsap.to(ring, { scale: 0.75, duration: 0.12, ease: 'power2.out' })
      gsap.to(dot, { scale: 1.4, duration: 0.12, ease: 'power2.out' })
    }
    const up = () => {
      gsap.to(ring, { scale: 1, duration: 0.18, ease: 'back.out(2)' })
      gsap.to(dot, { scale: 1, duration: 0.18, ease: 'back.out(2)' })
    }

    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    // hover state on clickable
    const enterClickable = () => {
      ring.classList.add('is-hover')
      dot.classList.add('is-hover')
    }
    const leaveClickable = () => {
      ring.classList.remove('is-hover')
      dot.classList.remove('is-hover')
    }

    const bindHover = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], .polaroid, .game-card, .cursor-pointer')
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', enterClickable)
        el.addEventListener('mouseleave', leaveClickable)
      })
    }
    bindHover()

    // cleanup (good practice di SPA)
    onBeforeUnmount(() => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    })
  }

  // Start counter animations
  setTimeout(() => animateCounter(years, 3, 1500), 1000)
  setTimeout(() => animateCounter(days, 1095, 1500), 1200)
  setTimeout(() => animateCounter(hours, 26280, 1800), 1400)

  // ═══════════════════════════════════════════
  // HERO SECTION ANIMATIONS
  // ═══════════════════════════════════════════

  // Animate hero elements on load
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  heroTl
    .from('.hero-badge', {
      y: -30,
      opacity: 0,
      duration: 0.8
    })
    .from('.hero-stat', {
      x: -60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    }, '-=0.4')
    .from('.hero-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.8
    }, '-=0.4')
    .from('.hero-photo', {
      scale: 0.8,
      opacity: 0,
      rotation: -5,
      duration: 1,
      ease: 'back.out(1.7)'
    }, '-=0.6')

  // Parallax blobs in hero
  gsap.to('.hero-blob-1', {
    y: 100,
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  })

  gsap.to('.hero-blob-2', {
    y: 150,
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    }
  })

  // ═══════════════════════════════════════════
  // FOOD SECTION - STORYTELLING REVEAL
  // ═══════════════════════════════════════════

  ScrollTrigger.create({
    trigger: '#food',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.food-header', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from('.food-featured-1', {
        y: 80,
        opacity: 0,
        rotation: -15,
        duration: 1,
        delay: 0.3,
        ease: 'back.out(1.4)'
      })

      gsap.from('.food-featured-2', {
        y: 80,
        opacity: 0,
        rotation: 15,
        duration: 1,
        delay: 0.5,
        ease: 'back.out(1.4)'
      })

      gsap.from('.food-card', {
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.8,
        ease: 'back.out(1.2)'
      })
    }
  })

  // Parallax food featured items
  gsap.to('.food-featured-1', {
    y: -30,
    scrollTrigger: {
      trigger: '#food',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  })

  gsap.to('.food-featured-2', {
    y: -50,
    scrollTrigger: {
      trigger: '#food',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    }
  })

  // ═══════════════════════════════════════════
  // FITS SECTION - CINEMATIC REVEAL
  // ═══════════════════════════════════════════

  ScrollTrigger.create({
    trigger: '#fits',
    start: 'top 75%',
    onEnter: () => {
      gsap.from('.fits-header', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from('.fits-card', {
        y: 100,
        opacity: 0,
        scale: 0.85,
        rotation: (index) => index % 2 === 0 ? -8 : 8,
        duration: 1.2,
        stagger: 0.2,
        delay: 0.4,
        ease: 'power4.out'
      })
    }
  })

  // ═══════════════════════════════════════════
  // JOURNEY SECTION - TIMELINE STORYTELLING
  // ═══════════════════════════════════════════

  ScrollTrigger.create({
    trigger: '#journey',
    start: 'top 75%',
    onEnter: () => {
      gsap.from('.journey-header', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      // Animate cards like flipping photos
      gsap.from('.journey-card', {
        rotationY: 90,
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.4,
        ease: 'back.out(1.5)',
        transformOrigin: 'center center',
        transformPerspective: 1000
      })

      // Timeline dots reveal
      gsap.from('.timeline-dot', {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 1.2,
        ease: 'back.out(2)'
      })

      gsap.from('.timeline-line', {
        scaleX: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 1.2,
        ease: 'power2.out',
        transformOrigin: 'left center'
      })
    }
  })

  // ═══════════════════════════════════════════
  // GAMES SECTION - PLAYFUL REVEAL
  // ═══════════════════════════════════════════

  ScrollTrigger.create({
    trigger: '#games',
    start: 'top 75%',
    onEnter: () => {
      gsap.from('.games-header', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from('.game-card', {
        scale: 0,
        opacity: 0,
        rotation: (index) => (index % 2 === 0 ? -180 : 180),
        duration: 0.6,
        stagger: {
          each: 0.08,
          from: 'center'
        },
        delay: 0.3,
        ease: 'back.out(1.7)'
      })

      gsap.from('.games-caption', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        ease: 'power2.out'
      })
    }
  })

  // ═══════════════════════════════════════════
  // FOOTER - FINAL REVEAL
  // ═══════════════════════════════════════════

  ScrollTrigger.create({
    trigger: 'footer',
    start: 'top 85%',
    onEnter: () => {
      gsap.from('.footer-heart', {
        scale: 0,
        rotation: -180,
        duration: 0.8,
        ease: 'back.out(2)'
      })

      gsap.from('.footer-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      })

      gsap.from('.footer-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      })

      gsap.from('.footer-stat', {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.6,
        ease: 'back.out(1.5)'
      })
    }
  })
})
</script>

<template>
  <div class="min-h-screen bg-peach font-body overflow-x-hidden">
    <!-- Cute custom cursor -->
    <div class="cute-cursor-dot" />
    <div class="cute-cursor-ring" />

    <!-- Navbar -->
    <AppNavbar />

    <!-- ═══════════════════════════════════════════
         HERO SECTION
    ═══════════════════════════════════════════ -->
    <section id="home" class="relative min-h-screen flex items-center overflow-hidden">
      <!-- Background blobs with parallax -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          class="hero-blob-1 absolute top-20 right-10 w-64 h-64 bg-peach-light/50 rounded-full blur-3xl animate-blob" />
        <div
          class="hero-blob-2 absolute bottom-40 left-10 w-80 h-80 bg-sage-light/30 rounded-full blur-3xl animate-blob"
          style="animation-delay: 3s" />
        <div class="absolute top-1/2 right-1/3 w-48 h-48 bg-peach-dark/20 rounded-full blur-2xl animate-blob"
          style="animation-delay: 6s" />
      </div>

      <!-- Floating hearts decoration -->
      <div class="absolute inset-0 pointer-events-none">
        <span class="absolute top-32 right-20 text-3xl animate-float opacity-60">💕</span>
        <span class="absolute top-48 right-40 text-xl animate-float-alt opacity-40" style="animation-delay: 1s">✨</span>
        <span class="absolute bottom-48 right-16 text-2xl animate-float opacity-50"
          style="animation-delay: 2s">🌸</span>
        <span class="absolute top-60 left-[55%] text-lg animate-float-alt opacity-30"
          style="animation-delay: 0.5s">⭐</span>
      </div>

      <div class="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10 w-full">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left: Text content -->
          <div>
            <!-- Eyebrow label -->
            <div
              class="hero-badge mb-6 inline-flex items-center gap-2 bg-sage/20 text-sage-dark px-4 py-1.5 rounded-full text-sm font-handwriting">
              <span class="animate-heartbeat">💖</span>
              Our little universe
            </div>

            <!-- Counter stats -->
            <div class="space-y-2">
              <div v-for="(stat, i) in [
                { value: years, label: 'Years', emoji: '🌟' },
                { value: days, label: 'Days', emoji: '🌙' },
                { value: hours.toLocaleString(), label: 'Hours', emoji: '✨' }
              ]" :key="stat.label" class="hero-stat">
                <div class="flex items-baseline gap-3">
                  <span class="font-display text-5xl md:text-7xl font-black text-dark">
                    {{ stat.value }}
                  </span>
                  <span class="font-display text-2xl md:text-3xl font-bold text-dark/70 italic">
                    {{ stat.label }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Subtitle -->
            <p class="hero-subtitle mt-8 font-handwriting text-xl text-dark/70">
              and counting... forever with you 🌷
            </p>
          </div>

          <!-- Right: Couple photo -->
          <div class="hero-photo flex justify-center md:justify-end">
            <div class="w-72 md:w-96 drop-shadow-2xl">
              <img :src="'/images/hero.png'" alt="Us together forever" class="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>

      <!-- Wave bottom -->
      <div class="absolute bottom-0 left-0 right-0 wave-divider">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" class="w-full h-16 md:h-24">
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="#FBF5EE" />
        </svg>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         FOOD HIGHLIGHTS SECTION
    ═══════════════════════════════════════════ -->
    <section id="food" class="bg-cream relative py-20 overflow-hidden">
      <div class="max-w-6xl mx-auto px-6">
        <!-- Section header -->
        <div class="food-header mb-12">
          <p class="section-label mb-2">food highlights</p>
          <h2 class="section-title">
            Calories don't count<br />
            <span class="italic text-sage-dark">when we're together</span>
          </h2>
        </div>

        <!-- Featured polaroids - top row (bigger, overlapping) -->
        <div class="relative mb-8">
          <!-- Big polaroid 1 -->
          <div class="food-featured-1 inline-block absolute top-0 right-8 md:right-20 z-10 rotate-[-2deg]">
            <div
              class="polaroid w-40 md:w-52 cursor-pointer hover:rotate-0 hover:scale-105 transition-all duration-500">
              <div class="photo-placeholder h-32 md:h-44 bg-gray-200 flex items-center justify-center">
                <span class="text-3xl">🍜</span>
              </div>
              <p class="mt-2 font-handwriting text-xs text-center text-dark/60">Cafe Favorit kita!</p>
            </div>
          </div>

          <!-- Big polaroid 2 (even bigger) -->
          <div class="food-featured-2 inline-block absolute top-4 right-48 md:right-72 z-10 rotate-[3deg]">
            <div
              class="polaroid w-36 md:w-44 cursor-pointer hover:rotate-0 hover:scale-105 transition-all duration-500">
              <div class="photo-placeholder h-28 md:h-36 bg-gray-200 flex items-center justify-center">
                <span class="text-3xl">🧋</span>
              </div>
              <p class="mt-2 font-handwriting text-xs text-center text-dark/60">We're made for this!</p>
            </div>
          </div>

          <div class="h-48 md:h-56" /> <!-- spacer -->
        </div>

        <!-- Bottom row of polaroids -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="(item, i) in foodItems" :key="item.caption" class="food-card">
            <div class="polaroid cursor-pointer hover:rotate-0 hover:scale-105 transition-all duration-500"
              :style="{ transform: `rotate(${item.rotate})` }">
              <div class="photo-placeholder h-40 md:h-48 bg-gray-200 flex items-center justify-center">
                <div class="text-center">
                  <span class="text-3xl block mb-2">{{ ['🍛', '🧋', '🥐', '🍔'][i] }}</span>
                  <span class="text-gray-400 text-xs font-body">{{ item.caption }}</span>
                </div>
              </div>
              <p class="mt-2 font-handwriting text-xs text-center text-dark/60">{{ item.caption }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave bottom -->
      <div class="absolute bottom-0 left-0 right-0 wave-divider">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" class="w-full h-16 md:h-24">
          <path d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,20 1440,40 L1440,120 L0,120 Z" fill="#E8A98C" />
        </svg>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         OUR FITS SECTION
    ═══════════════════════════════════════════ -->
    <section id="fits" class="bg-peach relative py-20 overflow-hidden">
      <!-- Decorative circles -->
      <div class="absolute top-20 right-0 w-72 h-72 bg-peach-light/40 rounded-full blur-3xl pointer-events-none" />

      <div class="max-w-6xl mx-auto px-6">
        <!-- Section header -->
        <div class="fits-header mb-12">
          <p class="section-label mb-2">our fits</p>
          <h2 class="section-title">
            When the world dresses casual,<br />
            <span class="italic text-sage-dark">we dress like memes</span>
          </h2>
        </div>

        <!-- Outfit polaroids - 3 column with different sizes -->
        <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-center">
          <div v-for="(item, i) in outfitItems" :key="item.caption" :class="['fits-card', i === 1 ? 'md:mt-8' : '']">
            <div
              class="polaroid group hover:rotate-0 hover:z-10 relative cursor-pointer transition-all duration-500 w-48 md:w-56"
              :style="{ transform: `rotate(${item.rotate})` }">
              <div class="photo-placeholder h-60 md:h-72 bg-gray-200 flex items-center justify-center">
                <div class="text-center">
                  <span class="text-4xl block mb-2">👗</span>
                  <span class="text-gray-400 text-xs font-body">outfit {{ i + 1 }}</span>
                </div>
              </div>
              <p class="mt-3 font-handwriting text-sm text-center text-dark/70">{{ item.caption }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave bottom (sage) -->
      <div class="absolute bottom-0 left-0 right-0 wave-divider">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" class="w-full h-16 md:h-24">
          <path d="M0,80 C200,20 500,100 720,50 C940,0 1200,90 1440,40 L1440,120 L0,120 Z" fill="#7D9B76" />
        </svg>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         JOURNEY / STORY SECTION (SAGE GREEN)
    ═══════════════════════════════════════════ -->
    <section id="journey" class="bg-sage relative py-20 overflow-hidden">
      <!-- Decorative blobs -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute top-10 left-20 w-56 h-56 bg-sage-light/30 rounded-full blur-2xl animate-blob" />
        <div class="absolute bottom-10 right-20 w-64 h-64 bg-sage-dark/20 rounded-full blur-3xl animate-blob"
          style="animation-delay: 4s" />
      </div>

      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <!-- Section header -->
        <div class="journey-header mb-12">
          <p class="section-label mb-2 !text-cream/80">journey story</p>
          <h2 class="section-title !text-cream">
            Canon event survived,<br />
            <span class="italic text-cream/80">no matter the plot twist</span>
          </h2>
        </div>

        <!-- Journey polaroids -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="(item, i) in journeyItems" :key="item.caption" class="journey-card">
            <div class="polaroid cursor-pointer hover:rotate-0 hover:scale-105 transition-all duration-500"
              :style="{ transform: `rotate(${item.rotate})` }">
              <div class="photo-placeholder h-40 md:h-48 bg-gray-200 flex items-center justify-center">
                <div class="text-center">
                  <span class="text-3xl block mb-2">{{ ['✨', '💫', '💖', '🎉'][i] }}</span>
                  <span class="text-gray-400 text-xs font-body">Moment {{ i + 1 }}</span>
                </div>
              </div>
              <p class="mt-2 font-handwriting text-xs text-center text-dark/60">{{ item.caption }}</p>
            </div>
          </div>
        </div>

        <!-- Timeline dots -->
        <div class="mt-12 flex items-center justify-center gap-4">
          <div class="flex items-center gap-2">
            <div class="timeline-dot w-3 h-3 rounded-full bg-cream" />
            <div class="timeline-line w-16 h-0.5 bg-cream/50" />
            <div class="timeline-dot w-3 h-3 rounded-full bg-cream" />
            <div class="timeline-line w-16 h-0.5 bg-cream/50" />
            <div class="timeline-dot w-3 h-3 rounded-full bg-cream animate-heartbeat" />
            <div class="timeline-line w-16 h-0.5 bg-cream/50" />
            <div class="timeline-dot w-4 h-4 rounded-full bg-peach flex items-center justify-center">
              <span class="text-xs">♥</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave bottom -->
      <div class="absolute bottom-0 left-0 right-0 wave-divider">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" class="w-full h-16 md:h-24">
          <path d="M0,30 C300,100 600,0 900,70 C1100,120 1300,20 1440,60 L1440,120 L0,120 Z" fill="#E8A98C" />
        </svg>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         GAMES SECTION
    ═══════════════════════════════════════════ -->
    <section id="games" class="bg-peach relative py-20 overflow-hidden">
      <!-- Floating game elements -->
      <div class="absolute inset-0 pointer-events-none">
        <span class="absolute top-16 right-10 text-3xl animate-float opacity-50">🎮</span>
        <span class="absolute top-32 left-12 text-2xl animate-float-alt opacity-40"
          style="animation-delay: 1.5s">⭐</span>
        <span class="absolute bottom-32 right-20 text-xl animate-float opacity-30"
          style="animation-delay: 0.8s">🌟</span>
      </div>

      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <!-- Section header -->
        <div class="games-header mb-8">
          <p class="section-label mb-2">games</p>
          <h2 class="section-title">
            Co-op Mode :
            <span class="text-sage-dark italic">Roblox</span>
          </h2>
        </div>

        <!-- Game screenshots grid -->
        <div class="grid grid-cols-3 gap-3 md:gap-4">
          <div v-for="(game, i) in gameImages" :key="game.alt"
            class="game-card relative overflow-hidden rounded-2xl group">
            <div class="aspect-square bg-gray-300 w-full group-hover:scale-110 transition-transform duration-500">
              <div class="w-full h-full flex items-center justify-center">
                <div class="text-center">
                  <span class="text-3xl block mb-1">🎮</span>
                  <span class="text-gray-500 text-xs font-body">{{ game.alt }}</span>
                </div>
              </div>
            </div>
            <!-- Hover overlay -->
            <div
              class="absolute inset-0 bg-sage/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span class="text-white font-handwriting text-sm bg-dark/50 px-3 py-1 rounded-full">{{ game.alt }}</span>
            </div>
          </div>
        </div>

        <!-- Fun caption -->
        <div class="games-caption mt-8 text-center">
          <p class="font-handwriting text-lg text-dark/70">Yes, we take Roblox dates seriously 😤💕</p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════════ -->
    <footer class="bg-dark text-cream py-12 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/4 w-48 h-48 bg-sage/10 rounded-full blur-3xl" />
        <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-peach/10 rounded-full blur-3xl" />
      </div>

      <div class="max-w-6xl mx-auto px-6 text-center relative z-10">
        <div class="footer-heart text-5xl mb-4 inline-block">💕</div>
        <h3 class="footer-title font-display text-2xl font-bold text-cream mb-2">3 Years & Counting</h3>
        <p class="footer-subtitle font-handwriting text-cream/60 text-lg mb-6">
          Every day with you is my favorite adventure
        </p>

        <!-- Stats bar -->
        <div class="flex items-center justify-center gap-8 text-cream/80">
          <div class="footer-stat text-center">
            <p class="font-display text-2xl font-bold">3</p>
            <p class="font-body text-xs uppercase tracking-wider opacity-60">Years</p>
          </div>
          <div class="w-px h-10 bg-cream/20" />
          <div class="footer-stat text-center">
            <p class="font-display text-2xl font-bold">1095</p>
            <p class="font-body text-xs uppercase tracking-wider opacity-60">Days</p>
          </div>
          <div class="w-px h-10 bg-cream/20" />
          <div class="footer-stat text-center">
            <p class="font-display text-2xl font-bold">26,280</p>
            <p class="font-body text-xs uppercase tracking-wider opacity-60">Hours</p>
          </div>
        </div>

        <p class="mt-8 font-body text-xs text-cream/30">Made with 💕 for us, by us</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Hide default cursor */
html,
body,
* {
  cursor: none !important;
}

/* cursor dot */
.cute-cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: rgba(232, 169, 140, 0.95);
  /* peach */
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  box-shadow: 0 0 0 6px rgba(232, 169, 140, 0.10);
}

/* cursor ring */
.cute-cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 34px;
  height: 34px;
  border-radius: 9999px;
  border: 2px solid rgba(125, 155, 118, 0.45);
  /* sage */
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9998;
  backdrop-filter: blur(2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.10);
}

/* hover = lebih “cute” */
.cute-cursor-ring.is-hover {
  border-color: rgba(125, 155, 118, 0.75);
  width: 44px;
  height: 44px;
}

.cute-cursor-dot.is-hover {
  width: 10px;
  height: 10px;
}
</style>
