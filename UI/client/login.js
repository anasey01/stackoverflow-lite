const btn = document.getElementById('submit');

const loginUser = (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/auth/login';

  fetch(url, {
    method: 'POST',
    body: {
      username,
      password,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => console.log(response))
    .then((data) => {
      console.log(data);
    // TODO:
    // Get the Token and store in Local storage
    // Disable login and signup button on nav bar
    // Display logout button
    // redirect the user to view all questions
    })
    .catch(error => console.error(error));
  // TODO:
  // output error messgae
  // redirect user to login page
};

btn.addEventListener('click', loginUser);
