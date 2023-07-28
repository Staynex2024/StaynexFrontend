import * as Yup from "yup";

function SignupStepOneValidation() {
  let scheema = Yup.object().shape({
        email: Yup.string()
          .email("Please enter valid email")
          .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Please enter valid email"),
        password: Yup.string()
          // .min(
          //   10,
          //   "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
          // )
          .required("This field is required.")
          .min(10, "Password should be at least 10 characters long.")
          .max(15, "Password should be at most 15 characters long.")
          .matches(/[0-9]/, "Password should contain at least one numeric number.")
          .matches(/[a-z]/, "Password should contain at least one lowercase letter.")
          .matches(/[A-Z]/, "Password should contain at least one uppercase letter.")
          .matches(/[@$!%*?&<>-]/, "Password should contain at least one special character."),
        cPassword: Yup.string()
          .required("*This Field is required")
          .oneOf([Yup.ref("password")], "Confirm password does not match."),
  });

  return scheema;
}

export default SignupStepOneValidation;
