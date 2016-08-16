class Circle extends Array.prototype {
    constructor(){
     super();
    }
    rotate(){
        this.push(this.shift());
    }
}