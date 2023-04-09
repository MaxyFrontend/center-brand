<template>
    <section :class="['background-screen', props.class]">

    </section>
</template>

<script setup>
const props = defineProps({
    class: {
        type:String,
        required:false
    }
})
</script>

<style lang="scss">
.background-screen {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150%;
    background: linear-gradient(106.17deg, #F8EBD2 2.64%, #E9B9E5 73.96%, #B0BAF7 101.16%);
    z-index: 1500;
    &.menu-bg-screen {
        background: linear-gradient(106.17deg, #C3E1EA 2.64%, #D4EDCF 53.23%, #F1D7B7 101.16%);
    }
}
</style>