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
import { Form, Formik, FormikProps } from "formik";
import * as yup from 'yup';
import { IAddRoleForm, ITempAddRoleForm, Y } from "../../../interfaces/roleType";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddRoleRequest } from "../../../actions/rolesActions/addRoleActions";
import { getAddRoleDetails } from "../../../reducers/rolesReducer/addRoleReducer";
import { getEditRoleDetails } from "../../../reducers/rolesReducer/editRoleReducer";
import { getRoleDetails } from "../../../reducers/rolesReducer/getRoleReducer";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { fetchGetRoleRequest } from "../../../actions/rolesActions/getRoleActions";
import { getAllPrivilegesDetails } from "../../../reducers/rolesReducer/allPrivilegesReducer";
import { fetchAllPrivilegesRequest } from "../../../actions/rolesActions/allPrivilegesActions";
import { IPrivileges, AddRole, EditRole } from "../../../interfaces/types";
import { AnalyticsOutlined } from "@mui/icons-material";
import { fetchEditRoleRequest } from "../../../actions/rolesActions/editRoleActions";
import { AnyARecord } from "node:dns";
import { AnyAaaaRecord } from "dns";
import { useNavigate } from "react-router-dom";

const AddRoles = ({
  roleId,
  priviligesData,
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

  const allPrivilegesRes = useSelector(getAllPrivilegesDetails);
  useEffect(() => {
    getPrivileges();
  }, []);
  
  const getPrivileges = () => {
    dispatch(
      fetchAllPrivilegesRequest({})
    );
  };

  const [availablePrevileges, setAvailablePrevileges] = useState(
    allPrivilegesRes
  );
  useEffect(() => {
    if (allPrivilegesRes) {
      setAvailablePrevileges(allPrivilegesRes)
    }
  }, [allPrivilegesRes]);

  const [selectedPrev, setSelectedPrev] = useState<IPrivileges[]>([]);
  const [selectedPrevRole, setSelectedPrevilage] = useState<Y>();
  const [availablePrev, setAvailablePrevilage] = useState<Y>();
  const [availPrev, setAvailPrev] = useState(false);
  const [prevPrev, setPrev] = useState(false);

  const pushToSelectedArray = () => {
    setSelectedPrev([...availablePrevileges])
    setAvailablePrevileges([]);
  };

  const pushToPrevArray = () => {
    setSelectedPrev([]);
    setAvailablePrevileges([...selectedPrev]);
  };

  const pushOneToSelectedArray = () => {
    console.log(selectedPrevRole, availablePrev, availPrev, prevPrev);
    if (availablePrevileges.length > 0) {
      const removeIndex = availablePrevileges.findIndex(
        (item) => item.id === availablePrev?.id
      );
      // remove object
      let data = availablePrevileges.splice(removeIndex, 1);
      let arr = [...selectedPrev , ...data]
      setSelectedPrev(arr);
    }
  };

  const pushOneToAvailableArray = () => {
    if (selectedPrev.length > 0) {
      const removeIndex = selectedPrev.findIndex(
        (item) => item.id === selectedPrevRole?.id
      );
      // remove object
     let res =  selectedPrev.splice(removeIndex, 1);
     let arr = [...availablePrevileges , ...res]
      setAvailablePrevileges(arr);
    }
    setAvailablePrevilage(undefined);
  };

  const selectedPrevOne = (prev: any) => {
    setSelectedPrevilage(prev);
    setAvailPrev(false);
    setPrev(true);
  };

  const availablePrevOne = (prev: any) => {
    setAvailablePrevilage(prev);
    setAvailPrev(true);
    setPrev(false);
  };

  const setAvailablePreviliges = (selectprev: any) => {
    let filteredArray  = availablePrevileges.filter(function(array_el){
      return selectprev.filter(function(anotherOne_el:any){
         return anotherOne_el.id == array_el.id;
      }).length == 0
   });
   setAvailablePrevileges(filteredArray);
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Name is required'),
    description: yup
      .string()
      .required('Description is required'),
  });

  const getRoleRes = useSelector(getRoleDetails);
  useEffect(() => {
    getRoleById();
  }, []);

  const getRoleById = () => {
    let id: any = params.roleId;
    if (id > 0)
      dispatch(
        fetchGetRoleRequest({ id })
      );
  };

  const navigate = useNavigate();

  const handleCancel = (e: any) => {
    console.log("cancelled");
    navigate("/roles");
  };

  useEffect(() => {
    let id: any = params.roleId;
    if (parseInt(id) > 0) {
      if (getRoleRes && parseInt(getRoleRes['id']) > 0) {
        console.log(getRoleRes['id']);
        setInitialValues({
          id: getRoleRes['id'],
          name: getRoleRes['name'],
          description: getRoleRes['description'],
          privilegeSet: getRoleRes['privileges'],
        });
        console.log(initialValues);
        //setSelectedPrev(getRoleRes['privilegeSet']);
        setSelectedPrev(getRoleRes['privileges']);
        let arrPreviliges: any[] = getRoleRes['privileges'];
        if (arrPreviliges && arrPreviliges.length > 0)
         setAvailablePreviliges(arrPreviliges);        

      } else { }
    }
    else {
      setInitialValues({
        id: 0,
        name: '',
        description: '',
        privilegeSet: [],
      });
    }
  }, [getRoleRes]);

  let addRoleRes:any = useSelector(getAddRoleDetails);
  useEffect(() => {
    if (addRoleRes && addRoleRes.id > 0) {
      console.log(addRoleRes);
      toast.success(`Role Added Successfully`);
      addRoleRes.id = null;
      setTimeout(() => {
        //window.location.assign("/roles");
        navigate("/roles");
      }, 1500);
    }
  }, [addRoleRes]);

  let editRoleRes:any = useSelector(getEditRoleDetails);
  useEffect(() => {
    if (editRoleRes && editRoleRes.id > 0) {
      console.log(addRoleRes);
      toast.success(`Role Edited Successfully`);
      editRoleRes.id = null;
      setTimeout(() => {
        //window.location.assign("/roles");
        navigate("/roles");
      }, 1500);
    }
  }, [editRoleRes]);

  const [initialValues, setInitialValues] = useState<IAddRoleForm>({
    id: 0,
    name: '',
    description: '',
    privilegeSet: [],
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: IAddRoleForm) => {
        setSubmitted(true);
        values.privilegeSet = selectedPrev;
        let reducedArray = values.privilegeSet.map((item) => item.name);
        const tempData: AddRole = {
          "name": values.name,
          "description": values.description,
          "privilegeSet": reducedArray
        }
        const tempDataEdit: EditRole = {
          "id": values.id,
          "name": values.name,
          "description": values.description,
          "privilegeSet": reducedArray
        }

        if (selectedPrev.length > 0 && values.id == 0) {
          dispatch(fetchAddRoleRequest(tempData));
        }
        else if (values.id > 0) {
          dispatch(fetchEditRoleRequest(tempDataEdit));
        }
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(props: FormikProps<IAddRoleForm>) => {
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
                      Roles
                    </Grid>
                  </Grid>
                </Box>
                <div style={{ background: "white", padding: "2rem", margin: "25px" }}>
                  <Form>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-search"
                            name="name"
                            label="Name"
                            type="search"
                            fullWidth
                            value={values.name}
                            onChange={handleChange}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            id="outlined-search"
                            name="description"
                            label="Description"
                            type="search"
                            fullWidth
                            multiline
                            rows={2}
                            value={values.description}
                            onChange={handleChange}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                          />
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
                            {console.log(availablePrevileges)}
                            {availablePrevileges.map((prev) => (
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

                            {selectedPrev && selectedPrev.length > 0 &&
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
                              ))}
                          </List>
                          <div className={selectedPrev && selectedPrev.length == 0 && isSubmitted? "error-span show" : "error-span"}>
                            {selectedPrev && selectedPrev.length == 0 ? "Please select privileges" : ""}
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

export default AddRoles;
