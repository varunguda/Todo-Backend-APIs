import { validationResult, body } from "express-validator";

export const userDataValidation = [

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid Email format!"),
    
    body("password")
        .optional()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must contain atleast 8 characters"),

    body("name")
        .optional()
        .isLength({ min: 3 })
        .withMessage("Name must contain atleast 3 characters"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            success: false,
            message: errors.array()
          });
        }
        next();
    }
];



export const todoDataValidation = [
    
    body("title")
        .optional(),
    
    body("desc")
        .optional()
        .isLength({ min: 3 })
        .withMessage("Description must contain atleast 3 characters"),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }
        next();
    }

]
