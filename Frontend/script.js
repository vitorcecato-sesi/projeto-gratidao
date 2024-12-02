let slideIndex = 1;
mostrarSlides(slideIndex);

function proxSlide(n) {
  mostrarSlides(slideIndex += n);
}

function slideAtual(n) {
  mostrarSlides(slideIndex = n);
}

function mostrarSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  let bolinhas = document.getElementsByClassName("bolinhas");
  if (n > slides.length) {
    slideIndex = 1
  }    
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < bolinhas.length; i++) {
    bolinhas[i].className = bolinhas[i].className.replace(" ativo", "");
  }
  slides[slideIndex-1].style.display = "block";  
  bolinhas[slideIndex-1].className += " ativo";
}