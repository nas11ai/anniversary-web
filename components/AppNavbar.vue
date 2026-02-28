<script setup lang="ts">
const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Food Highlights', href: '#food' },
  { label: 'Our Fits', href: '#fits' },
  { label: 'Journey Story', href: '#journey' },
  { label: 'Games', href: '#games' }
]

const isScrolled = ref(false)
const activeSection = ref('home')

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
    
    // Update active section
    const sections = ['home', 'food', 'fits', 'journey', 'games']
    for (const section of sections.reverse()) {
      const el = document.getElementById(section)
      if (el && window.scrollY >= el.offsetTop - 100) {
        activeSection.value = section
        break
      }
    }
  })
})

const scrollTo = (href: string) => {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4'
    ]"
  >
    <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a href="#home" @click.prevent="scrollTo('#home')" class="font-handwriting text-xl text-dark font-bold flex items-center gap-2">
        <span class="animate-heartbeat inline-block">💕</span>
        <span :class="isScrolled ? 'text-dark' : 'text-dark'">Us</span>
      </a>

      <!-- Links -->
      <div class="hidden md:flex items-center gap-6">
        <button
          v-for="link in navLinks"
          :key="link.label"
          @click="scrollTo(link.href)"
          :class="[
            'font-body text-sm font-medium transition-all duration-300 relative group',
            activeSection === link.href.replace('#', '')
              ? 'text-sage-dark'
              : 'text-dark/70 hover:text-dark'
          ]"
        >
          {{ link.label }}
          <span
            :class="[
              'absolute -bottom-1 left-0 h-0.5 bg-sage transition-all duration-300',
              activeSection === link.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
            ]"
          />
        </button>
      </div>

      <!-- Mobile menu hint -->
      <div class="md:hidden font-handwriting text-dark/60 text-sm">scroll ↓</div>
    </div>
  </nav>
</template>
