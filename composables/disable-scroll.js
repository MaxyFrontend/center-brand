const DisableScroll =  () => {
    let pageYOffset = window.scrollY;
    document.querySelector('body').classList.add('no-scroll')
    document.querySelector('body').style.top = -pageYOffset + 'px'
    document.querySelector('body').dataset.scrollDisabled = true
    return pageYOffset
}
export default DisableScroll