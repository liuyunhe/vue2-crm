<!--props：selections-->
<!--事件：@on-change-->
<!--返回参数：newObjArry-->
<template>
    <div class="crm-selections">
      <ul class="selections-list">
        <li
          v-for="(item,index) in selections"
          :class="{active:checkActive(index)}"
          @click="toggleSelection(index)"
        >
          {{item.label}}
        </li>
      </ul>
    </div>
</template>

<script>
  import _ from "lodash"
  export default {
    props:{
      selections:{
        type:Array,
        default:[{
          label:'test',
          value:0
        }]
      }
    },
    data() {
        return {
          nowIndexes:[]
        }
    },
    methods:{
      checkActive(index){
        return this.nowIndexes.includes(index)
      },
      toggleSelection(index){
        if(!this.nowIndexes.includes(index)){
          this.nowIndexes.push(index)
        }else {
          this.nowIndexes = _.remove(this.nowIndexes,(idx)=>{
            return idx !== index
          })
        }
        let newObjArry = _.map(this.nowIndexes,(idx)=>{
          return this.selections[idx]
        })
        this.$emit("on-change",newObjArry)
      }
    }

  }
</script>

<style lang="scss" scoped="">
  .selections-list li{
    float: left;
    width: 100px;
    height:30px;
    color: #475669;
    margin-top: 4px;
    margin-right: 12px;
    border: 1px solid #C0CCDA;
    border-radius: 3px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    &.active{
      color: #0077FF;
      border-color: #0077FF;
    }
  }

</style>
