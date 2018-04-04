let sliderImages = document.querySelectorAll('.slide');

let arrowLeft = document.querySelector('#arrow-left');

let arrowRight = document.querySelector('#arrow-right');

let current = 0;

// this will clear all images
function reset(){
  for(let i=0; i<sliderImages.length; i++){
    sliderImages[i].style.display = 'none';
  }
}

// initializes the slider
function startSlide() {
  reset();
  sliderImages[0].style.display = 'block';
}

// show previous images
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = 'block';
  current--;
}

// Show next (right arrow)
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = 'block';
  current++;
}

// Left arrow click (event listener)
arrowLeft.addEventListener('click', function(){
  if(current === 0){
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow click (event listener)
arrowRight.addEventListener('click', function(){
  if(current === sliderImages.length - 1){
    current = -1;
  }
  slideRight();
});



startSlide();
