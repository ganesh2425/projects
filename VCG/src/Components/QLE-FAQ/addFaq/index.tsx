import React, { useState, useEffect } from "react";
import Header from "../../Header";
import SwipeableSidenavbar from "../../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { largeScrees, smallScreen } from "../../../Helper/slider";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import DraggableComponent from "../../Draggable";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import "../style.css";
import TextEditor from "../../TextEditor";
import { useDispatch, useSelector } from "react-redux";
// import { getAllQleFaqsDetails } from "../../../reducers/allQleFaqsReducer";
import { fetchGetFaqRequest } from "../../../actions/qleFaqActions/getFaqActions";
import { AddFaq, EditFaq, IFaq } from "../../../interfaces/qleFaqType";
import { getFaqById } from "../../../reducers/qleFaqReducer/getFaqReducer";
import { getAddFaqDetails } from "../../../reducers/qleFaqReducer/addFaqReducer";
import { toast } from "react-toastify";
import { getEditFaqDetails } from "../../../reducers/qleFaqReducer/editFaqReducer";
import { Form, Formik, FormikProps } from "formik";
import { fetchAddFaqRequest } from "../../../actions/qleFaqActions/addFaqActions";
import { fetchEditFaqRequest } from "../../../actions/qleFaqActions/editFaqActions";
import * as yup from "yup";
import { getAllEmployerDetails } from "../../../reducers/employersReducer/allEmployersReducer";
import { fetchAllEmployersRequest } from "../../../actions/employersActions/allEmployersActions";

