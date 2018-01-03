"use strict"

class Card{
    constructor(mark, num){
        this._mark = mark;
        this._num = num;
        console.log("Test");
    }

    get mark(){
        return this._mark;
    }

    set mark(value){
        this._mark = value;
    }
}