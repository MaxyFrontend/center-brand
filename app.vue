<template>
    <div :class="['app', { 'is-mobile': isMobileOrTablet, 'content-visible': contentVisible } ]">
        <AppHeader :logoDescription="languageData.logoDescription" :langLink="languageData.langLink" />
        <main :class="['main']">
            <BackgroundScreen class="first-appear-bg-screen" />
            <StepsNavigation :stepsNavigation="languageData.stepsNavigation" @btnClick="(idx)=>navBtnClick(idx)" />
            <Steps :stepsTitles="languageData.stepsTitles" />
            <Info :orderBtn="languageData.orderBtn" :infoTable="languageData.infoTable" :currentTableIdx="currentInfoTableIdx" />
        </main>
        <SendOrderMenu :langLink="languageData.langLink" :orderMenuData="languageData.orderMenuData" :logoDescription="languageData.logoDescription" />
        <MobileMenu :orderBtn="languageData.orderBtn" :langLink="languageData.langLink" :logoDescription="languageData.logoDescription" />
        <ThanksScreen :title="languageData.thanksScreen.title" :subTitle="languageData.thanksScreen.subTitle" />
        <LoadingScreen v-if="numbersVisible" :numFrom="0" :numTo="99" :step="5" />
        <NuxtPage @sendData="getLang" />
    </div>
