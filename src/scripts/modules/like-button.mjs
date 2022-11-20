class LikeButton {
    constructor(el) {
        const anim = gsap.timeline({ paused: true });
        const icon = el.querySelector(".like-button__icon");
        const path = el.querySelector(".like-button__icon-path");
        const countEl = el.querySelector(".like-button__count");
        const count = parseInt(countEl.innerText);

        anim.fromTo(
            path,
            { fill: "rgba(0, 0, 0, 0)", stroke: "#fff" },
            { fill: "#DC5683", stroke: "#DC5683", duration: 0.2 }
        )
            .to(icon, { scale: 1.5, duration: 0.3 })
            .to(icon, { scale: 1, ease: "bounce.out", duration: 0.3 });

        el.addEventListener("click", (ev) => this.toggle());

        this.el = el;
        this.anim = anim;
        this.active = false;
        this.countEl = countEl;
        this.count = count;
    }

    toggle() {
        const anim = this.anim;
        const new_state = !this.active;

        if (new_state) {
            anim.play();
            this.count += 1;
        } else {
            anim.reverse();
            this.count -= 1;
        }

        this.countEl.innerText = this.count

        this.active = new_state;
    }
}

class LikeButtonManager {
    constructor() {
        const buttons = document.querySelectorAll(".like-button");
        this.entries = [];

        for (const entry of buttons) {
            this.entries.push(new LikeButton(entry));
        }
    }
}

export default new LikeButtonManager();
