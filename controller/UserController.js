import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi  from "joi";
import UserModel from "../model/userModel.js";

class UserController {
  static createUser = async (req, res) => {
    try {
      const { username, emailId, confirm_password, password,  } = req.body;
        if (!username || !emailId ||! confirm_password ||!password) {
                return res.status(400).json({
                status: "fail",
                message: "All fields are required.",
                });
            }
      if (password !== confirm_password) {
            return res.status(400).json({ status: "fail", message: 'Passwords do not match' });
        }
      // Joi validation schema
      const userValidationSchema = Joi.object({
        username: Joi.string().min(3).required().messages({
      'string.base': `Username should be a text`,
      'string.empty': `Username cannot be empty`,
    //   'string.min': `Username should have at least {#limit} characters`,
      'any.required': `Username is required`
    }),
        emailId: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirm_password: Joi.string().min(6).required(),
      });
      const { error, value } = userValidationSchema.validate(req.body);
      if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message });
      }
     
      const checkUserExits = await UserModel.findOne({ username: username });
      if (checkUserExits) {
        return res.status(400).json({
          status: "fail",
          message: "User already exists.Please choose another username.",
        });
      }
      const saltValueForHashPassword = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        password,
        saltValueForHashPassword
      );
      const newUser = new UserModel({
        username: username,
        emailId: emailId,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).json({
        status: "success",
        message: "User created successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  };
  static getAllUser = async (req, res) => {
    try {
      const users = await UserModel.find({});
      return res.status(201).json({
        status: "success",
        message: users,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static getOneUser = async (req, res) => {
    try {
      const user = await UserModel.findById({ _id: req.params.id });
      return res.status(201).json({
        status: "success",
        message: user,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static editUser = (req, res) => {};
  static deleteUser = (req, res) => {};
  static login = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (username && password) {
        const checkUserExits = await UserModel.findOne({ username: username });
        if (!checkUserExits) {
          return res.status(400).send({
            status: "fail",
            message: "User not found. Please register user.",
          });
        }
        const isMatchPassword = await bcrypt.compare(
          password,
          checkUserExits.password
        );
        if (username === checkUserExits.username && isMatchPassword) {
          const JWTtoken = jwt.sign(
            {
              userID: checkUserExits._id,
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).send({
            status: "success",
            message: "You are LogedIn.",
            JWTtoken: JWTtoken,
            username:username
          });
        } else {
          return res.status(400).send({
            status: "fail",
            message: "Username or password may be wrong.",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserController;
