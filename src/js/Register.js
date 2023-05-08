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

        // bypass clonenode(), so event listeners can be added
        this._element = document.createElement("div");
        this._element.className = "register hidden";
        this._element.innerHTML = template.innerHTML;

        this._element.addEventListener("click", ()=>{
            if(this.isVisible){ 
                this.hide();
                console.log("hide")
            }else{
                this.show();
                console.log("show")
            }
        });        

        this._inputName         =  this._element.querySelector("input[name='name']")
        this._inputAddress      =  this._element.querySelector("input[name='address']")
        this._inputPhone        =  this._element.querySelector("input[name='phone']")
        this._inputEmail        =  this._element.querySelector("input[name='email']")
        this._inputIdNumber     =  this._element.querySelector("input[name='idNumber']")
        
        this.userName       = name;
        this.userAddress    = address;
        this.userPhone      = phone;
        this.userEmail      = email;
        this.userId         = idNumber;
        
        this._isVisible = false;
    }


    get element() { return this._element; }

    get isVisible(){ return this._isVisible; }


    // Nome do usuário
    get userName(){ return (this._inputName.value); }

    set userName(name){ this._inputName.value = name; }

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
    get userId(){ return (this._inputIdNumber.value); }

    set userId(id){ this._inputIdNumber.value = id; }

    hide(){
        this._element.classList.remove("visible");
        this._element.classList.add("hidden");
        this._isVisible = false;
    }


    show(){
        this._element.classList.remove("hidden");
        this._element.classList.add("visible");
        this._isVisible = true;
    }
}