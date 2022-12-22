import { all, fork } from "redux-saga/effects";
import loginSaga from "./authSaga";
import forgotPwdSaga from "./forgotPwdSaga";
import addRoleSaga from "./rolesSaga/addRoleSaga";
import allRolesSaga from "./rolesSaga/allRolesSaga";
import delRoleSaga from "./rolesSaga/delRoleSaga";
import getRoleSaga from "./rolesSaga/getRoleSaga";
import allPrivilegesSaga from "./rolesSaga/allPrivilegesSaga";
import editRoleSaga from "./rolesSaga/editRoleSaga";
import UserSaga from "./usersSaga/allUserSaga";
import addUserSaga from "./usersSaga/addUserSaga";
import editUserSaga from "./usersSaga/editUserSaga";
import getUserSaga from "./usersSaga/getUserSaga";
import delUserSaga from "./usersSaga/delUserSaga";
import allRolesetSaga from "./usersSaga/allRolesetSaga";
import allEmployersSaga from "./employersSaga/allEmployersSaga";
import delEmployerSaga from "./employersSaga/delEmployerSaga";
import addEmployerSaga from "./employersSaga/addEmployerSaga";
import editEmployerSaga from "./employersSaga/editEmployerSaga";
import getEmployerSaga from "./employersSaga/getEmployerSaga";
import statesSaga from "./employersSaga/statesSaga";
import empDetailsForCreateSaga from "./employersSaga/empDetailsForCreateSaga";
import updateEmpQLEStepsSaga from "./employersSaga/updateEmpQLEStepsSaga";
import updateEmpQLEStepsEventSaga from "./employersSaga/updateEmpQLEStepsEventSaga";
import dashboardSaga from "./dashboardSaga";
import allEmailTemplateSaga from "./qleEmailTemplateSaga/allQLEEmailTemplateSaga";
import allAcaEmailTemplateSaga from "./acaEmailTemplateSaga/allACAEmailTemplateSaga";
import editEmailTemplateSaga from "./qleEmailTemplateSaga/editQLEEmailTemplateSaga";
import getEmailTemplateSaga from "./qleEmailTemplateSaga/getQLEEmailTempSaga";
import getAcaEmailTemplateSaga from "./acaEmailTemplateSaga/getACAEmailTemplateSaga";
import editAcaEmailTemplateSaga from "./acaEmailTemplateSaga/editACAEmailTemplateSaga";
import addFaqSaga from "./qleFaqSaga/addFaqSaga";
import delFaqSaga from "./qleFaqSaga/delFaqSaga";
import allQleFaqsSaga from "./qleFaqSaga/allFaqsSaga";
import editFaqSaga from "./qleFaqSaga/editFaqSaga";
import getFaqSaga from "./qleFaqSaga/getFaqSaga";
import allFaqsByEmployerSaga from "./qleFaqSaga/allFaqsByEmployerSaga";
import allReOrderedFaqsSaga from "./qleFaqSaga/reOrderFaqsSaga";
import allQleSaga from "./qleSaga/allQleSaga";
import getACAMessageTemplateSaga from "./acaEmailTemplateSaga/getACAMessageTemplateSaga";
import getQLEMessageTemplateSaga from "./qleEmailTemplateSaga/getQLEMessageTemplateSaga";
import editQLEMessageTemplateSaga from "./qleEmailTemplateSaga/editQleMessageTemplateSaga";
import editACAMessageTemplateSaga from "./acaEmailTemplateSaga/editACAMessageTemplateSaga";
import allACASaga from "./acaSaga/allACASaga";
import getACAEventSaga from "./acaSaga/getACAEventSaga";
import delACAEventSaga from "./acaSaga/delACAEventSaga";
import editACAInfoSaga from "./acaSaga/editACAInfoSaga";
import EmpACASaga from "./acaSaga/employerACASaga";
import editInfoSaga from "./qles-editSaga/editInfoSaga";
import getEditByIdSaga from "./qles-editSaga/getEditByIdSaga";
import notesSaga from "./qles-editSaga/notesSaga";
import sentStatusMailSaga from "./qles-editSaga/sentStatusMailSaga";
import filesSaga from "./qles-editSaga/filesSaga";
import communication from "./qles-editSaga/communicationSaga";
import delQleSaga from "./qleSaga/delQleSaga";
import viewFileSaga from "./qles-editSaga/viewFilesSaga";
import delFilesSaga from "./qles-editSaga/delFilesSaga";
import addEmailSaga from "./acaSaga/addACA_EmailSaga";
import addNoteSaga from "./acaSaga/addACA_NoteSaga";
import GetUserProfileSaga from "./userProfieSaga/getUserProfileSaga";
import editUserProfileSaga from "./userProfieSaga/editUserProfile";
import ChangeUserProfilePasswordSaga from "./userProfieSaga/changePasswordSaga";
import newYearPlanSaga from "./employersSaga/newYearPlanSaga";
import healthPlanSaga from "./employersSaga/healthPlanSaga";
import acaHealthPlanSaga from "./acaSaga/acaHealthPlanSaga";
import acaNewYearPlanSaga from "./acaSaga/acaNewYearPlanSaga";
import editHealthPlanSaga from "./acaSaga/editHealthPlanSaga";
import eligibleSaga from "./acaSaga/eligibilitySaga";
import empACAEditSaga from "./acaSaga/employerACAEditSaga";
import getACAPreviewSaga from "./acaPreviewSaga/acaPreviewSaga";
import getACADownloadSaga from "./acaPreviewSaga/acaDownloadSaga";
import getACAEmailSaga from "./acaPreviewSaga/acaEmailSaga";
import allActiveUserSaga from "./usersSaga/allActiveUserSaga";
import allEmployersByTypeSaga from "./employersSaga/allEmployersByTypeSaga";
import getDailyProductivityReportSaga from "./reportSaga/getDailyProductivityReportSaga";
import getQuantitiesReportSaga from "./reportSaga/getQuantitiesReportSaga";
import getSLAReportSaga from "./reportSaga/getSLAReportSaga";
import getAgingReportSaga from "./reportSaga/getAgingReportSaga";
import getQuantitiesReportDownloadSaga from "./reportSaga/getQuantitiesReportDownloadSaga";
import getDailyProductivityReportDownloadSaga from "./reportSaga/getDailyProductivityReportDownloadSaga";
import getSLAReportDownloadSaga from "./reportSaga/getSLAReportDownloadSaga";
import getAgingReportDownloadSaga from "./reportSaga/getAgingReportDownloadSaga";
import holidaySaga from "./holidaySaga/holidayTempSaga";
import getHolidaySaga from "./holidaySaga/getHolidayListSaga";
import uploadHolidaySaga from "./holidaySaga/uploadHolidayListSaga";
import uploadImageSaga from "./userProfieSaga/uploadImageSaga";
import getUploadImageSaga from "./userProfieSaga/getUploadImageSaga";
import logOutSaga from "./usersSaga/logOutSaga";
import eventStatusSaga from "./qleSaga/getEventStatus";
import eligiblilitySaga from "./employersSaga/eligibilitySaga";

