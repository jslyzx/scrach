<template>
	<div class="home">
		<!-- 下一期做 -->
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import nav from '@/components/nav'
// import travelList from '@/components/travelList'

import { mapGetters } from 'vuex'

export default {
	
	components: {
		swiper,
		swiperSlide,
		'v-nav': nav,
		// travelList
	},
	data() {
		return {
			swiperOption: {
				pagination: '.swiper-pagination',
				slidesPerView: 1,
				autoplay: 5000,
				paginationClickable: true,
				spaceBetween: 30,
				loop: true
			}
		}
	},
	mounted(){
		
    },
	methods: {
		
	}
}
</script>

<style lang="css">
	@import '../../static/css/swiper.min.css';
</style>
<style scoped lang="scss">
@import '../assets/css/function';

.banner {
	.swiper-box {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		.swiper-item {
			height: px2rem(380px);
			text-align: center;
			font-size: 18px ;
			background: #fff;
			display: flex;
			-webkit-box-pack: center;
			-ms-flex-pack: center;
			justify-content: center;
			align-items: center;
			img {
				width: 100%;
			}
		}
	}
}


</style>