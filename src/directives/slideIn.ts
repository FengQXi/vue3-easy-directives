const DISTANCE = 150
const DURATION = 1000

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
const animationMap = new WeakMap<HTMLElement, Animation>()

// https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand
// https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
const io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const animation = animationMap.get(target)
            animation?.play()
            io.unobserve(target)
        }
    })
})

function isBellowViewport(el: HTMLElement) {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
    const rect = el.getBoundingClientRect()
    return rect.top > window.innerHeight && rect.bottom > 0
}

const slideIn = {
    mounted(el: HTMLElement) {
        if(!isBellowViewport(el)) {
            return
        }
        const animation = el.animate([
            {
                transform: `translateY(${DISTANCE}px)`,
                opacity: 0.5
            },
            {
                transfrom: 'translateY(0)',
                opacity: 1
            }
        ], {
            duration: DURATION,
            easing: 'ease'
        })
        animation.pause()
        animationMap.set(el, animation)
        io.observe(el)
    },
    unmounted(el: HTMLElement) {
        io.unobserve(el)
    }
}

export default slideIn