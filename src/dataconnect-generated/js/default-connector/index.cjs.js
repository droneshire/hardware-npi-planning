const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const PhaseStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  BLOCKED: "BLOCKED",
}
exports.PhaseStatus = PhaseStatus;

const ProjectStatus = {
  PLANNING: "PLANNING",
  ACTIVE: "ACTIVE",
  ON_HOLD: "ON_HOLD",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
}
exports.ProjectStatus = ProjectStatus;

const UserRole = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  MEMBER: "MEMBER",
  VIEWER: "VIEWER",
}
exports.UserRole = UserRole;

const connectorConfig = {
  connector: 'default',
  service: 'hw-npi-planning-service',
  location: 'us-west2'
};
exports.connectorConfig = connectorConfig;

const listProgramsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPrograms', inputVars);
}
listProgramsRef.operationName = 'ListPrograms';
exports.listProgramsRef = listProgramsRef;

exports.listPrograms = function listPrograms(dcOrVars, vars) {
  return executeQuery(listProgramsRef(dcOrVars, vars));
};

const getProgramRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProgram', inputVars);
}
getProgramRef.operationName = 'GetProgram';
exports.getProgramRef = getProgramRef;

exports.getProgram = function getProgram(dcOrVars, vars) {
  return executeQuery(getProgramRef(dcOrVars, vars));
};

const createProgramRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProgram', inputVars);
}
createProgramRef.operationName = 'CreateProgram';
exports.createProgramRef = createProgramRef;

exports.createProgram = function createProgram(dcOrVars, vars) {
  return executeMutation(createProgramRef(dcOrVars, vars));
};

const updateProgramRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProgram', inputVars);
}
updateProgramRef.operationName = 'UpdateProgram';
exports.updateProgramRef = updateProgramRef;

exports.updateProgram = function updateProgram(dcOrVars, vars) {
  return executeMutation(updateProgramRef(dcOrVars, vars));
};

const deleteProgramRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProgram', inputVars);
}
deleteProgramRef.operationName = 'DeleteProgram';
exports.deleteProgramRef = deleteProgramRef;

exports.deleteProgram = function deleteProgram(dcOrVars, vars) {
  return executeMutation(deleteProgramRef(dcOrVars, vars));
};

const listProjectAssignmentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectAssignments', inputVars);
}
listProjectAssignmentsRef.operationName = 'ListProjectAssignments';
exports.listProjectAssignmentsRef = listProjectAssignmentsRef;

exports.listProjectAssignments = function listProjectAssignments(dcOrVars, vars) {
  return executeQuery(listProjectAssignmentsRef(dcOrVars, vars));
};

const listUserAssignmentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserAssignments', inputVars);
}
listUserAssignmentsRef.operationName = 'ListUserAssignments';
exports.listUserAssignmentsRef = listUserAssignmentsRef;

exports.listUserAssignments = function listUserAssignments(dcOrVars, vars) {
  return executeQuery(listUserAssignmentsRef(dcOrVars, vars));
};

const listAssignmentsByDateRangeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAssignmentsByDateRange', inputVars);
}
listAssignmentsByDateRangeRef.operationName = 'ListAssignmentsByDateRange';
exports.listAssignmentsByDateRangeRef = listAssignmentsByDateRangeRef;

exports.listAssignmentsByDateRange = function listAssignmentsByDateRange(dcOrVars, vars) {
  return executeQuery(listAssignmentsByDateRangeRef(dcOrVars, vars));
};

const createProjectAssignmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProjectAssignment', inputVars);
}
createProjectAssignmentRef.operationName = 'CreateProjectAssignment';
exports.createProjectAssignmentRef = createProjectAssignmentRef;

exports.createProjectAssignment = function createProjectAssignment(dcOrVars, vars) {
  return executeMutation(createProjectAssignmentRef(dcOrVars, vars));
};

const updateProjectAssignmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectAssignment', inputVars);
}
updateProjectAssignmentRef.operationName = 'UpdateProjectAssignment';
exports.updateProjectAssignmentRef = updateProjectAssignmentRef;

exports.updateProjectAssignment = function updateProjectAssignment(dcOrVars, vars) {
  return executeMutation(updateProjectAssignmentRef(dcOrVars, vars));
};

const deleteProjectAssignmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProjectAssignment', inputVars);
}
deleteProjectAssignmentRef.operationName = 'DeleteProjectAssignment';
exports.deleteProjectAssignmentRef = deleteProjectAssignmentRef;

