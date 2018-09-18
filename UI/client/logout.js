const log = document.getElementById('logout');

const logout = (e) => {
  e.preventDefault();
  localStorage.removeItem('x-auth-token');
  setTimeout(() => {
    window.location.replace('index.html');
  }, 500);
};

log.addEventListener('click', logout);
