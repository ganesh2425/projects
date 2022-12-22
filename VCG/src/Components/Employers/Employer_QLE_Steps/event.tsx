import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CustomizedSwitches from "../../SwitchButton";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { getempDetailsForCreate } from "../../../reducers/employersReducer/empDetailsForCreateReducer";
import { fetchEmpDetailsForCreateRequest } from "../../../actions/employersActions/empDetailsForCreateActions";
import { getEmployerDetails } from "../../../reducers/employersReducer/getEmployerReducer";
// import { fetchUpdateEmpQLEStepsRequest } from "../../../actions/employersActions/updateEmpQLEStepsActions";
// import { getUpdateEmpQLESteps } from "../../../reducers/employersReducer/updateEmpQLEStepsReducer";
import { fetchUpdateEmpQLEStepsEventRequest } from "../../../actions/employersActions/updateEmpQLEStepsEventActions";
import { getUpdateEmpQLEStepsEvent } from "../../../reducers/employersReducer/updateEmpQLEStepsEventReducer";
import { toast } from "react-toastify";

// const options1 = [
//   {
//     displayText:
//       "I and/or members of my family lost other health coverage & want to enroll in Randstad coverage",
//     value: 1,
//     resultantOptions: [
//       {
//         displayText:
//           "Had coverage through spouse's/domestic partner's employer - spouse/domestic partner is no longer eligible for those benefits",
//         value: 1,
//       },
//       {
//         displayText:
//           "Had coverage through spouse's/domestic partner's employer - now divorced/legally separated from spouse or lost domestic partnership",
//         value: 2,
//       },
//       {
//         displayText:
//           "Had coverage through spouse's/domestic partner's employer - spouse/domestic partner died",
//         value: 3,
//       },
//       {
//         displayText:
//           "Had coverage through Medicare, Medicaid, or a state children's health insurance program (CHIP) - no longer eligible for program",
//         value: 4,
//       },
//       {
//         displayText:
//           "Had coverage through parent - no longer eligible for coverage under parent's plans",
//         value: 5,
//       },
//       {
//         displayText: "Lost coverage when left home country",
//         value: 6,
//       },
//       {
//         displayText: "Other loss of coverage",
//         value: 6,
//       },
//     ],
//   },
//   {
//     displayText:
//       "I and/or members of my family gained other health coverage & want to cancel Randstad coverage",
//     value: 2,
//     resultantOptions: [
//       {
//         displayText:
//           "Spouse/domestic partner is now eligible for benefits through his/her employer",
//         value: 1,
//       },
//       {
//         displayText:
//           "Eligible for Medicare, Medicaid, or a state children's health insurance program (CHIP)",
//         value: 2,
//       },
//       {
//         displayText: "Leaving the USA and returning to home country",
//         value: 3,
//       },
//       {
//         displayText: "Other gain of coverage",
//         value: 4,
//       },
//     ],
//   },
//   {
//     displayText: "Other qualifying life event",
//     value: 3,
//     resultantOptions: [
//       {
//         displayText:
//           "Change in cost of day care provider - I want to change my FSA contribution",
//         value: 1,
//       },
//       {
//         displayText:
//           "Death of dependent child - I want to remove child from Randstad coverage",
//         value: 2,
//       },
//       {
//         displayText:
//           "Death of spouse - I want to remove spouse from Randstad coverage",
//         value: 3,
//       },
//       {
//         displayText:
//           "Divorce/legal separation/annulment – I want to remove spouse from Randstad coverage",
//         value: 4,
//       },
//       {
//         displayText:
//           "Death of domestic partner or loss of domestic partnership – I want to remove domestic partner from Randstad coverage",
//         value: 5,
//       },
//     ],
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

