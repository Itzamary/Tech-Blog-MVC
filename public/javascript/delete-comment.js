async function deleteformHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    const response = await fetch(`/api/comments/${id}`, {
        method:'DELETE'
    });
    console.log(response, 'finished')

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-comment-btn').addEventListener('click', deleteformHandler);