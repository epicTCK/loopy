var circle = new Circle();
var tempVar;
function interpret(source){

}
function popToTemp(){
    tempVar = circle.pop();
}
function pushTemp(){
    circle.push(tempVar);
}
function pop(){
    circle.pop();
}
function input(){
    circle.push(prompt());//TODO: prompt is not the best way to get input, what other way?
}
function popPrint(){
    console.log(circle.pop());
}
function print(){
    console.log(circle.peek());
}
function peekToTemp(){
    tempVar = circle.peek();
}