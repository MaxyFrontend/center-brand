<template>
    <section class="steps">
        <div class="container steps__container">
            <StepsScreen :title="title" :number="`0${idx+1}`" v-for="(title, idx) in stepsTitles" />
        </div>
    </section>
</template>

<script setup>
const stepsTitles = [
    [
        "Анализируем идею, продукт, услугу",
        "Выстраиваем бизнес-логику"
    ],
    [
        "Придумываем и совершенствуем нарратив",
        "Формируем дизайн-код"
    ],
    [
        "Разрабатываем логику взаимодействия",
        "Внедряем бизнес-задачи"
    ],
    [
        "Наполняем визуальным материалом",
        "Объем, анимация, видео, фото"
    ],
]
</script>

<style>
.steps {
    position: relative;
    width: 100%;
    flex-grow: 1;
    z-index: 10;
}

.steps__container {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>