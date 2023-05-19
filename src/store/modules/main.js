const state = () => ({
    location: JSON.parse(localStorage.getItem('locationParams')) || {
        "id": 1,
        "label": "Россия, Новосибирская область, Новосибирск",
        "city": "Новосибирск",
        "region": "Новосибирская область",
        "region_id": 45,
        "country": "Россия",
        "is_megalopolis": true,
        "country_id": 1,
        "country_alias": "ru"
    },

    getURL: {
        city:       'https://nlstar.com/api/catalog3/v1/city',
        categories: 'https://nlstar.com/ru/api/catalog3/v1/menutags',

    }
})

const getters   = {
    doneLocation (state) {

        return state.location;
    
    }
};

const actions   = {};
const mutations = {};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}