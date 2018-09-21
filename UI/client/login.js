const btn = document.getElementById('submit');
const login = document.getElementById('login');
const signup = document.getElementById('signup');
const logout = document.getElementById('logout');
const messageOutput = document.getElementById('messageOutput');

const loginUser = (e) => {
  e.preventDefault();
  const username = document.getElementById('username');
  const password = document.getElementById('password');

  const url = '/api/v1/auth/login';

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value,
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
        messageOutput.innerHTML = '<li>Username or Password incorrect</li>';
        username.value = '';
        password.value = '';
      } else {
        const messageInfo = `<ul>
                              <li>${data.message}</li>
                          </ul>`;
        messageOutput.innerHTML = messageInfo;
        localStorage.setItem('x-auth-token', data.token);
        localStorage.setItem('currentUser', data.username);
        setTimeout(() => {
          window.location.replace('./../UI/index.html');
        }, 1000);
      }
    })
    .catch((error) => {
      const err = new Error(error);
      return err;
    });
};

btn.addEventListener('click', loginUser);
