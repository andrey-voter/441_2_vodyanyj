// ������� ������, ����� ������� ���� �������
const app = {};

// �������� �������� ������� � ��������� ������
app.sendQuestion = function (text, question) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`����� �� ������: ${question}`);
        }, 1000);
    });
};

// ������� ���������� �������
app.addQuestion = function () {
    const textInput = document.getElementById('textInput');
    const questionInput = document.getElementById('questionInput');
    const qaList = document.getElementById('qaList');

    const text = textInput.value.trim();
    const question = questionInput.value.trim();

    if (!text || !question) {
        alert('����������, ������� ����� � ������.');
        return;
    }

    app.sendQuestion(text, question)
        .then(answer => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${question}</strong>: ${answer}`;
            qaList.appendChild(listItem);

            textInput.value = '';
            questionInput.value = '';
        })
        .catch(error => {
            console.error('��������� ������:', error);
            alert('��������� ������ ��� �������� �������.');
        });
};

// ������� ��������� �������
app.getAnswers = function () {
    const textInput = document.getElementById('textInput');
    const answersList = document.getElementById('answersList');

    const text = textInput.value.trim();

    if (!text) {
        alert('����������, ������� �����.');
        return;
    }

    answersList.innerHTML = '';

    const questions = Array.from(document.getElementById('qaList').getElementsByTagName('strong')).map(q => q.innerText);
    Promise.all(questions.map(question => app.sendQuestion(text, question)))
        .then(answers => {
            answers.forEach((answer, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${questions[index]}</strong>: ${answer}`;
                answersList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('��������� ������:', error);
            alert('��������� ������ ��� ��������� �������.');
        });
};
