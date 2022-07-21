import { reqCategoryList, reqGetBannerList, reqFloorList } from "../../api";


const actions = {
    async categoryList(context) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            context.commit('CATEGORYLIST', result.data)
        }
    },

    async getBannerList(context) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            context.commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList(context) {
        let result = await reqFloorList()
        if (result.code == 200) {
            context.commit('GETFLOORLIST', result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, category) {
        state.category = category
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const state = {
    category: [],
    bannerList: [],
    floorList: []
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}