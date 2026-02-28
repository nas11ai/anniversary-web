<script setup lang="ts">
interface Props {
  caption?: string
  rotate?: string
  imageSrc?: string
  imageAlt?: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  caption: '',
  rotate: '-2deg',
  delay: 0
})

const isVisible = ref(false)
const cardRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            isVisible.value = true
          }, props.delay)
        }
      })
    },
    { threshold: 0.1 }
  )
  if (cardRef.value) observer.observe(cardRef.value)
})
</script>

<template>
  <div
    ref="cardRef"
    :style="{ '--rotate': rotate }"
    :class="[
      'polaroid group cursor-pointer transition-all duration-700',
      'hover:rotate-0 hover:z-10 relative',
      isVisible ? 'opacity-100 translate-y-0 animate-scale-in' : 'opacity-0 translate-y-8'
    ]"
    :style="{
      transform: `rotate(${rotate})`,
      transitionDelay: `${delay}ms`
    }"
  >
    <!-- Photo area -->
    <div class="photo-placeholder bg-gray-200 group-hover:brightness-105 transition-all duration-300">
      <img
        v-if="imageSrc"
        :src="imageSrc"
        :alt="imageAlt || caption"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <div class="text-center p-4">
          <div class="text-4xl mb-2">📷</div>
          <p class="text-gray-400 text-xs font-body">Add photo here</p>
        </div>
      </div>
    </div>

    <!-- Caption -->
    <div class="pt-3 text-center">
      <p class="font-handwriting text-dark/70 text-sm leading-tight">{{ caption }}</p>
    </div>

    <!-- Tape effect -->
    <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-yellow-100/80 border border-yellow-200/50 rotate-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
</template>

<style scoped>
.polaroid {
  background: white;
  padding: 12px 12px 36px 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08);
}

.photo-placeholder {
  min-height: 160px;
}

@media (min-width: 768px) {
  .photo-placeholder {
    min-height: 200px;
  }
}
</style>
