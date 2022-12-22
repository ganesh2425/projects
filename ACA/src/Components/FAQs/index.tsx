import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../Header";
import Footer from "../Footer";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchFAQRequest } from "../../actions/faqActions";
import { getFAQEnteredDetails } from "../../reducers/faqReducer";
import { Grid } from "@mui/material";

const useStyles = makeStyles({
  root: {
    "& .MuiAccordionSummary-content": { margin: "0px 0 !important" },
    "& .MuiAccordionSummary-expandIconWrapper": { color: "#ffff" },
  },
});

const FAQs = () => {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(0);

  const faqSuccess: any = useSelector(getFAQEnteredDetails);
  useEffect(() => {
    dispatch(fetchFAQRequest({}));
    // if (faqSuccess) {
    //   console.log(faqSuccess)
    // }
  }, []);

  //const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel: any) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const classses = useStyles();

  return (
    //faqSuccess && faqSuccess.map((accordion:any, index:any) => {
    <>
      {console.log(faqSuccess)}
      <Header />
      <div style={{ padding: "7px 10px", minHeight: "500px" }}>
        <div
          style={{ paddingBottom: "0px", fontSize: "1.75rem", padding: "0px" }}
        >
          FAQ
        </div>
        {faqSuccess &&
          faqSuccess.map((accordion: any, index: any) => (
            <Accordion
              expanded={expanded === index}
              onChange={handleChange(index)}
              style={{ margin: "5px 0px" }}
              className={classses.root}
              key={index}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="large" />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className="bg"
              >
                <Typography className="faq-text-styling">
                  {accordion.question}
                  {/* <p dangerouslySetInnerHTML={{ __html: accordion.question }}></p> */}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-subText-styling">
                  <p dangerouslySetInnerHTML={{ __html: accordion.answer }}></p>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>

      <Footer />
    </>
  );
};
// ))}

export default FAQs;
