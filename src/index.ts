import focus from './directives/focus.js'
import trim from './directives/trim.js'

const directives: Record<string, any> = {
    focus,
    trim
}

export default {
    install: (app: any) => {
        Object.keys(directives).forEach((dir: string) => {
            app.directive(dir, directives[dir])
        })
    }
}

export {
    focus,
    trim
}