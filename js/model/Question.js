class Question {
    constructor(id, vraagJSON) {
        this.id = id;
        this.vraagJSON = vraagJSON;
        this.givenAnswer = -1;
    }

    getQuestionID() {
        return this.id;
    }

    getQuestion() {
        return this.vraagJSON.question;
    }

    getOptions() {
        return [this.vraagJSON.option1, this.vraagJSON.option2, this.vraagJSON.option3, this.vraagJSON.option4];
    }

    getCorrectAnswerFull() {
        let juisteAntwoord;
        switch (this.vraagJSON.answer) {
            case 1: juisteAntwoord = this.vraagJSON.option1;
                break;
            case 2: juisteAntwoord = this.vraagJSON.option2;
                break;
            case 3: juisteAntwoord = this.vraagJSON.option3;
                break;
            case 4: juisteAntwoord = this.vraagJSON.option4;
                break;
        }
        return juisteAntwoord;
    }

    getGivenAnswerFull() {
        let givenAnswer;
        switch (parseInt(this.givenAnswer)) {
            case 1: givenAnswer = this.vraagJSON.option1;
                break;
            case 2: givenAnswer = this.vraagJSON.option2;
                break;
            case 3: givenAnswer = this.vraagJSON.option3;
                break;
            case 4: givenAnswer = this.vraagJSON.option4;
                break;
        }
        return givenAnswer;

    }

    getGivenAnswer() {
        return this.givenAnswer;
    }

    setGivenAnswer(givenAnswer) {
        this.givenAnswer = givenAnswer.charAt(3);
    }

    isCorrect() {
        if (this.vraagJSON.answer == this.givenAnswer) {
            return "goed";
        }
        return "fout";
    }
}