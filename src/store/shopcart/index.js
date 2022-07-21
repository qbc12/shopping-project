import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api/index'

const actions = {
    async getCartList(context) {
        let result = await reqCartList()
        if (result.code == 200) {
            context.commit('GETCARTLIST', result.data)
        }
    },

    async deleteCartListById(context, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async updateCheckedById(context, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const state = {
    cartList: []
}
const getters = {
    cartInfoList(state) {
        return (state.cartList[0] || {}).cartInfoList || []
    }
}


export default {
    actions,
    mutations,
    state,
    getters
}