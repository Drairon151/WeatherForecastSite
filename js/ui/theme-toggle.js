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

function changeSiteColorTheme(buttonToogle){
        const html = document.documentElement;
        let userTheme = localStorage.getItem('theme');
        let themeIcon = document.querySelector('.button__light-dark-theme--icon')
        if(userTheme == "dark"){
            buttonToogle.dataset.theme = "light";
            html.setAttribute('data-theme', "light");
            localStorage.setItem('theme', "light");
        }else if(userTheme == "light"){
            buttonToogle.dataset.theme = "dark";
            html.setAttribute('data-theme', "dark");
            localStorage.setItem('theme', "dark");
        }
        themeIcon.src = `/img/icons/theme-toogle__${userTheme}.svg`

}