export default function* startForman(): Generator<never> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield all([
    fork(loginSaga),
    fork(forgotPwdSaga),
    fork(addRoleSaga),
    fork(allRolesSaga),
    fork(delRoleSaga),
    fork(getRoleSaga),
    fork(allPrivilegesSaga),
    fork(editRoleSaga),
    fork(UserSaga),
    fork(addUserSaga),
    fork(editUserSaga),
    fork(getUserSaga),
    fork(delUserSaga),
    fork(allRolesetSaga),
    fork(allEmployersSaga),
    fork(delEmployerSaga),
    fork(addEmployerSaga),
    fork(editEmployerSaga),
    fork(getEmployerSaga),
    fork(statesSaga),
    fork(empDetailsForCreateSaga),
    fork(updateEmpQLEStepsSaga),
    fork(updateEmpQLEStepsEventSaga),
    fork(dashboardSaga),
    fork(allEmailTemplateSaga),
    fork(editQLEMessageTemplateSaga),
    fork(editACAMessageTemplateSaga),
    fork(allAcaEmailTemplateSaga),
    fork(editEmailTemplateSaga),
    fork(getACAMessageTemplateSaga),
    fork(getQLEMessageTemplateSaga),
    fork(getEmailTemplateSaga),
    fork(getAcaEmailTemplateSaga),
    fork(editAcaEmailTemplateSaga),
    fork(addFaqSaga),
    fork(delFaqSaga),
    fork(allQleFaqsSaga),
    fork(editFaqSaga),
    fork(getFaqSaga),
    fork(allFaqsByEmployerSaga),
    fork(allReOrderedFaqsSaga),
    fork(allQleSaga),
    fork(allACASaga),
    fork(getACAEventSaga),
    fork(delACAEventSaga),
    fork(editACAInfoSaga),
    fork(EmpACASaga),
    fork(editInfoSaga),
    fork(getEditByIdSaga),
    fork(notesSaga),
    fork(sentStatusMailSaga),
    fork(filesSaga),
    fork(delQleSaga),
    fork(viewFileSaga),
    fork(delFilesSaga),
    fork(communication),
    fork(addNoteSaga),
    fork(addEmailSaga),
    fork(GetUserProfileSaga),
    fork(editUserProfileSaga),
    fork(ChangeUserProfilePasswordSaga),
    fork(newYearPlanSaga),
    fork(healthPlanSaga),
    fork(acaHealthPlanSaga),
    fork(acaNewYearPlanSaga),
    fork(editHealthPlanSaga),
    fork(eligibleSaga),
    fork(empACAEditSaga),
    fork(getACAPreviewSaga),
    fork(getACADownloadSaga),
    fork(getACAEmailSaga),
    fork(allActiveUserSaga),
    fork(allEmployersByTypeSaga),
    fork(getDailyProductivityReportSaga),
    fork(getQuantitiesReportSaga),
    fork(getSLAReportSaga),
    fork(getAgingReportSaga),
    fork(getQuantitiesReportDownloadSaga),
    fork(getDailyProductivityReportDownloadSaga),
    fork(getSLAReportDownloadSaga),
    fork(getAgingReportDownloadSaga),
    fork(holidaySaga),
    fork(getHolidaySaga),
    fork(uploadHolidaySaga),
    fork(uploadImageSaga),
    fork(getUploadImageSaga),
    fork(logOutSaga),
    fork(eventStatusSaga),
    fork(eligiblilitySaga)
  ]);
}
