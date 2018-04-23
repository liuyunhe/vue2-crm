<template>
    <section class="view-container clearfix">
      <!--面包屑-->
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="24" class="toolbar">
        <el-radio-group v-model="filters.status" :size="'small'" @change="getStatus">
          <el-radio-button label="0" >已发布</el-radio-button>
          <el-radio-button label="1" @change="getStatus">未上架</el-radio-button>
        </el-radio-group>
      </el-col>
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item label="条件查询">
            <el-input :size="'small'" v-model="filters.name" placeholder="落地页ID、落地页名称、项目名称"></el-input>
          </el-form-item>
          <el-form-item label="所属城市">
            <el-select :size="'small'" class="w120" v-model="filters.city" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投放时间">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="filters.time"
              :size="'small'"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="fr mr0">
            <el-button type="primary" size="small" @click="commitForm">查询</el-button>
          </el-form-item>
          <el-form-item class="fr">
            <el-button size="small" @click="getStatus">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-col class="crm-table-wrap" v-loading="listLoading" :span="24" >
          <table class="crm-table" width="100%">
            <thead>
              <tr>
                <th style="width: 120px">落地页ID</th>
                <th>落地页名称</th>
                <th>所属项目</th>
                <th>所属机构</th>
                <th>项目所在城市</th>
                <th>落地页类型</th>
                <th>更新时间</th>
                <th>操作人员</th>
                <th class="ctrl">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pageList">
                <td>{{item.gid}}</td>
                <td :title="istitle(item.pageName)" style="width: 300px">{{item.pageName}}</td>
                <td :title="istitle(item.projectName)">{{item.projectName}}</td>
                <td :title="istitle(item.orgName)">{{item.orgName}}</td>
                <td :title="istitle(item.cityName)">{{ item.cityName }}</td>
                <td >{{item.pagetype == 1 ? "移动落地页" : "PC落地页"}}</td>
                <td :title="istitle(item.updateTime)">{{item.updateTime}}</td>
                <td :title="istitle(item.updateOperName)">{{item.updateOperName}}</td>
                <td>
                  <el-tooltip class="item" popper-class="table-tooltip" effect="dark" content="浏览" placement="top">
                    <i class="table-icon ly"  size="small" @click="handleEdit(item)"></i>
                  </el-tooltip>
                  <el-tooltip class="item" popper-class="table-tooltip" effect="dark" content="发布" placement="top">
                    <i class="table-icon fb" size="small" @click="handleEdit(item)"></i>
                  </el-tooltip>
                  <el-tooltip class="item" popper-class="table-tooltip" effect="dark" content="编辑" placement="top">
                    <i class="table-icon bj" size="small" @click="handleEdit(item)"></i>
                  </el-tooltip>
                  <el-tooltip class="item" popper-class="table-tooltip" effect="dark" content="删除" placement="top">
                    <i class="table-icon sc" size="small" @click="handleEdit(item)"></i>
                  </el-tooltip>
                  <el-tooltip class="item" popper-class="table-tooltip"  effect="dark" content="复制链接" placement="top">
                    <i class="table-icon fzlj" size="small" @click="handleEdit(item)"></i>
                  </el-tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </el-col>

      <!--工具条-->
      <el-col :span="24" class="footer-toolbar">
        <el-button type="primary"  class="btn-jump-to" @click="jumpTo">跳转</el-button>
          <el-pagination
            background
            layout="prev, pager, next,jumper"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :total="total"
            style="float:right;">
          </el-pagination>
      </el-col>
    </section>
</template>

<style lang="scss" scoped>
  .w120{
    width: 120px;
  }
  .el-input__inner{
    width: 240px;
  }
  .el-button{
    width: 100px;
  }
  .input-with-select{
    width: 500px;
    .input-left{
      width: 100px;
    }
    .el-input__icon{
      transition: all 0s;
    }
  }
</style>

<script>
    export default {
      name: "",
        data() {
            return {
                //载入动画显示
                listLoading: false,
                //表单
                filters: {
                  status:'0',
                  name: '',
                  provence:'',
                  city:'',
                  time:[]
                },
                //table内容
                pageList:[],
                //数据总条数
                total: 0,
                //分页器当前选中页码
                currentPage:1,
                //每页显示条数
                pageSize:0,
                //查询页码
                page: 1,
                sels: [],//列表选中列

            }
        },
        methods:{
            //获取用户列表
            getUsers() {
                console.log(this.filters.time)
                let para = {
                  "pageNo":this.page,
                  "status":this.filters.status,
                  "name":this.filters.name,
                  "beginDate":this.filters.time[0],
                  "endDate":this.filters.time[1]
                };
                this.listLoading = true;
                this.$api.requestPagelist(para).then((res) => {
                    if(res.code === 1){
                      console.log(res.data.list)
                      this.pageList = res.data.list
                      this.total = res.data.count
                      this.pageSize = res.data.pageSize
//                      this.$nextTick(()=>{
//                        let td = document.getElementsByClassName("page-title")
//                        console.log(td)
//                        for(let i = 0; i < td.length ; i++){
//                          td[i].removeAttribute('title')
//                          if(td[i].firstChild.innerText.length > 6){
////                            console.log(td[i].firstChild.innerText)
//                            td[i].setAttribute('title',td[i].firstChild.innerText)
//                          }
//                        }
//                      })
                      this.listLoading = false;
                    }
                }).catch((err)=>{
                    this.$confirm("网络报错","提示",{
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(()=>{
                      this.listLoading = false;
                    }).catch(()=>{
                      this.listLoading = false;
                    })
                });
            },
            //查询
            commitForm() {
              this.page = 1
              this.currentPage = 1
              this.getUsers()
            },
            //radio按钮,重置
            getStatus(){
              this.filters.name=""
              this.filters.provence=""
              this.filters.city=""
              this.filters.time=[]
              this.page = 1
              this.currentPage = 1
              this.getUsers()
            },
            //分页器功能
            handleCurrentChange(val) {
              this.page = val
              this.getUsers()
              this.currentPage = val
            },
            //跳转按钮功能
            jumpTo() {
              this.$emit('current-change')
            },
            //超过十个字添加title属性
            istitle(value){

                if(value.length>6){
                  return value
                }else{
                  return ""
                }
            },
            selsChange() {

            },
            //落地页筛选
            filterPageType(value, row) {
              return row.pagetype == value
            },
            //发布状态筛选
            handleEdit(value) {
              console.log(value)
            },
            handleDel() {

            },
            batchRemove() {

            },

            //table菜单下拉查询
            //落地页类型查询
            getPageType(item,index) {
              this.pageTypeindex = index
              this.isShowpageTypeSlide = false
            },
            //当前状态查询
            getStatusType(item,index) {
              this.statusTypeIndex = index
              this.isShowStatusSlide = false
            }
        },
        mounted() {
          this.getUsers()
        }

    }
</script>
