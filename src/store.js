import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// state相当于 data, 存储属性
const state = {
    username: localStorage.getItem('username') || ''
}
// mutations相当于 methods
const mutations = {
    // 将用户名存储到state中
    setUsername: (state, username) => {
        state.username = username
        localStorage.setItem('username', username)
    }
}
const actions = {}
// getters相当于computed 计算属性
const getters = {}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})