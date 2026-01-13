import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export enum PhaseStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  BLOCKED = "BLOCKED",
};

export enum ProjectStatus {
  PLANNING = "PLANNING",
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
};

export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  MEMBER = "MEMBER",
  VIEWER = "VIEWER",
};



export interface AddTeamMemberData {
  teamMember_insert: TeamMember_Key;
}

export interface AddTeamMemberVariables {
  teamId: UUIDString;
  userId: UUIDString;
  role?: string | null;
}

export interface CreateOrganizationData {
  organization_insert: Organization_Key;
}

export interface CreateOrganizationVariables {
  name: string;
  fiscalYearStartMonth?: number | null;
}

export interface CreatePhaseTemplateData {
  phaseTemplate_insert: PhaseTemplate_Key;
}

export interface CreatePhaseTemplatePhaseData {
  phaseTemplatePhase_insert: PhaseTemplatePhase_Key;
}

export interface CreatePhaseTemplatePhaseVariables {
  templateId: UUIDString;
  name: string;
  description?: string | null;
  durationWeeks?: number | null;
  order: number;
}

export interface CreatePhaseTemplateVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
  isDefault?: boolean | null;
}

export interface CreatePortfolioData {
  portfolio_insert: Portfolio_Key;
}

export interface CreatePortfolioVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
  ownerId?: UUIDString | null;
}

export interface CreateProductTypeData {
  productType_insert: ProductType_Key;
}

export interface CreateProductTypePhaseConfigData {
  productTypePhaseConfig_insert: ProductTypePhaseConfig_Key;
}

export interface CreateProductTypePhaseConfigVariables {
  productTypeId: UUIDString;
  phaseTemplateId: UUIDString;
}

export interface CreateProductTypeVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
}

export interface CreateProgramData {
  program_insert: Program_Key;
}

export interface CreateProgramVariables {
  portfolioId: UUIDString;
  name: string;
  description?: string | null;
  ownerId?: UUIDString | null;
}

export interface CreateProjectAssignmentData {
  projectAssignment_insert: ProjectAssignment_Key;
}

export interface CreateProjectAssignmentVariables {
  projectId: UUIDString;
  userId: UUIDString;
  allocationPercent: number;
  startDate: DateString;
  endDate?: DateString | null;
  notes?: string | null;
}

export interface CreateProjectData {
  project_insert: Project_Key;
}

export interface CreateProjectPhaseData {
  projectPhase_insert: ProjectPhase_Key;
}

export interface CreateProjectPhaseVariables {
  projectId: UUIDString;
  name: string;
  description?: string | null;
  status?: PhaseStatus | null;
  startDate?: DateString | null;
  targetEndDate?: DateString | null;
  order: number;
  percentComplete?: number | null;
}

export interface CreateProjectVariables {
  programId: UUIDString;
  name: string;
  description?: string | null;
  status?: ProjectStatus | null;
  startDate?: DateString | null;
  targetCompletionDate?: DateString | null;
  ownerId?: UUIDString | null;
  productTypeId?: UUIDString | null;
}

export interface CreateTeamData {
  team_insert: Team_Key;
}

export interface CreateTeamVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
  parentTeamId?: UUIDString | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  organizationId: UUIDString;
  email: string;
  name: string;
  role?: UserRole | null;
  firebaseUid: string;
}

export interface DeletePhaseTemplateData {
  phaseTemplate_delete?: PhaseTemplate_Key | null;
}

export interface DeletePhaseTemplatePhaseData {
  phaseTemplatePhase_delete?: PhaseTemplatePhase_Key | null;
}

export interface DeletePhaseTemplatePhaseVariables {
  id: UUIDString;
}

export interface DeletePhaseTemplateVariables {
  id: UUIDString;
}

export interface DeletePortfolioData {
  portfolio_delete?: Portfolio_Key | null;
}

export interface DeletePortfolioVariables {
  id: UUIDString;
}

export interface DeleteProductTypeData {
  productType_delete?: ProductType_Key | null;
}

export interface DeleteProductTypePhaseConfigData {
  productTypePhaseConfig_delete?: ProductTypePhaseConfig_Key | null;
}

export interface DeleteProductTypePhaseConfigVariables {
  id: UUIDString;
}

export interface DeleteProductTypeVariables {
  id: UUIDString;
}

export interface DeleteProgramData {
  program_delete?: Program_Key | null;
}

export interface DeleteProgramVariables {
  id: UUIDString;
}

export interface DeleteProjectAssignmentData {
  projectAssignment_delete?: ProjectAssignment_Key | null;
}

export interface DeleteProjectAssignmentVariables {
  id: UUIDString;
}

export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}

export interface DeleteProjectPhaseData {
  projectPhase_delete?: ProjectPhase_Key | null;
}

export interface DeleteProjectPhaseVariables {
  id: UUIDString;
}

export interface DeleteProjectVariables {
  id: UUIDString;
}

export interface DeleteTeamData {
  team_delete?: Team_Key | null;
}

export interface DeleteTeamVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface DeleteUserVariables {
  id: UUIDString;
}

export interface GetDefaultTemplatesData {
  phaseTemplates: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & PhaseTemplate_Key)[];
}

export interface GetDefaultTemplatesVariables {
  organizationId: UUIDString;
}

