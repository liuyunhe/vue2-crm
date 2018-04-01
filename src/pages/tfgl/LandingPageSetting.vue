<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="filters.search" prefix-icon="el-icon-search" class="input-with-select">
                <el-select v-model="filters.type" slot="prepend" placeholder="请选择" class="input">
                  <el-option label="餐厅名" value="1"></el-option>
                  <el-option label="订单号" value="2"></el-option>
                  <el-option label="用户电话" value="3"></el-option>
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
        <el-table :data="users" :height='menuHeight' highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120" >
            </el-table-column>
            <!--筛选-->
            <el-table-column
              prop="sex"
              label="性别"
              width="100"
              :formatter="formatSex"
              :filters="[{ text: '男', value: 1}, { text: '女', value: 0 }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
            </el-table-column>
            <!--筛选end-->
            <el-table-column prop="age" label="年龄" width="100" >
            </el-table-column>
            <el-table-column prop="birth" label="生日" width="120" >
            </el-table-column>
            <el-table-column prop="addr" label="地址" min-width="180" >
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="浏览" placement="top">
                    <i class="table-icon ly" size="small" @click="handleEdit(scope.$index, scope.row)"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="发布" placement="top">
                    <i class="table-icon fb" size="small" @click="handleEdit(scope.$index, scope.row)"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                    <i class="table-icon bj" size="small" @click="handleEdit(scope.$index, scope.row)"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除" placement="top">
                    <i class="table-icon sc" size="small" @click="handleEdit(scope.$index, scope.row)"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="复制链接" placement="top">
                    <i class="table-icon fzlj" size="small" @click="handleEdit(scope.$index, scope.row)"></i>
                  </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="footer-toolbar">
            <el-pagination
              background
              layout="prev, pager, next,jumper"
              @current-change="handleCurrentChange"
              :page-size="20"
              :total="total"
              style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<style lang="scss" scoped>

  .el-input__inner{
    width: 130px;
  }
  .input-with-select{
    width: 500px;
    .input{
      width: 130px;
    .el-input__icon{
      transition: all 0s;
    }
    }
  }

</style>

<script>
    import ElCol from "element-ui/packages/col/src/col";
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
    import axios from 'axios'

    export default {
        components: {
          ElButton,
          ElFormItem,
          ElCol},
        name: "",
        data() {
            return {
                menuHeight:`${window.innerHeight - 285 > 300 ? window.innerHeight - 285 : 300}`,
                listLoading: false,
                filters: {
                  type: '',
                  search:''
                },
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
            }
        },
        methods:{

          //获取用户列表
            getUsers() {
              console.log(this.filters)
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                this.$api.getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            handleCurrentChange(val) {
                this.page = val
                this.getUsers()
            },
            filterTag(value, row) {
              return row.sex === value
              //console.log(row.sex,value)
            },
            selsChange() {

            },
            formatSex(row,column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleEdit(index,row) {
              console.log(index,row)
            },
            handleDel() {

            },
            batchRemove() {

            }
        },
        mounted() {
          this.getUsers()
        }

    }
</script>
