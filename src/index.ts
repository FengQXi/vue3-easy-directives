import focus from './directives/focus.js'

const directives: Record<string, any> = {
    focus: focus
}

export default {
    install: (app: any) => {
        Object.keys(directives).forEach((dir: string) => {
            app.directive(dir, directives[dir])
        })
    }
}

export {
    focus
}