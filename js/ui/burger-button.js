export async function initBurgerButton() {
    let burgerButton =  document.querySelector(".button__burger")
    burgerButton.addEventListener("click", burgerClick)
}

function burgerClick(){
    const burgerIcon = document.querySelector(".burger-icon")
    const navListMobile = document.querySelector(".nav__list")
    console.log("burger click")
    burgerIcon.classList.toggle('open');
    navListMobile.classList.toggle('open');

}