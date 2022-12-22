import React, { useEffect, useState, useRef } from "react";
import { Box, flexbox } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Button, Grid, TextField } from "@mui/material";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import "./style.css";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchSTEP3Request } from "../../actions/step3Actions";
import { Istep3Form } from "../../interfaces/types";
import { getSTEP1EnteredDetails } from "../../reducers/step1Reducer";
import { fetchGetStep3Request } from "../../actions/getStep3Actions";
import { useParams } from "react-router-dom";
import { getStep3Details } from "../../reducers/getstep3Reducer";
import { fetchEditStep3Request } from "../../actions/editStep3Actions";
import { getEditStep3Details } from "../../reducers/editStep3Reducer";
import { toast } from "react-toastify";
import { getSTEP3EnteredDetails } from "../../reducers/step3Reducer";
import FileViewer from 'react-file-viewer';
import FilePreview from "react-file-preview-latest";
import { UploadFile, PictureAsPdf, Image, Preview } from "@mui/icons-material";
import { string } from "yup/lib/locale";
import { getStep1Details } from "../../reducers/getStep1Reducer";
import { fetchGetStep1Request } from "../../actions/getStep1Actions";
import ArticleIcon from '@mui/icons-material/Article';
import { useFormik } from "formik";
import ReactHtmlParser from 'html-react-parser';
import StorageService from "../../services/Storage.service";

