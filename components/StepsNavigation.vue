<template>
  <section class="steps-navigation">
    <div class="container steps-navigation__container">
      <div class="steps-navigation__list">
        <button
          :class="['steps-navigation__list_item', { 'current': StepsNaigationStore.navigation[idx].current }]"
          v-for="(item, idx) of navigation"
          :key="idx"
          @click="$emit('btnClick', idx)">
          {{ item.text }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStepsNavigationStore } from "@/store/StepsNavigationStore";
let StepsNaigationStore = useStepsNavigationStore();
const navigation = computed(()=>{
  return props.stepsNavigation
});
defineEmits(["btnClick"]);
const props = defineProps({
  stepsNavigation:{
    type:Array,
    requred:true
  }
})
</script>

<style lang="scss">
.steps-navigation {
  position: relative;
  width: 100%;
}
.steps-navigation__list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: visible;
  gap:14px;
}
.steps-navigation__list_item {
  width: auto;
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
  padding: 16px 24px;
  background: #DBDBDB;
  border-radius: 48px;
  transition: 0.2s ease;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
  &:hover:not(.is-mobile &) {
    background: #343434;
    color: #fafafa;
  }
  &.current {
    background: #343434;
    color: #fafafa;
    border-radius: 1px;
  }
}
.steps-navigation__list_item_btn {
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
  .steps-navigation__list_item {
    // max-width: 150px;
  }
  .steps-navigation__list_item {
    // padding: 26px;
  }
}
@media (max-width: 1200px) {}
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
  .steps-navigation__list_item {
    padding: 14px 20px;
    font-size: 12px;
  }
}
</style>
