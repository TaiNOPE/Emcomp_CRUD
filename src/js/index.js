let form;
let btnRegister;
let inputName;
let inputAddress;
let inputPhone;
let inputEmail;
let inputIdNumber;
let inputPassword;
let inputRepeatPassword;
let inputAccountType;
let registers = new Array();
let registerContainer;

window.onload = function(){    
    registerContainer   =   document.querySelector("div#registersContainer");
    form                =   document.querySelector("form#registerForm"); 
    btnRegister         =   form.querySelector("input[name='register']");
    inputName           =   form.querySelector("input[name='name']");
    inputAddress        =   form.querySelector("input[name='address']");
    inputPhone          =   form.querySelector("input[name='phone']");
    inputEmail          =   form.querySelector("input[name='email']");
    inputIdNumber       =   form.querySelector("input[name='idNumber']");
    inputPassword       =   form.querySelector("input[name='password']");
    inputRepeatPassword =   form.querySelector("input[name='repeatPassword']");
    
    if(!Database.isEmpty){
        let registers = Database.loadRegisters();
        registers.forEach(reg => {
            let tempReg = createRegister();
            let id = registers.length;
            tempReg.importFromJSON(reg);
            registers[id] = tempReg;
            insertRegister(tempReg);
            tempReg.discardChanges();
        });
    }
    
    btnRegister.addEventListener("click", ()=>{
        let json = readFormJSON();
        if(json["userId"] == "admin"){
            alert("Não pode ser cadastrado 'admin'");
            return;
        }
        if(json["userPassword"] != json["repeatPassword"]){
            alert("Senhas não correspondem");
            return;
        }

        json = JSON.stringify(json);
        let tempReg = createRegister();
        if(Database.existsRegister(tempReg)){
            console.log("exists")
            return;
        }

        let index = registers.length;
        registers[index] = tempReg;
        Database.save(registers[index]);
        insertRegister(registers[index]);
    });

    Database.test();

    initLogin();
}


function createRegister(){
    let tempRegister = new Register();
    let creationDate = new Date().toJSON();
    tempRegister.initialize();
    tempRegister.importFromJSON(JSON.stringify(readFormJSON()));
    tempRegister.creationDate = creationDate;
    tempRegister.changeDate = creationDate;

    tempRegister.onExclude = function(){
        Database.delete(tempRegister);
        tempRegister.selfDestroy();
    }

    tempRegister.onDiscard = function(){
        tempRegister.discardChanges();
    }

    tempRegister.onSave = function(){
        let creationDate = tempRegister.creationDate;
        Database.delete(tempRegister);
        tempRegister.importFromJSON(tempRegister.readFormJSON())
        tempRegister.creationDate = creationDate;
        tempRegister.changeDate = new Date().toJSON();
        Database.save(tempRegister)
    }
    tempRegister.discardChanges();

    return(tempRegister);
}


function readFormJSON(){
    /* must use querySelector() every time for radio buttons */
    let inputAccountType = form.querySelector("input[name='accountType']:checked");
    let creationDate = new Date().toJSON();
    let json = {
        "userName"          : inputName.value,
        "userAddress"       : inputAddress.value,
        "userPhone"         : inputPhone.value,
        "userEmail"         : inputEmail.value,
        "userId"            : inputIdNumber.value,
        "userPassword"          : inputPassword.value,
        "repeatPassword"    : inputRepeatPassword.value,
        "userAccountType"   : inputAccountType.value
    };
    //return(JSON.stringify(json));
    return(json);
}


function insertRegister(register){
    registerContainer.appendChild(register.element);
}


function changePage(pageName){
    console.log("changing page to: " + pageName);
    let regPage = document.querySelector("div#registersPage");
    let loginPage = document.querySelector("div#loginPage");
    let mainPage = document.querySelector("div#mainPage");
    let mainPageBtn = document.querySelector("nav #mainPageBtn");
    let loginPageBtn = document.querySelector("nav #loginPageBtn");
    let registersPageBtn = document.querySelector("nav #registersPageBtn");
    switch(pageName){
        case "login":
            mainPageBtn.classList.remove("selected");
            loginPageBtn.classList.add("selected");
            registersPageBtn.classList.remove("selected");

            loginPage.classList = "visible";
            regPage.classList = "hidden";
            mainPage.classList = "hidden";
            break;
        case "registers":
            mainPageBtn.classList.remove("selected");
            loginPageBtn.classList.remove("selected");
            registersPageBtn.classList.add("selected");

            loginPage.classList = "hidden";
            regPage.classList = "visible";
            mainPage.classList = "hidden";
            break;
        case "main":
            mainPageBtn.classList.add("selected");
            loginPageBtn.classList.remove("selected");
            registersPageBtn.classList.remove("selected");


            loginPage.classList = "hidden";
            regPage.classList = "hidden";
            mainPage.classList = "visible";
            break;
        
    }
}