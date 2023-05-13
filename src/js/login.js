let login_inputEmail;
let login_inputPassword;
let login;
let password;


function initLogin(){
    login_inputEmail = document.querySelector("input[name='userEmail']");
    login_inputPassword = document.querySelector("input[name='userPassword']");
    login = "";
    password = "";

    document.querySelector("input[name='submit']").addEventListener("click", ()=>{        
        login = login_inputEmail.value;
        password = login_inputPassword.value;
        checkCredentials();
    })
}


function checkCredentials(){
    let tempReg = Database.getRegisterJSON(login);
    
    if(login == "admin" && password == "admin"){
        changePage("registers");
        return;
    }

    if(tempReg){
        tempReg = JSON.parse(tempReg);
        if(tempReg['userAccountType'] == "admin"){
            changePage("registers")
        }else{
            changePage("main")
        }
    }else{
        alert("Conta não encontrada")
    }
}