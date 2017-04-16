class Circle extends Array {
    constructor() {
        super();
    }
    rotate() {
        this.push(this.shift());
    }
    rotate2() {
        this.unshift(this.pop());
    }
    peek() {
        let x = this.pop();
        this.push(x);
        return x;
    }
}
//experimental VV
/*
class IntegerType extends Circle {
    constructor(n) {
        super();
        this.type = "integer";
        let x = n + "";
        for (let i of x) {
            this.push(new DidgetType(parseInt(i)));
        }
    }
    plainType() {
        //copy this object so we don't modify the original objet
        let x = [];
        for (let i in this) {
            x.push(i.plainType());
        }
        return parseInt(x.join(""));
    }
}
class DidgetType extends Circle {
    constructor(n) {
        super();
        this.type = "didget";
        for (let i of[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
            this.push(i);
        }
        while (!this.peek() != n) {
            this.rotate();
        }
    }
    plainType() {
        return this.peek();
    }
}
class StringType extends Circle{
    constructor(n){
        super();
        this.type = 
        for(let i of n){
            this.push(new CharType(i));
        }
    }
    plainType(){
        let x = [];
        for(let a of this){
            x.push(a.plainType());
        }
        return(x.join(""));
    }
}
class CharType extends Circle{
    constructor(n){
        super();
        this.type = "didget";
        for (let i of ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~') {
            this.push(i);
        }
        while (!this.peek() != n) {
            this.rotate();
        }
    }
    plainType(){
        return this.peek();
    }
}
*/