export interface GetOrganizationData {
  organization?: {
    id: UUIDString;
    name: string;
    fiscalYearStartMonth: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organization_Key;
}

export interface GetOrganizationVariables {
  id: UUIDString;
}

export interface GetPhaseTemplateData {
  phaseTemplate?: {
    id: UUIDString;
    organizationId: UUIDString;
    name: string;
    description?: string | null;
    isDefault: boolean;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & PhaseTemplate_Key;
}

export interface GetPhaseTemplateVariables {
  id: UUIDString;
}

export interface GetPortfolioData {
  portfolio?: {
    id: UUIDString;
    organizationId: UUIDString;
    name: string;
    description?: string | null;
    ownerId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    owner?: {
      id: UUIDString;
      name: string;
      email: string;
      role: UserRole;
    } & User_Key;
  } & Portfolio_Key;
}

export interface GetPortfolioVariables {
  id: UUIDString;
}

export interface GetProductTypeData {
  productType?: {
    id: UUIDString;
    organizationId: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ProductType_Key;
}

export interface GetProductTypeVariables {
  id: UUIDString;
}

export interface GetProgramData {
  program?: {
    id: UUIDString;
    portfolioId: UUIDString;
    name: string;
    description?: string | null;
    ownerId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    owner?: {
      id: UUIDString;
      name: string;
      email: string;
      role: UserRole;
    } & User_Key;
      portfolio: {
        id: UUIDString;
        name: string;
        organizationId: UUIDString;
      } & Portfolio_Key;
  } & Program_Key;
}

export interface GetProgramVariables {
  id: UUIDString;
}

export interface GetProjectData {
  project?: {
    id: UUIDString;
    programId: UUIDString;
    productTypeId?: UUIDString | null;
    name: string;
    description?: string | null;
    status: ProjectStatus;
    startDate?: DateString | null;
    targetCompletionDate?: DateString | null;
    actualCompletionDate?: DateString | null;
    ownerId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    owner?: {
      id: UUIDString;
      name: string;
      email: string;
      role: UserRole;
    } & User_Key;
      program: {
        id: UUIDString;
        name: string;
        portfolioId: UUIDString;
        portfolio: {
          id: UUIDString;
          name: string;
          organizationId: UUIDString;
        } & Portfolio_Key;
      } & Program_Key;
        productType?: {
          id: UUIDString;
          name: string;
          description?: string | null;
        } & ProductType_Key;
  } & Project_Key;
}

export interface GetProjectPhaseData {
  projectPhase?: {
    id: UUIDString;
    projectId: UUIDString;
    name: string;
    description?: string | null;
    status: PhaseStatus;
    startDate?: DateString | null;
    targetEndDate?: DateString | null;
    actualEndDate?: DateString | null;
    order: number;
    percentComplete?: number | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    project: {
      id: UUIDString;
      name: string;
      status: ProjectStatus;
    } & Project_Key;
  } & ProjectPhase_Key;
}

export interface GetProjectPhaseVariables {
  id: UUIDString;
}

export interface GetProjectVariables {
  id: UUIDString;
}

export interface GetTeamData {
  team?: {
    id: UUIDString;
    organizationId: UUIDString;
    parentTeamId?: UUIDString | null;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    parentTeam?: {
      id: UUIDString;
      name: string;
    } & Team_Key;
  } & Team_Key;
}

export interface GetTeamVariables {
  id: UUIDString;
}

export interface GetUserByEmailData {
  users: ({
    id: UUIDString;
    organizationId: UUIDString;
    name: string;
    email: string;
    role: UserRole;
    firebaseUid: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & User_Key)[];
}

export interface GetUserByEmailVariables {
  email: string;
}

export interface GetUserByFirebaseUidData {
  users: ({
    id: UUIDString;
    organizationId: UUIDString;
    name: string;
    email: string;
    role: UserRole;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & User_Key)[];
}

export interface GetUserByFirebaseUidVariables {
  firebaseUid: string;
}

export interface GetUserData {
  user?: {
    id: UUIDString;
    organizationId: UUIDString;
    name: string;
    email: string;
    role: UserRole;
    firebaseUid: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & User_Key;
}

export interface GetUserVariables {
  id: UUIDString;
}

export interface ListAssignmentsByDateRangeData {
  projectAssignments: ({
    id: UUIDString;
    projectId: UUIDString;
    allocationPercent: number;
    startDate: DateString;
    endDate?: DateString | null;
    notes?: string | null;
    project: {
      id: UUIDString;
      name: string;
      status: ProjectStatus;
    } & Project_Key;
  } & ProjectAssignment_Key)[];
}

export interface ListAssignmentsByDateRangeVariables {
  userId: UUIDString;
  startDate: DateString;
  endDate: DateString;
}

export interface ListPhaseTemplatesData {
  phaseTemplates: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    isDefault: boolean;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & PhaseTemplate_Key)[];
}

export interface ListPhaseTemplatesVariables {
  organizationId: UUIDString;
}

export interface ListPortfoliosData {
  portfolios: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    ownerId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    owner?: {
      id: UUIDString;
      name: string;
      email: string;
    } & User_Key;
  } & Portfolio_Key)[];
}

export interface ListPortfoliosVariables {
  organizationId: UUIDString;
}

export interface ListProductTypesData {
  productTypes: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ProductType_Key)[];
}

export interface ListProductTypesVariables {
  organizationId: UUIDString;
}

export interface ListProgramsData {
  programs: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    ownerId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    owner?: {
      id: UUIDString;
      name: string;
      email: string;
    } & User_Key;
  } & Program_Key)[];
}

export interface ListProgramsVariables {
  portfolioId: UUIDString;
}

export interface ListProjectAssignmentsData {
  projectAssignments: ({
    id: UUIDString;
    userId: UUIDString;
    allocationPercent: number;
    startDate: DateString;
    endDate?: DateString | null;
    notes?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    user: {
      id: UUIDString;
      name: string;
      email: string;
      role: UserRole;
    } & User_Key;
  } & ProjectAssignment_Key)[];
}

export interface ListProjectAssignmentsVariables {
  projectId: UUIDString;
}

