class CustomErrorHandler extends Error {
    
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }
    static alreadyExist(message){
        //for static method object will not be defined
        return new CustomErrorHandler(409,message);
    }
    static wrongCredentials(message = 'Username or Password is wrong'){
        //for static method object will not be defined
        return new CustomErrorHandler(401,message);
    }
}

export default CustomErrorHandler;