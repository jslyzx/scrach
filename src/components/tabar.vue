<template>
	<div class="tabar" v-show="isShowTabbar">
		<div class="tab">
			<div class="tab-item">
				<router-link to="/home">
					
				</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/sport">
					
				</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/life">
					
				</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/user">
					
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	computed: {
		isShowTabbar () {
			let routeLength = this.$route.path.split('/').length
			return routeLength > 2 ? false : true
		}
	}
}
</script>

<style scoped lang="scss">
@import '../assets/css/function';

.tabar{
	.tab{
		position: fixed;
		bottom: 0;
		left: 0;
	    display: flex;
	    width: 100%;
	    height: px2rem(98px);
	    line-height: px2rem(98px);
	    background: #fff;
		box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
	    &:after{
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			border-top: 1px solid rgba(7, 17, 27, 0.1);
			content: '';
		}
	    .tab-item{
	    	flex: 1;
	    	text-align: center;
			a{
				display: block;
				height: 100%;
				background-repeat: no-repeat;
				background-size: auto px2rem(73px);
		    	background-position: center center;
			}
			&:nth-child(1) a{
		    	background-image: url(../assets/images/tab-home.png);
		    	&.active{
					background-image: url(../assets/images/tab-home-active.png);
		    	}
		    }
		    &:nth-child(2) a{
		    	background-image: url(../assets/images/tab-zf.png);
		    	&.active{
					background-image: url(../assets/images/tab-zf-active.png);
		    	}
		    }
		    &:nth-child(3) a{
		    	background-image: url(../assets/images/tab-sh.png);
		    	//&.active{
					//background-image: url(../assets/images/tab-sh-active.png);
		    	//} 
		    }
		    &:nth-child(4) a{
		    	background-image: url(../assets/images/tab-my.png);
		    	&.active{
					background-image: url(../assets/images/tab-my-active.png);
		    	}
		    }
	    }

	}
}
</style>