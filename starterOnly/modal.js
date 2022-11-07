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
 * Triggers an error alert
 * @param {string} field - The field to display in the error message
 */
/* prettier-ignore */
const triggersError = (field) => alert(`You must fill in field ${field} properly.`);

/**
 * Form submit handling method. Validate inputs and submit.
 * @param {FormEvent<HTMLFormElement>} e - Event corresponding to the form
 */
const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  /* check form fields */
  for (const [field, value] of formData) {
    switch (field) {
      case 'firstname':
      case 'lastname': {
        if (value.trim().length < 2 || !isValidString(value)) {
          triggersError(field);
          return;
        }

        break;
      }

      case 'email': {
        if (!isValidString(value) || !isValidEmail(value)) {
          triggersError(field);
          return;
        }

        break;
      }

      case 'birthdate': {
        if (!isValidString(value) || !isValidDate(value)) {
          triggersError(field);
          return;
        }

        break;
      }

      case 'quantity': {
        if (!isValidString(value) || !isValidQuantity(value)) {
          triggersError(field);
          return;
        }

        break;
      }

      default: {
        break;
      }
    }
  }

  /* check location */
  if (!formData.get('location')) {
    triggersError('location');
    return;
  }

  /* check terms and conditions */
  if (!document.querySelector('#checkbox1').checked) {
    alert('You must accept terms and conditions.');
    return;
  }

  // fetch(...)
  form.reset();
  closeModal();
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
/* close modal on click */
modalCloseButton.addEventListener('click', closeModal);
/* handle submit for form */
form.addEventListener('submit', handleSubmit);
