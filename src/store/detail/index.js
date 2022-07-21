import { getUUID } from '@/utils/uuid_token'
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"

const actions = {
    async getGoodInfo(context, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            context.commit('GETGOODINFO', result.data)
        }
    },
    async addOrUpdateShopCart(context, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return 'successed'
        } else {
            return Promise.reject(new Error('failed'))
        }

    }
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    },

}
const state = {
    goodInfo: {},
    uuid_token: getUUID()
}
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    },
}


export default {
    actions,
    mutations,
    state,
    getters
}
