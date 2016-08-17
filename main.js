var circle = new Circle();
var tempVar;
var whileBool = true;
var forCounter = 0;
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
commands.set("<", rotate2);
commands.set("&", toggleWhile);
commands.set("#", setForCounter);
commands.set("@", inputNum);


function interpret(source){
    let sourceSplit = source.split``;
    for(let char of sourceSplit){
        //While loops
        if(char === "["){
            var x = sourceSplit.splice(sourceSplit.indexOf("["), sourceSplit.indexOf("]"));
            x.shift();
            x.pop();
            while(whileBool){
                for(let char2 of x){
                    commands.get(char2)();
                }
            }
        }
        //For loops
        if(char === "{"){
            var x = sourceSplit.splice(sourceSplit.indexOf("{"), sourceSplit.indexOf("}"));
            x.shift();
            x.pop();
            for(;forCounter > 0; forCounter--){
                for(let char2 of x){
                    commands.get(char2)();
                }
            }
        }

        //Normal execution
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
function inputNum(){
    circle.push(Number(prompt()));
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
function rotate2(){
    circle.rotate2();
}
function add(){
    circle.push(circle.pop() + tempVar);
}
function subtract(){
    if(typeof Number(circle.peek()) !== "number" 
    && typeof Number(tempVar) !== "number")
    throw "attempted to preform subtraction on non-numbers";
    
    circle.push(circle.pop() - tempVar);//TODO: try this program: @^#@{-,} it gives wierd results
}
function multiply(){
    if(typeof Number(circle.peek()) !== "number" 
    && typeof Number(tempVar) !== "number")
    throw "attempted to preform multiplication on non-numbers";

    circle.push(circle.pop() * tempVar);

}
function divide(){
    if(typeof Number(circle.peek()) !== "number" 
    && typeof Number(tempVar) !== "number")
    throw "attempted to preform division on non-numbers";

    circle.push(circle.pop() / tempVar);
}
function toggleWhile(){
    whileBool = !whileBool;
}
function setForCounter(){
    forCounter = tempVar;
}