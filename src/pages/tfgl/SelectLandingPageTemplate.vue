<template>
  <section class="view-container clearfix">
    <!--面包屑-->
    <el-col :span="24" class="breadcrumb-container">
      <el-breadcrumb separator="/" class="breadcrumb-inner">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-button size="small fr" @click="cancelSelect">取消</el-button>
    </el-col>
    <!--筛选功能-->
    <el-col :span="24" class="tag-title toolbar" style="margin-bottom: 60px">
      <div class="title-name">筛选模板</div>
      <div class="select-tag-zone">
        <div class="select-tag clearfix" v-for="(item,index) in tagsGroup">
          <label class="el-form-item__label">{{ item.name }}</label>
          <multiply-chooser class="" :selections="item.tags" @on-change="ontagsChange(index,$event)"></multiply-chooser>
        </div>
      </div>
    </el-col>
    <!--模板列表-->
    <el-col :span="24" class="toolbar">
      <div class="template-list">
        <div class="template add">
          <div class="ctrl">
            <div class="add-icon">+</div>
            <div class="content">新建模板</div>
            <div class="content">(功能开发中)</div>
          </div>
        </div>
        <div class="template" v-for="(item,index) in templateList" :style="{backgroundImage:`url(${picList.image})`}">
          <div class="mask">
            <div class="mask-layer"></div>
            <div class="ctrl">
              <div class="btn browse" @click="previewTemplate(item)">浏 览</div>
              <div class="btn use" @click="useTemplate(item)">应 用</div>
            </div>
          </div>

        </div>

      </div>
    </el-col>
  </section>
</template>

<script>
    import multiplyChooser from '../../components/base/multiplyChooser.vue'
    import _ from 'lodash'
    import { URL_ROOT } from '../../common/js/types'
    export default {
      components:{
        multiplyChooser
      },
      created(){
        this.getTemplateList(this.requestparams)
      },
      data() {
        return {
          tagsGroup:[
            {
              name:"展示项目数",
              tags:[
                {
                  label:'单个项目',
                  value:0
                },
                {
                  label:'多个项目',
                  value:1
                }
              ]
            },
            {
              name:"浏览方式",
              tags:[
                {
                  label:'长图型',
                  value:1
                },
                {
                  label:'翻页型',
                  value:2
                }
              ]
            },
            {
              name:"展示重点",
              tags:[
                {
                  label:'通 用',
                  value:'通用'
                },
                {
                  label:'优 惠',
                  value:'优惠'
                },
                {
                  label:'户 型',
                  value:'户型'
                },
                {
                  label:'区 位',
                  value:'区位'
                },
                {
                  label:'配 套',
                  value:'配套'
                },
                {
                  label:'教 育',
                  value:'教育'
                },
                {
                  label:'交 通',
                  value:'交通'
                },
                {
                  label:'园 林',
                  value:'园林'
                },
                {
                  label:'品 牌',
                  value:'品牌'
                },
              ],
            }
          ],
          templateList:[

          ],
          picList:{
            image:require('../../assets/example.png')
          },
          requestparams:{
            "showProjects":[],
            "viewWays":[],
            "importants":[]
          }
        }
      },
      methods:{
        cancelSelect(){
          let router = this.$router
          this.$alert('确定取消创建模板', '提示信息', {
            showCancelButton: true,
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
              if(action == 'confirm'){
                router.push({path:'/LandingPageSetting'})
              }
            }
          })
        },
        ontagsChange(index,arr){
          let keys = Object.keys(this.requestparams)
          this.requestparams[keys[index]] = _.map(arr,item =>{
              return item.value
          })
          this.getTemplateList(this.requestparams)
        },
        getTemplateList(params) {
          this.$api.requestTemplateList(params).then(res => {
            this.templateList = res.data.list
          }).catch(err => {

          })
        },
        previewTemplate(item){
          window.open(`${URL_ROOT+item.tmpPage}`)
        },
        useTemplate(item){
          this.$store.commit('setLandingPageType', item.uuid)
          this.$router.push({path:'/MessageSetting'})
        }
      },
      mounted() {

      }
    }
</script>

<style lang="scss" scoped>
  .el-button{
    width: 100px;
  }
  .tag-title{
    .title-name{
      line-height: 32px;
      color: #555;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .select-tag-zone{
      .select-tag{
        margin-bottom: 20px;
        .el-form-item__label{
          width: 82px!important;
          text-align: left!important;
        }
      }
    }
  }
  .template-list{
    display: flex;
    flex-wrap: wrap;
    .template{
      position: relative;
      width: 216px;
      height: 290px;
      margin-right: 16.8px;
      margin-bottom: 16.8px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      .mask{
        height: 290px;
        opacity: 0;
        transition: opacity 0.3s linear;
        .mask-layer{
          width: 216px;
          height: 290px;
          top:0;
          left: 0;
          background: #000000;
          opacity: 0.8;
        }
        .ctrl{
          opacity: 0;
          transition: opacity 0.3s linear;
          position: absolute;
          top:93px;
          left: 55px;
          width: 106px;
          height: 105px;
          .btn{
            width: 100%;
            height: 46px;
            line-height: 46px;
            text-align: center;
            border-radius: 3px;
            cursor: pointer;
            &.browse{
              background: #fff;
              color: #0077FF;
              margin-bottom: 13px;
            }
            &.use{
              background: #0077FF;
              color: #FFF;
            }
          }
        }
        &:hover{
          opacity: 1;
          .ctrl{
            opacity: 1;
          }
        }
      }

      &:nth-child(6n){
        margin-right: 0px;
      }
      &.add{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px dashed #D3DCE6;
        background-image: none;
        .ctrl{
          width: 80px;
          height: 90px;
          color: #99A9BF;
          .add-icon{
            text-align: center;
            height: 40px;
            line-height: 40px;
            font-size: 32px;
          }
          .content{
            text-align: center;
            height: 20px;
            line-height: 20px;
            font-size: 12px;

          }
        }
      }
    }
  }
</style>
