const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');
const logoutBtn = document.getElementById('logout');
const anchorTags = document.querySelectorAll('h3>a');
const sidebar = document.querySelectorAll('aside>nav>ul>li>a');

console.log(anchorTags);
console.log(sidebar);

const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/questions';

const token = localStorage.getItem('x-auth-token');

const main = () => {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        const error = new Error('error');
        return error;
      }
      return response.json();
    })
    .then((data) => {
      if (data.success !== false) {
        console.log(data);
        const questionLength = data.length;
        for (let i = questionLength; i >= 0; i -= 1) {
          console.log(`Single Question - ${i}`, data[i]);
          `<div class="question-summary">
            <div class="summary">
                <h3><a href="./viewQuestion.html">${data[i].questionTitle}</a></h3>
            </div>
            <div class="asked-by">
              <span class="number-of-answers">${data[i].noOfAnswer} <span>answer</span></span>
              <a class="asked-by-time">${data[i].createdat}</a>
              <a class="asked-by-author" href="#">${data[i].username}</a>
            </div>
          </div>`;
        }
      }
    });
};

if (token) {
  loginBtn.classList.add('disabled');
  signupBtn.classList.add('disabled');
  logoutBtn.classList.add('enabled');

  main();
} else {
  // Add a click eventListner to all anchor tags
  anchorTags.forEach((tag) => {

  });
  // on click, redirect to login page
  main();
}
