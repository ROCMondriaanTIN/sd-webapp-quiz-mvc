class MijnVragenEvent extends Event {
    static CHANGED = "mijnVragenChanged";

    constructor(mijnVragen,huidige) {
        super(MijnVragenEvent.CHANGED);
        this.mijnVragen = mijnVragen;
        this.huidige=huidige;
    }
}