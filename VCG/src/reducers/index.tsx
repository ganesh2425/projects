import { combineReducers } from "redux";
import authReducer from "./authReducer";
import forgotPwdReducer from "./forgotPwdReducer";
import addRoleReducer from "./rolesReducer/addRoleReducer";
import allRolesReducer from "./rolesReducer/allRolesReducer";
import delRoleReducer from "./rolesReducer/delRoleReducer";
import getRoleReducer from "./rolesReducer/getRoleReducer";
import allPrivilegesReducer from "./rolesReducer/allPrivilegesReducer";
import editRoleReducer from "./rolesReducer/editRoleReducer";
import userReducer from "./usersReducer/allUserReducer";
import addUserReducer from "./usersReducer/addUserReducer";
import delUserReducer from "./usersReducer/delUserReducer";
import getUserReducer from "./usersReducer/getUserReducer";
import allRolesetReducer from "./usersReducer/allRolesetReducer";
import editUserReducer from "./usersReducer/editUserReducer";
import allEmployersReducer from "./employersReducer/allEmployersReducer";
import delEmployerReducer from "./employersReducer/delEmployerReducer";
import addEmployerReducer from "./employersReducer/addEmployerReducer";
import editEmployerReducer from "./employersReducer/editEmployerReducer";
import getEmployerReducer from "./employersReducer/getEmployerReducer";
import statesReducer from "./employersReducer/statesReducer";
import empDetailsForCreateReducer from "./employersReducer/empDetailsForCreateReducer";
import updateEmpQLEStepsReducer from "./employersReducer/updateEmpQLEStepsReducer";
import updateEmpQLEStepsEventReducer from "./employersReducer/updateEmpQLEStepsEventReducer";
import dashboardReducer from "./dashboardReducer";
import allQLEEmailTemplateReducer from "./qleEmailTemplateReducer/allQLEEmailTemplateReducer";
import editQLEEmailTemplateReducer from "./qleEmailTemplateReducer/editQLEEmailTemplateReducer";
import getQLEEmailTemplateReducer from "./qleEmailTemplateReducer/getQLEEmailTemplateReducer";
import allACAEmailTemplateReducer from "./acaEmailTemplateReducer/allACAEmailTemplateReducer";
import editACAEmailTemplateReducer from "./acaEmailTemplateReducer/editACAEmailTemplateReducer";
import getACAEmailTemplateReducer from "./acaEmailTemplateReducer/getACAEmailTemplateReducer";
import addFaqReducer from "./qleFaqReducer/addFaqReducer";
import allQleFaqsReducer from "./qleFaqReducer/allQleFaqsReducer";
import delFaqReducer from "./qleFaqReducer/delFaqReducer";
import editFaqReducer from "./qleFaqReducer/editFaqReducer";
import getFaqReducer from "./qleFaqReducer/getFaqReducer";
import allFaqsByEmployerReducer from "./qleFaqReducer/allFaqsByEmployerReducer";
import reOrderedFaqsReducer from "./qleFaqReducer/allFaqsByEmployerReducer";
import allQleReducer from "./qleReducer/allQleReducer";
import editACAMessageTemplateReducer from "./acaEmailTemplateReducer/editACAMessageTemplateReducer";
import getACAMessageTemplateReducer from "./acaEmailTemplateReducer/getACAMessageTemplateReducer";
import getQLEMessageTemplateReducer from "./qleEmailTemplateReducer/getQLEMessageTemplateReducer";
import editQLEMessageTemplateReducer from "./qleEmailTemplateReducer/editQLEMessageTemplateReducer";
import allACAReducer from "./acaReducer/allACAReducer";
import getACAEventReducer from "./acaReducer/getACAEventReducer";
import delACAEventReducer from "./acaReducer/delACAEventReducer";
import editACAInfoReducer from "./acaReducer/editACAInfoReducer";
import employerACAReducer from "./acaReducer/employerACAReducer";
import editinfoReducer from "./qles-editReducer/editinfoReducer";
import notesReducer from "./qles-editReducer/notesReducer";
import sentStatusMailReducer from "./qles-editReducer/sentStatusMailReducer";
import filesReducer from "./qles-editReducer/filesReducer";
import communicationReducer from "./qles-editReducer/communicationReducer";
import viewFilesReducer from "./qles-editReducer/viewFilesReducer";
import deleteFilesReducer from "./qles-editReducer/deleteFilesReducer";
import delQleReducer from "./qleReducer/delQleReducer";
import getEditByIdReducer from "./qles-editReducer/getEditByIdReducer";
import addACA_NoteReducer from "./acaReducer/addACA_NoteReducer";
import addACA_EmailReducer from "./acaReducer/addACA_EmailReducer";
import getUserProfileReducer from "./userProfileReducer/getUserProfileReducer";
import editUserProfile from "./userProfileReducer/editUserProfile";
import changePasswordReducer from "./userProfileReducer/changePasswordReducer";
import healthPlanReducer from "./employersReducer/healthPlanReducer";
import newYearPlanReducer from "./employersReducer/newYearPlanReducer";
import editHealthPlanReducer from "./acaReducer/editHealthPlanReducer";
import employerACAEditReducer from "./acaReducer/employerACAEditReducer";
import acaNewYearPlanReducer from "./acaReducer/acaNewYearPlanReducer";
import acaHealthPlanReducer from "./acaReducer/acaHealthPlanReducer";
import eligibilityReducer from "./acaReducer/eligibilityReducer";
import acaPreviewReducer from "./acaPreviewReducer/acaPreviewReducer";
import acaDownloadReducer from "./acaPreviewReducer/acaDownloadReducer";
import acaEmailReducer from "./acaPreviewReducer/acaEmailReducer";
import allActiveUserReducer from "./usersReducer/allActiveUserReducer";
import allEmployersByTypeReducer from "./employersReducer/allEmployersByTypeReducer";
import dailyProductivityReportReducer from "./reportReducer/DailyProductivityReportReducer";
import quantitiesReportReducer from "./reportReducer/quantitiesReportReducer";										
import sLAReportReducer from "./reportReducer/sLAReportReducer";
import agingReportReducer from "./reportReducer/agingReportReducer";
import quantitiesReportDownloadReducer from "./reportReducer/quantitiesReportDownloadReducer";
import dailyProductivityReportDownloadReducer from "./reportReducer/DailyProductivityReportDownloadReducer";
import sLAReportDownloadReducer from "./reportReducer/sLAReportDownloadReducer";
import agingReportDownloadReducer from "./reportReducer/agingReportDownloadReducer";
import holidayTempReducer from "./holidayReducer/holidayTempReducer";
import getHolidayListReducer from "./holidayReducer/getHolidayListReducer";
import uploadHolidayListReducer from "./holidayReducer/uploadHolidayListReducer";
import uploadImageReducer from "./userProfileReducer/uploadImageReducer";
import getUploadImageReducer from "./userProfileReducer/getUploadImageReducer";
import getLogoutReducer from "./usersReducer/logOutReducer";
import eventStatusReducer from "./qleReducer/eventStatusReducer";
import eligibilitysReducer from "./employersReducer/eligibilitysReducer";

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  auth: authReducer,
  forgotPwd: forgotPwdReducer,
  addRole: addRoleReducer,
  allRoles: allRolesReducer,
  delRole: delRoleReducer,
  getRole: getRoleReducer,
  allPrivileges: allPrivilegesReducer,
  editRole: editRoleReducer,
  UserState: userReducer,
  addUser: addUserReducer,
  editUser: editUserReducer,
  getUser: getUserReducer,
  allRoleset: allRolesetReducer,
  delUser: delUserReducer,
  allEmployers: allEmployersReducer,
  delEmployer: delEmployerReducer,
  addEmployer: addEmployerReducer,
  editEmployer: editEmployerReducer,
  getEmployer: getEmployerReducer,
  states: statesReducer,
  empDetailsForCreate: empDetailsForCreateReducer,
  updateEmpQLESteps: updateEmpQLEStepsReducer,
  updateEmpQLEStepsEvent: updateEmpQLEStepsEventReducer,
  dashboard: dashboardReducer,
  allQLEEmailTemplate: allQLEEmailTemplateReducer,
  editQLEEmailTemplate: editQLEEmailTemplateReducer,
  getQLEEmailTemplate: getQLEEmailTemplateReducer,
  allACAEmailTemplate: allACAEmailTemplateReducer,
  editACAEmailTemplate: editACAEmailTemplateReducer,
  getACAEmailTemplate: getACAEmailTemplateReducer,
  editACAMessageTemplate: editACAMessageTemplateReducer,
  getACAMessageTemplate: getACAMessageTemplateReducer,
  getQLEMessageTemplate: getQLEMessageTemplateReducer,
  editQLEMessageTemplate: editQLEMessageTemplateReducer,
  addFaq: addFaqReducer,
  editFaq: editFaqReducer,
  delFaq: delFaqReducer,
  allQleFaqs: allQleFaqsReducer,
  getFaq: getFaqReducer,
  allFaqsByEmployer: allFaqsByEmployerReducer,
  reOrderedFaqs: reOrderedFaqsReducer,
  allQle: allQleReducer,
  allACA: allACAReducer,
  getACAEvent: getACAEventReducer,
  delACAEvent: delACAEventReducer,
  getEmpACA: employerACAReducer,
  editACA: editACAInfoReducer,
  editACAInfo: editACAInfoReducer,
  editInfo: editinfoReducer,
  getEditById: getEditByIdReducer,
  getNotes: notesReducer,
  sentStatusMail: sentStatusMailReducer,
  files: filesReducer,
  communication: communicationReducer,
  viewFiles: viewFilesReducer,
  deleteqleevent: delQleReducer,
  deleteFiles: deleteFilesReducer,
  addNote: addACA_NoteReducer,
  addEmail: addACA_EmailReducer,
  getUserProfile: getUserProfileReducer,
  editUserProfile: editUserProfile,
  changeUserProfilePassword: changePasswordReducer,
  healthPlan: healthPlanReducer,
  newYearPlan: newYearPlanReducer,
  editHealthPlan: editHealthPlanReducer,
  acaHealthPlan: acaHealthPlanReducer,
  empACAEdit: employerACAEditReducer,
  acaNewYearPlan: acaNewYearPlanReducer,
  eligibility: eligibilityReducer,
  getACAPreview: acaPreviewReducer,
  getACADownload: acaDownloadReducer,
  getACAEmail: acaEmailReducer,
  allActiveUser: allActiveUserReducer,
  allEmployersByType: allEmployersByTypeReducer,
  getDailyProductivityReport: dailyProductivityReportReducer,
  getQuantitiesReport: quantitiesReportReducer,
  getSLAReport: sLAReportReducer,
  getAgingReport: agingReportReducer,
  getQuantitiesReportDownload: quantitiesReportDownloadReducer,
  getDailyProductivityReportDownload: dailyProductivityReportDownloadReducer,
  getAgingReportDownload: agingReportDownloadReducer,
  getSLAReportDownload: sLAReportDownloadReducer,
  downloadHoliday: holidayTempReducer,
  holidayList: getHolidayListReducer,
  uploadList: uploadHolidayListReducer,
  uploadImage: uploadImageReducer,
  getUploadImage: getUploadImageReducer,
  logOut: getLogoutReducer,
  eventStatus: eventStatusReducer,
  eligibilitys: eligibilitysReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
