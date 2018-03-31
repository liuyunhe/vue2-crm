<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

  body {
    margin: 0px;
    padding: 0px;
    /*background: url(assets/bg1.jpg) center !important;
          background-size: cover;*/
  // background: #1F2D3D;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .mr0{
    margin-right: 0px;
  }


  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  //输入表单样式重写
  .el-input__prefix{
    transition:all 0s
  }
  .input-with-select
    .el-input-group__prepend {
      background-color: #fff;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
  //工具条
  .toolbar {
    margin: 10px 0px 20px;
    .el-form-item {
      margin-bottom: 0px;
      margin-right: 20px;
    }
    .el-form-item.mr0 {
      margin-bottom: 0px;
      margin-right: 0px;
    }
  }
  .footer-toolbar {
    margin: 25px 0px 0px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .el-table th{
    background:rgba(245,247,250,1);
    color: #222222;
  }

</style>
