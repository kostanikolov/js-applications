var x = 0;

function f() {
    var x = y = 1;
    console.log("Inside x:", x);
}
f();

console.log("Outside x:", x, y);    
