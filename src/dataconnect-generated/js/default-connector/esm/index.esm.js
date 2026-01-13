import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const PhaseStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  BLOCKED: "BLOCKED",
}

export const ProjectStatus = {
  PLANNING: "PLANNING",
  ACTIVE: "ACTIVE",
  ON_HOLD: "ON_HOLD",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
}

export const UserRole = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  MEMBER: "MEMBER",
  VIEWER: "VIEWER",
}

export const connectorConfig = {
  connector: 'default',
  service: 'hw-npi-planning-service',
  location: 'us-west2'
};

export const listPortfoliosRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPortfolios', inputVars);
}
listPortfoliosRef.operationName = 'ListPortfolios';

export function listPortfolios(dcOrVars, vars) {
  return executeQuery(listPortfoliosRef(dcOrVars, vars));
}

export const getPortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPortfolio', inputVars);
}
getPortfolioRef.operationName = 'GetPortfolio';

export function getPortfolio(dcOrVars, vars) {
  return executeQuery(getPortfolioRef(dcOrVars, vars));
}

export const createPortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePortfolio', inputVars);
}
createPortfolioRef.operationName = 'CreatePortfolio';

export function createPortfolio(dcOrVars, vars) {
  return executeMutation(createPortfolioRef(dcOrVars, vars));
}

export const updatePortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePortfolio', inputVars);
}
updatePortfolioRef.operationName = 'UpdatePortfolio';

export function updatePortfolio(dcOrVars, vars) {
  return executeMutation(updatePortfolioRef(dcOrVars, vars));
}

export const deletePortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePortfolio', inputVars);
}
deletePortfolioRef.operationName = 'DeletePortfolio';

export function deletePortfolio(dcOrVars, vars) {
  return executeMutation(deletePortfolioRef(dcOrVars, vars));
}

export const listProjectAssignmentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectAssignments', inputVars);
}
listProjectAssignmentsRef.operationName = 'ListProjectAssignments';

export function listProjectAssignments(dcOrVars, vars) {
  return executeQuery(listProjectAssignmentsRef(dcOrVars, vars));
}

export const listUserAssignmentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserAssignments', inputVars);
}
listUserAssignmentsRef.operationName = 'ListUserAssignments';

export function listUserAssignments(dcOrVars, vars) {
  return executeQuery(listUserAssignmentsRef(dcOrVars, vars));
}

export const listAssignmentsByDateRangeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAssignmentsByDateRange', inputVars);
}
listAssignmentsByDateRangeRef.operationName = 'ListAssignmentsByDateRange';

export function listAssignmentsByDateRange(dcOrVars, vars) {
  return executeQuery(listAssignmentsByDateRangeRef(dcOrVars, vars));
}

export const createProjectAssignmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProjectAssignment', inputVars);
}
createProjectAssignmentRef.operationName = 'CreateProjectAssignment';

export function createProjectAssignment(dcOrVars, vars) {
  return executeMutation(createProjectAssignmentRef(dcOrVars, vars));
}

export const updateProjectAssignmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectAssignment', inputVars);
}
updateProjectAssignmentRef.operationName = 'UpdateProjectAssignment';

export function updateProjectAssignment(dcOrVars, vars) {
  return executeMutation(updateProjectAssignmentRef(dcOrVars, vars));
}

export const deleteProjectAssignmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProjectAssignment', inputVars);
}
deleteProjectAssignmentRef.operationName = 'DeleteProjectAssignment';

export function deleteProjectAssignment(dcOrVars, vars) {
  return executeMutation(deleteProjectAssignmentRef(dcOrVars, vars));
}

export const listProjectPhasesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectPhases', inputVars);
}
listProjectPhasesRef.operationName = 'ListProjectPhases';

export function listProjectPhases(dcOrVars, vars) {
  return executeQuery(listProjectPhasesRef(dcOrVars, vars));
}

export const getProjectPhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProjectPhase', inputVars);
}
getProjectPhaseRef.operationName = 'GetProjectPhase';

