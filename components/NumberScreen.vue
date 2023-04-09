<template>
    <div class="number-screen">
        <div class="number-screen__content">
            <div class="container number-screen__container">
                <div class="number-screen__number-wrapper">
                    <p class="number-screen__number">
                        <span class="number-screen__number_letter" v-for="(letter, idx) in numberLetters" :key="idx">
                            {{ letter }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
let numberLetters = props.num.split('')
const props = defineProps({
    num: {
        type:String,
        required:true,
    }
})
</script>

<style lang="scss">
.number-screen {
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    z-index: 10;
}
.number-screen__content {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 172px);
}
.number-screen__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 220px;
}
.number-screen__number-wrapper {
    margin-top: auto;
    overflow: hidden;
}
.number-screen__number {
    font-family: "MontserratAlternates";
    font-weight: 300;
    font-size: 138px;
    line-height: 1;
    color: #BDBDBD;
}
.number-screen__number_letter {
    display: inline-block;
}
@media (max-height:600px) {
    .number-screen__container {
        padding-bottom: 40vw;
    }
}
@media (max-width:1600px) {
    .number-screen__number {
        font-size: 100px;
    }
}
@media (max-width:1400px) {
    .number-screen__number {
        font-size: 90px;
    }
}
</style>    