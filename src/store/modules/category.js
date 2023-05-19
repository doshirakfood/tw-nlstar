const state = () => ({
    id: null,
    name: '',
    sub: {
        slug: '',
        name: 'Подкатегория'
    },
    list: [],

    products: {
        list: [],
        tags: [],
    }
})

const getters   = {};
const actions   = {};
const mutations = {};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}