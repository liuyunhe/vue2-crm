<template>
  <section class="view-container clearfix">

    <el-col :span="24" class="toolbar clearfix">
      <!--步骤条-->
      <crm-steps :steps="settingSteps" :active="settingStepsActive" :stepsClass="'mb50'"></crm-steps>
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
            <el-select v-model="steps1.projectCode" placeholder="请选择">
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :value="item.id"
                :label="item.project_name"
              >
              </el-option>
            </el-select>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="400电话">
            <span style="margin: 0 10px;">400 -</span>
            <el-input v-model="callTel1" class="callTel1" placeholder="数字" maxlength="32"></el-input>
            <span style="margin: 0 6px;">转</span>
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
            <div class="warning-wrap" v-if="steps1.projectCode =='' ">
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
      <div id="step2">

      </div>
      <!--步骤3-->
      <div id="step3">

      </div>
    </el-col>
    <el-col :span="24">
      <el-button type="primary" size="small fr" v-if="settingStepsActive===0" @click="nextStep()">下一步</el-button>
      <el-button type="primary" size="small fr" v-if="settingStepsActive===1" @click="lastStep()">上一步</el-button>
      <el-button size="small fr" class="important" @click="saveStep1()">保存</el-button>
      <el-button size="small fr" v-if="settingStepsActive===1" >发布</el-button>
      <el-button size="small fr" >预览</el-button>
      <el-button size="small fr" >取消</el-button>
      <el-button size="small fr" class="important" v-if="settingStepsActive===0">更换模板</el-button>

    </el-col>
  </section>
</template>

<script>
    import _ from 'lodash'
    import crmSteps from '../../components/base/crmSteps.vue'
    export default {
      components:{
        crmSteps
      },
      created(){
        //请求落地页机构
        this.$api.requestOrgList('').then(res =>{
          if(res.code ===1){
            this.orgNameList = res.data
          }
        }).catch(err => {

        })
        //请求落地页项目
        this.$api.requestProjectList('').then(res =>{
          if(res.code ===1){
            this.projectList = res.data
          }
        }).catch(err => {

        })
      },
      data() {
        return {
          //步骤条传参
          settingSteps:["基本信息","编辑模块","编辑内容"],
          settingStepsActive:0,

          //步骤先是标识
          step1Show:true,
          step2Show:false,
          step3Show:false,

          //步骤1
          steps1:{
            pageName:"",
            orgName:"",
            projectName:"",
            projectCode:"",
            callTel:"",
            label:""
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
        }
      },
      methods:{
        //按钮功能
        nextStep() {
          this.settingStepsActive = 1
          this.step1Show = false
          this.step2Show = true
        },
        lastStep() {
          this.settingStepsActive = 0
          this.step1Show = true
          this.step2Show = false
        },
        //第一步保存信息
        saveStep1() {
          if(this.callTel1&&this.callTel2){
            this.steps1.callTel = this.callTel1 + "," + this.callTel1
          }
          if(this.steps1.projectCode){
//            this.steps1.projectName =
          }
          this.step1Save = true
          this.steps1Warining = true
          console.log(this.steps1)
          let valArray = Object.values(this.steps1).slice(0,5)
          console.log(valArray)
          if(valArray.includes("")){
            return
          }else{
            this.$alert('确定保存当前编辑内容？', '提示信息', {
              showCancelButton: true,
              cancelButtonText: '取消',
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                if(action == 'confirm'){
                  this.$api.saveSettingStep1(this.steps1).then(res =>{
                    console.log(res)
                  }).catch(err =>{

                  })
                }
              }
            })

          }
        }
      },
      mounted() {

      }
    }
</script>

<style lang="scss" scoped>
  .el-button{width: 100px;margin-left: 10px}
  .mb50{margin-bottom: 50px}
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
</style>


