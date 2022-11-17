new Swiper(".live-auctions__slider", {
  spaceBetween: 32,
  slidesPerView: 3,
//   slidesPerGroup: 3,
  pagination: {
    el: '.live-auctions__slider-pagination',
    clickable: true
  },
  autoHeight: true,
  paginationClickable: true
});
