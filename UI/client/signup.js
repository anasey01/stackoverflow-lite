const btn = document.getElementById('submit');
const messageOutput = document.getElementById('message-output');

const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/auth/signup';
// const url = 'http://localhost:3000/api/v1/auth/signup';

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
    .then(response => response.json())
    .then((data) => {
      if (data.success === false) {
        const messageInfo = `<ul>
                                <li>${data.message}</li>
                            </ul>`;
        messageOutput.innerHTML = messageInfo;
      } else {
        window.location.replace('login.html');
      }
    })
    .catch((error) => {
      let err = new Error(error);
      return err;
    });
};

btn.addEventListener('click', signupUser);
