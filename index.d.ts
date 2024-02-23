declare const declaration: {
    install: (app: App) => void
}

export default declaration

declare module 'vue3-easy-directives' {
    export function focus(el: HTMLElement): void
}