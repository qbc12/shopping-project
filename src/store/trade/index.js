import { reqAddressInfo, reqOrderInfo } from "@/api"

const actions = {
    async getUserAddress(context) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            context.commit('GETUSERADDRESS', result.data)
        }
    },
    async getOrderInfo(context) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            context.commit('GETORDERINFO', result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const state = {
    address: [],
    orderInfo: {}
}
const getters = {}


export default {
    actions,
    mutations,
    state,
    getters
}