import Joi from 'joi';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { User } from '../../models';
import JwtService from '../../services/JwtService';
import bcrypt from 'bcrypt';
const registerController = {
    async register(req,res,next){
        //logic
        //checklist
        //validate the request
        //authorize the request
        //check if user is in database already
        //prepare model
        //store in database
        //generate jwt token
        //send response


        //Validation
        const registerSchema = Joi.object({
           name: Joi.string().min(3).max(30).required(),
           email: Joi.string().email().required(),
           password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
           repeat_password : Joi.ref('password')
        });

        const {error} = registerSchema.validate(req.body);

        if(error){
          return next(error);  
        }
        // check if user is in the database already
        try{
          const exist = await User.exists({email: req.body.email});// return true or false
          if(exist){
              return next(CustomErrorHandler.alreadyExist('This email is alreay exist'));
          }
        }catch(err){
              return next(err);    
        }


        //Hash Password
        const hashPassword = await bcrypt.hash(req.body.password,10);

        // prepare the model
        const {name,email,password} = req.body;
        const user = new User({
            name,
            email,
            password: hashPassword
        })
        let access_token;
        try{
            const result = await user.save();

            //Token
            access_token = JwtService.sign({_id: result._id,role: result.role, });
 

        }catch(err){
            return next(err);
        }



        res.json({access_token});
    }
}

export default registerController;