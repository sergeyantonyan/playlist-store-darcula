let p = new Promise(function (resolve) {
    setTimeout(function () {
        resolve("resolved");
    },0);
});
p.then(function (d){
    console.log(d);
});
