# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useListPrograms, useGetProgram, useCreateProgram, useUpdateProgram, useDeleteProgram, useListProjectAssignments, useListUserAssignments, useListAssignmentsByDateRange, useCreateProjectAssignment, useUpdateProjectAssignment } from '@firebasegen/default-connector/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useListPrograms(listProgramsVars);

const { data, isPending, isSuccess, isError, error } = useGetProgram(getProgramVars);

const { data, isPending, isSuccess, isError, error } = useCreateProgram(createProgramVars);

const { data, isPending, isSuccess, isError, error } = useUpdateProgram(updateProgramVars);

const { data, isPending, isSuccess, isError, error } = useDeleteProgram(deleteProgramVars);

const { data, isPending, isSuccess, isError, error } = useListProjectAssignments(listProjectAssignmentsVars);

const { data, isPending, isSuccess, isError, error } = useListUserAssignments(listUserAssignmentsVars);

const { data, isPending, isSuccess, isError, error } = useListAssignmentsByDateRange(listAssignmentsByDateRangeVars);

const { data, isPending, isSuccess, isError, error } = useCreateProjectAssignment(createProjectAssignmentVars);

const { data, isPending, isSuccess, isError, error } = useUpdateProjectAssignment(updateProjectAssignmentVars);

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
import { listPrograms, getProgram, createProgram, updateProgram, deleteProgram, listProjectAssignments, listUserAssignments, listAssignmentsByDateRange, createProjectAssignment, updateProjectAssignment } from '@firebasegen/default-connector';


// Operation ListPrograms:  For variables, look at type ListProgramsVars in ../index.d.ts
const { data } = await ListPrograms(dataConnect, listProgramsVars);

// Operation GetProgram:  For variables, look at type GetProgramVars in ../index.d.ts
const { data } = await GetProgram(dataConnect, getProgramVars);

// Operation CreateProgram:  For variables, look at type CreateProgramVars in ../index.d.ts
const { data } = await CreateProgram(dataConnect, createProgramVars);

// Operation UpdateProgram:  For variables, look at type UpdateProgramVars in ../index.d.ts
const { data } = await UpdateProgram(dataConnect, updateProgramVars);

// Operation DeleteProgram:  For variables, look at type DeleteProgramVars in ../index.d.ts
const { data } = await DeleteProgram(dataConnect, deleteProgramVars);

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


```