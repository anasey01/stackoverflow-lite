const deleteModal = document.getElementById('deleteModal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const modalHeader = document.getElementById('modalHeader');
const modalText = document.getElementById('modalText');
const okBtn = document.createElement('button');
const cancelBtn = document.createElement('button');
const deleteQuestionBtn = document.getElementById('deleteQuestion');
const currentQuestionPath = localStorage.getItem('currentQuestion');
const accessTokenForDelete = localStorage.getItem('x-auth-token');


const deleteQuestion = () => {
  const deleteQuestionUrl = `/api/v1${currentQuestionPath}`;

  fetch(deleteQuestionUrl, {
    method: 'DELETE',
    headers: {
      'x-auth-token': accessTokenForDelete,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return new Error(response.statusText);
      }
      return response.json();
    })
    .then((message) => {
      setTimeout(() => {
        window.location.replace('/');
      }, 500);
    });
};

const displayModal = () => {
  deleteModal.style.display = 'block';
  modalHeader.innerHTML = 'DELETE QUESTION';
  modalText.innerHTML = 'Question Will Be Lost PERMANENTLY';
  okBtn.innerHTML = 'OK';
  cancelBtn.innerHTML = 'Cancel';
  modalContent.appendChild(okBtn);
  modalContent.appendChild(cancelBtn);
  closeModal.onclick = () => {
    deleteModal.style.display = 'none';
  };
  window.onclick = (e) => {
    if (e.target === deleteModal) {
      deleteModal.style.display = 'none';
    }
  };
  okBtn.onclick = () => {
    deleteQuestion();
  };
  cancelBtn.onclick = () => {
    window.location.reload();
  };
};

const confirmDelete = (e) => {
  e.preventDefault();
  displayModal();
};

deleteQuestionBtn.addEventListener('click', confirmDelete);
