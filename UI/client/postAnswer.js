const answerBtn = document.getElementById('answer-btn');
const noOfAnswer = document.getElementById('number-of-answer');
const messageOutput = document.getElementById('message-output');
const answerContainer = document.getElementById('answer-container');


const accessToken = localStorage.getItem('x-auth-token');
const currentUser = localStorage.getItem('currentUser');
const { pathname } = new URL(window.location.href);
const answerUrl = `/api/v1${pathname}/answers`;

const getAnswer = () => {
  fetch(answerUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': accessToken,
    },
  })
    .then(response => response.json())
    .then((data) => {
      const numberOfAnswer = data.message.length;
      noOfAnswer.innerHTML = numberOfAnswer;
      for (let i = 0; i < data.message.length; i += 1) {
        let  { answernumber, username, answer, upvotes, downvotes, accepted } = data.message[i];
        const upvoteUrl = `/api/v1${pathname}/answers/${answernumber}/upvote`;
        const downvoteUrl = `/api/v1${pathname}/answers/${answernumber}/downvote`;
        const editAnswerUrl = `${pathname}/answers/${answernumber}`;

        const answerCard = `<div class="answers-by-others">
      <p id="username" class="name">${username}</p>
      <p class="answer-by-others-content">${answer}</p>
      <p><a id="visibility" href=${editAnswerUrl}>Edit Answer<a/></p>
      <p id="interactions"><a id="upvotes" href=${upvoteUrl}>upvote <span id="upvoteDisplay">${upvotes} </span></a><a id="downvotes" href=${downvoteUrl}> downvote <span id="downvoteDisplay">${downvotes} </span></a> <a id="preferred" href=>Mark as preferred <span id="markAnswerDisplay"> ${accepted} </span></a></p>
      </div>`;
        answerContainer.innerHTML += answerCard;
        let editBtnVisibility = document.getElementById('visibility');
        let answerAuthor = document.getElementById('username');
        if(currentUser !== answerAuthor.innerHTML) {
          editBtnVisibility.classList.add('disabled');
        }
      }
    })
    .catch(error => new Error(error));
};

const postAnswer = (e) => {
  const answer = document.getElementById('question-answer');

  e.preventDefault();

  fetch(answerUrl, {
    method: 'POST',
    body: JSON.stringify({
      answer: answer.value,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': accessToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        return error;
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        answer.value = '';
        messageOutput.innerHTML = data.message;
        setTimeout(() => {
          getAnswer();
          messageOutput.innerHTML = '';
          window.location.reload();
        }, 500);
      }
    })
    .catch((error) => {
      const err = new Error(error);
      return err;
    });
};


answerBtn.addEventListener('click', postAnswer);