export interface ListProjectPhasesData {
  projectPhases: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    status: PhaseStatus;
    startDate?: DateString | null;
    targetEndDate?: DateString | null;
    actualEndDate?: DateString | null;
    order: number;
    percentComplete?: number | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ProjectPhase_Key)[];
}

export interface ListProjectPhasesVariables {
  projectId: UUIDString;
}

export interface ListProjectsByStatusData {
  projects: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    status: ProjectStatus;
    startDate?: DateString | null;
    targetCompletionDate?: DateString | null;
    programId: UUIDString;
    program: {
      id: UUIDString;
      name: string;
      portfolio: {
        id: UUIDString;
        name: string;
      } & Portfolio_Key;
    } & Program_Key;
  } & Project_Key)[];
}

export interface ListProjectsByStatusVariables {
  status: ProjectStatus;
}

export interface ListProjectsData {
  projects: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    status: ProjectStatus;
    startDate?: DateString | null;
    targetCompletionDate?: DateString | null;
    actualCompletionDate?: DateString | null;
    ownerId?: UUIDString | null;
    productTypeId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    owner?: {
      id: UUIDString;
      name: string;
      email: string;
    } & User_Key;
      productType?: {
        id: UUIDString;
        name: string;
      } & ProductType_Key;
  } & Project_Key)[];
}

export interface ListProjectsVariables {
  programId: UUIDString;
}

export interface ListTeamsData {
  teams: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    parentTeamId?: UUIDString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Team_Key)[];
}

export interface ListTeamsVariables {
  organizationId: UUIDString;
}

export interface ListUserAssignmentsData {
  projectAssignments: ({
    id: UUIDString;
    projectId: UUIDString;
    allocationPercent: number;
    startDate: DateString;
    endDate?: DateString | null;
    notes?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    project: {
      id: UUIDString;
      name: string;
      status: ProjectStatus;
      program: {
        id: UUIDString;
        name: string;
        portfolio: {
          id: UUIDString;
          name: string;
        } & Portfolio_Key;
      } & Program_Key;
    } & Project_Key;
  } & ProjectAssignment_Key)[];
}

export interface ListUserAssignmentsVariables {
  userId: UUIDString;
}

export interface ListUsersData {
  users: ({
    id: UUIDString;
    name: string;
    email: string;
    role: UserRole;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & User_Key)[];
}

export interface ListUsersVariables {
  organizationId: UUIDString;
}

export interface Organization_Key {
  id: UUIDString;
  __typename?: 'Organization_Key';
}

export interface PhaseTemplatePhase_Key {
  id: UUIDString;
  __typename?: 'PhaseTemplatePhase_Key';
}

export interface PhaseTemplate_Key {
  id: UUIDString;
  __typename?: 'PhaseTemplate_Key';
}

export interface Portfolio_Key {
  id: UUIDString;
  __typename?: 'Portfolio_Key';
}

export interface ProductTypePhaseConfig_Key {
  id: UUIDString;
  __typename?: 'ProductTypePhaseConfig_Key';
}

export interface ProductType_Key {
  id: UUIDString;
  __typename?: 'ProductType_Key';
}

export interface Program_Key {
  id: UUIDString;
  __typename?: 'Program_Key';
}

export interface ProjectAssignment_Key {
  id: UUIDString;
  __typename?: 'ProjectAssignment_Key';
}

export interface ProjectPhase_Key {
  id: UUIDString;
  __typename?: 'ProjectPhase_Key';
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface RemoveTeamMemberData {
  teamMember_delete?: TeamMember_Key | null;
}

export interface RemoveTeamMemberVariables {
  id: UUIDString;
}

export interface TeamMember_Key {
  id: UUIDString;
  __typename?: 'TeamMember_Key';
}

export interface Team_Key {
  id: UUIDString;
  __typename?: 'Team_Key';
}

export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
}

export interface UpdateOrganizationVariables {
  id: UUIDString;
  name?: string | null;
  fiscalYearStartMonth?: number | null;
}

export interface UpdatePhaseTemplateData {
  phaseTemplate_update?: PhaseTemplate_Key | null;
}

export interface UpdatePhaseTemplatePhaseData {
  phaseTemplatePhase_update?: PhaseTemplatePhase_Key | null;
}

export interface UpdatePhaseTemplatePhaseVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  durationWeeks?: number | null;
  order?: number | null;
}

export interface UpdatePhaseTemplateVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  isDefault?: boolean | null;
}

export interface UpdatePortfolioData {
  portfolio_update?: Portfolio_Key | null;
}

export interface UpdatePortfolioVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  ownerId?: UUIDString | null;
}

export interface UpdateProductTypeData {
  productType_update?: ProductType_Key | null;
}

export interface UpdateProductTypeVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}

export interface UpdateProgramData {
  program_update?: Program_Key | null;
}

export interface UpdateProgramVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  ownerId?: UUIDString | null;
}

export interface UpdateProjectAssignmentData {
  projectAssignment_update?: ProjectAssignment_Key | null;
}

export interface UpdateProjectAssignmentVariables {
  id: UUIDString;
  allocationPercent?: number | null;
  startDate?: DateString | null;
  endDate?: DateString | null;
  notes?: string | null;
}

export interface UpdateProjectData {
  project_update?: Project_Key | null;
}

export interface UpdateProjectPhaseData {
  projectPhase_update?: ProjectPhase_Key | null;
}

export interface UpdateProjectPhaseVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  status?: PhaseStatus | null;
  startDate?: DateString | null;
  targetEndDate?: DateString | null;
  actualEndDate?: DateString | null;
  percentComplete?: number | null;
}

