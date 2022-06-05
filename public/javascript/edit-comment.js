async function editFormHandler(event) {
    event.preventDefault();

    console.log('it entered the function for updating text')

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    const comment_text = document.querySelector('textarea[id="comment-text"]').value;

    console.log(comment_text);
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log(response)
        document.location.replace('/dashboard/');
    } else {
        console.log(response)
        alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-comment').addEventListener('click', editFormHandler);