<template>
    <header class="header">
        <div class="header__wrapper">
            <div class="header__content">
                <div class="container header__container">
                    <Logo :description="props.logoDescription" class="header__logo" />
                    <nav class="header__nav">
                        <ul class="header__nav-list">
                            <li class="header__nav-list_item">
                                <a href="mailto:hello@bignames.ru">hello@bignames.ru</a>
                            </li>
                            <li class="header__nav-list_item">
                                <a href="#">whatsapp</a>
                            </li>
                            <li class="header__nav-list_item">
                                <a href="#">telegram</a>
                            </li>
                        </ul>
                    </nav>
                    <NuxtLink :to="props.langLink.path" class="header__lang-link"> {{ props.langLink.name }} </NuxtLink>
                    <button :class="['menu-btn header__menu-btn', { 'menu-opened': MobileMenuStore.menuOpened }]" @click="MobileMenuStore.open()">
                        <div class="menu-btn__line"></div>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useMobileMenuStore } from "@/store/MobileMenuStore.js"
const MobileMenuStore = useMobileMenuStore()
const props = defineProps({
    langLink:{
        type:Object,
        required:true
    },
    logoDescription: {
        type:String,
        required:true
    }
})
</script>

<style lang="scss">
.header {
    position: relative;
    width: 100%;
    z-index: 100;
    padding: 56px 0;
}
.header__wrapper {
    overflow: hidden;
}
.header__content {}
.header__container {
    display: flex;
    align-items: center;
}
.header__logo {
    margin-top: 20px;
}
.header__nav {
    display: flex;
    align-items: center;
    margin-left: auto;
}
.header__nav-list {
    display: flex;
    align-items: center;
}
.header__nav-list_item {
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #242424;
    margin-right: 67px;
    &:hover {
        text-decoration: underline;
    }
    &:last-child {
        margin-right: 0;
    }
}
.header__lang-link {
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #242424;
    text-transform: uppercase;
    margin-left: 63px;
    &:hover {
        text-decoration: underline;
    }
}
.menu-btn {
    position: relative;
    min-width: 68px;
    height: 68px;
    padding: 26px;
    display: none;
    overflow: hidden;
    border: 1px solid #CACACA;
    &::before,
    &::after {
        content: "";
        width: 12px;
        height: 2px;
        background: #343434;
        transition: 0.3s ease;
    }
    &::before {
        transition-delay: .28s;
        margin-bottom: 4px;
    }
    &::after {
        transition-delay: 0.2s;
    }
    &.menu-opened::before,
    &.menu-opened::after {
        width: 0;
        transition-delay: .0s;
    }
    &.menu-opened::after {
        transition-delay: .08s;
    }
}
@media (max-width:1600px) {
    .header {
        padding: 37px 0;
    }
}
@media (max-width:1400px) {
    .header {
        padding: 20px 0 40px;
    }
    .header__nav-list_item {
        margin-right: 50px;
    }
    .header__lang-link {
        margin-left: 50px;
    }
}
@media (max-width:1200px) {
    .header__nav-list_item {
        margin-right: 35px;
    }
    .header__lang-link {
        margin-left: 35px;
    }
}
@media (max-width:1000px) {
    .header__container {
        align-items: flex-start;
    }
    .header__logo {
        flex-direction: column;
    }
    .header__nav {
        display: none;
    }
    .header__lang-link {
        display: none;
    }
    .menu-btn {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        margin-left: 40px;
    }
    .header__lang-link {
        margin-left: auto;
    }
}
@media (max-width: 370px) {
    .header__logo {
        & .logo__image {
            max-width: 170px;
        }
    }
    .header__lang-link {
        font-size: 12px;
        line-height: 15px;
    }
    .menu-btn {
        min-width: 60px;
        height: 60px;
        padding: 23px;
        margin-left: 25px;
    }
}
</style>