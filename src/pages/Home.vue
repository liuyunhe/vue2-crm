<template>
  <el-row class="container">
    <el-col :span="24" class="header"><div class="grid-content bg-purple-dark"></div></el-col>
  </el-row>
</template>

<script>

    export default {
        name: "",
        data() {
            return {
                msg: 'hello vue'
            }
        },
    }
</script>

<style lang="scss" scoped>
  @import "../styles/vars";
  .container{
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header{
      height: 60px;
      line-height: 60px;
      background: $color-primary;
      color:#fff;
    }
  }
</style>
