<template>
    <transition name="fade"
        @enter="enter"
        @leave="leave">
        <div class="send-order-menu" v-if="SendOrderMenuStore.menuOpened">
            <div class="container send-order-menu__container">
                <div class="send-order-menu__header">
                    <a href="#" class="send-order-menu__lang overflow--hidden"><span class="send-order-menu__slide-bottom-anim">EN</span></a>
                    <button type="button" class="send-order-menu__close-btn" @click="SendOrderMenuStore.close()">
                        <IconsCross class="send-order-menu__close-btn_icon" />
                    </button>
                </div>
                <div class="send-order-menu__content">
                    <form action="#" class="send-order-menu__form" @submit.prevent="formSubmit">
                        <h3 class="send-order-menu__form_title overflow--hidden">
                            <span class="send-order-menu__slide-bottom-anim">Давайте начнём!</span>
                        </h3>
                        <p class="send-order-menu__form_sub-title overflow--hidden">
                            <span class="send-order-menu__slide-bottom-anim">
                                Опишите Вашу задачу, и мы свяжемся с вами для
                                обсуждения всех деталей
                            </span>
                        </p>
                        <ul class="send-order-menu__form_types send-order-menu__visibility-anim">
                            <li :class="['send-order-menu__form_types_item', { 'is-active': type.choosen }]" v-for="(type, idx) in types" :key="idx"
                                @click="types[idx].choosen = !types[idx].choosen">
                                <span class="send-order-menu__form_types_item_inner overflow--hidden">
                                    <span class="send-order-menu__slide-bottom-anim"> {{ type.text }}</span>
                                </span>
                            </li>
                        </ul>
                        <div class="send-order-menu__form_fields-wrapper">
                            <div class="send-order-menu__form_field">
                                <input type="text" :class="['send-order-menu__form_input send-order-menu__visibility-anim', { 'is-invalid': v$.name.$invalid && v$.name.$dirty }]" placeholder="Имя,  Компания" v-model="state.name">
                            </div>
                            <div class="send-order-menu__form_field">
                                <input type="text" :class="['send-order-menu__form_input send-order-menu__visibility-anim', { 'is-invalid': v$.email.$invalid && v$.email.$dirty }]" placeholder="E-mail" v-model="state.email">
                            </div>
                            <div class="send-order-menu__form_field full-width">
                                <input type="text" :class="['send-order-menu__form_input send-order-menu__visibility-anim', { 'is-invalid': v$.details.$invalid && v$.details.$dirty }]" placeholder="Детали проекта" v-model="state.details" />
                            </div>
                        </div>
                        <ul class="send-order-menu__budget send-order-menu__visibility-anim">
                            <li :class="['send-order-menu__budget_item', { 'is-choosen': item.choosen }]"
                                v-for="(item, idx) in budget" :key="idx" @click="budgetChoose(idx)">
                                <span class="send-order-menu__budget_item_inner overflow--hidden">
                                    <span class="send-order-menu__slide-bottom-anim"> {{ item.text }}</span>
                                </span>
                            </li>
                        </ul>
                        <div class="send-order-menu__form_controls">
                            <button type="submit" class="send-order-menu__form_btn">
                                <IconsCornerArrow color="#FAFAFA" class="send-order-menu__form_btn_icon" />
                                <div class="send-order-menu__form_btn_background"></div>
                            </button>
                            <p class="send-order-menu__form_accept">
                                Нажимая этот кружок, я
                                даю согласие на обработку
                                персональных данных
                            </p>
                        </div>
                    </form>
                </div>
                <div class="send-order-menu__footer">
                    <div class="send-order-menu__logo-wrapper overflow--hidden">
                        <Logo class="send-order-menu__logo send-order-menu__slide-bottom-anim" ImageColor="#fff" />
                    </div>
                    <div class="send-order-menu__contacts">
                        <div class="send-order-menu__contacts_group">
                            <a href="#" class="send-order-menu__contacts_link overflow--hidden"><span class="send-order-menu__slide-bottom-anim">telegram</span></a>
                            <a href="#" class="send-order-menu__contacts_link overflow--hidden"><span class="send-order-menu__slide-bottom-anim">whatsapp</span></a>
                        </div>
                        <div class="send-order-menu__contacts_group">
                            <a href="tel:+74957406584" class="send-order-menu__contacts_link overflow--hidden">
                                <span class="send-order-menu__slide-bottom-anim">+7 495 740-65-84</span>
                            </a>
                            <p class="send-order-menu__contacts_address overflow--hidden">
                                <span class="send-order-menu__slide-bottom-anim">Москва, ул. Новодмитровская, д. 1</span>
                            </p>
                        </div>
                        <a href="mailto:hello@proekt.agency" class="send-order-menu__contacts_email overflow--hidden">
                            <span class="send-order-menu__slide-bottom-anim">hello@proekt.agency</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <BackgroundScreen class="menu-bg-screen" />
