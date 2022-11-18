gsap.registerPlugin(MotionPathPlugin);

class AnimationManager {
    constructor() {
        const heroScene = document.querySelector(".hero__scene");
        const heroPlanet = document.querySelector(".hero__scene-planet");
        const heroRocket = document.querySelector(".hero__scene-rocket");
        const heroRocket2 = document.querySelector(".hero__scene-rocket-2");
        
        gsap.to(heroPlanet, {
            motionPath: {
                path: "#hero-path",
                align: "#hero-path",
                alignOrigin: [0.5, 0.5],
                start: 0
            },
            duration: 30,
            repeat: -1,
        });
        gsap.to(heroRocket, {
            motionPath: {
                path: "#hero-path",
                align: "#hero-path",
                alignOrigin: [0.5, 0.5],
                start: 0.3
            },
            duration: 30,
            repeat: -1,
        });
        gsap.to(heroRocket2, {
            motionPath: {
                path: "#hero-path",
                align: "#hero-path",
                alignOrigin: [0.5, 0.5],
                start: 0.6,
                autoRotate: true
            },
            duration: 30,
            repeat: -1,
        });
    }
}

export default new AnimationManager();
