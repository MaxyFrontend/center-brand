<template>
    <svg :class="['corner-arrow', props.class]" width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00005 0V6.58588L1.41421 4.05396e-05L0 1.41425L6.58575 8H5.2493e-05V10H8.00005H10.0001V8V0H8.00005Z" :fill="props.color" />
    </svg>
</template>

<script setup>
const props = defineProps({
    class: {
        type:String,
        required:false
    },
    color: {
        type:String,
        default:'#fff',
        required:false
    }
})
</script>

<style lang="scss">

</style>