<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2, $event)"  class="block positive" :class="{'active':selectType==2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0, $event)" class="block positive" :class="{'active':selectType==0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1, $event)" class="block negative" :class="{'active':selectType==1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default{
    props:{
      ratings:{
        type:Array,
        default: function(){
          return []
        }
      },
      selectType:{
        type:Number,
        default:ALL
      },
      onlyContent:{
        type:Boolean,
        default:false
      },
      desc:{
        type:Object,
        default(){
          return {
            all: '全部',
            positive:'满意',
            negative:'不满意'
          }
        }
      }
    },
    computed:{
      //满意的评价
      positives(){
        return this.ratings.filter((rating) =>{
          return rating.rateType === POSITIVE;
        });
      },
      //不满意的评价
      negatives(){
        return this.ratings.filter((rating) =>{
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods:{
      //评价分类的切换
      select(type, event){
        if(!event._constructed){
          return;
        }
        // this.selectType = type;
        // Vue.set(this.selectType,type);
        this.$emit('select', type);
      },
      //是否显示没有文字的评价
      toggleContent(event){
        if(!event._constructed){
          return;
        }
        // this.onlyContent = !this.onlyContent;
        this.$emit('toggle');
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .ratingselect
    .rating-type
      padding:18px 0
      margin:0 18px
      font-size:0
      border-1px(rgba(7, 17,27,0.1))
      .block
        display:inline-block
        padding:8px 12px
        margin-right:8px
        border-radius:1px
        line-height:16px
        font-size:12px
        color:rgb(77,85,93)
        &.active
          color:#fff
        .count
          font-size:8px
          margin-left:2px
        &.positive
          background:rgba(0,160, 220, 0.2)
          &.active
            background:rgb(0, 160, 220)
        &.negative
          background:rgba(77,85,93,0.2)
          &.active
            background rgb(77,85,93)
    .switch
      padding:12px 18px
      line-height:24px
      font-size:0
      color: rgb(147,153,159)
      border-bottom:1px solid rgba(7, 17, 27, 0.1)
      &.on
        .icon-check_circle
          color:#00c850
      .icon-check_circle
        display:inline-block
        vertical-align:top
        font-size:24px
        margin-right:4px
      .text
        font-size:12px
        
</style>