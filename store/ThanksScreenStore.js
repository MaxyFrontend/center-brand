export const useThanksScreenStore = defineStore('ThanksScreenStore', {
    state: () => {
        return {
            screenVisible:false
        }
    },
    actions: {
        toggle() {
            this.screenVisible = !this.screenVisible
        },
        open() {
            this.screenVisible = true
        },
        close() {
            this.screenVisible = false
        }
    },
})