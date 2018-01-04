"use strict"

class Card{
    constructor(mark, num){
        this._mark = mark;
        this._num = num;
    }

    get mark(){ return this._mark; }
    set mark(value){ this._mark = value; }
    get num(){ return this._num; }
    set num(value){ this._num = value; }

    get log(){ console.log("mark :" + this.mark + ", num :" + this.num);
    }
}

class Deck{
    constructor(){
        this._cards = new Array(52);
    }

    get cards(){ return this._cards; }
    set cards(value){ this._cards = value; }

    reset(){
        this.cards = new Array(52); 
        for(let i = 0; i < this.cards.length; i++){
            let mark;
            switch(Math.floor(i / 13)){
                case 0:
                    mark = "♡";
                    break;
                case 1:
                    mark = "♢";
                    break;
                case 2:
                    mark = "♧";
                    break;
                case 3:
                    mark = "♤";
                    break;
            }
            this.cards[i] = new Card(mark, i % 13 + 1);
            console.log(this.cards[i].mark, this.cards[i].num);
        }
        console.log("reset");
    }

    draw(){
        let rand = Math.floor(Math.random() * cards.length);
        let card = cards[rand];
        cards.splice(rand, 1);
    }
}

let deck = new Deck();

let cards = deck.cards;
deck.reset();


