import lazyLoad from '@/directives/lazyLoad.js'
import { LazyLoadOptions } from '@/utils/type.js'

export default {
    install: (app: any, options: LazyLoadOptions) => {
        app.directive('lazyLoad', lazyLoad(options))
    }
}