</template>

<script setup>
import gsap from 'gsap';
import { required, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useSendOrderMenuStore } from '@/store/SendOrderMenuStore';
import { useThanksScreenStore } from '@/store/ThanksScreenStore.js';
const SendOrderMenuStore = useSendOrderMenuStore()
const ThanksScreenStore = useThanksScreenStore()
let tl = gsap.timeline()
const enter = (el) => {
    menuOpen(el)
}
const leave = (el) => {
    tl.reverse()
}
const menuOpen = (el) => {
    tl = gsap.timeline()
    const slideAnimItems = el.querySelectorAll('.send-order-menu__slide-bottom-anim')
    const closeMenuBtn = el.querySelector('.send-order-menu__close-btn')
    const visibilityAnimItems = el.querySelectorAll('.send-order-menu__visibility-anim')
    const formSubmitBtn = el.querySelector('.send-order-menu__form_btn')
    const formAccept = el.querySelector('.send-order-menu__form_accept')
    gsap.set(closeMenuBtn, { scale: 0.5, autoAlpha: 0 })
    slideAnimItems.forEach(animateItem => {
        gsap.set(animateItem, { y: () => animateItem.offsetHeight })
    });
    visibilityAnimItems.forEach(animateItem => {
        gsap.set(animateItem, { autoAlpha: 0 })
    });
    gsap.set(formSubmitBtn, { scale: 0, autoAlpha: 0 })
    gsap.set(formAccept, { autoAlpha: 0 })
    const backgroundScreen = document.querySelector('.menu-bg-screen')
    const sendOrderBtnCircle = document.querySelectorAll('.send-order-btn__icon-inner')
    const sendOrderBtnText = document.querySelectorAll('.send-order-btn__text_inner')
    tl.fromTo(sendOrderBtnCircle, { scale: 1, autoAlpha: 1 }, { scale: 0, autoAlpha: 0, ease: 'Power2.ease', duration: .4 })
        .fromTo(sendOrderBtnText, { y: 0 }, { y: 15, duration: .2 }, '-=.4')
        .fromTo(backgroundScreen, { top: '-150%' }, { top: '150%', duration: 1.2, ease: 'Power2.ease' }, '-=.2')
        .fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, '-=1')
        .to(slideAnimItems, { y: 0, duration: .3, }, '-=0.2')
        .to(visibilityAnimItems, { autoAlpha: 1, duration: .3 }, '-=0.2')
        .to(formSubmitBtn, { scale: 1, autoAlpha: 1, duration: .3 }, '-=0.4')
        .to(formAccept, { autoAlpha: 1, duration: .3 }, '-=0.4')
        .to(closeMenuBtn, { scale: 1, autoAlpha: 1, duration: .3 }, '-=0.4')
}
onMounted(() => {
    gsap.set('.menu-bg-screen', { top: '-150%' })
})
const types = ref([
    {
        text: 'Анализ',
        choosen: false
    },
    {
        text: 'Бренд',
        choosen: false
    },
    {
        text: 'Сайт',
        choosen: false
    },
    {
        text: 'Визуал',
        choosen: false
    },
    {
        text: 'Комплекс',
        choosen: false
    },
])
const budget = ref([
    {
        text: 'до 1 млн',
        choosen: false
    },
    {
        text: '1 - 2 млн',
        choosen: false
    },
    {
        text: 'более 2 млн',
        choosen: false
    }
])
const budgetChoose = (idx) => {
    budget.value.forEach(item => {
        item.choosen = false
    })
    budget.value[idx].choosen = true
}
const formSubmit = async (e) => {
    let formIsValid = await v$.value.$validate()
    if (!formIsValid) {
        return false
    }
    let currentForm = e.target
    ThanksScreenStore.open()
    setTimeout(() => {
        state.name = ''
        state.email = ''
        state.details = ''
        v$.value.$reset()
    }, 1000)
}
const state = reactive({
    name: '',
    email: '',
    details: '',
})
const rules = computed(() => {
    return {
        name: { required },
        email: { required, email },
        details: {},
    };
});
const v$ = useVuelidate(rules, state)
</script>

