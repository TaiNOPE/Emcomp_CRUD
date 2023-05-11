class Register{
    constructor(){
        let template = document.querySelector("template#register_template");
        this._element = document.createElement("div");  /* bypass cloneNode(), so event listeners can be added */
        this._element.innerHTML = template.innerHTML;
        this._element.className = "register hidden";
        this._isMinimized = true;

        this._userName          = "";
        this._userAddress       = "";
        this._userPhone         = "";
        this._userEmail         = "";
        this._userId            = "";
        this._userAccountType   = "";
        this._creationDate      = "";
        this._changeDate        = "";
    }


    initialize(){
        this._headerName        =   this._element.querySelector("h1");
        this._spanCreationDate  =   this._element.querySelector("span#creationDate");
        this._spanChangeDate    =   this._element.querySelector("span#changeDate");
        this._inputName         =   this._element.querySelector("input[name='name']");
        this._inputAddress      =   this._element.querySelector("input[name='address']");
        this._inputPhone        =   this._element.querySelector("input[name='phone']");
        this._inputEmail        =   this._element.querySelector("input[name='email']");
        this._inputIdNumber     =   this._element.querySelector("input[name='idNumber']");
        this._buttonExclude     =   this._element.querySelector("input[type='button'][name='excludeBtn']")
        this._buttonDiscard     =   this._element.querySelector("input[type='button'][name='discartBtn']")
        this._buttonSave        =   this._element.querySelector("input[type='button'][name='saveBtn']")
        this._onExclude = ()=>{ console.log("onExclude not set") };
        this._onDiscard = ()=>{ console.log("onDiscard not set") };
        this._onSave    = ()=>{ console.log("onSave not set") };

        let b = this._element.querySelector("button#minimize")
        b.addEventListener("click", ()=>{
            if(this.isMinimized){ 
                this.maximize()
            }else{
                this.minimize();
            }
        });        

        this._buttonExclude.addEventListener("click", ()=>{
            if(this._onExclude){ this._onExclude(); }
        });

        this._buttonDiscard.addEventListener("click", ()=>{
            if(this._onDiscard){ this._onDiscard(); }
            
        });

        this._buttonSave.addEventListener("click", ()=>{
            if(this._onSave){ this._onSave(); }
        });
    }


    set onExclude(func){ this._onExclude = func; }


    set onDiscard(func){ this._onDiscard = func; }
    
    
    set onSave(func){ this._onSave = func; }


    get element() { return this._element; }

    get isMinimized(){ return this._isMinimized; }


    get creationDate(){ return(this._creationDate); }

    set creationDate(dateJSON){
        let date = new Date(dateJSON);
        let dateStr = (
            "Criado em: " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() +
            " às " + date.getHours() + ":" + 
            ((date.getMinutes() <= 9) ? "0" : "") + date.getMinutes() + ":" +
            ((date.getSeconds() <= 9) ? "0" : "") + date.getSeconds()
        );
        this._creationDate = date;
        this._spanCreationDate.innerHTML = dateStr;
    }


    get changeDate(){ return(this._changeDate); }

    set changeDate(dateJSON){
        let date = new Date(dateJSON);
        let dateStr = (
            "Modificado em: " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() +
            " às " + date.getHours() + ":" + 
            ((date.getMinutes() <= 9) ? "0" : "") + date.getMinutes() + ":" +
            ((date.getSeconds() <= 9) ? "0" : "") + date.getSeconds()
        );
        this._changeDate = date;
        this._spanChangeDate.innerHTML = dateStr;
    }


    get userName(){ return (this._userName); }

    set userName(name){
        this._userName = name;
        this._headerName.innerHTML = name;
    }

    get userAddress(){return (this._userAddress); }

    set userAddress(address){ this._userAddress = address; }


    get userPhone(){ return (this._userPhone); }

    set userPhone(phone){ this._userPhone = phone; }


    get userEmail(){ return (this._userEmail); }

    set userEmail(email){ this._userEmail = email; }


    get userId(){ return (this._userId); }

    set userId(id){ this._userId = id; }


    get userAccountType(){ 
        this._userAccountType  =  this._element.querySelector("input[name='accountType']:checked").value;
        return (this._userAccountType);
    }

    set userAccountType(type){ 
        /*  finds the radio button according the value in 'type'
            not the greatest way to do this, but at least it doesn't need to be fixed when add new account types
            must use querySelector() every time for radio buttons
        */
        let radioBtn = this._element.querySelector("input[name='accountType'][value='" + type + "']");;
        if(radioBtn){ radioBtn.checked = true; }
    }


    minimize(){
        this.discardChanges();
        this._element.classList.remove("visible");
        this._element.classList.add("hidden");
        this._isMinimized = true;
    }


    maximize(){
        console.log(this.creationDate);
        this.discardChanges();
        this._element.classList.remove("hidden");
        this._element.classList.add("visible");
        this._isMinimized = false;
    }


    discardChanges(){
        this._headerName.innerHTML  = this.userName;
        this._inputName.value       = this.userName;
        this._inputAddress.value    = this.userAddress;
        this._inputPhone.value      = this.userPhone;
        this._inputEmail.value      = this.userEmail;
        this._inputIdNumber.value   = this.userId;
        this.userAccountType        = this._userAccountType;
    }


    selfDestroy(){
        this._element.remove();
    }


    exportToJSON(){
        let json = {
            "userName"          : this._userName,
            "userAddress"       : this._userAddress,
            "userPhone"         : this._userPhone,
            "userEmail"         : this._userEmail,
            "userId"            : this._userId,
            "userAccountType"   : this.userAccountType,
            "creationDate"      : this._creationDate,
            "changeDate"        : this._changeDate
        };

        return(JSON.stringify(json));
    }


    importFromJSON(json){
        let obj = JSON.parse(json);
        this.userName = obj["userName"];
        this.userAddress        = obj["userAddress"];
        this.userPhone          = obj["userPhone"];
        this.userEmail          = obj["userEmail"];
        this.userId             = obj["userId"];
        this.userAccountType    = obj["userAccountType"];
        this.creationDate       = obj["creationDate"];
        this.changeDate         = obj["changeDate"];
    }


    readFormJSON(){
        let json = {
            "userName"          :  this._inputName.value,
            "userAddress"       :  this._inputAddress.value,
            "userPhone"         :  this._inputPhone.value,
            "userEmail"         :  this._inputEmail.value,
            "userId"            :  this._inputIdNumber.value,
            "userAccountType"   :  this._element.querySelector("input[name='accountType']:checked").value
        };

        return(JSON.stringify(json));
    }
}