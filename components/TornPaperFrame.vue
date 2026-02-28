<script setup lang="ts">
interface Props {
  imageSrc?: string
  imageAlt?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: 'Us'
})
</script>

<template>
  <div class="relative group">
    <!-- Torn paper effect container -->
    <div class="relative">
      <!-- Shadow layer -->
      <div class="absolute inset-0 bg-dark/10 blur-xl transform translate-y-2" />
      
      <!-- Main torn paper frame -->
      <div class="relative bg-white p-4 shadow-2xl" style="
        clip-path: polygon(
          2% 0%, 8% 2%, 15% 0%, 25% 1%, 35% 0%, 45% 2%, 55% 0%, 65% 1%, 75% 0%, 85% 2%, 95% 0%, 98% 1%,
          100% 5%, 99% 15%, 100% 25%, 98% 35%, 100% 45%, 99% 55%, 100% 65%, 98% 75%, 100% 85%, 99% 95%, 100% 98%,
          95% 100%, 85% 98%, 75% 100%, 65% 99%, 55% 100%, 45% 98%, 35% 100%, 25% 99%, 15% 100%, 8% 98%, 2% 100%, 0% 98%,
          0% 85%, 2% 75%, 0% 65%, 1% 55%, 0% 45%, 2% 35%, 0% 25%, 1% 15%, 0% 5%, 1% 2%
        );
      ">
        <!-- Photo area -->
        <div class="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            v-if="imageSrc"
            :src="imageSrc"
            :alt="imageAlt"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-peach-light to-peach p-6 text-center">
            <div class="text-6xl mb-4">💕</div>
            <p class="font-handwriting text-2xl text-dark/70">Add your</p>
            <p class="font-handwriting text-3xl text-dark font-bold">photo here</p>
            <p class="font-body text-sm text-dark/50 mt-2">Together forever</p>
          </div>
        </div>

        <!-- Handwritten caption at bottom -->
        <div class="mt-3 text-center">
          <p class="font-handwriting text-lg text-dark/70">Us ✨</p>
        </div>
      </div>

      <!-- Tape pieces for decoration -->
      <div class="absolute -top-3 left-8 w-16 h-6 bg-yellow-100/90 border border-yellow-200/60 rotate-[-8deg] shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div class="absolute -top-3 right-8 w-16 h-6 bg-yellow-100/90 border border-yellow-200/60 rotate-[12deg] shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      <!-- Paper texture overlay -->
      <div class="absolute inset-0 pointer-events-none opacity-5 mix-blend-multiply" style="
        background-image: url('data:image/svg+xml,%3Csvg viewBox=&quot;0 0 200 200&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cfilter id=&quot;noiseFilter&quot;%3E%3CfeTurbulence type=&quot;fractalNoise&quot; baseFrequency=&quot;0.9&quot; numOctaves=&quot;4&quot; stitchTiles=&quot;stitch&quot;/%3E%3C/filter%3E%3Crect width=&quot;100%25&quot; height=&quot;100%25&quot; filter=&quot;url(%23noiseFilter)&quot;/%3E%3C/svg%3E');
      " />
    </div>

    <!-- Pins/thumbtacks decoration -->
    <div class="absolute -top-4 left-12 w-3 h-3 rounded-full bg-sage shadow-lg transform group-hover:scale-110 transition-transform duration-300" />
    <div class="absolute -top-4 right-12 w-3 h-3 rounded-full bg-peach-dark shadow-lg transform group-hover:scale-110 transition-transform duration-300" />
  </div>
</template>

<style scoped>
/* Additional torn edge effect with shadows */
.relative.bg-white {
  filter: drop-shadow(0 10px 25px rgba(0,0,0,0.15)) drop-shadow(0 5px 10px rgba(0,0,0,0.1));
}
</style>
