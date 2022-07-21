import requests from "./request";
import mockRequests from './mockAjax'




export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' })
export const reqFloorList = () => mockRequests.get('/floor')
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })
export const reqGoodsInfo = (skuId) => requests.get(`/item/${skuId}`)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
export const reqCartList = () => requests.get('/cart/cartList')
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', method: 'post', data })
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data })
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
export const reqOrderInfo = () => requests.get('/order/auth/trade')
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })
export const reqPayInfo = (orderId) => requests.get(`payment/weixin/createNative/${orderId}`)
export const reqPayStatus = (orderId) => requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
export const reqMyOrderList = (page, limit) => requests.get(`/order/auth/${page}/${limit}`)
