window.onload = function() {
    const tableBody = document.getElementById('questionnaire').getElementsByTagName('tbody')[0];
    let questionCount = 0;

    for (let topicIndex in questions.differences) {
        let topic = questions.differences[topicIndex];
        let topicHeaderRow = document.createElement('tr');
        topicHeaderRow.innerHTML = `<th colspan="6" style="text-align:left">${topic.topic}</th>`;
        tableBody.appendChild(topicHeaderRow);

        for (let questionIndex in topic.questions) {
            let item = topic.questions[questionIndex];
            let row = document.createElement('tr');
            row.innerHTML = `
                <td title="${item.reason}">${item.question}</td>
                <td><input type="radio" name="question${questionCount}" value="1"></td>
                <td><input type="radio" name="question${questionCount}" value="2"></td>
                <td><input type="radio" name="question${questionCount}" value="3"></td>
                <td><input type="radio" name="question${questionCount}" value="4"></td>
                <td><input type="radio" name="question${questionCount}" value="5"></td>
            `;
            tableBody.appendChild(row);
            questionCount++;
        }
    }
}



function submitAnswers() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        alert('Please enter your name and email');
        return;
    }

    let responses = [];
    for (let i = 0; i < questionsData.length; i++) {
        let response = document.querySelector(`input[name="question${i}"]:checked`).value;
        responses.push({ question: questionsData[i].question, response: response });
    }

    const data = {
        name: name,
        email: email,
        responses: responses
    };

    fetch('<YOUR_AZURE_FUNCTION_URL>', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Your responses have been submitted successfully. Thank you!');
        } else {
            throw new Error('Failed to submit responses: ' + response.status);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting your responses. Please try again.');
    });
}


document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Prevent the form from being submitted which would refresh the page
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    // Perform additional client-side validation if needed

    alert(`Form submitted successfully!\nName: ${name}\nEmail: ${email}`);
});
