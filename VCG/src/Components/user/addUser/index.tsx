import React, { useState, useEffect } from "react";
import { largeScrees, smallScreen } from "../../../Helper/slider";
import Header from "../../Header";
import SwipeableSidenavbar from "../../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DoubleArrowTwoToneIcon from "@mui/icons-material/DoubleArrowTwoTone";
import { Button } from "@mui/material";
//import { useFormik } from 'formik';
import { Form, Formik, FormikProps, validateYupSchema } from "formik";
import * as yup from 'yup';
import { IAddUserForm, ITempAddUserForm, Y } from "../../../interfaces/userType";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddUserRequest } from "../../../actions/usersActions/addUserActions";
import { getAddUserDetails } from "../../../reducers/usersReducer/addUserReducer";
import { getEditUserDetails } from "../../../reducers/usersReducer/editUserReducer";
import { getGetUserDetails } from "../../../reducers/usersReducer/getUserReducer";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { fetchGetUserRequest } from "../../../actions/usersActions/getUserActions";
import { getAllRolesetDetails } from "../../../reducers/usersReducer/allRolesetReducer";
import { fetchAllRolesetRequest } from "../../../actions/usersActions/allRolesetActions";
import { Irole, AddUser, EditUser } from "../../../interfaces/types";
import { AnalyticsOutlined } from "@mui/icons-material";
import { fetchEditUserRequest } from "../../../actions/usersActions/editUserActions";
import CustomizedSwitches from "../../SwitchButton";
import "../Toggle/ToggleSwitch.css";
import { AnyARecord } from "node:dns";
import { AnyAaaaRecord } from "dns";
import { useNavigate } from "react-router-dom";

