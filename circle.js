class Circle extends Array {
    constructor(){
     super();
    }
    rotate(){
        this.push(this.shift());
    }
    rotate2(){
        this.unshift(this.pop());
    }
    peek(){
        let x = this.pop();
        this.push(x);
        return x;
    }
}