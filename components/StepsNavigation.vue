<template>
  <div class="steps-navigation">
    <swiper
      :class="['steps-navigation__nav']"
      :modules="modules"
      :speed="500"
      :slidesPerView="'auto'"
      :spaceBetween="8"
      :allow-touch-move="true"
      :short-swipes="true"
      :pagination="{
        el:'.steps-navigation__slider-pagination',
        type:'progressbar'
      }"
      :breakpoints="{
        1000: {
          allowTouchMove:false
        },
        500: {
          spaceBetween: 12
        }
      }">
      <swiper-slide
        :class="['steps-navigation__nav_item', { current: item.current }]"
        v-for="(item, idx) of navigation"
        :key="idx"
        @click="$emit('btnClick', idx)">
        {{ item.text }}
      </swiper-slide>
      <swiper-slide class="steps-navigation__send-order-btn-slide">
        <SendOrderBtn class="steps-navigation__send-order-btn-wrapper" />
      </swiper-slide>
    </swiper>
    <div class="steps-navigation__slider-pagination swiper-pagination">

    </div>
  </div>
</template>

<script setup>
import { useStepsNavigationStore } from "@/store/StepsNavigationStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import { A11y, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination"
const modules = [A11y, Pagination];
let StepsNaigationStore = useStepsNavigationStore();
const navigation = StepsNaigationStore.navigation;
defineEmits(["btnClick"]);
</script>

<style lang="scss">
.steps-navigation {
  position: relative;
  width: 100%;
}
.steps-navigation__nav {
  width: 100%;
  overflow: visible;
}
.steps-navigation__nav_item {
  width: 100vw;
  max-width: 162px;
  touch-action: pan-y;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  color: #242424;
  padding: 30px;
  border: 1px solid #cacaca;
  border-radius: 48px;
  background: transparent;
  transition: 0.2s ease;
  cursor: pointer;
  &.current {
    background: #343434;
    color: #fafafa;
  }
}
.steps-navigation__nav_item_btn {
  width: 100%;
}
.steps-navigation__send-order-btn-slide {
  max-width: fit-content;
  margin-left: auto;
  margin-right: 0;
}
.steps-navigation .steps-navigation__slider-pagination {
  background: transparent;
  top: auto;
  left: -20px;
  bottom: -30px;
  width: 100vw;
  height: 2px;
  display: none;
  & .swiper-pagination-progressbar-fill {
    background: #343434;
  }
}
@media (max-width: 1400px) {
  .steps-navigation__nav_item {
    max-width: 150px;
  }
  .steps-navigation__nav_item {
    padding: 26px;
  }
}
@media (max-width: 1200px) {
  .steps-navigation__nav_item {
    width: 50vw;
    max-width: 140px;
  }
}
@media (max-width: 1000px) {
  .steps-navigation {
    width: 100%;
  }
  .steps-navigation__send-order-btn-slide {
    margin-left: 55px;
  }
  .steps-navigation .steps-navigation__slider-pagination {
    display: block;
  }
}
@media (max-width: 370px) {
  .steps-navigation__nav_item {
    padding: 22px;
    max-width: 120px;
    font-size: 12px;
  }
}
</style>
