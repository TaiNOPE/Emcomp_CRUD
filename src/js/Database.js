class Database{
    static test(){
        for(let i = 0; i <localStorage.length; i++){
            let key = localStorage.key(i);
           // console.log(localStorage.key(i) + " = " + localStorage.getItem(key));
        }
    }


    static exists(key){
        if(localStorage.getItem(key) == undefined){
            return(false);
        }else{
            return(true);
        }
    }


    static existsRegister(register){
        console.log("a:   " + this.loadRegisters()[register.userIdNumber])
        return(this.loadRegisters()[register.userIdNumber] != undefined);
    }


    static save(register){
        if(this.isEmpty){
            localStorage.setItem("savedRegisters", "{}");
            localStorage.setItem("registersLength", 0);
        }

        let savedRegisters = localStorage.getItem("savedRegisters");
        let registersLength = localStorage.getItem("registersLength");
        registersLength++;
        savedRegisters = JSON.parse(savedRegisters);
        savedRegisters[register.userIdNumber] = register.exportToJSON();
        

        localStorage.setItem("savedRegisters", JSON.stringify(savedRegisters));
        localStorage.setItem("registersLength", registersLength);
        console.log("saved " + register.userIdNumber);
        
    }


    static loadRegisters(){
        if(this.isEmpty) return;
        let registers = JSON.parse(localStorage.getItem("savedRegisters"))
        return (new Map(Object.entries(registers)));
    }


    static get isEmpty(){
        return(!this.exists("savedRegisters") || !this.exists("registersLength"));
    }
}