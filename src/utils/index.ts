function dispatchEvent(el: HTMLElement, type: string, detail?: object) {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent
    const evt = new CustomEvent(type, {
        bubbles: true,
        detail
    })
    el.dispatchEvent(evt)
}

function getElement(el: HTMLElement, tagName: string): HTMLElement {
    let element
    if (el.tagName !== tagName.toUpperCase()) {
        // find first target element in children
        element = el.querySelector(tagName) as HTMLElement
    } else {
        element = el
    }
    return element
}

export {
    dispatchEvent,
    getElement
}