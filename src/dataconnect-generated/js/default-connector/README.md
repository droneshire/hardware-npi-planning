# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`default-connector/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListPortfolios*](#listportfolios)
  - [*GetPortfolio*](#getportfolio)
  - [*ListProjectAssignments*](#listprojectassignments)
  - [*ListUserAssignments*](#listuserassignments)
  - [*ListAssignmentsByDateRange*](#listassignmentsbydaterange)
  - [*ListProjectPhases*](#listprojectphases)
  - [*GetProjectPhase*](#getprojectphase)
  - [*ListUsers*](#listusers)
  - [*GetUser*](#getuser)
  - [*GetUserByEmail*](#getuserbyemail)
  - [*GetUserByFirebaseUid*](#getuserbyfirebaseuid)
  - [*ListProductTypes*](#listproducttypes)
  - [*GetProductType*](#getproducttype)
  - [*ListPrograms*](#listprograms)
  - [*GetProgram*](#getprogram)
  - [*ListProjects*](#listprojects)
  - [*GetProject*](#getproject)
  - [*ListProjectsByStatus*](#listprojectsbystatus)
  - [*ListTeams*](#listteams)
  - [*GetTeam*](#getteam)
  - [*GetOrganization*](#getorganization)
  - [*ListPhaseTemplates*](#listphasetemplates)
  - [*GetPhaseTemplate*](#getphasetemplate)
  - [*GetDefaultTemplates*](#getdefaulttemplates)
- [**Mutations**](#mutations)
  - [*CreatePortfolio*](#createportfolio)
  - [*UpdatePortfolio*](#updateportfolio)
  - [*DeletePortfolio*](#deleteportfolio)
  - [*CreateProjectAssignment*](#createprojectassignment)
  - [*UpdateProjectAssignment*](#updateprojectassignment)
  - [*DeleteProjectAssignment*](#deleteprojectassignment)
  - [*CreateProjectPhase*](#createprojectphase)
  - [*UpdateProjectPhase*](#updateprojectphase)
  - [*DeleteProjectPhase*](#deleteprojectphase)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateProductType*](#createproducttype)
  - [*UpdateProductType*](#updateproducttype)
  - [*DeleteProductType*](#deleteproducttype)
  - [*CreateProductTypePhaseConfig*](#createproducttypephaseconfig)
  - [*DeleteProductTypePhaseConfig*](#deleteproducttypephaseconfig)
  - [*CreateProgram*](#createprogram)
  - [*UpdateProgram*](#updateprogram)
  - [*DeleteProgram*](#deleteprogram)
  - [*CreateProject*](#createproject)
  - [*UpdateProject*](#updateproject)
  - [*DeleteProject*](#deleteproject)
  - [*CreateTeam*](#createteam)
  - [*UpdateTeam*](#updateteam)
  - [*DeleteTeam*](#deleteteam)
  - [*AddTeamMember*](#addteammember)
  - [*RemoveTeamMember*](#removeteammember)
  - [*UpdateTeamMemberRole*](#updateteammemberrole)
  - [*CreateOrganization*](#createorganization)
  - [*UpdateOrganization*](#updateorganization)
  - [*CreatePhaseTemplate*](#createphasetemplate)
  - [*UpdatePhaseTemplate*](#updatephasetemplate)
  - [*DeletePhaseTemplate*](#deletephasetemplate)
  - [*CreatePhaseTemplatePhase*](#createphasetemplatephase)
  - [*UpdatePhaseTemplatePhase*](#updatephasetemplatephase)
  - [*DeletePhaseTemplatePhase*](#deletephasetemplatephase)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListPortfolios
You can execute the `ListPortfolios` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listPortfolios(vars: ListPortfoliosVariables): QueryPromise<ListPortfoliosData, ListPortfoliosVariables>;

interface ListPortfoliosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPortfoliosVariables): QueryRef<ListPortfoliosData, ListPortfoliosVariables>;
}
export const listPortfoliosRef: ListPortfoliosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPortfolios(dc: DataConnect, vars: ListPortfoliosVariables): QueryPromise<ListPortfoliosData, ListPortfoliosVariables>;

interface ListPortfoliosRef {
  ...
  (dc: DataConnect, vars: ListPortfoliosVariables): QueryRef<ListPortfoliosData, ListPortfoliosVariables>;
}
export const listPortfoliosRef: ListPortfoliosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPortfoliosRef:
```typescript
const name = listPortfoliosRef.operationName;
console.log(name);
```

### Variables
The `ListPortfolios` query requires an argument of type `ListPortfoliosVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListPortfoliosVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListPortfolios` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPortfoliosData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListPortfolios`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPortfolios, ListPortfoliosVariables } from '@firebasegen/default-connector';

// The `ListPortfolios` query requires an argument of type `ListPortfoliosVariables`:
const listPortfoliosVars: ListPortfoliosVariables = {
  organizationId: ..., 
};

// Call the `listPortfolios()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPortfolios(listPortfoliosVars);
// Variables can be defined inline as well.
const { data } = await listPortfolios({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPortfolios(dataConnect, listPortfoliosVars);

console.log(data.portfolios);

// Or, you can use the `Promise` API.
listPortfolios(listPortfoliosVars).then((response) => {
  const data = response.data;
  console.log(data.portfolios);
});
```

### Using `ListPortfolios`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPortfoliosRef, ListPortfoliosVariables } from '@firebasegen/default-connector';

// The `ListPortfolios` query requires an argument of type `ListPortfoliosVariables`:
const listPortfoliosVars: ListPortfoliosVariables = {
  organizationId: ..., 
};

// Call the `listPortfoliosRef()` function to get a reference to the query.
const ref = listPortfoliosRef(listPortfoliosVars);
// Variables can be defined inline as well.
const ref = listPortfoliosRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPortfoliosRef(dataConnect, listPortfoliosVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.portfolios);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.portfolios);
});
```

## GetPortfolio
You can execute the `GetPortfolio` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getPortfolio(vars: GetPortfolioVariables): QueryPromise<GetPortfolioData, GetPortfolioVariables>;

interface GetPortfolioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPortfolioVariables): QueryRef<GetPortfolioData, GetPortfolioVariables>;
}
export const getPortfolioRef: GetPortfolioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPortfolio(dc: DataConnect, vars: GetPortfolioVariables): QueryPromise<GetPortfolioData, GetPortfolioVariables>;

interface GetPortfolioRef {
  ...
  (dc: DataConnect, vars: GetPortfolioVariables): QueryRef<GetPortfolioData, GetPortfolioVariables>;
}
export const getPortfolioRef: GetPortfolioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPortfolioRef:
```typescript
const name = getPortfolioRef.operationName;
console.log(name);
```

### Variables
The `GetPortfolio` query requires an argument of type `GetPortfolioVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPortfolioVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPortfolio` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPortfolioData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPortfolio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPortfolio, GetPortfolioVariables } from '@firebasegen/default-connector';

// The `GetPortfolio` query requires an argument of type `GetPortfolioVariables`:
const getPortfolioVars: GetPortfolioVariables = {
  id: ..., 
};

// Call the `getPortfolio()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPortfolio(getPortfolioVars);
// Variables can be defined inline as well.
const { data } = await getPortfolio({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPortfolio(dataConnect, getPortfolioVars);

console.log(data.portfolio);

// Or, you can use the `Promise` API.
getPortfolio(getPortfolioVars).then((response) => {
  const data = response.data;
  console.log(data.portfolio);
});
```

### Using `GetPortfolio`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPortfolioRef, GetPortfolioVariables } from '@firebasegen/default-connector';

// The `GetPortfolio` query requires an argument of type `GetPortfolioVariables`:
const getPortfolioVars: GetPortfolioVariables = {
  id: ..., 
};

// Call the `getPortfolioRef()` function to get a reference to the query.
const ref = getPortfolioRef(getPortfolioVars);
// Variables can be defined inline as well.
const ref = getPortfolioRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPortfolioRef(dataConnect, getPortfolioVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.portfolio);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.portfolio);
});
```

## ListProjectAssignments
You can execute the `ListProjectAssignments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listProjectAssignments(vars: ListProjectAssignmentsVariables): QueryPromise<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;

interface ListProjectAssignmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectAssignmentsVariables): QueryRef<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;
}
export const listProjectAssignmentsRef: ListProjectAssignmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectAssignments(dc: DataConnect, vars: ListProjectAssignmentsVariables): QueryPromise<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;

interface ListProjectAssignmentsRef {
  ...
  (dc: DataConnect, vars: ListProjectAssignmentsVariables): QueryRef<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;
}
export const listProjectAssignmentsRef: ListProjectAssignmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectAssignmentsRef:
```typescript
const name = listProjectAssignmentsRef.operationName;
console.log(name);
```

### Variables
The `ListProjectAssignments` query requires an argument of type `ListProjectAssignmentsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectAssignmentsVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `ListProjectAssignments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectAssignmentsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListProjectAssignments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectAssignments, ListProjectAssignmentsVariables } from '@firebasegen/default-connector';

// The `ListProjectAssignments` query requires an argument of type `ListProjectAssignmentsVariables`:
const listProjectAssignmentsVars: ListProjectAssignmentsVariables = {
  projectId: ..., 
};

// Call the `listProjectAssignments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectAssignments(listProjectAssignmentsVars);
// Variables can be defined inline as well.
const { data } = await listProjectAssignments({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectAssignments(dataConnect, listProjectAssignmentsVars);

console.log(data.projectAssignments);

// Or, you can use the `Promise` API.
listProjectAssignments(listProjectAssignmentsVars).then((response) => {
  const data = response.data;
  console.log(data.projectAssignments);
});
```

### Using `ListProjectAssignments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectAssignmentsRef, ListProjectAssignmentsVariables } from '@firebasegen/default-connector';

// The `ListProjectAssignments` query requires an argument of type `ListProjectAssignmentsVariables`:
const listProjectAssignmentsVars: ListProjectAssignmentsVariables = {
  projectId: ..., 
};

// Call the `listProjectAssignmentsRef()` function to get a reference to the query.
const ref = listProjectAssignmentsRef(listProjectAssignmentsVars);
// Variables can be defined inline as well.
const ref = listProjectAssignmentsRef({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectAssignmentsRef(dataConnect, listProjectAssignmentsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projectAssignments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projectAssignments);
});
```

## ListUserAssignments
You can execute the `ListUserAssignments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listUserAssignments(vars: ListUserAssignmentsVariables): QueryPromise<ListUserAssignmentsData, ListUserAssignmentsVariables>;

interface ListUserAssignmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserAssignmentsVariables): QueryRef<ListUserAssignmentsData, ListUserAssignmentsVariables>;
}
export const listUserAssignmentsRef: ListUserAssignmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserAssignments(dc: DataConnect, vars: ListUserAssignmentsVariables): QueryPromise<ListUserAssignmentsData, ListUserAssignmentsVariables>;

interface ListUserAssignmentsRef {
  ...
  (dc: DataConnect, vars: ListUserAssignmentsVariables): QueryRef<ListUserAssignmentsData, ListUserAssignmentsVariables>;
}
export const listUserAssignmentsRef: ListUserAssignmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserAssignmentsRef:
```typescript
const name = listUserAssignmentsRef.operationName;
console.log(name);
```

### Variables
The `ListUserAssignments` query requires an argument of type `ListUserAssignmentsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUserAssignmentsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `ListUserAssignments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserAssignmentsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListUserAssignments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserAssignments, ListUserAssignmentsVariables } from '@firebasegen/default-connector';

// The `ListUserAssignments` query requires an argument of type `ListUserAssignmentsVariables`:
const listUserAssignmentsVars: ListUserAssignmentsVariables = {
  userId: ..., 
};

// Call the `listUserAssignments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserAssignments(listUserAssignmentsVars);
// Variables can be defined inline as well.
const { data } = await listUserAssignments({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserAssignments(dataConnect, listUserAssignmentsVars);

console.log(data.projectAssignments);

// Or, you can use the `Promise` API.
listUserAssignments(listUserAssignmentsVars).then((response) => {
  const data = response.data;
  console.log(data.projectAssignments);
});
```

### Using `ListUserAssignments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserAssignmentsRef, ListUserAssignmentsVariables } from '@firebasegen/default-connector';

// The `ListUserAssignments` query requires an argument of type `ListUserAssignmentsVariables`:
const listUserAssignmentsVars: ListUserAssignmentsVariables = {
  userId: ..., 
};

// Call the `listUserAssignmentsRef()` function to get a reference to the query.
const ref = listUserAssignmentsRef(listUserAssignmentsVars);
// Variables can be defined inline as well.
const ref = listUserAssignmentsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserAssignmentsRef(dataConnect, listUserAssignmentsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projectAssignments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projectAssignments);
});
```

## ListAssignmentsByDateRange
You can execute the `ListAssignmentsByDateRange` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listAssignmentsByDateRange(vars: ListAssignmentsByDateRangeVariables): QueryPromise<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;

interface ListAssignmentsByDateRangeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAssignmentsByDateRangeVariables): QueryRef<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;
}
export const listAssignmentsByDateRangeRef: ListAssignmentsByDateRangeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAssignmentsByDateRange(dc: DataConnect, vars: ListAssignmentsByDateRangeVariables): QueryPromise<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;

interface ListAssignmentsByDateRangeRef {
  ...
  (dc: DataConnect, vars: ListAssignmentsByDateRangeVariables): QueryRef<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;
}
export const listAssignmentsByDateRangeRef: ListAssignmentsByDateRangeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAssignmentsByDateRangeRef:
```typescript
const name = listAssignmentsByDateRangeRef.operationName;
console.log(name);
```

### Variables
The `ListAssignmentsByDateRange` query requires an argument of type `ListAssignmentsByDateRangeVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAssignmentsByDateRangeVariables {
  userId: UUIDString;
  startDate: DateString;
  endDate: DateString;
}
```
### Return Type
Recall that executing the `ListAssignmentsByDateRange` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAssignmentsByDateRangeData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAssignmentsByDateRange`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAssignmentsByDateRange, ListAssignmentsByDateRangeVariables } from '@firebasegen/default-connector';

// The `ListAssignmentsByDateRange` query requires an argument of type `ListAssignmentsByDateRangeVariables`:
const listAssignmentsByDateRangeVars: ListAssignmentsByDateRangeVariables = {
  userId: ..., 
  startDate: ..., 
  endDate: ..., 
};

// Call the `listAssignmentsByDateRange()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAssignmentsByDateRange(listAssignmentsByDateRangeVars);
// Variables can be defined inline as well.
const { data } = await listAssignmentsByDateRange({ userId: ..., startDate: ..., endDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAssignmentsByDateRange(dataConnect, listAssignmentsByDateRangeVars);

console.log(data.projectAssignments);

// Or, you can use the `Promise` API.
listAssignmentsByDateRange(listAssignmentsByDateRangeVars).then((response) => {
  const data = response.data;
  console.log(data.projectAssignments);
});
```

### Using `ListAssignmentsByDateRange`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAssignmentsByDateRangeRef, ListAssignmentsByDateRangeVariables } from '@firebasegen/default-connector';

// The `ListAssignmentsByDateRange` query requires an argument of type `ListAssignmentsByDateRangeVariables`:
const listAssignmentsByDateRangeVars: ListAssignmentsByDateRangeVariables = {
  userId: ..., 
  startDate: ..., 
  endDate: ..., 
};

// Call the `listAssignmentsByDateRangeRef()` function to get a reference to the query.
const ref = listAssignmentsByDateRangeRef(listAssignmentsByDateRangeVars);
// Variables can be defined inline as well.
const ref = listAssignmentsByDateRangeRef({ userId: ..., startDate: ..., endDate: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAssignmentsByDateRangeRef(dataConnect, listAssignmentsByDateRangeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projectAssignments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projectAssignments);
});
```

## ListProjectPhases
You can execute the `ListProjectPhases` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listProjectPhases(vars: ListProjectPhasesVariables): QueryPromise<ListProjectPhasesData, ListProjectPhasesVariables>;

interface ListProjectPhasesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectPhasesVariables): QueryRef<ListProjectPhasesData, ListProjectPhasesVariables>;
}
export const listProjectPhasesRef: ListProjectPhasesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectPhases(dc: DataConnect, vars: ListProjectPhasesVariables): QueryPromise<ListProjectPhasesData, ListProjectPhasesVariables>;

interface ListProjectPhasesRef {
  ...
  (dc: DataConnect, vars: ListProjectPhasesVariables): QueryRef<ListProjectPhasesData, ListProjectPhasesVariables>;
}
export const listProjectPhasesRef: ListProjectPhasesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectPhasesRef:
```typescript
const name = listProjectPhasesRef.operationName;
console.log(name);
```

### Variables
The `ListProjectPhases` query requires an argument of type `ListProjectPhasesVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectPhasesVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `ListProjectPhases` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectPhasesData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListProjectPhases`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectPhases, ListProjectPhasesVariables } from '@firebasegen/default-connector';

// The `ListProjectPhases` query requires an argument of type `ListProjectPhasesVariables`:
const listProjectPhasesVars: ListProjectPhasesVariables = {
  projectId: ..., 
};

// Call the `listProjectPhases()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectPhases(listProjectPhasesVars);
// Variables can be defined inline as well.
const { data } = await listProjectPhases({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectPhases(dataConnect, listProjectPhasesVars);

console.log(data.projectPhases);

// Or, you can use the `Promise` API.
listProjectPhases(listProjectPhasesVars).then((response) => {
  const data = response.data;
  console.log(data.projectPhases);
});
```

### Using `ListProjectPhases`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectPhasesRef, ListProjectPhasesVariables } from '@firebasegen/default-connector';

// The `ListProjectPhases` query requires an argument of type `ListProjectPhasesVariables`:
const listProjectPhasesVars: ListProjectPhasesVariables = {
  projectId: ..., 
};

// Call the `listProjectPhasesRef()` function to get a reference to the query.
const ref = listProjectPhasesRef(listProjectPhasesVars);
// Variables can be defined inline as well.
const ref = listProjectPhasesRef({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectPhasesRef(dataConnect, listProjectPhasesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projectPhases);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projectPhases);
});
```

## GetProjectPhase
You can execute the `GetProjectPhase` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getProjectPhase(vars: GetProjectPhaseVariables): QueryPromise<GetProjectPhaseData, GetProjectPhaseVariables>;

interface GetProjectPhaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectPhaseVariables): QueryRef<GetProjectPhaseData, GetProjectPhaseVariables>;
}
export const getProjectPhaseRef: GetProjectPhaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProjectPhase(dc: DataConnect, vars: GetProjectPhaseVariables): QueryPromise<GetProjectPhaseData, GetProjectPhaseVariables>;

interface GetProjectPhaseRef {
  ...
  (dc: DataConnect, vars: GetProjectPhaseVariables): QueryRef<GetProjectPhaseData, GetProjectPhaseVariables>;
}
export const getProjectPhaseRef: GetProjectPhaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProjectPhaseRef:
```typescript
const name = getProjectPhaseRef.operationName;
console.log(name);
```

### Variables
The `GetProjectPhase` query requires an argument of type `GetProjectPhaseVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProjectPhaseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProjectPhase` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProjectPhaseData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetProjectPhase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProjectPhase, GetProjectPhaseVariables } from '@firebasegen/default-connector';

// The `GetProjectPhase` query requires an argument of type `GetProjectPhaseVariables`:
const getProjectPhaseVars: GetProjectPhaseVariables = {
  id: ..., 
};

// Call the `getProjectPhase()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProjectPhase(getProjectPhaseVars);
// Variables can be defined inline as well.
const { data } = await getProjectPhase({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProjectPhase(dataConnect, getProjectPhaseVars);

console.log(data.projectPhase);

// Or, you can use the `Promise` API.
getProjectPhase(getProjectPhaseVars).then((response) => {
  const data = response.data;
  console.log(data.projectPhase);
});
```

### Using `GetProjectPhase`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProjectPhaseRef, GetProjectPhaseVariables } from '@firebasegen/default-connector';

// The `GetProjectPhase` query requires an argument of type `GetProjectPhaseVariables`:
const getProjectPhaseVars: GetProjectPhaseVariables = {
  id: ..., 
};

// Call the `getProjectPhaseRef()` function to get a reference to the query.
const ref = getProjectPhaseRef(getProjectPhaseVars);
// Variables can be defined inline as well.
const ref = getProjectPhaseRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProjectPhaseRef(dataConnect, getProjectPhaseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projectPhase);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projectPhase);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listUsers(vars: ListUsersVariables): QueryPromise<ListUsersData, ListUsersVariables>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUsersVariables): QueryRef<ListUsersData, ListUsersVariables>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, vars: ListUsersVariables): QueryPromise<ListUsersData, ListUsersVariables>;

interface ListUsersRef {
  ...
  (dc: DataConnect, vars: ListUsersVariables): QueryRef<ListUsersData, ListUsersVariables>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query requires an argument of type `ListUsersVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUsersVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers, ListUsersVariables } from '@firebasegen/default-connector';

// The `ListUsers` query requires an argument of type `ListUsersVariables`:
const listUsersVars: ListUsersVariables = {
  organizationId: ..., 
};

// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers(listUsersVars);
// Variables can be defined inline as well.
const { data } = await listUsers({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect, listUsersVars);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers(listUsersVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef, ListUsersVariables } from '@firebasegen/default-connector';

// The `ListUsers` query requires an argument of type `ListUsersVariables`:
const listUsersVars: ListUsersVariables = {
  organizationId: ..., 
};

// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef(listUsersVars);
// Variables can be defined inline as well.
const ref = listUsersRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect, listUsersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getUser(vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query requires an argument of type `GetUserVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser, GetUserVariables } from '@firebasegen/default-connector';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser(getUserVars);
// Variables can be defined inline as well.
const { data } = await getUser({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect, getUserVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser(getUserVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef, GetUserVariables } from '@firebasegen/default-connector';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef(getUserVars);
// Variables can be defined inline as well.
const ref = getUserRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect, getUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetUserByEmail
You can execute the `GetUserByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getUserByEmail(vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  (dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByEmailRef:
```typescript
const name = getUserByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetUserByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByEmailData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserByEmail, GetUserByEmailVariables } from '@firebasegen/default-connector';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserByEmail(getUserByEmailVars);
// Variables can be defined inline as well.
const { data } = await getUserByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserByEmail(dataConnect, getUserByEmailVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserByEmail(getUserByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByEmailRef, GetUserByEmailVariables } from '@firebasegen/default-connector';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmailRef()` function to get a reference to the query.
const ref = getUserByEmailRef(getUserByEmailVars);
// Variables can be defined inline as well.
const ref = getUserByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByEmailRef(dataConnect, getUserByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetUserByFirebaseUid
You can execute the `GetUserByFirebaseUid` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getUserByFirebaseUid(vars: GetUserByFirebaseUidVariables): QueryPromise<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;

interface GetUserByFirebaseUidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByFirebaseUidVariables): QueryRef<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;
}
export const getUserByFirebaseUidRef: GetUserByFirebaseUidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserByFirebaseUid(dc: DataConnect, vars: GetUserByFirebaseUidVariables): QueryPromise<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;

interface GetUserByFirebaseUidRef {
  ...
  (dc: DataConnect, vars: GetUserByFirebaseUidVariables): QueryRef<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;
}
export const getUserByFirebaseUidRef: GetUserByFirebaseUidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByFirebaseUidRef:
```typescript
const name = getUserByFirebaseUidRef.operationName;
console.log(name);
```

### Variables
The `GetUserByFirebaseUid` query requires an argument of type `GetUserByFirebaseUidVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByFirebaseUidVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that executing the `GetUserByFirebaseUid` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByFirebaseUidData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserByFirebaseUid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserByFirebaseUid, GetUserByFirebaseUidVariables } from '@firebasegen/default-connector';

// The `GetUserByFirebaseUid` query requires an argument of type `GetUserByFirebaseUidVariables`:
const getUserByFirebaseUidVars: GetUserByFirebaseUidVariables = {
  firebaseUid: ..., 
};

// Call the `getUserByFirebaseUid()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserByFirebaseUid(getUserByFirebaseUidVars);
// Variables can be defined inline as well.
const { data } = await getUserByFirebaseUid({ firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserByFirebaseUid(dataConnect, getUserByFirebaseUidVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserByFirebaseUid(getUserByFirebaseUidVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserByFirebaseUid`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByFirebaseUidRef, GetUserByFirebaseUidVariables } from '@firebasegen/default-connector';

// The `GetUserByFirebaseUid` query requires an argument of type `GetUserByFirebaseUidVariables`:
const getUserByFirebaseUidVars: GetUserByFirebaseUidVariables = {
  firebaseUid: ..., 
};

// Call the `getUserByFirebaseUidRef()` function to get a reference to the query.
const ref = getUserByFirebaseUidRef(getUserByFirebaseUidVars);
// Variables can be defined inline as well.
const ref = getUserByFirebaseUidRef({ firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByFirebaseUidRef(dataConnect, getUserByFirebaseUidVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListProductTypes
You can execute the `ListProductTypes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listProductTypes(vars: ListProductTypesVariables): QueryPromise<ListProductTypesData, ListProductTypesVariables>;

interface ListProductTypesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProductTypesVariables): QueryRef<ListProductTypesData, ListProductTypesVariables>;
}
export const listProductTypesRef: ListProductTypesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProductTypes(dc: DataConnect, vars: ListProductTypesVariables): QueryPromise<ListProductTypesData, ListProductTypesVariables>;

interface ListProductTypesRef {
  ...
  (dc: DataConnect, vars: ListProductTypesVariables): QueryRef<ListProductTypesData, ListProductTypesVariables>;
}
export const listProductTypesRef: ListProductTypesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProductTypesRef:
```typescript
const name = listProductTypesRef.operationName;
console.log(name);
```

### Variables
The `ListProductTypes` query requires an argument of type `ListProductTypesVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProductTypesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListProductTypes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProductTypesData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProductTypesData {
  productTypes: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & ProductType_Key)[];
}
```
### Using `ListProductTypes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProductTypes, ListProductTypesVariables } from '@firebasegen/default-connector';

// The `ListProductTypes` query requires an argument of type `ListProductTypesVariables`:
const listProductTypesVars: ListProductTypesVariables = {
  organizationId: ..., 
};

// Call the `listProductTypes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProductTypes(listProductTypesVars);
// Variables can be defined inline as well.
const { data } = await listProductTypes({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProductTypes(dataConnect, listProductTypesVars);

console.log(data.productTypes);

// Or, you can use the `Promise` API.
listProductTypes(listProductTypesVars).then((response) => {
  const data = response.data;
  console.log(data.productTypes);
});
```

### Using `ListProductTypes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProductTypesRef, ListProductTypesVariables } from '@firebasegen/default-connector';

// The `ListProductTypes` query requires an argument of type `ListProductTypesVariables`:
const listProductTypesVars: ListProductTypesVariables = {
  organizationId: ..., 
};

// Call the `listProductTypesRef()` function to get a reference to the query.
const ref = listProductTypesRef(listProductTypesVars);
// Variables can be defined inline as well.
const ref = listProductTypesRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProductTypesRef(dataConnect, listProductTypesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.productTypes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.productTypes);
});
```

## GetProductType
You can execute the `GetProductType` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getProductType(vars: GetProductTypeVariables): QueryPromise<GetProductTypeData, GetProductTypeVariables>;

interface GetProductTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductTypeVariables): QueryRef<GetProductTypeData, GetProductTypeVariables>;
}
export const getProductTypeRef: GetProductTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProductType(dc: DataConnect, vars: GetProductTypeVariables): QueryPromise<GetProductTypeData, GetProductTypeVariables>;

interface GetProductTypeRef {
  ...
  (dc: DataConnect, vars: GetProductTypeVariables): QueryRef<GetProductTypeData, GetProductTypeVariables>;
}
export const getProductTypeRef: GetProductTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProductTypeRef:
```typescript
const name = getProductTypeRef.operationName;
console.log(name);
```

### Variables
The `GetProductType` query requires an argument of type `GetProductTypeVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProductTypeVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProductType` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProductTypeData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetProductType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProductType, GetProductTypeVariables } from '@firebasegen/default-connector';

// The `GetProductType` query requires an argument of type `GetProductTypeVariables`:
const getProductTypeVars: GetProductTypeVariables = {
  id: ..., 
};

// Call the `getProductType()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProductType(getProductTypeVars);
// Variables can be defined inline as well.
const { data } = await getProductType({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProductType(dataConnect, getProductTypeVars);

console.log(data.productType);

// Or, you can use the `Promise` API.
getProductType(getProductTypeVars).then((response) => {
  const data = response.data;
  console.log(data.productType);
});
```

### Using `GetProductType`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProductTypeRef, GetProductTypeVariables } from '@firebasegen/default-connector';

// The `GetProductType` query requires an argument of type `GetProductTypeVariables`:
const getProductTypeVars: GetProductTypeVariables = {
  id: ..., 
};

// Call the `getProductTypeRef()` function to get a reference to the query.
const ref = getProductTypeRef(getProductTypeVars);
// Variables can be defined inline as well.
const ref = getProductTypeRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProductTypeRef(dataConnect, getProductTypeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.productType);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.productType);
});
```

## ListPrograms
You can execute the `ListPrograms` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listPrograms(vars: ListProgramsVariables): QueryPromise<ListProgramsData, ListProgramsVariables>;

interface ListProgramsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProgramsVariables): QueryRef<ListProgramsData, ListProgramsVariables>;
}
export const listProgramsRef: ListProgramsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPrograms(dc: DataConnect, vars: ListProgramsVariables): QueryPromise<ListProgramsData, ListProgramsVariables>;

interface ListProgramsRef {
  ...
  (dc: DataConnect, vars: ListProgramsVariables): QueryRef<ListProgramsData, ListProgramsVariables>;
}
export const listProgramsRef: ListProgramsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProgramsRef:
```typescript
const name = listProgramsRef.operationName;
console.log(name);
```

### Variables
The `ListPrograms` query requires an argument of type `ListProgramsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProgramsVariables {
  portfolioId: UUIDString;
}
```
### Return Type
Recall that executing the `ListPrograms` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProgramsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListPrograms`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPrograms, ListProgramsVariables } from '@firebasegen/default-connector';

// The `ListPrograms` query requires an argument of type `ListProgramsVariables`:
const listProgramsVars: ListProgramsVariables = {
  portfolioId: ..., 
};

// Call the `listPrograms()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPrograms(listProgramsVars);
// Variables can be defined inline as well.
const { data } = await listPrograms({ portfolioId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPrograms(dataConnect, listProgramsVars);

console.log(data.programs);

// Or, you can use the `Promise` API.
listPrograms(listProgramsVars).then((response) => {
  const data = response.data;
  console.log(data.programs);
});
```

### Using `ListPrograms`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProgramsRef, ListProgramsVariables } from '@firebasegen/default-connector';

// The `ListPrograms` query requires an argument of type `ListProgramsVariables`:
const listProgramsVars: ListProgramsVariables = {
  portfolioId: ..., 
};

// Call the `listProgramsRef()` function to get a reference to the query.
const ref = listProgramsRef(listProgramsVars);
// Variables can be defined inline as well.
const ref = listProgramsRef({ portfolioId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProgramsRef(dataConnect, listProgramsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.programs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.programs);
});
```

## GetProgram
You can execute the `GetProgram` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getProgram(vars: GetProgramVariables): QueryPromise<GetProgramData, GetProgramVariables>;

interface GetProgramRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProgramVariables): QueryRef<GetProgramData, GetProgramVariables>;
}
export const getProgramRef: GetProgramRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProgram(dc: DataConnect, vars: GetProgramVariables): QueryPromise<GetProgramData, GetProgramVariables>;

interface GetProgramRef {
  ...
  (dc: DataConnect, vars: GetProgramVariables): QueryRef<GetProgramData, GetProgramVariables>;
}
export const getProgramRef: GetProgramRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProgramRef:
```typescript
const name = getProgramRef.operationName;
console.log(name);
```

### Variables
The `GetProgram` query requires an argument of type `GetProgramVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProgramVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProgram` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProgramData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetProgram`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProgram, GetProgramVariables } from '@firebasegen/default-connector';

// The `GetProgram` query requires an argument of type `GetProgramVariables`:
const getProgramVars: GetProgramVariables = {
  id: ..., 
};

// Call the `getProgram()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProgram(getProgramVars);
// Variables can be defined inline as well.
const { data } = await getProgram({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProgram(dataConnect, getProgramVars);

console.log(data.program);

// Or, you can use the `Promise` API.
getProgram(getProgramVars).then((response) => {
  const data = response.data;
  console.log(data.program);
});
```

### Using `GetProgram`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProgramRef, GetProgramVariables } from '@firebasegen/default-connector';

// The `GetProgram` query requires an argument of type `GetProgramVariables`:
const getProgramVars: GetProgramVariables = {
  id: ..., 
};

// Call the `getProgramRef()` function to get a reference to the query.
const ref = getProgramRef(getProgramVars);
// Variables can be defined inline as well.
const ref = getProgramRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProgramRef(dataConnect, getProgramVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.program);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.program);
});
```

## ListProjects
You can execute the `ListProjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listProjects(vars: ListProjectsVariables): QueryPromise<ListProjectsData, ListProjectsVariables>;

interface ListProjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsVariables): QueryRef<ListProjectsData, ListProjectsVariables>;
}
export const listProjectsRef: ListProjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjects(dc: DataConnect, vars: ListProjectsVariables): QueryPromise<ListProjectsData, ListProjectsVariables>;

interface ListProjectsRef {
  ...
  (dc: DataConnect, vars: ListProjectsVariables): QueryRef<ListProjectsData, ListProjectsVariables>;
}
export const listProjectsRef: ListProjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectsRef:
```typescript
const name = listProjectsRef.operationName;
console.log(name);
```

### Variables
The `ListProjects` query requires an argument of type `ListProjectsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectsVariables {
  programId: UUIDString;
}
```
### Return Type
Recall that executing the `ListProjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListProjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjects, ListProjectsVariables } from '@firebasegen/default-connector';

// The `ListProjects` query requires an argument of type `ListProjectsVariables`:
const listProjectsVars: ListProjectsVariables = {
  programId: ..., 
};

// Call the `listProjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjects(listProjectsVars);
// Variables can be defined inline as well.
const { data } = await listProjects({ programId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjects(dataConnect, listProjectsVars);

console.log(data.projects);

// Or, you can use the `Promise` API.
listProjects(listProjectsVars).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListProjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectsRef, ListProjectsVariables } from '@firebasegen/default-connector';

// The `ListProjects` query requires an argument of type `ListProjectsVariables`:
const listProjectsVars: ListProjectsVariables = {
  programId: ..., 
};

// Call the `listProjectsRef()` function to get a reference to the query.
const ref = listProjectsRef(listProjectsVars);
// Variables can be defined inline as well.
const ref = listProjectsRef({ programId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectsRef(dataConnect, listProjectsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## GetProject
You can execute the `GetProject` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getProject(vars: GetProjectVariables): QueryPromise<GetProjectData, GetProjectVariables>;

interface GetProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
}
export const getProjectRef: GetProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProject(dc: DataConnect, vars: GetProjectVariables): QueryPromise<GetProjectData, GetProjectVariables>;

interface GetProjectRef {
  ...
  (dc: DataConnect, vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
}
export const getProjectRef: GetProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProjectRef:
```typescript
const name = getProjectRef.operationName;
console.log(name);
```

### Variables
The `GetProject` query requires an argument of type `GetProjectVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProject` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProjectData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProject, GetProjectVariables } from '@firebasegen/default-connector';

// The `GetProject` query requires an argument of type `GetProjectVariables`:
const getProjectVars: GetProjectVariables = {
  id: ..., 
};

// Call the `getProject()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProject(getProjectVars);
// Variables can be defined inline as well.
const { data } = await getProject({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProject(dataConnect, getProjectVars);

console.log(data.project);

// Or, you can use the `Promise` API.
getProject(getProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project);
});
```

### Using `GetProject`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProjectRef, GetProjectVariables } from '@firebasegen/default-connector';

// The `GetProject` query requires an argument of type `GetProjectVariables`:
const getProjectVars: GetProjectVariables = {
  id: ..., 
};

// Call the `getProjectRef()` function to get a reference to the query.
const ref = getProjectRef(getProjectVars);
// Variables can be defined inline as well.
const ref = getProjectRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProjectRef(dataConnect, getProjectVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.project);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.project);
});
```

## ListProjectsByStatus
You can execute the `ListProjectsByStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listProjectsByStatus(vars: ListProjectsByStatusVariables): QueryPromise<ListProjectsByStatusData, ListProjectsByStatusVariables>;

interface ListProjectsByStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectsByStatusVariables): QueryRef<ListProjectsByStatusData, ListProjectsByStatusVariables>;
}
export const listProjectsByStatusRef: ListProjectsByStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectsByStatus(dc: DataConnect, vars: ListProjectsByStatusVariables): QueryPromise<ListProjectsByStatusData, ListProjectsByStatusVariables>;

interface ListProjectsByStatusRef {
  ...
  (dc: DataConnect, vars: ListProjectsByStatusVariables): QueryRef<ListProjectsByStatusData, ListProjectsByStatusVariables>;
}
export const listProjectsByStatusRef: ListProjectsByStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectsByStatusRef:
```typescript
const name = listProjectsByStatusRef.operationName;
console.log(name);
```

### Variables
The `ListProjectsByStatus` query requires an argument of type `ListProjectsByStatusVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectsByStatusVariables {
  status: ProjectStatus;
}
```
### Return Type
Recall that executing the `ListProjectsByStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectsByStatusData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListProjectsByStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectsByStatus, ListProjectsByStatusVariables } from '@firebasegen/default-connector';

// The `ListProjectsByStatus` query requires an argument of type `ListProjectsByStatusVariables`:
const listProjectsByStatusVars: ListProjectsByStatusVariables = {
  status: ..., 
};

// Call the `listProjectsByStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectsByStatus(listProjectsByStatusVars);
// Variables can be defined inline as well.
const { data } = await listProjectsByStatus({ status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectsByStatus(dataConnect, listProjectsByStatusVars);

console.log(data.projects);

// Or, you can use the `Promise` API.
listProjectsByStatus(listProjectsByStatusVars).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListProjectsByStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectsByStatusRef, ListProjectsByStatusVariables } from '@firebasegen/default-connector';

// The `ListProjectsByStatus` query requires an argument of type `ListProjectsByStatusVariables`:
const listProjectsByStatusVars: ListProjectsByStatusVariables = {
  status: ..., 
};

// Call the `listProjectsByStatusRef()` function to get a reference to the query.
const ref = listProjectsByStatusRef(listProjectsByStatusVars);
// Variables can be defined inline as well.
const ref = listProjectsByStatusRef({ status: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectsByStatusRef(dataConnect, listProjectsByStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## ListTeams
You can execute the `ListTeams` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listTeams(vars: ListTeamsVariables): QueryPromise<ListTeamsData, ListTeamsVariables>;

interface ListTeamsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTeamsVariables): QueryRef<ListTeamsData, ListTeamsVariables>;
}
export const listTeamsRef: ListTeamsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTeams(dc: DataConnect, vars: ListTeamsVariables): QueryPromise<ListTeamsData, ListTeamsVariables>;

interface ListTeamsRef {
  ...
  (dc: DataConnect, vars: ListTeamsVariables): QueryRef<ListTeamsData, ListTeamsVariables>;
}
export const listTeamsRef: ListTeamsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTeamsRef:
```typescript
const name = listTeamsRef.operationName;
console.log(name);
```

### Variables
The `ListTeams` query requires an argument of type `ListTeamsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTeamsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTeams` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTeamsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListTeams`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTeams, ListTeamsVariables } from '@firebasegen/default-connector';

// The `ListTeams` query requires an argument of type `ListTeamsVariables`:
const listTeamsVars: ListTeamsVariables = {
  organizationId: ..., 
};

// Call the `listTeams()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTeams(listTeamsVars);
// Variables can be defined inline as well.
const { data } = await listTeams({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTeams(dataConnect, listTeamsVars);

console.log(data.teams);

// Or, you can use the `Promise` API.
listTeams(listTeamsVars).then((response) => {
  const data = response.data;
  console.log(data.teams);
});
```

### Using `ListTeams`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTeamsRef, ListTeamsVariables } from '@firebasegen/default-connector';

// The `ListTeams` query requires an argument of type `ListTeamsVariables`:
const listTeamsVars: ListTeamsVariables = {
  organizationId: ..., 
};

// Call the `listTeamsRef()` function to get a reference to the query.
const ref = listTeamsRef(listTeamsVars);
// Variables can be defined inline as well.
const ref = listTeamsRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTeamsRef(dataConnect, listTeamsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teams);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teams);
});
```

## GetTeam
You can execute the `GetTeam` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getTeam(vars: GetTeamVariables): QueryPromise<GetTeamData, GetTeamVariables>;

interface GetTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTeamVariables): QueryRef<GetTeamData, GetTeamVariables>;
}
export const getTeamRef: GetTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTeam(dc: DataConnect, vars: GetTeamVariables): QueryPromise<GetTeamData, GetTeamVariables>;

interface GetTeamRef {
  ...
  (dc: DataConnect, vars: GetTeamVariables): QueryRef<GetTeamData, GetTeamVariables>;
}
export const getTeamRef: GetTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTeamRef:
```typescript
const name = getTeamRef.operationName;
console.log(name);
```

### Variables
The `GetTeam` query requires an argument of type `GetTeamVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTeamVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTeam` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTeamData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetTeam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTeam, GetTeamVariables } from '@firebasegen/default-connector';

// The `GetTeam` query requires an argument of type `GetTeamVariables`:
const getTeamVars: GetTeamVariables = {
  id: ..., 
};

// Call the `getTeam()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTeam(getTeamVars);
// Variables can be defined inline as well.
const { data } = await getTeam({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTeam(dataConnect, getTeamVars);

console.log(data.team);

// Or, you can use the `Promise` API.
getTeam(getTeamVars).then((response) => {
  const data = response.data;
  console.log(data.team);
});
```

### Using `GetTeam`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTeamRef, GetTeamVariables } from '@firebasegen/default-connector';

// The `GetTeam` query requires an argument of type `GetTeamVariables`:
const getTeamVars: GetTeamVariables = {
  id: ..., 
};

// Call the `getTeamRef()` function to get a reference to the query.
const ref = getTeamRef(getTeamVars);
// Variables can be defined inline as well.
const ref = getTeamRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTeamRef(dataConnect, getTeamVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.team);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.team);
});
```

## GetOrganization
You can execute the `GetOrganization` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getOrganization(vars: GetOrganizationVariables): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface GetOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
}
export const getOrganizationRef: GetOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganization(dc: DataConnect, vars: GetOrganizationVariables): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface GetOrganizationRef {
  ...
  (dc: DataConnect, vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
}
export const getOrganizationRef: GetOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationRef:
```typescript
const name = getOrganizationRef.operationName;
console.log(name);
```

### Variables
The `GetOrganization` query requires an argument of type `GetOrganizationVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganization` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationData {
  organization?: {
    id: UUIDString;
    name: string;
    fiscalYearStartMonth: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Organization_Key;
}
```
### Using `GetOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganization, GetOrganizationVariables } from '@firebasegen/default-connector';

// The `GetOrganization` query requires an argument of type `GetOrganizationVariables`:
const getOrganizationVars: GetOrganizationVariables = {
  id: ..., 
};

// Call the `getOrganization()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganization(getOrganizationVars);
// Variables can be defined inline as well.
const { data } = await getOrganization({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganization(dataConnect, getOrganizationVars);

console.log(data.organization);

// Or, you can use the `Promise` API.
getOrganization(getOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization);
});
```

### Using `GetOrganization`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationRef, GetOrganizationVariables } from '@firebasegen/default-connector';

// The `GetOrganization` query requires an argument of type `GetOrganizationVariables`:
const getOrganizationVars: GetOrganizationVariables = {
  id: ..., 
};

// Call the `getOrganizationRef()` function to get a reference to the query.
const ref = getOrganizationRef(getOrganizationVars);
// Variables can be defined inline as well.
const ref = getOrganizationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationRef(dataConnect, getOrganizationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organization);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organization);
});
```

## ListPhaseTemplates
You can execute the `ListPhaseTemplates` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listPhaseTemplates(vars: ListPhaseTemplatesVariables): QueryPromise<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;

interface ListPhaseTemplatesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPhaseTemplatesVariables): QueryRef<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;
}
export const listPhaseTemplatesRef: ListPhaseTemplatesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPhaseTemplates(dc: DataConnect, vars: ListPhaseTemplatesVariables): QueryPromise<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;

interface ListPhaseTemplatesRef {
  ...
  (dc: DataConnect, vars: ListPhaseTemplatesVariables): QueryRef<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;
}
export const listPhaseTemplatesRef: ListPhaseTemplatesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPhaseTemplatesRef:
```typescript
const name = listPhaseTemplatesRef.operationName;
console.log(name);
```

### Variables
The `ListPhaseTemplates` query requires an argument of type `ListPhaseTemplatesVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListPhaseTemplatesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListPhaseTemplates` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPhaseTemplatesData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListPhaseTemplates`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPhaseTemplates, ListPhaseTemplatesVariables } from '@firebasegen/default-connector';

// The `ListPhaseTemplates` query requires an argument of type `ListPhaseTemplatesVariables`:
const listPhaseTemplatesVars: ListPhaseTemplatesVariables = {
  organizationId: ..., 
};

// Call the `listPhaseTemplates()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPhaseTemplates(listPhaseTemplatesVars);
// Variables can be defined inline as well.
const { data } = await listPhaseTemplates({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPhaseTemplates(dataConnect, listPhaseTemplatesVars);

console.log(data.phaseTemplates);

// Or, you can use the `Promise` API.
listPhaseTemplates(listPhaseTemplatesVars).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplates);
});
```

### Using `ListPhaseTemplates`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPhaseTemplatesRef, ListPhaseTemplatesVariables } from '@firebasegen/default-connector';

// The `ListPhaseTemplates` query requires an argument of type `ListPhaseTemplatesVariables`:
const listPhaseTemplatesVars: ListPhaseTemplatesVariables = {
  organizationId: ..., 
};

// Call the `listPhaseTemplatesRef()` function to get a reference to the query.
const ref = listPhaseTemplatesRef(listPhaseTemplatesVars);
// Variables can be defined inline as well.
const ref = listPhaseTemplatesRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPhaseTemplatesRef(dataConnect, listPhaseTemplatesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.phaseTemplates);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplates);
});
```

## GetPhaseTemplate
You can execute the `GetPhaseTemplate` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getPhaseTemplate(vars: GetPhaseTemplateVariables): QueryPromise<GetPhaseTemplateData, GetPhaseTemplateVariables>;

interface GetPhaseTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPhaseTemplateVariables): QueryRef<GetPhaseTemplateData, GetPhaseTemplateVariables>;
}
export const getPhaseTemplateRef: GetPhaseTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPhaseTemplate(dc: DataConnect, vars: GetPhaseTemplateVariables): QueryPromise<GetPhaseTemplateData, GetPhaseTemplateVariables>;

interface GetPhaseTemplateRef {
  ...
  (dc: DataConnect, vars: GetPhaseTemplateVariables): QueryRef<GetPhaseTemplateData, GetPhaseTemplateVariables>;
}
export const getPhaseTemplateRef: GetPhaseTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPhaseTemplateRef:
```typescript
const name = getPhaseTemplateRef.operationName;
console.log(name);
```

### Variables
The `GetPhaseTemplate` query requires an argument of type `GetPhaseTemplateVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPhaseTemplateVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPhaseTemplate` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPhaseTemplateData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPhaseTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPhaseTemplate, GetPhaseTemplateVariables } from '@firebasegen/default-connector';

// The `GetPhaseTemplate` query requires an argument of type `GetPhaseTemplateVariables`:
const getPhaseTemplateVars: GetPhaseTemplateVariables = {
  id: ..., 
};

// Call the `getPhaseTemplate()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPhaseTemplate(getPhaseTemplateVars);
// Variables can be defined inline as well.
const { data } = await getPhaseTemplate({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPhaseTemplate(dataConnect, getPhaseTemplateVars);

console.log(data.phaseTemplate);

// Or, you can use the `Promise` API.
getPhaseTemplate(getPhaseTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplate);
});
```

### Using `GetPhaseTemplate`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPhaseTemplateRef, GetPhaseTemplateVariables } from '@firebasegen/default-connector';

// The `GetPhaseTemplate` query requires an argument of type `GetPhaseTemplateVariables`:
const getPhaseTemplateVars: GetPhaseTemplateVariables = {
  id: ..., 
};

// Call the `getPhaseTemplateRef()` function to get a reference to the query.
const ref = getPhaseTemplateRef(getPhaseTemplateVars);
// Variables can be defined inline as well.
const ref = getPhaseTemplateRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPhaseTemplateRef(dataConnect, getPhaseTemplateVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.phaseTemplate);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplate);
});
```

## GetDefaultTemplates
You can execute the `GetDefaultTemplates` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getDefaultTemplates(vars: GetDefaultTemplatesVariables): QueryPromise<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;

interface GetDefaultTemplatesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDefaultTemplatesVariables): QueryRef<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;
}
export const getDefaultTemplatesRef: GetDefaultTemplatesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDefaultTemplates(dc: DataConnect, vars: GetDefaultTemplatesVariables): QueryPromise<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;

interface GetDefaultTemplatesRef {
  ...
  (dc: DataConnect, vars: GetDefaultTemplatesVariables): QueryRef<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;
}
export const getDefaultTemplatesRef: GetDefaultTemplatesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDefaultTemplatesRef:
```typescript
const name = getDefaultTemplatesRef.operationName;
console.log(name);
```

### Variables
The `GetDefaultTemplates` query requires an argument of type `GetDefaultTemplatesVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDefaultTemplatesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetDefaultTemplates` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDefaultTemplatesData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDefaultTemplatesData {
  phaseTemplates: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & PhaseTemplate_Key)[];
}
```
### Using `GetDefaultTemplates`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDefaultTemplates, GetDefaultTemplatesVariables } from '@firebasegen/default-connector';

// The `GetDefaultTemplates` query requires an argument of type `GetDefaultTemplatesVariables`:
const getDefaultTemplatesVars: GetDefaultTemplatesVariables = {
  organizationId: ..., 
};

// Call the `getDefaultTemplates()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDefaultTemplates(getDefaultTemplatesVars);
// Variables can be defined inline as well.
const { data } = await getDefaultTemplates({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDefaultTemplates(dataConnect, getDefaultTemplatesVars);

console.log(data.phaseTemplates);

// Or, you can use the `Promise` API.
getDefaultTemplates(getDefaultTemplatesVars).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplates);
});
```

### Using `GetDefaultTemplates`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDefaultTemplatesRef, GetDefaultTemplatesVariables } from '@firebasegen/default-connector';

// The `GetDefaultTemplates` query requires an argument of type `GetDefaultTemplatesVariables`:
const getDefaultTemplatesVars: GetDefaultTemplatesVariables = {
  organizationId: ..., 
};

// Call the `getDefaultTemplatesRef()` function to get a reference to the query.
const ref = getDefaultTemplatesRef(getDefaultTemplatesVars);
// Variables can be defined inline as well.
const ref = getDefaultTemplatesRef({ organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDefaultTemplatesRef(dataConnect, getDefaultTemplatesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.phaseTemplates);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplates);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreatePortfolio
You can execute the `CreatePortfolio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createPortfolio(vars: CreatePortfolioVariables): MutationPromise<CreatePortfolioData, CreatePortfolioVariables>;

interface CreatePortfolioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePortfolioVariables): MutationRef<CreatePortfolioData, CreatePortfolioVariables>;
}
export const createPortfolioRef: CreatePortfolioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPortfolio(dc: DataConnect, vars: CreatePortfolioVariables): MutationPromise<CreatePortfolioData, CreatePortfolioVariables>;

interface CreatePortfolioRef {
  ...
  (dc: DataConnect, vars: CreatePortfolioVariables): MutationRef<CreatePortfolioData, CreatePortfolioVariables>;
}
export const createPortfolioRef: CreatePortfolioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPortfolioRef:
```typescript
const name = createPortfolioRef.operationName;
console.log(name);
```

### Variables
The `CreatePortfolio` mutation requires an argument of type `CreatePortfolioVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePortfolioVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
  ownerId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreatePortfolio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePortfolioData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePortfolioData {
  portfolio_insert: Portfolio_Key;
}
```
### Using `CreatePortfolio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPortfolio, CreatePortfolioVariables } from '@firebasegen/default-connector';

// The `CreatePortfolio` mutation requires an argument of type `CreatePortfolioVariables`:
const createPortfolioVars: CreatePortfolioVariables = {
  organizationId: ..., 
  name: ..., 
  description: ..., // optional
  ownerId: ..., // optional
};

// Call the `createPortfolio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPortfolio(createPortfolioVars);
// Variables can be defined inline as well.
const { data } = await createPortfolio({ organizationId: ..., name: ..., description: ..., ownerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPortfolio(dataConnect, createPortfolioVars);

console.log(data.portfolio_insert);

// Or, you can use the `Promise` API.
createPortfolio(createPortfolioVars).then((response) => {
  const data = response.data;
  console.log(data.portfolio_insert);
});
```

### Using `CreatePortfolio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPortfolioRef, CreatePortfolioVariables } from '@firebasegen/default-connector';

// The `CreatePortfolio` mutation requires an argument of type `CreatePortfolioVariables`:
const createPortfolioVars: CreatePortfolioVariables = {
  organizationId: ..., 
  name: ..., 
  description: ..., // optional
  ownerId: ..., // optional
};

// Call the `createPortfolioRef()` function to get a reference to the mutation.
const ref = createPortfolioRef(createPortfolioVars);
// Variables can be defined inline as well.
const ref = createPortfolioRef({ organizationId: ..., name: ..., description: ..., ownerId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPortfolioRef(dataConnect, createPortfolioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.portfolio_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.portfolio_insert);
});
```

## UpdatePortfolio
You can execute the `UpdatePortfolio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updatePortfolio(vars: UpdatePortfolioVariables): MutationPromise<UpdatePortfolioData, UpdatePortfolioVariables>;

interface UpdatePortfolioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePortfolioVariables): MutationRef<UpdatePortfolioData, UpdatePortfolioVariables>;
}
export const updatePortfolioRef: UpdatePortfolioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePortfolio(dc: DataConnect, vars: UpdatePortfolioVariables): MutationPromise<UpdatePortfolioData, UpdatePortfolioVariables>;

interface UpdatePortfolioRef {
  ...
  (dc: DataConnect, vars: UpdatePortfolioVariables): MutationRef<UpdatePortfolioData, UpdatePortfolioVariables>;
}
export const updatePortfolioRef: UpdatePortfolioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePortfolioRef:
```typescript
const name = updatePortfolioRef.operationName;
console.log(name);
```

### Variables
The `UpdatePortfolio` mutation requires an argument of type `UpdatePortfolioVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePortfolioVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  ownerId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `UpdatePortfolio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePortfolioData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePortfolioData {
  portfolio_update?: Portfolio_Key | null;
}
```
### Using `UpdatePortfolio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePortfolio, UpdatePortfolioVariables } from '@firebasegen/default-connector';

// The `UpdatePortfolio` mutation requires an argument of type `UpdatePortfolioVariables`:
const updatePortfolioVars: UpdatePortfolioVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  ownerId: ..., // optional
};

// Call the `updatePortfolio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePortfolio(updatePortfolioVars);
// Variables can be defined inline as well.
const { data } = await updatePortfolio({ id: ..., name: ..., description: ..., ownerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePortfolio(dataConnect, updatePortfolioVars);

console.log(data.portfolio_update);

// Or, you can use the `Promise` API.
updatePortfolio(updatePortfolioVars).then((response) => {
  const data = response.data;
  console.log(data.portfolio_update);
});
```

### Using `UpdatePortfolio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePortfolioRef, UpdatePortfolioVariables } from '@firebasegen/default-connector';

// The `UpdatePortfolio` mutation requires an argument of type `UpdatePortfolioVariables`:
const updatePortfolioVars: UpdatePortfolioVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  ownerId: ..., // optional
};

// Call the `updatePortfolioRef()` function to get a reference to the mutation.
const ref = updatePortfolioRef(updatePortfolioVars);
// Variables can be defined inline as well.
const ref = updatePortfolioRef({ id: ..., name: ..., description: ..., ownerId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePortfolioRef(dataConnect, updatePortfolioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.portfolio_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.portfolio_update);
});
```

## DeletePortfolio
You can execute the `DeletePortfolio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deletePortfolio(vars: DeletePortfolioVariables): MutationPromise<DeletePortfolioData, DeletePortfolioVariables>;

interface DeletePortfolioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePortfolioVariables): MutationRef<DeletePortfolioData, DeletePortfolioVariables>;
}
export const deletePortfolioRef: DeletePortfolioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePortfolio(dc: DataConnect, vars: DeletePortfolioVariables): MutationPromise<DeletePortfolioData, DeletePortfolioVariables>;

interface DeletePortfolioRef {
  ...
  (dc: DataConnect, vars: DeletePortfolioVariables): MutationRef<DeletePortfolioData, DeletePortfolioVariables>;
}
export const deletePortfolioRef: DeletePortfolioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePortfolioRef:
```typescript
const name = deletePortfolioRef.operationName;
console.log(name);
```

### Variables
The `DeletePortfolio` mutation requires an argument of type `DeletePortfolioVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePortfolioVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePortfolio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePortfolioData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePortfolioData {
  portfolio_delete?: Portfolio_Key | null;
}
```
### Using `DeletePortfolio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePortfolio, DeletePortfolioVariables } from '@firebasegen/default-connector';

// The `DeletePortfolio` mutation requires an argument of type `DeletePortfolioVariables`:
const deletePortfolioVars: DeletePortfolioVariables = {
  id: ..., 
};

// Call the `deletePortfolio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePortfolio(deletePortfolioVars);
// Variables can be defined inline as well.
const { data } = await deletePortfolio({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePortfolio(dataConnect, deletePortfolioVars);

console.log(data.portfolio_delete);

// Or, you can use the `Promise` API.
deletePortfolio(deletePortfolioVars).then((response) => {
  const data = response.data;
  console.log(data.portfolio_delete);
});
```

### Using `DeletePortfolio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePortfolioRef, DeletePortfolioVariables } from '@firebasegen/default-connector';

// The `DeletePortfolio` mutation requires an argument of type `DeletePortfolioVariables`:
const deletePortfolioVars: DeletePortfolioVariables = {
  id: ..., 
};

// Call the `deletePortfolioRef()` function to get a reference to the mutation.
const ref = deletePortfolioRef(deletePortfolioVars);
// Variables can be defined inline as well.
const ref = deletePortfolioRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePortfolioRef(dataConnect, deletePortfolioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.portfolio_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.portfolio_delete);
});
```

## CreateProjectAssignment
You can execute the `CreateProjectAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createProjectAssignment(vars: CreateProjectAssignmentVariables): MutationPromise<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;

interface CreateProjectAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectAssignmentVariables): MutationRef<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;
}
export const createProjectAssignmentRef: CreateProjectAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProjectAssignment(dc: DataConnect, vars: CreateProjectAssignmentVariables): MutationPromise<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;

interface CreateProjectAssignmentRef {
  ...
  (dc: DataConnect, vars: CreateProjectAssignmentVariables): MutationRef<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;
}
export const createProjectAssignmentRef: CreateProjectAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectAssignmentRef:
```typescript
const name = createProjectAssignmentRef.operationName;
console.log(name);
```

### Variables
The `CreateProjectAssignment` mutation requires an argument of type `CreateProjectAssignmentVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProjectAssignmentVariables {
  projectId: UUIDString;
  userId: UUIDString;
  allocationPercent: number;
  startDate: DateString;
  endDate?: DateString | null;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `CreateProjectAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectAssignmentData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectAssignmentData {
  projectAssignment_insert: ProjectAssignment_Key;
}
```
### Using `CreateProjectAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProjectAssignment, CreateProjectAssignmentVariables } from '@firebasegen/default-connector';

// The `CreateProjectAssignment` mutation requires an argument of type `CreateProjectAssignmentVariables`:
const createProjectAssignmentVars: CreateProjectAssignmentVariables = {
  projectId: ..., 
  userId: ..., 
  allocationPercent: ..., 
  startDate: ..., 
  endDate: ..., // optional
  notes: ..., // optional
};

// Call the `createProjectAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProjectAssignment(createProjectAssignmentVars);
// Variables can be defined inline as well.
const { data } = await createProjectAssignment({ projectId: ..., userId: ..., allocationPercent: ..., startDate: ..., endDate: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProjectAssignment(dataConnect, createProjectAssignmentVars);

console.log(data.projectAssignment_insert);

// Or, you can use the `Promise` API.
createProjectAssignment(createProjectAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.projectAssignment_insert);
});
```

### Using `CreateProjectAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectAssignmentRef, CreateProjectAssignmentVariables } from '@firebasegen/default-connector';

// The `CreateProjectAssignment` mutation requires an argument of type `CreateProjectAssignmentVariables`:
const createProjectAssignmentVars: CreateProjectAssignmentVariables = {
  projectId: ..., 
  userId: ..., 
  allocationPercent: ..., 
  startDate: ..., 
  endDate: ..., // optional
  notes: ..., // optional
};

// Call the `createProjectAssignmentRef()` function to get a reference to the mutation.
const ref = createProjectAssignmentRef(createProjectAssignmentVars);
// Variables can be defined inline as well.
const ref = createProjectAssignmentRef({ projectId: ..., userId: ..., allocationPercent: ..., startDate: ..., endDate: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectAssignmentRef(dataConnect, createProjectAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectAssignment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectAssignment_insert);
});
```

## UpdateProjectAssignment
You can execute the `UpdateProjectAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateProjectAssignment(vars: UpdateProjectAssignmentVariables): MutationPromise<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;

interface UpdateProjectAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectAssignmentVariables): MutationRef<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;
}
export const updateProjectAssignmentRef: UpdateProjectAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProjectAssignment(dc: DataConnect, vars: UpdateProjectAssignmentVariables): MutationPromise<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;

interface UpdateProjectAssignmentRef {
  ...
  (dc: DataConnect, vars: UpdateProjectAssignmentVariables): MutationRef<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;
}
export const updateProjectAssignmentRef: UpdateProjectAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectAssignmentRef:
```typescript
const name = updateProjectAssignmentRef.operationName;
console.log(name);
```

### Variables
The `UpdateProjectAssignment` mutation requires an argument of type `UpdateProjectAssignmentVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectAssignmentVariables {
  id: UUIDString;
  allocationPercent?: number | null;
  startDate?: DateString | null;
  endDate?: DateString | null;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `UpdateProjectAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectAssignmentData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectAssignmentData {
  projectAssignment_update?: ProjectAssignment_Key | null;
}
```
### Using `UpdateProjectAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProjectAssignment, UpdateProjectAssignmentVariables } from '@firebasegen/default-connector';

// The `UpdateProjectAssignment` mutation requires an argument of type `UpdateProjectAssignmentVariables`:
const updateProjectAssignmentVars: UpdateProjectAssignmentVariables = {
  id: ..., 
  allocationPercent: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  notes: ..., // optional
};

// Call the `updateProjectAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProjectAssignment(updateProjectAssignmentVars);
// Variables can be defined inline as well.
const { data } = await updateProjectAssignment({ id: ..., allocationPercent: ..., startDate: ..., endDate: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProjectAssignment(dataConnect, updateProjectAssignmentVars);

console.log(data.projectAssignment_update);

// Or, you can use the `Promise` API.
updateProjectAssignment(updateProjectAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.projectAssignment_update);
});
```

### Using `UpdateProjectAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectAssignmentRef, UpdateProjectAssignmentVariables } from '@firebasegen/default-connector';

// The `UpdateProjectAssignment` mutation requires an argument of type `UpdateProjectAssignmentVariables`:
const updateProjectAssignmentVars: UpdateProjectAssignmentVariables = {
  id: ..., 
  allocationPercent: ..., // optional
  startDate: ..., // optional
  endDate: ..., // optional
  notes: ..., // optional
};

// Call the `updateProjectAssignmentRef()` function to get a reference to the mutation.
const ref = updateProjectAssignmentRef(updateProjectAssignmentVars);
// Variables can be defined inline as well.
const ref = updateProjectAssignmentRef({ id: ..., allocationPercent: ..., startDate: ..., endDate: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectAssignmentRef(dataConnect, updateProjectAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectAssignment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectAssignment_update);
});
```

## DeleteProjectAssignment
You can execute the `DeleteProjectAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteProjectAssignment(vars: DeleteProjectAssignmentVariables): MutationPromise<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;

interface DeleteProjectAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectAssignmentVariables): MutationRef<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;
}
export const deleteProjectAssignmentRef: DeleteProjectAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProjectAssignment(dc: DataConnect, vars: DeleteProjectAssignmentVariables): MutationPromise<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;

interface DeleteProjectAssignmentRef {
  ...
  (dc: DataConnect, vars: DeleteProjectAssignmentVariables): MutationRef<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;
}
export const deleteProjectAssignmentRef: DeleteProjectAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectAssignmentRef:
```typescript
const name = deleteProjectAssignmentRef.operationName;
console.log(name);
```

### Variables
The `DeleteProjectAssignment` mutation requires an argument of type `DeleteProjectAssignmentVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProjectAssignmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProjectAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectAssignmentData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectAssignmentData {
  projectAssignment_delete?: ProjectAssignment_Key | null;
}
```
### Using `DeleteProjectAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProjectAssignment, DeleteProjectAssignmentVariables } from '@firebasegen/default-connector';

// The `DeleteProjectAssignment` mutation requires an argument of type `DeleteProjectAssignmentVariables`:
const deleteProjectAssignmentVars: DeleteProjectAssignmentVariables = {
  id: ..., 
};

// Call the `deleteProjectAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProjectAssignment(deleteProjectAssignmentVars);
// Variables can be defined inline as well.
const { data } = await deleteProjectAssignment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProjectAssignment(dataConnect, deleteProjectAssignmentVars);

console.log(data.projectAssignment_delete);

// Or, you can use the `Promise` API.
deleteProjectAssignment(deleteProjectAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.projectAssignment_delete);
});
```

### Using `DeleteProjectAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectAssignmentRef, DeleteProjectAssignmentVariables } from '@firebasegen/default-connector';

// The `DeleteProjectAssignment` mutation requires an argument of type `DeleteProjectAssignmentVariables`:
const deleteProjectAssignmentVars: DeleteProjectAssignmentVariables = {
  id: ..., 
};

// Call the `deleteProjectAssignmentRef()` function to get a reference to the mutation.
const ref = deleteProjectAssignmentRef(deleteProjectAssignmentVars);
// Variables can be defined inline as well.
const ref = deleteProjectAssignmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectAssignmentRef(dataConnect, deleteProjectAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectAssignment_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectAssignment_delete);
});
```

## CreateProjectPhase
You can execute the `CreateProjectPhase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createProjectPhase(vars: CreateProjectPhaseVariables): MutationPromise<CreateProjectPhaseData, CreateProjectPhaseVariables>;

interface CreateProjectPhaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectPhaseVariables): MutationRef<CreateProjectPhaseData, CreateProjectPhaseVariables>;
}
export const createProjectPhaseRef: CreateProjectPhaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProjectPhase(dc: DataConnect, vars: CreateProjectPhaseVariables): MutationPromise<CreateProjectPhaseData, CreateProjectPhaseVariables>;

interface CreateProjectPhaseRef {
  ...
  (dc: DataConnect, vars: CreateProjectPhaseVariables): MutationRef<CreateProjectPhaseData, CreateProjectPhaseVariables>;
}
export const createProjectPhaseRef: CreateProjectPhaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectPhaseRef:
```typescript
const name = createProjectPhaseRef.operationName;
console.log(name);
```

### Variables
The `CreateProjectPhase` mutation requires an argument of type `CreateProjectPhaseVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateProjectPhase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectPhaseData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectPhaseData {
  projectPhase_insert: ProjectPhase_Key;
}
```
### Using `CreateProjectPhase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProjectPhase, CreateProjectPhaseVariables } from '@firebasegen/default-connector';

// The `CreateProjectPhase` mutation requires an argument of type `CreateProjectPhaseVariables`:
const createProjectPhaseVars: CreateProjectPhaseVariables = {
  projectId: ..., 
  name: ..., 
  description: ..., // optional
  status: ..., // optional
  startDate: ..., // optional
  targetEndDate: ..., // optional
  order: ..., 
  percentComplete: ..., // optional
};

// Call the `createProjectPhase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProjectPhase(createProjectPhaseVars);
// Variables can be defined inline as well.
const { data } = await createProjectPhase({ projectId: ..., name: ..., description: ..., status: ..., startDate: ..., targetEndDate: ..., order: ..., percentComplete: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProjectPhase(dataConnect, createProjectPhaseVars);

console.log(data.projectPhase_insert);

// Or, you can use the `Promise` API.
createProjectPhase(createProjectPhaseVars).then((response) => {
  const data = response.data;
  console.log(data.projectPhase_insert);
});
```

### Using `CreateProjectPhase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectPhaseRef, CreateProjectPhaseVariables } from '@firebasegen/default-connector';

// The `CreateProjectPhase` mutation requires an argument of type `CreateProjectPhaseVariables`:
const createProjectPhaseVars: CreateProjectPhaseVariables = {
  projectId: ..., 
  name: ..., 
  description: ..., // optional
  status: ..., // optional
  startDate: ..., // optional
  targetEndDate: ..., // optional
  order: ..., 
  percentComplete: ..., // optional
};

// Call the `createProjectPhaseRef()` function to get a reference to the mutation.
const ref = createProjectPhaseRef(createProjectPhaseVars);
// Variables can be defined inline as well.
const ref = createProjectPhaseRef({ projectId: ..., name: ..., description: ..., status: ..., startDate: ..., targetEndDate: ..., order: ..., percentComplete: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectPhaseRef(dataConnect, createProjectPhaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectPhase_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectPhase_insert);
});
```

## UpdateProjectPhase
You can execute the `UpdateProjectPhase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateProjectPhase(vars: UpdateProjectPhaseVariables): MutationPromise<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;

interface UpdateProjectPhaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectPhaseVariables): MutationRef<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;
}
export const updateProjectPhaseRef: UpdateProjectPhaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProjectPhase(dc: DataConnect, vars: UpdateProjectPhaseVariables): MutationPromise<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;

interface UpdateProjectPhaseRef {
  ...
  (dc: DataConnect, vars: UpdateProjectPhaseVariables): MutationRef<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;
}
export const updateProjectPhaseRef: UpdateProjectPhaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectPhaseRef:
```typescript
const name = updateProjectPhaseRef.operationName;
console.log(name);
```

### Variables
The `UpdateProjectPhase` mutation requires an argument of type `UpdateProjectPhaseVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateProjectPhase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectPhaseData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectPhaseData {
  projectPhase_update?: ProjectPhase_Key | null;
}
```
### Using `UpdateProjectPhase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProjectPhase, UpdateProjectPhaseVariables } from '@firebasegen/default-connector';

// The `UpdateProjectPhase` mutation requires an argument of type `UpdateProjectPhaseVariables`:
const updateProjectPhaseVars: UpdateProjectPhaseVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  status: ..., // optional
  startDate: ..., // optional
  targetEndDate: ..., // optional
  actualEndDate: ..., // optional
  percentComplete: ..., // optional
};

// Call the `updateProjectPhase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProjectPhase(updateProjectPhaseVars);
// Variables can be defined inline as well.
const { data } = await updateProjectPhase({ id: ..., name: ..., description: ..., status: ..., startDate: ..., targetEndDate: ..., actualEndDate: ..., percentComplete: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProjectPhase(dataConnect, updateProjectPhaseVars);

console.log(data.projectPhase_update);

// Or, you can use the `Promise` API.
updateProjectPhase(updateProjectPhaseVars).then((response) => {
  const data = response.data;
  console.log(data.projectPhase_update);
});
```

### Using `UpdateProjectPhase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectPhaseRef, UpdateProjectPhaseVariables } from '@firebasegen/default-connector';

// The `UpdateProjectPhase` mutation requires an argument of type `UpdateProjectPhaseVariables`:
const updateProjectPhaseVars: UpdateProjectPhaseVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  status: ..., // optional
  startDate: ..., // optional
  targetEndDate: ..., // optional
  actualEndDate: ..., // optional
  percentComplete: ..., // optional
};

// Call the `updateProjectPhaseRef()` function to get a reference to the mutation.
const ref = updateProjectPhaseRef(updateProjectPhaseVars);
// Variables can be defined inline as well.
const ref = updateProjectPhaseRef({ id: ..., name: ..., description: ..., status: ..., startDate: ..., targetEndDate: ..., actualEndDate: ..., percentComplete: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectPhaseRef(dataConnect, updateProjectPhaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectPhase_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectPhase_update);
});
```

## DeleteProjectPhase
You can execute the `DeleteProjectPhase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteProjectPhase(vars: DeleteProjectPhaseVariables): MutationPromise<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;

interface DeleteProjectPhaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectPhaseVariables): MutationRef<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;
}
export const deleteProjectPhaseRef: DeleteProjectPhaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProjectPhase(dc: DataConnect, vars: DeleteProjectPhaseVariables): MutationPromise<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;

interface DeleteProjectPhaseRef {
  ...
  (dc: DataConnect, vars: DeleteProjectPhaseVariables): MutationRef<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;
}
export const deleteProjectPhaseRef: DeleteProjectPhaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectPhaseRef:
```typescript
const name = deleteProjectPhaseRef.operationName;
console.log(name);
```

### Variables
The `DeleteProjectPhase` mutation requires an argument of type `DeleteProjectPhaseVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProjectPhaseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProjectPhase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectPhaseData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectPhaseData {
  projectPhase_delete?: ProjectPhase_Key | null;
}
```
### Using `DeleteProjectPhase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProjectPhase, DeleteProjectPhaseVariables } from '@firebasegen/default-connector';

// The `DeleteProjectPhase` mutation requires an argument of type `DeleteProjectPhaseVariables`:
const deleteProjectPhaseVars: DeleteProjectPhaseVariables = {
  id: ..., 
};

// Call the `deleteProjectPhase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProjectPhase(deleteProjectPhaseVars);
// Variables can be defined inline as well.
const { data } = await deleteProjectPhase({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProjectPhase(dataConnect, deleteProjectPhaseVars);

console.log(data.projectPhase_delete);

// Or, you can use the `Promise` API.
deleteProjectPhase(deleteProjectPhaseVars).then((response) => {
  const data = response.data;
  console.log(data.projectPhase_delete);
});
```

### Using `DeleteProjectPhase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectPhaseRef, DeleteProjectPhaseVariables } from '@firebasegen/default-connector';

// The `DeleteProjectPhase` mutation requires an argument of type `DeleteProjectPhaseVariables`:
const deleteProjectPhaseVars: DeleteProjectPhaseVariables = {
  id: ..., 
};

// Call the `deleteProjectPhaseRef()` function to get a reference to the mutation.
const ref = deleteProjectPhaseRef(deleteProjectPhaseVars);
// Variables can be defined inline as well.
const ref = deleteProjectPhaseRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectPhaseRef(dataConnect, deleteProjectPhaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectPhase_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectPhase_delete);
});
```

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  organizationId: UUIDString;
  email: string;
  name: string;
  role?: UserRole | null;
  firebaseUid: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@firebasegen/default-connector';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  organizationId: ..., 
  email: ..., 
  name: ..., 
  role: ..., // optional
  firebaseUid: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ organizationId: ..., email: ..., name: ..., role: ..., firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@firebasegen/default-connector';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  organizationId: ..., 
  email: ..., 
  name: ..., 
  role: ..., // optional
  firebaseUid: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ organizationId: ..., email: ..., name: ..., role: ..., firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  id: UUIDString;
  name?: string | null;
  role?: UserRole | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@firebasegen/default-connector';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  id: ..., 
  name: ..., // optional
  role: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ id: ..., name: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@firebasegen/default-connector';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  id: ..., 
  name: ..., // optional
  role: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ id: ..., name: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteUser(vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect, vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;

interface DeleteUserRef {
  ...
  (dc: DataConnect, vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation requires an argument of type `DeleteUserVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteUserVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser, DeleteUserVariables } from '@firebasegen/default-connector';

// The `DeleteUser` mutation requires an argument of type `DeleteUserVariables`:
const deleteUserVars: DeleteUserVariables = {
  id: ..., 
};

// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser(deleteUserVars);
// Variables can be defined inline as well.
const { data } = await deleteUser({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect, deleteUserVars);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser(deleteUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef, DeleteUserVariables } from '@firebasegen/default-connector';

// The `DeleteUser` mutation requires an argument of type `DeleteUserVariables`:
const deleteUserVars: DeleteUserVariables = {
  id: ..., 
};

// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef(deleteUserVars);
// Variables can be defined inline as well.
const ref = deleteUserRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect, deleteUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateProductType
You can execute the `CreateProductType` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createProductType(vars: CreateProductTypeVariables): MutationPromise<CreateProductTypeData, CreateProductTypeVariables>;

interface CreateProductTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProductTypeVariables): MutationRef<CreateProductTypeData, CreateProductTypeVariables>;
}
export const createProductTypeRef: CreateProductTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProductType(dc: DataConnect, vars: CreateProductTypeVariables): MutationPromise<CreateProductTypeData, CreateProductTypeVariables>;

interface CreateProductTypeRef {
  ...
  (dc: DataConnect, vars: CreateProductTypeVariables): MutationRef<CreateProductTypeData, CreateProductTypeVariables>;
}
export const createProductTypeRef: CreateProductTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProductTypeRef:
```typescript
const name = createProductTypeRef.operationName;
console.log(name);
```

### Variables
The `CreateProductType` mutation requires an argument of type `CreateProductTypeVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProductTypeVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
}
```
### Return Type
Recall that executing the `CreateProductType` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProductTypeData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProductTypeData {
  productType_insert: ProductType_Key;
}
```
### Using `CreateProductType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProductType, CreateProductTypeVariables } from '@firebasegen/default-connector';

// The `CreateProductType` mutation requires an argument of type `CreateProductTypeVariables`:
const createProductTypeVars: CreateProductTypeVariables = {
  organizationId: ..., 
  name: ..., 
  description: ..., // optional
};

// Call the `createProductType()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProductType(createProductTypeVars);
// Variables can be defined inline as well.
const { data } = await createProductType({ organizationId: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProductType(dataConnect, createProductTypeVars);

console.log(data.productType_insert);

// Or, you can use the `Promise` API.
createProductType(createProductTypeVars).then((response) => {
  const data = response.data;
  console.log(data.productType_insert);
});
```

### Using `CreateProductType`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProductTypeRef, CreateProductTypeVariables } from '@firebasegen/default-connector';

// The `CreateProductType` mutation requires an argument of type `CreateProductTypeVariables`:
const createProductTypeVars: CreateProductTypeVariables = {
  organizationId: ..., 
  name: ..., 
  description: ..., // optional
};

// Call the `createProductTypeRef()` function to get a reference to the mutation.
const ref = createProductTypeRef(createProductTypeVars);
// Variables can be defined inline as well.
const ref = createProductTypeRef({ organizationId: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProductTypeRef(dataConnect, createProductTypeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.productType_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.productType_insert);
});
```

## UpdateProductType
You can execute the `UpdateProductType` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateProductType(vars: UpdateProductTypeVariables): MutationPromise<UpdateProductTypeData, UpdateProductTypeVariables>;

interface UpdateProductTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductTypeVariables): MutationRef<UpdateProductTypeData, UpdateProductTypeVariables>;
}
export const updateProductTypeRef: UpdateProductTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProductType(dc: DataConnect, vars: UpdateProductTypeVariables): MutationPromise<UpdateProductTypeData, UpdateProductTypeVariables>;

interface UpdateProductTypeRef {
  ...
  (dc: DataConnect, vars: UpdateProductTypeVariables): MutationRef<UpdateProductTypeData, UpdateProductTypeVariables>;
}
export const updateProductTypeRef: UpdateProductTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProductTypeRef:
```typescript
const name = updateProductTypeRef.operationName;
console.log(name);
```

### Variables
The `UpdateProductType` mutation requires an argument of type `UpdateProductTypeVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProductTypeVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdateProductType` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProductTypeData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProductTypeData {
  productType_update?: ProductType_Key | null;
}
```
### Using `UpdateProductType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProductType, UpdateProductTypeVariables } from '@firebasegen/default-connector';

// The `UpdateProductType` mutation requires an argument of type `UpdateProductTypeVariables`:
const updateProductTypeVars: UpdateProductTypeVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
};

// Call the `updateProductType()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProductType(updateProductTypeVars);
// Variables can be defined inline as well.
const { data } = await updateProductType({ id: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProductType(dataConnect, updateProductTypeVars);

console.log(data.productType_update);

// Or, you can use the `Promise` API.
updateProductType(updateProductTypeVars).then((response) => {
  const data = response.data;
  console.log(data.productType_update);
});
```

### Using `UpdateProductType`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProductTypeRef, UpdateProductTypeVariables } from '@firebasegen/default-connector';

// The `UpdateProductType` mutation requires an argument of type `UpdateProductTypeVariables`:
const updateProductTypeVars: UpdateProductTypeVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
};

// Call the `updateProductTypeRef()` function to get a reference to the mutation.
const ref = updateProductTypeRef(updateProductTypeVars);
// Variables can be defined inline as well.
const ref = updateProductTypeRef({ id: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProductTypeRef(dataConnect, updateProductTypeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.productType_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.productType_update);
});
```

## DeleteProductType
You can execute the `DeleteProductType` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteProductType(vars: DeleteProductTypeVariables): MutationPromise<DeleteProductTypeData, DeleteProductTypeVariables>;

interface DeleteProductTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProductTypeVariables): MutationRef<DeleteProductTypeData, DeleteProductTypeVariables>;
}
export const deleteProductTypeRef: DeleteProductTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProductType(dc: DataConnect, vars: DeleteProductTypeVariables): MutationPromise<DeleteProductTypeData, DeleteProductTypeVariables>;

interface DeleteProductTypeRef {
  ...
  (dc: DataConnect, vars: DeleteProductTypeVariables): MutationRef<DeleteProductTypeData, DeleteProductTypeVariables>;
}
export const deleteProductTypeRef: DeleteProductTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProductTypeRef:
```typescript
const name = deleteProductTypeRef.operationName;
console.log(name);
```

### Variables
The `DeleteProductType` mutation requires an argument of type `DeleteProductTypeVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProductTypeVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProductType` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProductTypeData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProductTypeData {
  productType_delete?: ProductType_Key | null;
}
```
### Using `DeleteProductType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProductType, DeleteProductTypeVariables } from '@firebasegen/default-connector';

// The `DeleteProductType` mutation requires an argument of type `DeleteProductTypeVariables`:
const deleteProductTypeVars: DeleteProductTypeVariables = {
  id: ..., 
};

// Call the `deleteProductType()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProductType(deleteProductTypeVars);
// Variables can be defined inline as well.
const { data } = await deleteProductType({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProductType(dataConnect, deleteProductTypeVars);

console.log(data.productType_delete);

// Or, you can use the `Promise` API.
deleteProductType(deleteProductTypeVars).then((response) => {
  const data = response.data;
  console.log(data.productType_delete);
});
```

### Using `DeleteProductType`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProductTypeRef, DeleteProductTypeVariables } from '@firebasegen/default-connector';

// The `DeleteProductType` mutation requires an argument of type `DeleteProductTypeVariables`:
const deleteProductTypeVars: DeleteProductTypeVariables = {
  id: ..., 
};

// Call the `deleteProductTypeRef()` function to get a reference to the mutation.
const ref = deleteProductTypeRef(deleteProductTypeVars);
// Variables can be defined inline as well.
const ref = deleteProductTypeRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProductTypeRef(dataConnect, deleteProductTypeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.productType_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.productType_delete);
});
```

## CreateProductTypePhaseConfig
You can execute the `CreateProductTypePhaseConfig` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createProductTypePhaseConfig(vars: CreateProductTypePhaseConfigVariables): MutationPromise<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;

interface CreateProductTypePhaseConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProductTypePhaseConfigVariables): MutationRef<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;
}
export const createProductTypePhaseConfigRef: CreateProductTypePhaseConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProductTypePhaseConfig(dc: DataConnect, vars: CreateProductTypePhaseConfigVariables): MutationPromise<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;

interface CreateProductTypePhaseConfigRef {
  ...
  (dc: DataConnect, vars: CreateProductTypePhaseConfigVariables): MutationRef<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;
}
export const createProductTypePhaseConfigRef: CreateProductTypePhaseConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProductTypePhaseConfigRef:
```typescript
const name = createProductTypePhaseConfigRef.operationName;
console.log(name);
```

### Variables
The `CreateProductTypePhaseConfig` mutation requires an argument of type `CreateProductTypePhaseConfigVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProductTypePhaseConfigVariables {
  productTypeId: UUIDString;
  phaseTemplateId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateProductTypePhaseConfig` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProductTypePhaseConfigData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProductTypePhaseConfigData {
  productTypePhaseConfig_insert: ProductTypePhaseConfig_Key;
}
```
### Using `CreateProductTypePhaseConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProductTypePhaseConfig, CreateProductTypePhaseConfigVariables } from '@firebasegen/default-connector';

// The `CreateProductTypePhaseConfig` mutation requires an argument of type `CreateProductTypePhaseConfigVariables`:
const createProductTypePhaseConfigVars: CreateProductTypePhaseConfigVariables = {
  productTypeId: ..., 
  phaseTemplateId: ..., 
};

// Call the `createProductTypePhaseConfig()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProductTypePhaseConfig(createProductTypePhaseConfigVars);
// Variables can be defined inline as well.
const { data } = await createProductTypePhaseConfig({ productTypeId: ..., phaseTemplateId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProductTypePhaseConfig(dataConnect, createProductTypePhaseConfigVars);

console.log(data.productTypePhaseConfig_insert);

// Or, you can use the `Promise` API.
createProductTypePhaseConfig(createProductTypePhaseConfigVars).then((response) => {
  const data = response.data;
  console.log(data.productTypePhaseConfig_insert);
});
```

### Using `CreateProductTypePhaseConfig`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProductTypePhaseConfigRef, CreateProductTypePhaseConfigVariables } from '@firebasegen/default-connector';

// The `CreateProductTypePhaseConfig` mutation requires an argument of type `CreateProductTypePhaseConfigVariables`:
const createProductTypePhaseConfigVars: CreateProductTypePhaseConfigVariables = {
  productTypeId: ..., 
  phaseTemplateId: ..., 
};

// Call the `createProductTypePhaseConfigRef()` function to get a reference to the mutation.
const ref = createProductTypePhaseConfigRef(createProductTypePhaseConfigVars);
// Variables can be defined inline as well.
const ref = createProductTypePhaseConfigRef({ productTypeId: ..., phaseTemplateId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProductTypePhaseConfigRef(dataConnect, createProductTypePhaseConfigVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.productTypePhaseConfig_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.productTypePhaseConfig_insert);
});
```

## DeleteProductTypePhaseConfig
You can execute the `DeleteProductTypePhaseConfig` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteProductTypePhaseConfig(vars: DeleteProductTypePhaseConfigVariables): MutationPromise<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;

interface DeleteProductTypePhaseConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProductTypePhaseConfigVariables): MutationRef<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;
}
export const deleteProductTypePhaseConfigRef: DeleteProductTypePhaseConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProductTypePhaseConfig(dc: DataConnect, vars: DeleteProductTypePhaseConfigVariables): MutationPromise<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;

interface DeleteProductTypePhaseConfigRef {
  ...
  (dc: DataConnect, vars: DeleteProductTypePhaseConfigVariables): MutationRef<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;
}
export const deleteProductTypePhaseConfigRef: DeleteProductTypePhaseConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProductTypePhaseConfigRef:
```typescript
const name = deleteProductTypePhaseConfigRef.operationName;
console.log(name);
```

### Variables
The `DeleteProductTypePhaseConfig` mutation requires an argument of type `DeleteProductTypePhaseConfigVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProductTypePhaseConfigVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProductTypePhaseConfig` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProductTypePhaseConfigData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProductTypePhaseConfigData {
  productTypePhaseConfig_delete?: ProductTypePhaseConfig_Key | null;
}
```
### Using `DeleteProductTypePhaseConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProductTypePhaseConfig, DeleteProductTypePhaseConfigVariables } from '@firebasegen/default-connector';

// The `DeleteProductTypePhaseConfig` mutation requires an argument of type `DeleteProductTypePhaseConfigVariables`:
const deleteProductTypePhaseConfigVars: DeleteProductTypePhaseConfigVariables = {
  id: ..., 
};

// Call the `deleteProductTypePhaseConfig()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProductTypePhaseConfig(deleteProductTypePhaseConfigVars);
// Variables can be defined inline as well.
const { data } = await deleteProductTypePhaseConfig({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProductTypePhaseConfig(dataConnect, deleteProductTypePhaseConfigVars);

console.log(data.productTypePhaseConfig_delete);

// Or, you can use the `Promise` API.
deleteProductTypePhaseConfig(deleteProductTypePhaseConfigVars).then((response) => {
  const data = response.data;
  console.log(data.productTypePhaseConfig_delete);
});
```

### Using `DeleteProductTypePhaseConfig`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProductTypePhaseConfigRef, DeleteProductTypePhaseConfigVariables } from '@firebasegen/default-connector';

// The `DeleteProductTypePhaseConfig` mutation requires an argument of type `DeleteProductTypePhaseConfigVariables`:
const deleteProductTypePhaseConfigVars: DeleteProductTypePhaseConfigVariables = {
  id: ..., 
};

// Call the `deleteProductTypePhaseConfigRef()` function to get a reference to the mutation.
const ref = deleteProductTypePhaseConfigRef(deleteProductTypePhaseConfigVars);
// Variables can be defined inline as well.
const ref = deleteProductTypePhaseConfigRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProductTypePhaseConfigRef(dataConnect, deleteProductTypePhaseConfigVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.productTypePhaseConfig_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.productTypePhaseConfig_delete);
});
```

## CreateProgram
You can execute the `CreateProgram` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createProgram(vars: CreateProgramVariables): MutationPromise<CreateProgramData, CreateProgramVariables>;

interface CreateProgramRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProgramVariables): MutationRef<CreateProgramData, CreateProgramVariables>;
}
export const createProgramRef: CreateProgramRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProgram(dc: DataConnect, vars: CreateProgramVariables): MutationPromise<CreateProgramData, CreateProgramVariables>;

interface CreateProgramRef {
  ...
  (dc: DataConnect, vars: CreateProgramVariables): MutationRef<CreateProgramData, CreateProgramVariables>;
}
export const createProgramRef: CreateProgramRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProgramRef:
```typescript
const name = createProgramRef.operationName;
console.log(name);
```

### Variables
The `CreateProgram` mutation requires an argument of type `CreateProgramVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProgramVariables {
  portfolioId: UUIDString;
  name: string;
  description?: string | null;
  ownerId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateProgram` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProgramData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProgramData {
  program_insert: Program_Key;
}
```
### Using `CreateProgram`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProgram, CreateProgramVariables } from '@firebasegen/default-connector';

// The `CreateProgram` mutation requires an argument of type `CreateProgramVariables`:
const createProgramVars: CreateProgramVariables = {
  portfolioId: ..., 
  name: ..., 
  description: ..., // optional
  ownerId: ..., // optional
};

// Call the `createProgram()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProgram(createProgramVars);
// Variables can be defined inline as well.
const { data } = await createProgram({ portfolioId: ..., name: ..., description: ..., ownerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProgram(dataConnect, createProgramVars);

console.log(data.program_insert);

// Or, you can use the `Promise` API.
createProgram(createProgramVars).then((response) => {
  const data = response.data;
  console.log(data.program_insert);
});
```

### Using `CreateProgram`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProgramRef, CreateProgramVariables } from '@firebasegen/default-connector';

// The `CreateProgram` mutation requires an argument of type `CreateProgramVariables`:
const createProgramVars: CreateProgramVariables = {
  portfolioId: ..., 
  name: ..., 
  description: ..., // optional
  ownerId: ..., // optional
};

// Call the `createProgramRef()` function to get a reference to the mutation.
const ref = createProgramRef(createProgramVars);
// Variables can be defined inline as well.
const ref = createProgramRef({ portfolioId: ..., name: ..., description: ..., ownerId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProgramRef(dataConnect, createProgramVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.program_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.program_insert);
});
```

## UpdateProgram
You can execute the `UpdateProgram` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateProgram(vars: UpdateProgramVariables): MutationPromise<UpdateProgramData, UpdateProgramVariables>;

interface UpdateProgramRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProgramVariables): MutationRef<UpdateProgramData, UpdateProgramVariables>;
}
export const updateProgramRef: UpdateProgramRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProgram(dc: DataConnect, vars: UpdateProgramVariables): MutationPromise<UpdateProgramData, UpdateProgramVariables>;

interface UpdateProgramRef {
  ...
  (dc: DataConnect, vars: UpdateProgramVariables): MutationRef<UpdateProgramData, UpdateProgramVariables>;
}
export const updateProgramRef: UpdateProgramRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProgramRef:
```typescript
const name = updateProgramRef.operationName;
console.log(name);
```

### Variables
The `UpdateProgram` mutation requires an argument of type `UpdateProgramVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProgramVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  ownerId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `UpdateProgram` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProgramData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProgramData {
  program_update?: Program_Key | null;
}
```
### Using `UpdateProgram`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProgram, UpdateProgramVariables } from '@firebasegen/default-connector';

// The `UpdateProgram` mutation requires an argument of type `UpdateProgramVariables`:
const updateProgramVars: UpdateProgramVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  ownerId: ..., // optional
};

// Call the `updateProgram()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProgram(updateProgramVars);
// Variables can be defined inline as well.
const { data } = await updateProgram({ id: ..., name: ..., description: ..., ownerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProgram(dataConnect, updateProgramVars);

console.log(data.program_update);

// Or, you can use the `Promise` API.
updateProgram(updateProgramVars).then((response) => {
  const data = response.data;
  console.log(data.program_update);
});
```

### Using `UpdateProgram`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProgramRef, UpdateProgramVariables } from '@firebasegen/default-connector';

// The `UpdateProgram` mutation requires an argument of type `UpdateProgramVariables`:
const updateProgramVars: UpdateProgramVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  ownerId: ..., // optional
};

// Call the `updateProgramRef()` function to get a reference to the mutation.
const ref = updateProgramRef(updateProgramVars);
// Variables can be defined inline as well.
const ref = updateProgramRef({ id: ..., name: ..., description: ..., ownerId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProgramRef(dataConnect, updateProgramVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.program_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.program_update);
});
```

## DeleteProgram
You can execute the `DeleteProgram` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteProgram(vars: DeleteProgramVariables): MutationPromise<DeleteProgramData, DeleteProgramVariables>;

interface DeleteProgramRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProgramVariables): MutationRef<DeleteProgramData, DeleteProgramVariables>;
}
export const deleteProgramRef: DeleteProgramRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProgram(dc: DataConnect, vars: DeleteProgramVariables): MutationPromise<DeleteProgramData, DeleteProgramVariables>;

interface DeleteProgramRef {
  ...
  (dc: DataConnect, vars: DeleteProgramVariables): MutationRef<DeleteProgramData, DeleteProgramVariables>;
}
export const deleteProgramRef: DeleteProgramRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProgramRef:
```typescript
const name = deleteProgramRef.operationName;
console.log(name);
```

### Variables
The `DeleteProgram` mutation requires an argument of type `DeleteProgramVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProgramVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProgram` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProgramData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProgramData {
  program_delete?: Program_Key | null;
}
```
### Using `DeleteProgram`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProgram, DeleteProgramVariables } from '@firebasegen/default-connector';

// The `DeleteProgram` mutation requires an argument of type `DeleteProgramVariables`:
const deleteProgramVars: DeleteProgramVariables = {
  id: ..., 
};

// Call the `deleteProgram()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProgram(deleteProgramVars);
// Variables can be defined inline as well.
const { data } = await deleteProgram({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProgram(dataConnect, deleteProgramVars);

console.log(data.program_delete);

// Or, you can use the `Promise` API.
deleteProgram(deleteProgramVars).then((response) => {
  const data = response.data;
  console.log(data.program_delete);
});
```

### Using `DeleteProgram`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProgramRef, DeleteProgramVariables } from '@firebasegen/default-connector';

// The `DeleteProgram` mutation requires an argument of type `DeleteProgramVariables`:
const deleteProgramVars: DeleteProgramVariables = {
  id: ..., 
};

// Call the `deleteProgramRef()` function to get a reference to the mutation.
const ref = deleteProgramRef(deleteProgramVars);
// Variables can be defined inline as well.
const ref = deleteProgramRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProgramRef(dataConnect, deleteProgramVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.program_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.program_delete);
});
```

## CreateProject
You can execute the `CreateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectRef:
```typescript
const name = createProjectRef.operationName;
console.log(name);
```

### Variables
The `CreateProject` mutation requires an argument of type `CreateProjectVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectData {
  project_insert: Project_Key;
}
```
### Using `CreateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProject, CreateProjectVariables } from '@firebasegen/default-connector';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  programId: ..., 
  name: ..., 
  description: ..., // optional
  status: ..., // optional
  startDate: ..., // optional
  targetCompletionDate: ..., // optional
  ownerId: ..., // optional
  productTypeId: ..., // optional
};

// Call the `createProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProject(createProjectVars);
// Variables can be defined inline as well.
const { data } = await createProject({ programId: ..., name: ..., description: ..., status: ..., startDate: ..., targetCompletionDate: ..., ownerId: ..., productTypeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProject(dataConnect, createProjectVars);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
createProject(createProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

### Using `CreateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectRef, CreateProjectVariables } from '@firebasegen/default-connector';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  programId: ..., 
  name: ..., 
  description: ..., // optional
  status: ..., // optional
  startDate: ..., // optional
  targetCompletionDate: ..., // optional
  ownerId: ..., // optional
  productTypeId: ..., // optional
};

// Call the `createProjectRef()` function to get a reference to the mutation.
const ref = createProjectRef(createProjectVars);
// Variables can be defined inline as well.
const ref = createProjectRef({ programId: ..., name: ..., description: ..., status: ..., startDate: ..., targetCompletionDate: ..., ownerId: ..., productTypeId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectRef(dataConnect, createProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

## UpdateProject
You can execute the `UpdateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectRef:
```typescript
const name = updateProjectRef.operationName;
console.log(name);
```

### Variables
The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectData {
  project_update?: Project_Key | null;
}
```
### Using `UpdateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProject, UpdateProjectVariables } from '@firebasegen/default-connector';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  status: ..., // optional
  startDate: ..., // optional
  targetCompletionDate: ..., // optional
  actualCompletionDate: ..., // optional
  ownerId: ..., // optional
  productTypeId: ..., // optional
};

// Call the `updateProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProject(updateProjectVars);
// Variables can be defined inline as well.
const { data } = await updateProject({ id: ..., name: ..., description: ..., status: ..., startDate: ..., targetCompletionDate: ..., actualCompletionDate: ..., ownerId: ..., productTypeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProject(dataConnect, updateProjectVars);

console.log(data.project_update);

// Or, you can use the `Promise` API.
updateProject(updateProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `UpdateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectRef, UpdateProjectVariables } from '@firebasegen/default-connector';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  status: ..., // optional
  startDate: ..., // optional
  targetCompletionDate: ..., // optional
  actualCompletionDate: ..., // optional
  ownerId: ..., // optional
  productTypeId: ..., // optional
};

// Call the `updateProjectRef()` function to get a reference to the mutation.
const ref = updateProjectRef(updateProjectVars);
// Variables can be defined inline as well.
const ref = updateProjectRef({ id: ..., name: ..., description: ..., status: ..., startDate: ..., targetCompletionDate: ..., actualCompletionDate: ..., ownerId: ..., productTypeId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectRef(dataConnect, updateProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

## DeleteProject
You can execute the `DeleteProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectRef:
```typescript
const name = deleteProjectRef.operationName;
console.log(name);
```

### Variables
The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}
```
### Using `DeleteProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProject, DeleteProjectVariables } from '@firebasegen/default-connector';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProject(deleteProjectVars);
// Variables can be defined inline as well.
const { data } = await deleteProject({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProject(dataConnect, deleteProjectVars);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
deleteProject(deleteProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

### Using `DeleteProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectRef, DeleteProjectVariables } from '@firebasegen/default-connector';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProjectRef()` function to get a reference to the mutation.
const ref = deleteProjectRef(deleteProjectVars);
// Variables can be defined inline as well.
const ref = deleteProjectRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectRef(dataConnect, deleteProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

## CreateTeam
You can execute the `CreateTeam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createTeam(vars: CreateTeamVariables): MutationPromise<CreateTeamData, CreateTeamVariables>;

interface CreateTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTeamVariables): MutationRef<CreateTeamData, CreateTeamVariables>;
}
export const createTeamRef: CreateTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTeam(dc: DataConnect, vars: CreateTeamVariables): MutationPromise<CreateTeamData, CreateTeamVariables>;

interface CreateTeamRef {
  ...
  (dc: DataConnect, vars: CreateTeamVariables): MutationRef<CreateTeamData, CreateTeamVariables>;
}
export const createTeamRef: CreateTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTeamRef:
```typescript
const name = createTeamRef.operationName;
console.log(name);
```

### Variables
The `CreateTeam` mutation requires an argument of type `CreateTeamVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTeamVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
  parentTeamId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateTeam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTeamData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTeamData {
  team_insert: Team_Key;
}
```
### Using `CreateTeam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTeam, CreateTeamVariables } from '@firebasegen/default-connector';

// The `CreateTeam` mutation requires an argument of type `CreateTeamVariables`:
const createTeamVars: CreateTeamVariables = {
  organizationId: ..., 
  name: ..., 
  description: ..., // optional
  parentTeamId: ..., // optional
};

// Call the `createTeam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTeam(createTeamVars);
// Variables can be defined inline as well.
const { data } = await createTeam({ organizationId: ..., name: ..., description: ..., parentTeamId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTeam(dataConnect, createTeamVars);

console.log(data.team_insert);

// Or, you can use the `Promise` API.
createTeam(createTeamVars).then((response) => {
  const data = response.data;
  console.log(data.team_insert);
});
```

### Using `CreateTeam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTeamRef, CreateTeamVariables } from '@firebasegen/default-connector';

// The `CreateTeam` mutation requires an argument of type `CreateTeamVariables`:
const createTeamVars: CreateTeamVariables = {
  organizationId: ..., 
  name: ..., 
  description: ..., // optional
  parentTeamId: ..., // optional
};

// Call the `createTeamRef()` function to get a reference to the mutation.
const ref = createTeamRef(createTeamVars);
// Variables can be defined inline as well.
const ref = createTeamRef({ organizationId: ..., name: ..., description: ..., parentTeamId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTeamRef(dataConnect, createTeamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.team_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.team_insert);
});
```

## UpdateTeam
You can execute the `UpdateTeam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateTeam(vars: UpdateTeamVariables): MutationPromise<UpdateTeamData, UpdateTeamVariables>;

interface UpdateTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeamVariables): MutationRef<UpdateTeamData, UpdateTeamVariables>;
}
export const updateTeamRef: UpdateTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTeam(dc: DataConnect, vars: UpdateTeamVariables): MutationPromise<UpdateTeamData, UpdateTeamVariables>;

interface UpdateTeamRef {
  ...
  (dc: DataConnect, vars: UpdateTeamVariables): MutationRef<UpdateTeamData, UpdateTeamVariables>;
}
export const updateTeamRef: UpdateTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTeamRef:
```typescript
const name = updateTeamRef.operationName;
console.log(name);
```

### Variables
The `UpdateTeam` mutation requires an argument of type `UpdateTeamVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTeamVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  parentTeamId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `UpdateTeam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTeamData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTeamData {
  team_update?: Team_Key | null;
}
```
### Using `UpdateTeam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTeam, UpdateTeamVariables } from '@firebasegen/default-connector';

// The `UpdateTeam` mutation requires an argument of type `UpdateTeamVariables`:
const updateTeamVars: UpdateTeamVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  parentTeamId: ..., // optional
};

// Call the `updateTeam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTeam(updateTeamVars);
// Variables can be defined inline as well.
const { data } = await updateTeam({ id: ..., name: ..., description: ..., parentTeamId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTeam(dataConnect, updateTeamVars);

console.log(data.team_update);

// Or, you can use the `Promise` API.
updateTeam(updateTeamVars).then((response) => {
  const data = response.data;
  console.log(data.team_update);
});
```

### Using `UpdateTeam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTeamRef, UpdateTeamVariables } from '@firebasegen/default-connector';

// The `UpdateTeam` mutation requires an argument of type `UpdateTeamVariables`:
const updateTeamVars: UpdateTeamVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  parentTeamId: ..., // optional
};

// Call the `updateTeamRef()` function to get a reference to the mutation.
const ref = updateTeamRef(updateTeamVars);
// Variables can be defined inline as well.
const ref = updateTeamRef({ id: ..., name: ..., description: ..., parentTeamId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTeamRef(dataConnect, updateTeamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.team_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.team_update);
});
```

## DeleteTeam
You can execute the `DeleteTeam` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteTeam(vars: DeleteTeamVariables): MutationPromise<DeleteTeamData, DeleteTeamVariables>;

interface DeleteTeamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTeamVariables): MutationRef<DeleteTeamData, DeleteTeamVariables>;
}
export const deleteTeamRef: DeleteTeamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTeam(dc: DataConnect, vars: DeleteTeamVariables): MutationPromise<DeleteTeamData, DeleteTeamVariables>;

interface DeleteTeamRef {
  ...
  (dc: DataConnect, vars: DeleteTeamVariables): MutationRef<DeleteTeamData, DeleteTeamVariables>;
}
export const deleteTeamRef: DeleteTeamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTeamRef:
```typescript
const name = deleteTeamRef.operationName;
console.log(name);
```

### Variables
The `DeleteTeam` mutation requires an argument of type `DeleteTeamVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTeamVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTeam` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTeamData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTeamData {
  team_delete?: Team_Key | null;
}
```
### Using `DeleteTeam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTeam, DeleteTeamVariables } from '@firebasegen/default-connector';

// The `DeleteTeam` mutation requires an argument of type `DeleteTeamVariables`:
const deleteTeamVars: DeleteTeamVariables = {
  id: ..., 
};

// Call the `deleteTeam()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTeam(deleteTeamVars);
// Variables can be defined inline as well.
const { data } = await deleteTeam({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTeam(dataConnect, deleteTeamVars);

console.log(data.team_delete);

// Or, you can use the `Promise` API.
deleteTeam(deleteTeamVars).then((response) => {
  const data = response.data;
  console.log(data.team_delete);
});
```

### Using `DeleteTeam`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTeamRef, DeleteTeamVariables } from '@firebasegen/default-connector';

// The `DeleteTeam` mutation requires an argument of type `DeleteTeamVariables`:
const deleteTeamVars: DeleteTeamVariables = {
  id: ..., 
};

// Call the `deleteTeamRef()` function to get a reference to the mutation.
const ref = deleteTeamRef(deleteTeamVars);
// Variables can be defined inline as well.
const ref = deleteTeamRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTeamRef(dataConnect, deleteTeamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.team_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.team_delete);
});
```

## AddTeamMember
You can execute the `AddTeamMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
addTeamMember(vars: AddTeamMemberVariables): MutationPromise<AddTeamMemberData, AddTeamMemberVariables>;

interface AddTeamMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTeamMemberVariables): MutationRef<AddTeamMemberData, AddTeamMemberVariables>;
}
export const addTeamMemberRef: AddTeamMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addTeamMember(dc: DataConnect, vars: AddTeamMemberVariables): MutationPromise<AddTeamMemberData, AddTeamMemberVariables>;

interface AddTeamMemberRef {
  ...
  (dc: DataConnect, vars: AddTeamMemberVariables): MutationRef<AddTeamMemberData, AddTeamMemberVariables>;
}
export const addTeamMemberRef: AddTeamMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addTeamMemberRef:
```typescript
const name = addTeamMemberRef.operationName;
console.log(name);
```

### Variables
The `AddTeamMember` mutation requires an argument of type `AddTeamMemberVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddTeamMemberVariables {
  teamId: UUIDString;
  userId: UUIDString;
  role?: string | null;
}
```
### Return Type
Recall that executing the `AddTeamMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddTeamMemberData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddTeamMemberData {
  teamMember_insert: TeamMember_Key;
}
```
### Using `AddTeamMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addTeamMember, AddTeamMemberVariables } from '@firebasegen/default-connector';

// The `AddTeamMember` mutation requires an argument of type `AddTeamMemberVariables`:
const addTeamMemberVars: AddTeamMemberVariables = {
  teamId: ..., 
  userId: ..., 
  role: ..., // optional
};

// Call the `addTeamMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addTeamMember(addTeamMemberVars);
// Variables can be defined inline as well.
const { data } = await addTeamMember({ teamId: ..., userId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addTeamMember(dataConnect, addTeamMemberVars);

console.log(data.teamMember_insert);

// Or, you can use the `Promise` API.
addTeamMember(addTeamMemberVars).then((response) => {
  const data = response.data;
  console.log(data.teamMember_insert);
});
```

### Using `AddTeamMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addTeamMemberRef, AddTeamMemberVariables } from '@firebasegen/default-connector';

// The `AddTeamMember` mutation requires an argument of type `AddTeamMemberVariables`:
const addTeamMemberVars: AddTeamMemberVariables = {
  teamId: ..., 
  userId: ..., 
  role: ..., // optional
};

// Call the `addTeamMemberRef()` function to get a reference to the mutation.
const ref = addTeamMemberRef(addTeamMemberVars);
// Variables can be defined inline as well.
const ref = addTeamMemberRef({ teamId: ..., userId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addTeamMemberRef(dataConnect, addTeamMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teamMember_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teamMember_insert);
});
```

## RemoveTeamMember
You can execute the `RemoveTeamMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
removeTeamMember(vars: RemoveTeamMemberVariables): MutationPromise<RemoveTeamMemberData, RemoveTeamMemberVariables>;

interface RemoveTeamMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveTeamMemberVariables): MutationRef<RemoveTeamMemberData, RemoveTeamMemberVariables>;
}
export const removeTeamMemberRef: RemoveTeamMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeTeamMember(dc: DataConnect, vars: RemoveTeamMemberVariables): MutationPromise<RemoveTeamMemberData, RemoveTeamMemberVariables>;

interface RemoveTeamMemberRef {
  ...
  (dc: DataConnect, vars: RemoveTeamMemberVariables): MutationRef<RemoveTeamMemberData, RemoveTeamMemberVariables>;
}
export const removeTeamMemberRef: RemoveTeamMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeTeamMemberRef:
```typescript
const name = removeTeamMemberRef.operationName;
console.log(name);
```

### Variables
The `RemoveTeamMember` mutation requires an argument of type `RemoveTeamMemberVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveTeamMemberVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveTeamMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveTeamMemberData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveTeamMemberData {
  teamMember_delete?: TeamMember_Key | null;
}
```
### Using `RemoveTeamMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeTeamMember, RemoveTeamMemberVariables } from '@firebasegen/default-connector';

// The `RemoveTeamMember` mutation requires an argument of type `RemoveTeamMemberVariables`:
const removeTeamMemberVars: RemoveTeamMemberVariables = {
  id: ..., 
};

// Call the `removeTeamMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeTeamMember(removeTeamMemberVars);
// Variables can be defined inline as well.
const { data } = await removeTeamMember({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeTeamMember(dataConnect, removeTeamMemberVars);

console.log(data.teamMember_delete);

// Or, you can use the `Promise` API.
removeTeamMember(removeTeamMemberVars).then((response) => {
  const data = response.data;
  console.log(data.teamMember_delete);
});
```

### Using `RemoveTeamMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeTeamMemberRef, RemoveTeamMemberVariables } from '@firebasegen/default-connector';

// The `RemoveTeamMember` mutation requires an argument of type `RemoveTeamMemberVariables`:
const removeTeamMemberVars: RemoveTeamMemberVariables = {
  id: ..., 
};

// Call the `removeTeamMemberRef()` function to get a reference to the mutation.
const ref = removeTeamMemberRef(removeTeamMemberVars);
// Variables can be defined inline as well.
const ref = removeTeamMemberRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeTeamMemberRef(dataConnect, removeTeamMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teamMember_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teamMember_delete);
});
```

## UpdateTeamMemberRole
You can execute the `UpdateTeamMemberRole` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateTeamMemberRole(vars: UpdateTeamMemberRoleVariables): MutationPromise<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;

interface UpdateTeamMemberRoleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeamMemberRoleVariables): MutationRef<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
}
export const updateTeamMemberRoleRef: UpdateTeamMemberRoleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTeamMemberRole(dc: DataConnect, vars: UpdateTeamMemberRoleVariables): MutationPromise<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;

interface UpdateTeamMemberRoleRef {
  ...
  (dc: DataConnect, vars: UpdateTeamMemberRoleVariables): MutationRef<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
}
export const updateTeamMemberRoleRef: UpdateTeamMemberRoleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTeamMemberRoleRef:
```typescript
const name = updateTeamMemberRoleRef.operationName;
console.log(name);
```

### Variables
The `UpdateTeamMemberRole` mutation requires an argument of type `UpdateTeamMemberRoleVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTeamMemberRoleVariables {
  id: UUIDString;
  role?: string | null;
}
```
### Return Type
Recall that executing the `UpdateTeamMemberRole` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTeamMemberRoleData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTeamMemberRoleData {
  teamMember_update?: TeamMember_Key | null;
}
```
### Using `UpdateTeamMemberRole`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTeamMemberRole, UpdateTeamMemberRoleVariables } from '@firebasegen/default-connector';

// The `UpdateTeamMemberRole` mutation requires an argument of type `UpdateTeamMemberRoleVariables`:
const updateTeamMemberRoleVars: UpdateTeamMemberRoleVariables = {
  id: ..., 
  role: ..., // optional
};

// Call the `updateTeamMemberRole()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTeamMemberRole(updateTeamMemberRoleVars);
// Variables can be defined inline as well.
const { data } = await updateTeamMemberRole({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTeamMemberRole(dataConnect, updateTeamMemberRoleVars);

console.log(data.teamMember_update);

// Or, you can use the `Promise` API.
updateTeamMemberRole(updateTeamMemberRoleVars).then((response) => {
  const data = response.data;
  console.log(data.teamMember_update);
});
```

### Using `UpdateTeamMemberRole`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTeamMemberRoleRef, UpdateTeamMemberRoleVariables } from '@firebasegen/default-connector';

// The `UpdateTeamMemberRole` mutation requires an argument of type `UpdateTeamMemberRoleVariables`:
const updateTeamMemberRoleVars: UpdateTeamMemberRoleVariables = {
  id: ..., 
  role: ..., // optional
};

// Call the `updateTeamMemberRoleRef()` function to get a reference to the mutation.
const ref = updateTeamMemberRoleRef(updateTeamMemberRoleVars);
// Variables can be defined inline as well.
const ref = updateTeamMemberRoleRef({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTeamMemberRoleRef(dataConnect, updateTeamMemberRoleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teamMember_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teamMember_update);
});
```

## CreateOrganization
You can execute the `CreateOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createOrganization(vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface CreateOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
}
export const createOrganizationRef: CreateOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrganization(dc: DataConnect, vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface CreateOrganizationRef {
  ...
  (dc: DataConnect, vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
}
export const createOrganizationRef: CreateOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrganizationRef:
```typescript
const name = createOrganizationRef.operationName;
console.log(name);
```

### Variables
The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrganizationVariables {
  name: string;
  fiscalYearStartMonth?: number | null;
}
```
### Return Type
Recall that executing the `CreateOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrganizationData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrganizationData {
  organization_insert: Organization_Key;
}
```
### Using `CreateOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrganization, CreateOrganizationVariables } from '@firebasegen/default-connector';

// The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`:
const createOrganizationVars: CreateOrganizationVariables = {
  name: ..., 
  fiscalYearStartMonth: ..., // optional
};

// Call the `createOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrganization(createOrganizationVars);
// Variables can be defined inline as well.
const { data } = await createOrganization({ name: ..., fiscalYearStartMonth: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrganization(dataConnect, createOrganizationVars);

console.log(data.organization_insert);

// Or, you can use the `Promise` API.
createOrganization(createOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
});
```

### Using `CreateOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrganizationRef, CreateOrganizationVariables } from '@firebasegen/default-connector';

// The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`:
const createOrganizationVars: CreateOrganizationVariables = {
  name: ..., 
  fiscalYearStartMonth: ..., // optional
};

// Call the `createOrganizationRef()` function to get a reference to the mutation.
const ref = createOrganizationRef(createOrganizationVars);
// Variables can be defined inline as well.
const ref = createOrganizationRef({ name: ..., fiscalYearStartMonth: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrganizationRef(dataConnect, createOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
});
```

## UpdateOrganization
You can execute the `UpdateOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateOrganization(vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface UpdateOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
}
export const updateOrganizationRef: UpdateOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrganization(dc: DataConnect, vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface UpdateOrganizationRef {
  ...
  (dc: DataConnect, vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
}
export const updateOrganizationRef: UpdateOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrganizationRef:
```typescript
const name = updateOrganizationRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrganizationVariables {
  id: UUIDString;
  name?: string | null;
  fiscalYearStartMonth?: number | null;
}
```
### Return Type
Recall that executing the `UpdateOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrganizationData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
}
```
### Using `UpdateOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrganization, UpdateOrganizationVariables } from '@firebasegen/default-connector';

// The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`:
const updateOrganizationVars: UpdateOrganizationVariables = {
  id: ..., 
  name: ..., // optional
  fiscalYearStartMonth: ..., // optional
};

// Call the `updateOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrganization(updateOrganizationVars);
// Variables can be defined inline as well.
const { data } = await updateOrganization({ id: ..., name: ..., fiscalYearStartMonth: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrganization(dataConnect, updateOrganizationVars);

console.log(data.organization_update);

// Or, you can use the `Promise` API.
updateOrganization(updateOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization_update);
});
```

### Using `UpdateOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrganizationRef, UpdateOrganizationVariables } from '@firebasegen/default-connector';

// The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`:
const updateOrganizationVars: UpdateOrganizationVariables = {
  id: ..., 
  name: ..., // optional
  fiscalYearStartMonth: ..., // optional
};

// Call the `updateOrganizationRef()` function to get a reference to the mutation.
const ref = updateOrganizationRef(updateOrganizationVars);
// Variables can be defined inline as well.
const ref = updateOrganizationRef({ id: ..., name: ..., fiscalYearStartMonth: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrganizationRef(dataConnect, updateOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_update);
});
```

## CreatePhaseTemplate
You can execute the `CreatePhaseTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createPhaseTemplate(vars: CreatePhaseTemplateVariables): MutationPromise<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;

interface CreatePhaseTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePhaseTemplateVariables): MutationRef<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;
}
export const createPhaseTemplateRef: CreatePhaseTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPhaseTemplate(dc: DataConnect, vars: CreatePhaseTemplateVariables): MutationPromise<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;

interface CreatePhaseTemplateRef {
  ...
  (dc: DataConnect, vars: CreatePhaseTemplateVariables): MutationRef<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;
}
export const createPhaseTemplateRef: CreatePhaseTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPhaseTemplateRef:
```typescript
const name = createPhaseTemplateRef.operationName;
console.log(name);
```

### Variables
The `CreatePhaseTemplate` mutation requires an argument of type `CreatePhaseTemplateVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePhaseTemplateVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
  isDefault?: boolean | null;
}
```
### Return Type
Recall that executing the `CreatePhaseTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePhaseTemplateData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePhaseTemplateData {
  phaseTemplate_insert: PhaseTemplate_Key;
}
```
### Using `CreatePhaseTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPhaseTemplate, CreatePhaseTemplateVariables } from '@firebasegen/default-connector';

// The `CreatePhaseTemplate` mutation requires an argument of type `CreatePhaseTemplateVariables`:
const createPhaseTemplateVars: CreatePhaseTemplateVariables = {
  organizationId: ..., 
  name: ..., 
  description: ..., // optional
  isDefault: ..., // optional
};

// Call the `createPhaseTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPhaseTemplate(createPhaseTemplateVars);
// Variables can be defined inline as well.
const { data } = await createPhaseTemplate({ organizationId: ..., name: ..., description: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPhaseTemplate(dataConnect, createPhaseTemplateVars);

console.log(data.phaseTemplate_insert);

// Or, you can use the `Promise` API.
createPhaseTemplate(createPhaseTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplate_insert);
});
```

### Using `CreatePhaseTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPhaseTemplateRef, CreatePhaseTemplateVariables } from '@firebasegen/default-connector';

// The `CreatePhaseTemplate` mutation requires an argument of type `CreatePhaseTemplateVariables`:
const createPhaseTemplateVars: CreatePhaseTemplateVariables = {
  organizationId: ..., 
  name: ..., 
  description: ..., // optional
  isDefault: ..., // optional
};

// Call the `createPhaseTemplateRef()` function to get a reference to the mutation.
const ref = createPhaseTemplateRef(createPhaseTemplateVars);
// Variables can be defined inline as well.
const ref = createPhaseTemplateRef({ organizationId: ..., name: ..., description: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPhaseTemplateRef(dataConnect, createPhaseTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.phaseTemplate_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplate_insert);
});
```

## UpdatePhaseTemplate
You can execute the `UpdatePhaseTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updatePhaseTemplate(vars: UpdatePhaseTemplateVariables): MutationPromise<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;

interface UpdatePhaseTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePhaseTemplateVariables): MutationRef<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;
}
export const updatePhaseTemplateRef: UpdatePhaseTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePhaseTemplate(dc: DataConnect, vars: UpdatePhaseTemplateVariables): MutationPromise<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;

interface UpdatePhaseTemplateRef {
  ...
  (dc: DataConnect, vars: UpdatePhaseTemplateVariables): MutationRef<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;
}
export const updatePhaseTemplateRef: UpdatePhaseTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePhaseTemplateRef:
```typescript
const name = updatePhaseTemplateRef.operationName;
console.log(name);
```

### Variables
The `UpdatePhaseTemplate` mutation requires an argument of type `UpdatePhaseTemplateVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePhaseTemplateVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  isDefault?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdatePhaseTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePhaseTemplateData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePhaseTemplateData {
  phaseTemplate_update?: PhaseTemplate_Key | null;
}
```
### Using `UpdatePhaseTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePhaseTemplate, UpdatePhaseTemplateVariables } from '@firebasegen/default-connector';

// The `UpdatePhaseTemplate` mutation requires an argument of type `UpdatePhaseTemplateVariables`:
const updatePhaseTemplateVars: UpdatePhaseTemplateVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  isDefault: ..., // optional
};

// Call the `updatePhaseTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePhaseTemplate(updatePhaseTemplateVars);
// Variables can be defined inline as well.
const { data } = await updatePhaseTemplate({ id: ..., name: ..., description: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePhaseTemplate(dataConnect, updatePhaseTemplateVars);

console.log(data.phaseTemplate_update);

// Or, you can use the `Promise` API.
updatePhaseTemplate(updatePhaseTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplate_update);
});
```

### Using `UpdatePhaseTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePhaseTemplateRef, UpdatePhaseTemplateVariables } from '@firebasegen/default-connector';

// The `UpdatePhaseTemplate` mutation requires an argument of type `UpdatePhaseTemplateVariables`:
const updatePhaseTemplateVars: UpdatePhaseTemplateVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  isDefault: ..., // optional
};

// Call the `updatePhaseTemplateRef()` function to get a reference to the mutation.
const ref = updatePhaseTemplateRef(updatePhaseTemplateVars);
// Variables can be defined inline as well.
const ref = updatePhaseTemplateRef({ id: ..., name: ..., description: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePhaseTemplateRef(dataConnect, updatePhaseTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.phaseTemplate_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplate_update);
});
```

## DeletePhaseTemplate
You can execute the `DeletePhaseTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deletePhaseTemplate(vars: DeletePhaseTemplateVariables): MutationPromise<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;

interface DeletePhaseTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePhaseTemplateVariables): MutationRef<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;
}
export const deletePhaseTemplateRef: DeletePhaseTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePhaseTemplate(dc: DataConnect, vars: DeletePhaseTemplateVariables): MutationPromise<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;

interface DeletePhaseTemplateRef {
  ...
  (dc: DataConnect, vars: DeletePhaseTemplateVariables): MutationRef<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;
}
export const deletePhaseTemplateRef: DeletePhaseTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePhaseTemplateRef:
```typescript
const name = deletePhaseTemplateRef.operationName;
console.log(name);
```

### Variables
The `DeletePhaseTemplate` mutation requires an argument of type `DeletePhaseTemplateVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePhaseTemplateVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePhaseTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePhaseTemplateData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePhaseTemplateData {
  phaseTemplate_delete?: PhaseTemplate_Key | null;
}
```
### Using `DeletePhaseTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePhaseTemplate, DeletePhaseTemplateVariables } from '@firebasegen/default-connector';

// The `DeletePhaseTemplate` mutation requires an argument of type `DeletePhaseTemplateVariables`:
const deletePhaseTemplateVars: DeletePhaseTemplateVariables = {
  id: ..., 
};

// Call the `deletePhaseTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePhaseTemplate(deletePhaseTemplateVars);
// Variables can be defined inline as well.
const { data } = await deletePhaseTemplate({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePhaseTemplate(dataConnect, deletePhaseTemplateVars);

console.log(data.phaseTemplate_delete);

// Or, you can use the `Promise` API.
deletePhaseTemplate(deletePhaseTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplate_delete);
});
```

### Using `DeletePhaseTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePhaseTemplateRef, DeletePhaseTemplateVariables } from '@firebasegen/default-connector';

// The `DeletePhaseTemplate` mutation requires an argument of type `DeletePhaseTemplateVariables`:
const deletePhaseTemplateVars: DeletePhaseTemplateVariables = {
  id: ..., 
};

// Call the `deletePhaseTemplateRef()` function to get a reference to the mutation.
const ref = deletePhaseTemplateRef(deletePhaseTemplateVars);
// Variables can be defined inline as well.
const ref = deletePhaseTemplateRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePhaseTemplateRef(dataConnect, deletePhaseTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.phaseTemplate_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplate_delete);
});
```

## CreatePhaseTemplatePhase
You can execute the `CreatePhaseTemplatePhase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createPhaseTemplatePhase(vars: CreatePhaseTemplatePhaseVariables): MutationPromise<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;

interface CreatePhaseTemplatePhaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePhaseTemplatePhaseVariables): MutationRef<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;
}
export const createPhaseTemplatePhaseRef: CreatePhaseTemplatePhaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPhaseTemplatePhase(dc: DataConnect, vars: CreatePhaseTemplatePhaseVariables): MutationPromise<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;

interface CreatePhaseTemplatePhaseRef {
  ...
  (dc: DataConnect, vars: CreatePhaseTemplatePhaseVariables): MutationRef<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;
}
export const createPhaseTemplatePhaseRef: CreatePhaseTemplatePhaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPhaseTemplatePhaseRef:
```typescript
const name = createPhaseTemplatePhaseRef.operationName;
console.log(name);
```

### Variables
The `CreatePhaseTemplatePhase` mutation requires an argument of type `CreatePhaseTemplatePhaseVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePhaseTemplatePhaseVariables {
  templateId: UUIDString;
  name: string;
  description?: string | null;
  durationWeeks?: number | null;
  order: number;
}
```
### Return Type
Recall that executing the `CreatePhaseTemplatePhase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePhaseTemplatePhaseData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePhaseTemplatePhaseData {
  phaseTemplatePhase_insert: PhaseTemplatePhase_Key;
}
```
### Using `CreatePhaseTemplatePhase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPhaseTemplatePhase, CreatePhaseTemplatePhaseVariables } from '@firebasegen/default-connector';

// The `CreatePhaseTemplatePhase` mutation requires an argument of type `CreatePhaseTemplatePhaseVariables`:
const createPhaseTemplatePhaseVars: CreatePhaseTemplatePhaseVariables = {
  templateId: ..., 
  name: ..., 
  description: ..., // optional
  durationWeeks: ..., // optional
  order: ..., 
};

// Call the `createPhaseTemplatePhase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPhaseTemplatePhase(createPhaseTemplatePhaseVars);
// Variables can be defined inline as well.
const { data } = await createPhaseTemplatePhase({ templateId: ..., name: ..., description: ..., durationWeeks: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPhaseTemplatePhase(dataConnect, createPhaseTemplatePhaseVars);

console.log(data.phaseTemplatePhase_insert);

// Or, you can use the `Promise` API.
createPhaseTemplatePhase(createPhaseTemplatePhaseVars).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplatePhase_insert);
});
```

### Using `CreatePhaseTemplatePhase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPhaseTemplatePhaseRef, CreatePhaseTemplatePhaseVariables } from '@firebasegen/default-connector';

// The `CreatePhaseTemplatePhase` mutation requires an argument of type `CreatePhaseTemplatePhaseVariables`:
const createPhaseTemplatePhaseVars: CreatePhaseTemplatePhaseVariables = {
  templateId: ..., 
  name: ..., 
  description: ..., // optional
  durationWeeks: ..., // optional
  order: ..., 
};

// Call the `createPhaseTemplatePhaseRef()` function to get a reference to the mutation.
const ref = createPhaseTemplatePhaseRef(createPhaseTemplatePhaseVars);
// Variables can be defined inline as well.
const ref = createPhaseTemplatePhaseRef({ templateId: ..., name: ..., description: ..., durationWeeks: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPhaseTemplatePhaseRef(dataConnect, createPhaseTemplatePhaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.phaseTemplatePhase_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplatePhase_insert);
});
```

## UpdatePhaseTemplatePhase
You can execute the `UpdatePhaseTemplatePhase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updatePhaseTemplatePhase(vars: UpdatePhaseTemplatePhaseVariables): MutationPromise<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;

interface UpdatePhaseTemplatePhaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePhaseTemplatePhaseVariables): MutationRef<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;
}
export const updatePhaseTemplatePhaseRef: UpdatePhaseTemplatePhaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePhaseTemplatePhase(dc: DataConnect, vars: UpdatePhaseTemplatePhaseVariables): MutationPromise<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;

interface UpdatePhaseTemplatePhaseRef {
  ...
  (dc: DataConnect, vars: UpdatePhaseTemplatePhaseVariables): MutationRef<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;
}
export const updatePhaseTemplatePhaseRef: UpdatePhaseTemplatePhaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePhaseTemplatePhaseRef:
```typescript
const name = updatePhaseTemplatePhaseRef.operationName;
console.log(name);
```

### Variables
The `UpdatePhaseTemplatePhase` mutation requires an argument of type `UpdatePhaseTemplatePhaseVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePhaseTemplatePhaseVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  durationWeeks?: number | null;
  order?: number | null;
}
```
### Return Type
Recall that executing the `UpdatePhaseTemplatePhase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePhaseTemplatePhaseData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePhaseTemplatePhaseData {
  phaseTemplatePhase_update?: PhaseTemplatePhase_Key | null;
}
```
### Using `UpdatePhaseTemplatePhase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePhaseTemplatePhase, UpdatePhaseTemplatePhaseVariables } from '@firebasegen/default-connector';

// The `UpdatePhaseTemplatePhase` mutation requires an argument of type `UpdatePhaseTemplatePhaseVariables`:
const updatePhaseTemplatePhaseVars: UpdatePhaseTemplatePhaseVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  durationWeeks: ..., // optional
  order: ..., // optional
};

