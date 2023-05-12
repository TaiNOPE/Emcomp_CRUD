let login_inputEmail;
let login_inputPassword;
let login_email;
let password;

function initLogin(){
    login_inputEmail = document.querySelector("input[name='userEmail']");
    login_inputPassword = document.querySelector("input[name='userPassword']");
    login_email = "";
    password = "";

    document.querySelector("input[name='submit']").addEventListener("click", ()=>{        
        login_email = login_inputEmail.value;
        password = login_inputPassword.value;
        checkCredentials();
    })
}


function checkCredentials(){
    let tempReg = Database.getRegisterJSON(login_email);
    if(tempReg){
        console.log("yup, found");
        tempReg = JSON.parse(tempReg);
        if(tempReg['userAccountType'] == "admin"){
            changePage("registers")
        }else{
            changePage("main")
        }
        
    }else{
        console.log("nep")
    }
}




