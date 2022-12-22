export const coverageTier = [
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
export const medicalPlans = [
  { name: "Please Select", value: 0, helperText: "" },
  {
    name: "Cigna Minimum Value Plan",
    value: 1,
    helperText:
      "Optional: Enroll in or Change Health Care Flexible Spending Account (FSA) Annual Contribution/Goal Amount:",
    amountPlaceholder: "Maximum $2,750",
  },
  {
    name: "Cigna Standard Plan",
    value: 2,
    helperText:
      "Optional: Enroll in or Change Health Care Flexible Spending Account (FSA) Annual Contribution/Goal Amount:",
    amountPlaceholder: "Maximum $2,750",
  },
  {
    name: "Cigna Enhanced Plan",
    value: 3,
    helperText:
      "Optional: Enroll in or Change Health Care Flexible Spending Account (FSA) Annual Contribution/Goal Amount:",
    amountPlaceholder: "Maximum $2,750",
  },
  {
    name: "Cigna High Deductible Health Plan (HDHP)",
    value: 4,
    helperText: `Optional: Enroll in or Change Health Savings Account (HSA) Annual Contribution/Goal Amount:
    (Maximum of $3,650 if you have Employee Only coverage and up to $7,300 for all other coverage levels)`,
    amountPlaceholder: "",
  },
];

export const dentalPlans = [
  { name: "Please Select", value: 0, helperText: "" },
  {
    name: "MetLife PPO Plan",
    isActive: true,
    helperText: "",
    amountPlaceholder: "",
    value: 1,
  },
];

export const visionPlans = [
  { name: "Please Select", value: 0, helperText: "" },
  {
    name: "EyeMed Vision Plan",
    isActive: true,
    helperText: "",
    amountPlaceholder: "",
    value: 1,
  },
];

export const user = [
  {
    title: "Name",
    value: "Johne Vang",
  },
  {
    title: "Event Type",
    value:
      "I and/or members of my family lost other health coverage & want to enroll in Randstad coverage Had coverage through spouse's/domestic partner's employer – spouse/domestic partner is no longer eligible for those benefits",
  },
  {
    title: "Confirmation Number",
    value: "RSTD001015-2159",
  },
];

export const FAQS = [
  {
    title: "What changes would you like to make?",
    value: `Thanks for starting your qualifying life event (QLE). The next step is
        to let us know what changes you want to make to your benefits as the
        result of your QLE. Remember, you can only make changes that are related
        to your QLE.`,
  },
  {
    title: `Based on your Event Type, you can make the following changes to your
          Randstad benefits:`,
    value: [
      "Enroll in Randstad medical, dental and vision coverage",
      "Enroll in or change your contribution to the Health Care FSA (Not applicable if you are enrolled in the HDHP plan)",
      "Enroll in or change your contribution to the Dependent Care FSA",
      "Enroll in or change your contribution to your HSA (Applicable only if you are enrolled in the HDHP plan)",
    ],
  },
  {
    title: "Who can you enroll in coverage?",
    value: `Any member of your family previously enrolled in your spouse's/domestic partner's plans – e.g., you (employee), your spouse or domestic partner, your dependent children


          To learn more about the plan options available to you, as well as your per paycheck cost, visit the HR Benefits page at https://staffing.benefitsnow.com or call HR Benefits Support at 877-601-7453.
          
          
          If you need to log out of your QLE record before submitting it, you can get back into your record through the unique link in the email you received from support@qleservices.com.`,
  },
];
