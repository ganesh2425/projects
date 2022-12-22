import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, MenuItem, TextField } from "@mui/material";
import { Formik, FormikProps, useFormik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { PHONE } from "../../../../constants/actionTypes";
import { getEmployerDetails } from "../../../../reducers/employersReducer/getEmployerReducer";
import * as yup from "yup";
import { IAddACAForm } from "../../../../interfaces/employerType";
import { fetchGetEmployerRequest } from "../../../../actions/employersActions/getEmployerActions";
import { fetchUpdateEmpQLEStepsRequest } from "../../../../actions/employersActions/updateEmpQLEStepsActions";
import { getUpdateEmpQLESteps } from "../../../../reducers/employersReducer/updateEmpQLEStepsReducer";
import { toast } from "react-toastify";

const PrimaryContact = ({employerId}: any): JSX.Element => {
  const [formDate, setFormDate] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
  });
const navigate = useNavigate();
  const params = useParams();
  const types = [
    { value: "Cell", label: "Cell" },
    { value: "Home", label: "Home" },
    { value: "Work", label: "Work" },
  ];
  // const handleChange = (e: any) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const dispatch = useDispatch();
  
  //const [rolesData, setRows] = React.useState(getEmployerRes);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneType, setPhoneType] = useState("");

  const getEmployerRes = useSelector(getEmployerDetails);
  
  const [isSubmitted, setSubmitted] = useState(false);
  
  const validationSchema = yup.object({
    acaPrimaryContactName: yup.string().required("Name is required"),
    acaPrimaryContactPhoneNo: yup
      .string()
      .matches(PHONE, "Mobile number is not valid")
      .required("Mobile number is required"),
      acaPrimaryContactEmail: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
      acaPrimaryContactPhoneType: yup
      .string()
      .required("Phone Type is required"),
  });

  
  const [initialValues, setIntialValues] = useState<IAddACAForm>({

    acaPrimaryContactName: "",
      acaPrimaryContactEmail: "",
      acaPrimaryContactPhoneNo: "",
      acaPrimaryContactPhoneType: "",
  })
  useEffect(() => {
    // alert("donennn")
    let id: any = params.employerId;
    if (parseInt(id)> 0) {
      if (getEmployerRes && parseInt(getEmployerRes['id']) > 0) {
        console.log(getEmployerRes['id'])
        setIntialValues({
          acaPrimaryContactName: getEmployerRes['acaPrimaryContactName'],
          acaPrimaryContactEmail: getEmployerRes['acaPrimaryContactEmail'],
          acaPrimaryContactPhoneNo: getEmployerRes['acaPrimaryContactPhoneNo'],
          acaPrimaryContactPhoneType: getEmployerRes['acaPrimaryContactPhoneType'],    
        }); 
        console.log(initialValues)  
      }
    } else {
      setIntialValues({
        acaPrimaryContactName: "",
        acaPrimaryContactEmail: "",
        acaPrimaryContactPhoneNo: "",
        acaPrimaryContactPhoneType: "",
      });
    }
  }, [getEmployerRes]);

  let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps)
  useEffect(() => {

    if (getUpdateEmpQLEStepsRes && parseInt(getUpdateEmpQLEStepsRes['id']) > 0) {
      setIntialValues({
        acaPrimaryContactName: getUpdateEmpQLEStepsRes['acaPrimaryContactName'],
        acaPrimaryContactEmail: getUpdateEmpQLEStepsRes['acaPrimaryContactEmail'],
        acaPrimaryContactPhoneNo: getUpdateEmpQLEStepsRes['acaPrimaryContactPhoneNo'],
        acaPrimaryContactPhoneType: getUpdateEmpQLEStepsRes['acaPrimaryContactPhoneType'],    
      }); 
    }
  }, [getUpdateEmpQLEStepsRes]);

  const handleCancel=(e: any)=>{
    console.log("cancelled");
    navigate("/employers")
  }
  return (
    <>
    <Formik
      initialValues={initialValues}
      onSubmit={(values: IAddACAForm) =>{
        if (employerId > 0 ){
          setSubmitted(true);
          
          toast.success("Primary Contact details updated successfully");
          console.log("id")
          const tempUpdatePrimaryContact: any ={
            "id": employerId,
            "acaPrimaryContactName": values.acaPrimaryContactName,
            "acaPrimaryContactEmail": values.acaPrimaryContactEmail,
            "acaPrimaryContactPhoneNo": values.acaPrimaryContactPhoneNo,
            "acaPrimaryContactPhoneType": values.acaPrimaryContactPhoneType
          }
          dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdatePrimaryContact))
          setIntialValues({
            acaPrimaryContactName: values.acaPrimaryContactName,
            acaPrimaryContactEmail: values.acaPrimaryContactEmail,
            acaPrimaryContactPhoneNo:  values.acaPrimaryContactPhoneNo,
            acaPrimaryContactPhoneType:  values.acaPrimaryContactPhoneType   
          }); 
         
         
        }
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(props: FormikProps<IAddACAForm>) => {
         const {
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          isValid,
          dirty,
        } = props;
        return(
    <Form >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            InputProps={{
              style: { borderRadius: 0 },
            }}
            id="outlined-basic"
            label="Contact Name"
            variant="outlined"
            name="acaPrimaryContactName"
            fullWidth
            // value={formData.name}
            // onChange={(e) => handleChange(e)}
            value={values.acaPrimaryContactName}
            onChange={handleChange}
            error={touched.acaPrimaryContactName && Boolean(errors.acaPrimaryContactName)}
            helperText={touched.acaPrimaryContactName && errors.acaPrimaryContactName}

          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            InputProps={{
              style: { borderRadius: 0 },
            }}
            id="outlined-basic"
            label="Contact Phone"
            variant="outlined"
            name="acaPrimaryContactPhoneNo"
            fullWidth
            // value={formData.phone}
            // onChange={(e) => handleChange(e)}
            value={values.acaPrimaryContactPhoneNo}
            onChange={handleChange}
            error={touched.acaPrimaryContactPhoneNo && Boolean(errors.acaPrimaryContactPhoneNo)}
            helperText={touched.acaPrimaryContactPhoneNo && errors.acaPrimaryContactPhoneNo}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            InputProps={{
              style: { borderRadius: 0 },
            }}
            id="outlined-basic"
            label="Contact Email"
            variant="outlined"
            name="acaPrimaryContactEmail"
            fullWidth
            // value={formData.email}
            // onChange={(e) => handleChange(e)}
            value={values.acaPrimaryContactEmail}
            onChange={handleChange}
            error={touched.acaPrimaryContactEmail && Boolean(errors.acaPrimaryContactEmail)}
            helperText={touched.acaPrimaryContactEmail && errors.acaPrimaryContactEmail}
          />
        </Grid>

        <Grid item xs={2}>
          <TextField
            InputProps={{
              style: { borderRadius: 0 },
            }}
            id="outlined-select-currency"
            select
            label="Type"
            name="acaPrimaryContactPhoneType"
            // value={formData.type}
            // onChange={(e) => handleChange(e)}
            fullWidth
            value={values.acaPrimaryContactPhoneType}
            onChange={handleChange}
            error={touched.acaPrimaryContactPhoneType && Boolean(errors.acaPrimaryContactPhoneType)}
            helperText={touched.acaPrimaryContactPhoneType && errors.acaPrimaryContactPhoneType}
          >
            <MenuItem value="">
              <em>Select Type</em>
            </MenuItem>
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: "10px",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            className="save-btn-role"
            sx={{ margin: "3px 5px" }}
            type="submit"
            // onClick={() => {
            //   formik.handleSubmit();
            // }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            className="cancel-btn-role"
            sx={{ margin: "3px 5px" }}
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
      </Form>
      )
      }}

      </Formik>
    </>
  );
};
export default PrimaryContact;