export function getProjectPhase(dcOrVars, vars) {
  return executeQuery(getProjectPhaseRef(dcOrVars, vars));
}

export const createProjectPhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProjectPhase', inputVars);
}
createProjectPhaseRef.operationName = 'CreateProjectPhase';

export function createProjectPhase(dcOrVars, vars) {
  return executeMutation(createProjectPhaseRef(dcOrVars, vars));
}

export const updateProjectPhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectPhase', inputVars);
}
updateProjectPhaseRef.operationName = 'UpdateProjectPhase';

export function updateProjectPhase(dcOrVars, vars) {
  return executeMutation(updateProjectPhaseRef(dcOrVars, vars));
}

export const deleteProjectPhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProjectPhase', inputVars);
}
deleteProjectPhaseRef.operationName = 'DeleteProjectPhase';

export function deleteProjectPhase(dcOrVars, vars) {
  return executeMutation(deleteProjectPhaseRef(dcOrVars, vars));
}

export const listUsersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsers', inputVars);
}
listUsersRef.operationName = 'ListUsers';

export function listUsers(dcOrVars, vars) {
  return executeQuery(listUsersRef(dcOrVars, vars));
}

export const getUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUser', inputVars);
}
getUserRef.operationName = 'GetUser';

export function getUser(dcOrVars, vars) {
  return executeQuery(getUserRef(dcOrVars, vars));
}

export const getUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByEmail', inputVars);
}
getUserByEmailRef.operationName = 'GetUserByEmail';

export function getUserByEmail(dcOrVars, vars) {
  return executeQuery(getUserByEmailRef(dcOrVars, vars));
}

export const getUserByFirebaseUidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByFirebaseUid', inputVars);
}
getUserByFirebaseUidRef.operationName = 'GetUserByFirebaseUid';

export function getUserByFirebaseUid(dcOrVars, vars) {
  return executeQuery(getUserByFirebaseUidRef(dcOrVars, vars));
}

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const updateUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUser', inputVars);
}
updateUserRef.operationName = 'UpdateUser';

export function updateUser(dcOrVars, vars) {
  return executeMutation(updateUserRef(dcOrVars, vars));
}

export const deleteUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteUser', inputVars);
}
deleteUserRef.operationName = 'DeleteUser';

export function deleteUser(dcOrVars, vars) {
  return executeMutation(deleteUserRef(dcOrVars, vars));
}

export const listProductTypesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductTypes', inputVars);
}
listProductTypesRef.operationName = 'ListProductTypes';

export function listProductTypes(dcOrVars, vars) {
  return executeQuery(listProductTypesRef(dcOrVars, vars));
}

export const getProductTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductType', inputVars);
}
getProductTypeRef.operationName = 'GetProductType';

export function getProductType(dcOrVars, vars) {
  return executeQuery(getProductTypeRef(dcOrVars, vars));
}

export const createProductTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProductType', inputVars);
}
createProductTypeRef.operationName = 'CreateProductType';

export function createProductType(dcOrVars, vars) {
  return executeMutation(createProductTypeRef(dcOrVars, vars));
}

export const updateProductTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProductType', inputVars);
}
updateProductTypeRef.operationName = 'UpdateProductType';

export function updateProductType(dcOrVars, vars) {
  return executeMutation(updateProductTypeRef(dcOrVars, vars));
}

export const deleteProductTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProductType', inputVars);
}
deleteProductTypeRef.operationName = 'DeleteProductType';

export function deleteProductType(dcOrVars, vars) {
  return executeMutation(deleteProductTypeRef(dcOrVars, vars));
}

export const createProductTypePhaseConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProductTypePhaseConfig', inputVars);
}
createProductTypePhaseConfigRef.operationName = 'CreateProductTypePhaseConfig';

export function createProductTypePhaseConfig(dcOrVars, vars) {
  return executeMutation(createProductTypePhaseConfigRef(dcOrVars, vars));
}

export const deleteProductTypePhaseConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProductTypePhaseConfig', inputVars);
}
deleteProductTypePhaseConfigRef.operationName = 'DeleteProductTypePhaseConfig';

