/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/modules/header.mjs":
/*!****************************************!*\
  !*** ./src/scripts/modules/header.mjs ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./src/scripts/modules/utils.mjs");


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
        this.scrollLocker = new _utils_mjs__WEBPACK_IMPORTED_MODULE_0__.ScrollLocker((ev) => this.menuActive);

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

        this.searchAnim = searchAnim;
        this.menuAnim = menuAnim;
        this.bgAnim = bgAnim;
        this.bgAnimTrigger = bgAnimTrigger;
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
    }

    closeMenu() {
        this.menuAnim.reverse();
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

/* harmony default export */ __webpack_exports__["default"] = (new Header());


/***/ }),

/***/ "./src/scripts/modules/sliders.mjs":
/*!*****************************************!*\
  !*** ./src/scripts/modules/sliders.mjs ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
class SliderManager {
    constructor() {
        self.liveAuctionsSlider = new Swiper(".live-auctions__slider", {
            spaceBetween: 32,
            slidesPerView: 1,
            loop: false,
        
            pagination: {
                el: ".live-auctions__slider-pagination",
                clickable: true,
            },
        
            autoplay: {
                dalay: 5000
            },
        
            breakpoints: {
                425: {
                    slidesPerView: 3,
                    loop: true,
                    centerInsufficientSlides: true,
                },
            },
        });
    }
}

/* harmony default export */ __webpack_exports__["default"] = (new SliderManager());

/***/ }),

/***/ "./src/scripts/modules/utils.mjs":
/*!***************************************!*\
  !*** ./src/scripts/modules/utils.mjs ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollLocker": function() { return /* binding */ ScrollLocker; }
/* harmony export */ });
class ScrollLocker {
    constructor(callback) {
        const scrollingEl = document.scrollingElement;
        const listener = (ev) => {
            if (callback(ev)) ev.preventDefault();
        };

        scrollingEl.addEventListener("wheel", listener, { passive: false });
        scrollingEl.addEventListener("touchmove", listener, { passive: false });

        this.callback = callback;
        this.listener = listener;
        this.scrollingEl = scrollingEl;
    }

    destroy() {
        this.scrollingEl.removeEventListener("wheel", this.listener, { passive: false });
        this.scrollingEl.removeEventListener("touchmove", this.listener, { passive: false });
    }
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************************!*\
  !*** ./src/scripts/main.mjs ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_header_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/header.mjs */ "./src/scripts/modules/header.mjs");
/* harmony import */ var _modules_sliders_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/sliders.mjs */ "./src/scripts/modules/sliders.mjs");




}();
/******/ })()
;
//# sourceMappingURL=main.js.map