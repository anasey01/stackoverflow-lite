const btn = document.getElementById('submit');
const messageOutput = document.getElementById('message-output');

const url = '/api/v1/auth/signup';

const signupUser = (e) => {
  e.preventDefault();
  const fullname = document.getElementById('fullname').value;
  const username = document.getElementById('username').value;
  const gender = document.querySelector('input[name=gender][checked]').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      fullname,
      username,
      gender,
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error('error');
        return error;
      }
      return response.json();
    })
    .then((data) => {
      if (data.message === 'error') {
        messageOutput.innerHTML = '<li> Unable to Signup </li>';
      } else {
        setTimeout(() => {
          window.location.replace('login.html');
        }, 500);
      }
    })
    .catch((error) => {
      const err = new Error(error);
      return err;
    });
};

btn.addEventListener('click', signupUser);
