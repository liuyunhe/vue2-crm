<template>
  <section class="view-container clearfix">

    <el-col :span="24" class="toolbar clearfix">
      <!--步骤条-->
      <crm-steps :steps="settingSteps" :active="settingStepsActive" :stepsClass="'mb50'"></crm-steps>
      <!--步骤1-->
      <div id="step1" class="clearfix">
        <el-form :model="steps1" :size="'small'" label-width="100px">
          <el-form-item label="落地页名称">
            <el-input v-model="steps1.name" placeholder="输入落地页名称" maxlength="32"></el-input>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="所属机构">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="所属机构">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="网页标签名">
            <el-input v-model="steps1.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!--步骤2-->
      <div id="step2">

      </div>
      <!--步骤3-->
      <div id="step3">

      </div>
    </el-col>
  </section>
</template>

<script>
    import crmSteps from '../../components/base/crmSteps.vue'
    export default {
      components:{
        crmSteps
      },
      data() {
          return {
            //步骤条传参
            settingSteps:["基本信息","编辑模块","编辑内容"],
            settingStepsActive:0,
            //步骤1
            steps1:{
              name:''
            },
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            value: ''
          }
      },
    }
</script>

<style lang="scss" scoped>
  .mb50{margin-bottom: 50px}
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
    }
  }
</style>


