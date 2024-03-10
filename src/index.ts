import focus from './directives/focus.js'
import trim from './directives/trim.js'
import lazyLoad from './plugins/lazyLoad.js'
import copy from './directives/copy.js'
import slideIn from './directives/slideIn.js'

const directives: Record<string, any> = {
    focus,
    trim,
    copy,
    slideIn
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
    trim,
    lazyLoad,
    copy,
    slideIn,
}