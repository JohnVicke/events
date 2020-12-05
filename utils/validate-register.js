import {check, sanitizeBody} from ('express-validator');

export default register = [
    // first Name validation
  check('firstName').trim().notEmpty().withMessage('First Name required')
  .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
 // last Name validation
  check('lastName').notEmpty().withMessage('Last Name required')
  .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
  // email address validation
  check('emailAddress').notEmpty().withMessage('Email Address required').normalizeEmail().isEmail().withMessage('must be a valid email'),
  // password validation
  check('password').trim().notEmpty().withMessage('Password required')
  .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
  .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
  .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
  .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
  .not().matches(/^$|\s+/).withMessage('White space not allowed'),
  // confirm password validation
  check('confirmPassword').custom((value, { req }) => {
       if (value !== req.body.password) {
             throw new Error('Password Confirmation does not match password');
        }
        return true;
   })
]
