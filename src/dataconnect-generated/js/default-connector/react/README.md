# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`default-connector/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/default-connector/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListPrograms*](#listprograms)
  - [*GetProgram*](#getprogram)
  - [*ListProjectAssignments*](#listprojectassignments)
  - [*ListUserAssignments*](#listuserassignments)
  - [*ListAssignmentsByDateRange*](#listassignmentsbydaterange)
  - [*ListTeams*](#listteams)
  - [*GetTeam*](#getteam)
  - [*ListUsers*](#listusers)
  - [*GetUser*](#getuser)
  - [*GetUserByEmail*](#getuserbyemail)
  - [*GetUserByFirebaseUid*](#getuserbyfirebaseuid)
  - [*GetOrganization*](#getorganization)
  - [*ListPhaseTemplates*](#listphasetemplates)
  - [*GetPhaseTemplate*](#getphasetemplate)
  - [*ListPhaseTemplatePhases*](#listphasetemplatephases)
  - [*GetDefaultTemplates*](#getdefaulttemplates)
  - [*ListPortfolios*](#listportfolios)
  - [*GetPortfolio*](#getportfolio)
  - [*ListProductTypes*](#listproducttypes)
  - [*GetProductType*](#getproducttype)
  - [*ListProjects*](#listprojects)
  - [*GetProject*](#getproject)
  - [*ListProjectsByStatus*](#listprojectsbystatus)
  - [*ListProjectPhases*](#listprojectphases)
  - [*GetProjectPhase*](#getprojectphase)
- [**Mutations**](#mutations)
  - [*CreateProgram*](#createprogram)
  - [*UpdateProgram*](#updateprogram)
  - [*DeleteProgram*](#deleteprogram)
  - [*CreateProjectAssignment*](#createprojectassignment)
  - [*UpdateProjectAssignment*](#updateprojectassignment)
  - [*DeleteProjectAssignment*](#deleteprojectassignment)
  - [*CreateTeam*](#createteam)
  - [*UpdateTeam*](#updateteam)
  - [*DeleteTeam*](#deleteteam)
  - [*AddTeamMember*](#addteammember)
  - [*RemoveTeamMember*](#removeteammember)
  - [*UpdateTeamMemberRole*](#updateteammemberrole)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateOrganization*](#createorganization)
  - [*UpdateOrganization*](#updateorganization)
  - [*CreatePhaseTemplate*](#createphasetemplate)
  - [*UpdatePhaseTemplate*](#updatephasetemplate)
  - [*DeletePhaseTemplate*](#deletephasetemplate)
  - [*CreatePhaseTemplatePhase*](#createphasetemplatephase)
  - [*UpdatePhaseTemplatePhase*](#updatephasetemplatephase)
  - [*DeletePhaseTemplatePhase*](#deletephasetemplatephase)
  - [*CreatePortfolio*](#createportfolio)
  - [*UpdatePortfolio*](#updateportfolio)
  - [*DeletePortfolio*](#deleteportfolio)
  - [*CreateProductType*](#createproducttype)
  - [*UpdateProductType*](#updateproducttype)
  - [*DeleteProductType*](#deleteproducttype)
  - [*CreateProductTypePhaseConfig*](#createproducttypephaseconfig)
  - [*DeleteProductTypePhaseConfig*](#deleteproducttypephaseconfig)
  - [*CreateProject*](#createproject)
  - [*UpdateProject*](#updateproject)
  - [*DeleteProject*](#deleteproject)
  - [*CreateProjectPhase*](#createprojectphase)
  - [*UpdateProjectPhase*](#updateprojectphase)
  - [*DeleteProjectPhase*](#deleteprojectphase)

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `default`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `default` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## ListPrograms
You can execute the `ListPrograms` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListPrograms(dc: DataConnect, vars: ListProgramsVariables, options?: useDataConnectQueryOptions<ListProgramsData>): UseDataConnectQueryResult<ListProgramsData, ListProgramsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListPrograms(vars: ListProgramsVariables, options?: useDataConnectQueryOptions<ListProgramsData>): UseDataConnectQueryResult<ListProgramsData, ListProgramsVariables>;
```

### Variables
The `ListPrograms` Query requires an argument of type `ListProgramsVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListProgramsVariables {
  portfolioId: UUIDString;
}
```
### Return Type
Recall that calling the `ListPrograms` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListPrograms` Query is of type `ListProgramsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListPrograms`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListProgramsVariables } from '@firebasegen/default-connector';
import { useListPrograms } from '@firebasegen/default-connector/react'

export default function ListProgramsComponent() {
  // The `useListPrograms` Query hook requires an argument of type `ListProgramsVariables`:
  const listProgramsVars: ListProgramsVariables = {
    portfolioId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListPrograms(listProgramsVars);
  // Variables can be defined inline as well.
  const query = useListPrograms({ portfolioId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListPrograms(dataConnect, listProgramsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListPrograms(listProgramsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListPrograms(dataConnect, listProgramsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.programs);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetProgram
You can execute the `GetProgram` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetProgram(dc: DataConnect, vars: GetProgramVariables, options?: useDataConnectQueryOptions<GetProgramData>): UseDataConnectQueryResult<GetProgramData, GetProgramVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetProgram(vars: GetProgramVariables, options?: useDataConnectQueryOptions<GetProgramData>): UseDataConnectQueryResult<GetProgramData, GetProgramVariables>;
```

### Variables
The `GetProgram` Query requires an argument of type `GetProgramVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetProgramVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetProgram` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetProgram` Query is of type `GetProgramData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetProgram`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetProgramVariables } from '@firebasegen/default-connector';
import { useGetProgram } from '@firebasegen/default-connector/react'

export default function GetProgramComponent() {
  // The `useGetProgram` Query hook requires an argument of type `GetProgramVariables`:
  const getProgramVars: GetProgramVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetProgram(getProgramVars);
  // Variables can be defined inline as well.
  const query = useGetProgram({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetProgram(dataConnect, getProgramVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetProgram(getProgramVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetProgram(dataConnect, getProgramVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.program);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListProjectAssignments
You can execute the `ListProjectAssignments` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListProjectAssignments(dc: DataConnect, vars: ListProjectAssignmentsVariables, options?: useDataConnectQueryOptions<ListProjectAssignmentsData>): UseDataConnectQueryResult<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListProjectAssignments(vars: ListProjectAssignmentsVariables, options?: useDataConnectQueryOptions<ListProjectAssignmentsData>): UseDataConnectQueryResult<ListProjectAssignmentsData, ListProjectAssignmentsVariables>;
```

### Variables
The `ListProjectAssignments` Query requires an argument of type `ListProjectAssignmentsVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListProjectAssignmentsVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that calling the `ListProjectAssignments` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListProjectAssignments` Query is of type `ListProjectAssignmentsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListProjectAssignments`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListProjectAssignmentsVariables } from '@firebasegen/default-connector';
import { useListProjectAssignments } from '@firebasegen/default-connector/react'

export default function ListProjectAssignmentsComponent() {
  // The `useListProjectAssignments` Query hook requires an argument of type `ListProjectAssignmentsVariables`:
  const listProjectAssignmentsVars: ListProjectAssignmentsVariables = {
    projectId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListProjectAssignments(listProjectAssignmentsVars);
  // Variables can be defined inline as well.
  const query = useListProjectAssignments({ projectId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListProjectAssignments(dataConnect, listProjectAssignmentsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectAssignments(listProjectAssignmentsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectAssignments(dataConnect, listProjectAssignmentsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projectAssignments);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListUserAssignments
You can execute the `ListUserAssignments` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListUserAssignments(dc: DataConnect, vars: ListUserAssignmentsVariables, options?: useDataConnectQueryOptions<ListUserAssignmentsData>): UseDataConnectQueryResult<ListUserAssignmentsData, ListUserAssignmentsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListUserAssignments(vars: ListUserAssignmentsVariables, options?: useDataConnectQueryOptions<ListUserAssignmentsData>): UseDataConnectQueryResult<ListUserAssignmentsData, ListUserAssignmentsVariables>;
```

### Variables
The `ListUserAssignments` Query requires an argument of type `ListUserAssignmentsVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListUserAssignmentsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that calling the `ListUserAssignments` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListUserAssignments` Query is of type `ListUserAssignmentsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListUserAssignments`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListUserAssignmentsVariables } from '@firebasegen/default-connector';
import { useListUserAssignments } from '@firebasegen/default-connector/react'

export default function ListUserAssignmentsComponent() {
  // The `useListUserAssignments` Query hook requires an argument of type `ListUserAssignmentsVariables`:
  const listUserAssignmentsVars: ListUserAssignmentsVariables = {
    userId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListUserAssignments(listUserAssignmentsVars);
  // Variables can be defined inline as well.
  const query = useListUserAssignments({ userId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListUserAssignments(dataConnect, listUserAssignmentsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListUserAssignments(listUserAssignmentsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListUserAssignments(dataConnect, listUserAssignmentsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projectAssignments);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListAssignmentsByDateRange
You can execute the `ListAssignmentsByDateRange` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListAssignmentsByDateRange(dc: DataConnect, vars: ListAssignmentsByDateRangeVariables, options?: useDataConnectQueryOptions<ListAssignmentsByDateRangeData>): UseDataConnectQueryResult<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListAssignmentsByDateRange(vars: ListAssignmentsByDateRangeVariables, options?: useDataConnectQueryOptions<ListAssignmentsByDateRangeData>): UseDataConnectQueryResult<ListAssignmentsByDateRangeData, ListAssignmentsByDateRangeVariables>;
```

### Variables
The `ListAssignmentsByDateRange` Query requires an argument of type `ListAssignmentsByDateRangeVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListAssignmentsByDateRangeVariables {
  userId: UUIDString;
  startDate: DateString;
  endDate: DateString;
}
```
### Return Type
Recall that calling the `ListAssignmentsByDateRange` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListAssignmentsByDateRange` Query is of type `ListAssignmentsByDateRangeData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListAssignmentsByDateRange`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListAssignmentsByDateRangeVariables } from '@firebasegen/default-connector';
import { useListAssignmentsByDateRange } from '@firebasegen/default-connector/react'

export default function ListAssignmentsByDateRangeComponent() {
  // The `useListAssignmentsByDateRange` Query hook requires an argument of type `ListAssignmentsByDateRangeVariables`:
  const listAssignmentsByDateRangeVars: ListAssignmentsByDateRangeVariables = {
    userId: ..., 
    startDate: ..., 
    endDate: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListAssignmentsByDateRange(listAssignmentsByDateRangeVars);
  // Variables can be defined inline as well.
  const query = useListAssignmentsByDateRange({ userId: ..., startDate: ..., endDate: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListAssignmentsByDateRange(dataConnect, listAssignmentsByDateRangeVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListAssignmentsByDateRange(listAssignmentsByDateRangeVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListAssignmentsByDateRange(dataConnect, listAssignmentsByDateRangeVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projectAssignments);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTeams
You can execute the `ListTeams` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListTeams(dc: DataConnect, vars: ListTeamsVariables, options?: useDataConnectQueryOptions<ListTeamsData>): UseDataConnectQueryResult<ListTeamsData, ListTeamsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTeams(vars: ListTeamsVariables, options?: useDataConnectQueryOptions<ListTeamsData>): UseDataConnectQueryResult<ListTeamsData, ListTeamsVariables>;
```

### Variables
The `ListTeams` Query requires an argument of type `ListTeamsVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTeamsVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTeams` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTeams` Query is of type `ListTeamsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTeams`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTeamsVariables } from '@firebasegen/default-connector';
import { useListTeams } from '@firebasegen/default-connector/react'

export default function ListTeamsComponent() {
  // The `useListTeams` Query hook requires an argument of type `ListTeamsVariables`:
  const listTeamsVars: ListTeamsVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTeams(listTeamsVars);
  // Variables can be defined inline as well.
  const query = useListTeams({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTeams(dataConnect, listTeamsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTeams(listTeamsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTeams(dataConnect, listTeamsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.teams);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTeam
You can execute the `GetTeam` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetTeam(dc: DataConnect, vars: GetTeamVariables, options?: useDataConnectQueryOptions<GetTeamData>): UseDataConnectQueryResult<GetTeamData, GetTeamVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetTeam(vars: GetTeamVariables, options?: useDataConnectQueryOptions<GetTeamData>): UseDataConnectQueryResult<GetTeamData, GetTeamVariables>;
```

### Variables
The `GetTeam` Query requires an argument of type `GetTeamVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetTeamVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetTeam` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTeam` Query is of type `GetTeamData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTeam`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTeamVariables } from '@firebasegen/default-connector';
import { useGetTeam } from '@firebasegen/default-connector/react'

export default function GetTeamComponent() {
  // The `useGetTeam` Query hook requires an argument of type `GetTeamVariables`:
  const getTeamVars: GetTeamVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTeam(getTeamVars);
  // Variables can be defined inline as well.
  const query = useGetTeam({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTeam(dataConnect, getTeamVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTeam(getTeamVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTeam(dataConnect, getTeamVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.team);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListUsers
You can execute the `ListUsers` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListUsers(dc: DataConnect, vars: ListUsersVariables, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, ListUsersVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListUsers(vars: ListUsersVariables, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, ListUsersVariables>;
```

### Variables
The `ListUsers` Query requires an argument of type `ListUsersVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListUsersVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListUsers` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListUsers` Query is of type `ListUsersData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListUsers`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListUsersVariables } from '@firebasegen/default-connector';
import { useListUsers } from '@firebasegen/default-connector/react'

export default function ListUsersComponent() {
  // The `useListUsers` Query hook requires an argument of type `ListUsersVariables`:
  const listUsersVars: ListUsersVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListUsers(listUsersVars);
  // Variables can be defined inline as well.
  const query = useListUsers({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListUsers(dataConnect, listUsersVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListUsers(listUsersVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListUsers(dataConnect, listUsersVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.users);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUser
You can execute the `GetUser` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetUser(dc: DataConnect, vars: GetUserVariables, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, GetUserVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUser(vars: GetUserVariables, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, GetUserVariables>;
```

### Variables
The `GetUser` Query requires an argument of type `GetUserVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetUser` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUser` Query is of type `GetUserData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUser`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserVariables } from '@firebasegen/default-connector';
import { useGetUser } from '@firebasegen/default-connector/react'

export default function GetUserComponent() {
  // The `useGetUser` Query hook requires an argument of type `GetUserVariables`:
  const getUserVars: GetUserVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUser(getUserVars);
  // Variables can be defined inline as well.
  const query = useGetUser({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUser(dataConnect, getUserVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUser(getUserVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUser(dataConnect, getUserVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.user);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserByEmail
You can execute the `GetUserByEmail` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables, options?: useDataConnectQueryOptions<GetUserByEmailData>): UseDataConnectQueryResult<GetUserByEmailData, GetUserByEmailVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserByEmail(vars: GetUserByEmailVariables, options?: useDataConnectQueryOptions<GetUserByEmailData>): UseDataConnectQueryResult<GetUserByEmailData, GetUserByEmailVariables>;
```

### Variables
The `GetUserByEmail` Query requires an argument of type `GetUserByEmailVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserByEmailVariables {
  email: string;
}
```
### Return Type
Recall that calling the `GetUserByEmail` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserByEmail` Query is of type `GetUserByEmailData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserByEmail`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserByEmailVariables } from '@firebasegen/default-connector';
import { useGetUserByEmail } from '@firebasegen/default-connector/react'

export default function GetUserByEmailComponent() {
  // The `useGetUserByEmail` Query hook requires an argument of type `GetUserByEmailVariables`:
  const getUserByEmailVars: GetUserByEmailVariables = {
    email: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserByEmail(getUserByEmailVars);
  // Variables can be defined inline as well.
  const query = useGetUserByEmail({ email: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserByEmail(dataConnect, getUserByEmailVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserByEmail(getUserByEmailVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserByEmail(dataConnect, getUserByEmailVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.users);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserByFirebaseUid
You can execute the `GetUserByFirebaseUid` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetUserByFirebaseUid(dc: DataConnect, vars: GetUserByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetUserByFirebaseUidData>): UseDataConnectQueryResult<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserByFirebaseUid(vars: GetUserByFirebaseUidVariables, options?: useDataConnectQueryOptions<GetUserByFirebaseUidData>): UseDataConnectQueryResult<GetUserByFirebaseUidData, GetUserByFirebaseUidVariables>;
```

### Variables
The `GetUserByFirebaseUid` Query requires an argument of type `GetUserByFirebaseUidVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserByFirebaseUidVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that calling the `GetUserByFirebaseUid` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserByFirebaseUid` Query is of type `GetUserByFirebaseUidData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserByFirebaseUid`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserByFirebaseUidVariables } from '@firebasegen/default-connector';
import { useGetUserByFirebaseUid } from '@firebasegen/default-connector/react'

export default function GetUserByFirebaseUidComponent() {
  // The `useGetUserByFirebaseUid` Query hook requires an argument of type `GetUserByFirebaseUidVariables`:
  const getUserByFirebaseUidVars: GetUserByFirebaseUidVariables = {
    firebaseUid: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserByFirebaseUid(getUserByFirebaseUidVars);
  // Variables can be defined inline as well.
  const query = useGetUserByFirebaseUid({ firebaseUid: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserByFirebaseUid(dataConnect, getUserByFirebaseUidVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserByFirebaseUid(getUserByFirebaseUidVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserByFirebaseUid(dataConnect, getUserByFirebaseUidVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.users);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOrganization
You can execute the `GetOrganization` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: useDataConnectQueryOptions<GetOrganizationData>): UseDataConnectQueryResult<GetOrganizationData, GetOrganizationVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOrganization(vars: GetOrganizationVariables, options?: useDataConnectQueryOptions<GetOrganizationData>): UseDataConnectQueryResult<GetOrganizationData, GetOrganizationVariables>;
```

### Variables
The `GetOrganization` Query requires an argument of type `GetOrganizationVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOrganizationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetOrganization` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOrganization` Query is of type `GetOrganizationData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOrganization`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOrganizationVariables } from '@firebasegen/default-connector';
import { useGetOrganization } from '@firebasegen/default-connector/react'

export default function GetOrganizationComponent() {
  // The `useGetOrganization` Query hook requires an argument of type `GetOrganizationVariables`:
  const getOrganizationVars: GetOrganizationVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOrganization(getOrganizationVars);
  // Variables can be defined inline as well.
  const query = useGetOrganization({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOrganization(dataConnect, getOrganizationVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganization(getOrganizationVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOrganization(dataConnect, getOrganizationVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.organization);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListPhaseTemplates
You can execute the `ListPhaseTemplates` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListPhaseTemplates(dc: DataConnect, vars: ListPhaseTemplatesVariables, options?: useDataConnectQueryOptions<ListPhaseTemplatesData>): UseDataConnectQueryResult<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListPhaseTemplates(vars: ListPhaseTemplatesVariables, options?: useDataConnectQueryOptions<ListPhaseTemplatesData>): UseDataConnectQueryResult<ListPhaseTemplatesData, ListPhaseTemplatesVariables>;
```

### Variables
The `ListPhaseTemplates` Query requires an argument of type `ListPhaseTemplatesVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListPhaseTemplatesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListPhaseTemplates` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListPhaseTemplates` Query is of type `ListPhaseTemplatesData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListPhaseTemplates`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListPhaseTemplatesVariables } from '@firebasegen/default-connector';
import { useListPhaseTemplates } from '@firebasegen/default-connector/react'

export default function ListPhaseTemplatesComponent() {
  // The `useListPhaseTemplates` Query hook requires an argument of type `ListPhaseTemplatesVariables`:
  const listPhaseTemplatesVars: ListPhaseTemplatesVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListPhaseTemplates(listPhaseTemplatesVars);
  // Variables can be defined inline as well.
  const query = useListPhaseTemplates({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListPhaseTemplates(dataConnect, listPhaseTemplatesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListPhaseTemplates(listPhaseTemplatesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListPhaseTemplates(dataConnect, listPhaseTemplatesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.phaseTemplates);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetPhaseTemplate
You can execute the `GetPhaseTemplate` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetPhaseTemplate(dc: DataConnect, vars: GetPhaseTemplateVariables, options?: useDataConnectQueryOptions<GetPhaseTemplateData>): UseDataConnectQueryResult<GetPhaseTemplateData, GetPhaseTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetPhaseTemplate(vars: GetPhaseTemplateVariables, options?: useDataConnectQueryOptions<GetPhaseTemplateData>): UseDataConnectQueryResult<GetPhaseTemplateData, GetPhaseTemplateVariables>;
```

### Variables
The `GetPhaseTemplate` Query requires an argument of type `GetPhaseTemplateVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetPhaseTemplateVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetPhaseTemplate` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetPhaseTemplate` Query is of type `GetPhaseTemplateData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetPhaseTemplate`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetPhaseTemplateVariables } from '@firebasegen/default-connector';
import { useGetPhaseTemplate } from '@firebasegen/default-connector/react'

export default function GetPhaseTemplateComponent() {
  // The `useGetPhaseTemplate` Query hook requires an argument of type `GetPhaseTemplateVariables`:
  const getPhaseTemplateVars: GetPhaseTemplateVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetPhaseTemplate(getPhaseTemplateVars);
  // Variables can be defined inline as well.
  const query = useGetPhaseTemplate({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetPhaseTemplate(dataConnect, getPhaseTemplateVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetPhaseTemplate(getPhaseTemplateVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetPhaseTemplate(dataConnect, getPhaseTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.phaseTemplate);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListPhaseTemplatePhases
You can execute the `ListPhaseTemplatePhases` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListPhaseTemplatePhases(dc: DataConnect, vars: ListPhaseTemplatePhasesVariables, options?: useDataConnectQueryOptions<ListPhaseTemplatePhasesData>): UseDataConnectQueryResult<ListPhaseTemplatePhasesData, ListPhaseTemplatePhasesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListPhaseTemplatePhases(vars: ListPhaseTemplatePhasesVariables, options?: useDataConnectQueryOptions<ListPhaseTemplatePhasesData>): UseDataConnectQueryResult<ListPhaseTemplatePhasesData, ListPhaseTemplatePhasesVariables>;
```

### Variables
The `ListPhaseTemplatePhases` Query requires an argument of type `ListPhaseTemplatePhasesVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListPhaseTemplatePhasesVariables {
  templateId: UUIDString;
}
```
### Return Type
Recall that calling the `ListPhaseTemplatePhases` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListPhaseTemplatePhases` Query is of type `ListPhaseTemplatePhasesData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListPhaseTemplatePhasesData {
  phaseTemplatePhases: ({
    id: UUIDString;
    templateId: UUIDString;
    name: string;
    description?: string | null;
    durationWeeks?: number | null;
    order: number;
    createdAt: TimestampString;
  } & PhaseTemplatePhase_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListPhaseTemplatePhases`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListPhaseTemplatePhasesVariables } from '@firebasegen/default-connector';
import { useListPhaseTemplatePhases } from '@firebasegen/default-connector/react'

export default function ListPhaseTemplatePhasesComponent() {
  // The `useListPhaseTemplatePhases` Query hook requires an argument of type `ListPhaseTemplatePhasesVariables`:
  const listPhaseTemplatePhasesVars: ListPhaseTemplatePhasesVariables = {
    templateId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListPhaseTemplatePhases(listPhaseTemplatePhasesVars);
  // Variables can be defined inline as well.
  const query = useListPhaseTemplatePhases({ templateId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListPhaseTemplatePhases(dataConnect, listPhaseTemplatePhasesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListPhaseTemplatePhases(listPhaseTemplatePhasesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListPhaseTemplatePhases(dataConnect, listPhaseTemplatePhasesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.phaseTemplatePhases);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetDefaultTemplates
You can execute the `GetDefaultTemplates` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetDefaultTemplates(dc: DataConnect, vars: GetDefaultTemplatesVariables, options?: useDataConnectQueryOptions<GetDefaultTemplatesData>): UseDataConnectQueryResult<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetDefaultTemplates(vars: GetDefaultTemplatesVariables, options?: useDataConnectQueryOptions<GetDefaultTemplatesData>): UseDataConnectQueryResult<GetDefaultTemplatesData, GetDefaultTemplatesVariables>;
```

### Variables
The `GetDefaultTemplates` Query requires an argument of type `GetDefaultTemplatesVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetDefaultTemplatesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetDefaultTemplates` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetDefaultTemplates` Query is of type `GetDefaultTemplatesData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetDefaultTemplatesData {
  phaseTemplates: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & PhaseTemplate_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetDefaultTemplates`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetDefaultTemplatesVariables } from '@firebasegen/default-connector';
import { useGetDefaultTemplates } from '@firebasegen/default-connector/react'

export default function GetDefaultTemplatesComponent() {
  // The `useGetDefaultTemplates` Query hook requires an argument of type `GetDefaultTemplatesVariables`:
  const getDefaultTemplatesVars: GetDefaultTemplatesVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetDefaultTemplates(getDefaultTemplatesVars);
  // Variables can be defined inline as well.
  const query = useGetDefaultTemplates({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetDefaultTemplates(dataConnect, getDefaultTemplatesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetDefaultTemplates(getDefaultTemplatesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetDefaultTemplates(dataConnect, getDefaultTemplatesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.phaseTemplates);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListPortfolios
You can execute the `ListPortfolios` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListPortfolios(dc: DataConnect, vars: ListPortfoliosVariables, options?: useDataConnectQueryOptions<ListPortfoliosData>): UseDataConnectQueryResult<ListPortfoliosData, ListPortfoliosVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListPortfolios(vars: ListPortfoliosVariables, options?: useDataConnectQueryOptions<ListPortfoliosData>): UseDataConnectQueryResult<ListPortfoliosData, ListPortfoliosVariables>;
```

### Variables
The `ListPortfolios` Query requires an argument of type `ListPortfoliosVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListPortfoliosVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListPortfolios` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListPortfolios` Query is of type `ListPortfoliosData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListPortfolios`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListPortfoliosVariables } from '@firebasegen/default-connector';
import { useListPortfolios } from '@firebasegen/default-connector/react'

export default function ListPortfoliosComponent() {
  // The `useListPortfolios` Query hook requires an argument of type `ListPortfoliosVariables`:
  const listPortfoliosVars: ListPortfoliosVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListPortfolios(listPortfoliosVars);
  // Variables can be defined inline as well.
  const query = useListPortfolios({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListPortfolios(dataConnect, listPortfoliosVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListPortfolios(listPortfoliosVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListPortfolios(dataConnect, listPortfoliosVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.portfolios);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetPortfolio
You can execute the `GetPortfolio` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetPortfolio(dc: DataConnect, vars: GetPortfolioVariables, options?: useDataConnectQueryOptions<GetPortfolioData>): UseDataConnectQueryResult<GetPortfolioData, GetPortfolioVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetPortfolio(vars: GetPortfolioVariables, options?: useDataConnectQueryOptions<GetPortfolioData>): UseDataConnectQueryResult<GetPortfolioData, GetPortfolioVariables>;
```

### Variables
The `GetPortfolio` Query requires an argument of type `GetPortfolioVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetPortfolioVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetPortfolio` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetPortfolio` Query is of type `GetPortfolioData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetPortfolio`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetPortfolioVariables } from '@firebasegen/default-connector';
import { useGetPortfolio } from '@firebasegen/default-connector/react'

export default function GetPortfolioComponent() {
  // The `useGetPortfolio` Query hook requires an argument of type `GetPortfolioVariables`:
  const getPortfolioVars: GetPortfolioVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetPortfolio(getPortfolioVars);
  // Variables can be defined inline as well.
  const query = useGetPortfolio({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetPortfolio(dataConnect, getPortfolioVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetPortfolio(getPortfolioVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetPortfolio(dataConnect, getPortfolioVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.portfolio);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListProductTypes
You can execute the `ListProductTypes` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListProductTypes(dc: DataConnect, vars: ListProductTypesVariables, options?: useDataConnectQueryOptions<ListProductTypesData>): UseDataConnectQueryResult<ListProductTypesData, ListProductTypesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListProductTypes(vars: ListProductTypesVariables, options?: useDataConnectQueryOptions<ListProductTypesData>): UseDataConnectQueryResult<ListProductTypesData, ListProductTypesVariables>;
```

### Variables
The `ListProductTypes` Query requires an argument of type `ListProductTypesVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListProductTypesVariables {
  organizationId: UUIDString;
}
```
### Return Type
Recall that calling the `ListProductTypes` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListProductTypes` Query is of type `ListProductTypesData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListProductTypes`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListProductTypesVariables } from '@firebasegen/default-connector';
import { useListProductTypes } from '@firebasegen/default-connector/react'

export default function ListProductTypesComponent() {
  // The `useListProductTypes` Query hook requires an argument of type `ListProductTypesVariables`:
  const listProductTypesVars: ListProductTypesVariables = {
    organizationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListProductTypes(listProductTypesVars);
  // Variables can be defined inline as well.
  const query = useListProductTypes({ organizationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListProductTypes(dataConnect, listProductTypesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListProductTypes(listProductTypesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListProductTypes(dataConnect, listProductTypesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.productTypes);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetProductType
You can execute the `GetProductType` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetProductType(dc: DataConnect, vars: GetProductTypeVariables, options?: useDataConnectQueryOptions<GetProductTypeData>): UseDataConnectQueryResult<GetProductTypeData, GetProductTypeVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetProductType(vars: GetProductTypeVariables, options?: useDataConnectQueryOptions<GetProductTypeData>): UseDataConnectQueryResult<GetProductTypeData, GetProductTypeVariables>;
```

### Variables
The `GetProductType` Query requires an argument of type `GetProductTypeVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetProductTypeVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetProductType` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetProductType` Query is of type `GetProductTypeData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetProductType`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetProductTypeVariables } from '@firebasegen/default-connector';
import { useGetProductType } from '@firebasegen/default-connector/react'

export default function GetProductTypeComponent() {
  // The `useGetProductType` Query hook requires an argument of type `GetProductTypeVariables`:
  const getProductTypeVars: GetProductTypeVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetProductType(getProductTypeVars);
  // Variables can be defined inline as well.
  const query = useGetProductType({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetProductType(dataConnect, getProductTypeVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetProductType(getProductTypeVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetProductType(dataConnect, getProductTypeVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.productType);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListProjects
You can execute the `ListProjects` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListProjects(dc: DataConnect, vars: ListProjectsVariables, options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, ListProjectsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListProjects(vars: ListProjectsVariables, options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, ListProjectsVariables>;
```

### Variables
The `ListProjects` Query requires an argument of type `ListProjectsVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListProjectsVariables {
  programId: UUIDString;
}
```
### Return Type
Recall that calling the `ListProjects` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListProjects` Query is of type `ListProjectsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListProjects`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListProjectsVariables } from '@firebasegen/default-connector';
import { useListProjects } from '@firebasegen/default-connector/react'

export default function ListProjectsComponent() {
  // The `useListProjects` Query hook requires an argument of type `ListProjectsVariables`:
  const listProjectsVars: ListProjectsVariables = {
    programId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListProjects(listProjectsVars);
  // Variables can be defined inline as well.
  const query = useListProjects({ programId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListProjects(dataConnect, listProjectsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListProjects(listProjectsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListProjects(dataConnect, listProjectsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projects);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetProject
You can execute the `GetProject` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetProject(dc: DataConnect, vars: GetProjectVariables, options?: useDataConnectQueryOptions<GetProjectData>): UseDataConnectQueryResult<GetProjectData, GetProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetProject(vars: GetProjectVariables, options?: useDataConnectQueryOptions<GetProjectData>): UseDataConnectQueryResult<GetProjectData, GetProjectVariables>;
```

### Variables
The `GetProject` Query requires an argument of type `GetProjectVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetProject` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetProject` Query is of type `GetProjectData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetProject`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetProjectVariables } from '@firebasegen/default-connector';
import { useGetProject } from '@firebasegen/default-connector/react'

export default function GetProjectComponent() {
  // The `useGetProject` Query hook requires an argument of type `GetProjectVariables`:
  const getProjectVars: GetProjectVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetProject(getProjectVars);
  // Variables can be defined inline as well.
  const query = useGetProject({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetProject(dataConnect, getProjectVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetProject(getProjectVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetProject(dataConnect, getProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.project);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListProjectsByStatus
You can execute the `ListProjectsByStatus` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListProjectsByStatus(dc: DataConnect, vars: ListProjectsByStatusVariables, options?: useDataConnectQueryOptions<ListProjectsByStatusData>): UseDataConnectQueryResult<ListProjectsByStatusData, ListProjectsByStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListProjectsByStatus(vars: ListProjectsByStatusVariables, options?: useDataConnectQueryOptions<ListProjectsByStatusData>): UseDataConnectQueryResult<ListProjectsByStatusData, ListProjectsByStatusVariables>;
```

### Variables
The `ListProjectsByStatus` Query requires an argument of type `ListProjectsByStatusVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListProjectsByStatusVariables {
  status: ProjectStatus;
}
```
### Return Type
Recall that calling the `ListProjectsByStatus` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListProjectsByStatus` Query is of type `ListProjectsByStatusData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListProjectsByStatus`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListProjectsByStatusVariables } from '@firebasegen/default-connector';
import { useListProjectsByStatus } from '@firebasegen/default-connector/react'

export default function ListProjectsByStatusComponent() {
  // The `useListProjectsByStatus` Query hook requires an argument of type `ListProjectsByStatusVariables`:
  const listProjectsByStatusVars: ListProjectsByStatusVariables = {
    status: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListProjectsByStatus(listProjectsByStatusVars);
  // Variables can be defined inline as well.
  const query = useListProjectsByStatus({ status: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListProjectsByStatus(dataConnect, listProjectsByStatusVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectsByStatus(listProjectsByStatusVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectsByStatus(dataConnect, listProjectsByStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projects);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListProjectPhases
You can execute the `ListProjectPhases` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListProjectPhases(dc: DataConnect, vars: ListProjectPhasesVariables, options?: useDataConnectQueryOptions<ListProjectPhasesData>): UseDataConnectQueryResult<ListProjectPhasesData, ListProjectPhasesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListProjectPhases(vars: ListProjectPhasesVariables, options?: useDataConnectQueryOptions<ListProjectPhasesData>): UseDataConnectQueryResult<ListProjectPhasesData, ListProjectPhasesVariables>;
```

### Variables
The `ListProjectPhases` Query requires an argument of type `ListProjectPhasesVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListProjectPhasesVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that calling the `ListProjectPhases` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListProjectPhases` Query is of type `ListProjectPhasesData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListProjectPhases`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListProjectPhasesVariables } from '@firebasegen/default-connector';
import { useListProjectPhases } from '@firebasegen/default-connector/react'

export default function ListProjectPhasesComponent() {
  // The `useListProjectPhases` Query hook requires an argument of type `ListProjectPhasesVariables`:
  const listProjectPhasesVars: ListProjectPhasesVariables = {
    projectId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListProjectPhases(listProjectPhasesVars);
  // Variables can be defined inline as well.
  const query = useListProjectPhases({ projectId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListProjectPhases(dataConnect, listProjectPhasesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectPhases(listProjectPhasesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListProjectPhases(dataConnect, listProjectPhasesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projectPhases);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetProjectPhase
You can execute the `GetProjectPhase` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetProjectPhase(dc: DataConnect, vars: GetProjectPhaseVariables, options?: useDataConnectQueryOptions<GetProjectPhaseData>): UseDataConnectQueryResult<GetProjectPhaseData, GetProjectPhaseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetProjectPhase(vars: GetProjectPhaseVariables, options?: useDataConnectQueryOptions<GetProjectPhaseData>): UseDataConnectQueryResult<GetProjectPhaseData, GetProjectPhaseVariables>;
```

### Variables
The `GetProjectPhase` Query requires an argument of type `GetProjectPhaseVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetProjectPhaseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetProjectPhase` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetProjectPhase` Query is of type `GetProjectPhaseData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetProjectPhase`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetProjectPhaseVariables } from '@firebasegen/default-connector';
import { useGetProjectPhase } from '@firebasegen/default-connector/react'

export default function GetProjectPhaseComponent() {
  // The `useGetProjectPhase` Query hook requires an argument of type `GetProjectPhaseVariables`:
  const getProjectPhaseVars: GetProjectPhaseVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetProjectPhase(getProjectPhaseVars);
  // Variables can be defined inline as well.
  const query = useGetProjectPhase({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetProjectPhase(dataConnect, getProjectPhaseVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetProjectPhase(getProjectPhaseVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetProjectPhase(dataConnect, getProjectPhaseVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.projectPhase);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `default` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateProgram
You can execute the `CreateProgram` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateProgram(options?: useDataConnectMutationOptions<CreateProgramData, FirebaseError, CreateProgramVariables>): UseDataConnectMutationResult<CreateProgramData, CreateProgramVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateProgram(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProgramData, FirebaseError, CreateProgramVariables>): UseDataConnectMutationResult<CreateProgramData, CreateProgramVariables>;
```

### Variables
The `CreateProgram` Mutation requires an argument of type `CreateProgramVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateProgramVariables {
  portfolioId: UUIDString;
  name: string;
  description?: string | null;
  ownerId?: UUIDString | null;
}
```
### Return Type
Recall that calling the `CreateProgram` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateProgram` Mutation is of type `CreateProgramData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProgramData {
  program_insert: Program_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateProgram`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateProgramVariables } from '@firebasegen/default-connector';
import { useCreateProgram } from '@firebasegen/default-connector/react'

export default function CreateProgramComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateProgram();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateProgram(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProgram(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProgram(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateProgram` Mutation requires an argument of type `CreateProgramVariables`:
  const createProgramVars: CreateProgramVariables = {
    portfolioId: ..., 
    name: ..., 
    description: ..., // optional
    ownerId: ..., // optional
  };
  mutation.mutate(createProgramVars);
  // Variables can be defined inline as well.
  mutation.mutate({ portfolioId: ..., name: ..., description: ..., ownerId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createProgramVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.program_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateProgram
You can execute the `UpdateProgram` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateProgram(options?: useDataConnectMutationOptions<UpdateProgramData, FirebaseError, UpdateProgramVariables>): UseDataConnectMutationResult<UpdateProgramData, UpdateProgramVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateProgram(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProgramData, FirebaseError, UpdateProgramVariables>): UseDataConnectMutationResult<UpdateProgramData, UpdateProgramVariables>;
```

### Variables
The `UpdateProgram` Mutation requires an argument of type `UpdateProgramVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateProgramVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  ownerId?: UUIDString | null;
}
```
### Return Type
Recall that calling the `UpdateProgram` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateProgram` Mutation is of type `UpdateProgramData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProgramData {
  program_update?: Program_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateProgram`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateProgramVariables } from '@firebasegen/default-connector';
import { useUpdateProgram } from '@firebasegen/default-connector/react'

export default function UpdateProgramComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateProgram();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateProgram(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProgram(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProgram(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateProgram` Mutation requires an argument of type `UpdateProgramVariables`:
  const updateProgramVars: UpdateProgramVariables = {
    id: ..., 
    name: ..., // optional
    description: ..., // optional
    ownerId: ..., // optional
  };
  mutation.mutate(updateProgramVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., description: ..., ownerId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateProgramVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.program_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteProgram
You can execute the `DeleteProgram` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteProgram(options?: useDataConnectMutationOptions<DeleteProgramData, FirebaseError, DeleteProgramVariables>): UseDataConnectMutationResult<DeleteProgramData, DeleteProgramVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteProgram(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProgramData, FirebaseError, DeleteProgramVariables>): UseDataConnectMutationResult<DeleteProgramData, DeleteProgramVariables>;
```

### Variables
The `DeleteProgram` Mutation requires an argument of type `DeleteProgramVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteProgramVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteProgram` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteProgram` Mutation is of type `DeleteProgramData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteProgramData {
  program_delete?: Program_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteProgram`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteProgramVariables } from '@firebasegen/default-connector';
import { useDeleteProgram } from '@firebasegen/default-connector/react'

export default function DeleteProgramComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteProgram();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteProgram(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProgram(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProgram(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteProgram` Mutation requires an argument of type `DeleteProgramVariables`:
  const deleteProgramVars: DeleteProgramVariables = {
    id: ..., 
  };
  mutation.mutate(deleteProgramVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteProgramVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.program_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateProjectAssignment
You can execute the `CreateProjectAssignment` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateProjectAssignment(options?: useDataConnectMutationOptions<CreateProjectAssignmentData, FirebaseError, CreateProjectAssignmentVariables>): UseDataConnectMutationResult<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateProjectAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectAssignmentData, FirebaseError, CreateProjectAssignmentVariables>): UseDataConnectMutationResult<CreateProjectAssignmentData, CreateProjectAssignmentVariables>;
```

### Variables
The `CreateProjectAssignment` Mutation requires an argument of type `CreateProjectAssignmentVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateProjectAssignment` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateProjectAssignment` Mutation is of type `CreateProjectAssignmentData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProjectAssignmentData {
  projectAssignment_insert: ProjectAssignment_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateProjectAssignment`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateProjectAssignmentVariables } from '@firebasegen/default-connector';
import { useCreateProjectAssignment } from '@firebasegen/default-connector/react'

export default function CreateProjectAssignmentComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateProjectAssignment();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateProjectAssignment(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectAssignment(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectAssignment(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateProjectAssignment` Mutation requires an argument of type `CreateProjectAssignmentVariables`:
  const createProjectAssignmentVars: CreateProjectAssignmentVariables = {
    projectId: ..., 
    userId: ..., 
    allocationPercent: ..., 
    startDate: ..., 
    endDate: ..., // optional
    notes: ..., // optional
  };
  mutation.mutate(createProjectAssignmentVars);
  // Variables can be defined inline as well.
  mutation.mutate({ projectId: ..., userId: ..., allocationPercent: ..., startDate: ..., endDate: ..., notes: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createProjectAssignmentVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectAssignment_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateProjectAssignment
You can execute the `UpdateProjectAssignment` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateProjectAssignment(options?: useDataConnectMutationOptions<UpdateProjectAssignmentData, FirebaseError, UpdateProjectAssignmentVariables>): UseDataConnectMutationResult<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateProjectAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectAssignmentData, FirebaseError, UpdateProjectAssignmentVariables>): UseDataConnectMutationResult<UpdateProjectAssignmentData, UpdateProjectAssignmentVariables>;
```

### Variables
The `UpdateProjectAssignment` Mutation requires an argument of type `UpdateProjectAssignmentVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateProjectAssignmentVariables {
  id: UUIDString;
  allocationPercent?: number | null;
  startDate?: DateString | null;
  endDate?: DateString | null;
  notes?: string | null;
}
```
### Return Type
Recall that calling the `UpdateProjectAssignment` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateProjectAssignment` Mutation is of type `UpdateProjectAssignmentData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProjectAssignmentData {
  projectAssignment_update?: ProjectAssignment_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateProjectAssignment`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateProjectAssignmentVariables } from '@firebasegen/default-connector';
import { useUpdateProjectAssignment } from '@firebasegen/default-connector/react'

export default function UpdateProjectAssignmentComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateProjectAssignment();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateProjectAssignment(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProjectAssignment(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProjectAssignment(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateProjectAssignment` Mutation requires an argument of type `UpdateProjectAssignmentVariables`:
  const updateProjectAssignmentVars: UpdateProjectAssignmentVariables = {
    id: ..., 
    allocationPercent: ..., // optional
    startDate: ..., // optional
    endDate: ..., // optional
    notes: ..., // optional
  };
  mutation.mutate(updateProjectAssignmentVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., allocationPercent: ..., startDate: ..., endDate: ..., notes: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateProjectAssignmentVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectAssignment_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteProjectAssignment
You can execute the `DeleteProjectAssignment` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteProjectAssignment(options?: useDataConnectMutationOptions<DeleteProjectAssignmentData, FirebaseError, DeleteProjectAssignmentVariables>): UseDataConnectMutationResult<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteProjectAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectAssignmentData, FirebaseError, DeleteProjectAssignmentVariables>): UseDataConnectMutationResult<DeleteProjectAssignmentData, DeleteProjectAssignmentVariables>;
```

### Variables
The `DeleteProjectAssignment` Mutation requires an argument of type `DeleteProjectAssignmentVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteProjectAssignmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteProjectAssignment` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteProjectAssignment` Mutation is of type `DeleteProjectAssignmentData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteProjectAssignmentData {
  projectAssignment_delete?: ProjectAssignment_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteProjectAssignment`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteProjectAssignmentVariables } from '@firebasegen/default-connector';
import { useDeleteProjectAssignment } from '@firebasegen/default-connector/react'

export default function DeleteProjectAssignmentComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteProjectAssignment();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteProjectAssignment(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProjectAssignment(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProjectAssignment(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteProjectAssignment` Mutation requires an argument of type `DeleteProjectAssignmentVariables`:
  const deleteProjectAssignmentVars: DeleteProjectAssignmentVariables = {
    id: ..., 
  };
  mutation.mutate(deleteProjectAssignmentVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteProjectAssignmentVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectAssignment_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTeam
You can execute the `CreateTeam` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTeam(options?: useDataConnectMutationOptions<CreateTeamData, FirebaseError, CreateTeamVariables>): UseDataConnectMutationResult<CreateTeamData, CreateTeamVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTeam(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTeamData, FirebaseError, CreateTeamVariables>): UseDataConnectMutationResult<CreateTeamData, CreateTeamVariables>;
```

### Variables
The `CreateTeam` Mutation requires an argument of type `CreateTeamVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTeamVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
  parentTeamId?: UUIDString | null;
}
```
### Return Type
Recall that calling the `CreateTeam` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTeam` Mutation is of type `CreateTeamData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTeamData {
  team_insert: Team_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTeam`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTeamVariables } from '@firebasegen/default-connector';
import { useCreateTeam } from '@firebasegen/default-connector/react'

export default function CreateTeamComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTeam();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTeam(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTeam(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTeam(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTeam` Mutation requires an argument of type `CreateTeamVariables`:
  const createTeamVars: CreateTeamVariables = {
    organizationId: ..., 
    name: ..., 
    description: ..., // optional
    parentTeamId: ..., // optional
  };
  mutation.mutate(createTeamVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., name: ..., description: ..., parentTeamId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTeamVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.team_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTeam
You can execute the `UpdateTeam` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTeam(options?: useDataConnectMutationOptions<UpdateTeamData, FirebaseError, UpdateTeamVariables>): UseDataConnectMutationResult<UpdateTeamData, UpdateTeamVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTeam(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTeamData, FirebaseError, UpdateTeamVariables>): UseDataConnectMutationResult<UpdateTeamData, UpdateTeamVariables>;
```

### Variables
The `UpdateTeam` Mutation requires an argument of type `UpdateTeamVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateTeamVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  parentTeamId?: UUIDString | null;
}
```
### Return Type
Recall that calling the `UpdateTeam` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTeam` Mutation is of type `UpdateTeamData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTeamData {
  team_update?: Team_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTeam`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTeamVariables } from '@firebasegen/default-connector';
import { useUpdateTeam } from '@firebasegen/default-connector/react'

export default function UpdateTeamComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTeam();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTeam(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTeam(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTeam(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTeam` Mutation requires an argument of type `UpdateTeamVariables`:
  const updateTeamVars: UpdateTeamVariables = {
    id: ..., 
    name: ..., // optional
    description: ..., // optional
    parentTeamId: ..., // optional
  };
  mutation.mutate(updateTeamVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., description: ..., parentTeamId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTeamVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.team_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTeam
You can execute the `DeleteTeam` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteTeam(options?: useDataConnectMutationOptions<DeleteTeamData, FirebaseError, DeleteTeamVariables>): UseDataConnectMutationResult<DeleteTeamData, DeleteTeamVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteTeam(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTeamData, FirebaseError, DeleteTeamVariables>): UseDataConnectMutationResult<DeleteTeamData, DeleteTeamVariables>;
```

### Variables
The `DeleteTeam` Mutation requires an argument of type `DeleteTeamVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteTeamVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTeam` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTeam` Mutation is of type `DeleteTeamData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteTeamData {
  team_delete?: Team_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTeam`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTeamVariables } from '@firebasegen/default-connector';
import { useDeleteTeam } from '@firebasegen/default-connector/react'

export default function DeleteTeamComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTeam();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTeam(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTeam(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTeam(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTeam` Mutation requires an argument of type `DeleteTeamVariables`:
  const deleteTeamVars: DeleteTeamVariables = {
    id: ..., 
  };
  mutation.mutate(deleteTeamVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTeamVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.team_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AddTeamMember
You can execute the `AddTeamMember` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useAddTeamMember(options?: useDataConnectMutationOptions<AddTeamMemberData, FirebaseError, AddTeamMemberVariables>): UseDataConnectMutationResult<AddTeamMemberData, AddTeamMemberVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAddTeamMember(dc: DataConnect, options?: useDataConnectMutationOptions<AddTeamMemberData, FirebaseError, AddTeamMemberVariables>): UseDataConnectMutationResult<AddTeamMemberData, AddTeamMemberVariables>;
```

### Variables
The `AddTeamMember` Mutation requires an argument of type `AddTeamMemberVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AddTeamMemberVariables {
  teamId: UUIDString;
  userId: UUIDString;
  role?: string | null;
}
```
### Return Type
Recall that calling the `AddTeamMember` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AddTeamMember` Mutation is of type `AddTeamMemberData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AddTeamMemberData {
  teamMember_insert: TeamMember_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AddTeamMember`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AddTeamMemberVariables } from '@firebasegen/default-connector';
import { useAddTeamMember } from '@firebasegen/default-connector/react'

export default function AddTeamMemberComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAddTeamMember();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAddTeamMember(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddTeamMember(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddTeamMember(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAddTeamMember` Mutation requires an argument of type `AddTeamMemberVariables`:
  const addTeamMemberVars: AddTeamMemberVariables = {
    teamId: ..., 
    userId: ..., 
    role: ..., // optional
  };
  mutation.mutate(addTeamMemberVars);
  // Variables can be defined inline as well.
  mutation.mutate({ teamId: ..., userId: ..., role: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(addTeamMemberVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.teamMember_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RemoveTeamMember
You can execute the `RemoveTeamMember` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useRemoveTeamMember(options?: useDataConnectMutationOptions<RemoveTeamMemberData, FirebaseError, RemoveTeamMemberVariables>): UseDataConnectMutationResult<RemoveTeamMemberData, RemoveTeamMemberVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRemoveTeamMember(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveTeamMemberData, FirebaseError, RemoveTeamMemberVariables>): UseDataConnectMutationResult<RemoveTeamMemberData, RemoveTeamMemberVariables>;
```

### Variables
The `RemoveTeamMember` Mutation requires an argument of type `RemoveTeamMemberVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RemoveTeamMemberVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `RemoveTeamMember` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RemoveTeamMember` Mutation is of type `RemoveTeamMemberData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RemoveTeamMemberData {
  teamMember_delete?: TeamMember_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RemoveTeamMember`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RemoveTeamMemberVariables } from '@firebasegen/default-connector';
import { useRemoveTeamMember } from '@firebasegen/default-connector/react'

export default function RemoveTeamMemberComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRemoveTeamMember();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRemoveTeamMember(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveTeamMember(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveTeamMember(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRemoveTeamMember` Mutation requires an argument of type `RemoveTeamMemberVariables`:
  const removeTeamMemberVars: RemoveTeamMemberVariables = {
    id: ..., 
  };
  mutation.mutate(removeTeamMemberVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(removeTeamMemberVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.teamMember_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTeamMemberRole
You can execute the `UpdateTeamMemberRole` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTeamMemberRole(options?: useDataConnectMutationOptions<UpdateTeamMemberRoleData, FirebaseError, UpdateTeamMemberRoleVariables>): UseDataConnectMutationResult<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTeamMemberRole(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTeamMemberRoleData, FirebaseError, UpdateTeamMemberRoleVariables>): UseDataConnectMutationResult<UpdateTeamMemberRoleData, UpdateTeamMemberRoleVariables>;
```

### Variables
The `UpdateTeamMemberRole` Mutation requires an argument of type `UpdateTeamMemberRoleVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateTeamMemberRoleVariables {
  id: UUIDString;
  role?: string | null;
}
```
### Return Type
Recall that calling the `UpdateTeamMemberRole` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTeamMemberRole` Mutation is of type `UpdateTeamMemberRoleData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTeamMemberRoleData {
  teamMember_update?: TeamMember_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTeamMemberRole`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTeamMemberRoleVariables } from '@firebasegen/default-connector';
import { useUpdateTeamMemberRole } from '@firebasegen/default-connector/react'

export default function UpdateTeamMemberRoleComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTeamMemberRole();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTeamMemberRole(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTeamMemberRole(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTeamMemberRole(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTeamMemberRole` Mutation requires an argument of type `UpdateTeamMemberRoleVariables`:
  const updateTeamMemberRoleVars: UpdateTeamMemberRoleVariables = {
    id: ..., 
    role: ..., // optional
  };
  mutation.mutate(updateTeamMemberRoleVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., role: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTeamMemberRoleVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.teamMember_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateUser
You can execute the `CreateUser` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
```

### Variables
The `CreateUser` Mutation requires an argument of type `CreateUserVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateUserVariables {
  organizationId: UUIDString;
  email: string;
  name: string;
  role?: UserRole | null;
  firebaseUid: string;
}
```
### Return Type
Recall that calling the `CreateUser` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateUser` Mutation is of type `CreateUserData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateUserData {
  user_insert: User_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateUser`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateUserVariables } from '@firebasegen/default-connector';
import { useCreateUser } from '@firebasegen/default-connector/react'

export default function CreateUserComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateUser();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateUser(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateUser(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateUser` Mutation requires an argument of type `CreateUserVariables`:
  const createUserVars: CreateUserVariables = {
    organizationId: ..., 
    email: ..., 
    name: ..., 
    role: ..., // optional
    firebaseUid: ..., 
  };
  mutation.mutate(createUserVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., email: ..., name: ..., role: ..., firebaseUid: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createUserVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateUser
You can execute the `UpdateUser` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
```

### Variables
The `UpdateUser` Mutation requires an argument of type `UpdateUserVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateUserVariables {
  id: UUIDString;
  name?: string | null;
  role?: UserRole | null;
}
```
### Return Type
Recall that calling the `UpdateUser` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateUser` Mutation is of type `UpdateUserData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateUser`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateUserVariables } from '@firebasegen/default-connector';
import { useUpdateUser } from '@firebasegen/default-connector/react'

export default function UpdateUserComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateUser();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateUser(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateUser(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateUser` Mutation requires an argument of type `UpdateUserVariables`:
  const updateUserVars: UpdateUserVariables = {
    id: ..., 
    name: ..., // optional
    role: ..., // optional
  };
  mutation.mutate(updateUserVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., role: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateUserVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteUser
You can execute the `DeleteUser` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, DeleteUserVariables>): UseDataConnectMutationResult<DeleteUserData, DeleteUserVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, DeleteUserVariables>): UseDataConnectMutationResult<DeleteUserData, DeleteUserVariables>;
```

### Variables
The `DeleteUser` Mutation requires an argument of type `DeleteUserVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteUserVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteUser` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteUser` Mutation is of type `DeleteUserData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteUser`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteUserVariables } from '@firebasegen/default-connector';
import { useDeleteUser } from '@firebasegen/default-connector/react'

export default function DeleteUserComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteUser();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteUser(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteUser(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteUser` Mutation requires an argument of type `DeleteUserVariables`:
  const deleteUserVars: DeleteUserVariables = {
    id: ..., 
  };
  mutation.mutate(deleteUserVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteUserVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateOrganization
You can execute the `CreateOrganization` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateOrganization(options?: useDataConnectMutationOptions<CreateOrganizationData, FirebaseError, CreateOrganizationVariables>): UseDataConnectMutationResult<CreateOrganizationData, CreateOrganizationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateOrganization(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrganizationData, FirebaseError, CreateOrganizationVariables>): UseDataConnectMutationResult<CreateOrganizationData, CreateOrganizationVariables>;
```

### Variables
The `CreateOrganization` Mutation requires an argument of type `CreateOrganizationVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateOrganizationVariables {
  name: string;
  fiscalYearStartMonth?: number | null;
}
```
### Return Type
Recall that calling the `CreateOrganization` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateOrganization` Mutation is of type `CreateOrganizationData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateOrganizationData {
  organization_insert: Organization_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateOrganization`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateOrganizationVariables } from '@firebasegen/default-connector';
import { useCreateOrganization } from '@firebasegen/default-connector/react'

export default function CreateOrganizationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateOrganization();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateOrganization(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateOrganization(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateOrganization(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateOrganization` Mutation requires an argument of type `CreateOrganizationVariables`:
  const createOrganizationVars: CreateOrganizationVariables = {
    name: ..., 
    fiscalYearStartMonth: ..., // optional
  };
  mutation.mutate(createOrganizationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., fiscalYearStartMonth: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createOrganizationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.organization_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateOrganization
You can execute the `UpdateOrganization` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateOrganization(options?: useDataConnectMutationOptions<UpdateOrganizationData, FirebaseError, UpdateOrganizationVariables>): UseDataConnectMutationResult<UpdateOrganizationData, UpdateOrganizationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateOrganization(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateOrganizationData, FirebaseError, UpdateOrganizationVariables>): UseDataConnectMutationResult<UpdateOrganizationData, UpdateOrganizationVariables>;
```

### Variables
The `UpdateOrganization` Mutation requires an argument of type `UpdateOrganizationVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateOrganizationVariables {
  id: UUIDString;
  name?: string | null;
  fiscalYearStartMonth?: number | null;
}
```
### Return Type
Recall that calling the `UpdateOrganization` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateOrganization` Mutation is of type `UpdateOrganizationData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateOrganization`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateOrganizationVariables } from '@firebasegen/default-connector';
import { useUpdateOrganization } from '@firebasegen/default-connector/react'

export default function UpdateOrganizationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateOrganization();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateOrganization(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateOrganization(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateOrganization(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateOrganization` Mutation requires an argument of type `UpdateOrganizationVariables`:
  const updateOrganizationVars: UpdateOrganizationVariables = {
    id: ..., 
    name: ..., // optional
    fiscalYearStartMonth: ..., // optional
  };
  mutation.mutate(updateOrganizationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., fiscalYearStartMonth: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateOrganizationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.organization_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreatePhaseTemplate
You can execute the `CreatePhaseTemplate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreatePhaseTemplate(options?: useDataConnectMutationOptions<CreatePhaseTemplateData, FirebaseError, CreatePhaseTemplateVariables>): UseDataConnectMutationResult<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreatePhaseTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePhaseTemplateData, FirebaseError, CreatePhaseTemplateVariables>): UseDataConnectMutationResult<CreatePhaseTemplateData, CreatePhaseTemplateVariables>;
```

### Variables
The `CreatePhaseTemplate` Mutation requires an argument of type `CreatePhaseTemplateVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreatePhaseTemplateVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
  isDefault?: boolean | null;
}
```
### Return Type
Recall that calling the `CreatePhaseTemplate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreatePhaseTemplate` Mutation is of type `CreatePhaseTemplateData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreatePhaseTemplateData {
  phaseTemplate_insert: PhaseTemplate_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreatePhaseTemplate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreatePhaseTemplateVariables } from '@firebasegen/default-connector';
import { useCreatePhaseTemplate } from '@firebasegen/default-connector/react'

export default function CreatePhaseTemplateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreatePhaseTemplate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreatePhaseTemplate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreatePhaseTemplate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreatePhaseTemplate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreatePhaseTemplate` Mutation requires an argument of type `CreatePhaseTemplateVariables`:
  const createPhaseTemplateVars: CreatePhaseTemplateVariables = {
    organizationId: ..., 
    name: ..., 
    description: ..., // optional
    isDefault: ..., // optional
  };
  mutation.mutate(createPhaseTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., name: ..., description: ..., isDefault: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createPhaseTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.phaseTemplate_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdatePhaseTemplate
You can execute the `UpdatePhaseTemplate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdatePhaseTemplate(options?: useDataConnectMutationOptions<UpdatePhaseTemplateData, FirebaseError, UpdatePhaseTemplateVariables>): UseDataConnectMutationResult<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdatePhaseTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePhaseTemplateData, FirebaseError, UpdatePhaseTemplateVariables>): UseDataConnectMutationResult<UpdatePhaseTemplateData, UpdatePhaseTemplateVariables>;
```

### Variables
The `UpdatePhaseTemplate` Mutation requires an argument of type `UpdatePhaseTemplateVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdatePhaseTemplateVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  isDefault?: boolean | null;
}
```
### Return Type
Recall that calling the `UpdatePhaseTemplate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdatePhaseTemplate` Mutation is of type `UpdatePhaseTemplateData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdatePhaseTemplateData {
  phaseTemplate_update?: PhaseTemplate_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdatePhaseTemplate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdatePhaseTemplateVariables } from '@firebasegen/default-connector';
import { useUpdatePhaseTemplate } from '@firebasegen/default-connector/react'

export default function UpdatePhaseTemplateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdatePhaseTemplate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdatePhaseTemplate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdatePhaseTemplate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdatePhaseTemplate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdatePhaseTemplate` Mutation requires an argument of type `UpdatePhaseTemplateVariables`:
  const updatePhaseTemplateVars: UpdatePhaseTemplateVariables = {
    id: ..., 
    name: ..., // optional
    description: ..., // optional
    isDefault: ..., // optional
  };
  mutation.mutate(updatePhaseTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., description: ..., isDefault: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updatePhaseTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.phaseTemplate_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeletePhaseTemplate
You can execute the `DeletePhaseTemplate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeletePhaseTemplate(options?: useDataConnectMutationOptions<DeletePhaseTemplateData, FirebaseError, DeletePhaseTemplateVariables>): UseDataConnectMutationResult<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeletePhaseTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePhaseTemplateData, FirebaseError, DeletePhaseTemplateVariables>): UseDataConnectMutationResult<DeletePhaseTemplateData, DeletePhaseTemplateVariables>;
```

### Variables
The `DeletePhaseTemplate` Mutation requires an argument of type `DeletePhaseTemplateVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeletePhaseTemplateVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeletePhaseTemplate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeletePhaseTemplate` Mutation is of type `DeletePhaseTemplateData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeletePhaseTemplateData {
  phaseTemplate_delete?: PhaseTemplate_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeletePhaseTemplate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeletePhaseTemplateVariables } from '@firebasegen/default-connector';
import { useDeletePhaseTemplate } from '@firebasegen/default-connector/react'

export default function DeletePhaseTemplateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeletePhaseTemplate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeletePhaseTemplate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeletePhaseTemplate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeletePhaseTemplate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeletePhaseTemplate` Mutation requires an argument of type `DeletePhaseTemplateVariables`:
  const deletePhaseTemplateVars: DeletePhaseTemplateVariables = {
    id: ..., 
  };
  mutation.mutate(deletePhaseTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deletePhaseTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.phaseTemplate_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreatePhaseTemplatePhase
You can execute the `CreatePhaseTemplatePhase` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreatePhaseTemplatePhase(options?: useDataConnectMutationOptions<CreatePhaseTemplatePhaseData, FirebaseError, CreatePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreatePhaseTemplatePhase(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePhaseTemplatePhaseData, FirebaseError, CreatePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<CreatePhaseTemplatePhaseData, CreatePhaseTemplatePhaseVariables>;
```

### Variables
The `CreatePhaseTemplatePhase` Mutation requires an argument of type `CreatePhaseTemplatePhaseVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreatePhaseTemplatePhaseVariables {
  templateId: UUIDString;
  name: string;
  description?: string | null;
  durationWeeks?: number | null;
  order: number;
}
```
### Return Type
Recall that calling the `CreatePhaseTemplatePhase` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreatePhaseTemplatePhase` Mutation is of type `CreatePhaseTemplatePhaseData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreatePhaseTemplatePhaseData {
  phaseTemplatePhase_insert: PhaseTemplatePhase_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreatePhaseTemplatePhase`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreatePhaseTemplatePhaseVariables } from '@firebasegen/default-connector';
import { useCreatePhaseTemplatePhase } from '@firebasegen/default-connector/react'

export default function CreatePhaseTemplatePhaseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreatePhaseTemplatePhase();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreatePhaseTemplatePhase(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreatePhaseTemplatePhase(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreatePhaseTemplatePhase(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreatePhaseTemplatePhase` Mutation requires an argument of type `CreatePhaseTemplatePhaseVariables`:
  const createPhaseTemplatePhaseVars: CreatePhaseTemplatePhaseVariables = {
    templateId: ..., 
    name: ..., 
    description: ..., // optional
    durationWeeks: ..., // optional
    order: ..., 
  };
  mutation.mutate(createPhaseTemplatePhaseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ templateId: ..., name: ..., description: ..., durationWeeks: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createPhaseTemplatePhaseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.phaseTemplatePhase_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdatePhaseTemplatePhase
You can execute the `UpdatePhaseTemplatePhase` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdatePhaseTemplatePhase(options?: useDataConnectMutationOptions<UpdatePhaseTemplatePhaseData, FirebaseError, UpdatePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdatePhaseTemplatePhase(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePhaseTemplatePhaseData, FirebaseError, UpdatePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<UpdatePhaseTemplatePhaseData, UpdatePhaseTemplatePhaseVariables>;
```

### Variables
The `UpdatePhaseTemplatePhase` Mutation requires an argument of type `UpdatePhaseTemplatePhaseVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdatePhaseTemplatePhaseVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  durationWeeks?: number | null;
  order?: number | null;
}
```
### Return Type
Recall that calling the `UpdatePhaseTemplatePhase` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdatePhaseTemplatePhase` Mutation is of type `UpdatePhaseTemplatePhaseData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdatePhaseTemplatePhaseData {
  phaseTemplatePhase_update?: PhaseTemplatePhase_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdatePhaseTemplatePhase`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdatePhaseTemplatePhaseVariables } from '@firebasegen/default-connector';
import { useUpdatePhaseTemplatePhase } from '@firebasegen/default-connector/react'

export default function UpdatePhaseTemplatePhaseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdatePhaseTemplatePhase();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdatePhaseTemplatePhase(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdatePhaseTemplatePhase(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdatePhaseTemplatePhase(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdatePhaseTemplatePhase` Mutation requires an argument of type `UpdatePhaseTemplatePhaseVariables`:
  const updatePhaseTemplatePhaseVars: UpdatePhaseTemplatePhaseVariables = {
    id: ..., 
    name: ..., // optional
    description: ..., // optional
    durationWeeks: ..., // optional
    order: ..., // optional
  };
  mutation.mutate(updatePhaseTemplatePhaseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., description: ..., durationWeeks: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updatePhaseTemplatePhaseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.phaseTemplatePhase_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeletePhaseTemplatePhase
You can execute the `DeletePhaseTemplatePhase` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeletePhaseTemplatePhase(options?: useDataConnectMutationOptions<DeletePhaseTemplatePhaseData, FirebaseError, DeletePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeletePhaseTemplatePhase(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePhaseTemplatePhaseData, FirebaseError, DeletePhaseTemplatePhaseVariables>): UseDataConnectMutationResult<DeletePhaseTemplatePhaseData, DeletePhaseTemplatePhaseVariables>;
```

### Variables
The `DeletePhaseTemplatePhase` Mutation requires an argument of type `DeletePhaseTemplatePhaseVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeletePhaseTemplatePhaseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeletePhaseTemplatePhase` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeletePhaseTemplatePhase` Mutation is of type `DeletePhaseTemplatePhaseData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeletePhaseTemplatePhaseData {
  phaseTemplatePhase_delete?: PhaseTemplatePhase_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeletePhaseTemplatePhase`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeletePhaseTemplatePhaseVariables } from '@firebasegen/default-connector';
import { useDeletePhaseTemplatePhase } from '@firebasegen/default-connector/react'

export default function DeletePhaseTemplatePhaseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeletePhaseTemplatePhase();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeletePhaseTemplatePhase(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeletePhaseTemplatePhase(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeletePhaseTemplatePhase(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeletePhaseTemplatePhase` Mutation requires an argument of type `DeletePhaseTemplatePhaseVariables`:
  const deletePhaseTemplatePhaseVars: DeletePhaseTemplatePhaseVariables = {
    id: ..., 
  };
  mutation.mutate(deletePhaseTemplatePhaseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deletePhaseTemplatePhaseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.phaseTemplatePhase_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreatePortfolio
You can execute the `CreatePortfolio` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreatePortfolio(options?: useDataConnectMutationOptions<CreatePortfolioData, FirebaseError, CreatePortfolioVariables>): UseDataConnectMutationResult<CreatePortfolioData, CreatePortfolioVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreatePortfolio(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePortfolioData, FirebaseError, CreatePortfolioVariables>): UseDataConnectMutationResult<CreatePortfolioData, CreatePortfolioVariables>;
```

### Variables
The `CreatePortfolio` Mutation requires an argument of type `CreatePortfolioVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreatePortfolioVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
  ownerId?: UUIDString | null;
}
```
### Return Type
Recall that calling the `CreatePortfolio` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreatePortfolio` Mutation is of type `CreatePortfolioData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreatePortfolioData {
  portfolio_insert: Portfolio_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreatePortfolio`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreatePortfolioVariables } from '@firebasegen/default-connector';
import { useCreatePortfolio } from '@firebasegen/default-connector/react'

export default function CreatePortfolioComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreatePortfolio();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreatePortfolio(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreatePortfolio(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreatePortfolio(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreatePortfolio` Mutation requires an argument of type `CreatePortfolioVariables`:
  const createPortfolioVars: CreatePortfolioVariables = {
    organizationId: ..., 
    name: ..., 
    description: ..., // optional
    ownerId: ..., // optional
  };
  mutation.mutate(createPortfolioVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., name: ..., description: ..., ownerId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createPortfolioVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.portfolio_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdatePortfolio
You can execute the `UpdatePortfolio` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdatePortfolio(options?: useDataConnectMutationOptions<UpdatePortfolioData, FirebaseError, UpdatePortfolioVariables>): UseDataConnectMutationResult<UpdatePortfolioData, UpdatePortfolioVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdatePortfolio(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePortfolioData, FirebaseError, UpdatePortfolioVariables>): UseDataConnectMutationResult<UpdatePortfolioData, UpdatePortfolioVariables>;
```

### Variables
The `UpdatePortfolio` Mutation requires an argument of type `UpdatePortfolioVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdatePortfolioVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
  ownerId?: UUIDString | null;
}
```
### Return Type
Recall that calling the `UpdatePortfolio` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdatePortfolio` Mutation is of type `UpdatePortfolioData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdatePortfolioData {
  portfolio_update?: Portfolio_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdatePortfolio`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdatePortfolioVariables } from '@firebasegen/default-connector';
import { useUpdatePortfolio } from '@firebasegen/default-connector/react'

export default function UpdatePortfolioComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdatePortfolio();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdatePortfolio(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdatePortfolio(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdatePortfolio(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdatePortfolio` Mutation requires an argument of type `UpdatePortfolioVariables`:
  const updatePortfolioVars: UpdatePortfolioVariables = {
    id: ..., 
    name: ..., // optional
    description: ..., // optional
    ownerId: ..., // optional
  };
  mutation.mutate(updatePortfolioVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., description: ..., ownerId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updatePortfolioVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.portfolio_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeletePortfolio
You can execute the `DeletePortfolio` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeletePortfolio(options?: useDataConnectMutationOptions<DeletePortfolioData, FirebaseError, DeletePortfolioVariables>): UseDataConnectMutationResult<DeletePortfolioData, DeletePortfolioVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeletePortfolio(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePortfolioData, FirebaseError, DeletePortfolioVariables>): UseDataConnectMutationResult<DeletePortfolioData, DeletePortfolioVariables>;
```

### Variables
The `DeletePortfolio` Mutation requires an argument of type `DeletePortfolioVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeletePortfolioVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeletePortfolio` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeletePortfolio` Mutation is of type `DeletePortfolioData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeletePortfolioData {
  portfolio_delete?: Portfolio_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeletePortfolio`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeletePortfolioVariables } from '@firebasegen/default-connector';
import { useDeletePortfolio } from '@firebasegen/default-connector/react'

export default function DeletePortfolioComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeletePortfolio();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeletePortfolio(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeletePortfolio(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeletePortfolio(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeletePortfolio` Mutation requires an argument of type `DeletePortfolioVariables`:
  const deletePortfolioVars: DeletePortfolioVariables = {
    id: ..., 
  };
  mutation.mutate(deletePortfolioVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deletePortfolioVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.portfolio_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateProductType
You can execute the `CreateProductType` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateProductType(options?: useDataConnectMutationOptions<CreateProductTypeData, FirebaseError, CreateProductTypeVariables>): UseDataConnectMutationResult<CreateProductTypeData, CreateProductTypeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateProductType(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProductTypeData, FirebaseError, CreateProductTypeVariables>): UseDataConnectMutationResult<CreateProductTypeData, CreateProductTypeVariables>;
```

### Variables
The `CreateProductType` Mutation requires an argument of type `CreateProductTypeVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateProductTypeVariables {
  organizationId: UUIDString;
  name: string;
  description?: string | null;
}
```
### Return Type
Recall that calling the `CreateProductType` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateProductType` Mutation is of type `CreateProductTypeData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProductTypeData {
  productType_insert: ProductType_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateProductType`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateProductTypeVariables } from '@firebasegen/default-connector';
import { useCreateProductType } from '@firebasegen/default-connector/react'

export default function CreateProductTypeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateProductType();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateProductType(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProductType(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProductType(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateProductType` Mutation requires an argument of type `CreateProductTypeVariables`:
  const createProductTypeVars: CreateProductTypeVariables = {
    organizationId: ..., 
    name: ..., 
    description: ..., // optional
  };
  mutation.mutate(createProductTypeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ organizationId: ..., name: ..., description: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createProductTypeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.productType_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateProductType
You can execute the `UpdateProductType` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateProductType(options?: useDataConnectMutationOptions<UpdateProductTypeData, FirebaseError, UpdateProductTypeVariables>): UseDataConnectMutationResult<UpdateProductTypeData, UpdateProductTypeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateProductType(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProductTypeData, FirebaseError, UpdateProductTypeVariables>): UseDataConnectMutationResult<UpdateProductTypeData, UpdateProductTypeVariables>;
```

### Variables
The `UpdateProductType` Mutation requires an argument of type `UpdateProductTypeVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateProductTypeVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}
```
### Return Type
Recall that calling the `UpdateProductType` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateProductType` Mutation is of type `UpdateProductTypeData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProductTypeData {
  productType_update?: ProductType_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateProductType`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateProductTypeVariables } from '@firebasegen/default-connector';
import { useUpdateProductType } from '@firebasegen/default-connector/react'

export default function UpdateProductTypeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateProductType();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateProductType(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProductType(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProductType(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateProductType` Mutation requires an argument of type `UpdateProductTypeVariables`:
  const updateProductTypeVars: UpdateProductTypeVariables = {
    id: ..., 
    name: ..., // optional
    description: ..., // optional
  };
  mutation.mutate(updateProductTypeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., description: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateProductTypeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.productType_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteProductType
You can execute the `DeleteProductType` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteProductType(options?: useDataConnectMutationOptions<DeleteProductTypeData, FirebaseError, DeleteProductTypeVariables>): UseDataConnectMutationResult<DeleteProductTypeData, DeleteProductTypeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteProductType(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProductTypeData, FirebaseError, DeleteProductTypeVariables>): UseDataConnectMutationResult<DeleteProductTypeData, DeleteProductTypeVariables>;
```

### Variables
The `DeleteProductType` Mutation requires an argument of type `DeleteProductTypeVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteProductTypeVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteProductType` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteProductType` Mutation is of type `DeleteProductTypeData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteProductTypeData {
  productType_delete?: ProductType_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteProductType`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteProductTypeVariables } from '@firebasegen/default-connector';
import { useDeleteProductType } from '@firebasegen/default-connector/react'

export default function DeleteProductTypeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteProductType();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteProductType(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProductType(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProductType(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteProductType` Mutation requires an argument of type `DeleteProductTypeVariables`:
  const deleteProductTypeVars: DeleteProductTypeVariables = {
    id: ..., 
  };
  mutation.mutate(deleteProductTypeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteProductTypeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.productType_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateProductTypePhaseConfig
You can execute the `CreateProductTypePhaseConfig` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateProductTypePhaseConfig(options?: useDataConnectMutationOptions<CreateProductTypePhaseConfigData, FirebaseError, CreateProductTypePhaseConfigVariables>): UseDataConnectMutationResult<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateProductTypePhaseConfig(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProductTypePhaseConfigData, FirebaseError, CreateProductTypePhaseConfigVariables>): UseDataConnectMutationResult<CreateProductTypePhaseConfigData, CreateProductTypePhaseConfigVariables>;
```

### Variables
The `CreateProductTypePhaseConfig` Mutation requires an argument of type `CreateProductTypePhaseConfigVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateProductTypePhaseConfigVariables {
  productTypeId: UUIDString;
  phaseTemplateId: UUIDString;
}
```
### Return Type
Recall that calling the `CreateProductTypePhaseConfig` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateProductTypePhaseConfig` Mutation is of type `CreateProductTypePhaseConfigData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProductTypePhaseConfigData {
  productTypePhaseConfig_insert: ProductTypePhaseConfig_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateProductTypePhaseConfig`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateProductTypePhaseConfigVariables } from '@firebasegen/default-connector';
import { useCreateProductTypePhaseConfig } from '@firebasegen/default-connector/react'

export default function CreateProductTypePhaseConfigComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateProductTypePhaseConfig();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateProductTypePhaseConfig(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProductTypePhaseConfig(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProductTypePhaseConfig(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateProductTypePhaseConfig` Mutation requires an argument of type `CreateProductTypePhaseConfigVariables`:
  const createProductTypePhaseConfigVars: CreateProductTypePhaseConfigVariables = {
    productTypeId: ..., 
    phaseTemplateId: ..., 
  };
  mutation.mutate(createProductTypePhaseConfigVars);
  // Variables can be defined inline as well.
  mutation.mutate({ productTypeId: ..., phaseTemplateId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createProductTypePhaseConfigVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.productTypePhaseConfig_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteProductTypePhaseConfig
You can execute the `DeleteProductTypePhaseConfig` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteProductTypePhaseConfig(options?: useDataConnectMutationOptions<DeleteProductTypePhaseConfigData, FirebaseError, DeleteProductTypePhaseConfigVariables>): UseDataConnectMutationResult<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteProductTypePhaseConfig(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProductTypePhaseConfigData, FirebaseError, DeleteProductTypePhaseConfigVariables>): UseDataConnectMutationResult<DeleteProductTypePhaseConfigData, DeleteProductTypePhaseConfigVariables>;
```

### Variables
The `DeleteProductTypePhaseConfig` Mutation requires an argument of type `DeleteProductTypePhaseConfigVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteProductTypePhaseConfigVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteProductTypePhaseConfig` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteProductTypePhaseConfig` Mutation is of type `DeleteProductTypePhaseConfigData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteProductTypePhaseConfigData {
  productTypePhaseConfig_delete?: ProductTypePhaseConfig_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteProductTypePhaseConfig`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteProductTypePhaseConfigVariables } from '@firebasegen/default-connector';
import { useDeleteProductTypePhaseConfig } from '@firebasegen/default-connector/react'

export default function DeleteProductTypePhaseConfigComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteProductTypePhaseConfig();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteProductTypePhaseConfig(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProductTypePhaseConfig(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProductTypePhaseConfig(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteProductTypePhaseConfig` Mutation requires an argument of type `DeleteProductTypePhaseConfigVariables`:
  const deleteProductTypePhaseConfigVars: DeleteProductTypePhaseConfigVariables = {
    id: ..., 
  };
  mutation.mutate(deleteProductTypePhaseConfigVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteProductTypePhaseConfigVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.productTypePhaseConfig_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateProject
You can execute the `CreateProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateProject(options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateProject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;
```

### Variables
The `CreateProject` Mutation requires an argument of type `CreateProjectVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateProject` Mutation is of type `CreateProjectData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProjectData {
  project_insert: Project_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateProjectVariables } from '@firebasegen/default-connector';
import { useCreateProject } from '@firebasegen/default-connector/react'

export default function CreateProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateProject` Mutation requires an argument of type `CreateProjectVariables`:
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
  mutation.mutate(createProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ programId: ..., name: ..., description: ..., status: ..., startDate: ..., targetCompletionDate: ..., ownerId: ..., productTypeId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.project_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateProject
You can execute the `UpdateProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateProject(options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateProject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;
```

### Variables
The `UpdateProject` Mutation requires an argument of type `UpdateProjectVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateProject` Mutation is of type `UpdateProjectData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProjectData {
  project_update?: Project_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateProjectVariables } from '@firebasegen/default-connector';
import { useUpdateProject } from '@firebasegen/default-connector/react'

export default function UpdateProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateProject` Mutation requires an argument of type `UpdateProjectVariables`:
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
  mutation.mutate(updateProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., description: ..., status: ..., startDate: ..., targetCompletionDate: ..., actualCompletionDate: ..., ownerId: ..., productTypeId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.project_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteProject
You can execute the `DeleteProject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteProject(options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteProject(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
```

### Variables
The `DeleteProject` Mutation requires an argument of type `DeleteProjectVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteProject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteProject` Mutation is of type `DeleteProjectData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteProject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteProjectVariables } from '@firebasegen/default-connector';
import { useDeleteProject } from '@firebasegen/default-connector/react'

export default function DeleteProjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteProject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteProject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteProject` Mutation requires an argument of type `DeleteProjectVariables`:
  const deleteProjectVars: DeleteProjectVariables = {
    id: ..., 
  };
  mutation.mutate(deleteProjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteProjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.project_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateProjectPhase
You can execute the `CreateProjectPhase` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateProjectPhase(options?: useDataConnectMutationOptions<CreateProjectPhaseData, FirebaseError, CreateProjectPhaseVariables>): UseDataConnectMutationResult<CreateProjectPhaseData, CreateProjectPhaseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateProjectPhase(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectPhaseData, FirebaseError, CreateProjectPhaseVariables>): UseDataConnectMutationResult<CreateProjectPhaseData, CreateProjectPhaseVariables>;
```

### Variables
The `CreateProjectPhase` Mutation requires an argument of type `CreateProjectPhaseVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateProjectPhase` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateProjectPhase` Mutation is of type `CreateProjectPhaseData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProjectPhaseData {
  projectPhase_insert: ProjectPhase_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateProjectPhase`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateProjectPhaseVariables } from '@firebasegen/default-connector';
import { useCreateProjectPhase } from '@firebasegen/default-connector/react'

export default function CreateProjectPhaseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateProjectPhase();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateProjectPhase(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectPhase(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateProjectPhase(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateProjectPhase` Mutation requires an argument of type `CreateProjectPhaseVariables`:
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
  mutation.mutate(createProjectPhaseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ projectId: ..., name: ..., description: ..., status: ..., startDate: ..., targetEndDate: ..., order: ..., percentComplete: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createProjectPhaseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectPhase_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateProjectPhase
You can execute the `UpdateProjectPhase` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateProjectPhase(options?: useDataConnectMutationOptions<UpdateProjectPhaseData, FirebaseError, UpdateProjectPhaseVariables>): UseDataConnectMutationResult<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateProjectPhase(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectPhaseData, FirebaseError, UpdateProjectPhaseVariables>): UseDataConnectMutationResult<UpdateProjectPhaseData, UpdateProjectPhaseVariables>;
```

### Variables
The `UpdateProjectPhase` Mutation requires an argument of type `UpdateProjectPhaseVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateProjectPhase` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateProjectPhase` Mutation is of type `UpdateProjectPhaseData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProjectPhaseData {
  projectPhase_update?: ProjectPhase_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateProjectPhase`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateProjectPhaseVariables } from '@firebasegen/default-connector';
import { useUpdateProjectPhase } from '@firebasegen/default-connector/react'

export default function UpdateProjectPhaseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateProjectPhase();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateProjectPhase(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProjectPhase(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateProjectPhase(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateProjectPhase` Mutation requires an argument of type `UpdateProjectPhaseVariables`:
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
  mutation.mutate(updateProjectPhaseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., name: ..., description: ..., status: ..., startDate: ..., targetEndDate: ..., actualEndDate: ..., percentComplete: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateProjectPhaseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectPhase_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteProjectPhase
You can execute the `DeleteProjectPhase` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteProjectPhase(options?: useDataConnectMutationOptions<DeleteProjectPhaseData, FirebaseError, DeleteProjectPhaseVariables>): UseDataConnectMutationResult<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteProjectPhase(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectPhaseData, FirebaseError, DeleteProjectPhaseVariables>): UseDataConnectMutationResult<DeleteProjectPhaseData, DeleteProjectPhaseVariables>;
```

### Variables
The `DeleteProjectPhase` Mutation requires an argument of type `DeleteProjectPhaseVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteProjectPhaseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteProjectPhase` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteProjectPhase` Mutation is of type `DeleteProjectPhaseData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteProjectPhaseData {
  projectPhase_delete?: ProjectPhase_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteProjectPhase`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteProjectPhaseVariables } from '@firebasegen/default-connector';
import { useDeleteProjectPhase } from '@firebasegen/default-connector/react'

export default function DeleteProjectPhaseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteProjectPhase();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteProjectPhase(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProjectPhase(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteProjectPhase(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteProjectPhase` Mutation requires an argument of type `DeleteProjectPhaseVariables`:
  const deleteProjectPhaseVars: DeleteProjectPhaseVariables = {
    id: ..., 
  };
  mutation.mutate(deleteProjectPhaseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteProjectPhaseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.projectPhase_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

