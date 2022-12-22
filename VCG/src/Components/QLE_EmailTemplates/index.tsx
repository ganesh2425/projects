import React, { useState,useEffect } from "react";
import Header from "../Header";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { largeScrees, smallScreen } from "../../Helper/slider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import "./style.css";
import { useSelector,useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getAllEmployerDetails } from "../../reducers/employersReducer/allEmployersReducer";
import { fetchAllEmployersRequest } from "../../actions/employersActions/allEmployersActions";
import { getAllQLEEmailTemplateDetails } from "../../reducers/qleEmailTemplateReducer/allQLEEmailTemplateReducer";
import { fetchAllQLEEmailTemplateRequest } from "../../actions/qleEmailTemplateActions/allQLEEmailTemplateActions";
import Footer from "../Footer";


const QLE_EmailTemplate = (props: any) => {
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };

  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  //   const [dialogOpen, setDialogOpen] = React.useState(false);
  const [aca,setAca] = React.useState();
  const dispatch = useDispatch()
  const [organisation, setOrganisation] = React.useState("1");
  const [employerId, setEmployerId] = useState("");

  
  const handleEdit = (id:number) => {
    navigate(`/qle-email-edit/${id}`)

  }
  const handleEditMessage = (id:number) => {
    navigate(`/qle-edit-message/${id}`)

  }
  const menuRes = useSelector(getAllEmployerDetails)
  
  useEffect(() => {
    getEmployer();
  }, []);

  const getEmployer = () => {
    dispatch(
      fetchAllEmployersRequest({})
    );
  };
  useEffect(() => {
    if (menuRes && menuRes.length > 0) {
      getACAemailetails();
    }
  }, [menuRes]);
 

  const allQleEmailTemplateRes = useSelector(getAllQLEEmailTemplateDetails);
  
  const getACAemailetails = () => {

    if(menuRes && menuRes.length > 0){
      let id = menuRes[0].id;
    dispatch(
      fetchAllQLEEmailTemplateRequest({id})
    );
    }
  };


  useEffect(() => {
    if (allQleEmailTemplateRes) {
      setRows(allQleEmailTemplateRes);

    }
  }, [allQleEmailTemplateRes]);

  const [emailTemplateData, setRows] = React.useState(allQleEmailTemplateRes);

  let qleEmailTemplate = emailTemplateData.mailTemplates
  let qleMessageTemplate = emailTemplateData.messageTemplates

 
  const handleChange = (event: SelectChangeEvent) => {
    setOrganisation(event.target.value);
  };
  const handleEmplrItemChange =(e:any) =>{
    let id=e;
   
    dispatch(
      fetchAllQLEEmailTemplateRequest({id})
    );
  }

  return (
    <React.Fragment>
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

            <Box style={{ margin: "34px 19px 20px 19px" }} sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid
                  className="title-styling"
                  sx={{ alignSelf: "self-end" }}
                  item
                  xs={9}
                > QLE / Email Template
                </Grid>
                <Grid style={{ textAlign: "left" }} item xs={3}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select
                        value={organisation}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{background: "white", height: "44px", }}
                      >
                      
                      {menuRes && menuRes.length > 0 &&
                        menuRes.map((e: any, idx: number) => (
                          <MenuItem value={e.id} key={idx}  onClick={() => handleEmplrItemChange(e.id)} >
                            {e.name}
                          </MenuItem>
                          
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Paper sx={{ margin: "10px", boxShadow:"none !important"}}>
              <TableContainer >
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  sx={{ padding: "10px" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className="bg-table">Email Templates</TableCell>
                      <TableCell className="bg-table"></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {qleEmailTemplate && qleEmailTemplate.map((role, idx) => (
                      <TableRow
                        key={idx}
                        className={idx% 2 == 1 ? "table-bg" : ""}
                      >
                        <TableCell >{role.name}</TableCell>
                        <TableCell >
                          <EditIcon
                            color="primary"
                            className="editIcon"
                            onClick={() => handleEdit(role.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="bg-table">Message Templates</TableCell>
                      <TableCell className="bg-table"></TableCell>
                    </TableRow>
                     {qleMessageTemplate && qleMessageTemplate.map((role, idx) => (
                      <TableRow
                        key={idx}
                        className={idx% 2 == 1 ? "table-bg" : ""}
                      >
                        <TableCell >{role.name}</TableCell>
                        <TableCell >
                          <EditIcon
                            color="primary"
                            className="editIcon"
                            onClick={() => handleEditMessage(role.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Footer/>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default QLE_EmailTemplate;
