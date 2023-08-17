import { useFormik } from "formik";
import React, { Dispatch, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { callApiGetMethod } from "../../../Redux/Actions/api.action";
import { signUpPartner } from "../../../Redux/Actions/user.action";
import { userDetails } from "../../../Redux/Slices/user.slice";
import { APIURL } from "../../../Utils";
import toaster from "../../Common/Toast";
import SignupStepOne from "./SignupStepOne/SignupStepOne";
import SignupStepOneValidation from "./SignupStepOne/SignupStepOneValidation";
import SignupStepTwo from "./SignupStepTwo/SignupStepTwo";
import SignupStepTwoValidation from "./SignupStepTwo/SignupStepTwoValidation";

const SignUp = () => {
  const [formStep, setFormStep] = useState(1);
  const [formDetails, setFormDetails] = useState<any>();

  const dispatch: Dispatch<any> = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const steps = useMemo(
    () => [
      {
        id: 1,
        path: "/signup",
        title: "Sign Up",
      },
      {
        id: 2,
        path: "/signup-almost",
        title: "Signup almost",
      },
    ],
    []
  );

  // http://10.1.5.164/:3004/vendor/requestInvitationInfo?invite_code=rsWJMDNhVc
  // http://10.1.5.164:3004/vendor/requestInvitationInfo?invite_code=rsWJMDNhVc

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cPassword: "",
      propertyName: "",
      name: "",
      mobile_number: "",
      role: "VENDOR",
    },

    validationSchema:
      formStep === 1 ? SignupStepOneValidation : SignupStepTwoValidation,

    onSubmit: async (values) => {
      if (formStep <= 1) {
        setFormStep(2);
      } else {
        const dataToSend: any = {
          email: formDetails?.email_id,
          password: values.password,
          propertyName: values.propertyName,
          name: formDetails?.invited_name,
          invite_code: formDetails?.invite_code,
          mobile_number: formDetails?.mob_no,
          role: "VENDOR",
        };

        const result: any = await dispatch(signUpPartner(dataToSend));
        if (result?.statusCode === 200) {
          const dataToStore = {
            email: values.email,
            mobile_number: values.mobile_number,
            propertyName: values.propertyName,
            role: values.role,
            name: values.name,
          };
          toaster.success(result?.message);
          dispatch(userDetails(dataToStore));
          navigate("/");
        } else if (result?.statusCode === 400) {
          toaster.error(result?.message);
        }
      }
    },
  });

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const handlePrefilledSignupForm = async () => {
    const code = query.get('token');
    const formData: any = await dispatch(
      callApiGetMethod(
        APIURL.INVITATION_SIGNUP,
        { invite_code: code },
        true,
        false
      )
    );
    if (formData?.statusCode === 200) {
      setFormDetails(formData?.data);
    }
  };

  useEffect(() => {
    handlePrefilledSignupForm();
  }, []);

  useEffect(() => {
    steps.forEach((element) => {
      location.pathname.includes(element.path);
    });
  }, [location, steps]);

  const handleBack = () => {
    if (formStep === 2) {
      setFormStep(1);
    }
  };

  return (
    <section>
      <div>
        <form onSubmit={formik.handleSubmit}>
          {formStep === 1 ? (
            <>
              <SignupStepOne
                state={location?.state}
                formik={formik}
                formDetails={formDetails}
              />
            </>
          ) : (
            <>
              <SignupStepTwo
                state={location?.state}
                formik={formik}
                handleBack={handleBack}
                formDetails={formDetails}
              />
            </>
          )}
          <div className="text-center mt-4"></div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
