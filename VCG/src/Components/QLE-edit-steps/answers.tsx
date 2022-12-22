import { Grid, Paper, TableRow, TextField, Typography } from "@mui/material";
import "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getEditByIdDetails } from "../../reducers/qles-editReducer/getEditByIdReducer"
import { fetchGetEditByIdRequest } from "../../actions/qle-editActions/getEditByIdActions";
import { Irole } from "../../interfaces/answersType";
import { useParams } from "react-router-dom";
import { SignalWifiStatusbarNullRounded } from "@mui/icons-material";



const QLE_Answers = (props: any): JSX.Element => {
  const dispatch = useDispatch();
  const [benefitDetails, setbenefitDetails] = React.useState<any>([])
  const [dependentDetails, setdependentDetails] = React.useState<any>([])
  const [id, setAnswers] = useState(1);
  const [tier, setTier] = React.useState(0);
  const [medicalCoverageTier, setMedicalCoverageTier] = React.useState("");
  const [dentalCoverageTier, setDentalCoverageTier] = React.useState("");
  const [visionCoverageTier, setVisionCoverageTier] = React.useState("");

  const coverageTier = [
    { name: "Please Select", value: 0, options: [] },
    { name: "Employee Only", value: 1, options: [] },
    { name: "Employee + Spouse", value: 2, options: ["Spouse"] },
    { name: "Employee + Child(ren)", value: 3, options: ["Child(ren)"] },
    { name: "Employee + Family", value: 4, options: ["Child(ren)", "Spouse"] },
    {
      name: "Employee + Domestic Partner",
      value: 5,
      options: ["Domestic Partner"],
    },
    {
      name: "Employee + Domestic Partner + Child(ren) + Domestic Partner's Child(ren)",
      value: 6,
      options: ["Child(ren)", "Domestic Partner", "Domestic Partner's Child(ren)"],
    },
    {
      name: "Employee + Domestic Partner + Domestic Partner's Child(ren)",
      value: 7,
      options: ["Domestic Partner's Child(ren)", "Domestic Partner"],
    },
  ];

  const depedentType = [
    { name: "Spouse", value: "0" },
    { name: "Child(ren)", value: "1" },
    { name: "Domestic Partner", value: "2" },
    { name: "Domestic Partner's Child(ren)", value: "3" },
  ];

  let params = useParams();

  const Answers: any = useSelector(getEditByIdDetails);
  // useEffect(() => {
  //   if(QleEventId >0){
  //   getAnswer();
  //   }
  // }, []);

  const getAnswer = () => {
    let id: any = params.id
    setAnswers(id);
    dispatch(
      fetchGetEditByIdRequest({ id })
    );

  };

  useEffect(() => {
    const tempData: any = [];
    if (Answers) {
      let details = Answers['benefitDetails'];
      let dependent = details.dependentSet;
      setRows(Answers);
      setbenefitDetails(details);
      setdependentDetails(dependent);
    }
  }, [Answers]);

  const [Data, setRows] = React.useState<any>([])

  return (

    <Paper sx={{ boxShadow: "none" }}>

      {Answers && Answers.enrollOrCancel == 1 ? (
        <Typography variant="h5" sx={{ fontSize: "1.13rem", fontWeight: "500" }}>
          Enrollment Type
        </Typography>
      ) : Answers && Answers.enrollOrCancel == 0 ? (
        <Typography variant="h5" sx={{ fontSize: "1.13rem", fontWeight: "500" }}>
          Cancellation Type
        </Typography>
      ) : null}

      {Answers && Answers.enrollOrCancel == 1 ? (
        <Grid sx={{ margin: "15px 0px" }}>

          <><Typography className="bg-gray row">Medical</Typography>
            <Typography variant="h6" className=" row">{benefitDetails && benefitDetails.medPlanName}</Typography>
            <Grid className="row">
              <Typography className="answer-section-font">
                {" "}
                Tier:
                <b>
                  {benefitDetails && benefitDetails.medCoverageTier
                    ? coverageTier.filter(x => x.value == benefitDetails.medCoverageTier)[0].name : ""}
                </b>
              </Typography>
              <Typography className="answer-section-font">
                {" "}
                <span className="clr-lightgray" ></span>
              </Typography>
              <Typography className="answer-section-font">
                {" "}
                {/* <span className="clr-lightgray"> </span>{e.firstName} */}
              </Typography>
            </Grid>

            <Grid className="row">
              {benefitDetails && benefitDetails.optMedFsa ? (
                <Typography className="answer-section-font">
                  {" "}
                  Enroll in or Change Health Care Flexible Spending Account (FSA) Annual Contribution/Goal Amount:
                  <b>{"$"}{benefitDetails.optMedFsa}</b>
                </Typography>
              )
                : benefitDetails && benefitDetails.optMedHsa ? (
                  <Typography className="answer-section-font">
                    {" "}
                    Optional: Enroll in or Change Health Savings Account (HSA) Annual Contribution/Goal Amount: (Maximum of $3,650 if you have Employee Only coverage and up to $7,300 for all other coverage levels):
                    <b>{"$"}{benefitDetails.optMedHsa}</b>
                  </Typography>
                )
                  :
                  null}
              <Typography className="answer-section-font">
                {" "}
                <span className="clr-lightgray" ></span>
              </Typography>
              <Typography className="answer-section-font">
                {" "}
                {/* <span className="clr-lightgray"> </span>{e.firstName} */}
              </Typography>
            </Grid>

            <Typography className="bg-gray row" >Dental</Typography><Typography variant="h6" className=" row" >{benefitDetails.dentPlanName}</Typography>
            <Grid className=" row">
              <Typography >
                {" "}
                Tier:
                <b>
                  {benefitDetails && benefitDetails.dentCoverageTier
                    ? coverageTier.filter(x => x.value == benefitDetails.dentCoverageTier)[0].name : ""}
                </b>
              </Typography>
              <Typography className="answer-section-font">
                {" "}
                <span className="clr-lightgray "> </span>
              </Typography>
            </Grid>

            <Typography className="bg-gray row" >Vision</Typography>
            <Typography variant="h6" className=" row" >{benefitDetails.visionPlanName}</Typography>
            <Grid className=" row">
              <Typography >
                {" "}
                Tier:
                <b>
                  {benefitDetails && benefitDetails.visionCoverageTier
                    ? coverageTier.filter(x => x.value == benefitDetails.visionCoverageTier)[0].name : ""}
                </b>
              </Typography>
              <Typography className="answer-section-font" >
                {" "}
                <span className="clr-lightgray "> </span>
              </Typography>
            </Grid>

            {benefitDetails && benefitDetails.dependentFsa ? (
              <Typography className="bg-gray row" >
                Enroll in or Change Dependent Care FSA Annual Contribution/Goal Amount:
                <b>{"$"}{benefitDetails.dependentFsa}</b>
              </Typography>
            ) : null}

            <Typography className="bg-gray row">Additional Comments</Typography>
            <Typography variant="h6" className=" row"> {benefitDetails && benefitDetails.comments}</Typography>

            <Typography className="bg-gray row">Commenter</Typography>
            <Typography variant="h6" className=" row"> {Answers && Answers.commenterName}</Typography>
          </>
        </Grid>
      ) : Answers && Answers.enrollOrCancel == 0 ? (
        <Grid sx={{ margin: "15px 0px" }}>
          <>
            <Typography className="bg-gray row">Cancelled in Medical</Typography>
            {benefitDetails && benefitDetails.cancelMedical ? (
              <Typography variant="h6" className=" row">Yes</Typography>
            ) : (<Typography variant="h6" className=" row">No</Typography>)}

            <Typography className="bg-gray row" >Cancelled in Dental</Typography>
            {benefitDetails && benefitDetails.cancelDental ? (
              <Typography variant="h6" className=" row">Yes</Typography>
            ) : (<Typography variant="h6" className=" row">No</Typography>)}

            <Typography className="bg-gray row" > Cancelled in Vision</Typography>
            {benefitDetails && benefitDetails.cancelVision ? (
              <Typography variant="h6" className=" row">Yes</Typography>
            ) : (<Typography variant="h6" className=" row">No</Typography>)}

            <Typography className="bg-gray row">Cancel or Change Dependent Care FSA Annual Contribution/Goal Amount:
              <b>{" $"}
                {benefitDetails && benefitDetails.cancelDependentAnnualFsa}</b>
            </Typography>

            <Typography className="bg-gray row">Cancel in or Change Health Care Flexible Spending Account (FSA) Annual Contribution/Goal Amount:
              <b>{" $"}
                {benefitDetails && benefitDetails.cancelHealthAnnualFsa}</b>
            </Typography>

            <Typography className="bg-gray row">Employee Only Coverage Optional: Cancel in or Change Health Care Health Savings Account (HSA) Annual Contribution/Goal Amount:
              <b>{" $"}
                {benefitDetails && benefitDetails.cancelEmployeeHsa}</b>
            </Typography>

            <Typography className="bg-gray row">All Other Coverage Optional: Cancel in or Change Health Care Health Savings Account (HSA) Annual Contribution/Goal Amount:
              <b>{" $"}
                {benefitDetails && benefitDetails.cancelCoverHealthAnnualHsa}</b>
            </Typography>

            <Typography className="bg-gray row">Additional Comments</Typography>
            <Typography variant="h6" className=" row"> {benefitDetails && benefitDetails.comments}</Typography>

            <Typography className="bg-gray row">Commenter</Typography>
            <Typography variant="h6" className=" row"> {Answers && Answers.commenterName}</Typography>
          </>

        </Grid>
      ) : null
      }

      {Answers && Answers.enrollOrCancel == 1 ? (

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table" sx={{ padding: "10px" }}>
            <TableHead>
              <TableRow className="t-head" id="answers-table">
                <TableCell className="p-6">Relationship</TableCell>
                <TableCell className="p-6">First Name</TableCell>
                <TableCell className="p-6">Middle Name</TableCell>
                <TableCell className="p-6">Last Name</TableCell>
                <TableCell className="p-6">Date of Birth</TableCell>
                <TableCell className="p-6">Gender</TableCell>
                <TableCell className="p-6">SSN</TableCell>
                <TableCell className="p-6">
                  Eligible for Randstad benefits
                </TableCell>
                <TableCell className="p-6">Eligible for Medicare</TableCell>
                <TableCell className="p-6 w-small">
                  Has access to coverage through his/her employer?
                </TableCell>
                <TableCell className="p-6">Enroll in</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {dependentDetails && dependentDetails.map((data: any, index: any) => (
                <TableRow className="t-body-row">
                  <TableCell className="p-6">
                    {depedentType.filter(x => x.value == data.dependentType)[0].name}
                  </TableCell>
                  <TableCell >{data.firstName}</TableCell>
                  <TableCell >{data.middleName}</TableCell>
                  <TableCell >{data.lastName}</TableCell>
                  <TableCell >{data.dob}</TableCell>
                  <TableCell >{data.gender}</TableCell>
                  <TableCell >{data.ssn}</TableCell>
                  <TableCell >{data.enrolledIn}</TableCell>
                  <TableCell >{data.elgForMedCare}</TableCell>
                  <TableCell >{data.coverageThroughEmp}</TableCell>
                  <TableCell >{data.elgForRanstadBenefits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      )
        : Answers && Answers.enrollOrCancel == 0 ? (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" sx={{ padding: "10px" }}>
              <TableHead>
                <TableRow className="t-head" id="answers-table">
                  <TableCell className="p-6">Individuals cancelled from coverage</TableCell>
                  <TableCell className="p-6">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {benefitDetails && benefitDetails.cancelEmployee ? (
                  <TableRow className="t-body-row">
                    <TableCell >Employee</TableCell>
                    <TableCell >{benefitDetails.employee}</TableCell>
                  </TableRow>
                ) : null
                }
                {benefitDetails && benefitDetails.cancelSpouse ? (
                  <TableRow className="t-body-row">
                    <TableCell >Spouse</TableCell>
                    <TableCell >{benefitDetails.spouse}</TableCell>
                  </TableRow>
                ) : null
                }
                {benefitDetails && benefitDetails.cancelChild ? (
                  <TableRow className="t-body-row">
                    <TableCell >Dependent Child(ren)</TableCell>
                    <TableCell >{benefitDetails.child.join(" , ")}</TableCell>
                  </TableRow>
                ) : null
                }
                {benefitDetails && benefitDetails.cancelDomesticPartner ? (
                  <TableRow className="t-body-row">
                    <TableCell >Domestic Partner</TableCell>
                    <TableCell >{benefitDetails.domesticPartner}</TableCell>
                  </TableRow>
                ) : null
                }
                {benefitDetails && benefitDetails.cancelDomesticPartnerChild ? (
                  <TableRow className="t-body-row">
                    <TableCell >Domestic Partner's Child(ren)</TableCell>
                    <TableCell >{benefitDetails.domesticPartnersChild.join(" , ")}</TableCell>
                  </TableRow>
                ) : null
                }
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
    </Paper>

  );
};

export default QLE_Answers;