const useStyles = makeStyles({
  root: {
    "& .MuiInputLabel-root": { top: "-3px" },
    "& .MuiOutlinedInput-root": { borderRadius: "0px" },
    "& .css-xso64x-MuiTableCell-root": { padding: "10px !important" },
  },
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const QLE_ADD_FAQ = (props: any) => {

  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const [employer, setEmployer] = useState("");
  const [question, setQuestion] = useState("");
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  

  //   const [dialogOpen, setDialogOpen] = React.useState(false);
  // const [questionNo, setQuestionNo] = useState(0);
  
  // const handleChange = (event) => {
  //   setQuestionNo(parseInt(event.target.value));
  // };
  
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (e: any) => {
    setOpen(true);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const handleChange = (event: any) => {
  //   setEmployer(event.target.value);
  // };
  
  const [employerId, setEmployerId] = useState("0");
  const classses = useStyles();
  let params = useParams();
  const [isSubmitted, setSubmitted] = useState(false);
  const dispatch = useDispatch()
  const [answerData, setAnswerData] = React.useState('');
  // const [type, setType] = React.useState('QLE');
  let type: any = params.type;
  // if(typeParam == 'ACA'){
  //   console.log("type",type)
  //   setType('ACA');
  // }
  const getFaqRes = useSelector(getFaqById);
  useEffect(() => {
    getFaqDetailsById();
  }, []);

  useEffect(() => {
    let id: any = params.id;
    if (id > 0) {
      if (getFaqRes && getFaqRes['id'] > 0) {
        let answer = getFaqRes['answer'];
        setAnswerData(answer);
        setQuestion(getFaqRes['question']);
        setEmployer(getFaqRes['employer']);
        setEmployerId(getFaqRes['employerId']);
        // setQuestionNo(getFaqRes['number']);
        // setType(getFaqRes['type']);
      }
    } 
  }, [getFaqRes]);
  
  const handleAnswerData = (incomingData: any) => {
    setAnswerData(incomingData);
  }

  const getFaqDetailsById = () => {
    let id: any = params.id;
    // let id: any = 1;
    if (id > 0)
      dispatch(
        fetchGetFaqRequest({ id })
      );
  };

  useEffect(() => {
    let id: any = params.id;
    if (parseInt(id) > 0) {
      if (getFaqRes && getFaqRes['id'] > 0) {
        console.log(getFaqRes['id'])
        setInitialValues({
          id: getFaqRes['id'],
          number:getFaqRes['number'],
          type : getFaqRes['type'],
          question: getFaqRes['question'],
          answer: getFaqRes['answer'],
          employer: getFaqRes['employer'],
          employerId : getFaqRes['employerId']
        });
    }
    // else {
    //   setInitialValues({
    //     id: 0,
    //     username: '',
    //     firstname: '',
    //     middlename: '',
    //     lastname: '',
    //     email: '',
    //     status: 'Active',
    //     roleSet: [],
    //   });
    }
  }
  , [getFaqRes]);

  const validationSchema = yup.object({
    employer: yup.string().required("Employer Name is required"),
    question: yup.string().required("Question is required"),
    Answer: yup.string().required("Answer is required"),
  });

  const [initialValues, setInitialValues] = useState<AddFaq>({
    id: 0,
    number:0,
    type : '',
    question: '',
    answer: '',
    employer:'',
    employerId: 0,
  });

  let addFaqRes:any = useSelector(getAddFaqDetails);
  useEffect(() => {
    if (addFaqRes && addFaqRes.id > 0) {
      toast.success(`Faq Added Successfully`);
      addFaqRes.id = null;
      setTimeout(() => {
        //window.location.assign("/users");
        navigate(`/qleFaqs/${type}`);
      }, 1500);
    }
  }, [addFaqRes]);

  let editFaqRes:any = useSelector(getEditFaqDetails);
  useEffect(() => {
    if (editFaqRes && editFaqRes.id > 0) {
      toast.success(`Faq Edited Successfully`);
      editFaqRes.id = null;
      setTimeout(() => {
        //window.location.assign("/users");
        // navigate(`/faq/qle/${editFaqRes.id}`);
        navigate(`/qleFaqs/${type}`);
      }, 1500);
    }
  }, [editFaqRes]);
  
  const handleSubmit = () => {
    let id: any = params.id;
    if(typeof id === 'undefined' || id == 0){
      setSubmitted(true);
      const tempUpdateFaqData: any = {
        "id": id,
        "answer": answerData,
        "question":question,
        "employer":employerId,
        "type":type
        // "number":questionNo
      }
      if(answerData && question && employer)
      dispatch(fetchAddFaqRequest(tempUpdateFaqData));
    }else if (id > 0) {
      setSubmitted(true);
      const tempUpdateFaqData: any = {
        "id": id,
        "answer": answerData,
        "question":question,
        "employer":employer,
        "type": type
      }
      
      if(answerData && question && employer)
      dispatch(fetchEditFaqRequest(tempUpdateFaqData));
    }
    
    
  }

  const handleCancel = (e: any) => {
    //window.location.assign("/users");
    navigate(`/qleFaqs/${type}`);
  };

  const getEvents = () => {
    dispatch(
      fetchAllEmployersRequest({})
    );
  };

  const menuRes = useSelector(getAllEmployerDetails);
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Formik
      initialValues={initialValues}

      onSubmit={(values: IFaq) => {
        console.log("values",values);
        setSubmitted(true);
        const tempData: AddFaq = {
          "id": values.id,
          "number": values.number,
          "type" : values.type,
          "question": values.question,
          "answer": values.answer,
          "employer": values.employer,
          "employerId": values.employerId,
        }
        const tempDataEdit: EditFaq = {
          "id": values.id,
          "number": values.number,
          "type" : values.type,
          "question": values.question,
          "answer": values.answer,
          "employer": values.employer
        }
        if (values.id == 0) {
          dispatch(fetchAddFaqRequest(tempData));
        }
        else if (values.id > 0) {
          dispatch(fetchEditFaqRequest(tempDataEdit));
        }
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(props: FormikProps<AddFaq>) => {
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid
            xs={6}
            style={{ transition: "500ms", background: "#f2f2f2" }}
            md={headerValues.sidebar}
            item
          >
            <SwipeableSidenavbar width={headerValues.sidebar} />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ transition: "500ms", background: "#f2f2f2" }}
            md={headerValues.header}
          >
            <Header handleHeaders={handleHeaders} />

            {/* <Box sx={{ flexGrow: 1 }}>
              <Grid spacing={2}>
                <Grid xs={8}>Roles</Grid>
                <Grid xs={4}>Add Role</Grid>
              </Grid>
            </Box> */}

            <Box style={{ margin: "34px 19px 20px 19px" }} sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} >
                <Grid className="title-styling" item xs={10}>
                  {type} / FAQ
                </Grid>
              </Grid>
            </Box>
            <Form>
            <Paper sx={{padding: "20px", margin: "20px", boxShadow:"none"}}>
              <Grid container sx={{ margin: "20px 0px" }}>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Employer
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Employer"
                      // onChange={handleChange}
                      onChange={(e) => (setEmployer(e.target.value))}
                      fullWidth
                      value={employerId}
                      name="employer"
                      // error={touched.employer && Boolean(errors.employer)}
                      // helperText={touched.employer && errors.employer}
                    >
                      <MenuItem value="0">Select
                      </MenuItem>
                      {menuRes && menuRes.length > 0 &&
                        menuRes.map((e: any, idx: number) => (
                          <MenuItem value={e.id} key={idx} onClick={() => setEmployerId(e.id)} >
                            {e.name}
                          </MenuItem>
                        ))}
                    </Select>
                    <div className={!employerId  && isSubmitted ? "error-span show" : "error-span"}>
                      {!employerId && isSubmitted? "Please Select the Employer" : ""}
                    </div>
                  </FormControl>
                </Grid>
               {/* <Grid container xs={12} sx={{margin:"10px 0px"}}>
                      <TextField fullWidth value={questionNo} onChange={(e) => (setQuestionNo(parseInt(e.target.value)))} id="outlined-basic" label="Question Number" variant="outlined"/>
                       <TextField fullWidth value={questionNo} onChange={handleChange}  id="outlined-basic" label="Question Number" variant="outlined"/> 
                </Grid>*/}
                <Grid container xs={12} sx={{margin:"10px 0px"}}>
                      <TextField 
                      fullWidth 
                      value={question} 
                      onChange={(e) => (setQuestion(e.target.value))}
                      // onChange={handleChange} 
                      id="outlined-basic" label="Question" variant="outlined"
                      name="question"
                      // error={touched.question && Boolean(errors.question)}
                      // helperText={touched.question && errors.question}
                      />
                </Grid>
                <div className={!question  && isSubmitted ? "error-span show" : "error-span"}>
                  {!question && isSubmitted? "Please enter data" : ""}
                </div>
              </Grid>

              <Typography>
                Answer
              </Typography>
              <TextEditor data={answerData} handleEditorData={handleAnswerData} />
              <div className={!answerData  && isSubmitted ? "error-span show" : "error-span"}>
                {!answerData && isSubmitted? "Please enter data" : ""}
              </div>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  margin: "10px 0px",
                }}
              >
                <Button
                  variant="contained"
                  className="save-btn-role"
                  sx={{ margin: "3px 5px" }}
                  onClick={handleSubmit}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  className="cancel-btn-role"
                  sx={{ margin: "3px 5px" }}
                  onClick={(e) => handleCancel(e)}
                >
                  Cancel
                </Button>
              </Grid>
            </Paper>
            </Form>
            <Grid
              container
              xs={3}
              sx={{
                position: "relative",
                bottom: 0,
                left: "2",
                margin: "10px",
                color: "gray",
              }}
            >
              © Copyright 2022. All Rights Reserved.
            </Grid>
          </Grid>
        </Grid>
      </Box>
       )
      }}
     </Formik>
     
  );
};

export default QLE_ADD_FAQ;