window.onload = () => {
  const upvotes = document.querySelectorAll('a#upvotes');
  const downvotes = document.querySelectorAll('a#downvotes');
  const preferredAnswer = document.querySelectorAll('a#preferred');


  upvotes.forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();

      const upvoteDisplay = link.childNodes[1];
      const { pathname } = link;
      const accessVoteToken = localStorage.getItem('x-auth-token');

      fetch(pathname, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': accessVoteToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return new Error(response.statusText);
          }
          return response.json();
        })
        .then((totalUpvotes) => {
          upvoteDisplay.innerHTML = totalUpvotes[0].upvotes;
        })
        .catch(error => new Error(error));
    };
  });

  downvotes.forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();

      const downvoteDisplay = link.childNodes[1];
      const { pathname } = link;
      const accessDownvoteToken = localStorage.getItem('x-auth-token');

      fetch(pathname, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': accessDownvoteToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return new Error(response.statusText);
          }
          return response.json();
        })
        .then((totalDownvotes) => {
        })
        .catch(error => new Error(error));
    };
  });
};
