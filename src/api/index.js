import axios from "axios";

const baseURL = "http://localhost:8888/api/private/v1/";
axios.defaults.baseURL = baseURL;

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    let token = localStorage.getItem("myToken");
    // 如果有token证明已经登录过,除了登录接口,其他所有请求请求头必须带Authorization=token(前后端约定)
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 登录验证
export const checkUser = params => {
  return axios.post("login", params).then(res => res.data);
};

// 获取用户数据列表
export const getUserList = params => {
  return axios.get("users", params).then(res => res.data);
};

// 修改用户状态
export const changeUserState = params => {
  return axios
    .put(`users/${params.uid}/state/${params.type}`, params)
    .then(res => res.data);
};

// 添加用户
export const addUser = params => {
  return axios.post("users", params).then(res => res.data);
};

// 根据id获取用户信息
export const getUserById = params => {
  return axios.get(`users/${params}`).then(res => res.data);
};

// 编辑用户信息
export const editUser = params => {
  return axios.put(`users/${params.id}`, params).then(res => res.data);
};

// 删除用户信息
export const deleteUser = params => {
  return axios.delete(`users/${params}`).then(res => res.data);
};

// 查询用户角色
export const getRoleList = () => {
  return axios.get(`roles`).then(res => res.data);
};

// 分配用户角色
export const grantRole = params => {
  return axios
    .put(`users/${params.id}/role`, { id: params.id, rid: params.rid })
    .then(res => res.data);
};

// 获取权限列表
export const getRightsList = params => {
  return axios.get(`rights/${params.type}`).then(res => res.data);
};

// 删除角色指定权限
export const deleteRoleRights = params => {
  return axios
    .delete(`roles/${params.roleId}/rights/${params.rightId}`, params)
    .then(res => res.data);
};

// 角色授权
export const grantRight = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, rids).then(res => res.data);
};

// 左侧菜单权限
export const getMenus = () => {
  return axios.get(`menus`).then(res => res.data);
}
