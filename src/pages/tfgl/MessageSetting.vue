<template>
  <section class="view-container clearfix">

    <el-col :span="24" class="toolbar clearfix">
      <!--步骤条-->
      <crm-steps :steps="settingSteps" :active="settingStepsActive" :stepsClass="'mb30'"></crm-steps>
      <!--步骤1-->
      <div id="step1" class="clearfix" v-if="step1Show">
        <el-form :model="steps1" :size="'small'" label-width="100px">
          <el-form-item label="落地页名称">
            <el-input v-model="steps1.pageName" placeholder="输入落地页名称" maxlength="32"></el-input>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="所属机构">
            <el-select v-model="steps1.orgName" placeholder="请选择">
              <el-option
                v-for="item in orgNameList"
                :key="item"
                :value="item">
              </el-option>
            </el-select>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="所属项目">
            <el-select v-model="steps1.projectName" placeholder="请选择">
              <el-option
                v-for="(item,index) in projectList"
                :key="index"
                :value="item.projectName"
                :label="item.projectName"
              >
              </el-option>
            </el-select>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="400电话">
            <span style="margin: 0 10px;">400 -</span>
            <el-input v-model="callTel1" class="callTel1" placeholder="数字" maxlength="32"></el-input>
            <span style="margin: 0 5.5px;">转</span>
            <el-input v-model="callTel2" class="callTel2" placeholder="数字" maxlength="32"></el-input>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="网页标签名">
            <el-input v-model="steps1.label"></el-input>
          </el-form-item>
          <span class="tips">指落地页在网页名称或分享后显示的链接标题</span>
        </el-form>
        <div class="warning-zone" v-if="steps1Warining">
          <div class="warning-item clearfix">
            <div class="warning-wrap" v-if="steps1.pageName =='' ">
              <div class="warning-icon">!</div>
              <span>请输入落地页名称</span>
            </div>
          </div>
          <div class="warning-item clearfix">
            <div class="warning-wrap" v-if="steps1.orgName =='' ">
              <div class="warning-icon">!</div>
              <span>请选择所属机构</span>
            </div>
          </div>
          <div class="warning-item clearfix">
            <div class="warning-wrap" v-if="steps1.projectName =='' ">
              <div class="warning-icon">!</div>
              <span>请选择投放项目</span>
            </div>
          </div>
          <div class="warning-item clearfix">
            <div class="warning-wrap" v-if="callTel1 == '' || callTel2 == '' ">
              <div class="warning-icon">!</div>
              <span>无法获取项目电话，请手动输入</span>
            </div>
          </div>
        </div>
      </div>
      <!--步骤2-->
      <div id="step2" v-if="step2Show">
        <div class="left">
          <!--头图设置-->
          <div class="top-setting">
            <div class="banner item" :class="{active:item.name == step2Active}" v-for="item in step2.basic" @click="editItem(item)">
              <img class="icon" :src="item.url" width="40" alt="">
              <p>{{ item.name }}</p>
              <div class="edit"></div>
            </div>
          </div>
          <!--功能设置-->
          <div class="func-setting">
            <div class="title">
              <span>导航栏与模块</span>
              <el-button class="important" size="small fr" @click="editNav('导航栏')">编辑导航栏</el-button>
            </div>
            <div class="body">
              <draggable class="item-list" v-model="step2.label" element="div" :options="dragOptions">
                <transition-group type="transition" :name="'flip-list'" tag="div" style="width: 928px;display: flex;flex-wrap: wrap;">
                  <div class="item" :class="{active:item.name == step2Active}"  v-for="(item,index) in step2.label" :key="index" @click="editItem(item,index)">
                    <img class="icon" :src="`${URL_ROOT}${item.url}`" width="40" alt="">
                    <p>{{ item.name }}</p>
                    <div class="edit"></div>
                    <div class="dl"></div>
                  </div>
                </transition-group>
              </draggable>
            </div>
            <div class="body">
              <div class="item add">
                <img class="icon" src="../../assets/landingpage/settings/setting_add_icon@3x.png" style="margin-bottom: 9px" width="31" alt="">
                <p>添加导航模块</p>
              </div>
            </div>
          </div>
          <!--插件设置-->
          <div class="plugin-setting" style="margin-bottom: 0px;border: none">
            <div class="title">
              <span>插件</span>
              <el-button class="important" size="small fr">编辑插件</el-button>
            </div>
            <div class="body">
              <div class="item" :class="{active:item.name == step2Active}" v-for="item in step2.plugins" @click="editItem(item)">
                <img class="icon" :src="`${URL_ROOT}${item.url}`" width="40" alt="">
                <p>{{ item.name }}</p>
                <div class="edit"></div>
                <div class="dl"></div>
              </div>
            </div>
          </div>
        </div>
        <!--功能-->
        <div class="right" v-if="step2Active">
          <div class="wrap" >
            <div class="title clearfix">
              <img class="title-icon" v-if="step2Right.type!=0" :src="`${URL_ROOT}${step2Right.url}`" width="40">
              <img class="title-icon" v-else="step2Right.type==0" :src="`${step2Right.url}`" width="40">
              <div class="title-name">{{step2Right.name}}设置</div>
            </div>
            <div class="form clearfix" v-if="step2Right.type == 1">
              <div class="form-item">
                <div class="form-item-name">在导航栏中的名称</div>
                <el-input
                  class="form-item-input"
                  :placeholder="step2Right.name"
                  maxlength="4"
                  :size="'small'"
                  v-model="step2Right.rename"
                  @change="step2.label[step2Right.idx].rename = step2Right.rename"
                >
                </el-input>
              </div>
            </div>
            <el-button
              class="important form-item-btn"
              :size="'small'"
              @click="a"
            >编辑模块内容</el-button>
          </div>
        </div>
        <!--按钮-->
        <div class="right" v-if="step2BtnActive">
          <div class="wrap" >
            <div class="title clearfix">
              <div class="title-name">{{step2BtnActive}}设置</div>
            </div>
            <div class="form clearfix" >
              <div class="form-item">
                <div class="form-item-name">在界面状态</div>
                <el-radio-group class="radio" v-model="navVisibility">
                  <el-radio :label="1">显示</el-radio>
                  <el-radio :label="2">隐藏</el-radio>
                </el-radio-group>
              </div>
            </div>
            <el-button
              class="important form-item-btn"
              :size="'small'"
              @click="b"
            >编辑模块内容</el-button>
          </div>
        </div>
      </div>
      <!--步骤3-->
      <div id="step3">

      </div>
    </el-col>
    <el-col :span="24">
      <el-button type="primary" size="small fr" v-if="settingStepsActive===0" @click="nextStep()">下一步</el-button>
      <el-button type="primary" size="small fr" v-if="settingStepsActive===1" @click="lastStep()">上一步</el-button>
      <el-button size="small fr" class="important" @click="saveStep1('确定保存当前编辑内容？',true)">保存</el-button>
      <el-button size="small fr" v-if="settingStepsActive===1" >发布</el-button>
      <el-button size="small fr" >预览</el-button>
      <el-button size="small fr" >取消</el-button>
      <el-button size="small fr" class="important" v-if="settingStepsActive===0">更换模板</el-button>
    </el-col>
  </section>
