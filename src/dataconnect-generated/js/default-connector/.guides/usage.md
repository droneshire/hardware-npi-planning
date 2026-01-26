# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useListProjectAssignments, useListUserAssignments, useListAssignmentsByDateRange, useCreateProjectAssignment, useUpdateProjectAssignment, useDeleteProjectAssignment, useListProjectPhases, useGetProjectPhase, useCreateProjectPhase, useUpdateProjectPhase } from '@firebasegen/default-connector/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useListProjectAssignments(listProjectAssignmentsVars);

const { data, isPending, isSuccess, isError, error } = useListUserAssignments(listUserAssignmentsVars);

const { data, isPending, isSuccess, isError, error } = useListAssignmentsByDateRange(listAssignmentsByDateRangeVars);

const { data, isPending, isSuccess, isError, error } = useCreateProjectAssignment(createProjectAssignmentVars);

const { data, isPending, isSuccess, isError, error } = useUpdateProjectAssignment(updateProjectAssignmentVars);

const { data, isPending, isSuccess, isError, error } = useDeleteProjectAssignment(deleteProjectAssignmentVars);

const { data, isPending, isSuccess, isError, error } = useListProjectPhases(listProjectPhasesVars);

const { data, isPending, isSuccess, isError, error } = useGetProjectPhase(getProjectPhaseVars);

const { data, isPending, isSuccess, isError, error } = useCreateProjectPhase(createProjectPhaseVars);

const { data, isPending, isSuccess, isError, error } = useUpdateProjectPhase(updateProjectPhaseVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listProjectAssignments, listUserAssignments, listAssignmentsByDateRange, createProjectAssignment, updateProjectAssignment, deleteProjectAssignment, listProjectPhases, getProjectPhase, createProjectPhase, updateProjectPhase } from '@firebasegen/default-connector';


// Operation ListProjectAssignments:  For variables, look at type ListProjectAssignmentsVars in ../index.d.ts
const { data } = await ListProjectAssignments(dataConnect, listProjectAssignmentsVars);

// Operation ListUserAssignments:  For variables, look at type ListUserAssignmentsVars in ../index.d.ts
const { data } = await ListUserAssignments(dataConnect, listUserAssignmentsVars);

// Operation ListAssignmentsByDateRange:  For variables, look at type ListAssignmentsByDateRangeVars in ../index.d.ts
const { data } = await ListAssignmentsByDateRange(dataConnect, listAssignmentsByDateRangeVars);

// Operation CreateProjectAssignment:  For variables, look at type CreateProjectAssignmentVars in ../index.d.ts
const { data } = await CreateProjectAssignment(dataConnect, createProjectAssignmentVars);

// Operation UpdateProjectAssignment:  For variables, look at type UpdateProjectAssignmentVars in ../index.d.ts
const { data } = await UpdateProjectAssignment(dataConnect, updateProjectAssignmentVars);

// Operation DeleteProjectAssignment:  For variables, look at type DeleteProjectAssignmentVars in ../index.d.ts
const { data } = await DeleteProjectAssignment(dataConnect, deleteProjectAssignmentVars);

// Operation ListProjectPhases:  For variables, look at type ListProjectPhasesVars in ../index.d.ts
const { data } = await ListProjectPhases(dataConnect, listProjectPhasesVars);

// Operation GetProjectPhase:  For variables, look at type GetProjectPhaseVars in ../index.d.ts
const { data } = await GetProjectPhase(dataConnect, getProjectPhaseVars);

// Operation CreateProjectPhase:  For variables, look at type CreateProjectPhaseVars in ../index.d.ts
const { data } = await CreateProjectPhase(dataConnect, createProjectPhaseVars);

// Operation UpdateProjectPhase:  For variables, look at type UpdateProjectPhaseVars in ../index.d.ts
const { data } = await UpdateProjectPhase(dataConnect, updateProjectPhaseVars);


```