const AddUsers = ({
  userId,
  UserData,
}: any) => {

  let params = useParams();
  const dispatch = useDispatch();
  const [isSubmitted, setSubmitted] = useState(false);
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };

  const allRolesetRes = useSelector(getAllRolesetDetails);
  useEffect(() => {
    getRoleset();
  }, []);

  const getRoleset = () => {
    dispatch(
      fetchAllRolesetRequest({})
    );
  };

  const [availableRoleset, setAvailableRoleset] = useState(
    allRolesetRes
  );
  useEffect(() => {
    if (allRolesetRes) {
      setAvailableRoleset(allRolesetRes)
    }
  }, [allRolesetRes]);

  const [selectedPrev, setSelectedPrev] = useState<Irole[]>([]);
  const [selectedPrevRole, setSelectedRoleset] = useState<Y>();
  const [availablePrev, setAvailableRolesett] = useState<Y>();
  const [availPrev, setAvailPrev] = useState(false);
  const [prevPrev, setPrev] = useState(false);
  const [isToggled, setIsToggled] = useState("InActive");


  const pushToSelectedArray = () => {
    setSelectedPrev([...availableRoleset])
    setAvailableRoleset([]);
  };

  const pushToPrevArray = () => {
    setSelectedPrev([]);
    setAvailableRoleset([...selectedPrev]);
  };

  const pushOneToSelectedArray = () => {
    if (availableRoleset.length > 0) {
      const removeIndex = availableRoleset.findIndex(
        (item) => item.id === availablePrev?.id
      );
      // remove object
      let data = availableRoleset.splice(removeIndex, 1);
      let arr = [...selectedPrev, ...data]
      setSelectedPrev(arr);
    }
  };

  const pushOneToAvailableArray = () => {
    if (selectedPrev.length > 0) {
      const removeIndex = selectedPrev.findIndex(
        (item) => item.id === selectedPrevRole?.id
      );
      // remove object
      let res = selectedPrev.splice(removeIndex, 1);
      let arr = [...availableRoleset, ...res]
      setAvailableRoleset(arr);
    }
    setAvailableRolesett(undefined);
  };

  const selectedPrevOne = (prev: any) => {
    setSelectedRoleset(prev);
    setAvailPrev(false);
    setPrev(true);
  };

  const availablePrevOne = (prev: any) => {
    setAvailableRolesett(prev);
    setAvailPrev(true);
    setPrev(false);
  };

  const setAvailableroleset = (selectprev: any) => {
    let filteredArray = availableRoleset.filter(function (array_el) {
      return selectprev.filter(function (anotherOne_el: any) {
        return anotherOne_el.id == array_el.id;
      }).length == 0
    });
    setAvailableRoleset(filteredArray);
  };


  const validationSchema = yup.object({
    username: yup
      .string()
      .required('User Name is required'),
    email: yup.string()
      .email('Please enter valid email format')
      .required('Please enter a valid email'),

    firstname: yup
      .string()
      .required('First Name is required'),

    lastname: yup
      .string()
      .required('Last Name is required'),
  });

  const togglevalues = (value: any) => {
    console.log("handle");
    console.log(value);
  }
  const getUserRes = useSelector(getGetUserDetails);
  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = () => {
    let id: any = params.userId;
    if (id > 0)
      dispatch(
        fetchGetUserRequest({ id })
      );
  };
  
  const navigate = useNavigate();

  const handleCancel = (e: any) => {
    //window.location.assign("/users");
    navigate("/users");
  };

  const [status, setStatus] = React.useState(true);

  const handleSwitch = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setStatus(true);
    }
    else {
      setStatus(false);
    }
  };

  useEffect(() => {
    let id: any = params.userId;
    if (parseInt(id) > 0) {
      if (getUserRes && parseInt(getUserRes['id']) > 0) {
        // const nameSplit=getUserRes['name'].split(' ');
        setInitialValues({
          id: getUserRes['id'],
          username: getUserRes['username'],
          firstname: getUserRes['firstName'],
          middlename: getUserRes['middleName'],
          lastname: getUserRes['lastName'],
          email: getUserRes['email'],
          status: getUserRes['status'],
          roleSet: getUserRes['roles'],

        });
        setStatus(getUserRes['status'] == 'Active' ? true : false);
        //setSelectedPrev(getRoleRes['privilegeSet']);
        setSelectedPrev(getUserRes['roles']);
        let arrRoleset: any[] = getUserRes['roles'];
        if (arrRoleset.length > 0)
          setAvailableroleset(arrRoleset);

      } else { }
    }
    else {
      setInitialValues({
        id: 0,
        username: '',
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        status: 'Active',
        roleSet: [],
      });
    }
  }, [getUserRes]);

  let addUserRes:any = useSelector(getAddUserDetails);
  useEffect(() => {
    if (addUserRes && addUserRes.id > 0) {
      toast.success(`User Added Successfully`);
      addUserRes.id = null;
      setTimeout(() => {
        //window.location.assign("/users");
        navigate("/users");
      }, 1500);
    }
  }, [addUserRes]);

  let editUserRes:any = useSelector(getEditUserDetails);
  useEffect(() => {
    if (editUserRes && editUserRes.id > 0) {
      toast.success(`User Edited Successfully`);
      editUserRes.id = null;
      setTimeout(() => {
        //window.location.assign("/users");
        navigate("/users");
      }, 1500);
    }
  }, [editUserRes]);
  const [initialValues, setInitialValues] = useState<IAddUserForm>({
    id: 0,
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    status: 'Active',
    roleSet: [],
  });

  return (

    <Formik
      initialValues={initialValues}

      onSubmit={(values: IAddUserForm) => {
        setSubmitted(true);
        values.roleSet = selectedPrev;
        let reducedArrayAdduser = values.roleSet.map((item) => item.name);
        // let username=values.firstname+values.middlename+values.lastname;
        const tempData: AddUser = {

          "username": values.username,
          "firstname": values.firstname,
          "middlename": values.middlename,
          "lastname": values.lastname,
          "email": values.email,
          "status": status ? "Active" : "InActive",
          "roleSet": reducedArrayAdduser
        }
        const tempDataEdit: EditUser = {
          "username": values.username,
          "id": values.id,
          "firstname": values.firstname,
          "middlename": values.middlename,
          "lastname": values.lastname,
          "email": values.email,
          "status": status ? "Active" : "InActive",
          "roleSet": reducedArrayAdduser
        }
        if (selectedPrev.length > 0 && values.id == 0) {
          dispatch(fetchAddUserRequest(tempData));
        }
        else if (selectedPrev.length > 0 && values.id > 0) {
          dispatch(fetchEditUserRequest(tempDataEdit));
        }
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(props: FormikProps<IAddUserForm>) => {
        const {
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          isValid,
          dirty,
        } = props;
        { console.log(values) }
        return (

          <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={0}>
              <Grid xs={6} style={{ transition: "500ms" }} md={headerValues.sidebar}>
                <SwipeableSidenavbar width={headerValues.sidebar} />
              </Grid>
              <Grid
                item
                xs={6}
                style={{ transition: "500ms", background: "#f2f2f2" }}
                md={headerValues.header}
              >

                <Header handleHeaders={handleHeaders} />
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid className="title-styling-roles" item xs={8}>
                      Users
                    </Grid>
                  </Grid>
                </Box>
                <div style={{ background: "white", padding: "2rem", margin: "25px" }}>
                  <Form>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2} >
                        <Grid item xs={3}>
                          <TextField
                            id="outlined-search"
                            name="username"
                            label="UserName"
                            type="search"
                            fullWidth
                            value={values.username}
                            onChange={handleChange}
                            error={touched.username && Boolean(errors.username)}
                            helperText={touched.username && errors.username}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id="outlined-search"
                            name="firstname"
                            label="FirstName"
                            type="search"
                            fullWidth
                            value={values.firstname}
                            onChange={handleChange}
                            error={touched.firstname && Boolean(errors.firstname)}
                            helperText={touched.firstname && errors.firstname}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id="outlined-search"
                            name="middlename"
                            label="MiddleName"
                            type="search"
                            fullWidth
                            value={values.middlename}
                            onChange={handleChange}
                            error={touched.middlename && Boolean(errors.middlename)}
                            helperText={touched.middlename && errors.middlename}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id="outlined-search"
                            name="lastname"
                            label="LastName"
                            type="search"
                            fullWidth
                            value={values.lastname}
                            onChange={handleChange}
                            error={touched.lastname && Boolean(errors.lastname)}
                            helperText={touched.lastname && errors.lastname}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <TextField
                            id="outlined-search"
                            name="email"
                            label="Email"
                            type="search"
                            fullWidth
                            multiline
                            rows={2}
                            value={values.email}
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <CustomizedSwitches style={{ float: "left" }} labelPlace="end" label="Active" getData={handleSwitch} checked={status} />
                        </Grid>
                      </Grid>
                    </Box>

                    <Box style={{ marginTop: "50px" }}>
                      <Grid container>

                        <Grid item xs={5}>

                          <List
                            sx={{

                              bgcolor: "background.paper",
                              position: "relative",
                              overflow: "auto",
                              maxHeight: 140,
                              minHeight: 140,
                              border: "1px solid #c0c0c0",
                            }}
                          >
                            {availableRoleset.map((prev) => (
                              <ListItem

                                className={
                                  availablePrev?.id == prev.id ? "active" : "notactive li-role-styling"
                                }
                                key={prev.id}
                                onClick={() => availablePrevOne(prev)}
                              >
                                <ListItemText primary={prev.name} />
                              </ListItem>
                            ))}
                          </List>
                        </Grid>
                        <Grid item xs={2} style={{ padding: "0px 25px" }}>
                          <Button
                            variant="text"
                            className="btn-arrows icons-styling-background"
                            onClick={() => pushToSelectedArray()}
                          >
                            <Typography>
                              <KeyboardDoubleArrowRightIcon className="icons-styling" />
                            </Typography>
                          </Button>
                          <Button
                            variant="text"
                            className="btn-arrows icons-styling-background"
                            onClick={() => pushOneToSelectedArray()}
                          >
                            <Typography>
                              <ArrowForwardIosIcon className="icons-styling" />
                            </Typography>
                          </Button>
                          <Button
                            variant="text"
                            className="btn-arrows icons-styling-background"
                            onClick={() => pushOneToAvailableArray()}
                          >
                            <Typography>
                              <ArrowBackIosNewIcon className="icons-styling" />
                            </Typography>
                          </Button>
                          <Button
                            variant="text"
                            className="btn-arrows icons-styling-background"
                            onClick={() => pushToPrevArray()}
                          >
                            <Typography>
                              <KeyboardDoubleArrowLeftIcon className="icons-styling" />
                            </Typography>
                          </Button>
                        </Grid>
                        <Grid item xs={5}>
                          <List
                            sx={{
                              width: "100%",
                              bgcolor: "background.paper",
                              position: "relative",
                              overflow: "auto",
                              minHeight: 140,
                              maxHeight: 140,
                              border: "1px solid #c0c0c0",
                              // "& ul": { padding: 0 },
                            }}
                          // subheader={<li />}
                          >

                            {selectedPrev.length > 0 &&
                              selectedPrev?.map((prev) => (
                                <ListItem
                                  className={
                                    selectedPrevRole?.id == prev.id
                                      ? "active"
                                      : "notactive"
                                  }

                                  key={prev.id}
                                  onClick={() => selectedPrevOne(prev)}
                                >
                                  <ListItemText primary={prev.name} />
                                </ListItem>
                              ))

                            }
                          </List>
                          <div className={selectedPrev.length == 0 && isSubmitted? "error-span show" : "error-span"}>
                            {selectedPrev.length == 0 ? "Please select Roles" : ""}
                          </div>
                          <Grid className="roles-btn">

                            <Button className="cancel-btn-role" variant="outlined" size="medium" onClick={(e) => handleCancel(e)}> Cancel </Button>
                            <Button className="save-btn-role" variant="outlined" size="medium" type="submit"> Save </Button>
                          </Grid>
                        </Grid>
                      </Grid>

                    </Box>
                  </Form>
                </div>
              </Grid>
            </Grid>
          </Box>
        )
      }}
    </Formik>
  );
};

export default AddUsers;
