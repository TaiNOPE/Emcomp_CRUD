let form;
let btnRegister;
let inputName;
let inputAddress;
let inputPhone;
let inputEmail;
let inputIdNumber;
let registers = new Array();
let registerContainer;

window.onload = function(){
    // VARIABLE INITIALIZATION

    registerContainer   =   document.querySelector("div.category");
    form                =   document.querySelector("form#registerForm"); 
    btnRegister         =   form.querySelector("input[name='register']");
    inputName           =   form.querySelector("input[name='name']");
    inputAddress        =   form.querySelector("input[name='address']");
    inputPhone          =   form.querySelector("input[name='phone']");
    inputEmail          =   form.querySelector("input[name='email']");
    inputIdNumber       =   form.querySelector("input[name='idNumber']");


    if(!Database.isEmpty){
        let savedRegisters = Database.loadRegisters();
        console.log((savedRegisters))
        
        for([registerId, register] of savedRegisters){
            let tempReg = createRegister();
            let id = registers.length;
            tempReg.importFromJSON(register);
            registers[id] = tempReg;
            insertRegister(registers[id]);
        }
        /*
        savedRegisters.forEach(reg => {
            register = reg[1];
            let tempReg = createRegister();
            let id = registers.length;
            tempReg.importFromJSON(register);
            registers[id] = tempReg;
            insertRegister(registers[id]);
        });
        */
    }
    /*
    for(let i=0; i < savedRegisters.length; i++){
        let tempReg = createRegister();
        tempReg.importFromJSON(savedRegisters.registers[i]);
        registers[1] = tempReg;
        insertRegister(registers[1]);
    }
    */
    

    // EVENT LISTENERS
    btnRegister.addEventListener("click", ()=>{
        let tempReg = createRegister();
        //if(Database.existsRegister(tempReg)) return;
        console.log(Database.existsRegister(tempReg))
        if(!Database.existsRegister(tempReg)){
            let index = registers.length;
            registers[index] = tempReg;
            Database.save(registers[index]);
            insertRegister(registers[index]);
        }else{
            console.log("exists")
        }
    });

    Database.test();
}


// FUNCTIONS

function createRegister(){
    // must use querySelector() every time for radio buttons
    let inputAccountType = form.querySelector("input[name='accountType']:checked");
    let tempRegister = new Register();
    tempRegister.userName        = inputName.value;
    tempRegister.userAddress     = inputAddress.value;
    tempRegister.userPhone       = inputPhone.value;
    tempRegister.userEmail       = inputEmail.value;
    tempRegister.userIdNumber    = inputIdNumber.value;
    tempRegister.userAccountType = inputAccountType.value;

    return(tempRegister);
}


function insertRegister(register){
    registerContainer.appendChild(register.element);
}
