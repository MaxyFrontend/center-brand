export const useLanguageDataStore = defineStore('LanguageDataStore', {
    state: () => {
        return {
            ru: {
                logoDescription: `DIGITAL - АГЕНТСТВО <br>
                ЛЮБИМ И РАЗВИВАЕМ БРЕНДЫ`,
                langLink: {
                    name: 'en',
                    path: '/en'
                },
                stepsNavigation: [
                    {
                        text: 'Идея'
                    },
                    {
                        text: 'Бренд'
                    },
                    {
                        text: 'Сайт'
                    },
                    {
                        text: 'Визуал'
                    },
                    {
                        text: 'Комплекс'
                    },
                ],
                stepsTitles: [
                    [
                        "Анализируем продукт, услугу, концепцию",
                        "Продумываем бизнес-логику"
                    ],
                    [
                        "Формируем нарратив и фирменный стиль",
                        "Создаем дизайн-код"
                    ],
                    [
                        "Разрабатываем логику выполнения бизнес-задач",
                        "Интегрируем её в дизайн"
                    ],
                    [
                        "Наполняем бренд визуальным материалом",
                        "Объем, анимация, видео, фото"
                    ],
                    [
                        "Целесообразно выполнение всего объема",
                        "задач в комплексе “под ключ”"
                    ],
                ],
                infoTable: [
                    [
                        {
                            text: ' 1-2 недели'
                        },
                        {
                            text: 'от 30 000 р.'
                        }
                    ],
                    [
                        {
                            text: ' 2-4 недели'
                        },
                        {
                            text: 'от 70 000 р.'
                        }
                    ],
                    [
                        {
                            text: ' 2-4 недели'
                        },
                        {
                            text: 'от 100 000 р.'
                        }
                    ],
                    [
                        {
                            text: ' 3-4 недели'
                        },
                        {
                            text: 'от 60 000 р.'
                        }
                    ],
                    [
                        {
                            text: ' 4-8 недель'
                        },
                        {
                            text: 'от 300 000 р.'
                        }
                    ],
                ],
                orderMenuData: {
                    title: 'Давайте начнём!',
                    subTitle: 'Опишите Вашу задачу, и мы свяжемся с вами для обсуждения всех деталей',
                    types:[
                        {
                            text: 'Анализ',
                        },
                        {
                            text: 'Бренд',
                        },
                        {
                            text: 'Сайт',
                        },
                        {
                            text: 'Визуал',
                        },
                        {
                            text: 'Комплекс',
                        },
                    ],
                    budget: [
                        {
                            text: 'до 1 млн',
                        },
                        {
                            text: '1 - 2 млн',
                        },
                        {
                            text: 'более 2 млн',
                        }
                    ],
                    fields: {
                        name:{
                            placeholder: 'Имя,  Компания'
                        },
                        email: {
                            placeholder: 'E-mail'
                        },
                        details: {
                            placeholder: 'Детали проекта'
                        },
                    },
                    acceptText: 'Нажимая этот кружок, я даю согласие на обработку персональных данных',
                    address: 'Москва, ул. Новодмитровская, д. 1'
                }
            },
            en: {
                logoDescription: `DIGITAL - AGENCY <br>
                LOVE AND GROVE BRANDS`,
                langLink: {
                    name: 'ру',
                    path: '/'
                },
                stepsNavigation: [
                    {
                        text: 'Analysis'
                    },
                    {
                        text: 'Brand'
                    },
                    {
                        text: 'Website'
                    },
                    {
                        text: 'Visual'
                    },
                    {
                        text: 'Complex'
                    },
                ],
                stepsTitles: [
                    [
                        "We analyze the product, service, concept",
                        "Thinking over business logic"
                    ],
                    [
                        "We form the narrative and corporate identity",
                        "We create a design code"
                    ],
                    [
                        "We develop the logic for executing business tasks",
                        "Integrating it into the design"
                    ],
                    [
                        "We fill the brand with visual material",
                        "Volume, animation, video, photo"
                    ],
                    [
                        "It is advisable to complete the entire volume",
                        "tasks in the turnkey complex"
                    ],
                ],
                infoTable: [
                    [
                        {
                            text: ' 1-2 weeks'
                        },
                        {
                            text: 'from 30 000 р.'
                        }
                    ],
                    [
                        {
                            text: ' 2-4 weeks'
                        },
                        {
                            text: 'from 70 000 р.'
                        }
                    ],
                    [
                        {
                            text: ' 2-4 weeks'
                        },
                        {
                            text: 'from 100 000 р.'
                        }
                    ],
                    [
                        {
                            text: ' 3-4 weeks'
                        },
                        {
                            text: 'from 60 000 р.'
                        }
                    ],
                    [
                        {
                            text: ' 4-8 weeks'
                        },
                        {
                            text: 'from 300 000 р.'
                        }
                    ],
                ],
                orderMenuData: {
                    title: 'Lets start!',
                    subTitle: 'Describe your task and we will contact you to discuss all the details',
                    types:[
                        {
                            text: 'Analysis',
                        },
                        {
                            text: 'Brand',
                        },
                        {
                            text: 'Website',
                        },
                        {
                            text: 'Visual',
                        },
                        {
                            text: 'Complex',
                        },
                    ],
                    budget: [
                        {
                            text: 'ещ 1 bil',
                        },
                        {
                            text: '1 to 2 bil',
                        },
                        {
                            text: 'ьore than 2 bil',
                        }
                    ],
                    fields: {
                       name: {   
                            placeholder: 'Name,  Company'
                        },
                        email:{
                            placeholder: 'E-mail'
                        },
                       details: {
                            placeholder: 'Project details'
                        },
                    },
                    acceptText: 'By clicking this circle, I consent to the processing of personal data',
                    address: 'Moscow, st. Novodmitrovskaya, 1'
                }
            }
        }
    },
})