exports.deleteProjectAssignment = function deleteProjectAssignment(dcOrVars, vars) {
  return executeMutation(deleteProjectAssignmentRef(dcOrVars, vars));
};

const listTeamsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTeams', inputVars);
}
listTeamsRef.operationName = 'ListTeams';
exports.listTeamsRef = listTeamsRef;

exports.listTeams = function listTeams(dcOrVars, vars) {
  return executeQuery(listTeamsRef(dcOrVars, vars));
};

const getTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTeam', inputVars);
}
getTeamRef.operationName = 'GetTeam';
exports.getTeamRef = getTeamRef;

exports.getTeam = function getTeam(dcOrVars, vars) {
  return executeQuery(getTeamRef(dcOrVars, vars));
};

const createTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTeam', inputVars);
}
createTeamRef.operationName = 'CreateTeam';
exports.createTeamRef = createTeamRef;

exports.createTeam = function createTeam(dcOrVars, vars) {
  return executeMutation(createTeamRef(dcOrVars, vars));
};

const updateTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTeam', inputVars);
}
updateTeamRef.operationName = 'UpdateTeam';
exports.updateTeamRef = updateTeamRef;

exports.updateTeam = function updateTeam(dcOrVars, vars) {
  return executeMutation(updateTeamRef(dcOrVars, vars));
};

const deleteTeamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTeam', inputVars);
}
deleteTeamRef.operationName = 'DeleteTeam';
exports.deleteTeamRef = deleteTeamRef;

exports.deleteTeam = function deleteTeam(dcOrVars, vars) {
  return executeMutation(deleteTeamRef(dcOrVars, vars));
};

const addTeamMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTeamMember', inputVars);
}
addTeamMemberRef.operationName = 'AddTeamMember';
exports.addTeamMemberRef = addTeamMemberRef;

exports.addTeamMember = function addTeamMember(dcOrVars, vars) {
  return executeMutation(addTeamMemberRef(dcOrVars, vars));
};

const removeTeamMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveTeamMember', inputVars);
}
removeTeamMemberRef.operationName = 'RemoveTeamMember';
exports.removeTeamMemberRef = removeTeamMemberRef;

exports.removeTeamMember = function removeTeamMember(dcOrVars, vars) {
  return executeMutation(removeTeamMemberRef(dcOrVars, vars));
};

const updateTeamMemberRoleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTeamMemberRole', inputVars);
}
updateTeamMemberRoleRef.operationName = 'UpdateTeamMemberRole';
exports.updateTeamMemberRoleRef = updateTeamMemberRoleRef;

exports.updateTeamMemberRole = function updateTeamMemberRole(dcOrVars, vars) {
  return executeMutation(updateTeamMemberRoleRef(dcOrVars, vars));
};

const listUsersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsers', inputVars);
}
listUsersRef.operationName = 'ListUsers';
exports.listUsersRef = listUsersRef;

exports.listUsers = function listUsers(dcOrVars, vars) {
  return executeQuery(listUsersRef(dcOrVars, vars));
};

const getUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUser', inputVars);
}
getUserRef.operationName = 'GetUser';
exports.getUserRef = getUserRef;

exports.getUser = function getUser(dcOrVars, vars) {
  return executeQuery(getUserRef(dcOrVars, vars));
};

const getUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByEmail', inputVars);
}
getUserByEmailRef.operationName = 'GetUserByEmail';
exports.getUserByEmailRef = getUserByEmailRef;

exports.getUserByEmail = function getUserByEmail(dcOrVars, vars) {
  return executeQuery(getUserByEmailRef(dcOrVars, vars));
};

const getUserByFirebaseUidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByFirebaseUid', inputVars);
}
getUserByFirebaseUidRef.operationName = 'GetUserByFirebaseUid';
exports.getUserByFirebaseUidRef = getUserByFirebaseUidRef;

exports.getUserByFirebaseUid = function getUserByFirebaseUid(dcOrVars, vars) {
  return executeQuery(getUserByFirebaseUidRef(dcOrVars, vars));
};

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const updateUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUser', inputVars);
}
updateUserRef.operationName = 'UpdateUser';
exports.updateUserRef = updateUserRef;

exports.updateUser = function updateUser(dcOrVars, vars) {
  return executeMutation(updateUserRef(dcOrVars, vars));
};

const deleteUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteUser', inputVars);
}
deleteUserRef.operationName = 'DeleteUser';
exports.deleteUserRef = deleteUserRef;

