const DISTANCE = 100
const DURATION = 500

const map = new WeakMap()
const ob = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      // 出现在视口
      const animate = map.get(entry.target)
      animate && animate.play()
      ob.unobserve(entry.target)
    }
  }
})

function isBelowViewport(el: any) {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}

export default {
  mounted(el: any) {
    if (!isBelowViewport(el)) return
    const animate = el.animate([{
      transform: `translateY(${DISTANCE}px)`,
      opacity: 0.5
    }, {
      transform: `translateY(0)`,
      opacity: 1
    }], {
      duration: DURATION,
      fill: 'forwards',
      easing: 'ease-out'
    })
    animate.pause()
    map.set(el, animate)
    ob.observe(el)
  },
  unmounted(el: any) {
    ob.unobserve(el)
  }
}