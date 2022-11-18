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

export { ScrollLocker };