// Call the `updatePhaseTemplatePhase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePhaseTemplatePhase(updatePhaseTemplatePhaseVars);
// Variables can be defined inline as well.
const { data } = await updatePhaseTemplatePhase({ id: ..., name: ..., description: ..., durationWeeks: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePhaseTemplatePhase(dataConnect, updatePhaseTemplatePhaseVars);

console.log(data.phaseTemplatePhase_update);

// Or, you can use the `Promise` API.
updatePhaseTemplatePhase(updatePhaseTemplatePhaseVars).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplatePhase_update);
});
```

### Using `UpdatePhaseTemplatePhase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePhaseTemplatePhaseRef, UpdatePhaseTemplatePhaseVariables } from '@firebasegen/default-connector';

// The `UpdatePhaseTemplatePhase` mutation requires an argument of type `UpdatePhaseTemplatePhaseVariables`:
const updatePhaseTemplatePhaseVars: UpdatePhaseTemplatePhaseVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
  durationWeeks: ..., // optional
  order: ..., // optional
};

// Call the `updatePhaseTemplatePhaseRef()` function to get a reference to the mutation.
const ref = updatePhaseTemplatePhaseRef(updatePhaseTemplatePhaseVars);
// Variables can be defined inline as well.
const ref = updatePhaseTemplatePhaseRef({ id: ..., name: ..., description: ..., durationWeeks: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePhaseTemplatePhaseRef(dataConnect, updatePhaseTemplatePhaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.phaseTemplatePhase_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplatePhase_update);
});
```

## DeletePhaseTemplatePhase
You can execute the `DeletePhaseTemplatePhase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deletePhaseTemplatePhase(vars: DeletePhaseTemplatePhaseVariables): MutationPromise<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;

interface DeletePhaseTemplatePhaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePhaseTemplatePhaseVariables): MutationRef<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;
}
export const deletePhaseTemplatePhaseRef: DeletePhaseTemplatePhaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePhaseTemplatePhase(dc: DataConnect, vars: DeletePhaseTemplatePhaseVariables): MutationPromise<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;

interface DeletePhaseTemplatePhaseRef {
  ...
  (dc: DataConnect, vars: DeletePhaseTemplatePhaseVariables): MutationRef<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;
}
export const deletePhaseTemplatePhaseRef: DeletePhaseTemplatePhaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePhaseTemplatePhaseRef:
```typescript
const name = deletePhaseTemplatePhaseRef.operationName;
console.log(name);
```

### Variables
The `DeletePhaseTemplatePhase` mutation requires an argument of type `DeletePhaseTemplatePhaseVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePhaseTemplatePhaseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePhaseTemplatePhase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePhaseTemplatePhaseData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePhaseTemplatePhaseData {
  phaseTemplatePhase_delete?: PhaseTemplatePhase_Key | null;
}
```
### Using `DeletePhaseTemplatePhase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePhaseTemplatePhase, DeletePhaseTemplatePhaseVariables } from '@firebasegen/default-connector';

// The `DeletePhaseTemplatePhase` mutation requires an argument of type `DeletePhaseTemplatePhaseVariables`:
const deletePhaseTemplatePhaseVars: DeletePhaseTemplatePhaseVariables = {
  id: ..., 
};

