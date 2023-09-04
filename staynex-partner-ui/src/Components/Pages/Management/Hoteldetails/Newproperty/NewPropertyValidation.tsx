import * as Yup from "yup";

function NewPropertyValidation() {


  const scheema = Yup.object().shape({
    name: Yup.string()
      .required("This field is required")
      .min(2, "Property name should be at least 2 characters long")
      .max(25, "Property name should be at most 25 characters long")
      .matches(/^(?! ).*(?<! )$/, "Space is not allowed at start or end places"),
    country: Yup.string().required("This field is required"),
    state: Yup.string().required("This field is required"),
    address: Yup.string()
      .required("This field is required")
      .min(8, "Address should be at least 8 characters long")
      .max(50, "Address should be at least 50 characters long")
      .matches(/^[0-9a-zA-Z\s,.-]+$/, "Please enter valid address"),
    // latitude: Yup.string().required("This field is required"),
    // longitude: Yup.string().required("This field is required"),
    description: Yup.string()
      .min(30, "Description should be at least 30 characters long")
      .max(300, "Description should be at most 300 characters long")
      .required("This field is required"),
    propertyType: Yup.string().required("This field is required"),
    bedrooms: Yup.number()
      .positive()
      .required("This field is required")
      .min(1, "Bedrooms  should be of minimum 1")
      .max(30, "Bedrooms  should not more than 30"),
    images: Yup.array().min(5, 'at least 5 images required').max(10, 'maximum 10 images').required('This Field is required'),
    // size: Yup.number().required("This field is required"),
    // .min(2, 'size  should be of minimum 2 digits')
    // .max(5, 'bedrooms  should not more than 5 digits'),
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Please enter valid email"),
    contact: Yup.string()
      .min(8, "Contact no. should be at least 8 characters long")
      .max(15, "Contact no. should be at most 15 characters long")
      .required("This field is required"),
    website: Yup.string().required("This field is required"),
    // room_1: Yup.string().required('This field is required'),
    // room_2: Yup.string().required('This field is required'),
    // room_3: Yup.string().required('This field is required'),
    // room_4: Yup.string().required('This field is required'),

  })
  return scheema;
};

export default NewPropertyValidation;