
const abcdario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const length = abcdario.length;
var timeOut;
var ix = 0;
const letra = document.querySelector('.letters');

function carrusel() {
  timeOut = setTimeout( ()=> {
    ix++;
    var type = abcdario.substring(ix-1, ix);
    letra.textContent = type;
    carrusel();

    if (ix == length) {
      // clearTimeout(timeOut);

      ix = 0;
    }
  }, 220);
};

var animation = anime({
  targets: '.ml8 .circle-dark-dashed', 
  rotateZ: 360,
  duration: 8000,
  autoplay: false,
  easing: 'linear',
  loop: true
});

function ruleta() {
  ;
  // carrusel();
}

document.querySelector('.inicio').onclick = animation.play;
document.querySelector('.basta').onclick = animation.pause;

/* anime.timeline({loop: true})
  .add({
    targets: '.ml8 .circle-white',
    scale: [0, 1.8],
    opacity: [1, 0],
    easing: "easeInOutExpo",
    // rotateZ: 360,
    duration: 1100})
  .add({
    targets: '.ml8 .circle-container',
    scale: [0, 1],
    duration: 1100,
    easing: "easeInOutExpo",
    offset: '-=1000'})
  .add({
    targets: '.ml8 .circle-dark',
    scale: [0, 1],
    duration: 1100,
    easing: "easeOutExpo",
    offset: '-=600'})
  .add({
    targets: '.ml8 .letters',
    scale: [0, 1],
    rotateZ: [45, 0],
    duration: 1200,
    offset: '-=1000'})
  // .add({
  //   targets: '.ml8 .bang',
  //   scale: [0, 1],
  //   rotateZ: [45, 15],
  //   duration: 1200,
  //   offset: '-=1000'})
  .add({
    targets: '.ml8',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1400});

anime({
  targets: '.ml8 .circle-dark-dashed',
  rotateZ: 360,
  duration: 8000,
  easing: "linear",
  loop: true
}); */