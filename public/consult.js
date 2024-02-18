const sbutton = document.getElementById('inputBttn');

sbutton.addEventListener('click', () => {
    // event.preventDefault(); // Prevent default form submission
    const promptEle = document.getElementById('input-prompt');
    const prompt = promptEle.value;
    document.getElementById('question').innerText = `Q. ${prompt}`;
    promptEle.value= "";
    console.log(prompt);
    fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({prompt})
        })
        .then(response => response.json()) 
        .then(data => {
            document.getElementById('prompt-ans').innerText = data;
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
})