const form = document.querySelector('form');
const btnMailTo = document.querySelector('#mail');
const fields = [
    {
        input:document.querySelector('#name'),
        error:document.querySelector('#nameMessageError'),
        validation: function(value){
            if (value === '') {
                return 'El campo nombre no puede estar vacío.';
            } else if (value.length > 50) {
                return 'El campo Nombre debe tener máximo 50 caracteres.';
            }
             return '';
        }
    },
    {
        input:document.querySelector('#subject'),
        error:document.querySelector('#subjectMessageError'),
        validation: function(value){
            if (value === '') {
                return 'El campo Asunto no puede estar vacío.';
            } else if (value.length > 50) {
                return 'El campo Asunto debe tener máximo 50 caracteres.';
            }
             return '';
        }
    },
    {
        input: document.querySelector('#email'),
        error: document.querySelector('#emailMessageError'),
        validation: function(value) {
          if (value === '') {
            return 'El campo correo electrónico no puede estar vacío.';
          } else if (!validateEmail(value)) {
            return 'El correo electrónico ingresado no es válido.';
          }
          return '';
        }
    },
    {
        input: document.querySelector('#message'),
        error: document.querySelector('#messageMessageError'),
        validation: function(value){
            if (value === '') {
                return 'El campo Mensaje no puede estar vacío.';
            } else if (value.length > 300) {
                return 'El campo Asunto debe tener máximo 300 caracteres.';
            }
             return '';
        }

    }
]

form.addEventListener('submit', function(event){

    event.preventDefault();

    let hasErrors = false;

    fields.forEach(function(field){

        const value = field.input.value.trim();
        const errorMessage = field.validation(value);
        field.error.textContent = errorMessage;

        if (errorMessage !== '') {
            field.input.classList.add('input__container--invalid');
            hasErrors = true;
          } else {
            field.input.classList.remove('input__container--invalid');
          }
        });
      
        if (!hasErrors) {
          const form = new FormData(this);
                btnMailTo.setAttribute('href',`mailto:anfeberi@gmail.com?subject=${form.get('subject')}&body=mi nombre es: ${form.get('name')} y mi Correo: ${form.get('email')} ${form.get('message')}`)
                btnMailTo.click();
                form.submit();
        }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }