<template>
  <div class="main-container">
    <div class="index-container">
      <div class="data-board">
        <div class="data-board-zone">
          <div class="title">展现量（uv）</div>
          <div class="data-numb">22,330</div>
          <div class="data-fluctuation">
            <div class="item">昨日展现:<span>20,000</span><i class="add">11.50%</i></div>
            <div class="item">日均展现:<span>20,000</span><i class="add">11.50%</i></div>
            <div class="item">累计展现:<span>350,782</span><i class="add">11.50%</i></div>
          </div>
        </div>
        <div class="data-board-zone"></div>
        <div class="data-board-zone"></div>
        <div class="data-board-zone"></div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        data() {
            return {
                msg: 'hello vue'
            }
        },
    }
</script>

<style lang="scss" >
  .main-container{
    width:100%;
    background:rgba(249,250,251,1);
    padding-top: 44px;
    .index-container{
      width: 1280px;
      margin: 0 auto;
      .data-board{
        width: 100%;
        height: 200px;
        display: flex;
        background:rgba(255,255,255,1);
        border-radius: 2px;
        .data-board-zone{
          width: 25%;
          padding: 30px 40px;
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
                  border: 5px solid;
                  border-color: transparent transparent #E7343A transparent;
                  position: relative;
                  top: -8px;
                  margin: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
