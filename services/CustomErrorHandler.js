class CustomErrorHandler extends Error {
    constructor(status, msg){
        this.status = status;
        this.msg = msg;
    }
    static alreadyExist(message){
        //for static method object will not be defined
        return new CustomErrorHandler(409,message);
    }
}

export default CustomErrorHandler;