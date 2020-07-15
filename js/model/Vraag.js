class Vraag {
    constructor(vraagNummer,vraagJSON) {
        this.vraagNummer=vraagNummer;
        this.vraagJSON=vraagJSON;
        this.gegevenAntwoord=-1;
    }

    getVraagNummer()
    {
        return this.vraagNummer;
    }
    getVraag() {
        return this.vraagJSON.question;
    }

    getKeuzes() {
        return [this.vraagJSON.option1,this.vraagJSON.option2,this.vraagJSON.option3,this.vraagJSON.option4];
    }

    getJuisteAntwoordVolledig() {
        let juisteAntwoord;
        switch(this.vraagJSON.answer)
        {
            case 1: juisteAntwoord=this.vraagJSON.option1;
                break;
            case 2: juisteAntwoord=this.vraagJSON.option2;
                break;
            case 3: juisteAntwoord=this.vraagJSON.option3;
                break;
            case 4: juisteAntwoord=this.vraagJSON.option4;
                break;
        }
        return juisteAntwoord;
    }

    getGegevenAntwoordVolledig() {
        let gegevenAntwoord;
        switch(parseInt(this.gegevenAntwoord))
        {
            case 1: gegevenAntwoord=this.vraagJSON.option1;
                break;
            case 2: gegevenAntwoord=this.vraagJSON.option2;
                break;
            case 3: gegevenAntwoord=this.vraagJSON.option3;
                break;
            case 4: gegevenAntwoord=this.vraagJSON.option4;
                break;
        }
        return gegevenAntwoord;

    }

    getGegevenAntwoord() {
        return this.gegevenAntwoord;
    }

    setGegevenAntwoord(gegevenAntwoord) {
        this.gegevenAntwoord=gegevenAntwoord.charAt(3);
    }

    isGoed() {
        if(this.vraagJSON.answer==this.gegevenAntwoord)
        {
            return "goed";
        }
        return "fout";
    }
}