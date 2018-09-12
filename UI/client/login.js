const btn = document.getElementById('submit');

const loginUser = () => {

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/auth/login';
  const options = {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: {
      username,
      password,
    },
  };

  fetch(url, options)
    .then((response) => {
      console.log('response from login', response);
      // Get the Token and store in Local storage
      // Disable login and signup button on nav bar
      // Display logout button
      // redirect the user to view all questions
    })
    .catch(error => console.error(error));
  // output error messgae
  // redirect user to login page
};

btn.addEventListener('submit', loginUser);
