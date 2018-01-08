"use strict"

//カードを管理するクラス
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

//デッキを管理するクラス
class Deck{
    constructor(){
        this._cards = new Array(52);
    }

    get cards(){ return this._cards; }
    set cards(value){ this._cards = value; }

    setDefault(){
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
        let rand = Math.floor(Math.random() * this.cards.length);
        let card = this.cards[rand];
        // console.log(card.mark);
        // console.log(this.cards.splice(rand, 1).mark);
        this.cards.splice(rand, 1);
        return card;
    }
}

//手札を管理するクラス
class Hand{
    constructor(){
        this._cards = new Array(2);
    }

    get cards(){ return this._cards; }
    set cards(value){ this._cards = value; }

    //手札の合計値を返す
    get sum(){
        let cardsSum = 0;
        for(let temp of this.cards){
            //TODO:Aの処理
            if(temp.num >= 11){
                cardsSum += 10;
            }else{
                cardsSum += temp.num;
            }
        }
        return cardsSum;
     }

    setDefault(first, second){
        this.cards = new Array(2);
        this.cards[0] = first;
        this.cards[1] = second;
    }

    addCard(add){
        this.cards.push(add);
    }
}

//場を管理するクラス
class Field{
    constructor(){
        //場の手札とデッキの初期化
        this._deck = new Deck();
        this._deck.setDefault();
        this._dealerHand = new Hand();
        this._dealerHand.setDefault(this._deck.draw(), this._deck.draw());
        this._playerHand = new Hand();
        this._playerHand.setDefault(this._deck.draw(), this._deck.draw());

        //各ボタンのID取得
        document.getElementById("");
    }

    get deck(){ return this._deck; }
    get dealerHand(){ return this._dealerHand; }
    get playerHand(){ return this._playerHand; }

    //カードを一枚引く
    hit(){

    }

    //勝負する
    //0: 敗北 1:勝利 -1: 引き分け
    stand(){
        if(this.dealerHand > this.playerHand){
            return 0;
        }else if(this.dealerHand < this.playerHand){
            return 1;
        }else{
            return -1;
        }
    }

    //手札の合計点数をチェックする
    check(){

    }
}

let field = new Field();

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("btn").addEventListener("click", function(){
        window.alert("on click");
    }, false);
}, false);

(()=>{
    //以下テスト用余白
    let deck = new Deck();

    let cards = deck.cards;
    deck.setDefault();
    let hand = new Hand();
    hand.setDefault(deck.draw(), deck.draw());

    //初期手札は問題ないか
    console.log(hand.cards[0].mark, hand.cards[0].num);
    console.log(hand.cards[1].mark, hand.cards[1].num);

    //合計の計算は問題ないか
    console.log(hand.sum);
})();
