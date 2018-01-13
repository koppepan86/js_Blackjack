"use strict"

//カードを管理するクラス
class Card{
    constructor(mark, num){
        /**
         * カードのマーク
         * @type {String}
         */
        this._mark = mark;
        /**
         * カードの数値
         * @type {number}
         */
        this._num = num;
    }

    get mark(){ return this._mark; }
    set mark(value){ this._mark = value; }
    get num(){ return this._num; }
    set num(value){ this._num = value; }

    get toString(){ return "mark :" + this.mark + ", num :" + this.num;}
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
            // console.log(this.cards[i].mark, this.cards[i].num);
        }
        console.log("reset");
    }

    draw(){
        let rand = Math.floor(Math.random() * this.cards.length);
        let card = this.cards[rand];
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
            //TODO:A エース の処理
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

        //各テキストのID取得
        this._dealerText = document.getElementById("dealer");
        this._playerText = document.getElementById("player");
        this._text = document.getElementById("text");

        this.updateWindow();
    }

    get deck(){ return this._deck; }
    get dealerHand(){ return this._dealerHand; }
    get playerHand(){ return this._playerHand; }

    get dealerText(){ return this._dealerText; }
    get playerText(){ return this._playerText; }
    get text(){ return this._text; }

    set dealerText(value){ this._dealerText.textContent = value; }
    set dealerTextAppend(value){ this._dealerText.textContent += value; }
    set playerText(value){ this._playerText.textContent = value; }
    set playerTextAppend(value){ this._playerText.textContent += value; }
    set text(value){ this._text.textContent = value; }

    /**
     * カードを分配する
     * @return {string}
     */
    hit(){
        this.playerHand.addCard(this.deck.draw());
        this.updateWindow();

        //21を超えたらbust(loss)
        if(this.playerHand.sum > 21){
            this.text = "bust";
            return "bust";
        }
        
        return "continue";
    }

    //勝負する
    //0: 敗北 1:勝利 -1: 引き分け
    stand(){
        //ディーラーが引いていく処理
        while(this.dealerHand.sum < 17){
            this.dealerHand.addCard(this.deck.draw());
            this.updateWindow();
        }

        //勝敗の決着
        if(this.playerHand.sum == this.dealerHand.sum){
            //TODO:ナチュラルブラックジャックの処理
            this.text = "draw";
            return "draw";
        }else if(this.playerHand.sum > this.dealerHand.sum || this.dealerHand.sum > 21){
            this.text = "win";
            return "win";
        }else{
            this.text = "loss";
            return "loss";
        }
    }

    //手札の合計点数をチェックする
    //hitの後に必ずチェックする
    //hitでいいのでは？
    check(){

    }


    //表示の更新
    updateWindow(){
        this.dealerText = " ";
        this.playerText = " ";
        for(let i = 0; i < this.dealerHand.cards.length; i++){
            this.dealerTextAppend = this.dealerHand.cards[i].mark;
            this.dealerTextAppend = this.dealerHand.cards[i].num + " ";
        }

        for(let i = 0; i < this.playerHand.cards.length; i++){
            this.playerTextAppend = this.playerHand.cards[i].mark;
            this.playerTextAppend = this.playerHand.cards[i].num + " ";
        }
    }
}

document.addEventListener("DOMContentLoaded", function(){
    let field = new Field();

    document.getElementById("hit").addEventListener("click", function(){
        field.hit();
    }, false);

    document.getElementById("stand").addEventListener("click", function(){
        field.stand();
    }, false);

}, false);

// (()=>{
//     console.log("test start");
//     //以下テスト用余白
//     let deck = new Deck();

//     let cards = deck.cards;
//     deck.setDefault();
//     let hand = new Hand();
//     hand.setDefault(deck.draw(), deck.draw());

//     //初期手札は問題ないか
//     console.log(hand.cards[0].mark, hand.cards[0].num);
//     console.log(hand.cards[1].mark, hand.cards[1].num);

//     //合計の計算は問題ないか
//     console.log(hand.sum);
// })();