export function deleteProductTypePhaseConfig(dcOrVars, vars) {
  return executeMutation(deleteProductTypePhaseConfigRef(dcOrVars, vars));
}

export const listProgramsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPrograms', inputVars);
}
listProgramsRef.operationName = 'ListPrograms';

export function listPrograms(dcOrVars, vars) {
  return executeQuery(listProgramsRef(dcOrVars, vars));
}

export const getProgramRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProgram', inputVars);
}
getProgramRef.operationName = 'GetProgram';

export function getProgram(dcOrVars, vars) {
  return executeQuery(getProgramRef(dcOrVars, vars));
}

export const createProgramRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProgram', inputVars);
}
createProgramRef.operationName = 'CreateProgram';

export function createProgram(dcOrVars, vars) {
  return executeMutation(createProgramRef(dcOrVars, vars));
}

export const updateProgramRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProgram', inputVars);
}
updateProgramRef.operationName = 'UpdateProgram';

export function updateProgram(dcOrVars, vars) {
  return executeMutation(updateProgramRef(dcOrVars, vars));
}

export const deleteProgramRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProgram', inputVars);
}
deleteProgramRef.operationName = 'DeleteProgram';

export function deleteProgram(dcOrVars, vars) {
  return executeMutation(deleteProgramRef(dcOrVars, vars));
}

export const listProjectsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjects', inputVars);
}
listProjectsRef.operationName = 'ListProjects';

export function listProjects(dcOrVars, vars) {
  return executeQuery(listProjectsRef(dcOrVars, vars));
}

export const getProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProject', inputVars);
}
getProjectRef.operationName = 'GetProject';

export function getProject(dcOrVars, vars) {
  return executeQuery(getProjectRef(dcOrVars, vars));
}

export const listProjectsByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectsByStatus', inputVars);
}
listProjectsByStatusRef.operationName = 'ListProjectsByStatus';

export function listProjectsByStatus(dcOrVars, vars) {
  return executeQuery(listProjectsByStatusRef(dcOrVars, vars));
}

export const createProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProject', inputVars);
}
createProjectRef.operationName = 'CreateProject';

export function createProject(dcOrVars, vars) {
  return executeMutation(createProjectRef(dcOrVars, vars));
}

export const updateProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProject', inputVars);
}
updateProjectRef.operationName = 'UpdateProject';

export function updateProject(dcOrVars, vars) {
  return executeMutation(updateProjectRef(dcOrVars, vars));
}

export const deleteProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProject', inputVars);
}
deleteProjectRef.operationName = 'DeleteProject';

export function deleteProject(dcOrVars, vars) {
  return executeMutation(deleteProjectRef(dcOrVars, vars));
}

export const listTeamsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTeams', inputVars);
}
listTeamsRef.operationName = 'ListTeams';

export function listTeams(dcOrVars, vars) {
  return executeQuery(listTeamsRef(dcOrVars, vars));
}

export const getTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeam', inputVars);
}
getTeamRef.operationName = 'GetTeam';

export function getTeam(dcOrVars, vars) {
  return executeQuery(getTeamRef(dcOrVars, vars));
}

export const createTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTeam', inputVars);
}
createTeamRef.operationName = 'CreateTeam';

export function createTeam(dcOrVars, vars) {
  return executeMutation(createTeamRef(dcOrVars, vars));
}

export const updateTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTeam', inputVars);
}
updateTeamRef.operationName = 'UpdateTeam';

export function updateTeam(dcOrVars, vars) {
  return executeMutation(updateTeamRef(dcOrVars, vars));
}

export const deleteTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTeam', inputVars);
}
deleteTeamRef.operationName = 'DeleteTeam';

export function deleteTeam(dcOrVars, vars) {
  return executeMutation(deleteTeamRef(dcOrVars, vars));
}

export const addTeamMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTeamMember', inputVars);
}
addTeamMemberRef.operationName = 'AddTeamMember';

export function addTeamMember(dcOrVars, vars) {
  return executeMutation(addTeamMemberRef(dcOrVars, vars));
}

