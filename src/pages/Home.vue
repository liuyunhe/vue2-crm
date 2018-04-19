<template>
  <div>
    <div class="main-container">
      <div class="index-container">
        <!--头部数据浮动栏-->
        <draggable class="data-board" v-model="dataBoard" element="div" :options="dragOptions">
          <transition-group type="transition" :name="'flip-list'" tag="div" style="width: 100%;display: flex">
            <div class="data-board-zone" v-for="(item,index) in dataBoard" :key="index">
              <div class="title">{{ item.title }}</div>
              <div class="data-numb">{{ item.numb }}</div>
              <div class="data-fluctuation">
                <div class="item" v-for="child in item.fluctuation">{{ child.name }}:<span>{{ child.numb }}</span><i :class="child.activeClass">{{ child.percent}}</i></div>
              </div>
            </div>
          </transition-group>
        </draggable>
        <!--头部数据浮动栏end-->
        <!--功能tab菜单-->
        <div class="tap-menu">

          <template v-for="item in tapMenu">
            <div class="tap-zone">
              <div class="tap-zone-img">
                <img :src="item.src" alt="" height="70">
              </div>
              <div class="tap-zone-message">
                <div class="title">{{ item.title }}</div>
                <div class="context">{{ item.context }}</div>
              </div>
            </div>
          </template>

        </div>
        <!--功能tab菜单-->
      </div>
      <!--底部copyright-->
      <div class="home-footer">
        <div class="container">Copyright© 2016JUFUNS group.All right Reserved. 聚房宝 版权所有</div>
      </div>
      <!--底部copyright end-->
    </div>
  </div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
      components:{
        draggable
      },
      computed:{
        dragOptions () {
          return  {
            animation: 300,
            group: 'description',
            disabled: !this.editable,
            ghostClass: 'ghost'
          };
        },
      },
      data() {
        return {
          editable:true,
          dataBoard: [
            {
              title:"展现量（UV）",
              numb:"22,330",
              fluctuation:[
                {
                  name:"昨日展现",
                  numb:"20,000",
                  percent:"11.50%",
                  activeClass:"decrease"
                },
                {
                  name:"日均展现",
                  numb:"20,000",
                  percent:"11.50%",
                  activeClass:"add"
                },
                {
                  name:"累计展现",
                  numb:"350,782",
                  percent:"11.50%",
                  activeClass:"add"
                }
              ]
            },
            {
              title:"获客数（组）",
              numb:"168",
              fluctuation:[
                {
                  name:"昨日获客",
                  numb:"20,000",
                  percent:"11.50%",
                  activeClass:"add"
                },
                {
                  name:"日均获客",
                  numb:"20,000",
                  percent:"11.50%",
                  activeClass:"decrease"
                },
                {
                  name:"累计获客",
                  numb:"350,782",
                  percent:"11.50%",
                  activeClass:"add"
                }
              ]
            },
            {
              title:"消费金额（元）",
              numb:"22,330",
              fluctuation:[
                {
                  name:"昨日消费",
                  numb:"20,000",
                  percent:"11.50%",
                  activeClass:"add"
                },
                {
                  name:"日均消费",
                  numb:"20,000",
                  percent:"11.50%",
                  activeClass:"decrease"
                },
                {
                  name:"累计消费",
                  numb:"350,782",
                  percent:"11.50%",
                  activeClass:"add"
                }
              ]
            },
            {
              title:"客单价（元）",
              numb:"22,330",
              fluctuation:[
                {
                  name:"昨日单价",
                  numb:"20,000",
                  percent:"11.50%",
                  activeClass:"decrease"
                },
                {
                  name:"日均单价",
                  numb:"20,000",
                  percent:"11.50%",
                  activeClass:"decrease"
                },
                {
                  name:"累计单价",
                  numb:"350,782",
                  percent:"11.50%",
                  activeClass:"add"
                }
              ]
            }
          ],
          tapMenu:[
            {
              title:"投放中心",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-1.png')
            },
            {
              title:"数据分析",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-2.png')
            },
            {
              title:"客户管理",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-3.png')
            },
            {
              title:"项目管理",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-4.png')
            },
            {
              title:"运营助手",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-5.png')
            },
            {
              title:"系统设置",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-6.png')
            },
          ]
        }
      },
    }
</script>

<style lang="scss" scoped>
  .ghost {
    opacity: .5;
    background: #C8EBFB;
  }
  .main-container{
    width:100%;
    background:rgba(249,250,251,1);
    padding-top: 44px;
    position: absolute;
    height: 100%;
    .index-container{
      width: 1280px;
      margin: 0 auto;
      .data-board{
        width: 100%;
        height: 200px;
        display: flex;
        background:rgba(255,255,255,1);
        border-radius: 2px;
        padding: 30px 0;
        margin-bottom: 30px;
        .data-board-zone{
          width: 25%;
          padding: 0 40px;
          border-right: 1px solid #F1F4F6;

          &:last-child{
            border-right: none;
          }
          .title {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #555;
          }
          .data-numb{
            height: 50px;
            line-height: 50px;
            color: #222;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .data-fluctuation{
            .item{
              height: 20px;
              line-height: 20px;
              color: #555;
              font-size: 12px;
              span{
                margin-left: 10px;
              }
              i.add{
                color: #E7343A;
                font-size: 12px;
                float: right;
                &:before{
                  content: "";
                  border-width: 5px 5px 7px 5px;
                  border-style: solid;
                  border-color: transparent transparent #E7343A transparent;
                  position: relative;
                  top: -11px;
                  margin: 5px;
                }
              }
              i.decrease{
                color: #2C9414;
                font-size: 12px;
                float: right;
                &:before{
                  content: "";
                  border-width: 7px 5px 5px 5px;
                  border-style: solid;
                  border-color:#2C9414 transparent transparent transparent;
                  position: relative;
                  top: 11px;
                  margin: 5px;
                }
              }
            }
          }
        }
      }
      .tap-menu{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 80px;
        .tap-zone{
          display: flex;
          width: calc((100% - 40px)/3);
          height: 150px;
          border-radius: 2px;
          margin-right: 20px;
          margin-bottom: 20px;
          padding: 40px 0;
          background-color: #fff;
          cursor: pointer;
          &:nth-child(3n){
            margin-right: 0px;
          }
          &:hover{
            transition: box-shadow 0.5s linear;
            box-shadow: 0px 5px 10px 0px rgba(32,70,144,0.1)
          }
          .tap-zone-img{
            width: 180px;
            height: 70px;
            img{
              display: block;
              border: none;
              margin: 0 auto;
            }
          }
          .tap-zone-message{
            width: calc(100% - 180px);
            height: 70px;
            padding-right: 80px;
            .title{
              height:30px;
              line-height: 30px;
              color: #555555;
              font-size: 20px;
              text-align: left;
              margin-bottom: 10px;
            }
            .context{
              height: 30px;
              line-height: 15px;
              color: #808080;
              font-size: 12px;
              text-align: left;
            }
          }
        }
      }
    }
    .home-footer{
      width: 100%;
      height: 36px;
      line-height:36px;
      font-size: 12px;
      color: #808080;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      .container{
        width: 1280px;
        margin: 0 auto;
        text-align: right ;
      }
    }
  }

</style>