<style lang="scss">
.send-order-menu {
    font-family: 'Montserrat';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 65px 0;
    background: #282828;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1000;
}
.fade-leave-active {
    transition-delay: 1s;
}
.send-order-menu__container {}
.send-order-menu__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.send-order-menu__lang {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #606060;
}
.send-order-menu__close-btn {
    width: 76px;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 62px;
    border: 1px solid #606060;
    border-radius: 50%;
}
.send-order-menu__content {
    margin-top: 70px;
}
.send-order-menu__form {
    position: relative;
    width: 100%;
    max-width: 730px;
}
.send-order-menu__form_types,
.send-order-menu__budget {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 55px;
}
.send-order-menu__budget {
    margin-top: 35px;
}
.send-order-menu__form_types_item,
.send-order-menu__budget_item {
    flex: 0 1 auto;
    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 14px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FAFAFA;
    padding: 15px 24px;
    border: 1px solid #606060;
    border-radius: 48px;
    cursor: pointer;
    transition: 0.2s ease;
    &:last-child {
        margin-right: 0;
    }
    &.is-active {
        background: #343434;
    }
    &.is-choosen {
        background: #343434;
    }
}
.send-order-menu__form_types_item_inner,
.send-order-menu__budget_item_inner {
    display: inline-block;
}
.send-order-menu__form_title {
    font-family: 'AtypDisplay';
    font-weight: 400;
    font-size: 52px;
    line-height: 65px;
    color: #FAFAFA;
    margin-bottom: 11px;
}
.send-order-menu__form_sub-title {
    width: 100%;
    max-width: 365px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #808080;
}
.send-order-menu__form_fields-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    margin-top: 35px;
    gap: 14px;
}
.send-order-menu__form_field {
    flex: 1 1 45%;
    &.full-width {
        flex-basis: 100%;
    }
}
.send-order-menu__form_input {
    display: block;
    width: 100%;
    padding: 30px 34px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    color: #FAFAFA;
    border: 1px solid #606060;
    border-radius: 16px;
    transition: 0.2s ease;
    &::placeholder {
        color: inherit;
        display: block;
    }
    &.is-invalid {
        border-color: #ff4444;
        color: #ff4444;
    }
}
.send-order-menu__form_controls {
    position: absolute;
    right: -14px;
    bottom: 0;
    transform: translate(100%, -100%);
    width: 100%;
    max-width: 75px;
    z-index: 1000;
}
.send-order-menu__form_btn {
    position: relative;
    min-width: 76px;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #BCABF5 0%, #AABCF6 100%);
    border-radius: 50%;
    z-index: 100;
    &_background {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #BCABF5 0%, #AABCF6 100%);
        border-radius: 50%;
        z-index: -1;
    }
}
.send-order-menu__form_accept {
    position: absolute;
    bottom: -19px;
    left: 50%;
    width: 100%;
    min-width: 225px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #606060;
    text-align: left;
    margin-top: 19px;
    transform: translate(0, 100%);
}
.send-order-menu__footer {
    position: relative;
    display: flex;
    align-items: flex-end;
    margin-top: auto;
}
.send-order-menu__logo-wrapper {
    margin-bottom: -28px;
}
.send-order-menu__logo {
    align-self: flex-start;
    & .logo__image {
        margin-bottom: 0;
    }
    & .logo__text {
        color: #808080;
    }
}
.send-order-menu__contacts {
    width: 100%;
    max-width: 550px;
    margin-left: auto;
}
.send-order-menu__contacts_group {
    margin-bottom: 43px;
    text-align: right;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    &:last-child {
        margin-bottom: 0;
    }
}
.send-order-menu__contacts_link {
    color: #FAFAFA;
    display: block;
    margin-bottom: 7px;
    &:last-child {
        margin-bottom: 0;
    }
    &:hover {
        text-decoration: underline;
    }
}
.send-order-menu__contacts_address {
    color: #808080;
}
.send-order-menu__contacts_email {
    display: block;
    font-family: 'AtypDisplay';
    font-weight: 400;
    font-size: 52px;
    line-height: 65px;
    text-align: right;
    text-decoration: underline;
    color: #606060;
    transition: 0.2s ease;
    &:hover {
        color: #fafafa;
    }
}
.send-order-menu__slide-bottom-anim {
    display: block;
    &.send-order-menu__logo {
        display: flex;
        width: 100%;
    }
}
.send-order-menu__logo-wrapper {
    width: 100%;
}
@media (max-width:1800px) {
    .send-order-menu__form_title {
        font-size: 42px;
        line-height: 55px;
    }
    .send-order-menu__contacts_email {
        font-size: 42px;
        line-height: 55px;
    }
}
@media (max-width:1600px) {
    .send-order-menu__form {
        max-width: 700px;
    }
    .send-order-menu__form_title {
        font-size: 36px;
        line-height: 45px;
    }
    .send-order-menu__contacts_email {
        font-size: 35px;
        line-height: 45px;
    }
}
@media (max-width:1400px) {
    .send-order-menu__form_controls {
        bottom: 8px;
    }
    .send-order-menu__form_btn {
        min-width: 68px;
        height: 68px;
    }
    .send-order-menu__content {
        margin-top: 40px;
    }
    .send-order-menu__form {
        max-width: 650px;
    }
    .send-order-menu__contacts_group {
        margin-bottom: 35px;
    }
    .send-order-menu__contacts_email {
        font-size: 32px;
        line-height: 42px;
    }
    .send-order-menu__form_input {
        padding: 24px 30px;
    }
}
@media (max-width:1000px) {
    .send-order-menu__form_controls {
        position: static;
        transform: none;
        display: flex;
        align-items: center;
        width: 100%;
        max-width: none;
        margin-top: 35px;
        padding: 0;
    }
    .send-order-menu__form_btn {
        margin-top: 0;
    }
    .send-order-menu__form_accept {
        position: static;
        transform: none;
        max-width: 205px;
        margin: 0 0 0 26px;
    }
    .send-order-menu__form_input {
        padding: 26px 24px;
    }
}
@media (max-width:700px) {
    .send-order-menu__footer {
        padding: 0;
        margin-top: 110px;
    }
    .send-order-menu__logo-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        max-width: 160px;
        transform: translateY(-50%);
        margin: 0;
        z-index: 10;
    }
    .send-order-menu__logo {
        & .logo__text {
            width: 100%;
            margin: 10px 0 0 0;
        }
        & .logo__image {
            max-width: 120px;
        }
    }
    .send-order-menu__contacts_email {
        font-size: 28px;
        line-height: 35px;
    }
}
@media (max-width:550px) {
    .send-order-menu__form_field {
        flex-basis: 100%;
    }
}
@media (max-width:370px) {
    .send-order-menu__close-btn {
        width: 60px;
        height: 60px;
    }
    .send-order-menu__lang {
        font-size: 12px;
        line-height: 15px;
    }
    .send-order-menu__form_title {
        font-size: 28px;
        line-height: 40px;
    }
    .send-order-menu__form_sub-title {
        font-size: 12px;
        line-height: 16px;
    }
    .send-order-menu__form_types {
        gap: 10px;
    }
    .send-order-menu__form_types_item {
        padding: 12px 20px;
        font-size: 12px;
    }
    .send-order-menu__form_input {
        padding: 24px 22px;
        font-size: 12px;
    }
    .send-order-menu__form_btn {
        min-width: 60px;
        height: 60px;
    }
    .send-order-menu__form_accept {
        font-size: 12px;
        line-height: 16px;
        margin-left: 20px;
    }
    .send-order-menu__contacts_group {
        font-size: 12px;
        line-height: 15px;
    }
    .send-order-menu__contacts_email {
        font-size: 24px;
        line-height: 30px;
    }
}
@media (max-height:1020px) {
    .send-order-menu {
        padding: 50px 0;
    }
}
@media (max-height:970px) {
    .send-order-menu__content {
        margin-top: 40px;
    }
    .send-order-menu {
        padding: 30px 0;
    }
    .send-order-menu__form_fields-wrapper {
        margin-top: 30px;
    }
    .send-order-menu__contacts_group {
        margin-bottom: 30px;
    }
    .send-order-menu__form_types,
    .send-order-menu__budget {
        margin-top: 30px;
    }
}
@media (max-height:870px) and (min-width:550px) {
    .send-order-menu__form_controls {
        bottom: 8px;
    }
    .send-order-menu__close-btn {
        width: 68px;
        height: 68px;
        margin-left: 40px;
    }
    .send-order-menu__form_btn {
        min-width: 68px;
        height: 68px;
    }
    .send-order-menu__content {
        margin-top: 40px;
    }
    .send-order-menu {
        padding: 30px 0;
    }
    .send-order-menu__form_fields-wrapper {
        margin-top: 30px;
    }
    .send-order-menu__form_input {
        padding: 24px 30px;
    }
}
@media (max-height:800px) and (min-width:550px) {
    .send-order-menu__content {
        margin-top: 20px;
    }
    .send-order-menu__contacts_group {
        margin-bottom: 20px;
    }
    .send-order-menu__form_types,
    .send-order-menu__budget {
        margin-top: 20px;
    }
    .send-order-menu__form_controls {
        bottom: -5px;
    }
}
@media (max-width:1400px) and (max-height:750px) {
    .send-order-menu {
        padding: 20px 0;
    }
    .send-order-menu__content {
        margin-top: 20px;
    }
    .send-order-menu__contacts_group {
        margin-bottom: 20px;
    }
    .send-order-menu__form_types,
    .send-order-menu__budget {
        margin-top: 20px;
    }
}
</style>