// const Event = () => {
const Event = ({
  employerId
}: any): JSX.Element => {

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = (e: any) => {
    setDialogOpen(true);
  };

  const dispatch = useDispatch();

  const [events, setEvents] = React.useState<any>([]);

  const getEmployerRes: any = useSelector(getEmployerDetails);
  useEffect(() => {
    if (employerId > 0) {
      if (getEmployerRes && parseInt(getEmployerRes['id']) > 0) {
        let arr: any[] = getEmployerRes['qleEventTypes'];
        setEvents(arr);
      }
    }
  }, [getEmployerRes]);

  const [subEventValue, setSubEventValue] = React.useState("");
  const [subEventChkBoxValue, setSubEventChkBoxValue] = React.useState(false);
  const [subEventId, setSubEventId] = React.useState(0);

  const [eventValue, setEventValue] = React.useState("");
  const [eventChkBoxValue, setEventChkBoxValue] = React.useState(false);
  const [eventId, setEventId] = React.useState(0);

  const [caller, setCaller] = React.useState("subevent");
  const [chkBoxValue, setChkBoxValue] = React.useState(false);

  const handleSwitch = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setChkBoxValue(true);
    }
    else {
      setChkBoxValue(false);
    }
  };

  const handleEventEdit = (id: number, name: string, status: boolean) => {
    setDialogOpen(true);
    setEventValue(name);
    setEventId(id);
    //setEventChkBoxValue(status);
    setChkBoxValue(status)
    setCaller("event");
  }

  const handleSubEventEdit = (id: number, name: string, status: boolean) => {
    setDialogOpen(true);
    setSubEventValue(name);
    setSubEventId(id);
    //setSubEventChkBoxValue(status);
    setChkBoxValue(status)
    setCaller("subevent");
  }

  const handleSubmit = (caller: string) => {
    if (caller == "event") {
      if (employerId > 0) {
        var filteredArray1 = getEmployerRes['qleEventTypes'] &&
          getEmployerRes['qleEventTypes']
            .filter((element: any) => element.id === eventId)
            // .map((element: any) => {
            //   let n = Object.assign({}, element, {
            //     'qleEventTypes': element.filter(
            //       (subElement: any) => subElement.id === eventId
            //     )
            //   })
            //   return n;
            // })
        filteredArray1[0].name = eventValue;
        filteredArray1[0].status = chkBoxValue;
        let finalArr = filteredArray1.map((element: any) => {
          let n = Object.assign({}, {
            'id': element.id,
            'name': element.name,
            'status': element.status,
          })
          return n;
        })

        const tempUpdateEmpQLEStepsData: any = {
          "id": employerId,
          "qleEventTypes": finalArr

        }
        console.log(tempUpdateEmpQLEStepsData)
        //dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
        dispatch(fetchUpdateEmpQLEStepsEventRequest(tempUpdateEmpQLEStepsData));
      }
    }
    else {
      if (employerId > 0) {

        var filteredArray1 = getEmployerRes['qleEventTypes'] &&
          getEmployerRes['qleEventTypes']
            .filter((element: any) => element.qleEventSubtypes
              .some((subElement: any) => subElement.id === subEventId)
            )
            .map((element: any) => {
              let n = Object.assign({}, element, {
                'qleEventSubtypes': element.qleEventSubtypes.filter(
                  (subElement: any) => subElement.id === subEventId
                )
              })
              return n;
            })

        filteredArray1[0].qleEventSubtypes[0].name = subEventValue;
        filteredArray1[0].qleEventSubtypes[0].status = chkBoxValue;
        let finalArr = filteredArray1.map((element: any) => {
          let n = Object.assign({}, {
            'id': element.id,
            'name': element.name,
            'status': element.status,
            'qleEventSubtypes': element.qleEventSubtypes
          })
          return n;
        })

        const tempUpdateEmpQLEStepsData: any = {
          "id": employerId,
          "qleEventTypes": finalArr

        }
        console.log(tempUpdateEmpQLEStepsData)
        //dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
        dispatch(fetchUpdateEmpQLEStepsEventRequest(tempUpdateEmpQLEStepsData));
      }
    }
  }

  // let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps);
  let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLEStepsEvent);

  useEffect(() => {
    if (getUpdateEmpQLEStepsRes && getUpdateEmpQLEStepsRes['id'] > 0) {
      handleDialogClose();
      toast.success("EventType/SubEventType updated successfully");
      getUpdateEmpQLEStepsRes.id = 0;
      // setTimeout(() => {
      //   navigate("/employers");
      // }, 1500);
    }
  }, [getUpdateEmpQLEStepsRes]);

  // const handleSubEventSubmit = () => {
  //   if (employerId > 0) {

  //     var filteredArray1 = getEmployerRes['qleEventTypes'] &&
  //       getEmployerRes['qleEventTypes']
  //         .filter((element: any) => element.qleEventSubtypes
  //           .some((subElement: any) => subElement.id === subEventId)
  //         )
  //         .map((element: any) => {
  //           let n = Object.assign({}, element, {
  //             'qleEventSubtypes': element.qleEventSubtypes.filter(
  //               (subElement: any) => subElement.id === subEventId
  //             )
  //           })
  //           return n;
  //         })

  //     filteredArray1[0].qleEventSubtypes[0].name = subEventValue;
  //     filteredArray1[0].qleEventSubtypes[0].status = subEventChkBoxValue;
  //     let finalArr = filteredArray1.map((element: any) => {
  //       let n = Object.assign({}, {
  //         'id': element.id,
  //         'name': element.name,
  //         'status': element.status,
  //         'qleEventSubtypes': element.qleEventSubtypes
  //       })
  //       return n;
  //     })

  //     const tempUpdateEmpQLEStepsData: any = {
  //       "id": employerId,
  //       "qleEventTypes": finalArr

  //     }
  //     console.log(tempUpdateEmpQLEStepsData)
  //      dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
  //   }
  // }

  // let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps);

  // useEffect(() => {
  //   if (getUpdateEmpQLEStepsRes && getUpdateEmpQLEStepsRes['id'] > 0) {
  //     handleDialogClose();
  //     toast.success("EventType/SubEventType updated successfully");
  //     getUpdateEmpQLEStepsRes.id = 0;
  //     // setTimeout(() => {
  //     //   navigate("/employers");
  //     // }, 1500);
  //   }
  // }, [getUpdateEmpQLEStepsRes]);

  return (
    <Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className="bg-table">
                Event Type/ Sub Event Type
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {events.map((event: any, index: any) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" key={`${index}.2`} style={{ border: "none" }}>

                  <TableBody>
                    <TableRow className="" sx={{ background: "#ffe7c4" }}>
                      <TableCell
                        style={{ width: "100%" }}
                        component="th"
                        scope="row"
                      >
                        {event.name}
                      </TableCell>

                      <TableCell
                        className=""
                        style={{ width: 60 }}
                        align="right"
                      >
                        <span className=" active-styling">{event.status ? "Active" : "InActive"}</span>
                      </TableCell>
                      <TableCell
                        style={{ width: 60, cursor: "pointer" }}
                        align="right"
                      >
                        <EditIcon
                          color="primary"
                          key={`${index}.7`}
                          fontSize={"small"}
                          onClick={() => {
                            handleEventEdit(event.id, event.name, event.status);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>

                  {event.qleEventSubtypes.map((subEvent: any, index: any) => (
                    <TableBody>
                      <TableRow className="">
                        <TableCell
                          style={{ width: "100%" }}
                          component="th"
                          scope="row"
                        >
                          {subEvent.name}
                        </TableCell>

                        <TableCell
                          className=""
                          style={{ width: 60 }}
                          align="right"
                        >
                          <span className=" active-styling">{subEvent.status ? "Active" : "InActive"}</span>
                        </TableCell>
                        <TableCell
                          style={{ width: 60, cursor: "pointer" }}
                          align="right"
                        >
                          <EditIcon
                            color="primary"
                            //key={`${index}.7`}
                            key={`${subEvent.id}.7`}
                            fontSize={"small"}
                            // onClick={() => {
                            //   setDialogOpen(true);
                            // }}
                            onClick={() => {
                              handleSubEventEdit(subEvent.id, subEvent.name, subEvent.status)
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={dialogOpen}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        sx={{
          top: "-287px",
        }}
      >
        <DialogTitle>
          <Typography
            variant="caption"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "18px" }} variant="h5">
              {"Edit event type"}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleDialogClose}
              sx={{
                position: "absolute",
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
          <DialogContentText id="alert-dialog-slide-description">
            <Grid item xs={12}>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                fullWidth
                value={caller == "subevent" ? subEventValue : eventValue}
                onChange={(e) => caller == "subevent" ? setSubEventValue(e.currentTarget.value)
              : setEventValue(e.currentTarget.value) }
              //   value={contact}
              />
            </Grid>

            <Grid>
              <CustomizedSwitches
                label="Active"
                labelPlace="end"
                checked={chkBoxValue}
                getData={handleSwitch}
                //onChange={(e: any) => setChkBoxValue(e.currentTarget.checked)
               //}
              />
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            className="cancel-btn-role"
            variant="outlined"
          >
            Cancel
          </Button>
          {console.log(caller)}
          <Button
            onClick={() => {
              caller == "subevent" ? handleSubmit("subevent") : handleSubmit("event");
            }}
            className="save-btn-role"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Event;
