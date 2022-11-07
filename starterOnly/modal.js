const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const modalCloseButton = document.querySelector('.close');
const form = document.querySelector('#form');

function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

/**
 * close" modal on click
 */
const closeModal = () => {
  modalbg.style.display = 'none';
};

/**
 * Verify if given string is valid or not
 * @param {string | undefined} input - The string input to validate
 * @return {boolean} validation result
 */
const isValidString = (input) => input && input.trim().length > 0;

/**
 * Verify if given email is valid or not
 * @param {string} email - The email to validate
 * @return {boolean} validation result
 */
const isValidEmail = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Verify if given date is valid or not
 * @param {string} date - The date to validate according to YYYY-m(m)-d(d) format
 * @return {boolean} validation result
 */
const isValidDate = (date) => {
  return date.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);
};

/**
 * Verify if given quantity is valid or not
 * @param {string} quantity - The string quantity to validate
 * @return {boolean} validation result
 */
const isValidQuantity = (quantity) => quantity.match(/\d+/g);

/**
 * Display error by adding an error span to the element
 * @param {string} field - The field where error occured
 * @param {string} error - The error message to display
 */
const triggersError = (field, error) => {
  const existingTag = document.querySelector(`.error--${field}`);

  if (existingTag) {
    existingTag.innerText = error;
    return;
  }

  const element = document.querySelector(`#${field}`);
  const errorTag = document.createElement('span');
  errorTag.innerText = error;
  errorTag.className = `error error--${field}`;

  element?.after(errorTag);
};

/**
 * Clear the error corresponding to the given field
 * @param {string} field - The field name
 */
/* prettier-ignore */
const clearError = (field) => document.querySelector(`.error--${field}`)?.remove();

/**
 * Form submit handling method. Validate inputs and submit.
 * @param {FormEvent<HTMLFormElement>} e - Event corresponding to the form
 */
const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  let errorTriggered = false;

  /* check form fields */
  for (const [field, value] of formData) {
    switch (field) {
      case 'firstname':
      case 'lastname': {
        if (!isValidString(value) || value.trim().length < 2) {
          triggersError(field, 'Ce champ doit faire au moins 2 caractères.');
          errorTriggered = true;
          return;
        }

        errorTriggered = false;
        clearError(field);
        break;
      }

      case 'email': {
        if (!isValidString(value) || !isValidEmail(value)) {
          triggersError(field, "L'adresse email doit être valide.");
          errorTriggered = true;
          return;
        }

        errorTriggered = false;
        clearError(field);
        break;
      }

      case 'birthdate': {
        if (!isValidString(value) || !isValidDate(value)) {
          triggersError(field, 'La date de naissance doit être valide.');
          errorTriggered = true;
          return;
        }

        errorTriggered = false;
        clearError(field);
        break;
      }

      case 'quantity': {
        if (!isValidString(value) || !isValidQuantity(value)) {
          triggersError(
            field,
            'La quantité saisie doit être un nombre supérieur à zéro'
          );
          errorTriggered = true;
          return;
        }

        errorTriggered = false;
        clearError(field);
        break;
      }

      default: {
        break;
      }
    }
  }

  /* if error triggered, no need to check for extra fields */
  if (errorTriggered) return;

  /* check location */
  if (!formData.get('location')) {
    triggersError('location', 'Un lieu doit être saisi.');
    return;
  }

  clearError('location');

  /* check terms and conditions */
  if (!document.querySelector('#checkbox1').checked) {
    triggersError(
      'terms-error',
      "Vous devez accepter les conditions d'utilisation"
    );
    return;
  }

  clearError('terms-error');

  // fetch(...)
  alert('Merci! Votre réservation a bien été reçue.');
  form.reset();
  closeModal();
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
/* close modal on click */
modalCloseButton.addEventListener('click', closeModal);
/* handle submit for form */
form.addEventListener('submit', handleSubmit);
