const questionTitle = document.getElementById('question-title');
const questionContent = document.getElementById('question-content');
const questionAuthor = document.getElementById('question-author');
const creationDate = document.getElementById('creation-date');
const viewQuestionLoginBtn = document.getElementById('login');
const viewQuestionLogoutBtn = document.getElementById('logout');
const viewQuestionSignupBtn = document.getElementById('signup');
const deleteQuestBtn = document.getElementById('deleteQuestion');

const currentLoggedInUser = localStorage.getItem('currentUser');
const token = localStorage.getItem('x-auth-token');
const currentPath = new URL(window.location.href).pathname;
const url = `/api/v1${new URL(window.location.href).pathname}`;
localStorage.setItem('currentQuestion', currentPath);

if (token) {
  viewQuestionLoginBtn.classList.add('disabled');
  viewQuestionSignupBtn.classList.add('disabled');
  viewQuestionLogoutBtn.classList.add('enabled');
}


fetch(url, {
  method: 'GET',
  headers: {
    'x-auth-token': token,
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
    if(data.message === 'error') {
      window.location.replace('./../UI/login.html');
    } else {
      questionTitle.innerHTML = data.question.questiontitle;
      questionContent.innerHTML = data.question.questioncontent;
      questionAuthor.innerHTML = data.question.username;
      creationDate.innerHTML = data.question.createdat;
      localStorage.setItem('currentAuthor', data.question.username);
      if (data.question.username !== currentLoggedInUser) {
        deleteQuestBtn.classList.add('disabled');
      }
      getAnswer();
    }
  })
  .catch(error => new Error(error));