exports.deleteUser = function deleteUser(dcOrVars, vars) {
  return executeMutation(deleteUserRef(dcOrVars, vars));
};

const getOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrganization', inputVars);
}
getOrganizationRef.operationName = 'GetOrganization';
exports.getOrganizationRef = getOrganizationRef;

exports.getOrganization = function getOrganization(dcOrVars, vars) {
  return executeQuery(getOrganizationRef(dcOrVars, vars));
};

const createOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrganization', inputVars);
}
createOrganizationRef.operationName = 'CreateOrganization';
exports.createOrganizationRef = createOrganizationRef;

exports.createOrganization = function createOrganization(dcOrVars, vars) {
  return executeMutation(createOrganizationRef(dcOrVars, vars));
};

const updateOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrganization', inputVars);
}
updateOrganizationRef.operationName = 'UpdateOrganization';
exports.updateOrganizationRef = updateOrganizationRef;

exports.updateOrganization = function updateOrganization(dcOrVars, vars) {
  return executeMutation(updateOrganizationRef(dcOrVars, vars));
};

const listPhaseTemplatesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPhaseTemplates', inputVars);
}
listPhaseTemplatesRef.operationName = 'ListPhaseTemplates';
exports.listPhaseTemplatesRef = listPhaseTemplatesRef;

exports.listPhaseTemplates = function listPhaseTemplates(dcOrVars, vars) {
  return executeQuery(listPhaseTemplatesRef(dcOrVars, vars));
};

const getPhaseTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPhaseTemplate', inputVars);
}
getPhaseTemplateRef.operationName = 'GetPhaseTemplate';
exports.getPhaseTemplateRef = getPhaseTemplateRef;

exports.getPhaseTemplate = function getPhaseTemplate(dcOrVars, vars) {
  return executeQuery(getPhaseTemplateRef(dcOrVars, vars));
};

const listPhaseTemplatePhasesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPhaseTemplatePhases', inputVars);
}
listPhaseTemplatePhasesRef.operationName = 'ListPhaseTemplatePhases';
exports.listPhaseTemplatePhasesRef = listPhaseTemplatePhasesRef;

exports.listPhaseTemplatePhases = function listPhaseTemplatePhases(dcOrVars, vars) {
  return executeQuery(listPhaseTemplatePhasesRef(dcOrVars, vars));
};

const getDefaultTemplatesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDefaultTemplates', inputVars);
}
getDefaultTemplatesRef.operationName = 'GetDefaultTemplates';
exports.getDefaultTemplatesRef = getDefaultTemplatesRef;

exports.getDefaultTemplates = function getDefaultTemplates(dcOrVars, vars) {
  return executeQuery(getDefaultTemplatesRef(dcOrVars, vars));
};

const createPhaseTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePhaseTemplate', inputVars);
}
createPhaseTemplateRef.operationName = 'CreatePhaseTemplate';
exports.createPhaseTemplateRef = createPhaseTemplateRef;

exports.createPhaseTemplate = function createPhaseTemplate(dcOrVars, vars) {
  return executeMutation(createPhaseTemplateRef(dcOrVars, vars));
};

const updatePhaseTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePhaseTemplate', inputVars);
}
updatePhaseTemplateRef.operationName = 'UpdatePhaseTemplate';
exports.updatePhaseTemplateRef = updatePhaseTemplateRef;

exports.updatePhaseTemplate = function updatePhaseTemplate(dcOrVars, vars) {
  return executeMutation(updatePhaseTemplateRef(dcOrVars, vars));
};

const deletePhaseTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePhaseTemplate', inputVars);
}
deletePhaseTemplateRef.operationName = 'DeletePhaseTemplate';
exports.deletePhaseTemplateRef = deletePhaseTemplateRef;

exports.deletePhaseTemplate = function deletePhaseTemplate(dcOrVars, vars) {
  return executeMutation(deletePhaseTemplateRef(dcOrVars, vars));
};

const createPhaseTemplatePhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePhaseTemplatePhase', inputVars);
}
createPhaseTemplatePhaseRef.operationName = 'CreatePhaseTemplatePhase';
exports.createPhaseTemplatePhaseRef = createPhaseTemplatePhaseRef;

exports.createPhaseTemplatePhase = function createPhaseTemplatePhase(dcOrVars, vars) {
  return executeMutation(createPhaseTemplatePhaseRef(dcOrVars, vars));
};

const updatePhaseTemplatePhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePhaseTemplatePhase', inputVars);
}
updatePhaseTemplatePhaseRef.operationName = 'UpdatePhaseTemplatePhase';
exports.updatePhaseTemplatePhaseRef = updatePhaseTemplatePhaseRef;

exports.updatePhaseTemplatePhase = function updatePhaseTemplatePhase(dcOrVars, vars) {
  return executeMutation(updatePhaseTemplatePhaseRef(dcOrVars, vars));
};

const deletePhaseTemplatePhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePhaseTemplatePhase', inputVars);
}
deletePhaseTemplatePhaseRef.operationName = 'DeletePhaseTemplatePhase';
exports.deletePhaseTemplatePhaseRef = deletePhaseTemplatePhaseRef;

exports.deletePhaseTemplatePhase = function deletePhaseTemplatePhase(dcOrVars, vars) {
  return executeMutation(deletePhaseTemplatePhaseRef(dcOrVars, vars));
};

const listPortfoliosRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPortfolios', inputVars);
}
listPortfoliosRef.operationName = 'ListPortfolios';
exports.listPortfoliosRef = listPortfoliosRef;

exports.listPortfolios = function listPortfolios(dcOrVars, vars) {
  return executeQuery(listPortfoliosRef(dcOrVars, vars));
};

const getPortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPortfolio', inputVars);
}
getPortfolioRef.operationName = 'GetPortfolio';
exports.getPortfolioRef = getPortfolioRef;

exports.getPortfolio = function getPortfolio(dcOrVars, vars) {
  return executeQuery(getPortfolioRef(dcOrVars, vars));
};

const createPortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePortfolio', inputVars);
}
createPortfolioRef.operationName = 'CreatePortfolio';
exports.createPortfolioRef = createPortfolioRef;

exports.createPortfolio = function createPortfolio(dcOrVars, vars) {
  return executeMutation(createPortfolioRef(dcOrVars, vars));
};

const updatePortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePortfolio', inputVars);
}
updatePortfolioRef.operationName = 'UpdatePortfolio';
exports.updatePortfolioRef = updatePortfolioRef;

exports.updatePortfolio = function updatePortfolio(dcOrVars, vars) {
  return executeMutation(updatePortfolioRef(dcOrVars, vars));
};

const deletePortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePortfolio', inputVars);
}
deletePortfolioRef.operationName = 'DeletePortfolio';
exports.deletePortfolioRef = deletePortfolioRef;

exports.deletePortfolio = function deletePortfolio(dcOrVars, vars) {
  return executeMutation(deletePortfolioRef(dcOrVars, vars));
};

const listProductTypesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductTypes', inputVars);
}
listProductTypesRef.operationName = 'ListProductTypes';
exports.listProductTypesRef = listProductTypesRef;

exports.listProductTypes = function listProductTypes(dcOrVars, vars) {
  return executeQuery(listProductTypesRef(dcOrVars, vars));
};

const getProductTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductType', inputVars);
}
getProductTypeRef.operationName = 'GetProductType';
exports.getProductTypeRef = getProductTypeRef;

exports.getProductType = function getProductType(dcOrVars, vars) {
  return executeQuery(getProductTypeRef(dcOrVars, vars));
};

const createProductTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProductType', inputVars);
}
createProductTypeRef.operationName = 'CreateProductType';
exports.createProductTypeRef = createProductTypeRef;

exports.createProductType = function createProductType(dcOrVars, vars) {
  return executeMutation(createProductTypeRef(dcOrVars, vars));
};

const updateProductTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProductType', inputVars);
}
updateProductTypeRef.operationName = 'UpdateProductType';
exports.updateProductTypeRef = updateProductTypeRef;

exports.updateProductType = function updateProductType(dcOrVars, vars) {
  return executeMutation(updateProductTypeRef(dcOrVars, vars));
};

const deleteProductTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProductType', inputVars);
}
deleteProductTypeRef.operationName = 'DeleteProductType';
exports.deleteProductTypeRef = deleteProductTypeRef;

exports.deleteProductType = function deleteProductType(dcOrVars, vars) {
  return executeMutation(deleteProductTypeRef(dcOrVars, vars));
};

const createProductTypePhaseConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProductTypePhaseConfig', inputVars);
}
createProductTypePhaseConfigRef.operationName = 'CreateProductTypePhaseConfig';
exports.createProductTypePhaseConfigRef = createProductTypePhaseConfigRef;

