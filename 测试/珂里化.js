function curry(func, ...args) {
    const arity = func.length;
    if (args.length >= arity) {
        func.apply(this, args);
    } else {
        return (...args1) => {
            const total = [...args, ...args1];
            curry(func, ...total);
        };
    }
}
function test(a, b, c, d, e) {
    console.log(a, b, c, d, e);
}
const a = curry(test, 3, 5, 8, 1);
a(45);