const UploadDocumentation = ({ token }: any) => {
  let employerNameCoki = StorageService.getCookies("employerName");
  let params = useParams();
  const dispatch = useDispatch();
  const [file, setFile] = useState({});
  const [fileType, setFileType] = useState("");

  const navigate = useNavigate();

  const [isSubmitted, setSubmitted] = useState(false);

  let step1Res: any = useSelector(getStep1Details);

  useEffect(() => {
    step1Res = null;
    getStep1ByEventId();
  }, []);

  const getStep1ByEventId = () => {
    let token: any = params.token;
    if (token && token !== "0")
      dispatch(
        fetchGetStep1Request({ token })
      );
  };

  const [preview, setPreview] = useState(false);

  const previewFile = (fileItems: any) => {
    debugger
    setPreview(false);
    forceUpdate();
    const fileExt = fileItems.file.name.split(".").pop().toLowerCase();
    let file = fileItems.file;
    if (fileExt === 'doc' || fileExt === 'docx') {
      file = URL.createObjectURL(fileItems.file);
    }
    setFile(file);
    setFileType(fileItems.file.name.split(".")[1]);
    setPreview(true);
  };

  const closePreview = (fileItems: any) => {
    setPreview(false);
  };

  interface fileList {
    fileName: string;
    file: any
  }
  const [children, setChildren] = useState<fileList[]>([]);
  const [fileName, setFileName] = useState("");
  const [userFile, setUserFile] = useState<any>(null as any);
  const [fileKey, setFileKey] = useState<any>("");
  const [errorMsg, setErrorMsg] = useState("");

  const ref: any = useRef();

  const handleFileChoose = (ev: any) => {
    if (ev.target.files[0].name.split('.').length > 2) {
      setErrorMsg("The file name should not include '.' in it.");
      return false;
    }
    else {
      let regexp = /^[a-zA-Z0-9-_]+$/;
      if ((ev.target.files[0].name.split('.'))[0].search(regexp) == -1) {
        setErrorMsg("The file name should contain only alpha numeric characters, underscrore and hyphen only.");
        return false;
      }
    }
    setUserFile(ev.target.files[0]);
    //setFileKey(ev.target.files[0].name);
    setErrorMsg("");
  };

  const addChild = () => {
    if (userFile &&
      !['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'].includes(userFile.name.split('.').pop().toLowerCase())) {
      alert('Please upload only file with below formats - PDF, Image, Doc,Docx');
      return;
    }
    const cloneChildren = [...children];
    cloneChildren.push({
      fileName: fileName,
      file: userFile
    });
    setChildren(cloneChildren);
    setFileName("");
    ref.current.value = null
    setFileKey("")
    setUserFile(null);


    // if (userFile){
    //   setUserFile(null)
    //   setFileKey(userFile.name);
    //   setFileKey("");
    // }
  };

  const handleDelete = (index: number) => {
    const cloneChildren = [...children];
    cloneChildren.splice(index, 1);
    setChildren(cloneChildren);
  };
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

  const onError = (error: any) => {
    console.log(error);
  }

  let step3Res: any = useSelector(getSTEP3EnteredDetails);

  // const allStepsCompleted = () => {
  //   debugger
  //   setSubmitted(true);
  //   if (children && children.length > 0) {
  //     const formData = new FormData();
  //     if (step1Res && step1Res.eventId > 0) {
  //       let evtId = step1Res.eventId.toString();
  //       formData.append('eventId', evtId);

  //       for (let i of children) {
  //         formData.append('fileName', i.fileName);
  //         formData.append('file', i.file);
  //       }
  //       dispatch(fetchSTEP3Request({ formData }));
  //       navigate("/form-thankyou");
  //       //checkResult();
  //     }
  //   }
  // }

  const [initialValues, setInitialValues] = useState<any>({
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values: any, actions) => {
      setSubmitted(true);
      if (children && children.length > 0) {
        const formData = new FormData();
        if (step1Res && step1Res.eventId > 0) {
          let evtId = step1Res.eventId.toString();
          formData.append('eventId', evtId);

          for (let i of children) {
            formData.append('fileName', i.fileName);
            formData.append('file', i.file);
          }
          dispatch(fetchSTEP3Request({ formData }));
        }
      }
    },
  });

  useEffect(() => {
    if (step3Res && step3Res.uploadedFileList && step3Res.uploadedFileList.length > 0) {
      toast.success(`Files uploaded successfully`);
      //navigate("/form-thankyou");
      navigate(`/`+employerNameCoki+`/form-thankyou/PendingReview`);
    }
    else if (step3Res && step3Res.isSuccess == false) {
      let msg = step3Res.errorMessage[0];
      toast.error(msg);
    }
  }, [step3Res]);

  return (
    // <form>
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <table>
          <tr>
            <th className="text-muted">Name:</th>
            <td>{step1Res && step1Res.name}</td>
          </tr>
          <tr>
            <th className="text-muted">Event Type:</th>
            <td>{step1Res && step1Res.eventType}</td>
          </tr>
          <tr>
            <th className="text-muted"></th>
            <td>{step1Res && step1Res.eventSubType}</td>
          </tr>
          <tr>
            <th className="text-muted" style={{ textAlign: "inherit" }}>Confirmation Number:</th>
            <td  >{step1Res && step1Res.confirmationNumber}</td>
          </tr>
        </table>

        <Typography className="para">
          Thanks for initiating your QLE and telling us about the changes you
          want to make to your benefits. Now we need some supporting
          documentation for our records. Remember, to be eligible to make
          changes to your benefits related to your qualifying life event, you
          must submit your documentation within 60 days of the event. Your
          documentation must provide proof of the qualifying event, including
          the date of the event.
        </Typography>

        <Typography className="para" style={{ position: "relative", bottom: "9px" }}>
          Based on your Event Type and the changes you have requested to your
          benefits, please submit any one of the following documents:
        </Typography>
        {step1Res && step1Res.documents.map((item: any, key: any) => (
          <p
            dangerouslySetInnerHTML={{
              __html: item,
            }}
          ></p>
        ))}
        <Typography className="para" style={{ position: "relative", bottom: "28px" }}>
          <p className="para2">
            {/* {step1Res && (
              <p
                dangerouslySetInnerHTML={{
                  __html: step1Res.step3DocumentCovered,
                }}
              ></p>
            )} */}
            {ReactHtmlParser(step1Res && step1Res.step3DocumentCovered)}
          </p>
        </Typography>

        <Typography className="para" style={{ position: "relative", bottom: "44px" }}>
          When you have your documentation ready, use the button below to
          upload it. You may upload multiple documents. If we don't receive
          supporting documentation within 60 days of your event date, we will
          automatically close this qualifying life event submission.
        </Typography>
        <Typography variant="h6" sx={{ margin: "-34px 0px 0px 0px" }}>
          Upload Documentation
        </Typography>
        <div className={children && children.length == 0 && isSubmitted ? "error-span doc" : "error-span"}>
          {children && children.length == 0 && isSubmitted && isSubmitted ? "Please add atleast one file" : ""}
        </div>

        <Grid container sx={{ marginTop: '20px' }}>
          <Grid item xs={12} md={5}>
            <TextField
              id="fileName"
              label="File Name (*)"
              variant="outlined"
              name="Name1"
              fullWidth
              value={fileName}
              onChange={(ev) => {
                setFileName(ev.target.value);
              }}

            />
          </Grid>
          <Grid item xs={12} md={5} className="choose_file">
            <TextField
              id="supportingDoc"
              variant="outlined"
              sx={{ display: "block" }}
              inputProps={{ accept: ".pdf, .doc, .docx, .xls, .xlsx" }}
              name="file"
              type="file"
              placeholder=""
              className="align-upload"
              fullWidth
              inputRef={ref}
              //key={fileKey}
              // onChange={(ev: any) => {
              //   if (ev.target.files[0].name.split('.').length > 2) {
              //     setErrorMsg("The file name should not include '.' in it.");
              //     return false;
              //   }
              //   setUserFile(ev.target.files[0]);
              //   setErrorMsg("");
              // }}
              onChange={(ev: any) => handleFileChoose(ev)}
            />
            {errorMsg && <span style={{ color: 'red', fontSize: '12px' }}>{errorMsg}</span>}
          </Grid>

          <Grid item xs={12} md={2} >
            <Button
              fullWidth
              className="align-upload"
              sx={{
                color: "#6c757d",
                marginLeft: "20px",
                border: "1px solid gray",
                padding: "13px",
                "&:hover": {
                  background: "#6c757d",
                  color: "#ffff",
                },
              }}
              disabled={!fileName || !userFile}
              onClick={addChild}
            >
              <AddIcon />
              <Typography
                sx={{ padding: "5px 0px 0px 6px", fontSize: "16px" }}
              >
                ADD
              </Typography>
            </Button>
          </Grid>

        </Grid>





        {/* ------------uploaded files list - start-------------- */}

        <Grid container md={6} sx={{ margin: "20px 2px 0px 2px" }}>

          <Grid item md={1} className="bx-1" xs={1}></Grid>
          <Grid item md={7} className="bx-1" xs={6}>
            <Typography sx={{ fontWeight: "600" }}>File Name</Typography>
          </Grid>

          <Grid item md={3} className="bx-1" xs={5}>
            <Typography sx={{ fontWeight: "600" }}>Preview</Typography>
          </Grid>

          <Grid item md={1} className="bx-1" xs={1}></Grid>
        </Grid>

        {children.map((fileItem, index) => (
          <Grid container md={6} sx={{ margin: "2px 2px 0px 2px" }}>

            <Grid item md={1} className="bx-1" xs={1}>
              {fileItem.file.type.indexOf('image') >= 0 ? <Image /> :
                fileItem.file.type.indexOf('doc') >= 0 ? <ArticleIcon /> : <PictureAsPdf />}
            </Grid>
            <Grid item md={7} className="bx-1" xs={4}>
              <Typography sx={{ padding: "1px 0px" }}>
                {fileItem.fileName}
              </Typography>
            </Grid>

            <Grid item md={3} className="bx-1" xs={4}>
              <Typography
                className="text-red"
                sx={{ padding: "1px 0px" }}
                onClick={() => {
                  previewFile(fileItem);
                }}
              >
                <Preview />
              </Typography>
            </Grid>

            <Grid item md={1} className="bx-1" xs={1}>
              <DeleteForeverSharpIcon
                onClick={() => {
                  handleDelete(index);
                }}
                sx={{ color: "red", cursor: "pointer" }}
              />
            </Grid>
          </Grid>
        ))}


        {/*--------------- uploaded files list - end ---------------*/}




        {/* <input type='file' onChange={fileUploaded} /> */}
        {preview &&
          <Button
            className="align-upload"
            sx={{
              marginTop: '20px',
              color: "#6c757d",
              "&:hover": {
                background: '#cccccc',
                color: "#555555",
              },
            }}
            onClick={closePreview}
          >
            <Typography sx={{ padding: "5px 0px 0px 0px", fontSize: "12px" }}            >
              Close Preview
            </Typography>
          </Button>
        }
        {preview ?
          <div style={{ height: "800px", width: (fileType === 'pdf' || fileType === 'doc' || fileType === 'docx') ? '100%' : '424px', marginTop: '20px' }}>
            {
              ((fileType === 'doc' || fileType === 'docx') ?
                <FileViewer
                  fileType={fileType}
                  filePath={file}
                  onError={onError} />
                :

                <FilePreview width={(fileType === 'pdf' || fileType === 'doc' || fileType === 'docx') ? '100%' : '424px'}
                  type={"file"}
                  file={file}
                  onError={onError}
                />
              )
            }

            {/* {preview &&
              <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}/>
            } */}
          </div >
          : ''
        }

        <Typography className="para">
          <span className="text-red">IMPORTANT NOTE:</span>
          {step1Res && (
            <p
              dangerouslySetInnerHTML={{
                __html: step1Res.step3ImportantNote,
              }}
            ></p>
          )}
          {/* <Link
            className="link-styling"
            to="https://staffing.benefitsnow.com"
          >
            https://staffing.benefitsnow.com
          </Link>{" "} */}
          {/* and click on the link for Dependent Verification Information. If you
          do not submit the appropriate dependent verification documentation
          in a timely manner, your spouse, domestic partner and/or dependent
          children may be removed from Randstad coverage. */}
        </Typography>

        <hr />
      </Box>

      <Button
        type="submit"
        // onClick={allStepsCompleted}
        sx={{
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "orange",
          },
        }}
        variant="contained"
        className="flex-end btn-bg-red"
      >
        Submit
      </Button>
    </form>
  );
};

export default UploadDocumentation;
