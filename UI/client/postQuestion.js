const url = '/api/v1/questions';
const btn = document.getElementById('btn');
const messageOutput = document.getElementById('messageOutput');
const usernameGreeting = document.getElementById('greeting-username');

usernameGreeting.innerHTML = localStorage.getItem('currentUser');

const postQuestion = (e) => {
  e.preventDefault();

  const questionTitle = document.getElementById('title').value;
  const questionContent = document.getElementById('content').value;
  const token = localStorage.getItem('x-auth-token');

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      questionTitle,
      questionContent,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        const err = new Error(response.statusText);
        return err;
      }
      return response.json();
    })
    .then((data) => {
      if (data.message === 'Unauthorized') {
        messageOutput.innerHTML = '<li>There was a problem posting your question</li>';
      } else {
        const messageInfo = `<ul>
                                <li>${data.message}</li>
                            </ul>`;
        messageOutput.innerHTML = messageInfo;
        setTimeout(() => {
          window.location.replace('recentquestions.html');
        }, 1000);
      }
    })
    .catch((error) => {
      throw error;
    });
};

btn.addEventListener('click', postQuestion);
