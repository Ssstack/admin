import axios from 'axios'

const baseURL = "http://localhost:8888/api/private/v1/"
axios.defaults.baseURL = baseURL

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = localStorage.getItem('myToken')
    // 如果有token证明已经登录过,除了登录接口,其他所有请求请求头必须带Authorization=token(前后端约定)
    if(token) {
        config.headers['Authorization'] = token
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
});


// 登录验证
export const checkUser = params => {
    return axios.post('login',params).then(res => res.data)
}

// 获取用户数据列表
export const getUserList = params => {
    return axios.get('users', params).then(res => res.data)
}