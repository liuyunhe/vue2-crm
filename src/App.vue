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
//以下为全局属性
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

  .el-table{
    th{
      background-color:rgba(245,247,250,1)!important;
      color: #222222;
    }
  }
  //表格图标
  i.table-icon{
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 10px;
    vertical-align: middle;
    cursor: pointer;
    //预览
    &.ly{
    background-image: url("./assets/tableIcon/icon-yl.png");
    }
    //编辑
    &.bj{
      background-image: url("./assets/tableIcon/icon-bj.png");
    }
    //发布
    &.fb{
      background-image: url("./assets/tableIcon/icon-fb.png");
    }
    //复制链接
    &.fzlj{
      background-image: url("./assets/tableIcon/icon-fzlj.png");
    }
    //禁用
    &.jy{
      background-image: url("./assets/tableIcon/icon-jy.png");
    }
    //明细
    &.mx{
      background-image: url("./assets/tableIcon/icon-mx.png");
    }
    //删除
    &.sc{
      background-image: url("./assets/tableIcon/icon-sc.png");
    }
  }
  //




</style>
