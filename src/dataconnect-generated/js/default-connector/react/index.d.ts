import { ListPortfoliosData, ListPortfoliosVariables, GetPortfolioData, GetPortfolioVariables, CreatePortfolioData, CreatePortfolioVariables, UpdatePortfolioData, UpdatePortfolioVariables, DeletePortfolioData, DeletePortfolioVariables, ListProjectAssignmentsData, ListProjectAssignmentsVariables, ListUserAssignmentsData, ListUserAssignmentsVariables, ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables, CreateProjectAssignmentData, CreateProjectAssignmentVariables, UpdateProjectAssignmentData, UpdateProjectAssignmentVariables, DeleteProjectAssignmentData, DeleteProjectAssignmentVariables, ListProjectPhasesData, ListProjectPhasesVariables, GetProjectPhaseData, GetProjectPhaseVariables, CreateProjectPhaseData, CreateProjectPhaseVariables, UpdateProjectPhaseData, UpdateProjectPhaseVariables, DeleteProjectPhaseData, DeleteProjectPhaseVariables, ListUsersData, ListUsersVariables, GetUserData, GetUserVariables, GetUserByEmailData, GetUserByEmailVariables, GetUserByFirebaseUidData, GetUserByFirebaseUidVariables, CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, DeleteUserData, DeleteUserVariables, ListProductTypesData, ListProductTypesVariables, GetProductTypeData, GetProductTypeVariables, CreateProductTypeData, CreateProductTypeVariables, UpdateProductTypeData, UpdateProductTypeVariables, DeleteProductTypeData, DeleteProductTypeVariables, CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables, DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables, ListProgramsData, ListProgramsVariables, GetProgramData, GetProgramVariables, CreateProgramData, CreateProgramVariables, UpdateProgramData, UpdateProgramVariables, DeleteProgramData, DeleteProgramVariables, ListProjectsData, ListProjectsVariables, GetProjectData, GetProjectVariables, ListProjectsByStatusData, ListProjectsByStatusVariables, CreateProjectData, CreateProjectVariables, UpdateProjectData, UpdateProjectVariables, DeleteProjectData, DeleteProjectVariables, ListTeamsData, ListTeamsVariables, GetTeamData, GetTeamVariables, CreateTeamData, CreateTeamVariables, UpdateTeamData, UpdateTeamVariables, DeleteTeamData, DeleteTeamVariables, AddTeamMemberData, AddTeamMemberVariables, RemoveTeamMemberData, RemoveTeamMemberVariables, UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables, GetOrganizationData, GetOrganizationVariables, CreateOrganizationData, CreateOrganizationVariables, UpdateOrganizationData, UpdateOrganizationVariables, ListPhaseTemplatesData, ListPhaseTemplatesVariables, GetPhaseTemplateData, GetPhaseTemplateVariables, GetDefaultTemplatesData, GetDefaultTemplatesVariables, CreatePhaseTemplateData, CreatePhaseTemplateVariables, UpdatePhaseTemplateData, UpdatePhaseTemplateVariables, DeletePhaseTemplateData, DeletePhaseTemplateVariables, CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables, UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables, DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListPortfolios(vars: ListPortfoliosVariables, options?: useDataConnectQueryOptions<ListPortfoliosData>): UseDataConnectQueryResult<ListPortfoliosData, ListPortfoliosVariables>;
export function useListPortfolios(dc: DataConnect, vars: ListPortfoliosVariables, options?: useDataConnectQueryOptions<ListPortfoliosData>): UseDataConnectQueryResult<ListPortfoliosData, ListPortfoliosVariables>;

export function useGetPortfolio(vars: GetPortfolioVariables, options?: useDataConnectQueryOptions<GetPortfolioData>): UseDataConnectQueryResult<GetPortfolioData, GetPortfolioVariables>;
export function useGetPortfolio(dc: DataConnect, vars: GetPortfolioVariables, options?: useDataConnectQueryOptions<GetPortfolioData>): UseDataConnectQueryResult<GetPortfolioData, GetPortfolioVariables>;

export function useCreatePortfolio(options?: useDataConnectMutationOptions<CreatePortfolioData, FirebaseError, CreatePortfolioVariables>): UseDataConnectMutationResult<CreatePortfolioData, CreatePortfolioVariables>;
export function useCreatePortfolio(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePortfolioData, FirebaseError, CreatePortfolioVariables>): UseDataConnectMutationResult<CreatePortfolioData, CreatePortfolioVariables>;

export function useUpdatePortfolio(options?: useDataConnectMutationOptions<UpdatePortfolioData, FirebaseError, UpdatePortfolioVariables>): UseDataConnectMutationResult<UpdatePortfolioData, UpdatePortfolioVariables>;
export function useUpdatePortfolio(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePortfolioData, FirebaseError, UpdatePortfolioVariables>): UseDataConnectMutationResult<UpdatePortfolioData, UpdatePortfolioVariables>;

export function useDeletePortfolio(options?: useDataConnectMutationOptions<DeletePortfolioData, FirebaseError, DeletePortfolioVariables>): UseDataConnectMutationResult<DeletePortfolioData, DeletePortfolioVariables>;
export function useDeletePortfolio(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePortfolioData, FirebaseError, DeletePortfolioVariables>): UseDataConnectMutationResult<DeletePortfolioData, DeletePortfolioVariables>;

export function useListProjectAssignments(vars: ListProjectAssignmentsVariables, options?: useDataConnectQueryOptions<ListProjectAssignmentsData>): UseDataConnectQueryResult<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;
export function useListProjectAssignments(dc: DataConnect, vars: ListProjectAssignmentsVariables, options?: useDataConnectQueryOptions<ListProjectAssignmentsData>): UseDataConnectQueryResult<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;

export function useListUserAssignments(vars: ListUserAssignmentsVariables, options?: useDataConnectQueryOptions<ListUserAssignmentsData>): UseDataConnectQueryResult<ListUserAssignmentsData, ListUserAssignmentsVariables>;
export function useListUserAssignments(dc: DataConnect, vars: ListUserAssignmentsVariables, options?: useDataConnectQueryOptions<ListUserAssignmentsData>): UseDataConnectQueryResult<ListUserAssignmentsData, ListUserAssignmentsVariables>;

export function useListAssignmentsByDateRange(vars: ListAssignmentsByDateRangeVariables, options?: useDataConnectQueryOptions<ListAssignmentsByDateRangeData>): UseDataConnectQueryResult<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;
export function useListAssignmentsByDateRange(dc: DataConnect, vars: ListAssignmentsByDateRangeVariables, options?: useDataConnectQueryOptions<ListAssignmentsByDateRangeData>): UseDataConnectQueryResult<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;

export function useCreateProjectAssignment(options?: useDataConnectMutationOptions<CreateProjectAssignmentData, FirebaseError, CreateProjectAssignmentVariables>): UseDataConnectMutationResult<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;
export function useCreateProjectAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectAssignmentData, FirebaseError, CreateProjectAssignmentVariables>): UseDataConnectMutationResult<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;