export const removeTeamMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveTeamMember', inputVars);
}
removeTeamMemberRef.operationName = 'RemoveTeamMember';

export function removeTeamMember(dcOrVars, vars) {
  return executeMutation(removeTeamMemberRef(dcOrVars, vars));
}

export const updateTeamMemberRoleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTeamMemberRole', inputVars);
}
updateTeamMemberRoleRef.operationName = 'UpdateTeamMemberRole';

export function updateTeamMemberRole(dcOrVars, vars) {
  return executeMutation(updateTeamMemberRoleRef(dcOrVars, vars));
}

export const getOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganization', inputVars);
}
getOrganizationRef.operationName = 'GetOrganization';

export function getOrganization(dcOrVars, vars) {
  return executeQuery(getOrganizationRef(dcOrVars, vars));
}

export const createOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrganization', inputVars);
}
createOrganizationRef.operationName = 'CreateOrganization';

export function createOrganization(dcOrVars, vars) {
  return executeMutation(createOrganizationRef(dcOrVars, vars));
}

export const updateOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrganization', inputVars);
}
updateOrganizationRef.operationName = 'UpdateOrganization';

export function updateOrganization(dcOrVars, vars) {
  return executeMutation(updateOrganizationRef(dcOrVars, vars));
}

export const listPhaseTemplatesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPhaseTemplates', inputVars);
}
listPhaseTemplatesRef.operationName = 'ListPhaseTemplates';

export function listPhaseTemplates(dcOrVars, vars) {
  return executeQuery(listPhaseTemplatesRef(dcOrVars, vars));
}

export const getPhaseTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPhaseTemplate', inputVars);
}
getPhaseTemplateRef.operationName = 'GetPhaseTemplate';

export function getPhaseTemplate(dcOrVars, vars) {
  return executeQuery(getPhaseTemplateRef(dcOrVars, vars));
}

export const getDefaultTemplatesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDefaultTemplates', inputVars);
}
getDefaultTemplatesRef.operationName = 'GetDefaultTemplates';

export function getDefaultTemplates(dcOrVars, vars) {
  return executeQuery(getDefaultTemplatesRef(dcOrVars, vars));
}

export const createPhaseTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePhaseTemplate', inputVars);
}
createPhaseTemplateRef.operationName = 'CreatePhaseTemplate';

export function createPhaseTemplate(dcOrVars, vars) {
  return executeMutation(createPhaseTemplateRef(dcOrVars, vars));
}

export const updatePhaseTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePhaseTemplate', inputVars);
}
updatePhaseTemplateRef.operationName = 'UpdatePhaseTemplate';

export function updatePhaseTemplate(dcOrVars, vars) {
  return executeMutation(updatePhaseTemplateRef(dcOrVars, vars));
}

export const deletePhaseTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePhaseTemplate', inputVars);
}
deletePhaseTemplateRef.operationName = 'DeletePhaseTemplate';

export function deletePhaseTemplate(dcOrVars, vars) {
  return executeMutation(deletePhaseTemplateRef(dcOrVars, vars));
}

export const createPhaseTemplatePhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePhaseTemplatePhase', inputVars);
}
createPhaseTemplatePhaseRef.operationName = 'CreatePhaseTemplatePhase';

export function createPhaseTemplatePhase(dcOrVars, vars) {
  return executeMutation(createPhaseTemplatePhaseRef(dcOrVars, vars));
}

export const updatePhaseTemplatePhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePhaseTemplatePhase', inputVars);
}
updatePhaseTemplatePhaseRef.operationName = 'UpdatePhaseTemplatePhase';

export function updatePhaseTemplatePhase(dcOrVars, vars) {
  return executeMutation(updatePhaseTemplatePhaseRef(dcOrVars, vars));
}

export const deletePhaseTemplatePhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePhaseTemplatePhase', inputVars);
}
deletePhaseTemplatePhaseRef.operationName = 'DeletePhaseTemplatePhase';

export function deletePhaseTemplatePhase(dcOrVars, vars) {
  return executeMutation(deletePhaseTemplatePhaseRef(dcOrVars, vars));
}

