class Circle extends Array.prototype {
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