async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;
  
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response, 'responses')
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };

  function unhideForm(event) {
      event.preventDefault();
      document.querySelector('.new-post-form').style.display = "block";
  };
  
  document.querySelector('#btn').addEventListener('click', newFormHandler);
  document.querySelector('.new-form').addEventListener('click', unhideForm);