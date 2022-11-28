import { ScrollLocker } from "./utils.mjs";

gsap.registerPlugin(ScrollTrigger);

class Header {
    constructor() {
        const el = document.querySelector(".js-header");
        const menuEl = document.querySelector(".js-header-menu");
        const searchEl = document.querySelector(".js-header-search");
        const menuBtn = document.querySelector(".js-header-menu-button");
        const searchBtn = document.querySelector(".js-header-search-button");

        this.el = el;
        this.menuEl = menuEl;
        this.searchEl = searchEl;
        this.menuBtn = menuBtn;
        this.searchBtn = searchBtn;
        this.menuActive = false;
        this.searchActive = false;
        this.scrollLocker = new ScrollLocker((ev) => this.menuActive);

        menuBtn.addEventListener("click", (ev) => this.toggleMenu());
        searchBtn.addEventListener("click", (ev) => this.toggleSearch());

        window.addEventListener("load", () => this.updateContentMargin());
        window.addEventListener("resize", () => this.updateContentMargin());

        const searchAnim = gsap.timeline({
            paused: true,
            onStart: () => {
                this.searchEl.classList.add("header-search_active");
                this.searchActive = true;
            },
            onReverseComplete: () => {
                this.searchEl.classList.remove("header-search_active");
                this.searchActive = false;
            },
        });
        searchAnim.fromTo(
            searchEl,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
        );

        const menuAnim = gsap.timeline({
            paused: true,
            onStart: () => {
                this.menuEl.classList.add("header-menu_active");
                this.menuActive = true;
            },
            onReverseComplete: () => {
                this.menuEl.classList.remove("header-menu_active");
                this.menuActive = false;
            },
        });
        menuAnim.fromTo(
            menuEl,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5 }
        );

        const bgAnim = gsap.fromTo(
            el,
            { backgroundColor: "rgba(3, 8, 18, 0.0)" },
            { backgroundColor: "rgba(3, 8, 18, 0.94)", duration: 0.3 }
        );
        const bgAnimTrigger = ScrollTrigger.create({
            trigger: ".header",
            scrub: 0.1,
            start: 0,
            end: this.getHeight(),

            animation: bgAnim,
        });

        const burgerAnim = gsap.timeline({ paused: true, defaults: {duration: 0.2, ease: "power2.out"} });
        burgerAnim
            .to(".header__burger-top", { top: "50%", yPercent: -50 }, 0)
            .to(".header__burger-bottom", { bottom:  "50%", yPercent: 50 }, 0)
            .to(".header__burger-bottom", { opacity: 0 })
            .to(".header__burger-top", { rotationZ: -45 })
            .to(".header__burger-middle", { rotationZ: 45 });

        this.searchAnim = searchAnim;
        this.menuAnim = menuAnim;
        this.bgAnim = bgAnim;
        this.bgAnimTrigger = bgAnimTrigger;
        this.burgerAnim = burgerAnim;
    }

    getHeight() {
        return this.el.clientHeight;
    }

    updateContentMargin() {
        const contentEl = document.querySelector(".js-content");
        const contentMargin = this.getHeight();

        contentEl.style = `margin-top: ${contentMargin}px`;
    }

    openMenu() {
        const menuEl = this.menuEl;
        const headerHeight = this.getHeight();

        menuEl.style.top = `${headerHeight}px`;
        menuEl.style.height = `calc(100% - ${headerHeight}px)`;

        this.menuAnim.play();

        this.bgAnimTrigger.disable();
        this.bgAnim.play();
        this.burgerAnim.play();
    }

    closeMenu() {
        this.menuAnim.reverse();
        this.burgerAnim.reverse();
    }

    toggleMenu(force = !this.menuActive) {
        force ? this.openMenu() : this.closeMenu();
    }

    openSearch() {
        const searchEl = this.searchEl;

        searchEl.style.top = `${this.getHeight()}px`;

        this.searchAnim.play();

        this.bgAnimTrigger.disable();
        this.bgAnim.play();
    }

    closeSearch() {
        this.searchAnim.reverse();
    }

    toggleSearch(force = !this.searchActive) {
        force ? this.openSearch() : this.closeSearch();
    }
}

export default new Header();