export function useUpdateProjectAssignment(options?: useDataConnectMutationOptions<UpdateProjectAssignmentData, FirebaseError, UpdateProjectAssignmentVariables>): UseDataConnectMutationResult<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;
export function useUpdateProjectAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectAssignmentData, FirebaseError, UpdateProjectAssignmentVariables>): UseDataConnectMutationResult<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;

export function useDeleteProjectAssignment(options?: useDataConnectMutationOptions<DeleteProjectAssignmentData, FirebaseError, DeleteProjectAssignmentVariables>): UseDataConnectMutationResult<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;
export function useDeleteProjectAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectAssignmentData, FirebaseError, DeleteProjectAssignmentVariables>): UseDataConnectMutationResult<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;

export function useListProjectPhases(vars: ListProjectPhasesVariables, options?: useDataConnectQueryOptions<ListProjectPhasesData>): UseDataConnectQueryResult<ListProjectPhasesData, ListProjectPhasesVariables>;
export function useListProjectPhases(dc: DataConnect, vars: ListProjectPhasesVariables, options?: useDataConnectQueryOptions<ListProjectPhasesData>): UseDataConnectQueryResult<ListProjectPhasesData, ListProjectPhasesVariables>;

export function useGetProjectPhase(vars: GetProjectPhaseVariables, options?: useDataConnectQueryOptions<GetProjectPhaseData>): UseDataConnectQueryResult<GetProjectPhaseData, GetProjectPhaseVariables>;
export function useGetProjectPhase(dc: DataConnect, vars: GetProjectPhaseVariables, options?: useDataConnectQueryOptions<GetProjectPhaseData>): UseDataConnectQueryResult<GetProjectPhaseData, GetProjectPhaseVariables>;

