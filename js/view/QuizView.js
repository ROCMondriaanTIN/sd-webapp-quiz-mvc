class QuizView {
    constructor(model) {
        this.model = model;
        this.model.addEventListener(QuizEvent.CHANGED, this.onQuestionsChanged);
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element
    }

    onQuestionsChanged = event => {
        this.showQuestion(event.questions[event.current]);
        this.showNav(event.questions[event.current], event.questions);
    };

    bindNextQuestionButton(handler) {
        this.next = this.getElement("#volgende");
        this.next.addEventListener('click', event => {
            handler();
        })
    }

    bindPreviousQuestionButton(handler) {
        this.next = this.getElement("#vorige");
        this.next.addEventListener('click', event => {
            handler();
        })
    }

    bindChoiceButton(handler) {
        this.choices = document.querySelectorAll("#btn1, #btn2, #btn3, #btn4");
        this.choices.forEach(element => element.addEventListener('click', event => {

            handler(element.id);
        }))
    }

    bindSubmitButton(handler) {
        this.submit = this.getElement("#inleveren");
        this.submit.addEventListener('click', event => {
            handler();
        })
    }


    showQuestion(currentQuestion) {
        const question = this.getElement('#vraag');
        question.innerHTML = currentQuestion.getQuestionID() + ". " + currentQuestion.getQuestion();

        this.getElement('#option1').innerHTML = currentQuestion.getOptions()[0];
        this.getElement('#option2').innerHTML = currentQuestion.getOptions()[1];
        this.getElement('#option3').innerHTML = currentQuestion.getOptions()[2];
        this.getElement('#option4').innerHTML = currentQuestion.getOptions()[3];

        this.getElement('#btn1').setAttribute('style', 'background-color:#e6f3ff');
        this.getElement('#btn2').setAttribute('style', 'background-color:#e6f3ff');
        this.getElement('#btn3').setAttribute('style', 'background-color:#e6f3ff');
        this.getElement('#btn4').setAttribute('style', 'background-color:#e6f3ff');


        if (currentQuestion.getGivenAnswer() != -1) {
            let id = '#btn' + currentQuestion.getGivenAnswer();
            this.getElement(id).setAttribute('style', 'background-color:#99ceff')
        }

    }

    showNav(currentQuestion, questions) {

        if (currentQuestion.getQuestionID() > 1) {
            this.getElement('#vorige').setAttribute('style', 'display:block');
        }
        else {
            this.getElement('#vorige').setAttribute('style', 'display:none');
        }

        if (currentQuestion.getQuestionID() < questions.length) {
            this.getElement('#volgende').setAttribute('style', 'display:block');
        }
        else {
            this.getElement('#volgende').setAttribute('style', 'display:none');
        }

        questions.forEach(vraag => {
            if (vraag.getQuestionID() === currentQuestion.getQuestionID()) {
                this.getElement('#no' + currentQuestion.getQuestionID()).style['border'] = '3px solid orange';
            }
            else {
                this.getElement('#no' + vraag.getQuestionID()).style['border'] = '1.5px solid  lightskyblue';
            }
        });

        questions.forEach(vraag => {
            if (vraag.getGivenAnswer() !== -1) {
                this.getElement('#no' + vraag.getQuestionID()).style['background-color'] = 'green';
            }
            else {
                this.getElement('#no' + vraag.getQuestionID()).style['background-color'] = '#8c8c8c';
            }
        });
        let aantalIngevuld = 0;
        questions.forEach(vraag => {

            if (vraag.getGivenAnswer() !== -1) {
                aantalIngevuld++;
            }
        });
        if (aantalIngevuld === parseInt(questions.length)) {
            this.getElement('#inleveren').style['display'] = 'block';
        }
        else {
            this.getElement('#inleveren').style['display'] = 'none';
        }
    }


    showResult(quiz) {
        console.log("toonResultaten");
        let questions = quiz.getQuestions();
        let contentHTML = this.getElement("#content");
        contentHTML.style['display'] = 'none';

        let result = this.getElement("#resultaat");
        result.style['display'] = 'block';

        let table = document.createElement("table");
        table.style.width = '100%';
        table.setAttribute('border', '1px solid black');

        let thead = table.createTHead();
        let row = thead.insertRow();

        let heads = ["nummer", "vraag", "jouw antwoord", "juiste antwoord", "oordeel"];
        for (let head in heads) {
            let th = document.createElement("th");
            let text = document.createTextNode(heads[head]);
            th.appendChild(text);
            row.appendChild(th);
        }

        for (let question in questions) {
            let row = table.insertRow();

            let cell = row.insertCell();
            let text = document.createTextNode(questions[question].getQuestionID());
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(questions[question].getQuestion());
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(questions[question].getGivenAnswerFull());
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(questions[question].getCorrectAnswerFull());
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(questions[question].isCorrect());
            cell.appendChild(text);

            if (questions[question].isCorrect() === "goed") {
                row.style['background-color'] = 'green';
            }
            else {
                row.style['background-color'] = 'red';
            }
        }
        result.appendChild(table);
        let playAgainButton = document.createElement('button');
        playAgainButton.id = 'start';
        playAgainButton.innerHTML = 'Nog een keer';
        playAgainButton.addEventListener('click', event => {
            quiz.reset();
            console.log(quiz.getQuestions());
            result.removeChild(table);
            result.removeChild(playAgainButton);
            result.style['display'] = 'none';
            contentHTML.style['display'] = 'grid';
        });
        resultaat.appendChild(playAgainButton);
    }
}
