export const useMobileMenuStore = defineStore('MobileMenuStore', {
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