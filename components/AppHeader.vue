<template>
    <header class="header">
        <div class="header__wrapper">
            <div class="header__content">
                <div class="container header__container">
                    <Logo class="header__logo" />
                    <nav class="header__nav">
                        <ul class="header__nav-list">
                            <li class="header__nav-list_item">
                                <a href="#">hello@proekt.agency</a>
                            </li>
                            <li class="header__nav-list_item">
                                <a href="#">whatsapp</a>
                            </li>
                            <li class="header__nav-list_item">
                                <a href="#">telegram</a>
                            </li>
                        </ul>
                    </nav>
                    <a href="#" class="header__lang-link">EN</a>
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
</script>

<style lang="scss">
.header {
    position: absolute;
    top: 0;
    left: 0;
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
    border-radius: 50%;
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
@media (max-width:1000px) {
    .header__nav {
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