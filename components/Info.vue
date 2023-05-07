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
            <SendOrderBtn :text="props.orderBtn.text" class="steps-navigation__send-order-btn-wrapper" />
        </div>
    </div>
</template>

<script setup>
import gsap from 'gsap';
// const infoTable = ref()
const currentTableIdx = computed(() => {
    setTimeout(()=>{
        currentTable.value = props.infoTable[currentTableIdx.value]
    }, 260)
    return props.currentTableIdx
})
const tableChange = computed(()=>{
    return props.infoTable
})
const currentTable = ref(props.infoTable[currentTableIdx.value])
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
            currentTable.value = props.infoTable[currentTableIdx.value]
        }, 260)
    }
    animateText()
})
watch(tableChange, () => {
    currentTable.value = props.infoTable[currentTableIdx.value]
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
    infoTable:{
        type:Array,
        required:true,
    },
    currentTableIdx: {
        type: Number,
        required: true
    },
    orderBtn: {
        type: Object,
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
        padding: 26px 20px;
        font-size: 12px;
    }
}
</style>