export interface UpdateProjectVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  status?: ProjectStatus | null;
  startDate?: DateString | null;
  targetCompletionDate?: DateString | null;
  actualCompletionDate?: DateString | null;
  ownerId?: UUIDString | null;
  productTypeId?: UUIDString | null;
}

export interface UpdateTeamData {
  team_update?: Team_Key | null;
}

export interface UpdateTeamMemberRoleData {
  teamMember_update?: TeamMember_Key | null;
}

export interface UpdateTeamMemberRoleVariables {
  id: UUIDString;
  role?: string | null;
}

export interface UpdateTeamVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  parentTeamId?: UUIDString | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  id: UUIDString;
  name?: string | null;
  role?: UserRole | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListPortfoliosRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPortfoliosVariables): QueryRef<ListPortfoliosData, ListPortfoliosVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListPortfoliosVariables): QueryRef<ListPortfoliosData, ListPortfoliosVariables>;
  operationName: string;
}
export const listPortfoliosRef: ListPortfoliosRef;

export function listPortfolios(vars: ListPortfoliosVariables): QueryPromise<ListPortfoliosData, ListPortfoliosVariables>;
export function listPortfolios(dc: DataConnect, vars: ListPortfoliosVariables): QueryPromise<ListPortfoliosData, ListPortfoliosVariables>;

interface GetPortfolioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPortfolioVariables): QueryRef<GetPortfolioData, GetPortfolioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPortfolioVariables): QueryRef<GetPortfolioData, GetPortfolioVariables>;
  operationName: string;
}
export const getPortfolioRef: GetPortfolioRef;

export function getPortfolio(vars: GetPortfolioVariables): QueryPromise<GetPortfolioData, GetPortfolioVariables>;
export function getPortfolio(dc: DataConnect, vars: GetPortfolioVariables): QueryPromise<GetPortfolioData, GetPortfolioVariables>;

interface CreatePortfolioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePortfolioVariables): MutationRef<CreatePortfolioData, CreatePortfolioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePortfolioVariables): MutationRef<CreatePortfolioData, CreatePortfolioVariables>;
  operationName: string;
}
export const createPortfolioRef: CreatePortfolioRef;

export function createPortfolio(vars: CreatePortfolioVariables): MutationPromise<CreatePortfolioData, CreatePortfolioVariables>;
export function createPortfolio(dc: DataConnect, vars: CreatePortfolioVariables): MutationPromise<CreatePortfolioData, CreatePortfolioVariables>;

interface UpdatePortfolioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePortfolioVariables): MutationRef<UpdatePortfolioData, UpdatePortfolioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePortfolioVariables): MutationRef<UpdatePortfolioData, UpdatePortfolioVariables>;
  operationName: string;
}
export const updatePortfolioRef: UpdatePortfolioRef;

export function updatePortfolio(vars: UpdatePortfolioVariables): MutationPromise<UpdatePortfolioData, UpdatePortfolioVariables>;
export function updatePortfolio(dc: DataConnect, vars: UpdatePortfolioVariables): MutationPromise<UpdatePortfolioData, UpdatePortfolioVariables>;

interface DeletePortfolioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePortfolioVariables): MutationRef<DeletePortfolioData, DeletePortfolioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePortfolioVariables): MutationRef<DeletePortfolioData, DeletePortfolioVariables>;
  operationName: string;
}
export const deletePortfolioRef: DeletePortfolioRef;

export function deletePortfolio(vars: DeletePortfolioVariables): MutationPromise<DeletePortfolioData, DeletePortfolioVariables>;
export function deletePortfolio(dc: DataConnect, vars: DeletePortfolioVariables): MutationPromise<DeletePortfolioData, DeletePortfolioVariables>;

interface ListProjectAssignmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectAssignmentsVariables): QueryRef<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProjectAssignmentsVariables): QueryRef<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;
  operationName: string;
}
export const listProjectAssignmentsRef: ListProjectAssignmentsRef;

export function listProjectAssignments(vars: ListProjectAssignmentsVariables): QueryPromise<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;
export function listProjectAssignments(dc: DataConnect, vars: ListProjectAssignmentsVariables): QueryPromise<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;

interface ListUserAssignmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserAssignmentsVariables): QueryRef<ListUserAssignmentsData, ListUserAssignmentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUserAssignmentsVariables): QueryRef<ListUserAssignmentsData, ListUserAssignmentsVariables>;
  operationName: string;
}
export const listUserAssignmentsRef: ListUserAssignmentsRef;

export function listUserAssignments(vars: ListUserAssignmentsVariables): QueryPromise<ListUserAssignmentsData, ListUserAssignmentsVariables>;
export function listUserAssignments(dc: DataConnect, vars: ListUserAssignmentsVariables): QueryPromise<ListUserAssignmentsData, ListUserAssignmentsVariables>;

interface ListAssignmentsByDateRangeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAssignmentsByDateRangeVariables): QueryRef<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListAssignmentsByDateRangeVariables): QueryRef<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;
  operationName: string;
}
export const listAssignmentsByDateRangeRef: ListAssignmentsByDateRangeRef;

export function listAssignmentsByDateRange(vars: ListAssignmentsByDateRangeVariables): QueryPromise<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;
export function listAssignmentsByDateRange(dc: DataConnect, vars: ListAssignmentsByDateRangeVariables): QueryPromise<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;

interface CreateProjectAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectAssignmentVariables): MutationRef<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectAssignmentVariables): MutationRef<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;
  operationName: string;
}
export const createProjectAssignmentRef: CreateProjectAssignmentRef;

export function createProjectAssignment(vars: CreateProjectAssignmentVariables): MutationPromise<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;
export function createProjectAssignment(dc: DataConnect, vars: CreateProjectAssignmentVariables): MutationPromise<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;

