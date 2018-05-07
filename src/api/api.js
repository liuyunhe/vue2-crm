import axios from 'axios'

const base = process.env.API_ROOT


export default{
  //落地页列表
  requestPagelist: params => { return axios.post(`${base}/page/list`, params).then(res => res.data); },
  //落地页模糊查询
  requestPagelistSearch: params => { return axios.post(`${base}/page/search`, params).then(res => res.data); },
  //落地页下架/上架
  pagelistUpdateStatus:(id)=>{return axios.get(`${base}/page/update-status/${id}`).then(res => res.data);},


  requestLogin: params => { return axios.post(`${base}/login`, params).then(res => res.data); },
  getUserList : params => { return axios.get(`${base}/user/list`, { params: params }); },
  getUserListPage : params => { return axios.get(`${base}/user/listpage`, { params: params }); },
  removeUser : params => { return axios.get(`${base}/user/remove`, { params: params }); },
  batchRemoveUser : params => { return axios.get(`${base}/user/batchremove`, { params: params }); },
  editUser : params => { return axios.get(`${base}/user/edit`, { params: params }); },
  addUser : params => { return axios.get(`${base}/user/add`, { params: params }); }
}

