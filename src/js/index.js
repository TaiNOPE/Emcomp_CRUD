let form;
let btnRegister;
let inputName;
let inputAddress;
let inputPhone;
let inputEmail;
let inputIdNumber;
let inputAccountType;
let registers = new Array();
let registerContainer;

window.onload = function(){
    registerContainer   =   document.querySelector("div.category");
    form                =   document.querySelector("form#registerForm"); 
    btnRegister         =   form.querySelector("input[name='register']");
    inputName           =   form.querySelector("input[name='name']");
    inputAddress        =   form.querySelector("input[name='address']");
    inputPhone          =   form.querySelector("input[name='phone']");
    inputEmail          =   form.querySelector("input[name='email']");
    inputIdNumber       =   form.querySelector("input[name='idNumber']");

    
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
}


function createRegister(){
    let tempRegister = new Register();
    let creationDate = new Date().toJSON();
    tempRegister.initialize();
    tempRegister.importFromJSON(readFormJSON());
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

    setTimeout(() => {
        let c = 0;
        document.querySelector(".register").querySelectorAll("input[type='text']").forEach(i => {
            console.log("ok")
            i.style.transitionDelay = (++c*0.04) + "s"
            //i.style.transitionDuration = c*2 + "s"
            
        })
    }, 1000);

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
        "userAccountType"   : inputAccountType.value/*,
        "creationDate"      : creationDate,
        "changeDate"        : creationDate*/
    };

    return(JSON.stringify(json));
}

function insertRegister(register){
    registerContainer.appendChild(register.element);
}