interface UpdateProjectAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectAssignmentVariables): MutationRef<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectAssignmentVariables): MutationRef<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;
  operationName: string;
}
export const updateProjectAssignmentRef: UpdateProjectAssignmentRef;

export function updateProjectAssignment(vars: UpdateProjectAssignmentVariables): MutationPromise<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;
export function updateProjectAssignment(dc: DataConnect, vars: UpdateProjectAssignmentVariables): MutationPromise<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;

interface DeleteProjectAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectAssignmentVariables): MutationRef<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectAssignmentVariables): MutationRef<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;
  operationName: string;
}
export const deleteProjectAssignmentRef: DeleteProjectAssignmentRef;

export function deleteProjectAssignment(vars: DeleteProjectAssignmentVariables): MutationPromise<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;
export function deleteProjectAssignment(dc: DataConnect, vars: DeleteProjectAssignmentVariables): MutationPromise<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;

interface ListProjectPhasesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectPhasesVariables): QueryRef<ListProjectPhasesData, ListProjectPhasesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProjectPhasesVariables): QueryRef<ListProjectPhasesData, ListProjectPhasesVariables>;
  operationName: string;
}
export const listProjectPhasesRef: ListProjectPhasesRef;

export function listProjectPhases(vars: ListProjectPhasesVariables): QueryPromise<ListProjectPhasesData, ListProjectPhasesVariables>;
export function listProjectPhases(dc: DataConnect, vars: ListProjectPhasesVariables): QueryPromise<ListProjectPhasesData, ListProjectPhasesVariables>;

interface GetProjectPhaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectPhaseVariables): QueryRef<GetProjectPhaseData, GetProjectPhaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectPhaseVariables): QueryRef<GetProjectPhaseData, GetProjectPhaseVariables>;
  operationName: string;
}
export const getProjectPhaseRef: GetProjectPhaseRef;

export function getProjectPhase(vars: GetProjectPhaseVariables): QueryPromise<GetProjectPhaseData, GetProjectPhaseVariables>;
export function getProjectPhase(dc: DataConnect, vars: GetProjectPhaseVariables): QueryPromise<GetProjectPhaseData, GetProjectPhaseVariables>;

interface CreateProjectPhaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectPhaseVariables): MutationRef<CreateProjectPhaseData, CreateProjectPhaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectPhaseVariables): MutationRef<CreateProjectPhaseData, CreateProjectPhaseVariables>;
  operationName: string;
}
export const createProjectPhaseRef: CreateProjectPhaseRef;

export function createProjectPhase(vars: CreateProjectPhaseVariables): MutationPromise<CreateProjectPhaseData, CreateProjectPhaseVariables>;
export function createProjectPhase(dc: DataConnect, vars: CreateProjectPhaseVariables): MutationPromise<CreateProjectPhaseData, CreateProjectPhaseVariables>;

interface UpdateProjectPhaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectPhaseVariables): MutationRef<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectPhaseVariables): MutationRef<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;
  operationName: string;
}
export const updateProjectPhaseRef: UpdateProjectPhaseRef;

export function updateProjectPhase(vars: UpdateProjectPhaseVariables): MutationPromise<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;
export function updateProjectPhase(dc: DataConnect, vars: UpdateProjectPhaseVariables): MutationPromise<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;

interface DeleteProjectPhaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectPhaseVariables): MutationRef<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectPhaseVariables): MutationRef<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;
  operationName: string;
}
export const deleteProjectPhaseRef: DeleteProjectPhaseRef;

export function deleteProjectPhase(vars: DeleteProjectPhaseVariables): MutationPromise<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;
export function deleteProjectPhase(dc: DataConnect, vars: DeleteProjectPhaseVariables): MutationPromise<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUsersVariables): QueryRef<ListUsersData, ListUsersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUsersVariables): QueryRef<ListUsersData, ListUsersVariables>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(vars: ListUsersVariables): QueryPromise<ListUsersData, ListUsersVariables>;
export function listUsers(dc: DataConnect, vars: ListUsersVariables): QueryPromise<ListUsersData, ListUsersVariables>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;
export function getUser(dc: DataConnect, vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserByEmailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
  operationName: string;
}
export const getUserByEmailRef: GetUserByEmailRef;

export function getUserByEmail(vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;
export function getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByFirebaseUidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByFirebaseUidVariables): QueryRef<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByFirebaseUidVariables): QueryRef<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;
  operationName: string;
}
export const getUserByFirebaseUidRef: GetUserByFirebaseUidRef;

export function getUserByFirebaseUid(vars: GetUserByFirebaseUidVariables): QueryPromise<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;
export function getUserByFirebaseUid(dc: DataConnect, vars: GetUserByFirebaseUidVariables): QueryPromise<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;
export function deleteUser(dc: DataConnect, vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;

interface ListProductTypesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProductTypesVariables): QueryRef<ListProductTypesData, ListProductTypesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProductTypesVariables): QueryRef<ListProductTypesData, ListProductTypesVariables>;
  operationName: string;
}
export const listProductTypesRef: ListProductTypesRef;

export function listProductTypes(vars: ListProductTypesVariables): QueryPromise<ListProductTypesData, ListProductTypesVariables>;
export function listProductTypes(dc: DataConnect, vars: ListProductTypesVariables): QueryPromise<ListProductTypesData, ListProductTypesVariables>;

interface GetProductTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductTypeVariables): QueryRef<GetProductTypeData, GetProductTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProductTypeVariables): QueryRef<GetProductTypeData, GetProductTypeVariables>;
  operationName: string;
}
export const getProductTypeRef: GetProductTypeRef;