</template>

<script>
    import { URL_ROOT } from '../../common/js/types'
    import _ from 'lodash'
    import draggable from 'vuedraggable'
    import crmSteps from '../../components/base/crmSteps.vue'
    export default {
      components:{
        crmSteps,
        draggable
      },
      created(){
        //获取模板标签/插件
        let templateId ={"templateId":this.$store.getters.getLandingPageType == '' ? 'a7d22e47-4aad-11e8-a730-00163e04791f': this.$store.getters.getLandingPageType}
        console.log(templateId)
        this.getLabel(templateId)
        //请求落地页机构下拉菜单
        this.getOrgList()
        //请求落地页项目下拉菜单
        this.getProjectList()
      },
      computed:{
        dragOptions() {
          return  {
            animation: 300,
            group: 'description',
            disabled: !this.editable,
            ghostClass: 'ghost'
          };
        },
      },
      data() {
        return {
          URL_ROOT,
          editable:true,
          //步骤条传参
          settingSteps:["基本信息","编辑模块","编辑内容"],
          settingStepsActive:0,

          //步骤先是标识
          step1Show:false,
          step2Show:true,
          step3Show:false,

          //步骤1
          steps1:{
            pageName:"",
            orgName:"",
            projectName:"",
            projectCode:"",
            callTel:"",
            label:"",
            uuid:""
          },
          //400电话
          callTel1:"",
          callTel2:"",
          //多选数组
          orgNameList:[],
          projectList:[],
          //step1保存标识
          step1Save:false,
          steps1Warining:false,
          step1SaveObject:{},

          //步骤二
          step2:{
            basic:[
              {
                name:"头图",
                url:require('../../assets/landingpage/settings/setting_banner_icon@3x.png'),
                type: 0,
                order:0
              }
            ],
            label:[],
            plugins:[]
          },
          //功能
          step2Active:"",
          step2Right:{},
          step2params:[],
          //按钮
          step2BtnActive:"",
          navVisibility:1
        }
      },
      watch:{

      },
      methods:{
        a(){
          console.log(this.step2.label)
        },
        b(){
          console.log(this.step2BtnRadio)
        },
        //获取模板标签/插件
        getLabel(templateId){
          this.$api.requstLabelList(templateId).then(res =>{
            if(res.code === 1){
              console.log(res.data);
              this.step2.label = res.data.label
              this.step2.plugins = res.data.plugins
            }
          }).catch(err=>{

          })
        },
        //请求落地页机构下拉菜单
        getOrgList(){
          this.$api.requestOrgList('').then(res =>{
            if(res.code ===1){
              this.orgNameList = res.data
            }
          }).catch(err => {

          })
        },
        //请求落地页项目下拉菜单
        getProjectList(){
          this.$api.requestProjectList('').then(res =>{
            if(res.code ===1){
              this.projectList = res.data
            }
          }).catch(err => {

          })
        },
        //按钮功能
        nextStep() {
          console.log(this.step1Save)
          if(this.step1Save){
            this.settingStepsActive = 1
            this.step1Show = false
            this.step2Show = true
          }else{
            this.saveStep1('确定保存当前修改内容并进入下一步？',false)
          }
          this.step1Save = false
        },
        lastStep() {
          this.settingStepsActive = 0
          this.step1Show = true
          this.step2Show = false
        },
        //第一步保存信息
        saveStep1(message,flag) {
          if(this.callTel1&&this.callTel2){
            this.steps1.callTel = this.callTel1 + "," + this.callTel2
          }
          if(this.steps1.projectName){
//            let selectArray = this.projectList.filter((item)=>{
//              return item.projectName == this.steps1.projectName
//            })
//            this.steps1.projectCode = selectArray[0].id
            let id = this.projectList.find(item => item.projectName == this.steps1.projectName).id
            this.steps1.projectCode = id
          }
          this.steps1Warining = true
          let valArray = Object.values(this.steps1).slice(0,5)
          console.log(valArray)
          if(valArray.includes("")){
            return
          }else{
            if(JSON.stringify(this.step1SaveObject)==JSON.stringify(this.steps1)){
              //表单无变化则直接跳到第二步
              if(!flag){    //按钮不是保存
                this.settingStepsActive = 1
                this.step1Show = false
                this.step2Show = true
              }
              return
            }
            this.$alert(message, '提示信息', {
              showCancelButton: true,
              cancelButtonText: '取消',
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                if(action == 'confirm'){
                  this.$api.saveSettingStep1(this.steps1).then(res =>{
                    console.log(res)
                    if(res.code == 1){

                      //vuex中存入当前落地页pageId
                      this.$store.commit('setLandingPageId',res.data.uuid)
                      console.log('pageId:'+this.$store.getters.getLandingPageId)
                      if(flag){     //按钮是保存
                        this.$message({
                          message: '保存成功，请在列表中查看',
                          type: 'success'
                        });
                        this.step1Save = true
                      }else {
                        this.settingStepsActive = 1
                        this.step1Show = false
                        this.step2Show = true
                      }
                      this.step1SaveObject = Object.assign({},this.steps1)
                    }
                  }).catch(err =>{

                  })
                }
              }
            })
          }
          },

        //第二步选择编辑模块
        editItem(item,index){
          this.step2BtnActive=""
          if(this.step2Active == item.name){
            this.step2Active = ""
          }else {
            this.step2Active = item.name
            this.step2Right = Object.assign({},item)
            this.step2Right.idx = index
          }

        },
        //第二步编辑菜单按钮
        editNav(name){
          this.step2Active=""
          if(this.step2BtnActive == name){
            this.step2BtnActive = ""
          }else{
            this.step2BtnActive = name
          }
        }
      },
      mounted() {

      }
    }
