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
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #1A173B;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  ol, ul {
    list-style: none;
  }
  div{
    box-sizing: border-box;
  }
  i{
    font-style:normal
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clearfix:after{clear: both;display: block;visibility: hidden;height: 0;content: "";}
  .mr0{
    margin-right: 0px;
  }
  .view-container{
    padding: 30px;
    min-width: 1280px;
    max-width: 1440px;
    margin: 0 auto;
    box-sizing: border-box;
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
  .crm-home{
    .el-menu-item{
      width: 110px;
      text-align: center;
      border-bottom: none!important;
    }
    .el-submenu{
      .el-submenu__title{
        width: 110px;
        height: 62px!important;
        text-align: center;
        border-bottom: none!important;
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }

  }
  .el-menu--popup{
    min-width: 130px!important;
    text-align: center;
    padding: 0!important;
    .el-menu-item:hover{
      background-color: #0077FF!important;
    }
    .el-menu-item.is-active:hover{
      background-color: #0077FF!important;
      color: #fff!important;
    }
    .el-menu-item.is-active{
      color: #0077FF!important;
    }
  }

  //DropDown下拉菜单
  .el-dropdown-menu{
    padding: 0!important;
    .el-dropdown-menu__item.active{
      color: #0077FF;
    }
  }


  //表单下拉
  .el-select-dropdown{
    .el-select-dropdown__list{
      padding: 0!important;
    }
    .popper__arrow{
      display: none;
      &::after{
        display: none;
      }
    }
  }

  //用户账号下拉
  .user-dropdown-menu.el-popper[x-placement^=bottom] {
    .popper__arrow{
      display: none;
      &::after{
        display: none;
      }
    }
  }

  //
  .section-container{
    padding: 30px;
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
    margin-bottom: 40px;
    .title {
      width: 200px;
      float: left;
      color: #475669;
    }
    .breadcrumb-inner {
      float: left;
      line-height: 32px;
    }
  }

  //输入表单样式重写
  .el-input--suffix{
    .el-input__inner{
      padding-left: 15px!important;
      padding-right: 20px!important;
      color: #1A173B!important;
    }
  }
  .el-input__prefix{
    transition:all 0s
  }
  .input-with-select {

    .el-input-group__prepend {
      background-color: #fff;
      .el-input__inner{
        transition: 0s!important;
        border: none!important;
        color: #1A173B!important;
      }
    }
    /*.el-input__inner{*/
      /*transition: 0s!important;*/
      /*border-color:#dcdfe6!important; ;*/
    /*}*/
  }
  /*.input-with-select:hover{*/
    /*.el-input-group__prepend{*/
      /*border-color:#4A7DE1!important;*/
      /*transition: 0s!important;*/
      /*.el-input__inner{*/
        /*border: none!important;*/
      /*}*/
    /*}*/
    /*.el-input__inner{*/
      /*border-color:#4A7DE1!important;*/
      /*transition: 0s!important;*/

    /*}*/
  /*}*/

.el-select-dropdown__item{
  font-size: 13px!important;
  &.hover,&:hover{
    background-color: #0077FF!important;
    color: #fff!important;
  }
}
  //工具条
  .toolbar {
    margin-bottom: 15px;
    .el-form-item {
      margin-bottom: 0px;
      margin-right: 20px;
    }
    .el-form-item.mr0 {
      margin-bottom: 0px;
      margin-right: 0px;
    }
    .el-form-item__label{
      color: #8A96A0!important;
    }
  }
  //底部工具条
  .footer-toolbar {
    margin: 25px 0px 0px;
    .btn-jump-to{
      width: 50px!important;
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
  .crm-table-wrap{
    width: 100%;
    min-height: 400px;
    border: 1px solid #E2E8ED;
    border-radius: 3px;
    .crm-table{
      position: relative;
      table-layout: fixed;
      width: 100%;
      /*max-width: 100%;*/
      border-collapse: collapse;
      border-spacing: 0;
      thead{
        tr{
          background:rgba(245,247,250,1);
          th{
            padding: 0 30px;
            text-align: left;
            line-height: 45px;
            height: 45px;
            text-overflow: ellipsis;
            white-space: nowrap;
            /*border-bottom: 1px solid #E2E8ED;*/
            color: #8A96A0!important;
            &:first-child{
              border-radius: 3px 0 0 0;
            }
            &:last-child{
              border-radius: 0 3px 0 0;
            }
          }
        }
      }
      tbody{
        tr{
          td{
            padding: 0 30px;
            text-align: left;
            line-height: 45px;
            height: 45px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-bottom: 1px solid #E2E8ED;
            span.ctrl{
              color: #0077FF;
              text-decoration: underline;
              cursor: pointer;
              margin-right: 20px;
              &:last-child{
                margin-right: 0px;
              }
            }
          }
          &:last-child{
            td{
              border-bottom: none;
              &:first-child{
                border-radius: 0 0 0 3px;
              }
              &:last-child{
                  border-radius: 0 0 3px 0;
              }
            }
          }
        }
      }
    }
  }

  //table下拉菜单
  .hover-slide{
  position: relative;
  padding: 0px!important;
  width: 130px;
  text-align: center;
  cursor: pointer;
  &:hover{
    background:rgba(239,242,248,1);
  }
  span{
    position: relative;
    &:after{
      content: "";
      position: absolute;
      right: -20px;
      top: 7px;
      border: 5px solid transparent;
      border-top-color: #324057;
    }

  }
  .slide-zone{
    width: 100%;
    position:absolute;
    top:45px;
    background-color: #fff;
    .border-line{
      height: 5px;
    }
    .slide-wrap{
      width:100%;
      border: 1px solid #E2E8ED;
      .slide-bar{
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #555555;
        cursor: pointer;
        font-weight: normal;
        &:hover{
          color: #FFF!important;
          background-color: #0077FF;
        }
        &.active{
          color: #0077FF;
        }
      }
    }
  }

}

  //图标提示tooltips
  .table-tooltip{
    padding: 5px;
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

  //分页器
  .el-pager{
    li{
      font-weight: normal;
    }
  }

</style>
