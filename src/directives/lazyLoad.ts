import { DirectiveBinding } from "vue"

interface OptionsType {
    loading: string,
    error: string
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

const lazyLoad = function(options: OptionsType) {
    return {
        mounted(el: any, binding: DirectiveBinding) {
            el.src = options.loading;
            // https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
            const io = new IntersectionObserver((entries) => {
                entries.forEach((item) => {
                    if (item.isIntersecting) {
                        imageAsync(binding.value).then(() => {
                            el.src = binding.value
                        }).catch((error) => {
                            el.src = options.error
                        })
                        io.unobserve(item.target)
                    }
                });
            }, { threshold: 0.0 });
            io.observe(el);
        }
    }
}

export default lazyLoad