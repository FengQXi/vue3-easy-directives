import focus from './directives/focus.js'

const directives = {
    focus
}

export default {
    install: (app: any) => {
        Object.keys(directives).forEach((dir) => {
            app.directive(dir)
        })
    }
}

export {
    focus
}