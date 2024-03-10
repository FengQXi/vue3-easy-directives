import { DirectiveBinding } from 'vue';

type ExpandHTMLElenment = HTMLElement & {
    _vCopy_value: string,
    _vCopy_success: Function,
    _vCopy_error: Function,
    _vCopy_handler: (this: HTMLElement, ev: MouseEvent) => any,
}

const copy = {
    mounted(el: ExpandHTMLElenment, binding: DirectiveBinding) {
        if (binding.arg === 'success') {
            el._vCopy_success = binding.value
        } else if (binding.arg === 'error') {
            el._vCopy_error = binding.value
        } else {
            el._vCopy_value = binding.value
            const handler = async function() {
                // https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/clipboard
                navigator.clipboard.writeText(el._vCopy_value).then(() => {
                    if (!!el._vCopy_success || typeof el._vCopy_success === 'function') {
                        el._vCopy_success();
                    }
                }).catch((err) => {
                    if (!!el._vCopy_error || typeof el._vCopy_error === 'function') {
                        el._vCopy_error();
                    }
                    console.error('Failed to copy text', err);
                })
            }
            el._vCopy_handler = handler
            el.addEventListener('click', el._vCopy_handler);
        }
    },
    updated(el: ExpandHTMLElenment, binding: DirectiveBinding) {
        if (binding.arg === 'success') {
            el._vCopy_success = binding.value
        } else if (binding.arg === 'error') {
            el._vCopy_error = binding.value
        } else {
            el._vCopy_value = binding.value
        }
    },
    unmounted(el: ExpandHTMLElenment) {
        el.removeEventListener('click', el._vCopy_handler);
    },
}

export default copy