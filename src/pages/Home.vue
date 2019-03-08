<template>
  <div class="home">
    <div class="banner">
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item"><img src="../assets/images/a4.jpg" alt="..."></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: 5000,
        loop: true
      }
    }
  },
  mounted() {

  },
  methods: {

  }
}

</script>
<style scoped lang="scss">
@import '../assets/css/function';

.banner {
  .swiper-box {
    width: 100%;
    height: px2rem(380px);
    margin: 0 auto;
    .swiper-item {
      text-align: center;
      font-size: 18px;
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
    .swiper-pagination {
      bottom: 5px;
      .swiper-pagination-bullet-active {
        background: #76d49b;
      }
    }
  }
}

</style>
