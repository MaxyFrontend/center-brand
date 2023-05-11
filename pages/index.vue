<template>
    <div></div>
</template>

<script setup>
const data = ref({
    lang:'ru',
})

const emit = defineEmits(['sendData'])
emit('sendData', data.value)
useHead({
    title: 'Bignames',
    meta: [
        {name: 'description', content: ""},
        {name: 'keywords', content: ""},
        {property: 'og:locale', content: "ru_RU"},
        {property: 'og:type', content: "website"},
        {property: 'og:url', content: "/var/www/u1312459/data/www/Bignames.ru"},
        {property: 'og:title', content: "Bignames"},
        {property: 'og:description', content: ""},
        {name: 'image', property: 'og:image', content: "https://bignames.ru/img/logo-share.png"},
        {property: 'og:image:width', content: "300"},
        {property: 'og:image:height', content: "300"},
    ]
})
</script>

<style lang="scss">
</style>