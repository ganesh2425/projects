import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import { Button, Grid, TextField, Typography } from "@mui/material";
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
import { fetchUpdateEmpQLEStepsRequest } from "../../../actions/employersActions/updateEmpQLEStepsActions";
import { getEmployerDetails } from "../../../reducers/employersReducer/getEmployerReducer";
import { getUpdateEmpQLESteps } from "../../../reducers/employersReducer/updateEmpQLEStepsReducer";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// const Plans = () => {
const Plans = ({
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

  // const empDetailsForCreateRes = useSelector(getempDetailsForCreate);
  // useEffect(() => {
  //   getEmpDetailsForCreate();
  // }, []);

  // const getEmpDetailsForCreate = () => {
  //   dispatch(fetchEmpDetailsForCreateRequest({}));
  // };

  const [plans, setPlans] = React.useState<any>([]);

  // useEffect(() => {
  //   if (empDetailsForCreateRes && empDetailsForCreateRes.qlePlan) {
  //     //let arr:any[] = empDetailsForCreateRes.qlePlan;

  //     //setPlans(arr);
  //     //console.log(plans);
  //   }
  // }, [empDetailsForCreateRes]);

  const getEmployerRes: any = useSelector(getEmployerDetails);

  useEffect(() => {
    if (employerId > 0) {
      if (getEmployerRes && parseInt(getEmployerRes['id']) > 0) {
        let arr: any[] = getEmployerRes['qlePlans'];
        setPlans(arr);
      }
    }
  }, [getEmployerRes]);

  // const result:any = getEmployerRes['qlePlan'] &&
  // getEmployerRes['qlePlans'].reduce(function (r:any, a:any) {
  //     r[a.planType] = r[a.planType] || [];
  //     r[a.planType].push(a);
  //     return r;
  //   }, {});

  // const resultantArr = Array.from(Object.entries(result));

  // const filteredArr =
  //   empDetailsForCreateRes.qlePlan &&
  //   empDetailsForCreateRes.qlePlan.reduce((acc: any, current: any) => {
  //     const x: any = acc.find(
  //       (item: any) => item.planType === current.planType
  //     );
  //     if (!x) {
  //       const newCurr = {
  //         planType: current.planType,
  //         name: [current.name],
  //         status: [current.status],
  //       };
  //       return acc.concat([newCurr]);
  //     } else {
  //       const currData = x.name.filter((d) => d === current.name);
  //       if (!currData.length) {
  //         const newData = x.name.push(current.name);
  //         const newStatus = x.status.push(current.status);
  //         const newCurr = {
  //           planType: current.planType,
  //           name: newData,
  //           status: newStatus,
  //         };
  //         return acc;
  //       } else {
  //         return acc;
  //       }
  //     }
  //   }, []);
  // console.log("here");
  // console.log(filteredArr);

  // const handleEdit = (id: number) => {
  //   if (employerId > 0) {
  //   let filteredArr =  getEmployerRes['qlePlan'] &&
  //   getEmployerRes['qlePlan'].filter((x: any) => x.id == id);
  //   filteredArr[0].name = "kjshsdhf";
  //   getEmployerRes['qlePlan'] = filteredArr;
  //   const tempUpdateEmpQLEStepsData: any = {
  //     "id": 18,
  //     "qlePlan": filteredArr
  //   }
  //   dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
  //   }
  // }
  const [planValue, setPlanValue] = React.useState("");
  const [chkBoxValue, setChkBoxValue] = React.useState(false);
  const [planId, setPlanId] = React.useState(0);

  const handleSwitch = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setChkBoxValue(true);
    }
    else {
      setChkBoxValue(false);
    }
  };

  const handleEdit = (name: string, id: number, status:boolean) => {
    setDialogOpen(true);
    setPlanValue(name);
    setPlanId(id);
    setChkBoxValue(status);
  }

  // const handleSubmit = () => {
  //   if (employerId > 0) {
  //   let filteredArr =  getEmployerRes['qlePlans'] &&
  //   getEmployerRes['qlePlans'].filter((x: any) => x.id == planId);
  //   filteredArr[0].name = planValue;
  //   filteredArr[0].status = chkBoxValue;
  //   getEmployerRes['qlePlans'] = filteredArr;
  //   const tempUpdateEmpQLEStepsData: any = {
  //     "id": employerId,
  //     "qlePlans": filteredArr
  //   }
  //   dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
  //   }
  // }

  const handleSubmit = () => {
    if (employerId > 0) {
      // let filteredArr = getEmployerRes['qlePlans'] &&
      //   getEmployerRes['qlePlans']

      let filteredArray = getEmployerRes['qlePlans'] &&
         getEmployerRes['qlePlans'].filter((element:any) => element.planSubTypes
          .some((subElement:any) => subElement.id === planId)
        )
        .map((element:any) => {
          let n = Object.assign({}, element, {
            'qlePlan': element.planSubTypes.filter(
              (subElement:any) => subElement.id === planId
            )
          })
          return n;
        })

      let filteredArr2 =  filteredArray.map((element:any) => element.qlePlan);

      // let finalArr =  filteredArray.map((element:any) => {
      //   let n = Object.assign({}, {
      //     'qlePlan': element.filter(
      //       (subElement:any) => subElement.id === planId
      //     )
      //   })
      
      //   return n;
      // })

      let finalArr =  filteredArr2.map((element:any) => {
        let n = Object.assign({}, {
          'qlePlan': element.filter(
            (subElement:any) => subElement.id === planId
          )
        })
      
        return n;
      })

      finalArr[0].qlePlan[0].name = planValue;
      finalArr[0].qlePlan[0].status = chkBoxValue;
      const tempUpdateEmpQLEStepsData: any = {
        "id": employerId,
        "qlePlan":  finalArr[0].qlePlan
      }
      toast.success("Plan details updated successfully");
      dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
    }
  }

  let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps);

  useEffect(() => {
    if (getUpdateEmpQLEStepsRes && getUpdateEmpQLEStepsRes['id'] > 0) {
      handleDialogClose();
      //toast.success("Plan details updated successfully");
      getUpdateEmpQLEStepsRes.id = 0;
      // setTimeout(() => {
      //   navigate("/employers");
      // }, 1500);
    }
  }, [getUpdateEmpQLEStepsRes]);

  return (
    <Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className="bg-table">
                Plans
              </TableCell>
              <TableCell className="bg-table"></TableCell>
              <TableCell className="bg-table"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* {filteredArr && filteredArr.map((event, index) => ( */}
            {/* {resultantArr && resultantArr.map((event: any, index: any) => ( */}
            {plans && plans.map((plan: any, index: any) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" key={`${index}.2`} style={{ border: "none" }}>

                  <TableBody>
                    <TableRow className="" sx={{ background: "#ffe7c4" }}>
                      <TableCell
                        style={{ width: "100%" }}
                        component="th"
                        scope="row"
                      >
                        {plan.planType}

                      </TableCell>

                      <TableCell
                        className=""
                        style={{ width: 60 }}
                        align="right"
                      >

                      </TableCell>
                      <TableCell
                        style={{ width: 60, cursor: "pointer" }}
                        align="right"
                      >
                        {/* <EditIcon
                            color="primary"
                            key={`${index}.7`}
                            fontSize={"small"}
                            onClick={() => {
                              setDialogOpen(true);
                            }}
                          /> */}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  {/* {event[1].map((subEvent: any, index: any) => ( */}
                  {plan.planSubTypes.map((subPlan: any, index: any) => (
                    <TableBody>
                      <TableRow className="">
                        <TableCell
                          style={{ width: "100%" }}
                          component="th"
                          scope="row"
                        >
                          {subPlan.name}
                        </TableCell>

                        <TableCell
                          className=""
                          style={{ width: 60 }}
                          align="right"
                        >
                          <span className=" active-styling">{subPlan.status ? "Active": "InActive"}</span>
                        </TableCell>
                        <TableCell
                          style={{ width: 60, cursor: "pointer" }}
                          align="right"
                        >
                          <EditIcon
                            color="primary"
                            key={`${index}.7`}
                            fontSize={"small"}
                            // onClick={() => {
                            //   setDialogOpen(true);
                            // }}
                            onClick={() => {
                              handleEdit(subPlan.name, subPlan.id, subPlan.status)
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
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          top: "-350px",
          margin: "auto",
          width: "fit-content",
          minWidth: "500px",
        }}
        fullWidth
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
              {"Edit"}
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
          <DialogContentText id="alert-dialog-slide-description" >
            <Grid item xs={12} >
              {" "}
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                sx={{ margin: "5px 0px" }}
                value={planValue}
                onChange={(e) => setPlanValue(e.currentTarget.value)}
              />
            </Grid>

            <Grid
              className=""
            >
              <CustomizedSwitches
                label="Active"
                labelPlace="end"
                checked={chkBoxValue}
                sx={{ color: "#ffff !important" }}
                getData={handleSwitch}
                //onChange={(e: any) => setChkBoxValue(e.currentTarget.checked)}
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
          <Button
            onClick={handleSubmit}
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

export default Plans;
