const btn = document.getElementById('submit');


const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/auth/signup';
// const url = 'localhost:3000/api/v1/auth/signup';

const signupUser = (e) => {
  e.preventDefault();
  const fullname = document.getElementById('fullname').value;
  const username = document.getElementById('username').value;
  const gender = document.getElementById('gender').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const options = {
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
      mode: 'cors',
      credentials: 'include',
      cache: 'no-cache',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
    },
  };
  console.log('Options Passed', options);

  fetch(url, options)
    .then(response => console.log('Response is', response))
    .then(data => console.log('I can append this here', data))
    .catch(error => console.log('Error catching URL', error));
};

btn.addEventListener('click', signupUser);