// Call the `deletePhaseTemplatePhase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePhaseTemplatePhase(deletePhaseTemplatePhaseVars);
// Variables can be defined inline as well.
const { data } = await deletePhaseTemplatePhase({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePhaseTemplatePhase(dataConnect, deletePhaseTemplatePhaseVars);

console.log(data.phaseTemplatePhase_delete);

// Or, you can use the `Promise` API.
deletePhaseTemplatePhase(deletePhaseTemplatePhaseVars).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplatePhase_delete);
});
```

### Using `DeletePhaseTemplatePhase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePhaseTemplatePhaseRef, DeletePhaseTemplatePhaseVariables } from '@firebasegen/default-connector';

// The `DeletePhaseTemplatePhase` mutation requires an argument of type `DeletePhaseTemplatePhaseVariables`:
const deletePhaseTemplatePhaseVars: DeletePhaseTemplatePhaseVariables = {
  id: ..., 
};

// Call the `deletePhaseTemplatePhaseRef()` function to get a reference to the mutation.
const ref = deletePhaseTemplatePhaseRef(deletePhaseTemplatePhaseVars);
// Variables can be defined inline as well.
const ref = deletePhaseTemplatePhaseRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePhaseTemplatePhaseRef(dataConnect, deletePhaseTemplatePhaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.phaseTemplatePhase_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.phaseTemplatePhase_delete);
});
```

