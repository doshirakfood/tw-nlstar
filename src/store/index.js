import * as Vuex from 'vuex'

import main      from './modules/main'
import category  from './modules/category'


export default new Vuex.Store({
    modules: {
        'main':     main,
        'category': category,
    },
})