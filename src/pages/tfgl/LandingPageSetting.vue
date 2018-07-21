<template>
  <section class="view-container clearfix">
    <!--面包屑-->
    <el-col :span="24" class="breadcrumb-container">
      <el-breadcrumb separator="/" class="breadcrumb-inner">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-button size="small fr" class="important" @click="addTemplate">新增</el-button>
    </el-col>
    <!--已发布/未上架-->
    <el-col :span="24" class="toolbar">
      <el-radio-group v-model="filters.status" :size="'small'" @change="getStatus">
        <el-radio-button label="0">已发布</el-radio-button>
        <el-radio-button label="1">未上架</el-radio-button>
      </el-radio-group>
    </el-col>
    <!--查询表单-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item :size="'small'">
          <el-autocomplete
            placeholder="搜索机构、项目、城市、落地页名称/ID"
            v-model="filters.search"
            class="input-with-select"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            ref="autocomplete"
          >
            <template slot-scope="{ item }">
              <div class="name"
                   style="width: 180px;float: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                {{ item.value }}
              </div>
              <span class="addr" style="float: right;color: #99A9BF">{{ item.tag }}</span>
            </template>
            <el-select v-model="filters.type" slot="prepend" placeholder="请选择" class="input-left" :size="'small'">
              <el-option label="全部" value="name"></el-option>
              <el-option label="落地页ID" value="gid"></el-option>
              <el-option label="落地页名称" value="pageName"></el-option>
              <el-option label="所属项目" value="projectName"></el-option>
              <el-option label="所属机构" value="orgName"></el-option>
              <el-option label="城市" value="cityName"></el-option>
            </el-select>
          </el-autocomplete>
        </el-form-item>
        <!--<el-form-item label="所属城市">-->
        <!--<el-select :size="'small'" class="w120" v-model="filters.city" placeholder="请选择">-->
        <!--<el-option label="餐厅名" value="1"></el-option>-->
        <!--<el-option label="订单号" value="2"></el-option>-->
        <!--<el-option label="用户电话" value="3"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="投放时间" :size="'small'">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="filters.time"
            @change="configTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="fr mr0" :size="'small'">
          <el-button type="primary" size="small" @click="commitForm">查询</el-button>
        </el-form-item>
        <el-form-item class="fr" :size="'small'">
          <el-button size="small" class="important" @click="getStatus">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--已选标签-->
    <el-col :span="24" class="toolbar">
      <label class="el-form-item__label">已选条件：</label>
      <div class="crm-tag clearfix" v-if="pageType">
        <div class="ms">落地页类型:{{pageType === "1" ? "移动落地页" : "pc落地页"}}</div>
        <div class="del" @click="deleteTag">X</div>
      </div>
    </el-col>
    <!--列表-->
    <el-col class="crm-table-wrap" v-loading="listLoading" :span="24">
      <table class="crm-table" width="100%">
        <thead>
        <tr>
          <th style="width: 120px">落地页ID</th>
          <th>落地页名称</th>
          <th>所属项目</th>
          <th>所属机构</th>
          <th>项目城市</th>
          <th>
            <el-dropdown trigger="click" @command="pageTypeHandle">
              <span class="el-dropdown-link">
                落地页类型<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :class="{active:pageType === ''}" command="">全部</el-dropdown-item>
                <el-dropdown-item :class="{active:pageType === '0'}" command="0">PC落地页</el-dropdown-item>
                <el-dropdown-item :class="{active:pageType === '1'}" command="1">移动端落地页</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </th>
          <th>更新时间</th>
          <th>操作人员</th>
          <th class="ctrl" style="width: 270px">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in pageList">
          <td>{{item.gid}}</td>
          <td :title="istitle(item.pageName)" style="width: 300px">{{item.pageName}}</td>
          <td :title="istitle(item.projectName)">{{item.projectName}}</td>
          <td :title="istitle(item.orgName)">{{item.orgName}}</td>
          <td :title="istitle(item.cityName)">{{ item.cityName }}</td>
          <td>{{item.pageType == '1' ? "移动" : "PC"}}</td>
          <td :title="istitle(item.updateTime)">{{item.updateTime}}</td>
          <td :title="istitle(item.updateOperName)">{{item.updateOperName}}</td>
          <td>
            <span class="ctrl" @click="previewLandingPage(item)">预览</span>
            <!--<span class="ctrl" v-if="filters.status==='0'">检测</span>-->
            <span class="ctrl" v-if="filters.status==='1'" @click="editLandingpage(item)">编辑</span>
            <span class="ctrl" v-if="filters.status==='0'" @click="handleUpdateStatus(item)">下架</span>
            <span class="ctrl" v-if="filters.status==='1'" @click="handleUpdateStatus(item)">发布</span>
            <span class="ctrl">复制链接</span>
            <!--<span class="ctrl" v-if="filters.status==='0'">数据</span>-->
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
        layout="total,prev, pager, next,jumper"
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
  .w120 {
    width: 120px;
  }

  .el-input__inner {
    width: 240px;
  }

  .el-button {
    width: 100px;
  }

  .input-with-select {
    width: 420px;
    .input-left {
      width: 110px;
    }
    .el-input__icon {
      transition: all 0s;
    }
  }

  .el-dropdown {
    color: #8A96A0 !important;
    cursor: pointer;
  }

  .crm-tag {
    float: left;
    height: 24px;
    font-size: 12px;
    line-height: 22px;
    border: 1px solid #DCE0E6;
    border-radius: 2px;
    color: #5E6D82;
    margin-top: 8px;
    margin-right: 20px;
    .ms {
      float: left;
      padding: 0 12px;
    }
    .del {
      float: left;
      width: 24px;
      text-align: center;
      border-left: 1px solid #DCE0E6;
      cursor: pointer;
    }
  }
