<template>
    <div class="info">
        <div class="container info__container">
            <div class="info__table">
                <div class="info__table_item" v-for="(item,id) in currentTable" :key="id">
                    <p class="info__table_item_text overflow--hidden">
                        <span :class="['info__table_item_text-inner', {'slide-up': textSlideUp, 'slide-from-down': textSlideUpFromDown}]">
                            {{ item.text }}
                        </span>
                    </p>
                    <div class="info__table_item_border info__table_item_border-top"></div>
                    <div class="info__table_item_border info__table_item_border-right"></div>
                    <div class="info__table_item_border info__table_item_border-bottom"></div>
                    <div class="info__table_item_border info__table_item_border-left"></div>
                </div>
            </div>
            <SendOrderBtn class="steps-navigation__send-order-btn-wrapper" />
        </div>
    </div>
</template>

<script setup>
import gsap from 'gsap';
const infoTable = ref([
    [
        {
            text: ' 3-4 недели'
        },
        {
            text: 'от 20 000 р.'
        }
    ],
    [
        {
            text: ' 3-5 недели'
        },
        {
            text: 'от 200 000 р.'
        }
    ],
    [
        {
            text: ' 4-8 недели'
        },
        {
            text: 'от 400 000 р.'
        }
    ],
    [
        {
            text: ' 4-9 недели'
        },
        {
            text: 'от 245 000 р.'
        }
    ],
    [
        {
            text: ' 4-6 недели'
        },
        {
            text: 'от 40 000 р.'
        }
    ],
])
const currentTableIdx = computed(() => {
    return props.currentTableIdx
})
const currentTable = ref(infoTable.value[0])
const textSlideUp = ref(false)
const textSlideUpFromDown = ref(false)
watch(currentTableIdx, () => {
    const animateText = () => {
        textSlideUp.value = true
        setTimeout(() => {
            textSlideUp.value = false
            textSlideUpFromDown.value = true
        }, 250)
        setTimeout(() => {
            textSlideUpFromDown.value = false
        }, 500)
        setTimeout(() => {
            currentTable.value = infoTable.value[currentTableIdx.value]
        }, 260)
    }
    animateText()
})
onMounted(() => {
    let infoTableItems = document.querySelectorAll('.info__table_item')
    infoTableItems.forEach(item => {
        let borderTop = item.querySelector('.info__table_item_border-top')
        let borderBottom = item.querySelector('.info__table_item_border-bottom')
        let borderRight = item.querySelector('.info__table_item_border-right')
        let borderLeft = item.querySelector('.info__table_item_border-left')
        let textInner = item.querySelector('.info__table_item_text-inner')
        gsap.set(borderTop, { width: 0 })
        gsap.set(borderBottom, { width: 0 })
        gsap.set(borderRight, { height: 0 })
        gsap.set(borderLeft, { height: 0 })
        gsap.set(textInner, { y: () => textInner.offsetHeight })
    })
})
const props = defineProps({
    currentTableIdx: {
        type: Number,
        required: true
    }
})
</script>

<style lang="scss">
.info {
    margin-top: 53px;
}
.info__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}
.info__table {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
}
.info__table_item {
    position: relative;
    font-family: 'Geometria';
    width: 100%;
    max-width: 256px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 1;
    color: #242424;
    padding: 31px;
    &:nth-child(n+2) &_border-left {
        display: none;
    }
    &_border {
        position: absolute;
        background: #343434;
        transition: 0.2s ease;
    }
    &_border-top {
        top: 0;
        left: 0;
        width: 0;
        height: 1px;
    }
    &_border-right {
        top: 0;
        right: 0;
        width: 1px;
        height: 0;
    }
    &_border-bottom {
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
    }
    &_border-left {
        left: 0;
        bottom: 0;
        width: 1px;
        height: 0;
    }
}
.info__table_item_text-inner {
    display: block;
    &.slide-up {
        -webkit-animation: slideUp 0.35s ease-out;
        -moz-animation: slideUp 0.35s ease-out;
        animation: slideUp 0.35s ease-out;
    }
    &.slide-from-down {
        -webkit-animation: slideUpFromDown 0.35s ease;
        -moz-animation: slideUpFromDown 0.35s ease;
        animation: slideUpFromDown 0.35s ease;
    }
}
@keyframes slideUp {
    0% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(-100%);
    }
}
@keyframes slideUpFromDown {
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0%);
    }
}
.steps-navigation__send-order-btn-wrapper {
    margin-left: 40px;
}
@media (max-width:1600px) {
    .info {
        margin-top: 38px;
    }
}
@media (max-width:700px) {
    .info__container {
        flex-direction: column;
        align-items: flex-end;
    }
    .info__table {
        width: 100%;
        justify-content: flex-end;
        margin-bottom: 30px;
    }
}
@media (max-width:370px) {
    .info__table_item {
        padding: 26px;
        font-size: 12px;
    }
}
</style>