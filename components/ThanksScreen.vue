<template>
    <transition name="appear" @enter="enter" @leave="leave">
        <section class="thanks-screen" v-if="ThanksScreenStore.screenVisible">
                <div class="thanks-screen__wrapper">
                    <div class="container thanks-screen__container">
                        <button class="thanks-screen__close-btn" @click="ThanksScreenStore.close()">
                            <IconsCross color="#9BCFF1" class="thanks-screen__close-btn_cross" />
                        </button>
                        <div class="thanks-screen__content">
                            <div class="container thanks-screen__content_container">
                                <h2 class="thanks-screen__title overflow--hidden">
                                    <p class="thanks-screen__title-inner">
                                        Спасибо за заявку!
                                    </p>
                                </h2>
                                <div class="thanks-screen__sub-title overflow--hidden">
                                    <p class="thanks-screen__sub-title-inner">Скоро мы свяжемся с Вами</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    </transition>
</template>

<script setup>
import { gsap } from 'gsap';
import { useSendOrderMenuStore } from '@/store/SendOrderMenuStore';
import { useThanksScreenStore } from '@/store/ThanksScreenStore.js';
const ThanksScreenStore = useThanksScreenStore()
const SendOrderMenuStore = useSendOrderMenuStore()
let tl;
const enter = (el) => {
    let formBtnBackground = document.querySelector('.send-order-menu__form_btn_background')
    let formBtnIcon = document.querySelector('.send-order-menu__form_btn_icon')
    let title = el.querySelector('.thanks-screen__title-inner')
    let subTitle = el.querySelector('.thanks-screen__sub-title-inner')
    let closeBtn = el.querySelector('.thanks-screen__close-btn')
    gsap.set('.send-order-menu', {overflow:'hidden'})
    gsap.set(title, {y: ()=> title.offsetHeight})
    gsap.set(subTitle, {y: ()=> subTitle.offsetHeight})
    gsap.set(closeBtn, {scale: 0})
    tl = gsap.timeline()
    tl.to(formBtnBackground, {scale:90, duration:.6, ease: 'Power1.easeIn'})
    .to(title, {y: 0, duration:.3, delay:.1}, '-=.3')
    .to(subTitle, {y: 0, duration:.3}, '-=.3')
    .to(closeBtn, {scale: 1, duration:.3}, '-=.3')
    .to(formBtnIcon, {autoAlpha:0, duration:.3}, '-=.5')
}
const leave = (el) => {
    let formBtnBackground = document.querySelector('.send-order-menu__form_btn_background')
    let formBtnIcon = document.querySelector('.send-order-menu__form_btn_icon')
    let title = el.querySelector('.thanks-screen__title-inner')
    let subTitle = el.querySelector('.thanks-screen__sub-title-inner')
    let closeBtn = el.querySelector('.thanks-screen__close-btn')
    tl = gsap.timeline()
    tl.to(title, {y: ()=> title.offsetHeight, duration:.3, delay:.1})
    .to(subTitle, {y: ()=> subTitle.offsetHeight, duration:.3}, '-=.3')
    .to(closeBtn, {scale:0, duration:.3,}, '-=.3')
    .to(formBtnBackground, {scale:0, duration:.8, ease: 'Power3.ease'}, '-=.3')
    .to(formBtnIcon, {autoAlpha:1, duration:.3}, '-=.3')
    .call(()=>{SendOrderMenuStore.close()}, {}, '-=.2')
}
</script>

<style lang="scss">
.thanks-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 65px 0;
    z-index: 1500;
    &.appear-leave-active {
        transition-delay: .5s;
    }
}
.thanks-screen__wrapper {
    padding: 65px 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.thanks-screen__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.thanks-screen__close-btn {
    min-width: 76px;
    height: 76px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
}
.thanks-screen__close-btn_cross {}
.thanks-screen__content {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &_container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
}
.thanks-screen__title {
    font-family: 'AtypDisplay';
    font-style: normal;
    font-weight: 400;
    font-size: 52px;
    line-height: 1.2;
    color: #F2F2F2;
    margin-bottom: 5px;
}
.thanks-screen__sub-title {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #FAFAFA;
}
@media (max-width:1800px) {
    .thanks-screen__title {
        font-size: 42px;
        line-height: 55px;
    }
}
@media (max-width:1600px) {
    .thanks-screen__title {
        font-size: 36px;
        line-height: 45px;
    }
}
@media (max-width:550px) {
    .thanks-screen__title {
        font-size: 32px;
    }
}
@media (max-width:370px) {
    .thanks-screen__title {
        font-size: 28px;
        line-height: 40px;
    }
    .thanks-screen__sub-title {
        font-size: 12px;
        line-height: 15px;
    }
}
</style>