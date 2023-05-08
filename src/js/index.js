window.onload = function(){
    console.log("Hello, World!");

    let reg = new Array();
    reg[0] = new Register();
    reg[1] = new Register();

    reg[0].userAddress = "asdf";
    reg.forEach(r => {
        document.querySelector("div.category").appendChild(r.element);
    });
}