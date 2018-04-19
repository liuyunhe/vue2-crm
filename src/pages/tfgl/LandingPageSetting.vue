<template>
    <section class="view-container clearfix">
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input placeholder="请选择查询条件后进行查询或直接直接输入关键字搜索" v-model="filters.search" prefix-icon="el-icon-search" class="input-with-select">
                <el-select v-model="filters.type" slot="prepend" placeholder="请选择" class="input-left">
                  <el-option label="全部" value="1"></el-option>
                  <el-option label="名称" value="2"></el-option>
                  <el-option label="所属项目" value="3"></el-option>
                  <el-option label="所属机构" value="4"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getUsers">查询</el-button>
            </el-form-item>
            <el-form-item class="fr mr0">
              <el-button icon="el-icon-plus">移动落地页</el-button>
            </el-form-item>
            <el-form-item class="fr">
              <el-button icon="el-icon-plus">pc落地页</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!--列表-->
        <el-col class="crm-table-wrap" v-loading="listLoading" :span="24" >
          <table class="crm-table" width="100%">
            <thead>
              <tr>
                <th>落地页ID</th>
                <th>落地页名称</th>
                <th class="hover-slide" @mouseover="isShowpageTypeSlide = true" @mouseout="isShowpageTypeSlide = false">
                  <span style="margin-left: 20px ">落地页类型</span>
                  <div class="slide-zone" v-if="isShowpageTypeSlide">
                    <div class="border-line"></div>
                    <div class="slide-wrap">
                      <!--落地页类型下拉菜单-->
                      <div
                        class="slide-bar"
                        v-for="(item,index) in pageType"
                        @click="getPageType(item,index)"
                        :class="{active:index === pageTypeindex}"
                      >{{ item.name }}</div>
                    </div>
                  </div>
                </th>
                <th>所属机构</th>
                <th>所属项目</th>
                <th class="hover-slide" @mouseover="isShowStatusSlide = true" @mouseout="isShowStatusSlide = false">
                  <span style="margin-left: 20px ">当前状态</span>
                  <div class="slide-zone" v-if="isShowStatusSlide">
                    <div class="border-line"></div>
                    <div class="slide-wrap">
                      <!--当前状态查询菜单-->
                      <div
                        class="slide-bar"
                        v-for="(item,index) in statusType"
                        @click="getStatusType(item,index)"
                        :class="{active:index === statusTypeIndex}"
                      >{{ item.name }}</div>
                    </div>
                  </div>
                </th>
                <th class="ctrl">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pageList">
                <td>{{item.gid}}</td>
                <td :title="istitle(item.pagename)" style="width: 300px">{{item.pagename}}</td>
                <td>{{item.pagetype == 1 ? "移动落地页" : "PC落地页"}}</td>
                <td :title="istitle(item.orgname)">{{item.orgname}}</td>
                <td :title="istitle(item.projectname)">{{item.projectname}}</td>
                <td>{{item.status == 1 ? "待发布" : "已发布"}}</td>
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
          <el-button type="primary" class="btn-jump-to" @click="jumpTo">跳转</el-button>
            <el-pagination
              background
              layout="prev, pager, next,jumper"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              :total="total"
              style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<style lang="scss" scoped>
  .el-input__inner{
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

                listLoading: false,
                filters: {
                  type: '',
                  search:''
                },
                pageList:[],
                total: 0,
                pageSize:0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                //table下拉菜单选项
                pageType:[
                  {
                    name:'全部',
                    pagetype:'0'
                  },
                  {
                    name:'PC端落地页',
                    pagetype:'1'
                  },
                  {
                    name:'移动端落地页',
                    pagetype:'2'
                  },
                ],
                pageTypeindex:0,
                isShowpageTypeSlide:false,

                statusType:[
                  {
                    name:'全部',
                    status:'0'
                  },
                  {
                    name:'待发布',
                    status:'1'
                  },
                  {
                    name:'已发布',
                    status:'2'
                  },
                ],
                statusTypeIndex:0,
                isShowStatusSlide:false,

            }
        },
        methods:{
            //获取用户列表
            getUsers() {
                let para = {
                  "page_no":this.page,
                };
                this.listLoading = true;
                this.$api.requestPagelist(para).then((res) => {
                    if(res.code === 1){
                      console.log(res.data.list)
                      this.pageList = res.data.list
                      this.total = res.data.count
                      this.pageSize = res.data.page_size
                      this.$nextTick(()=>{
                        let td = document.getElementsByClassName("page-title")
                        for(let i = 0; i < td.length ; i++){
                          td[i].removeAttribute('title')
                          if(td[i].firstChild.innerText.length > 12){
//                            console.log(td[i].firstChild.innerText)
                            td[i].setAttribute('title',td[i].firstChild.innerText)
                          }
                        }
                      })
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
            //分页器功能
            handleCurrentChange(val)
            {
                this.page = val
                this.getUsers()
            },
            //跳转按钮功能
            jumpTo() {
              this.$emit('current-change')
            },
            //超过十个字添加title属性
            istitle(value){
              if(value.length>10){
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