</script>

<style lang="scss" scoped>
  .ghost {
    opacity: 0;
    background: #C8EBFB;
  }
  .el-button{width: 100px;margin-left: 10px}
  .mb30{margin-bottom: 30px}
  #step1{
    margin-bottom: 250px;
    .el-form {
      float: left;
      width: 440px;
      .el-form-item{
        margin-bottom: 20px;
        position: relative;
        .el-select{
          width: 100%!important;
        }
        span.important{
          position: absolute;
          top:0;
          right: -12px;
          color: red;
          line-height: 36px;
        }
        .callTel1{
          width:150px;

        }
        .callTel2{
          width: 80px;
        }
      }
      .tips{
        color: #8A96A0 !important;
        margin-left: 100px;
        margin-top: -8px;
        display: block;
        font-size: 12px;
      }
    }
    .warning-zone{
      width: 400px;
      height: 268px;
      float: left;
      .warning-item{
        height: 32px;
        line-height: 32px;
        margin-bottom: 20px;
        .warning-wrap{
          float: left;
          position: relative;
          padding: 0 15px;
          background-color: #FF3366;
          border-radius: 3px;
          .warning-icon{
            float: left;
            width: 14px;
            height: 14px;
            border-radius: 10px;
            text-align: center;
            margin-top: 9px;
            margin-right: 10px;
            background-color: #fff;
            color: #FF3366;
            line-height: 14px;
          }
          span{
            color: #fff;
          }
          &:before{
            content: "";
            width: 0px;
            height: 0px;
            border: 5px solid transparent;
            position: absolute;
            left: -9px;
            top: 11px;
            border-right-color: #FF3366;
          }
        }
      }
    }
  }
  #step2{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #F2F4F8;
    .left{
      width: 912px;
      .top-setting{
        display: flex;
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid #EFF2F6;
        .item{
          position: relative;
          cursor: pointer;
          width: 100px;
          height: 100px;
          border:1px solid #E0E6ED;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content:center;
          align-items: center;
          .icon{
            display: block;
          }
          p{
            font-size: 12px;
            height: 18px;
            line-height: 18px;
            color: #1A173B;
          }
          .edit{
            display: none;
            position: absolute;
            width: 20px;
            height: 20px;
            left: -1px;
            bottom: -1px;
            background-image: url('../../assets/landingpage/settings/edit_pen@3x.png');
            background-repeat: no-repeat;
            background-size: cover;
          }
          &.active{
            border-color: #0077ff;
            .edit{
              display: block;
            }
          }
        }
      }
      .func-setting,.plugin-setting{
        padding-bottom: 14px;
        margin-bottom: 30px;
        border-bottom: 1px solid #EFF2F6;
        .title{
          margin-top: 30px;
          height: 30px;
          margin-bottom: 30px;
        }
        .body{
          width: 928px;
          display: flex;
          flex-wrap: wrap;
          .item{
            position: relative;
            cursor: pointer;
            width: 100px;
            height: 100px;
            margin-right: 16px;
            margin-bottom: 16px;
            border:1px solid #E0E6ED;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content:center;
            align-items: center;
            .icon{
              display: block;
            }
            p{
              font-size: 12px;
              height: 18px;
              line-height: 18px;
              color: #1A173B;
            }
            .edit{
              display: none;
              position: absolute;
              width: 20px;
              height: 20px;
              left: -1px;
              bottom: -1px;
              background-image: url('../../assets/landingpage/settings/edit_pen@3x.png');
              background-repeat: no-repeat;
              background-size: cover;
            }
            .dl{
              position: absolute;
              width: 20px;
              height: 20px;
              right: 0px;
              top: 0px;
              background-image: url('../../assets/landingpage/settings/edit.delete@3x.png');
              background-repeat: no-repeat;
              background-size: cover;
            }
            &.active{
              border-color: #0077ff;
              .edit{
                display: block;
              }
            }
            &.add{
              border: 1px dashed #E0E6ED;

            }
          }
        }
      }
    }
    .right{
      width: 400px;
      padding-bottom: 30px;
      margin-left: 78px;
      .wrap{
        border-left: 1px solid #C0CCDA;
        height: 100%;
        border-top: 1px solid #F2F4F8;
        border-bottom: 1px solid #F2F4F8;
        padding: 30px;
        .title{
          height: 64px;
          line-height: 40px;
          color: #1A173B;
          border-bottom: 1px solid #E0E6ED;
          .title-icon{
            display: block;
            float: left;
            margin-right: 12px
          }
          .title-name{
            float: left;
          }
        }
        .form{
          .form-item{
            height: 64px;
            border-bottom: 1px solid #E0E6ED;
            .form-item-name{
              float: left;
              height: 63px;
              line-height: 63px;
            }
            .form-item-input{
              width: 100px;
              float: right;
              margin-top: 16px;
              font-size: 12px;
            }
            .radio{
              float: right;
              margin-top: 23px;
            }
          }
        }
        .form-item-btn{
          width: 100%!important;
          margin-left: 0px!important;
          margin-top: 32px;
        }
      }
    }
  }
</style>


