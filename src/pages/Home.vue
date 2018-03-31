<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>账号：{{ sysAdmin }}</el-dropdown-item>
            <el-dropdown-item>角色：{{ '系统管理员' }}</el-dropdown-item>
            <el-dropdown-item>归属：{{ '集团总部' }}</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4" class="logo-bar">
        <span>全网导客平台</span>
      </el-col>
      <el-col :span="16" class="menu">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#202A3E"
          text-color="#fff"
          active-text-color="#fff"
        >
          <el-menu-item index="6">系统管理</el-menu-item>
          <el-menu-item index="5">运营助手</el-menu-item>
          <el-menu-item index="4">项目管理</el-menu-item>
          <el-menu-item index="3">客户管理</el-menu-item>
          <el-submenu index="2">
            <template slot="title">数据分析</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="1">投放管理</el-menu-item>
          <el-menu-item index="0">首页</el-menu-item>
        </el-menu>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>

</template>

<script>
    import ElCol from "element-ui/packages/col/src/col";
    export default {
      components: {ElCol},
      name: "",
        data() {
            return {
              //菜单
              isCollapse:true,
              isCollapseTransition:false,
              //顶部导航
              activeIndex: '1',
              activeIndex2: '1',
              //用户头像图片
              sysUserAvatar:'',
              //用户姓名
              sysUserName:'',
              //用户账号
              sysAdmin:'',
            }
        },
        methods:{
          logout() {
            let _this = this

            this.$confirm('确认要离开吗?','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(()=>{
                sessionStorage.removeItem('user')
                _this.$router.push('/login')
              })
              .catch(()=>{

              })
          },
          handleSelect() {

          }
        },
        mounted() {
          let user = sessionStorage.getItem('user');
          if(user) {
            user = JSON.parse(user)
            this.sysUserName = user.name || ''
            this.sysUserAvatar = user.avatar || ''
            this.sysAdmin = user.username || ''
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../styles/vars";
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .container{
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    min-width: 1100px;
    .header{
      border-bottom: solid 1px #e6e6e6;
      background: $color-top-menu;
      color:#fff;
      .logo-bar{
        line-height: 66px;
        font-size: 20px;
        font-weight: bolder;
      }
      .menu {
        /*background: $color-primary;*/
        height: 66px;
        line-height: 66px;
        padding: 4px 0;
        .el-menu{
          border: none;
          box-sizing: border-box;
          .el-menu-item{
            float: right;
            padding: 0 20px;
          }
          .el-submenu{
            float: right;
          }
        }
      }
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        line-height: 66px;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 13px 0px 13px 10px;
            float: right;
          }
        }
      }
    }
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 66px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex:0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:60px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }

        }
      }
      .menu-collapsed{
        flex:0 0 60px;
        width: 60px;
      }
      .menu-expanded{
        flex:0 0 230px;
        width: 230px;
        .el-menu.el-menu-vertical-demo{
          width: inherit!important;
        }
      }
      .content-container {
        // background: #f1f2f7;
        flex:1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 230px;
        overflow-y: scroll;
        padding: 30px;
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
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
