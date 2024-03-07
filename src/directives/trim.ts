import { dispatchEvent, getElement } from '../utils'

type ExpandHTMLElenment = HTMLElement & {
    _vTrim_inputEle: HTMLElement,
    _vTrim_handler: Function
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
        el._vTrim_inputEle = inputEle
        el._vTrim_handler = handler
        inputEle.addEventListener('blur', handler)
    },
    unmounted(el: ExpandHTMLElenment) {
        const { _vTrim_inputEle } = el
        _vTrim_inputEle.removeEventListener('blur', el._vTrim_handler as any)
    }
}

export default trim