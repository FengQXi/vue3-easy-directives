import lazyLoad from '../directives/lazyLoad.js'

type OptionsType = {
    loading: string,
    error: string
}

export default {
    install: (app: any, options: OptionsType) => {
        app.directive('lazyLoad', lazyLoad(options))
    }
  }