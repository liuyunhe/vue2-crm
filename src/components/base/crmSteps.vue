<template>
  <div class="crm-step-wrap clearfix" :class="stepsClass">
    <div class="crm-step" :class="{active:index <= active}" v-for="(item,index) in steps">
      <i class="crm-step-line" v-if="index !== 0"></i>
      <div class="crm-step-number">{{ index + 1 }}</div>
      <div class="crm-step-name">{{ item }}</div>
    </div>
  </div>
</template>

<script>
    export default {
        props:{
          steps:{
            type:Array,
            default:["steps1","steps2","steps3"]
          },
          active:{
            type:Number,
            default:0
          },
          stepsClass:{
            type:String,
            default:''
          }
        },
        data() {
          return {
          }
        },

    }
</script>

<style lang="scss" scoped>
  .crm-step-wrap{
    height: 40px;
    border-bottom:1px solid #F2F4F8;
    .crm-step{
    float: left;
    height: 20px;
    line-height: 20px;
    color: #C0CCDA;
    margin-right: 1px;
    .crm-step-line{
      float: left;
      width:60px;
      height: 2px;
      background-color: #C0CCDA;
      margin-top: 9px;
    }
    .crm-step-number{
      float: left;
      width: 18px;
      height: 18px;
      margin: 1px 5px;
      background-color: #C0CCDA;
      border-radius: 10px;
      line-height: 18px;
      text-align: center;
      color: #fff;
    }
    .crm-step-name{
      float: left;
    }
    &.active{
      color: #0077FF;
      .crm-step-line{
        background-color: #0077FF;
      }
      .crm-step-number{
        background-color: #0077FF;
      }
      .crm-step-name{
        color: #0077FF;
      }
    }
  }

  }

</style>
