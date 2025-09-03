export function initThemeToggle() {
    const html = document.documentElement;
    let buttonToogle = document.querySelector(".button__light-dark-theme");
    let userTheme = localStorage.getItem('theme');
    if(!userTheme){
        changeSiteColorTheme("light")
    }else{
        changeSiteColorTheme(userTheme)
    }

    buttonToogle.addEventListener("click",()=>{changeSiteColorTheme("buttonClick")})
}

function changeSiteColorTheme(currentTheme) {
    const buttonToogle = document.querySelector(".button__light-dark-theme");
    const html = document.documentElement;
    const themeIcon = document.querySelector('.button__light-dark-theme--icon');
    let newTheme
    if( currentTheme == "buttonClick"){     
        currentTheme = localStorage.getItem('theme');
        newTheme = currentTheme === "dark" ? "light" : "dark";
    }else{
        newTheme = currentTheme
    }
    localStorage.setItem('theme', newTheme);
    buttonToogle.dataset.theme = newTheme;
    html.setAttribute('data-theme', newTheme);
    if (themeIcon) {
        themeIcon.src = `img/icons/theme-toogle__${newTheme}.svg`;
    }
}