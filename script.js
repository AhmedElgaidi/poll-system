const poll = {
    question: 'What is your age ? (A poll)',
    answers: [
        "20 years",
        "25 years",
        "30 years",
        "35 years"
    ],
    pollCount: 20,
    answersWeight: [4, 9, 1, 6],
    selectedAnswers: -1
};

let pollDOM = {
    question: document.querySelector('.poll .question'),
    answers: document.querySelector('.poll .answers')
};

pollDOM.question.innerText = poll.question;
pollDOM.answers.innerHTML = poll.answers.map((answer, idx) => {
    return (
    `
        <div class="answer" onClick="markAnswer('${idx}')">
            ${answer}
            <span class="percentage-bar"></span>
            <span class="percentage-value"></span>
        </div>
    `);
}).join('');

const markAnswer = i => {
    poll.selectedAnswers = +i;
    try {
        document.querySelector('.selected').classList.remove('selected');
    } catch(error) {
        document.querySelectorAll('.poll .answers .answer')[+i].classList.add('selected');
        showResults();
    }
};

const showResults = () => {
    let answers = document.querySelectorAll('.poll .answers .answer');
    for(let i=0; i<answers.length; i++) {
        let percentage = 0;
        if(i == poll.selectedAnswers) {
            percentage = Math.round(
                (poll.answersWeight[i] + 1) * 100 / (poll.pollCount + 1)
            );
        } else {
            percentage = Math.round(
                (poll.answersWeight[i]) * 100 / (poll.pollCount + 1)

            );
        }
        answers[i].querySelector('.percentage-bar').style.width = percentage + '%';
        answers[i].querySelector('.percentage-value').innerText = percentage + '%';
    } 
};