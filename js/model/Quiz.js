class Quiz extends EventTarget {
    constructor(vragen) {
        super();
        this.vragen=vragen;
        this.reset();
    }

    setVorigeVraag()
    {
        this.huidigePlek--;
        this._commit();
    }

    setVolgendeVraag()
    {
        this.huidigePlek++;
        this._commit();
    }

    setGegevenAntwoord(id)
    {
        this.mijnVragen[this.huidigePlek].setGegevenAntwoord(id);
        this._commit();
    }
    getMijnVragen() {
        return this.mijnVragen;
    }

    reset() {
        let vraagNummer=1;
        this.mijnVragen=[];
        this.vragen.forEach(
            vraag =>this.mijnVragen.push(new Vraag(vraagNummer++,vraag))
        );
        this.huidigePlek=0;
        this._commit();
    }

    _commit()
    {
        this.dispatchEvent(new MijnVragenEvent(this.mijnVragen,this.huidigePlek))
    }
}