export const useSendOrderMenuStore = defineStore('SendOrderMenuStore', {
    state: () => {
        return {
            menuOpened:false
        }
    },
    actions: {
        toggle() {
            this.menuOpened = !this.menuOpened
        },
        open() {
            this.menuOpened = true
        },
        close() {
            this.menuOpened = false
        }
    },
})