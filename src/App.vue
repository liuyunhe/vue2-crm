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

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  //顶部菜单栏
  .el-menu-item{
    padding: 0 15px;
    border-bottom: none!important;
    &:hover{
      background-color: #4A7DE1!important;
    }
  }
  .el-submenu{
    .el-submenu__title{
      padding: 0 15px;
      border-bottom: none!important;
    }
  }


  //面包屑只保留当前功能名称
  .el-breadcrumb{
    span.el-breadcrumb__item{
      display: none;
      &:last-child{
        display: block;
        font-size: 16px;
        .el-breadcrumb__inner {
          color: #555;
          font-weight: bold;
        }
      }
    }
  }
  .breadcrumb-container {
    margin-bottom: 15px;
    .title {
      width: 200px;
      float: left;
      color: #475669;
    }
    .breadcrumb-inner {
      float: left;
    }
  }
  //输入表单样式重写
  .el-input__prefix{
    transition:all 0s
  }
  .input-with-select
    .el-input-group__prepend {
      background-color: #fff;
  }

.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color: #4A7DE1!important;
  color: #fff!important;
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
  //底部工具条
  .footer-toolbar {
    margin: 25px 0px 0px;
    .btn-jump-to{
      width: 50px;
      height: 28px;
      line-height: 28px;
      float: right;
      padding: 0 4px;
      margin: 2px 0px 2px 20px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  //表格
  .el-table{
    th{
      background-color:rgba(245,247,250,1)!important;
      color: #222222;
      padding: 5px 0px;
      .cell{
        line-height: 20px;
        span.el-table__column-filter-trigger{
          margin-left: 10px;
        }
      }
    }
    tbody{
        .cell{
          line-height: 20px;
        }
        td:last-child{
          .cell{
            overflow: inherit;
          }
        }
      }
    }
  //表格图标
  i.table-icon{
    display: inline-block;
    position: relative;
    width: 14px;
    height: 14px;
    margin-right: 10px;
    vertical-align: middle;
    cursor: pointer;
      .table-icon-tips{
        display: none;
        width: 34px;
        font-style:normal;
        position: absolute;
        text-align: center;
        /*padding: 0 5px;*/
        height: 25px;
        background-color: #000;
        color: #FFFFFF;
        font-size: 12px;
        line-height: 25px;
        border-radius: 4px;
        top: 30px;
        left: -10px;
        /*display: none;*/
        opacity: 0.8;
        z-index: 999;
        &:before{
          content: "";
          position: absolute;
          left: 0;
          top: -85%;
          width: 0;
          height: 0;
          margin: 10px 0 0 10px;
          font-size: 0;
          border: 7px solid;
          border-color: transparent transparent #000 transparent;
          overflow: hidden;
        }
      }
    & .bg{
      width: 60px;
    }
    &:hover{
      .table-icon-tips{
        display: block;
      }
    }
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
