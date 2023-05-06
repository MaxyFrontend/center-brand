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
    [
        "Quam, dolorem officiis numquam ipsa",
        "Id earum hic molestiae at"
    ],
]
</script>

<style>
.steps {
    position: relative;
    width: 100%;
    min-height: 300px;
    flex-grow: 1;
    margin-top: auto;
    z-index: 10;
}

.steps__container {
    height: 100%;
    display: flex;
    flex-direction: column;
}
@media (max-width:1600px) {
    .steps {
        min-height: 220px;
    }
}
@media (max-width:1400px) {
    .steps {
        min-height: 200px;
    }
}
</style>