export function popUpCreate(errorMessage) {
    return new Promise((resolve, reject)=>{    
        document.body.insertAdjacentHTML('beforeend', 
            `<div class="pop-up pop-up_error">
                <p class="pop-up_text pop-up">${errorMessage}</p>
                <input type="text" class="pop-up_input pop-up">
                <button type="submit" class="pop-up_button pop-up">Подтвердить</button>
            </div>`
        );
        const popUpElement = document.querySelector('.pop-up_error');
        const popUpInput = document.querySelector('.pop-up_input')
        const popUpButton = document.querySelector('.pop-up_button')
        popUpInput.addEventListener('keydown', inputPressKey)
        popUpButton.addEventListener('click', inputPressButton)
        document.addEventListener('click', clickOutPopUp)

        function popUpDelete(result){
            popUpElement.remove();
            document.removeEventListener('click', clickOutPopUp)
            popUpButton.removeEventListener('click', inputPressButton)
            popUpInput.removeEventListener('keydown', inputPressKey)
            if(result !== "clickOutPopUp"){
                return resolve(result)
            }
            return resolve("clickOutPopUp")
        }

        function inputPressKey(event){
            console.log(event.key)
            if(event.key == "Enter"){
                popUpDelete(event.target.value)
            }
        }
        
        function inputPressButton(){
            let popUpInput = document.querySelector('.pop-up_input')
            popUpDelete(popUpInput.value)
        }

        function clickOutPopUp(event){
            let target = event.target;
            if (!target.classList.contains('pop-up')){
                popUpDelete("clickOutPopUp")
            }
        }
    })
}

