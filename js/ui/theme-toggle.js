export async function initThemeToggle() {
    const html = document.documentElement;
    let buttonToogle = document.querySelector(".button__light-dark-theme");
    let userTheme = localStorage.getItem('theme');
    if(!userTheme){
        buttonToogle.dataset.theme = "light";
        html.setAttribute('data-theme', "light");
        localStorage.setItem('theme', "light");
    }

    buttonToogle.addEventListener("click",()=>{changeSiteColorTheme(buttonToogle)})
}

function changeSiteColorTheme(buttonToogle) {
    const html = document.documentElement;
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    const themeIcon = document.querySelector('.button__light-dark-theme--icon');

    localStorage.setItem('theme', newTheme);
    buttonToogle.dataset.theme = newTheme;
    html.setAttribute('data-theme', newTheme);
    themeIcon.src = `/img/icons/theme-toogle__${newTheme}.svg`;
}