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
        return(localStorage.getItem(register.userId) != undefined);
    }


    static save(register){
        localStorage.setItem(register.userId, register.exportToJSON());
        console.log("saved " + register.userId);
    }


    static loadRegisters(){
        let registers = new Array()
        for(let i = 0; i < localStorage.length; i++){
            let regJSON = localStorage.getItem(localStorage.key(i));
            registers.push(regJSON);
        }
        return(registers)
    }


    static delete(register){
        localStorage.removeItem(register.userId);
    }


    static get isEmpty(){
        return(localStorage.length == 0);
    }
}