</style>

<script>
  import {URL_ROOT} from "../../common/js/types"

  export default {
    name: "",
    data() {
      return {
        //载入动画显示
        listLoading: false,
        //表单
        filters: {
          status: '0',
          type: 'name',
          search: '',
          time: []
        },
        //table内容
        pageList: [],
        //数据总条数
        total: 0,
        //分页器当前选中页码
        currentPage: 1,
        //每页显示条数
        pageSize: 0,
        //查询页码
        page: 1,
        sels: [],//列表选中列
        pageType: '',

      }
    },
    methods: {
      //删除标签
      deleteTag() {
        this.pageType = ''
        this.search.pageType = this.pageType
        this.postSearch()
      },
      //模糊搜索
      querySearch(queryString, callback) {
        if (queryString) {
          let para
          if (this.filters.type == "name") {
            para = {
              "orgName": this.filters.search,
              "cityName": this.filters.search,
              "projectName": this.filters.search,
              "gid": this.filters.search,
              "pageName": this.filters.search,
              "status": this.filters.status
            }
          } else {
            para = {
              [this.filters.type]: this.filters.search,
              "status": this.filters.status
            }
          }
          this.$api.requestPagelistSearch(para).then((res) => {
            if (res.code = 1) {
              if (res.data == undefined) {
                callback([])
              }
              else {
                let results = res.data.map((item) => {
                  return {"value": item.split(',')[0], 'tag': item.split(',')[1]}
                })
                callback(results)
              }
            }
          })
        } else {
          callback([])
        }
      },
      //规范事件格式
      configTime() {
        if (this.filters.time === null) {
          this.filters.time = []
        }
        console.log(this.filters.time)
      },
      //获取用户列表
      getUsers() {
        this.configTime()
        let para = {
          "pageNo": this.page,
          "status": this.filters.status,
          "name": this.filters.name,
          "beginDate": this.filters.time[0],
          "endDate": this.filters.time[1],
          "pageType": this.pageType,
          [this.filters.type]: this.filters.search
        };
        this.search = para
        this.postSearch()
      },
      //传送查询条件
      postSearch() {
        this.listLoading = true;
        this.$api.requestPagelist(this.search).then((res) => {
          if (res.code === 1) {
            console.log(res.data.list)
            this.pageList = res.data.list
            this.total = res.data.count
            this.pageSize = res.data.pageSize
            this.listLoading = false;
          }
        }).catch((err) => {
          this.$confirm("网络报错", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.listLoading = false;
          }).catch(() => {
            this.listLoading = false;
          })
        });
      },
      //查询按钮
      commitForm() {
        this.page = 1
        this.currentPage = 1
        this.getUsers()
      },
      //radio按钮,重置
      getStatus() {
        this.filters.type = "name"
        this.filters.search = ""
        this.filters.time = []
        this.page = 1
        this.currentPage = 1
        this.pageType = ''
        this.getUsers()
      },
      //分页器功能
      handleCurrentChange(val) {
        this.page = val
        this.search['pageNo'] = val
        this.postSearch()
        this.currentPage = val
      },
      //跳转按钮功能
      jumpTo() {
        this.$emit('current-change')
      },
      //超过十个字添加title属性
      istitle(value) {
        if (value) {
          if (value.length > 5) {
            return value
          } else {
            return ""
          }
        }

      },
      //pageType选择
      pageTypeHandle(command) {
        this.pageType = command
        this.getUsers()
      },
      //发布状态筛选:上架、下架
      handleUpdateStatus(value) {
        console.log(value)
        let status = this.filters.status
        this.$confirm(`确定${status == '1' ? '上' : '下'}架该落地页?`, '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(value.uuid)
//                let _this = this
          this.$api.pagelistUpdateStatus(value.uuid).then((res) => {
            console.log(res)
            if (res.code == 1) {
              this.$message({
                type: 'success',
                message: `已${status == '1' ? '上' : '下'}架!`
              });

            }
            this.getStatus()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //新增按钮
      addTemplate() {
        const h = this.$createElement;
        let router = this.$router;
        this.$msgbox({
          title: '新增落地页',
          message: h(
            'div',
            {attrs: {class: 'template-select-dialog',}},
            [
              h('div',
                {attrs: {class: 'pcTemplate_select',}},
                [h('img',
                  {
                    attrs: {
                      src: require('../../assets/landingpage/pcTemplate_select.png'),
                      class: 'pcTemplate',
                      width: '111'
                    },
                    on: {
                      click() {
                        router.push({path: '/SelectLandingPageTemplate'})
                        document.querySelector(".el-message-box__close.el-icon-close").click()
                      }
                    }
                  }),
                  h('div',
                    {attrs: {class: 'text',}},
                    'PC端落地页'
                  )
                ]
              ),
              h('div',
                {attrs: {class: 'mobileTemplate_select',}},
                [h('img',
                  {
                    attrs: {
                      src: require('../../assets/landingpage/mobileTemplate_select.png'),
                      class: 'mobileTemplate',
                      width: '72'
                    },
                    on: {
                      click() {
//                            router.push({ path: '/SelectLandingPageTemplate'})
//                            document.querySelector(".el-message-box__close.el-icon-close").click()
                      }
                    }
                  }),
                  h('div',
                    {attrs: {class: 'text',}},
                    '移动端端落地页'
                  )
                ]
              )
            ]),
          showCancelButton: true,
          showConfirmButton: false,
          //confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
            } else {
              done();
            }
          }
        }).then(action => {
          //...
        }).catch(action => {
          //...
        })
      },
      //预览按钮
      previewLandingPage(item) {
        console.log(item.uuid)
        window.open(`${URL_ROOT}/api/private/1.0/page/preview/${item.uuid}`);
      },
      //编辑功能
      editLandingpage(item) {
        console.log(item)
        this.$store.commit('setLandingPageId', item.uuid)
        this.$router.push({path: '/MessageSetting'})
      }
    },
    mounted() {
      this.getUsers()
    }
  }
</script>
