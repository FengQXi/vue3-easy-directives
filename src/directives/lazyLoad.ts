import { DirectiveBinding } from "vue"

interface OptionsType {
    loading: string,
    error: string
}

type ExpandHTMLImgElenment = HTMLImageElement & {
    _vLazy_value: string,
    _vLazy_error: Function
}

const imageAsync = (url: string) => {
    return new Promise((resolve: Function, reject: Function) => {
        let img = new Image()
        img.src = url
        img.onload = () => {
            resolve()
        }
        img.onerror = (err: any) => {
            reject(err)
        }
    })
}

// https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand
// https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
const io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
            const target = entry.target as ExpandHTMLImgElenment
            imageAsync(target._vLazy_value).then(() => {
                target.src = target._vLazy_value
            }).catch((error) => {
                target._vLazy_error()
            })
            io.unobserve(target)
        }
    })
}, { threshold: 0.0 })

const lazyLoad = function(options: OptionsType) {
    return {
        mounted(el: ExpandHTMLImgElenment, binding: DirectiveBinding) {
            el.src = options.loading
            el._vLazy_value = binding.value
            el._vLazy_error = () => {
                el.src = options.error
            }
            io.observe(el)
        },
        unmounted(el: ExpandHTMLImgElenment) {
            io.unobserve(el)
        },
    }
}

export default lazyLoad