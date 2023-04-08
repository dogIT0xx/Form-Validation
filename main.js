// đối tượng validator
function Validator(options) {

    const form = document.querySelector(options.form)

    options.rules.forEach((rule) => {
        let inputElement = form.querySelector(rule.selector)

        // Định nghĩa sự kiện lần đầu load trang
        if (inputElement) {
            inputElement.onblur = () => {
                validate(rule)
            }
    
            inputElement.onfocus = () => {
                let formGroup = inputElement.parentElement
                valid(formGroup)
            }
        }
    })

    function validate(rule) {
        let inputElement = form.querySelector(rule.selector)
        let errorMessage = rule.test(inputElement.value)

        if (errorMessage) {
            let formGroup = inputElement.parentElement
            invalid(formGroup, errorMessage)
        } else {
            let formGroup = inputElement.parentElement
            valid(formGroup)
        }
    }

    function invalid(formGroup, errorMessage) {
        formGroup.classList.add('invalid')
        formGroup.querySelector(options.message).innerText = errorMessage
    }

    function valid(formGroup) {
        formGroup.classList.remove('invalid')
        formGroup.querySelector(options.message).innerText = ''
    }
}

// Định nghĩa các rules
Validator.isRequired = (selector) => ({
    selector,
    test(value) {
        let regex =  /^[a-zA-Z\-]+$/
        return regex.test(value) ? undefined : 'Tên không hợp lệ'
    }
})


Validator.isEmail = (selector) => ({
    selector,
    test(value) {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return regex.test(value) ? undefined : 'Email không hợp lệ'
    }
})


Validator.minLength = (selector, len) => ({
    selector,
    test(value) {
        return value.length >= len ? undefined : `Vui lòng nhập giá trị có độ dài >= ${len} kí tự`
    }
})