export function getProductType(vars: GetProductTypeVariables): QueryPromise<GetProductTypeData, GetProductTypeVariables>;
export function getProductType(dc: DataConnect, vars: GetProductTypeVariables): QueryPromise<GetProductTypeData, GetProductTypeVariables>;

interface CreateProductTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProductTypeVariables): MutationRef<CreateProductTypeData, CreateProductTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProductTypeVariables): MutationRef<CreateProductTypeData, CreateProductTypeVariables>;
  operationName: string;
}
export const createProductTypeRef: CreateProductTypeRef;

export function createProductType(vars: CreateProductTypeVariables): MutationPromise<CreateProductTypeData, CreateProductTypeVariables>;
export function createProductType(dc: DataConnect, vars: CreateProductTypeVariables): MutationPromise<CreateProductTypeData, CreateProductTypeVariables>;

interface UpdateProductTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductTypeVariables): MutationRef<UpdateProductTypeData, UpdateProductTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProductTypeVariables): MutationRef<UpdateProductTypeData, UpdateProductTypeVariables>;
  operationName: string;
}
export const updateProductTypeRef: UpdateProductTypeRef;

export function updateProductType(vars: UpdateProductTypeVariables): MutationPromise<UpdateProductTypeData, UpdateProductTypeVariables>;
export function updateProductType(dc: DataConnect, vars: UpdateProductTypeVariables): MutationPromise<UpdateProductTypeData, UpdateProductTypeVariables>;

interface DeleteProductTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProductTypeVariables): MutationRef<DeleteProductTypeData, DeleteProductTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProductTypeVariables): MutationRef<DeleteProductTypeData, DeleteProductTypeVariables>;
  operationName: string;
}
export const deleteProductTypeRef: DeleteProductTypeRef;

export function deleteProductType(vars: DeleteProductTypeVariables): MutationPromise<DeleteProductTypeData, DeleteProductTypeVariables>;
export function deleteProductType(dc: DataConnect, vars: DeleteProductTypeVariables): MutationPromise<DeleteProductTypeData, DeleteProductTypeVariables>;

interface CreateProductTypePhaseConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProductTypePhaseConfigVariables): MutationRef<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProductTypePhaseConfigVariables): MutationRef<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;
  operationName: string;
}
export const createProductTypePhaseConfigRef: CreateProductTypePhaseConfigRef;

export function createProductTypePhaseConfig(vars: CreateProductTypePhaseConfigVariables): MutationPromise<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;
export function createProductTypePhaseConfig(dc: DataConnect, vars: CreateProductTypePhaseConfigVariables): MutationPromise<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;

interface DeleteProductTypePhaseConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProductTypePhaseConfigVariables): MutationRef<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProductTypePhaseConfigVariables): MutationRef<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;
  operationName: string;
}
export const deleteProductTypePhaseConfigRef: DeleteProductTypePhaseConfigRef;

export function deleteProductTypePhaseConfig(vars: DeleteProductTypePhaseConfigVariables): MutationPromise<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;
export function deleteProductTypePhaseConfig(dc: DataConnect, vars: DeleteProductTypePhaseConfigVariables): MutationPromise<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;

interface ListProgramsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProgramsVariables): QueryRef<ListProgramsData, ListProgramsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProgramsVariables): QueryRef<ListProgramsData, ListProgramsVariables>;
  operationName: string;
}
export const listProgramsRef: ListProgramsRef;

export function listPrograms(vars: ListProgramsVariables): QueryPromise<ListProgramsData, ListProgramsVariables>;
export function listPrograms(dc: DataConnect, vars: ListProgramsVariables): QueryPromise<ListProgramsData, ListProgramsVariables>;

interface GetProgramRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProgramVariables): QueryRef<GetProgramData, GetProgramVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProgramVariables): QueryRef<GetProgramData, GetProgramVariables>;
  operationName: string;
}
export const getProgramRef: GetProgramRef;

export function getProgram(vars: GetProgramVariables): QueryPromise<GetProgramData, GetProgramVariables>;
export function getProgram(dc: DataConnect, vars: GetProgramVariables): QueryPromise<GetProgramData, GetProgramVariables>;

interface CreateProgramRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProgramVariables): MutationRef<CreateProgramData, CreateProgramVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProgramVariables): MutationRef<CreateProgramData, CreateProgramVariables>;
  operationName: string;
}
export const createProgramRef: CreateProgramRef;

export function createProgram(vars: CreateProgramVariables): MutationPromise<CreateProgramData, CreateProgramVariables>;
export function createProgram(dc: DataConnect, vars: CreateProgramVariables): MutationPromise<CreateProgramData, CreateProgramVariables>;

interface UpdateProgramRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProgramVariables): MutationRef<UpdateProgramData, UpdateProgramVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProgramVariables): MutationRef<UpdateProgramData, UpdateProgramVariables>;
  operationName: string;
}
export const updateProgramRef: UpdateProgramRef;

export function updateProgram(vars: UpdateProgramVariables): MutationPromise<UpdateProgramData, UpdateProgramVariables>;
export function updateProgram(dc: DataConnect, vars: UpdateProgramVariables): MutationPromise<UpdateProgramData, UpdateProgramVariables>;

interface DeleteProgramRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProgramVariables): MutationRef<DeleteProgramData, DeleteProgramVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProgramVariables): MutationRef<DeleteProgramData, DeleteProgramVariables>;
  operationName: string;
}
export const deleteProgramRef: DeleteProgramRef;

export function deleteProgram(vars: DeleteProgramVariables): MutationPromise<DeleteProgramData, DeleteProgramVariables>;
export function deleteProgram(dc: DataConnect, vars: DeleteProgramVariables): MutationPromise<DeleteProgramData, DeleteProgramVariables>;

