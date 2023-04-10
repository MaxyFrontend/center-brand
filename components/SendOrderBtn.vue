<template>
    <div :class="['send-order-btn-wrapper', props.class]">
        <button class="send-order-btn" @click="SendOrderMenuStore.open()">
            <span class="send-order-btn__text overflow--hidden">
                <span class="send-order-btn__text_inner">Отправить ТЗ</span>
            </span>
            <div class="send-order-btn__icon-inner">
                <IconsCornerArrow class="send-order-btn__icon" />
            </div>
        </button>
    </div>
</template>

<script setup>
import { useSendOrderMenuStore } from '@/store/SendOrderMenuStore';
const SendOrderMenuStore = useSendOrderMenuStore()
const props = defineProps({
    class: {
        type:String,
        required:false,
    }
})
</script>

<style lang="scss">
.send-order-btn-wrapper {
    margin: auto 0 0 auto;
    z-index: 1000;
    overflow: hidden;
}
.send-order-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;
}
.send-order-btn__text {
    font-family: 'Montserrat';
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    color: #242424;
    display: inline-block;
    margin-right: 30px;
    & .send-order-btn__text_inner {
        display: inline-block;
    }
}
.send-order-btn__icon-inner {
    width: 76px;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(131.47deg, #FBD686 -88%, #E090DC 10.48%, #B5B7F5 109.79%);
    border-radius: 50%;
}
.send-order-btn__icon {}
@media (max-width:1200px) {
    .send-order-btn__icon-inner {
        width: 65px;
        height: 65px;
    }
}
@media (max-width: 370px) {
    .send-order-btn__text {
        font-size: 12px;
        margin-right: 25px;
    }
    .send-order-btn__icon-inner {
        width: 60px;
        height: 60px;
    }
}
</style>