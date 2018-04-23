<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">{{sysUserName}}<img :src="this.sysUserAvatar" /></span>
          <el-dropdown-menu slot="dropdown" class="user-dropdown-menu">
            <el-dropdown-item disabled>账号：{{ sysAdmin }}</el-dropdown-item>
            <el-dropdown-item disabled>角色：{{ '系统管理员' }}</el-dropdown-item>
            <el-dropdown-item disabled>归属：{{ '集团总部' }}</el-dropdown-item>
            <el-dropdown-item divided >
              <span class="userinfo-btn">修改密码</span>
              <span class="userinfo-btn" style="float: right" @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4" class="logo-bar">
        <span>全网导客平台</span>
      </el-col>
      <el-col  class="menu">
        <el-menu
          :default-active="$route.path"
          class="el-menu crm-home"
          mode="horizontal"
          router
          @select="handleSelect"
          background-color="#202A3E"
          text-color="#fff"
          active-text-color="#fff"
        >
          <!--单级菜单-->
          <el-menu-item index="/Home">首页</el-menu-item>
          <!--循环遍历多级菜单-->
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title">{{item.name}}</template>
              <el-menu-item :class="{'is-active':$route.path === child.path}" v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <section class="content-container">
        <div class="grid-content bg-purple-light clearfix" style="width: 100%">
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
    export default {
        name: "",
        data() {
            return {
              breadcrumb:true,
              //菜单
              isCollapse:true,
              isCollapseTransition:false,
              //顶部导航
              activeIndex: '',
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
          console.log(this.$route.path)
        }
    }
</script>

<style lang="scss" scoped>
  @import "../styles/vars";
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .userinfo-btn{
    cursor: pointer;
    &:hover{
      color: #4A7DE1;
    }
  }
  .user-dropdown-menu{
    width: 160px;
    background-color: rgba(26,37,58,1);
    .el-dropdown-menu__item.is-disabled{
      color: #fff!important;
      font-size: 12px;
      height:30px;
      line-height: 30px;
    }
    .el-dropdown-menu__item.el-dropdown-menu__item--divided{
      font-size: 12px;
      height:30px;
      line-height: 30px;
      color: #fff!important;
      cursor: inherit;
      border: none;
      padding: 0 15px;
      &:hover{
        background-color: rgba(26,37,58,1);
      }
      &:before{
        background-color: rgba(26,37,58,1);
        margin: 0px;
        border-top: 1px solid #0B1019;
      }
    }
  }
  .container{
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    min-width: 1350px;
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
        width: auto;
        float:right;
        height: 66px;
        line-height: 66px;
        padding: 4px 0;
        .el-menu{
          border: none;
          box-sizing: border-box;
          .el-menu-item{
            float: left;
          }
        }
      }
      .userinfo {
        width: 190px;
        text-align: right;
        padding-left: 20px;
        padding-right: 35px;
        float: right;
        line-height: 66px;
        .el-dropdown{
          height: 58px;
        }
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 13px 10px 13px 0px;
            float: left;
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
        overflow-y: auto;
        /*padding: 30px;*/

        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