interface ListProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsVariables): QueryRef<ListProjectsData, ListProjectsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProjectsVariables): QueryRef<ListProjectsData, ListProjectsVariables>;
  operationName: string;
}
export const listProjectsRef: ListProjectsRef;

export function listProjects(vars: ListProjectsVariables): QueryPromise<ListProjectsData, ListProjectsVariables>;
export function listProjects(dc: DataConnect, vars: ListProjectsVariables): QueryPromise<ListProjectsData, ListProjectsVariables>;

interface GetProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
  operationName: string;
}
export const getProjectRef: GetProjectRef;

export function getProject(vars: GetProjectVariables): QueryPromise<GetProjectData, GetProjectVariables>;
export function getProject(dc: DataConnect, vars: GetProjectVariables): QueryPromise<GetProjectData, GetProjectVariables>;

interface ListProjectsByStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsByStatusVariables): QueryRef<ListProjectsByStatusData, ListProjectsByStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProjectsByStatusVariables): QueryRef<ListProjectsByStatusData, ListProjectsByStatusVariables>;
  operationName: string;
}
export const listProjectsByStatusRef: ListProjectsByStatusRef;

export function listProjectsByStatus(vars: ListProjectsByStatusVariables): QueryPromise<ListProjectsByStatusData, ListProjectsByStatusVariables>;
export function listProjectsByStatus(dc: DataConnect, vars: ListProjectsByStatusVariables): QueryPromise<ListProjectsByStatusData, ListProjectsByStatusVariables>;

interface CreateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  operationName: string;
}
export const createProjectRef: CreateProjectRef;

export function createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;
export function createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface UpdateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  operationName: string;
}
export const updateProjectRef: UpdateProjectRef;

export function updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;
export function updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface DeleteProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  operationName: string;
}
export const deleteProjectRef: DeleteProjectRef;

export function deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface ListTeamsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTeamsVariables): QueryRef<ListTeamsData, ListTeamsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTeamsVariables): QueryRef<ListTeamsData, ListTeamsVariables>;
  operationName: string;
}
export const listTeamsRef: ListTeamsRef;

export function listTeams(vars: ListTeamsVariables): QueryPromise<ListTeamsData, ListTeamsVariables>;
export function listTeams(dc: DataConnect, vars: ListTeamsVariables): QueryPromise<ListTeamsData, ListTeamsVariables>;

interface GetTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeamVariables): QueryRef<GetTeamData, GetTeamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTeamVariables): QueryRef<GetTeamData, GetTeamVariables>;
  operationName: string;
}
export const getTeamRef: GetTeamRef;

export function getTeam(vars: GetTeamVariables): QueryPromise<GetTeamData, GetTeamVariables>;
export function getTeam(dc: DataConnect, vars: GetTeamVariables): QueryPromise<GetTeamData, GetTeamVariables>;

interface CreateTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTeamVariables): MutationRef<CreateTeamData, CreateTeamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTeamVariables): MutationRef<CreateTeamData, CreateTeamVariables>;
  operationName: string;
}
export const createTeamRef: CreateTeamRef;

export function createTeam(vars: CreateTeamVariables): MutationPromise<CreateTeamData, CreateTeamVariables>;
export function createTeam(dc: DataConnect, vars: CreateTeamVariables): MutationPromise<CreateTeamData, CreateTeamVariables>;

interface UpdateTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeamVariables): MutationRef<UpdateTeamData, UpdateTeamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTeamVariables): MutationRef<UpdateTeamData, UpdateTeamVariables>;
  operationName: string;
}
export const updateTeamRef: UpdateTeamRef;

export function updateTeam(vars: UpdateTeamVariables): MutationPromise<UpdateTeamData, UpdateTeamVariables>;
export function updateTeam(dc: DataConnect, vars: UpdateTeamVariables): MutationPromise<UpdateTeamData, UpdateTeamVariables>;

interface DeleteTeamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTeamVariables): MutationRef<DeleteTeamData, DeleteTeamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTeamVariables): MutationRef<DeleteTeamData, DeleteTeamVariables>;
  operationName: string;
}
export const deleteTeamRef: DeleteTeamRef;

export function deleteTeam(vars: DeleteTeamVariables): MutationPromise<DeleteTeamData, DeleteTeamVariables>;
export function deleteTeam(dc: DataConnect, vars: DeleteTeamVariables): MutationPromise<DeleteTeamData, DeleteTeamVariables>;

interface AddTeamMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTeamMemberVariables): MutationRef<AddTeamMemberData, AddTeamMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddTeamMemberVariables): MutationRef<AddTeamMemberData, AddTeamMemberVariables>;
  operationName: string;
}
export const addTeamMemberRef: AddTeamMemberRef;

export function addTeamMember(vars: AddTeamMemberVariables): MutationPromise<AddTeamMemberData, AddTeamMemberVariables>;
export function addTeamMember(dc: DataConnect, vars: AddTeamMemberVariables): MutationPromise<AddTeamMemberData, AddTeamMemberVariables>;

interface RemoveTeamMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveTeamMemberVariables): MutationRef<RemoveTeamMemberData, RemoveTeamMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveTeamMemberVariables): MutationRef<RemoveTeamMemberData, RemoveTeamMemberVariables>;
  operationName: string;
}
export const removeTeamMemberRef: RemoveTeamMemberRef;

export function removeTeamMember(vars: RemoveTeamMemberVariables): MutationPromise<RemoveTeamMemberData, RemoveTeamMemberVariables>;
export function removeTeamMember(dc: DataConnect, vars: RemoveTeamMemberVariables): MutationPromise<RemoveTeamMemberData, RemoveTeamMemberVariables>;