exports.createProductTypePhaseConfig = function createProductTypePhaseConfig(dcOrVars, vars) {
  return executeMutation(createProductTypePhaseConfigRef(dcOrVars, vars));
};

const deleteProductTypePhaseConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProductTypePhaseConfig', inputVars);
}
deleteProductTypePhaseConfigRef.operationName = 'DeleteProductTypePhaseConfig';
exports.deleteProductTypePhaseConfigRef = deleteProductTypePhaseConfigRef;

exports.deleteProductTypePhaseConfig = function deleteProductTypePhaseConfig(dcOrVars, vars) {
  return executeMutation(deleteProductTypePhaseConfigRef(dcOrVars, vars));
};

const listProjectsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjects', inputVars);
}
listProjectsRef.operationName = 'ListProjects';
exports.listProjectsRef = listProjectsRef;

exports.listProjects = function listProjects(dcOrVars, vars) {
  return executeQuery(listProjectsRef(dcOrVars, vars));
};

const getProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProject', inputVars);
}
getProjectRef.operationName = 'GetProject';
exports.getProjectRef = getProjectRef;

exports.getProject = function getProject(dcOrVars, vars) {
  return executeQuery(getProjectRef(dcOrVars, vars));
};

const listProjectsByStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectsByStatus', inputVars);
}
listProjectsByStatusRef.operationName = 'ListProjectsByStatus';
exports.listProjectsByStatusRef = listProjectsByStatusRef;

exports.listProjectsByStatus = function listProjectsByStatus(dcOrVars, vars) {
  return executeQuery(listProjectsByStatusRef(dcOrVars, vars));
};

const createProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProject', inputVars);
}
createProjectRef.operationName = 'CreateProject';
exports.createProjectRef = createProjectRef;

exports.createProject = function createProject(dcOrVars, vars) {
  return executeMutation(createProjectRef(dcOrVars, vars));
};

const updateProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProject', inputVars);
}
updateProjectRef.operationName = 'UpdateProject';
exports.updateProjectRef = updateProjectRef;

exports.updateProject = function updateProject(dcOrVars, vars) {
  return executeMutation(updateProjectRef(dcOrVars, vars));
};

const deleteProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProject', inputVars);
}
deleteProjectRef.operationName = 'DeleteProject';
exports.deleteProjectRef = deleteProjectRef;

exports.deleteProject = function deleteProject(dcOrVars, vars) {
  return executeMutation(deleteProjectRef(dcOrVars, vars));
};

const listProjectPhasesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectPhases', inputVars);
}
listProjectPhasesRef.operationName = 'ListProjectPhases';
exports.listProjectPhasesRef = listProjectPhasesRef;

exports.listProjectPhases = function listProjectPhases(dcOrVars, vars) {
  return executeQuery(listProjectPhasesRef(dcOrVars, vars));
};

const getProjectPhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProjectPhase', inputVars);
}
getProjectPhaseRef.operationName = 'GetProjectPhase';
exports.getProjectPhaseRef = getProjectPhaseRef;

exports.getProjectPhase = function getProjectPhase(dcOrVars, vars) {
  return executeQuery(getProjectPhaseRef(dcOrVars, vars));
};

const createProjectPhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProjectPhase', inputVars);
}
createProjectPhaseRef.operationName = 'CreateProjectPhase';
exports.createProjectPhaseRef = createProjectPhaseRef;

exports.createProjectPhase = function createProjectPhase(dcOrVars, vars) {
  return executeMutation(createProjectPhaseRef(dcOrVars, vars));
};

const updateProjectPhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectPhase', inputVars);
}
updateProjectPhaseRef.operationName = 'UpdateProjectPhase';
exports.updateProjectPhaseRef = updateProjectPhaseRef;

exports.updateProjectPhase = function updateProjectPhase(dcOrVars, vars) {
  return executeMutation(updateProjectPhaseRef(dcOrVars, vars));
};

const deleteProjectPhaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProjectPhase', inputVars);
}
deleteProjectPhaseRef.operationName = 'DeleteProjectPhase';
exports.deleteProjectPhaseRef = deleteProjectPhaseRef;

exports.deleteProjectPhase = function deleteProjectPhase(dcOrVars, vars) {
  return executeMutation(deleteProjectPhaseRef(dcOrVars, vars));
};
