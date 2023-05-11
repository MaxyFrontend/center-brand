<template>
    <div class="loading-screen">
        <div class="loading-screen__content">
            <div class="container loading-screen__container">
                <div class="loading-screen__number-wrapper">
                    <p :class="['loading-screen__number', { 'loading-screen__number-first': idx === 0 }, { 'loading-screen__number-last': idx === numArr.length - 1 }]" v-for="(number, idx) in numArr" :key="idx">
                        <span class="loading-screen__number_char" v-for="(char, index) in number" :key="index">
                            {{ char }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const numArr = ref([

])
for (let i = 0; i < props.numTo; i += props.step) {
    let numObj = []
    let num = i.toString()
    if (num.length <= 2 && num <= 9) {
        num = '0' + num
    }
    let numberChars = num.split('')
    numberChars.forEach(char => {
        numObj.push(char)
    })
    numArr.value.push(numObj)
    if (i + props.step >= props.numTo) {
        let numObj = []
        let num = props.numTo.toString()
        if (num.length <= 2 && num <= 9) {
            num = '0' + num
        }
        let numberChars = num.split('')
        numberChars.forEach(char => {
            numObj.push(char)
        })
        numArr.value.push(numObj)
    }
}
const props = defineProps({
    numFrom: {
        type: Number,
        required: true,
    },
    numTo: {
        type: Number,
        required: false,
        default: 99
    },
    step: {
        type: Number,
        required: false,
        default: 3
    }
})
</script>

<style lang="scss">
.loading-screen {
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    z-index: 500;
}
.loading-screen__content {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 172px);
}
.loading-screen__container {
    &.container {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-bottom: 30vh;
    }
}
.loading-screen__number-wrapper {
    position: relative;
    margin-top: auto;
    overflow: hidden;
}
.loading-screen__number {
    position: absolute;
    left: 0;
    top: 0;
    font-family: "MontserratAlternates";
    font-weight: 300;
    font-size: 138px;
    line-height: 1;
    color: #BDBDBD;
}
.loading-screen__number_char {
    display: inline-block;
}
@media (max-width:1600px) {
    .loading-screen__number {
        font-size: 100px;
    }
}
@media (max-width:1400px) {
    .loading-screen__number {
        font-size: 90px;
    }
}
</style>    