interface UpdateTeamMemberRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeamMemberRoleVariables): MutationRef<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTeamMemberRoleVariables): MutationRef<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
  operationName: string;
}
export const updateTeamMemberRoleRef: UpdateTeamMemberRoleRef;

export function updateTeamMemberRole(vars: UpdateTeamMemberRoleVariables): MutationPromise<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
export function updateTeamMemberRole(dc: DataConnect, vars: UpdateTeamMemberRoleVariables): MutationPromise<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;

interface GetOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
  operationName: string;
}
export const getOrganizationRef: GetOrganizationRef;

export function getOrganization(vars: GetOrganizationVariables): QueryPromise<GetOrganizationData, GetOrganizationVariables>;
export function getOrganization(dc: DataConnect, vars: GetOrganizationVariables): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface CreateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
  operationName: string;
}
export const createOrganizationRef: CreateOrganizationRef;

export function createOrganization(vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;
export function createOrganization(dc: DataConnect, vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface UpdateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
  operationName: string;
}
export const updateOrganizationRef: UpdateOrganizationRef;

export function updateOrganization(vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;
export function updateOrganization(dc: DataConnect, vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface ListPhaseTemplatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPhaseTemplatesVariables): QueryRef<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListPhaseTemplatesVariables): QueryRef<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;
  operationName: string;
}
export const listPhaseTemplatesRef: ListPhaseTemplatesRef;

export function listPhaseTemplates(vars: ListPhaseTemplatesVariables): QueryPromise<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;
export function listPhaseTemplates(dc: DataConnect, vars: ListPhaseTemplatesVariables): QueryPromise<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;

interface GetPhaseTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPhaseTemplateVariables): QueryRef<GetPhaseTemplateData, GetPhaseTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPhaseTemplateVariables): QueryRef<GetPhaseTemplateData, GetPhaseTemplateVariables>;
  operationName: string;
}
export const getPhaseTemplateRef: GetPhaseTemplateRef;

export function getPhaseTemplate(vars: GetPhaseTemplateVariables): QueryPromise<GetPhaseTemplateData, GetPhaseTemplateVariables>;
export function getPhaseTemplate(dc: DataConnect, vars: GetPhaseTemplateVariables): QueryPromise<GetPhaseTemplateData, GetPhaseTemplateVariables>;

interface GetDefaultTemplatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDefaultTemplatesVariables): QueryRef<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDefaultTemplatesVariables): QueryRef<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;
  operationName: string;
}
export const getDefaultTemplatesRef: GetDefaultTemplatesRef;

export function getDefaultTemplates(vars: GetDefaultTemplatesVariables): QueryPromise<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;
export function getDefaultTemplates(dc: DataConnect, vars: GetDefaultTemplatesVariables): QueryPromise<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;

interface CreatePhaseTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePhaseTemplateVariables): MutationRef<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePhaseTemplateVariables): MutationRef<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;
  operationName: string;
}
export const createPhaseTemplateRef: CreatePhaseTemplateRef;

export function createPhaseTemplate(vars: CreatePhaseTemplateVariables): MutationPromise<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;
export function createPhaseTemplate(dc: DataConnect, vars: CreatePhaseTemplateVariables): MutationPromise<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;

interface UpdatePhaseTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePhaseTemplateVariables): MutationRef<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePhaseTemplateVariables): MutationRef<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;
  operationName: string;
}
export const updatePhaseTemplateRef: UpdatePhaseTemplateRef;

export function updatePhaseTemplate(vars: UpdatePhaseTemplateVariables): MutationPromise<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;
export function updatePhaseTemplate(dc: DataConnect, vars: UpdatePhaseTemplateVariables): MutationPromise<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;

interface DeletePhaseTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePhaseTemplateVariables): MutationRef<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePhaseTemplateVariables): MutationRef<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;
  operationName: string;
}
export const deletePhaseTemplateRef: DeletePhaseTemplateRef;

export function deletePhaseTemplate(vars: DeletePhaseTemplateVariables): MutationPromise<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;
export function deletePhaseTemplate(dc: DataConnect, vars: DeletePhaseTemplateVariables): MutationPromise<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;

interface CreatePhaseTemplatePhaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePhaseTemplatePhaseVariables): MutationRef<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePhaseTemplatePhaseVariables): MutationRef<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;
  operationName: string;
}
export const createPhaseTemplatePhaseRef: CreatePhaseTemplatePhaseRef;

export function createPhaseTemplatePhase(vars: CreatePhaseTemplatePhaseVariables): MutationPromise<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;
export function createPhaseTemplatePhase(dc: DataConnect, vars: CreatePhaseTemplatePhaseVariables): MutationPromise<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;

interface UpdatePhaseTemplatePhaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePhaseTemplatePhaseVariables): MutationRef<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePhaseTemplatePhaseVariables): MutationRef<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;
  operationName: string;
}
export const updatePhaseTemplatePhaseRef: UpdatePhaseTemplatePhaseRef;

export function updatePhaseTemplatePhase(vars: UpdatePhaseTemplatePhaseVariables): MutationPromise<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;
export function updatePhaseTemplatePhase(dc: DataConnect, vars: UpdatePhaseTemplatePhaseVariables): MutationPromise<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;

interface DeletePhaseTemplatePhaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePhaseTemplatePhaseVariables): MutationRef<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePhaseTemplatePhaseVariables): MutationRef<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;
  operationName: string;
}
export const deletePhaseTemplatePhaseRef: DeletePhaseTemplatePhaseRef;

export function deletePhaseTemplatePhase(vars: DeletePhaseTemplatePhaseVariables): MutationPromise<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;
export function deletePhaseTemplatePhase(dc: DataConnect, vars: DeletePhaseTemplatePhaseVariables): MutationPromise<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;

