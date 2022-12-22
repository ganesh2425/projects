import { Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import CustomizedSwitches from "../../SwitchButton";
import * as yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchAddEmployerRequest,
  fetchAddEmployerSuccess,
} from "../../../actions/employersActions/addEmployerActions";
import { getAddEmployerDetails } from "../../../reducers/employersReducer/addEmployerReducer";
import { toast } from "react-toastify";
import { getEditEmployerDetails } from "../../../reducers/employersReducer/editEmployerReducer";
import { getEmployerDetails } from "../../../reducers/employersReducer/getEmployerReducer";
import { Button } from "@mui/material";
import { IAddEmployerForm } from "../../../interfaces/employerType";
import { Form, Formik, FormikProps } from "formik";
import { AddEmployer, EditEmployer } from "../../../interfaces/types";
import { fetchEditEmployerRequest } from "../../../actions/employersActions/editEmployerActions";
import { fetchGetEmployerRequest } from "../../../actions/employersActions/getEmployerActions";
import { useParams } from "react-router-dom";
import { PHONE, dZIPCODE, EINNUMBER } from "../../../constants/actionTypes";
import { useNavigate } from "react-router-dom";
import { getSTATESEnteredDetails } from "../../../reducers/employersReducer/statesReducer";
import { fetchSTATESRequest } from "../../../actions/employersActions/statesActions";
import { getUpdateEmpQLESteps } from "../../../reducers/employersReducer/updateEmpQLEStepsReducer";

