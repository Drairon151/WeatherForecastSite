export async function popUpErrorCreate(errorMessage) {
    // let popUpElement = document.createElement('div')
    // popUpElement.textContent = errorMessage;
    // popUpElement.className = 'pop-up_error';
    // document.body.appendChild(div);
    document.body.insertAdjacentHTML('beforeend', 
        `<div class="pop-up pop-up_error">
            <p class="pop-up_text pop-up">${errorMessage}</p>
            <input type="text" class="pop-up_input pop-up">
        </div>`
    );

    document.addEventListener('click', popUpErrorDelete)

}

function popUpErrorDelete(event){
    let target = event.target;
    let popUpElement = document.querySelector('pop-up_error')
    if (!target.classList.contains('pop-up')){
        popUpElement.remove();
    }
}