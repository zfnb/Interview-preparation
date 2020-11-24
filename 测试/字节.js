setTimeout(function () {
    console.log("1");
    new Promise(function (resolve) {
        resolve();
    }).then(function () {
        new Promise(function (resolve) {
            resolve();
        }).then(function () {
            console.log("2");
        });
        console.log("3");
    });
}, 0);

new Promise(function (resolve) {
    console.log("4");
    resolve();
}).then(function () {
    console.log("5");
});

setTimeout(function () {
    console.log("6");
}, 0);
console.log("7");
// 4 7  5 1 3 2 6