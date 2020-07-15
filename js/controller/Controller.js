class Controller {
    constructor() {
        this.mijnQuiz = new Quiz(vragen);
        this.mijnView = new ViewBeheerder(this.mijnQuiz);

        // Koppel de handlers aan de buttons
        this.mijnView.bindVolgendeVraagButton(this.handleVolgendeVraag);
        this.mijnView.bindVorigeVraagButton(this.handleVorigeVraag);
        this.mijnView.bindKeuzeButton(this.handleKeuze);
        this.mijnView.bindInleverButton(this.handleInleveren);

        // Display eerste vraag
        this.mijnQuiz._commit();
    }

    handleVolgendeVraag = () => {

       this.mijnQuiz.setVolgendeVraag();
    };

    handleVorigeVraag = () => {

        this.mijnQuiz.setVorigeVraag();
    };

    handleKeuze = (id) => {

       this.mijnQuiz.setGegevenAntwoord(id)
    };

    handleInleveren = () => {
       this.mijnView.toonResultaten(this.mijnQuiz);
    };
}
