const EnableScroll =  () => {
    if(document.querySelector('body').classList.contains('no-scroll')) {
        let scrollY = -document.querySelector('body').style.top.replace(/[a-z]/gi, '')
        document.querySelector('body').classList.remove('no-scroll')
        document.querySelector('body').style.removeProperty('top')
        document.querySelector('html').style.scrollBehavior = 'auto'
        window.scroll(0, scrollY)
        document.querySelector('html').style.removeProperty('scroll-behavior')
        setTimeout(()=>{
            document.querySelector('body').removeAttribute('data-scroll-disabled')
        }, 300)
    }
}
export default EnableScroll