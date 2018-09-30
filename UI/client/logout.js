const log = document.getElementById('logout');

const logout = (e) => {
  localStorage.removeItem('currentAuthor');
  localStorage.removeItem('currentQuestion');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentPathname');
  localStorage.removeItem('currentVoteStats');
  localStorage.removeItem('currentQuestion');
  localStorage.removeItem('questionByUser');
  e.preventDefault();
  localStorage.removeItem('x-auth-token');
  setTimeout(() => {
    window.location.replace('index.html');
  }, 500);
};

log.addEventListener('click', logout);
