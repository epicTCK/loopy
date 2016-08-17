var circle = new Circle();
var tempVar;
var commands = new Map();
commands.set("^", popToTemp);
commands.set("_", pushTemp);
commands.set("!", pop);
commands.set("?", input);
commands.set(".", popPrint);
commands.set(",", print);
commands.set(":", peekToTemp);
commands.set(">", rotate);
commands.set("+", add);
commands.set("-", subtract);
commands.set("*", multiply);
commands.set("/", divide);


function interpret(source){
    for(let char of source.split``){
        commands.get(char)();
    }
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
function rotate(){
    circle.rotate();
}
function add(){
    circle.push(circle.pop() + tempVar);
}
function subtract(){
    if(typeof circle.peek !== "number" 
    && typeof tempVar !== "number")
    throw "attempted to preform subtraction on non-numbers";
    
    circle.push(circle.pop() - tempVar);
}
function multiply(){
    if(typeof circle.peek !== "number" 
    && typeof tempVar !== "number")
    throw "attempted to preform multiplication on non-numbers";

    circle.push(circle.pop() * tempVar);

}
function divide(){
    if(typeof circle.peek !== "number" 
    && typeof tempVar !== "number")
    throw "attempted to preform division on non-numbers";

    circle.push(circle.pop() / tempVar);
}