const NewEmployerInformationForm = () => {
  const [state, setState] = React.useState("");
  const [empType, setEmpType] = React.useState("");

  const [URLSlug, SetURLSlug] = React.useState("");
  const [EIN, setEIN] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [signature, setSignature] = React.useState("");
  const [isToggled, setIsToggled] = useState("0");
  const [status, setStatus] = React.useState(true);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
    borderRadius: "0px",
    boxShadow: "none",
  }));

  const statesOld = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "DC", label: "District Of Columbia" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ];

  const employerType = [
    { value: "cell", label: "Cell" },
    { value: "work", label: "Work" },
    { value: "home", label: "Home" },
  ];

  let params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = (e: any) => {
    navigate("/employers");
  };

  const statesRes = useSelector(getSTATESEnteredDetails);
  useEffect(() => {
    getStates();
  }, []);

  const getStates = () => {
    dispatch(fetchSTATESRequest({}));
  };

  const [states, setStates] = useState([]);

  useEffect(() => {
    if (statesRes && statesRes.response) {
      setStates(statesRes.response);
    }
  }, [statesRes]);

  let getEmployerRes: any = useSelector(getEmployerDetails);

  const [rolesData, setRows] = React.useState(getEmployerRes);

  const getEmployerById = () => {
    let id: any = params.employerId;
    dispatch(fetchGetEmployerRequest({ id }));
  };

  useEffect(() => {
    if (getEmployerRes) {
      setRows(getEmployerRes);
    }
  }, [getEmployerRes]);

  const handleSwitch = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  useEffect(() => {
    let id: any = params.employerId;
    if (parseInt(id) > 0) {
      if (getEmployerRes && parseInt(getEmployerRes["id"]) > 0) {
        console.log(getEmployerRes["id"]);
        setIntialValues({
          id: getEmployerRes["id"],
          name: getEmployerRes["name"],
          ein: getEmployerRes["ein"],
          address: getEmployerRes["address"],
          status: getEmployerRes["status"],
          city: getEmployerRes["city"],
          state: getEmployerRes["state"],
          zipCode: getEmployerRes["zipCode"],
          url: getEmployerRes["url"],
          phoneNo: getEmployerRes["phoneNo"],
          phoneType: getEmployerRes["phoneType"],
          qleHomePageDescription: getEmployerRes["qleHomePageDescription"],
        });
        setStatus(getEmployerRes["status"] == "Active" ? true : false);
      }
    } else {
      setIntialValues({
        id: 0,
        name: "",
        ein: "",
        address: "",
        status: "Active",
        city: "",
        state: "",
        url: "",
        zipCode: "",
        phoneNo: "",
        phoneType: "",
        qleHomePageDescription: "",
      });
    }
  }, [getEmployerRes]);

  const re =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

  const validationSchema = yup.object({
    name: yup.string().required("Employer Name is required"),
    ein: yup
      .string()
      .required("EIN Number is required")
      .matches(EINNUMBER, "EIN Number should be Numbers"),
    address: yup.string().required("Valid Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zipCode: yup
      .string()
      .required("ZipCode is required")
      .matches(dZIPCODE, "Zip Code is not valid"),
    phoneNo: yup
      .string()
      .matches(PHONE, "Mobile number is not valid")
      .required("Mobile Number is required"),
    phoneType: yup.string().required("Phone Type is required"),
  });

  let addEmployerRes: any = useSelector(getAddEmployerDetails);
  let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps);

  useEffect(() => {
    if (addEmployerRes && addEmployerRes.id > 0) {
      toast.success("Employer added successfully");
      getEmployerById();
      getUpdateEmpQLEStepsRes = null;
      addEmployerRes.id = null;
    } else if (addEmployerRes.error === "Unauthorized") {
      toast.error(
        "Employer could not be added. Please recheck the information entered."
      );
    }
  }, [addEmployerRes]);

  let editEmployerRes: any = useSelector(getEditEmployerDetails);
  useEffect(() => {
    if (editEmployerRes && editEmployerRes.id > 0) {
      toast.success(`Employer Updated Successfully`);
      getEmployerById();
      editEmployerRes.id = null;
    }
  }, [editEmployerRes]);

  const [initialValues, setIntialValues] = useState<IAddEmployerForm>({
    id: 0,
    name: "",
    ein: "",
    address: "",
    status: "Active",
    url: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNo: "",
    phoneType: "",
    qleHomePageDescription: "",
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: IAddEmployerForm) => {
          const tempData: AddEmployer = {
            name: values.name,
            url: `/${values.name}`,
            ein: values.ein,
            address: values.address,
            city: values.city,
            state: values.state,
            zipCode: values.zipCode,
            phoneNo: values.phoneNo,
            phoneType: values.phoneType,
            //"status": status ? "1" : "0",
            status: status ? "Active" : "InActive",
            qleHomePageDescription: values.qleHomePageDescription,
          };
          const tempEditEmployer: EditEmployer = {
            name: values.name,
            url: `/${values.name}`,
            ein: values.ein,
            address: values.address,
            city: values.city,
            state: values.state,
            zipCode: values.zipCode,
            phoneNo: values.phoneNo,
            phoneType: values.phoneType,
            //"status": status ? "1" : "0",
            status: status ? "Active" : "InActive",
            qleHomePageDescription: values.qleHomePageDescription,
            id: values.id,
            qleEventTypes: [],
            qlePlan: [],
            qleEnabled: false,
            acaEnabled: false,
          };

          if (values.id == 0) {
            dispatch(fetchAddEmployerRequest(tempData));
            toast.success(`Employer Added Successfully`);
            navigate('/employers');
          } else if (values.id > 0) {
            dispatch(fetchEditEmployerRequest(tempEditEmployer));
          }
        }}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(props: FormikProps<IAddEmployerForm>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isValid,
            dirty,
          } = props;

          return (
            <Form>
              <Grid container className="emp-form-container">
                <Grid item xs={4}>
                  <Item>
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <TextField
                      id="outlined-basic"
                      label="URL Slug (Generated Automatically)"
                      variant="outlined"
                      name="url"
                      fullWidth
                      value={values.name ? `/${values.name}` : ""}
                      onChange={handleChange}
                      error={touched.url && Boolean(errors.url)}
                      helperText={touched.url && errors.url}
                      disabled
                      className="disable styling"
                    />
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <TextField
                      id="outlined-basic"
                      label="Employer Identification Number (EIN)"
                      variant="outlined"
                      name="ein"
                      type="number"
                      value={values.ein}
                      onChange={handleChange}
                      placeholder="00-0000000"
                      fullWidth
                      error={touched.ein && Boolean(errors.ein)}
                      helperText={touched.ein && errors.ein}
                    />
                  </Item>
                </Grid>
                <Grid item xs={5}>
                  <Item>
                    {" "}
                    <TextField
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      fullWidth
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    {" "}
                    <TextField
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      name="city"
                      fullWidth
                      value={values.city}
                      onChange={handleChange}
                      error={touched.city && Boolean(errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Item>
                </Grid>
                <Grid item xs={2}>
                  <Item>
                    <TextField
                      id="outlined-select-currency"
                      name="state"
                      select
                      label="Select State"
                      onChange={handleChange}
                      fullWidth
                      sx={{ color: "black" }}
                      value={values.state}
                      error={touched.state && Boolean(errors.state)}
                      helperText={touched.state && errors.state}
                    >
                      {states.map((option: any) => (
                        <MenuItem key={option.stateId} value={option.stateId}>
                          {option.stateName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Item>
                </Grid>
                <Grid item xs={2}>
                  <Item>
                    {" "}
                    <TextField
                      id="outlined-basic"
                      label="Zip"
                      variant="outlined"
                      name="zipCode"
                      fullWidth
                      value={values.zipCode}
                      onChange={handleChange}
                      error={touched.zipCode && Boolean(errors.zipCode)}
                      helperText={touched.zipCode && errors.zipCode}
                    />
                  </Item>
                </Grid>

                <Grid item xs={3}>
                  <Item>
                    {" "}
                    <TextField
                      id="outlined-basic"
                      label="Employer Contact Number"
                      variant="outlined"
                      name="phoneNo"
                      type="number"
                      fullWidth
                      value={values.phoneNo}
                      onChange={handleChange}
                      error={touched.phoneNo && Boolean(errors.phoneNo)}
                      helperText={touched.phoneNo && errors.phoneNo}
                    />
                  </Item>
                </Grid>
                <Grid item xs={2}>
                  <Item>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select Type"
                      name="phoneType"
                      value={values.phoneType}
                      onChange={handleChange}
                      error={touched.phoneType && Boolean(errors.phoneType)}
                      helperText={touched.phoneType && errors.phoneType}
                      fullWidth
                    >
                      {employerType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <CustomizedSwitches
                    style={{ float: "left" }}
                    labelPlace="end"
                    label="Active"
                    getData={handleSwitch}
                    checked={status}
                  />
                </Grid>

                <Grid className="roles-btn" sx={{ ml: "auto" }}>
                  <Button
                    className="cancel-btn-role"
                    variant="outlined"
                    size="medium"
                    onClick={(e) => handleCancel(e)}
                  >
                    {" "}
                    Cancel{" "}
                  </Button>
                  <Button
                    className="save-btn-role"
                    variant="outlined"
                    size="medium"
                    type="submit"
                  >
                    {" "}
                    Save{" "}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default NewEmployerInformationForm;

function data(
  data: any
): import("../../../interfaces/types").FetchAddEmployerRequest {
  throw new Error("Function not implemented.");
}
