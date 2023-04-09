export const useStepsNavigationStore = defineStore('StepsNavigationStore', {
    state: () => {
        return {
            navigation: [
                {
                    text: 'Анализ',
                    navTo:'0',
                    current:false
                },
                {
                    text: 'Бренд',
                    navTo:'1',
                    current:false
                },
                {
                    text: 'Сайт',
                    navTo:'2',
                    current:false
                },
                {
                    text: 'Визуал',
                    navTo:'3',
                    current:false
                },
            ]
        }
    },
    actions: {
        chooseBtn(currentIdx) {
            this.navigation.forEach((item, idx)=>{
                if(idx === currentIdx) {
                    item.current = true
                }
                else {
                    item.current = false
                }
            })
        },
    },
})