export function useCreateProjectPhase(options?: useDataConnectMutationOptions<CreateProjectPhaseData, FirebaseError, CreateProjectPhaseVariables>): UseDataConnectMutationResult<CreateProjectPhaseData, CreateProjectPhaseVariables>;
export function useCreateProjectPhase(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectPhaseData, FirebaseError, CreateProjectPhaseVariables>): UseDataConnectMutationResult<CreateProjectPhaseData, CreateProjectPhaseVariables>;

export function useUpdateProjectPhase(options?: useDataConnectMutationOptions<UpdateProjectPhaseData, FirebaseError, UpdateProjectPhaseVariables>): UseDataConnectMutationResult<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;
export function useUpdateProjectPhase(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectPhaseData, FirebaseError, UpdateProjectPhaseVariables>): UseDataConnectMutationResult<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;

export function useDeleteProjectPhase(options?: useDataConnectMutationOptions<DeleteProjectPhaseData, FirebaseError, DeleteProjectPhaseVariables>): UseDataConnectMutationResult<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;
export function useDeleteProjectPhase(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectPhaseData, FirebaseError, DeleteProjectPhaseVariables>): UseDataConnectMutationResult<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;

export function useListUsers(vars: ListUsersVariables, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, ListUsersVariables>;
export function useListUsers(dc: DataConnect, vars: ListUsersVariables, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, ListUsersVariables>;

export function useGetUser(vars: GetUserVariables, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, GetUserVariables>;
export function useGetUser(dc: DataConnect, vars: GetUserVariables, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, GetUserVariables>;

export function useGetUserByEmail(vars: GetUserByEmailVariables, options?: useDataConnectQueryOptions<GetUserByEmailData>): UseDataConnectQueryResult<GetUserByEmailData, GetUserByEmailVariables>;
export function useGetUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables, options?: useDataConnectQueryOptions<GetUserByEmailData>): UseDataConnectQueryResult<GetUserByEmailData, GetUserByEmailVariables>;

export function useGetUserByFirebaseUid(vars: GetUserByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetUserByFirebaseUidData>): UseDataConnectQueryResult<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;
export function useGetUserByFirebaseUid(dc: DataConnect, vars: GetUserByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetUserByFirebaseUidData>): UseDataConnectQueryResult<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;

export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, DeleteUserVariables>): UseDataConnectMutationResult<DeleteUserData, DeleteUserVariables>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, DeleteUserVariables>): UseDataConnectMutationResult<DeleteUserData, DeleteUserVariables>;

export function useListProductTypes(vars: ListProductTypesVariables, options?: useDataConnectQueryOptions<ListProductTypesData>): UseDataConnectQueryResult<ListProductTypesData, ListProductTypesVariables>;
export function useListProductTypes(dc: DataConnect, vars: ListProductTypesVariables, options?: useDataConnectQueryOptions<ListProductTypesData>): UseDataConnectQueryResult<ListProductTypesData, ListProductTypesVariables>;

export function useGetProductType(vars: GetProductTypeVariables, options?: useDataConnectQueryOptions<GetProductTypeData>): UseDataConnectQueryResult<GetProductTypeData, GetProductTypeVariables>;
export function useGetProductType(dc: DataConnect, vars: GetProductTypeVariables, options?: useDataConnectQueryOptions<GetProductTypeData>): UseDataConnectQueryResult<GetProductTypeData, GetProductTypeVariables>;

export function useCreateProductType(options?: useDataConnectMutationOptions<CreateProductTypeData, FirebaseError, CreateProductTypeVariables>): UseDataConnectMutationResult<CreateProductTypeData, CreateProductTypeVariables>;
export function useCreateProductType(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProductTypeData, FirebaseError, CreateProductTypeVariables>): UseDataConnectMutationResult<CreateProductTypeData, CreateProductTypeVariables>;

export function useUpdateProductType(options?: useDataConnectMutationOptions<UpdateProductTypeData, FirebaseError, UpdateProductTypeVariables>): UseDataConnectMutationResult<UpdateProductTypeData, UpdateProductTypeVariables>;
export function useUpdateProductType(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProductTypeData, FirebaseError, UpdateProductTypeVariables>): UseDataConnectMutationResult<UpdateProductTypeData, UpdateProductTypeVariables>;

export function useDeleteProductType(options?: useDataConnectMutationOptions<DeleteProductTypeData, FirebaseError, DeleteProductTypeVariables>): UseDataConnectMutationResult<DeleteProductTypeData, DeleteProductTypeVariables>;
export function useDeleteProductType(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProductTypeData, FirebaseError, DeleteProductTypeVariables>): UseDataConnectMutationResult<DeleteProductTypeData, DeleteProductTypeVariables>;

export function useCreateProductTypePhaseConfig(options?: useDataConnectMutationOptions<CreateProductTypePhaseConfigData, FirebaseError, CreateProductTypePhaseConfigVariables>): UseDataConnectMutationResult<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;
export function useCreateProductTypePhaseConfig(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProductTypePhaseConfigData, FirebaseError, CreateProductTypePhaseConfigVariables>): UseDataConnectMutationResult<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;

export function useDeleteProductTypePhaseConfig(options?: useDataConnectMutationOptions<DeleteProductTypePhaseConfigData, FirebaseError, DeleteProductTypePhaseConfigVariables>): UseDataConnectMutationResult<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;
export function useDeleteProductTypePhaseConfig(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProductTypePhaseConfigData, FirebaseError, DeleteProductTypePhaseConfigVariables>): UseDataConnectMutationResult<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;

export function useListPrograms(vars: ListProgramsVariables, options?: useDataConnectQueryOptions<ListProgramsData>): UseDataConnectQueryResult<ListProgramsData, ListProgramsVariables>;
export function useListPrograms(dc: DataConnect, vars: ListProgramsVariables, options?: useDataConnectQueryOptions<ListProgramsData>): UseDataConnectQueryResult<ListProgramsData, ListProgramsVariables>;

export function useGetProgram(vars: GetProgramVariables, options?: useDataConnectQueryOptions<GetProgramData>): UseDataConnectQueryResult<GetProgramData, GetProgramVariables>;
export function useGetProgram(dc: DataConnect, vars: GetProgramVariables, options?: useDataConnectQueryOptions<GetProgramData>): UseDataConnectQueryResult<GetProgramData, GetProgramVariables>;

export function useCreateProgram(options?: useDataConnectMutationOptions<CreateProgramData, FirebaseError, CreateProgramVariables>): UseDataConnectMutationResult<CreateProgramData, CreateProgramVariables>;
export function useCreateProgram(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProgramData, FirebaseError, CreateProgramVariables>): UseDataConnectMutationResult<CreateProgramData, CreateProgramVariables>;

export function useUpdateProgram(options?: useDataConnectMutationOptions<UpdateProgramData, FirebaseError, UpdateProgramVariables>): UseDataConnectMutationResult<UpdateProgramData, UpdateProgramVariables>;
export function useUpdateProgram(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProgramData, FirebaseError, UpdateProgramVariables>): UseDataConnectMutationResult<UpdateProgramData, UpdateProgramVariables>;

export function useDeleteProgram(options?: useDataConnectMutationOptions<DeleteProgramData, FirebaseError, DeleteProgramVariables>): UseDataConnectMutationResult<DeleteProgramData, DeleteProgramVariables>;
export function useDeleteProgram(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProgramData, FirebaseError, DeleteProgramVariables>): UseDataConnectMutationResult<DeleteProgramData, DeleteProgramVariables>;

export function useListProjects(vars: ListProjectsVariables, options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, ListProjectsVariables>;
export function useListProjects(dc: DataConnect, vars: ListProjectsVariables, options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, ListProjectsVariables>;

export function useGetProject(vars: GetProjectVariables, options?: useDataConnectQueryOptions<GetProjectData>): UseDataConnectQueryResult<GetProjectData, GetProjectVariables>;
export function useGetProject(dc: DataConnect, vars: GetProjectVariables, options?: useDataConnectQueryOptions<GetProjectData>): UseDataConnectQueryResult<GetProjectData, GetProjectVariables>;

export function useListProjectsByStatus(vars: ListProjectsByStatusVariables, options?: useDataConnectQueryOptions<ListProjectsByStatusData>): UseDataConnectQueryResult<ListProjectsByStatusData, ListProjectsByStatusVariables>;
export function useListProjectsByStatus(dc: DataConnect, vars: ListProjectsByStatusVariables, options?: useDataConnectQueryOptions<ListProjectsByStatusData>): UseDataConnectQueryResult<ListProjectsByStatusData, ListProjectsByStatusVariables>;

export function useCreateProject(options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;
export function useCreateProject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;

export function useUpdateProject(options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;
export function useUpdateProject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;

export function useDeleteProject(options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
export function useDeleteProject(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;

export function useListTeams(vars: ListTeamsVariables, options?: useDataConnectQueryOptions<ListTeamsData>): UseDataConnectQueryResult<ListTeamsData, ListTeamsVariables>;
export function useListTeams(dc: DataConnect, vars: ListTeamsVariables, options?: useDataConnectQueryOptions<ListTeamsData>): UseDataConnectQueryResult<ListTeamsData, ListTeamsVariables>;

export function useGetTeam(vars: GetTeamVariables, options?: useDataConnectQueryOptions<GetTeamData>): UseDataConnectQueryResult<GetTeamData, GetTeamVariables>;
export function useGetTeam(dc: DataConnect, vars: GetTeamVariables, options?: useDataConnectQueryOptions<GetTeamData>): UseDataConnectQueryResult<GetTeamData, GetTeamVariables>;

export function useCreateTeam(options?: useDataConnectMutationOptions<CreateTeamData, FirebaseError, CreateTeamVariables>): UseDataConnectMutationResult<CreateTeamData, CreateTeamVariables>;
export function useCreateTeam(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTeamData, FirebaseError, CreateTeamVariables>): UseDataConnectMutationResult<CreateTeamData, CreateTeamVariables>;

export function useUpdateTeam(options?: useDataConnectMutationOptions<UpdateTeamData, FirebaseError, UpdateTeamVariables>): UseDataConnectMutationResult<UpdateTeamData, UpdateTeamVariables>;
export function useUpdateTeam(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTeamData, FirebaseError, UpdateTeamVariables>): UseDataConnectMutationResult<UpdateTeamData, UpdateTeamVariables>;

export function useDeleteTeam(options?: useDataConnectMutationOptions<DeleteTeamData, FirebaseError, DeleteTeamVariables>): UseDataConnectMutationResult<DeleteTeamData, DeleteTeamVariables>;
export function useDeleteTeam(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTeamData, FirebaseError, DeleteTeamVariables>): UseDataConnectMutationResult<DeleteTeamData, DeleteTeamVariables>;

export function useAddTeamMember(options?: useDataConnectMutationOptions<AddTeamMemberData, FirebaseError, AddTeamMemberVariables>): UseDataConnectMutationResult<AddTeamMemberData, AddTeamMemberVariables>;
export function useAddTeamMember(dc: DataConnect, options?: useDataConnectMutationOptions<AddTeamMemberData, FirebaseError, AddTeamMemberVariables>): UseDataConnectMutationResult<AddTeamMemberData, AddTeamMemberVariables>;

export function useRemoveTeamMember(options?: useDataConnectMutationOptions<RemoveTeamMemberData, FirebaseError, RemoveTeamMemberVariables>): UseDataConnectMutationResult<RemoveTeamMemberData, RemoveTeamMemberVariables>;
export function useRemoveTeamMember(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveTeamMemberData, FirebaseError, RemoveTeamMemberVariables>): UseDataConnectMutationResult<RemoveTeamMemberData, RemoveTeamMemberVariables>;

export function useUpdateTeamMemberRole(options?: useDataConnectMutationOptions<UpdateTeamMemberRoleData, FirebaseError, UpdateTeamMemberRoleVariables>): UseDataConnectMutationResult<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
export function useUpdateTeamMemberRole(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTeamMemberRoleData, FirebaseError, UpdateTeamMemberRoleVariables>): UseDataConnectMutationResult<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;

export function useGetOrganization(vars: GetOrganizationVariables, options?: useDataConnectQueryOptions<GetOrganizationData>): UseDataConnectQueryResult<GetOrganizationData, GetOrganizationVariables>;
export function useGetOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: useDataConnectQueryOptions<GetOrganizationData>): UseDataConnectQueryResult<GetOrganizationData, GetOrganizationVariables>;

export function useCreateOrganization(options?: useDataConnectMutationOptions<CreateOrganizationData, FirebaseError, CreateOrganizationVariables>): UseDataConnectMutationResult<CreateOrganizationData, CreateOrganizationVariables>;
export function useCreateOrganization(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrganizationData, FirebaseError, CreateOrganizationVariables>): UseDataConnectMutationResult<CreateOrganizationData, CreateOrganizationVariables>;

export function useUpdateOrganization(options?: useDataConnectMutationOptions<UpdateOrganizationData, FirebaseError, UpdateOrganizationVariables>): UseDataConnectMutationResult<UpdateOrganizationData, UpdateOrganizationVariables>;
export function useUpdateOrganization(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrganizationData, FirebaseError, UpdateOrganizationVariables>): UseDataConnectMutationResult<UpdateOrganizationData, UpdateOrganizationVariables>;

export function useListPhaseTemplates(vars: ListPhaseTemplatesVariables, options?: useDataConnectQueryOptions<ListPhaseTemplatesData>): UseDataConnectQueryResult<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;
export function useListPhaseTemplates(dc: DataConnect, vars: ListPhaseTemplatesVariables, options?: useDataConnectQueryOptions<ListPhaseTemplatesData>): UseDataConnectQueryResult<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;

export function useGetPhaseTemplate(vars: GetPhaseTemplateVariables, options?: useDataConnectQueryOptions<GetPhaseTemplateData>): UseDataConnectQueryResult<GetPhaseTemplateData, GetPhaseTemplateVariables>;
export function useGetPhaseTemplate(dc: DataConnect, vars: GetPhaseTemplateVariables, options?: useDataConnectQueryOptions<GetPhaseTemplateData>): UseDataConnectQueryResult<GetPhaseTemplateData, GetPhaseTemplateVariables>;

export function useGetDefaultTemplates(vars: GetDefaultTemplatesVariables, options?: useDataConnectQueryOptions<GetDefaultTemplatesData>): UseDataConnectQueryResult<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;
export function useGetDefaultTemplates(dc: DataConnect, vars: GetDefaultTemplatesVariables, options?: useDataConnectQueryOptions<GetDefaultTemplatesData>): UseDataConnectQueryResult<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;

export function useCreatePhaseTemplate(options?: useDataConnectMutationOptions<CreatePhaseTemplateData, FirebaseError, CreatePhaseTemplateVariables>): UseDataConnectMutationResult<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;
export function useCreatePhaseTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePhaseTemplateData, FirebaseError, CreatePhaseTemplateVariables>): UseDataConnectMutationResult<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;

export function useUpdatePhaseTemplate(options?: useDataConnectMutationOptions<UpdatePhaseTemplateData, FirebaseError, UpdatePhaseTemplateVariables>): UseDataConnectMutationResult<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;
export function useUpdatePhaseTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePhaseTemplateData, FirebaseError, UpdatePhaseTemplateVariables>): UseDataConnectMutationResult<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;

export function useDeletePhaseTemplate(options?: useDataConnectMutationOptions<DeletePhaseTemplateData, FirebaseError, DeletePhaseTemplateVariables>): UseDataConnectMutationResult<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;
export function useDeletePhaseTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePhaseTemplateData, FirebaseError, DeletePhaseTemplateVariables>): UseDataConnectMutationResult<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;

export function useCreatePhaseTemplatePhase(options?: useDataConnectMutationOptions<CreatePhaseTemplatePhaseData, FirebaseError, CreatePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;
export function useCreatePhaseTemplatePhase(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePhaseTemplatePhaseData, FirebaseError, CreatePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;

export function useUpdatePhaseTemplatePhase(options?: useDataConnectMutationOptions<UpdatePhaseTemplatePhaseData, FirebaseError, UpdatePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;
export function useUpdatePhaseTemplatePhase(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePhaseTemplatePhaseData, FirebaseError, UpdatePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;

export function useDeletePhaseTemplatePhase(options?: useDataConnectMutationOptions<DeletePhaseTemplatePhaseData, FirebaseError, DeletePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;
export function useDeletePhaseTemplatePhase(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePhaseTemplatePhaseData, FirebaseError, DeletePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;
