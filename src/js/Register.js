class Register{
    constructor(
        registerId, 
        creationDate = "01/01/2000", 
        modifyDate = "01/01/2000", 
        name = "test name", 
        address = "test address", 
        phone = "test phone", 
        email = "test email", 
        idNumber = "test id", 
        accountType = "user")
        {
        let template = document.querySelector("#register_template");
        this._element = document.createElement("div");  /* bypass clonenode(), so event listeners can be added */
        this._element.innerHTML = template.innerHTML;

        // VARIABLES / ATRIBUTES INITIALIZATION
        this._inputName         =  this._element.querySelector("input[name='name']");
        this._inputAddress      =  this._element.querySelector("input[name='address']");
        this._inputPhone        =  this._element.querySelector("input[name='phone']");
        this._inputEmail        =  this._element.querySelector("input[name='email']");
        this._inputIdNumber     =  this._element.querySelector("input[name='idNumber']");
        this._isMinimized = true;

        /*
        this._userName        = name;
        this._userAddress     = address;
        this._userPhone       = phone;
        this._userEmail       = email;
        this._userId          = idNumber;
        this._userAccountType = accountType;
        */

        // EVENT LISTENERS
        this._element.addEventListener("click", ()=>{
            if(this.isMinimized){ 
                this.maximize();
            }else{
                this.minimize();
            }
        });        

        this._element.className = "register hidden";        
    }


    get element() { return this._element; }

    get isMinimized(){ return this._isMinimized; }


    // Nome do usuário
    get userName(){ return (this._inputName.value); }

    set userName(name){
        this._inputName.value = name;
        this._element.querySelector("h1#name").innerHTML = name;
    }

    // Endereço
    get userAddress(){ return (this._inputAddress.value); }

    set userAddress(address){ this._inputAddress.value = address; }


    // Telefone
    get userPhone(){ return (this._inputPhone.value); }

    set userPhone(phone){ this._inputPhone.value = phone; }


    // E-Mail
    get userEmail(){ return (this._inputEmail.value); }

    set userEmail(email){ this._inputEmail.value = email; }


    // Nº de identidade
    get userIdNumber(){ return (this._inputIdNumber.value); }

    set userIdNumber(id){ this._inputIdNumber.value = id; }

    // Tipo de oconta
    get userAccountType(){ 
        this._inputAccountType  =  this._element.querySelector("input[name='accountType']:checked");
        return (this._inputAccountType.value);
    }

    // finds the radio button according the value in 'type'
    // not the greatest way to do this, but at least it doesn't need to be fixed when add new account types
    set userAccountType(type){ 
        let radioBtn = this._element.querySelector("input[name='accountType'][value='" + type + "']");;
        if(radioBtn){
            radioBtn.checked = true;
        }
    }

    minimize(){
        this._element.classList.remove("visible");
        this._element.classList.add("hidden");
        this._isMinimized = true;
    }


    maximize(){
        this._element.classList.remove("hidden");
        this._element.classList.add("visible");
        this._isMinimized = false;
    }


    exportToJSON(){
        let json = {
            "userName": this.userName,
            "userAddress": this.userAddress,
            "userPhone": this.userPhone,
            "userEmail": this.userEmail,
            "userIdNumber": this.userIdNumber,
            "userAccountType": this.userAccountType
        };

        return(JSON.stringify(json));
    }


    importFromJSON(json){
        let obj = JSON.parse(json);
        this.userName = obj["userName"];
        this.userAddress = obj["userAddress"];
        this.userPhone = obj["userPhone"];
        this.userEmail = obj["userEmail"];
        this.userIdNumber = obj["userIdNumber"];
        this.userAccountType = obj["userAccountType"];
    }
}