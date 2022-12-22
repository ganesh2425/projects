import React from "react";

export type GlobalContent = {
  selectedMedicalPlan: any;
  handleMedicalPlan: (e: any) => any;
  selectedDentalPlan: any;
  handleDentalPlan: (e: any) => any;
  selectedVisionPlan: any;
  handleVisionPlan: (e: any) => any;
  coverageTier: any;
};

export const RBC_context = React.createContext<GlobalContent>({
  selectedMedicalPlan: 0,
  handleMedicalPlan: (e) => {},
  selectedDentalPlan: 0,
  handleDentalPlan: (e) => {},
  selectedVisionPlan: 0,
  handleVisionPlan: (e) => {},
  coverageTier: [],
});

export const RBC_context_provider = ({ children }: any) => {
  const [selectedMedicalPlan, setSelectedMedicalPlan] = React.useState(0);
  const [selectedDentalPlan, setSelectedDentalPlan] = React.useState(0);
  const [selectedVisionPlan, setSelectedVisionPlan] = React.useState(0);

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
      name: "Employee + Domestic Partner + Child(ren)",
      value: 6,
      options: ["Child(ren)", "Domestic Partner"],
    },
    {
      name: "Employee + Domestic Partner + Domestic Partner's Child(ren)",
      value: 7,
      options: ["Domestic Partner's Child(ren)", "Domestic Partner"],
    },
  ];

  const handleMedicalPlan = (e: any) => {
    setSelectedMedicalPlan(e.target.value);
  };

  const handleDentalPlan = (e: any) => {
    setSelectedDentalPlan(e.target.value);
  };

  const handleVisionPlan = (e: any) => {
    setSelectedVisionPlan(e.target.value);
  };

  const RBC_data = {
    selectedMedicalPlan,
    handleMedicalPlan,
    selectedDentalPlan,
    handleDentalPlan,
    selectedVisionPlan,
    handleVisionPlan,
    coverageTier,
  };

  return (
    <RBC_context.Provider value={RBC_data}>{children}</RBC_context.Provider>
  );
};
