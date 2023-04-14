<template>
    <div :class="['app', { 'visible': sectionVisible }, { 'is-mobile': isMobileOrTablet }]">
        <div :class="['main']">
            <AppHeader />
            <LoadingScreen v-if="numbersVisible" :numFrom="0" :numTo="99" :step="5" />
            <BackgroundScreen class="first-appear-bg-screen" />
            <Steps />
            <ControlPanel @btnClick="(idx) => navBtnClick(idx)" />
        </div>
        <SendOrderMenu />
        <MobileMenu />
        <ThanksScreen />
    </div>
</template>

<script setup>
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useStepsNavigationStore } from '@/store/StepsNavigationStore'
let sectionVisible = ref(false)
gsap.registerPlugin(Observer);
const StepsNaigationStore = useStepsNavigationStore()
let isAnimating = true;
let prevSection
let currentSectionIdx = 0;
function changeScreen(i) {
    let stepsScreens = gsap.utils.toArray('.steps-screen')
    if (i < stepsScreens.length) {
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
const isMobileOrTablet = ref(false)
const numbersVisible = ref(true)
onMounted(() => {
    const { $isMobile, $isTablet } = useNuxtApp()
    if ($isMobile() || $isTablet()) {
        isMobileOrTablet.value = true
    }
    let header = document.querySelector('.header__content')
    let bgScreen = document.querySelector('.first-appear-bg-screen')
    let stepsNavigation = document.querySelector('.steps-navigation')
    let sendOrderBtn = document.querySelector('.send-order-btn')
    gsap.set(bgScreen, { top: '100%' })
    gsap.set(header, { visibility: 'hidden', y: () => header.offsetHeight })
    gsap.set(stepsNavigation, { autoAlpha: 0 })
    gsap.set(sendOrderBtn, { y: () => sendOrderBtn.offsetHeight })
    let numbersTl = gsap.timeline({ delay: .7 })
    let numbersWrapper = document.querySelector('.loading-screen__number-wrapper')
    let numberEl = numbersWrapper.querySelectorAll('.loading-screen__number')
    let numberChars = numbersWrapper.querySelectorAll('.loading-screen__number_char')
    gsap.set(numbersWrapper, { height: () => numberEl[0].offsetHeight })
    gsap.set(numberChars, { y: () => numberEl[0].offsetHeight })
    numberEl.forEach((el, idx) => {
        let chars = el.querySelectorAll('.loading-screen__number_char')
        if (idx === 0) {
            numbersTl.to(chars, { y: 0, duration: .15, stagger:.07, })
                .to(chars, { y: () => -numberEl[0].offsetHeight, delay:.3, duration: .15, })
        }
        if (idx > 0) {
            if(idx === numberEl.length-1) {
                numbersTl.to(chars, { y: 0, duration: .125, stagger:.05, }, '-=.125')
                .to(chars, { y: () => -numberEl[0].offsetHeight, delay:.3, duration: .3, })
                .to(numbersWrapper, {y:-150, duration:3, ease: 'Power2.ease'}, '0.5')
            }
            else {
                numbersTl.to(chars, { y: 0, duration: .125, stagger:.05, }, '-=.125')
                    .to(chars, { y: () => -numberEl[0].offsetHeight, duration: .125,}, '-=.05')
            }
        }

    })
    numbersTl
        .to(bgScreen, { top: '-150%', duration: .8, delay: .2, ease: 'inOut' })
        .to(header, { visibility: 'visible', y: 0, duration: .3, delay: .2 })
        .call(changeScreen, [0], '-=.3')
        .fromTo(stepsNavigation, { autoAlpha: 0 }, { autoAlpha: 1 }, '-=.3')
        .to(sendOrderBtn, { y: 0, duration: .3 }, '-=.5')
        .fromTo('.main', { background: '#FAFAFA' }, { background: '#ECECEC', overflow: 'visible', duration: .3 }, '-=1')
        .call(() => { numbersVisible.value = false }, [], '-=1')
    let scrollTriggerObserver = Observer.create({
        target: '.main',
        type: "wheel, touch",
        lockAxis: true,
        onUp: () => {
            if (!isMobileOrTablet.value) {
                if (currentSectionIdx > 0 && !isAnimating) {
                    changeScreen(currentSectionIdx - 1)
                }
            }
        },
        onDown: () => {
            if (!isMobileOrTablet.value) {
                if (!isAnimating) {
                    changeScreen(currentSectionIdx + 1)
                }
            }
        },
    });
    setTimeout(() => {
        sectionVisible.value = true
    }, 100)
})
</script>

<style lang="scss">
.app {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    &.visible {
        opacity: 1;
        visibility: visible;
    }
}
.main {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 570px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 10;
    .is-mobile & {
        height: fill-available;
    }
}
@media (max-width:1200px) {
    .main {
        min-height: 500px;
    }
}
</style>