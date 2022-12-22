import { Button, Grid, TextField, Typography, TableRow, Box, Dialog, DialogTitle, IconButton, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import AddIcon from "@mui/icons-material/Add";
import { fetchFilesRequest } from "../../actions/qle-editActions/filesActions";
import { getFILESEnteredDetails } from "../../reducers/qles-editReducer/filesReducer";
import { getFilesViewDetails } from "../../reducers/qles-editReducer/viewFilesReducer";
import { getDelFilesDetails } from "../../reducers/qles-editReducer/deleteFilesReducer";
import { fetchFilesViewRequest } from "../../actions/qle-editActions/viewFilesAction";
import { fetchDeleteFilesRequest } from "../../actions/qle-editActions/deleteFilesActions";
import { getEditByIdDetails } from "../../reducers/qles-editReducer/getEditByIdReducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { toast } from "react-toastify"
import TableCell from "@mui/material/TableCell";
import { PictureAsPdf, Image, Preview } from "@mui/icons-material";
import FilePreview from 'react-file-preview-latest'
import CloseIcon from '@mui/icons-material/Close';
import { fetchGetEditByIdRequest } from "../../actions/qle-editActions/getEditByIdActions";
import Tooltip from "@mui/material/Tooltip";
import Moment from 'moment';

const QLE_Files = ({ props: any }: any): JSX.Element => {
  let params = useParams();
  const dispatch = useDispatch();
  const [file, setFile] = useState({});
  const [fileType, setFileType] = useState("");
  const current = new Date();
  // const date = `${current.getMonth() + 1}-${current.getDate()}-${current.getFullYear()}`;
  const date = Moment().format('MM-DD-YYYY')
  const [preview, setPreview] = useState(false);
  

  const getEventsRes: any = useSelector(getEditByIdDetails);
  const res = getEventsRes.uploadedDocList
  const QleEventId: any = params.id;

  const getedit = () => {
    let id: any = params.id;

    if (id > 0) {
      dispatch(
        fetchGetEditByIdRequest({ id })
      );
    }
  };



  const previewFile = (fileItems: any) => {
    setPreview(false);
    forceUpdate();
    setFile(fileItems.file);
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
  const [userFile, setUserFile] = useState(null as any);


  const ref: any = useRef();

  const handleFileChoose = (ev: any) => {
    // if (ev.target.files[0].name.split('.').length > 2) {
    //   setErrorMsg("The file name should not include '.' in it.");
    //   return false;
    // }
    setUserFile(ev.target.files[0]);
    // setErrorMsg("");
  };

  const addChild = () => {
    if (userFile &&
      (userFile.type.indexOf('pdf') < 0
        && userFile.type.indexOf('image') < 0
        && userFile.type.indexOf('doc') < 0
        && userFile.type.indexOf('docx') < 0)) {
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
    setUserFile(null);
    ref.current.value = null;
  };

  const handleDelete = (index: number) => {
    const cloneChildren = [...children];
    cloneChildren.splice(index, 1);
    setChildren(cloneChildren);
  };
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

  const onError = (error: any) => {
  }

  const step3Res: any = useSelector(getFILESEnteredDetails);
  var response: any = step3Res.data


  const handleSubmit = () => {
    debugger
    const formData = new FormData();
    if (QleEventId && QleEventId > 0) {
      let evtId = QleEventId.toString();
      formData.append('id', evtId);
      for (let i of children) {
        formData.append('name', i.fileName);
        formData.append('file', i.file);
      }
      dispatch(fetchFilesRequest({ formData }))

    }

  }
  useEffect(() => {
    if (response && response.uploadedDocList && response.uploadedDocList.length > 0) {
      toast.success("Files  Uploded Succesfully")
      getedit()
      response.uploadedDocList = null
    }
    else if (response && response.isSuccess === false) {
      toast.error(response.errorMessages[0])
      response.errorMessages[0]=null
    }

  }, [response])


  const [isSubmitted, setSubmitted] = useState(false);
  const [roleId, setRoleId] = React.useState(QleEventId);

  const handleRemove = (e: any) => {
    if (QleEventId > 0) {
      setSubmitted(true);
      const messageTemplate: any = {
        "Id": QleEventId,
        "id": res[0].id,
        "fileName": res[0].fileName
      }
      if (res[0].id > 0 && res[0].fileName.length > 0) {

      }
      dispatch(fetchDeleteFilesRequest(messageTemplate));
      toast.success(`Deleted Successfully`);
      getedit()

    }
  }

  const fileDataAfterDel = useSelector(getDelFilesDetails);
  useEffect(() => {
    if (fileDataAfterDel && !fileDataAfterDel.pending) {
      handleClose();
      fileDataAfterDel.data = null

    }
    else if (fileDataAfterDel.error === "Unauthorized") {
      handleClose();
      toast.error('Role could not be deleted as it is associated with a user');
      fileDataAfterDel.data = null;
    }
  }, [fileDataAfterDel]);


  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [pre, setPre] = useState(false)

  var fileRes = useSelector(getFilesViewDetails);

  useEffect(() => {
    if (fileRes && pre) {
      setPre(false)
      const file = new Blob([fileRes], { type: fileRes.type })
      const fileURL = URL.createObjectURL(file)
      window.open(fileURL, "_blank")
      fileRes = null
    }
  }, [fileRes]);

  const fileView = (file: any) => {
    let id: any = params.id;
    let fileName: any = file;
    if (id > 0) {
      dispatch(fetchFilesViewRequest({ id, fileName }))
      setPre(true)
    }
  }

  let isDisabled : boolean = false;
  if(getEventsRes['eventStatus'] ==="Initiated"){
    isDisabled = true;
  }
  else if(getEventsRes['eventStatus'] ==="Archived"){
    // toast.info("Event cannot be updated in this status");
    isDisabled = true;
  }
  
  return (
    <>
    <Tooltip title={isDisabled ? `Record in ${getEventsRes['eventStatus']} status cannot be created/modified` : ""}>  
      <form>
        <Box>
          <Grid container sx={{ marginTop: "20px" }}>
            <Grid item xs={12} md={4.5}>
              <TextField
                id="fileName"
                label="File Name"
                variant="outlined"
                name="Name1"
                fullWidth
                value={fileName}
                onChange={(ev) => {
                  setFileName(ev.target.value);
                }}
                disabled={isDisabled}
                />
            </Grid>
            <Grid item xs={12} md={4.5} sx={{ marginLeft: "9px" }}>
              <TextField
                id="supportingDoc"
                variant="outlined"
                sx={{ display: "block" }}
                name="file"
                type="file"
                placeholder=""
                className="align-upload"
                fullWidth
                inputRef={ref}
                //key={userFile}
                // onChange={(ev: any) => {
                //   setUserFile(ev.target.files[0]);
                // }}
                onChange={(ev: any) => handleFileChoose(ev)}
                disabled={isDisabled}
              />
            </Grid>

            <Grid item xs={12} md={1.5}>
              <Button
                fullWidth
                type="submit"
                className="align-upload"
                sx={{
                  color: "#6c757d",
                  marginLeft: "10px",
                  border: "1px solid gray",
                  padding: "13px",
                  "&:hover": {
                    background: "#6c757d",
                    color: "#ffff",
                  },
                }}
                disabled={!fileName || !userFile}
                onClick={() => {
                  addChild();
                }}
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

          <Grid container md={6} sx={{ margin: "20px 10px 0px 2px" }} className="header_width">
            <Grid item md={1} className="bx-1" xs={1}></Grid>
            <Grid item md={7} className="bx-1" xs={6} id="fileN">
              <Typography sx={{ fontWeight: "600" }}>File Name</Typography>
            </Grid>

            <Grid item md={3} className="bx-1" xs={5} id="preview">
              <Typography sx={{ fontWeight: "600" }}>Preview</Typography>
            </Grid>

            <Grid item md={1} className="bx-1" xs={1}>
              <Typography sx={{ fontWeight: "600" }}>Date </Typography>
            </Grid>
          </Grid>


          {res && res.map((item: any, id: number) => {
            return (
              <>
                <Grid container md={6} sx={{ margin: "2px 2px 0px 2px" }} className="files-width">
                  <Grid item md={1} className="bx-1" xs={1}>

                    <PictureAsPdf />

                  </Grid>
                  <Grid item md={7} className="bx-1" xs={4} id="fileName">
                    <Typography sx={{ padding: "1px 0px" }}>

                      {item.documentName}
                    </Typography>
                  </Grid>

                  <Grid item md={3} className="bx-1" xs={4}>
                    <Typography
                      className="text-red"
                      sx={{ padding: "1px 0px" }}
                      onClick={() => {
                        fileView(item.fileName)
                      }}
                    >
                      <Preview />
                    </Typography>
                  </Grid>
                  <Grid item md={3} className="bx-1" xs={4}>
                    <Typography
                      className="text-red"
                      sx={{ padding: "1px 0px" }}
                    >
                      {item.createdDate}
                    </Typography>
                  </Grid>

                  <Grid item md={1} className="bx-1" xs={1} >
                    <TableCell>
                      <Button
                        variant="text"
                        sx={{ border: "none", width: "20px", padding: "0px", marginTop: "-5px" }}
                        key={`${res.id}.8`}
                        onClick={() => {
                          setRoleId(res.id);
                          setOpen(true);
                        }}
                        disabled={isDisabled}
                      >
                        <DeleteForeverSharpIcon color="primary" onClick={() => {
                          setRoleId(res.id);

                        }} />
                      </Button>
                      <Dialog
                        open={open}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                        sx={{
                          top: "-450px",

                        }}
                        fullWidth

                        key={`${res.id}.9`}
                      >

                        <DialogTitle >
                          <Typography
                            variant="caption"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: "600" }}>
                              {"Confirmation"}
                            </Typography>

                            <IconButton
                              aria-label="close"
                              onClick={handleClose}
                              sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                              }}
                            >
                              <CloseIcon />
                            </IconButton>

                          </Typography>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText sx={{ fontSize: "17px" }} id="alert-dialog-slide-description">
                            Sure to Delete?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ padding: "12px 19px" }}>
                          <Button className="cancel-btn-role" onClick={handleClose}>No</Button>
                          <Button className="save-btn-role" onClick={() => handleRemove(roleId)}>Yes</Button>

                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </Grid>

                </Grid>
              </>
            )
          }
          )}

          {children.map((fileItem, index) => (
            <Grid container md={6} sx={{ margin: "2px 2px 0px 2px" }} className="files-width">
              <Grid item md={1} className="bx-1" xs={1}>
                {fileItem.file.type.indexOf("image") >= 0 ? (
                  <Image />
                ) : (
                  <PictureAsPdf />
                )}
              </Grid>
              <Grid item md={7} className="bx-1" xs={4} id="fileName">
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
              <Grid item md={3} className="bx-1" xs={4}>
                <Typography
                  className="text-red"
                  sx={{ padding: "1px 0px" }}

                >
                  {date}
                </Typography>
              </Grid>

              <Grid item md={1} className="bx-1" xs={1} >
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

          {preview && (
            <Button
              className="align-upload"
              sx={{
                marginTop: "20px",
                color: "#6c757d",
                "&:hover": {
                  background: "#cccccc",
                  color: "#555555",
                },
              }}
              onClick={closePreview}
            >
              <Typography sx={{ padding: "5px 0px 0px 0px", fontSize: "12px" }}>
                Close Preview
              </Typography>
            </Button>
          )}
          <div
            style={{
              width: fileType === "pdf" ? "100%" : "424px",
              marginTop: "20px",
            }}
          >
            {preview && (
              <FilePreview
                width={fileType === "pdf" ? "100%" : "424px"}
                type={"file"}
                file={file}
                onError={onError}
              />
            )}
          </div>
          <hr />
        </Box>

        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "orange",
            },
            width: "60px",
            color: "white",
            cursor: "pointer"
          }}
          className="flex-end btn-bg-red"
        >
          Submit
        </Button>
      </form>
      </Tooltip>
    </>
  );
};

export default QLE_Files;
