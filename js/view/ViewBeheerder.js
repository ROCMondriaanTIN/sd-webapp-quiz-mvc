class ViewBeheerder {
    constructor(model) {
        this.model=model;
        this.model.addEventListener(MijnVragenEvent.CHANGED, this.onMijnVragenChanged);
    }

    getElement(selector) {
        const element = document.querySelector(selector);

        return element
    }

    onMijnVragenChanged = event => {
        this.toonVraag(event.mijnVragen[event.huidige]);
        this.toonNavigatie(event.mijnVragen[event.huidige], event.mijnVragen);
    };

    bindVolgendeVraagButton(handler) {
        this.volgende = this.getElement("#volgende");
        this.volgende.addEventListener('click', event => {
           handler();
        })
    }

    bindVorigeVraagButton(handler) {
        this.volgende = this.getElement("#vorige");
        this.volgende.addEventListener('click', event => {
            handler();
        })
    }

    bindKeuzeButton(handler) {
        this.keuzes = document.querySelectorAll("#btn1, #btn2, #btn3, #btn4");
        this.keuzes.forEach(element => element.addEventListener('click', event => {

            handler(element.id);
        }))
    }

    bindInleverButton(handler) {
        this.inleveren = this.getElement("#inleveren");
        this.inleveren.addEventListener('click', event => {
            handler();
        })
    }


    toonVraag(deVraag) {
        const vraag=this.getElement('#vraag');
        vraag.innerHTML=deVraag.getVraagNummer()+" "+deVraag.getVraag();

        this.getElement('#option1').innerHTML=deVraag.getKeuzes()[0];
        this.getElement('#option2').innerHTML=deVraag.getKeuzes()[1];
        this.getElement('#option3').innerHTML=deVraag.getKeuzes()[2];
        this.getElement('#option4').innerHTML=deVraag.getKeuzes()[3];

        this.getElement('#btn1').setAttribute('style','background-color:#e6f3ff');
        this.getElement('#btn2').setAttribute('style','background-color:#e6f3ff');
        this.getElement('#btn3').setAttribute('style','background-color:#e6f3ff');
        this.getElement('#btn4').setAttribute('style','background-color:#e6f3ff');


        if(deVraag.getGegevenAntwoord()!=-1){
            let id='#btn'+deVraag.getGegevenAntwoord();
            this.getElement(id).setAttribute('style','background-color:#99ceff')
        }

    }

    toonNavigatie(huidigeVraag, mijnVragen) {

            if(huidigeVraag.getVraagNummer()>1)
            {
                this.getElement('#vorige').setAttribute('style','display:block');
            }
            else
            {
                this.getElement('#vorige').setAttribute('style','display:none');
            }

            if(huidigeVraag.getVraagNummer()<mijnVragen.length)
            {
                this.getElement('#volgende').setAttribute('style','display:block');
            }
            else
            {
                this.getElement('#volgende').setAttribute('style','display:none');
            }

            mijnVragen.forEach(vraag =>
            {
                if(vraag.getVraagNummer()===huidigeVraag.getVraagNummer())
                {
                    this.getElement('#no'+huidigeVraag.getVraagNummer()).style['border']= '3px solid orange';
                }
                else
                {
                    this.getElement('#no'+vraag.getVraagNummer()).style['border']= '1.5px solid  lightskyblue';
                }
            });

            mijnVragen.forEach(vraag => {
                if (vraag.getGegevenAntwoord()!==-1)
                {
                    this.getElement('#no'+vraag.getVraagNummer()).style['background-color']='green';
                }
                else
                {
                    this.getElement('#no'+vraag.getVraagNummer()).style['background-color']='#8c8c8c';
                }
            });
            let aantalIngevuld=0;
            mijnVragen.forEach(vraag => {

                if (vraag.getGegevenAntwoord()!==-1)
                {
                    aantalIngevuld++;
                }
            });
            if(aantalIngevuld===parseInt(mijnVragen.length))
            {
                this.getElement('#inleveren').style['display']='block';
            }
            else
            {
                this.getElement('#inleveren').style['display']='none';
            }
    }


    toonResultaten(mijnQuiz) {
        console.log("toonResultaten");
        let deVragen=mijnQuiz.getMijnVragen();
        let contentHTML = this.getElement("#content");
        contentHTML.style['display']='none';

        let resultaat = this.getElement("#resultaat");
        resultaat.style['display']='block';

        let table = document.createElement("table");
        table.style.width = '100%';
        table.setAttribute('border', '1px solid black');

        let thead = table.createTHead();
        let row=thead.insertRow();

        let heads=["nummer","vraag","jouw antwoord", "juiste antwoord","oordeel"];
        for (let head in heads)
        {
            let th=document.createElement("th");
            let text =document.createTextNode(heads[head]);
            th.appendChild(text);
            row.appendChild(th);
        }

        for (let vraag in deVragen)
        {
            let row=table.insertRow();

            let cell=row.insertCell();
            let text=document.createTextNode(deVragen[vraag].getVraagNummer());
            cell.appendChild(text);

            cell=row.insertCell();
            text=document.createTextNode(deVragen[vraag].getVraag());
            cell.appendChild(text);

            cell=row.insertCell();
            text=document.createTextNode(deVragen[vraag].getGegevenAntwoordVolledig());
            cell.appendChild(text);

            cell=row.insertCell();
            text=document.createTextNode(deVragen[vraag].getJuisteAntwoordVolledig());
            cell.appendChild(text);

            cell=row.insertCell();
            text=document.createTextNode(deVragen[vraag].isGoed());
            cell.appendChild(text);

            if(deVragen[vraag].isGoed()==="goed")
            {
                row.style['background-color']='green';
            }
            else
            {
                row.style['background-color']='red';
            }
        }
        resultaat.appendChild(table);
        let clickMeButton = document.createElement('button');
        clickMeButton.id = 'start';
        clickMeButton.innerHTML = 'Nog een keer';
        clickMeButton.addEventListener('click', event =>
        {
            mijnQuiz.reset();
            console.log(mijnQuiz.getMijnVragen());
            resultaat.removeChild(table);
            resultaat.removeChild(clickMeButton);
            resultaat.style['display']='none';
            contentHTML.style['display']='grid';
        });
        resultaat.appendChild(clickMeButton);
    }
}
