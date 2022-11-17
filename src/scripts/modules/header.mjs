class Header {
    constructor() {
        const el = document.querySelector('.js-header')
        const menuEl = document.querySelector('.js-header-menu')
        const searchEl = document.querySelector('.js-header-search')
        const menuBtn = document.querySelector('.js-header-menu-button')
        const searchBtn = document.querySelector('.js-header-search-button')

        this.el = el
        this.menuEl = menuEl
        this.searchEl = searchEl
        this.menuBtn = menuBtn
        this.searchBtn = searchBtn
        this.menuActive = false
        this.searchActive = false

        menuBtn.addEventListener('click', ev => {
            this.toggleMenu()
        })

        searchBtn.addEventListener('click', ev => {
            this.toggleSearch()
        })

        window.addEventListener('load', () => this.updateContentMargin())
        window.addEventListener('resize', () => this.updateContentMargin())
    }

    getHeight() {
        return this.el.clientHeight
    }

    updateContentMargin() {
        const contentEl = document.querySelector('.js-content')
        const contentMargin = this.getHeight()

        contentEl.style = `margin-top: ${contentMargin}px`        
    }

    openMenu() {
        const menuEl = this.menuEl
        const headerHeight = this.getHeight()

        menuEl.style.top = `${headerHeight}px`
        menuEl.style.height = `calc(100% - ${headerHeight}px)`
        menuEl.classList.add('header-menu_active')
        
        this.menuActive = true
    }

    closeMenu() {
        this.menuEl.classList.remove('header-menu_active')
        this.menuActive = false
    }

    toggleMenu(force = !this.menuActive) {
        force ? this.openMenu() : this.closeMenu()
    }

    openSearch() {
        const searchEl = this.searchEl;

        searchEl.style.top = `${this.getHeight()}px`
        searchEl.classList.add('header-search_active')

        this.searchActive = true
    }

    closeSearch() {
        this.searchEl.classList.remove('header-search_active')
        
        this.searchActive = false
    }

    toggleSearch(force = !this.searchActive) {
        force ? this.openSearch() : this.closeSearch()
    }
}

export default new Header()