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
        this._element.className = "register hidden";
        this._isMinimized = true;

        this._userName        = name;
        this._userAddress     = address;
        this._userPhone       = phone;
        this._userEmail       = email;
        this._userId          = idNumber;
        this._userAccountType = accountType;
    }

    initialize(){
        // VARIABLES / ATRIBUTES INITIALIZATION
        console.log("initializing")

        this._headerName        =   this._element.querySelector("h1");
        this._inputName         =   this._element.querySelector("input[name='name']");
        this._inputAddress      =   this._element.querySelector("input[name='address']");
        this._inputPhone        =   this._element.querySelector("input[name='phone']");
        this._inputEmail        =   this._element.querySelector("input[name='email']");
        this._inputIdNumber     =   this._element.querySelector("input[name='idNumber']");
        this._buttonExclude     =   this._element.querySelector("input[type='button'][name='excludeBtn']")
        this._buttonDiscard     =   this._element.querySelector("input[type='button'][name='discartBtn']")
        this._buttonSave        =   this._element.querySelector("input[type='button'][name='saveBtn']")
        this._onExclude;
        this._onDiscard;
        this._onSave;

        // EVENT LISTENERS
        let b = this._element.querySelector("button#minimize")
        b.addEventListener("click", ()=>{
            console.log("min btn click1")
            if(this.isMinimized){ 
                this.maximize()
            }else{
                this.minimize();
            }
        });        

        this._buttonExclude.addEventListener("click", (e)=>{e.target.onClick()});
        this._buttonDiscard.addEventListener("click", (e)=>{e.target.onClick()});
        this._buttonSave.addEventListener("click", (e)=>{ e.target.onClick()});

       // this.selfUpdate();
    }


    get element() { return this._element; }

    get isMinimized(){ return this._isMinimized; }


    // Nome do usuário
    get userName(){ return (this._userName); }

    set userName(name){
        this._userName = name;
        //this._headerName.innerHTML = name;
        this._element.querySelector("h1#name").innerHTML = name;
        //this.resetFields();
    }

    // Endereço
    get userAddress(){return (this._userAddress); }

    set userAddress(address){ this._userAddress = address; }


    // Telefone
    get userPhone(){ return (this._userPhone); }

    set userPhone(phone){ this._userPhone = phone; }


    // E-Mail
    get userEmail(){ return (this._userEmail); }

    set userEmail(email){ this._userEmail = email; }


    // Nº de identidade
    get userId(){ return (this._userId); }

    set userId(id){ this._userId = id; }

    // Tipo de oconta
    get userAccountType(){ 
        this._userAccountType  =  this._element.querySelector("input[name='accountType']:checked").value;
        return (this._userAccountType);
    }

    //get inputAccountType(){ return(this._element.querySelector("input[name='accountType']:checked")); }

    // finds the radio button according the value in 'type'
    // not the greatest way to do this, but at least it doesn't need to be fixed when add new account types
    set userAccountType(type){ 
        console.log("type: " + type)
        let radioBtn = this._element.querySelector("input[name='accountType'][value='" + type + "']");;
        if(radioBtn){
            radioBtn.checked = true;
        }
    }

    set onExclude(func){ this._buttonExclude.onClick = func; }
    set onDiscard(func){this._buttonDiscard.onClick = func; }
    set onSave(func){this._buttonSave.onClick = func; }



    minimize(){
        this.resetFields();
        this._element.classList.remove("visible");
        this._element.classList.add("hidden");
        this._isMinimized = true;
    }


    maximize(){
        this.resetFields();
        this._element.classList.remove("hidden");
        this._element.classList.add("visible");
        console.log(this._element.classList)
        this._isMinimized = false;
    }


    exportToJSON(){
        let json = {
            "userName": this._userName,
            "userAddress": this._userAddress,
            "userPhone": this._userPhone,
            "userEmail": this._userEmail,
            "userId": this._userId,
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
        this.userId = obj["userId"];
        this.userAccountType = obj["userAccountType"];
    }


    resetFields(){
        this._headerName.innerHTML = this.userName;
        this._inputName.value = this.userName;
        this._inputAddress.value = this.userAddress;
        this._inputPhone.value = this.userPhone;
        this._inputEmail.value = this.userEmail;
        this._inputIdNumber.value = this.userId;
        this._inputAccountType = this.userAccountType;
    }


    readFormJSON(){
        let json = {
            "userName":  this._inputName.value,
            "userAddress":  this._inputAddress.value,
            "userPhone":  this._inputPhone.value,
            "userEmail":  this._inputEmail.value,
            "userId":  this._inputIdNumber.value,
            "userAccountType":  this._element.querySelector("input[name='accountType']:checked").value
        };

        return(JSON.stringify(json));
    }


    selfDestroy(){
        this._element.remove();
    }

    selfUpdate(){
        console.log("self update")
        this.userName = this._inputName.value;
        this.userAddress = this._inputAddress.value;
        this.userPhone = this._inputPhone.value;
        this.userEmail = this._inputEmail.value;
        this.userId = this._inputIdNumber.value;
        this.userAccountType = this.userAccountType//.value;
    }

    static Field = {
        test(){
            console.log("test")
        }
    }
}