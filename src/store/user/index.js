import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'

const actions = {
    async getCode(context, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            context.commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async userRegister(context, data) {
        let result = await reqUserRegister(data)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    async userLogin(context, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            context.commit('USERLOGIN', result.data.token)
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    async getUserInfo(context) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            context.commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('token已过期，请重新登录'))
        }
    },
    async userLogout(context) {
        let result = await reqLogout()
        if (result.code == 200) {
            context.commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem('TOKEN')
    }
}
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
}
const getters = {}


export default {
    actions,
    mutations,
    state,
    getters
}