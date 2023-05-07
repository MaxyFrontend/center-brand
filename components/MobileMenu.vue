<template>
    <transition name="fade">
        <div class="mobile-menu" v-if="MobileMenuStore.menuOpened">
            <div class="mobile-menu__header">
                <div class="container mobile-menu__header_container">
                    <Logo :description="props.logoDescription" class="mobile-menu__logo" ImageColor="#fafafa" />
                    <div class="mobile-menu__controls">
                        <button class="mobile-menu__close-btn" @click="MobileMenuStore.close()">
                            <IconsCross color="#fafafa" />
                        </button>
                        <NuxtLink :to="props.langLink.path" class="mobile-menu__lang">{{ props.langLink.name }}</NuxtLink>
                    </div>
                </div>
            </div>
            <div class="mobile-menu__body">
                <div class="container mobile-menu__body_container">
                    <div class="mobile-menu__contacts">
                        <ul class="mobile-menu__contacts_group">
                            <li class="mobile-menu__contacts_item">
                                <a class="mobile-menu__contacts_item_link" href="#">telegram</a>
                            </li>
                            <li class="mobile-menu__contacts_item">
                                <a class="mobile-menu__contacts_item_link" href="#">whatsapp</a>
                            </li>
                        </ul>
                        <ul class="mobile-menu__contacts_group">
                            <li class="mobile-menu__contacts_item">
                                <a class="mobile-menu__contacts_item_link" href="tel:+74957406584">+7 495 740-65-84</a>
                            </li>
                            <li class="mobile-menu__contacts_item">
                                <p class="mobile-menu__contacts_item_paragraph">Москва, ул. Новодмитровская, д. 1</p>
                            </li>
                        </ul>
                        <ul class="mobile-menu__contacts_group">
                            <li class="mobile-menu__contacts_item">
                                <a class="mobile-menu__contacts_item_email-link" href="mailto:hello@proekt.agency">hello@proekt.agency</a>
                            </li>
                        </ul>
                    </div>
                    <SendOrderBtn :text="props.orderBtn.text" class="mobile-menu__order-btn" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { useMobileMenuStore } from "@/store/MobileMenuStore.js"
import DisableScroll from '@/composables/disable-scroll';
import EnableScroll from '@/composables/enable-scroll';
const MobileMenuStore = useMobileMenuStore()
MobileMenuStore.$subscribe(() => {
    if (MobileMenuStore.menuOpened) {
        DisableScroll()
    }
    else {
        EnableScroll()
    }
})
const props = defineProps({
    logoDescription: {
        type:String,
        required:true
    },
    langLink: {
        type: Object,
        required: true
    },
    orderBtn: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss">
.mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    padding: 20px 0 32px;
    overflow-y: auto;
    background: #282828;
    color: #fafafa;
    z-index: 500;
    &.fade-enter-active,
    &.fade-leave-active {
        transform: translate(0);
        opacity: 1;
        transition: transform, opacity, 0.3s ease;
        transition-delay: .1s;
    }

    &.fade-enter-from {
        opacity: 0;
        transform: translate(-30%);
    }
    &.fade-leave-to {
        opacity: 0;
        transform: translate(30%);
        transition: transform, opacity, 0.3s ease;
    }
}
.mobile-menu__header {}
.mobile-menu__header_container {
    display: flex;
    align-items: flex-start;
}
.mobile-menu__logo {
    margin-right: auto;
    margin-top: 20px;
    width: auto;
    & .logo__text {
        color: #808080;
    }
}
.mobile-menu__controls {
    width: 100%;
    max-width: 68px;
    margin-left: 30px;
}
.mobile-menu__lang {
    width: 100%;
    min-height: 68px;
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    margin-top: -2px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    border: 1px solid #606060;
    border-top: none;
    color: #FAFAFA;
}
.mobile-menu__close-btn {
    flex-basis: 100%;
    width: 100%;
    min-height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #606060;
}
.mobile-menu__body {
    flex-grow: 1;
    padding-top: 100px;
}
.mobile-menu__body_container {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.mobile-menu__contacts {
    margin-top: auto;
    margin-left: auto;
    width: 100%;
    max-width: 300px;
}
.mobile-menu__contacts_group {
    text-align: right;
    margin-bottom: 37px;
    &:last-child {
        margin-bottom: 0;
    }
}
.mobile-menu__contacts_item {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #fafafa;
    margin-bottom: 7px;
    &:last-child {
        margin-bottom: 0;
    }
    & a:hover {
        text-decoration: underline;
    }
}
.mobile-menu__contacts_item_link {
    display: block;
}
.mobile-menu__contacts_item_paragraph {
    color: #808080;
}
.mobile-menu__contacts_item_email-link {
    font-family: 'AtypDisplay';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 1;
    text-decoration: underline;
}
.mobile-menu__order-btn {
    margin-top: 77px;
    & .send-order-btn__text {
        color: #fafafa;
    }
}
@media (max-width:1000px) {
    .mobile-menu {
        display: flex;
        flex-direction: column;
    }
}
@media (max-width: 370px) {
    .mobile-menu__controls {
        max-width: 60px;
    }
    .mobile-menu__lang {
        font-size: 12px;
        line-height: 15px;
        margin-right: 26px;
        min-height: 60px;
        min-width: 60px;
    }
    .mobile-menu__close-btn {
        min-width: 60px;
        min-height: 60px;
    }
    .mobile-menu__contacts_group {
        margin-bottom: 30px;
    }
    .mobile-menu__contacts_item {
        font-size: 12px;
        line-height: 15px;
    }
    .mobile-menu__contacts_item_email-link {
        font-size: 24px;
    }
    .mobile-menu__order-btn {
        margin-top: 50px;
    }
}
</style>