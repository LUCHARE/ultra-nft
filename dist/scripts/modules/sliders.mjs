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

export default new SliderManager()