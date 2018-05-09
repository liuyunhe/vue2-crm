<template>
  <div>
    <div class="main-container">
      <div class="index-container">
        <!--头部数据浮动栏-->
        <!--<draggable class="data-board" v-model="dataBoard" element="div" :options="dragOptions">-->
          <!--<transition-group type="transition" :name="'flip-list'" tag="div" style="width: 100%;display: flex">-->
            <div class="data-board">
              <div class="data-board-zone" v-if="dataBoard.deliveryObject">
                <div class="title">当前投放项目（个）</div>
                <div class="data-numb">{{ dataBoard.deliveryObject.nowProjectCount }}</div>
                <div class="data-fluctuation">
                  <div class="compare">
                    <!--<span>较昨日</span><i class="add">{{ "111" }}</i>-->
                  </div>
                  <div class="item">
                    本月新增:<span>{{ dataBoard.deliveryObject.sameMonthCount }}</span>
                  </div>
                  <div class="item">
                    累计项目:<span>{{ dataBoard.deliveryObject.totalProjectCount }}</span>
                  </div>
                </div>
              </div>
              <div class="data-board-zone" v-if="dataBoard.showObject">
                <div class="title">实时展现量（次）</div>
                <div class="data-numb">{{ dataBoard.showObject.nowCount }}</div>
                <div class="data-fluctuation">
                  <div class="compare">
                    <span>较昨日</span>
                    <i :class="{add:dataBoard.showObject.compareCount - 0 >= 0,
                      decrease:dataBoard.showObject.compareCount - 0 < 0}">
                      {{ dataBoard.showObject.compareCount }}
                    </i>
                  </div>
                  <div class="item">
                    昨日展现:<span>{{ dataBoard.showObject.yesterCount }}</span>
                  </div>
                  <div class="item">
                    日均展现:<span>{{ dataBoard.showObject.dailyMeanCount }}</span>
                  </div>
                  <div class="item">
                    累计展现:<span>{{ dataBoard.showObject.totalCount }}</span>
                  </div>
                </div>
              </div>
              <div class="data-board-zone" v-if="dataBoard.clickNumObject">
                <div class="title">实时点击量（次）</div>
                <div class="data-numb">{{ dataBoard.clickNumObject.nowClickCount }}</div>
                <div class="data-fluctuation">
                  <div class="compare">
                    <span>较昨日</span>
                    <i :class="{add:dataBoard.clickNumObject.compareClickCount - 0 >= 0,
                      decrease:dataBoard.clickNumObject.compareClickCount - 0 < 0}">
                      {{ dataBoard.clickNumObject.compareClickCount }}
                    </i>
                  </div>
                  <div class="item">
                    昨日点击:<span>{{ dataBoard.clickNumObject.yesterClickCount }}</span>
                  </div>
                  <div class="item">
                    日均点击:<span>{{ dataBoard.clickNumObject.dailyMeanClickCount }}</span>
                  </div>
                  <div class="item">
                    累计点击:<span>{{ dataBoard.clickNumObject.totalClickCount }}</span>
                  </div>
                </div>
              </div>
              <div class="data-board-zone" v-if="dataBoard.guestsObject">
                <div class="title">实时获客量（组）</div>
                <div class="data-numb">{{ dataBoard.guestsObject.nowGuestsCount }}</div>
                <div class="data-fluctuation">
                  <div class="compare">
                    <span>较昨日</span>
                    <i :class="{add:dataBoard.guestsObject.compareGuestsCount - 0 >= 0,
                      decrease:dataBoard.guestsObject.compareGuestsCount - 0 < 0}">
                      {{ dataBoard.guestsObject.compareGuestsCount }}
                    </i>
                  </div>
                  <div class="item">
                    昨日获客:<span>{{ dataBoard.guestsObject.yesterGuestsCount }}</span>
                  </div>
                  <div class="item">
                    日均获客:<span>{{ dataBoard.guestsObject.dailyMeanGuestsCount }}</span>
                  </div>
                  <div class="item">
                    累计获客:<span>{{ dataBoard.guestsObject.totalGuestsCount }}</span>
                  </div>
                </div>
              </div>
              <div class="data-board-zone" v-if="dataBoard.consumObject">
                <div class="title">实时消费金额（元）</div>
                <div class="data-numb">{{ dataBoard.consumObject.nowConsumCount }}</div>
                <div class="data-fluctuation">
                  <div class="compare">
                    <span>较昨日</span>
                    <i
                      :class="{add:dataBoard.consumObject.compareConsumCount - 0 >= 0,
                      decrease:dataBoard.consumObject.compareConsumCount - 0 < 0}">
                      {{ dataBoard.consumObject.compareConsumCount}}
                    </i>
                  </div>
                  <div class="item">
                    昨日消费:<span>{{ dataBoard.consumObject.yesterConsumCount }}</span>
                  </div>
                  <div class="item">
                    日均消费:<span>{{ dataBoard.consumObject.dailyMeanConsumCount }}</span>
                  </div>
                  <div class="item">
                    累计消费:<span>{{ dataBoard.consumObject.totalConsumCount }}</span>
                  </div>
                </div>
              </div>
            </div>

          <!--</transition-group>-->
        <!--</draggable>-->
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
      created(){
        this.$api.requstHomeData('').then((res)=>{
          console.log(res)
          if(res.code == "1"){
            this.dataBoard = res.data
          }
        })
      },
      data() {
        return {
          editable:true,
          dataBoard:{
            "clickNumObject": {
              "nowClickCount": "",
              "yesterClickCount": "",
              "dailyMeanClickCount": "",
              "compareClickCount": "",
              "totalClickCount": ""
            },
            "showObject": {
              "compareCount": "",
              "nowCount": "",
              "dailyMeanCount": "",
              "totalCount": "",
              "yesterCount": ""
            },
            "consumObject": {
              "compareConsumCount": "",
              "totalConsumCount": "",
              "dailyMeanConsumCount": "",
              "nowConsumCount": "",
              "yesterConsumCount": ""
            },
            "deliveryObject": {
              "nowProjectCount": "",
              "totalProjectCount": "",
              "sameMonthCount": ""
            },
            "guestsObject": {
              "compareGuestsCount": "",
              "nowGuestsCount": "",
              "yesterGuestsCount": "",
              "totalGuestsCount": "",
              "dailyMeanGuestsCount": ""
            },
          } ,
          tapMenu:[
            {
              title:"项目管理",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-4.png')
            },
            {
              title:"落地页制作",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-5.png')
            },
            {
              title:"投放推广",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-1.png')
            },
            {
              title:"客户列表",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-3.png')
            },
            {
              title:"页面分析",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-2.png')
            },
            {
              title:"钉钉通报",
              context:"最长只有两行字，最多不超过15个字…",
              src:require('../assets/homeicon/icon-home-6.png')
            },
          ],
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
    min-width: 1280px;
    height: 100%;
    overflow: auto;
    .index-container{
      width: 1280px;
      margin: 0 auto;
      .data-board{
        width: 100%;
        height: 215px;
        display: flex;
        background:rgba(255,255,255,1);
        border-radius: 2px;
        padding: 30px 0;
        margin-bottom: 30px;
        .data-board-zone{
          width: 20%;
          padding: 0 60px;
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
            height: 40px;
            line-height:50px;
            color: #222;
            font-size: 28px;
            font-weight: bold;
            /*margin-bottom: 10px;*/
          }
          .data-fluctuation{
            .compare{
              margin-bottom: 15px;
              height: 16px;
              span{
                color: #999;
                text-align: center;
                font-size: 12px;
              }
              i.add{
                color: #E7343A;
                font-size: 12px;
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
            .item{
              height: 20px;
              line-height: 20px;
              color: #555;
              font-size: 12px;
              span{
                margin-left: 10px;
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
