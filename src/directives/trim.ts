import { dispatchEvent, getElement } from '../utils'

type ExpandHTMLElenment = HTMLElement & {
    _inputEle: HTMLElement,
    _blurHandler: Function
}

const trim = {
    mounted(el: ExpandHTMLElenment) {
        let inputEle = getElement(el, 'input')
        const handler = function(event: any) {
            const newVal = event.target.value.trim()
            if (event.target.value != newVal) {
                event.target.value = newVal
                dispatchEvent(inputEle, 'input')
            }
        }
        el._inputEle = inputEle
        el._blurHandler = handler
        inputEle.addEventListener('blur', handler)
    },
    unmounted(el: ExpandHTMLElenment) {
        const { _inputEle } = el
        _inputEle.removeEventListener('blur', el._blurHandler as any)
    }
}

export default trim