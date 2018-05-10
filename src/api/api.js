import axios from 'axios'

const base = process.env.API_ROOT


export default{
  //首页数据查询
  requstHomeData:params => {return axios.post(`http://172.16.2.208:8091/api/private/1.0/homePage/homePageCount`,params).then(res => res.data)},

  //落地页列表
  requestPagelist: params => { return axios.post(`${base}/page/list`,params).then(res => res.data)},
  //落地页模糊查询
  requestPagelistSearch: params => { return axios.post(`${base}/page/search`,params).then(res => res.data)},
  //落地页下架/上架
  pagelistUpdateStatus: id => {return axios.get(`${base}/page/update-status/${id}`).then(res => res.data)},
  //落地页模板列表
  requstTemplateList: params => {return axios.post(`${base}/template/list`,params).then(res => res.data)},
  //落地页所属机构查询
  requestOrgList: params => {return axios.post(`${base}/page/org/list`,params).then(res => res.data)},
  //落地页所属项目查询
  requestProjectList: params => {return axios.post(`${base}/page/project/list`,params).then(res => res.data)},
  //落地页设置step1基本设置保存
  saveSettingStep1: params => {return axios.post(`${base}/page/save-info`,params).then(res => res.data)}
}

