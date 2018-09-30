const commentBtn = document.getElementById('comment-answer-btn');
const commentMessageOutput = document.getElementById('comment-message-output');
const commentToken = localStorage.getItem('x-auth-token');
const { pathname } = new URL(window.location.href);
const currentQuestion = localStorage.getItem('currentQuestion');

const addComment = (e) => {
  let comment = document.getElementById('comment-answer');
  const commentUrl = `/api/v1${pathname}`;
  e.preventDefault();

  fetch(commentUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': commentToken,
    },
    body: JSON.stringify({
      comment: comment.value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return new Error(response.statusText);
      }
      return response.json();
    })
    .then((commentData) => {
      console.log(commentData);
      comment.value = '';
      commentMessageOutput.innerHTML = commentData.message;
      window.location.replace(currentQuestion);
    })
    .catch(error => new Error(error.message));
};

commentBtn.addEventListener('click', addComment);
