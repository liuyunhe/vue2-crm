import axios from 'axios'

const base = process.env.API_ROOT


export default{
  //首页数据查询
  requstHomeData:params => {return axios.post(`http://172.16.2.208:8091/api/private/1.0/homePage/homePageCount`,params).then(res => res.data)},

  //落地页列表
  requestPagelist: params => {return axios.post(`${base}/page/list`,params).then(res => res.data)},
  //落地页模糊查询
  requestPagelistSearch: params => {return axios.post(`${base}/page/search`,params).then(res => res.data)},
  //落地页下架/上架
  pagelistUpdateStatus: id => {return axios.get(`${base}/page/update-status/${id}`).then(res => res.data)},
  //落地页模板列表
  requstTemplateList: params => {return axios.post(`${base}/template/list`,params).then(res => res.data)},
  //落地页所属机构查询
  requestOrgList: params => {return axios.post(`${base}/page/org/list`,params).then(res => res.data)},
  //落地页所属项目查询
  requestProjectList: params => {return axios.post(`${base}/page/project/list`,params).then(res => res.data)},
  //落地页设置step1基本设置保存
  saveSettingStep1: params => {return axios.post(`${base}/page/save-update-info`,params).then(res => res.data)},
  //落地页设置步骤二保存/更新
  saveSettingStep2: params => {return axios.post(`${base}/page/label/save-update`,params).then(res => res.data)},
  //获取落地页模板标签/插件列表
  requestLabelList: params => {return axios.post(`${base}/page/label/list`,params).then(res => res.data)},
  //获取落地页样式库列表
  requestStyleList: params => {return axios.post(`${base}/page/style/list`,params).then(res => res.data)},
  //获取样式库表单字段
  requestStyleId: id =>{return axios.get(`${base}/page/style/${id}`).then(res => res.data)},
  //落地页设置step3保存/更新样式表
  saveSettingStep3: params => {return axios.post(`${base}/page/style/save-update`,params).then(res =>res.data)},
  //落地页设置step3编辑器保存
  saveEditorStep3: params => {return axios.post(`${base}/page/editor/save-update`,params).then(res => res.data)},
  //落地页编辑获取信息
  requstEditorMessage:id => {return axios.get(`${base}/page/edit/${id}`).then(res => res.data)}
}

