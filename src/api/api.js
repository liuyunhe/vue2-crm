import axios from 'axios'

const base = process.env.API_ROOT

export default{
  requestLogin: params => { return axios.post(`${base}/login`, params).then(res => res.data); },
  getUserList : params => { return axios.get(`${base}/user/list`, { params: params }); },
  getUserListPage : params => { return axios.get(`${base}/user/listpage`, { params: params }); },
  removeUser : params => { return axios.get(`${base}/user/remove`, { params: params }); },
  batchRemoveUser : params => { return axios.get(`${base}/user/batchremove`, { params: params }); },
  editUser : params => { return axios.get(`${base}/user/edit`, { params: params }); },
  addUser : params => { return axios.get(`${base}/user/add`, { params: params }); }
}

