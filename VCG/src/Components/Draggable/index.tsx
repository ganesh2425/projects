import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
import TextEditor from "../TextEditor";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Button from "@mui/material/Button";
import "./style.css";
import { getAllQleFaqsDetails } from "../../reducers/qleFaqReducer/allQleFaqsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllQleFaqsRequest } from "../../actions/qleFaqActions/allFaqsActions"; 
import { getAllFaqsByEmpDetails } from "../../reducers/qleFaqReducer/allFaqsByEmployerReducer";
import { fetchAllFaqsByEmpRequest } from "../../actions/qleFaqActions/allFaqsByEmployerActions";
import { fetchDelFaqRequest } from "../../actions/qleFaqActions/delFaqActions";
import { delFaqDetails } from "../../reducers/qleFaqReducer/delFaqReducer";
import { toast } from "react-toastify";
import ReactHtmlParser from 'html-react-parser';
import { fetchAllReOrderedFaqsRequest } from "../../actions/qleFaqActions/reOrderedFaqsActions";


// const finalSpaceCharacters = [
//   {
//     id: "q1",
//     comp: <Q1 />,
//   },
//   {
//     id: "q2",
//     comp: <Q2 />,
//   },
//   {
//     id: "q3",
//     comp: <Q3 />,
//   },
// ];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function DraggableComponent(employerid) {
const [faqId, setFaqId] = useState(0);
// const [type, setType] = React.useState('QLE');
// const [typeState, setTypeState] = React.useState(false)
// let params = useParams();
// let typeParam: any = params.type;
// if(typeParam == 'ACA' && typeState == false){
//   console.log("type",type)
//   setType('ACA');
//   setTypeState(true)
// }  
const dispatch = useDispatch()
const getQleFaqsRes = useSelector(getAllQleFaqsDetails)
useEffect(() => {
  getAllQleFaq(employerid.type);
}, [employerid.type]);

const getQleFaqsByEmpRes = useSelector(getAllFaqsByEmpDetails)
useEffect(() => {
getAllQleFaqByEmployer(employerid.employerId,employerid.type)
},[employerid.employerId])

const getAllQleFaq = (type) => {
  dispatch(
    fetchAllQleFaqsRequest({type})
  );
};

const getAllQleFaqByEmployer = (id,type) => {
  // let id: any = id;
  // let id: any = 1;
  if (id > 0){
    dispatch(
      fetchAllFaqsByEmpRequest({ id,type })
    );
  }else{
    dispatch(
      fetchAllQleFaqsRequest({type})
    );
  }
};

useEffect(() => {

  if (getQleFaqsRes) {
   // setRows(getQleFaqsRes);
    updateCharacters(getQleFaqsRes);
  }
}, [getQleFaqsRes]);

useEffect(() => {
  if (getQleFaqsByEmpRes) {
    updateCharacters(getQleFaqsByEmpRes);
  }
}, [getQleFaqsByEmpRes]);


//const [rolesData, setRows] = React.useState(getQleFaqsRes);
  const [characters, updateCharacters] = useState(getQleFaqsRes);
  const [open, setOpen] = React.useState(false);
  //   const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (e: any) => {
    setOpen(true);
  };

  function handleOnDragEnd(result: any) {
    console.log("characters ************* "+characters);
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    
    // useSelector(getAllReOrderedFaqs)
    dispatch(fetchAllReOrderedFaqsRequest(items));
  }
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/addQleFaq/${id}/${employerid.type}`);
    //navigate(`/add-role`);
  }

  const handleRemove = (id: number) => {
    dispatch(fetchDelFaqRequest({ id }));
  }

  const faqDataAfterDel = useSelector(delFaqDetails);

  useEffect(() => {
    if (faqDataAfterDel && faqDataAfterDel.data && !faqDataAfterDel.pending) {
      handleClose();
      toast.success(`Deleted Successfully`);
      faqDataAfterDel.data = null;
      getAllQleFaq(employerid.type);
    }
    else if (faqDataAfterDel.error === "Unauthorized") {
      handleClose();
      toast.error('Faq could not be deleted');
      faqDataAfterDel.data = null;
    }
  }, [faqDataAfterDel]);

  return (
    <div className="">
      <header className="">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided: any) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map((item,index) => {
                  return (
                    <Draggable key={item.number} index={index} draggableId={item.number.toString()}>
                      {(provided: any) => (
                        <>
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <hr className="hr-styling-faq"/>
                            <Grid container xs={12}>
                              <Grid item xs={0.5}>
                                <DragIndicatorIcon
                                  sx={{ margin: "0px 0px -3px 0px" }}
                                  color="primary"
                                />
                              </Grid>
                          
                              <Grid xs={10.5} item>
                                {ReactHtmlParser(item.question)}
                              </Grid>

                              <Grid xs={10.5} item>
                                {ReactHtmlParser(item.answer)}
                              </Grid>
                              
                              <Grid item xs={1} sx={{alignSelf:"center"}}>
                                <EditIcon sx={{padding :"0px 10px ", cursor: "pointer"}} 
                                color="primary" fontSize="small" key={`${item.number}`} onClick={() => {handleEdit(item.id)}} />
                                

                                <DeleteIcon
                                  sx={{cursor: "pointer"}}
                                  color="primary"
                                  fontSize="small"
                                  onClick={() => {
                                    setFaqId(item.id);
                                    setOpen(true);
                                  }}
                                />
                              </Grid>
                         
                            
                              <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                                sx={{
                                  top: "-450px",
                                }}
                                fullWidth
                              >
                                {console.log("open is ", open)}
                                <DialogTitle>
                                  <Typography
                                    variant="caption"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        fontSize: "18px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {"Confirmation"}
                                    </Typography>

                                    <IconButton
                                      aria-label="close"
                                      onClick={handleClose}
                                      sx={{
                                        position: "absolute",
                                        right: 8,
                                        top: 8,
                                        color: (theme) =>
                                          theme.palette.grey[500],
                                      }}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </Typography>
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText
                                    sx={{ fontSize: "17px" }}
                                    id="alert-dialog-slide-description"
                                  >
                                    Sure to Delete?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions sx={{ padding: "12px 19px" }}>
                                  <Button
                                    className="cancel-btn-role"
                                    onClick={handleClose}
                                  >
                                    No
                                  </Button>
                                  <Button
                                    className="save-btn-role"
                                    onClick={() => handleRemove(faqId)}
                                  >
                                    Yes
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </Grid>
                          </li>
                        </>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default DraggableComponent;
