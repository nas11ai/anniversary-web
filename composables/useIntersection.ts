export function useIntersection(threshold = 0.15) {
  const isVisible = ref(false)
  const elementRef = ref<HTMLElement | null>(null)

  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  return { isVisible, elementRef }
}
