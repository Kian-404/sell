<template>
  <div>
    <div class="goods">
    	<!-- 左侧菜单分类区域 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <!-- 右侧商品的区域 -->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                  	<!-- 商品数量的计算加减的组件 -->
                    <cartcontrol @add="addFood"   :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 购物车组件 -->
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import food from '../food/food';

	const ERR_OK = 0;
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				goods:[],
				listHeight:[],
				scrollY:0,
				selectedFood:{}
			}
		},
		computed:{
			//根据左侧的menuWrapper计算出相应的右边foodWrapper要滚动的区间
			currentIndex(){
				for(let i=0; i< this.listHeight.length; i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || (this.scrollY >=height1 && this.scrollY < height2)){
						return i;
					}
				}
				return 0;
			},
			//选择商品，把已经选择的商品放在foods中
			selectFoods(){
				let foods = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food)
						}
					});
				});
				return foods;
			}
		},
		created(){
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			//获取goods的数据
			axios.get('/api/goods').then(res=>{
				let result = res.data.data
				// console.log(result);
				if(result.errno === ERR_OK){
					this.goods = result.data;
					this.$nextTick(()=>{
						this._initScroll();
						this._calculateHeight();
					});
				}
				// console.log(this.goods);
			})
		},
		methods:{
			//左侧的菜单选择，右侧商品的滚动
			selectMenu(index, event){
				if(!event._constructed){
					return ;
				}
				let foodList = this.$refs.foodList;
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el,300);
			},
			//选择商品
			selectFood(food, event){
				if(!event._constructed){
					return;
				}
				this.selectedFood = food;
				// console.log(this.$refs.food);
				this.$refs.food.show();
			},
			//触发小球掉落事件
			addFood(target){
				this._drop(target);
			},
			//小球掉落效果
			_drop(target){
				//优化小球动画，让小球掉落动画和添加商品时显示减号和数量的动画异步进行
				this.$nextTick(()=>{
					this.$refs.shopcart.drop(target);
				})
			},
			//初始化滚动条
			_initScroll(){
				//初始化左边的menuWrapper滚动条
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				});
				//初始化右边的foodWrapper滚动条
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
					click: true,
					probeType:3
				});
				//监听滚动条滚动的高度
				this.foodsScroll.on('scroll', (pos) => {
		          this.scrollY = Math.abs(Math.round(pos.y));
		        });
			},
			//计算每个列表（foodList）的高度
			_calculateHeight() {
		        let foodList = this.$refs.foodList;
		        let height = 0;
		        this.listHeight.push(height);
		        for (let i = 0; i < foodList.length; i++) {
		          let item = foodList[i];
		          height += item.clientHeight;
		          this.listHeight.push(height);
		        }
		    }
		},
		components:{
			shopcart,
			cartcontrol,
			food
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import '../../common/stylus/mixin.styl'
	.goods
	  display: flex
	  position: absolute
	  top: 174px
	  bottom: 46px
	  width: 100%
	  overflow: hidden
	  .menu-wrapper
	    flex: 0 0 80px
	    width: 80px
	    background: #f3f5f7
	    .menu-item
	      display: table
	      height: 54px
	      width: 56px
	      padding: 0 12px
	      line-height: 14px
	      &.current
	        position: relative
	        z-index: 10
	        margin-top: -1px
	        background: #fff
	        font-weight: 700
	        .text
	          border-none()
	      .icon
	        display: inline-block
	        vertical-align: top
	        width: 12px
	        height: 12px
	        margin-right: 2px
	        background-size: 12px 12px
	        background-repeat: no-repeat
	        &.decrease
	          bg-image('decrease_3')
	        &.discount
	          bg-image('discount_3')
	        &.guarantee
	          bg-image('guarantee_3')
	        &.invoice
	          bg-image('invoice_3')
	        &.special
	          bg-image('special_3')
	      .text
	        display: table-cell
	        width: 56px
	        vertical-align: middle
	        border-1px(rgba(7, 17, 27, 0.1))
	        font-size: 12px
	  .foods-wrapper
	    flex: 1
	    .title
	      padding-left: 14px
	      height: 26px
	      line-height: 26px
	      border-left: 2px solid #d9dde1
	      font-size: 12px
	      color: rgb(147, 153, 159)
	      background: #f3f5f7
	    .food-item
	      display: flex
	      margin: 18px
	      padding-bottom: 18px
	      border-1px(rgba(7, 17, 27, 0.1))
	      &:last-child
	        border-none()
	        margin-bottom: 0
	      .icon
	        flex: 0 0 57px
	        margin-right: 10px
	      .content
	        flex: 1
	        .name
	          margin: 2px 0 8px 0
	          height: 14px
	          line-height: 14px
	          font-size: 14px
	          color: rgb(7, 17, 27)
	        .desc, .extra
	          line-height: 10px
	          font-size: 10px
	          color: rgb(147, 153, 159)
	        .desc
	          line-height: 12px
	          margin-bottom: 8px
	        .extra
	          .count
	            margin-right: 12px
	        .price
	          font-weight: 700
	          line-height: 24px
	          .now
	            margin-right: 8px
	            font-size: 14px
	            color: rgb(240, 20, 20)
	          .old
	            text-decoration: line-through
	            font-size: 10px
	            color: rgb(147, 153, 159)
	        .cartcontrol-wrapper
	          position: absolute
	          right: 0
	          bottom: 12px
</style>