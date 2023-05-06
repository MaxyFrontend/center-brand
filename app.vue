<template>
    <div :class="['app', { 'visible': sectionVisible }, { 'is-mobile': isMobileOrTablet }]">
        <NuxtPage />
    </div>
</template>
<script setup>
let sectionVisible = ref(false)
const isMobileOrTablet = ref(false)
onMounted(() => {
    const { $isMobile, $isTablet } = useNuxtApp()
    if ($isMobile() || $isTablet()) {
        isMobileOrTablet.value = true
    }
    setTimeout(() => {
        sectionVisible.value = true
    }, 100)
})
</script>
<style src="@/assets/scss/main.scss">

</style>
<style lang="scss">

</style>