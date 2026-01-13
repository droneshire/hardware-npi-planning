# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useListPortfolios, useGetPortfolio, useCreatePortfolio, useUpdatePortfolio, useDeletePortfolio, useListProjectAssignments, useListUserAssignments, useListAssignmentsByDateRange, useCreateProjectAssignment, useUpdateProjectAssignment } from '@firebasegen/default-connector/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useListPortfolios(listPortfoliosVars);

const { data, isPending, isSuccess, isError, error } = useGetPortfolio(getPortfolioVars);

const { data, isPending, isSuccess, isError, error } = useCreatePortfolio(createPortfolioVars);

const { data, isPending, isSuccess, isError, error } = useUpdatePortfolio(updatePortfolioVars);

const { data, isPending, isSuccess, isError, error } = useDeletePortfolio(deletePortfolioVars);

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
import { listPortfolios, getPortfolio, createPortfolio, updatePortfolio, deletePortfolio, listProjectAssignments, listUserAssignments, listAssignmentsByDateRange, createProjectAssignment, updateProjectAssignment } from '@firebasegen/default-connector';


// Operation ListPortfolios:  For variables, look at type ListPortfoliosVars in ../index.d.ts
const { data } = await ListPortfolios(dataConnect, listPortfoliosVars);

// Operation GetPortfolio:  For variables, look at type GetPortfolioVars in ../index.d.ts
const { data } = await GetPortfolio(dataConnect, getPortfolioVars);

// Operation CreatePortfolio:  For variables, look at type CreatePortfolioVars in ../index.d.ts
const { data } = await CreatePortfolio(dataConnect, createPortfolioVars);

// Operation UpdatePortfolio:  For variables, look at type UpdatePortfolioVars in ../index.d.ts
const { data } = await UpdatePortfolio(dataConnect, updatePortfolioVars);

// Operation DeletePortfolio:  For variables, look at type DeletePortfolioVars in ../index.d.ts
const { data } = await DeletePortfolio(dataConnect, deletePortfolioVars);

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