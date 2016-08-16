class Circle extends Array {
    constructor(){
     super();
    }
    rotate(){
        this.push(this.shift());
    }
    peek(){
        let x = this.pop();
        this.push(x);
        return x;
    }
}