</template>
<script setup>
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useStepsNavigationStore } from '@/store/StepsNavigationStore'
import { useLanguageDataStore } from '@/store/LanguageDataStore'
const LanguageDataStore = useLanguageDataStore()
let contentVisible = ref(false)
const lang = ref('ru')
let languageData = computed(() => {
    if (lang.value === 'ru') {
        return LanguageDataStore.ru
    }
    else if (lang.value === 'en') {
        return LanguageDataStore.en
    }
})
const getLang = (data) => {
    lang.value = data.lang
}
const isMobileOrTablet = ref(false)
gsap.registerPlugin(Observer);
const StepsNaigationStore = useStepsNavigationStore()
let isAnimating = true;
let prevSection
let currentSectionIdx = 0;
let stepScreensAmount
let animInterval = ref(null)
let currentInfoTableIdx = ref(0)
function changeScreen(i) {
    let stepsScreens = gsap.utils.toArray('.steps-screen')
    if (i < stepsScreens.length) {
        clearInterval(animInterval.value)
        isAnimating = true;
        StepsNaigationStore.chooseBtn(i)
        let sectionTl = gsap.timeline()
        let titleLine = stepsScreens[i].querySelectorAll('.steps-screen__title_line_inner')
        let stepsNumber = stepsScreens[i].querySelector('.steps-screen__number')
        let stepsNumberLetters = stepsNumber.querySelectorAll('.steps-screen__number_letter')
        if (prevSection) {
            let prevTitleLine = prevSection.querySelectorAll('.steps-screen__title_line_inner')
            let prevNum = prevSection.querySelector('.steps-screen__number')
            let prevNumberLetters = prevNum.querySelectorAll('.steps-screen__number_letter')
            sectionTl.to(stepsScreens[i], { top: 0, zIndex: 100, duration: 0, autoAlpha: 1 })
                .fromTo(prevTitleLine, { y: 0 }, { y: () => -prevTitleLine[0].offsetHeight - 10, stagger: .02, duration: .5, ease: 'Power2.easeInOut' })
                .fromTo(prevNumberLetters, { y: 0 }, { y: () => -prevNumberLetters[0].offsetHeight - 10, duration: .5, stagger: .1, ease: 'Power2.easeInOut' }, '-=.5')
                .fromTo(titleLine, { y: () => titleLine[0].offsetHeight }, { y: 0, duration: .6, stagger: .05, ease: 'Power2.easeInOut' }, '-=.6')
                .fromTo(stepsNumberLetters, { y: () => stepsNumberLetters[0].offsetHeight }, { y: 0, duration: .5, stagger: .1, ease: 'Power2.easeInOut' }, '-=.65')
                .then(() => {
                    stepsScreens.forEach(screen => {
                        if (screen !== stepsScreens[i]) {
                            gsap.to(screen, { autoAlpha: 0, duration: 0 })
                        }
                    })
                    isAnimating = false;
                })
        }
        else {
            sectionTl.to(stepsScreens[i], { duration: 0, autoAlpha: 1 })
                .fromTo(titleLine, { y: () => titleLine[0].offsetHeight }, { y: 0, duration: .3 })
                .fromTo(stepsNumberLetters, { y: () => stepsNumberLetters[0].offsetHeight }, { y: 0, stagger: .1, duration: .3 }, '-=.3')
                .then(() => {
                    stepsScreens.forEach(screen => {
                        if (screen !== stepsScreens[i]) {
                            gsap.to(screen, { autoAlpha: 0, duration: 0 })
                        }
                    })
                    isAnimating = false
                })
        }
        prevSection = stepsScreens[i]
        currentSectionIdx = i
        currentInfoTableIdx.value = i
        animInterval.value = setInterval(() => {
            if (!isAnimating) {
                if (currentSectionIdx === stepScreensAmount - 1) {
                    currentSectionIdx = 0
                    changeScreen(currentSectionIdx)
                }
                else {
                    changeScreen(currentSectionIdx + 1)
                }
            }
        }, 5000)
    }
    else {
        isAnimating = false
    }
}
const navBtnClick = (idx) => {
    if (!isAnimating && idx !== currentSectionIdx) {
        changeScreen(idx)
    }
}
const numbersVisible = ref(true)
onMounted(() => {
    const { $isMobile, $isTablet } = useNuxtApp()
    if ($isMobile() || $isTablet()) {
        isMobileOrTablet.value = true
    }
    setTimeout(() => {
        contentVisible.value = true
    }, 100)
    let header = document.querySelector('.header__content')
    let bgScreen = document.querySelector('.first-appear-bg-screen')
    let main = document.querySelector('.main')
    let steps = document.querySelector('.steps')
    let stepsScreens = document.querySelectorAll('.steps-screen')
    stepScreensAmount = stepsScreens.length
    let stepsNavigation = document.querySelector('.steps-navigation')
    let sendOrderBtn = document.querySelector('.send-order-btn')
    let stepsHeight = () => {
        let height = stepsScreens[0].offsetHeight
        stepsScreens.forEach(screen => {
            if (screen.offsetHeight > height) {
                height = screen.offsetHeight
            }
        })
        return height
    }
    gsap.set(main, { minHeight: main.scrollHeight, transition: 0 })
    gsap.set(bgScreen, { top: '100%' })
    gsap.set(header, { visibility: 'hidden', y: () => header.offsetHeight })
    gsap.set(stepsNavigation, { autoAlpha: 0 })
    gsap.set(steps, { minHeight: stepsHeight() })
    gsap.set(sendOrderBtn, { y: () => sendOrderBtn.offsetHeight + 5 })
    let numbersTl = gsap.timeline({ delay: .7 })
    let numbersWrapper = document.querySelector('.loading-screen__number-wrapper')
    let numberEl = numbersWrapper.querySelectorAll('.loading-screen__number')
    let numberChars = numbersWrapper.querySelectorAll('.loading-screen__number_char')
    gsap.set(numbersWrapper, { height: () => numberEl[0].offsetHeight })
    gsap.set(numberChars, { y: () => numberEl[0].offsetHeight })
    numberEl.forEach((el, idx) => {
        let chars = el.querySelectorAll('.loading-screen__number_char')
        if (idx === 0) {
            numbersTl.to(chars, { y: 0, duration: .15, stagger: .07, })
                .to(chars, { y: () => -numberEl[0].offsetHeight, delay: .3, duration: .15, })
        }
        if (idx > 0) {
            if (idx === numberEl.length - 1) {
                numbersTl.to(chars, { y: 0, duration: .1, stagger: .05, }, '-=.1')
                    .to(chars, { y: () => -numberEl[0].offsetHeight, delay: .3, duration: .3, })
                    .to(numbersWrapper, { y: -150, duration: 3, ease: 'Power2.ease' }, '0.5')
            }
            else {
                numbersTl.to(chars, { y: 0, duration: .1, stagger: .05, }, '-=.1')
                    .to(chars, { y: () => -numberEl[0].offsetHeight, duration: .1, }, '-=.05')
            }
        }

    })
    numbersTl
        .to(bgScreen, { top: '-150%', duration: .8, ease: 'inOut' })
        .to(header, { visibility: 'visible', y: 0, duration: .3, delay: .2 })
        .call(changeScreen, [0], '-=.3')
        .fromTo(stepsNavigation, { autoAlpha: 0 }, { autoAlpha: 1 }, '-=.3')
        .to(sendOrderBtn, { y: 0, duration: .3 }, '-=.5')
        .set('.app', { minHeight: '100%', height: 'auto', transition: 0 })
        .fromTo('.app', { background: '#FAFAFA' }, { background: '#ECECEC', overflow: 'visible', duration: .3 }, '-=1')
        .to('.info__table_item_border-top', { width: '100%', duration: .2 }, '-=.4')
        .to('.info__table_item_border-bottom', { width: '100%', duration: .2 }, '-=.4')
        .to('.info__table_item_border-right', { height: '100%', duration: .2 }, '-=.4')
        .to('.info__table_item_border-left', { height: '100%', duration: .2 }, '-=.4')
        .to('.info__table_item_text-inner', { y: 0, duration: .3 }, '-=.1')
        .call(() => { numbersVisible.value = false }, [], '-=1')
    let scrollTriggerObserver = Observer.create({
        target: '.main',
        type: "wheel, touch",
        lockAxis: true,
        onUp: () => {
            if (!isMobileOrTablet.value) {
                if (!isAnimating) {
                    if (currentSectionIdx === 0) {
                        changeScreen(stepScreensAmount - 1)
                    }
                    else {
                        changeScreen(currentSectionIdx - 1)
                    }
                }
            }
        },
        onDown: () => {
            if (!isMobileOrTablet.value) {
                if (!isAnimating) {
                    if (currentSectionIdx === stepScreensAmount - 1) {
                        changeScreen(0)
                    }
                    else {
                        changeScreen(currentSectionIdx + 1)
                    }
                }
            }
        },
    });
    window.addEventListener('resize', () => {
        gsap.set(steps, { minHeight: stepsHeight() })
    })
})
</script>
<style src="@/assets/scss/main.scss">

</style>
<style lang="scss">
.app {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    &.content-visible {
        opacity: 1;
        visibility: visible;
    }
}
</style>