import * as Yup from "yup";

function SignupStepTwoValidation() {
  let scheema = Yup.object().shape({
    propertyName: Yup.string().min(2, "Property name should be at least 2 characters long.").max(25, 'Property name should be at most 25 characters long.').matches(/^(?! ).*(?<! )$/, 'Can not enter space in start or end'),
  });

  return scheema;
}

export default SignupStepTwoValidation;
