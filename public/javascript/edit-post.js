async function editFormHandler(event) {
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    const post_text = document.querySelector('textarea[id="post-text"]').value;

    console.log(post_text);
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-post').addEventListener('click', editFormHandler);