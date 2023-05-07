<template>
    <div class="steps-screen">
        <div class="container steps-screen__container">
            <div class="steps-screen__content">
                <div class="steps-screen__number-wrapper">
                    <p class="steps-screen__number">
                        <span class="steps-screen__number_letter" v-for="(letter, idx) in numberLetters" :key="idx">
                            {{ letter }}
                        </span>
                    </p>
                </div>
                <div class="steps-screen__title-wrapper">
                    <h1 class="steps-screen__title">
                        <p class="steps-screen__title_line overflow--hidden" v-for="(line, idx) in title">
                            <span class="steps-screen__title_line_inner">{{ line }}</span>
                        </p>
                    </h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import gsap from 'gsap';
let numberLetters = props.number.split('')
const props = defineProps({
    title: {
        type: Array,
        required: false,
    },
    number: {
        type: String,
        required: false,
        default: '01'
    }
})
onMounted(() => {
    setTimeout(() => {
        let stepsScreens = document.querySelectorAll('.steps-screen')
        for (let i = 0; i < stepsScreens.length; i++) {
            let titleLine = stepsScreens[i].querySelectorAll('.steps-screen__title_line_inner')
            titleLine.forEach(line => {
                gsap.set(line, { y: () => line.clientHeight })
            })
            let stepsNumber = stepsScreens[i].querySelector('.steps-screen__number')
            let stepsNumberLetters = stepsScreens[i].querySelectorAll('.steps-screen__number_letter')
            gsap.set(stepsScreens[i], { autoAlpha: 0 })
            gsap.set(stepsNumberLetters, { y: () => stepsNumber.offsetHeight })
        }
    }, 100)
})
</script>

<style lang="scss">
.steps-screen {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    //height: 100%;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    padding-top: 86px;
}
.steps-screen__container {
    height: 100%;
}
.steps-screen__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.steps-screen__title-wrapper {
    overflow: hidden;
    margin-top: 47px;
}
.steps-screen__number-wrapper {
    overflow: hidden;
}
.steps-screen__number {
    font-family: "MontserratAlternates";
    font-style: normal;
    font-weight: 275;
    font-size: 138px;
    line-height: .8;
    color: #FCFCFC;
    pointer-events: none;
}
.steps-screen__number_letter {
    display: inline-block;
}
.steps-screen__title {
    width: 100%;
    max-width: 1270px;
    font-family: "AtypDisplay";
    font-style: normal;
    font-weight: 400;
    font-size: 52px;
    line-height: 1.2;
    color: #242424;
    pointer-events: none;
    & .steps-screen__title_line_inner {
        display: block;
    }
}
@media (max-width:1600px) {
    .steps-screen__title-wrapper {
        margin-top: 20px;
    }
    .steps-screen__title {
        font-size: 40px;
        line-height: 50px;
    }
    .steps-screen__number {
        font-size: 110px;
    }
}
@media (max-width:1400px) {
    .steps-screen__title-wrapper {
        margin-top: 10px;
    }
    .steps-screen__title {
        font-size: 36px;
        line-height: 46px;
    }
    .steps-screen__number {
        font-size: 100px;
    }
}
@media (max-width:1200px) {
    .steps-screen__title-wrapper {
        margin-top: 10px;
    }
    .steps-screen__title {
        font-size: 32px;
        line-height: 42px;
    }
    .steps-screen__number {
        font-size: 90px;
    }
}
@media (max-width:700px) {
    .steps-screen__title {
        font-size: 28px;
        line-height: 36px;
    }
}
@media (max-width:370px) {
    .steps-screen {
        padding-top: 50px;
    }
    .steps-screen__title {
        font-size: 22px;
        line-height: 28px;
    }
    .steps-screen__number {
        font-size: 80px;
    }
}
</style>