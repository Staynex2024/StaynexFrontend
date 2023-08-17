import * as Yup from 'yup'

function UpdatePropertyValidation (){
    const scheema = Yup.object().shape({
        name: Yup.string()
          .required("This field is required")
          .min(2, "Property name should be at least 2 characters long.")
          .max(25, "Property name should be at most 25 characters long.")
          .matches(/^(?! ).*(?<! )$/, "Can not enter space in start or end"),
        country: Yup.string().required("This field is required"),
        state: Yup.string().required("This field is required"),
        address: Yup.string()
          .required("This field is required")
          .min(8, "Address should be at least 8 characters long.")
          .max(50, "Address should be at least 50 characters long.")
          .matches(/^(?! ).*(?<! )$/, "Can not enter space in start or end")
          .matches(/^[0-9a-zA-Z\s,.-]+$/, "Please enter valid address"),
        location: Yup.string().required("This field is required"),
        description: Yup.string()
          .min(30, "minimum 30 characters allowed")
          .max(300, "maximum 300 characters allowed")
          .required("This field is required"),
        propertyType: Yup.string().required("This field is required"),
        bedrooms: Yup.number()
          .positive()
          .required("This field is required")
          .min(1, "bedrooms  should be of minimum 1")
          .max(30, "bedrooms  should not more than 30"),
        // images: Yup.array().min(5, 'at least 5 images required').max(10, 'maximum 10 images').required('This Field is required'),
        // size: Yup.number().required("This field is required"),
        // .min(2, 'size  should be of minimum 2 digits')
        // .max(5, 'bedrooms  should not more than 5 digits'),
        email: Yup.string()
          .email("Please enter valid email")
          .required("This field is required")
          .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Please enter valid email"),
        contact: Yup.string()
          .min(10, "Contact number should be of minimum 10 digits")
          .max(15, "Contact number should not more than 15 digits")
          .required("This field is required"),
        website: Yup.string().required("This field is required"),
      });

      return scheema
}

export default UpdatePropertyValidation;