# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useListProductTypes, useGetProductType, useCreateProductType, useUpdateProductType, useDeleteProductType, useCreateProductTypePhaseConfig, useDeleteProductTypePhaseConfig, useListProjectPhases, useGetProjectPhase, useCreateProjectPhase } from '@firebasegen/default-connector/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useListProductTypes(listProductTypesVars);

const { data, isPending, isSuccess, isError, error } = useGetProductType(getProductTypeVars);

const { data, isPending, isSuccess, isError, error } = useCreateProductType(createProductTypeVars);

const { data, isPending, isSuccess, isError, error } = useUpdateProductType(updateProductTypeVars);

const { data, isPending, isSuccess, isError, error } = useDeleteProductType(deleteProductTypeVars);

const { data, isPending, isSuccess, isError, error } = useCreateProductTypePhaseConfig(createProductTypePhaseConfigVars);

const { data, isPending, isSuccess, isError, error } = useDeleteProductTypePhaseConfig(deleteProductTypePhaseConfigVars);

const { data, isPending, isSuccess, isError, error } = useListProjectPhases(listProjectPhasesVars);

const { data, isPending, isSuccess, isError, error } = useGetProjectPhase(getProjectPhaseVars);

const { data, isPending, isSuccess, isError, error } = useCreateProjectPhase(createProjectPhaseVars);

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
import { listProductTypes, getProductType, createProductType, updateProductType, deleteProductType, createProductTypePhaseConfig, deleteProductTypePhaseConfig, listProjectPhases, getProjectPhase, createProjectPhase } from '@firebasegen/default-connector';


// Operation ListProductTypes:  For variables, look at type ListProductTypesVars in ../index.d.ts
const { data } = await ListProductTypes(dataConnect, listProductTypesVars);

// Operation GetProductType:  For variables, look at type GetProductTypeVars in ../index.d.ts
const { data } = await GetProductType(dataConnect, getProductTypeVars);

// Operation CreateProductType:  For variables, look at type CreateProductTypeVars in ../index.d.ts
const { data } = await CreateProductType(dataConnect, createProductTypeVars);

// Operation UpdateProductType:  For variables, look at type UpdateProductTypeVars in ../index.d.ts
const { data } = await UpdateProductType(dataConnect, updateProductTypeVars);

// Operation DeleteProductType:  For variables, look at type DeleteProductTypeVars in ../index.d.ts
const { data } = await DeleteProductType(dataConnect, deleteProductTypeVars);

// Operation CreateProductTypePhaseConfig:  For variables, look at type CreateProductTypePhaseConfigVars in ../index.d.ts
const { data } = await CreateProductTypePhaseConfig(dataConnect, createProductTypePhaseConfigVars);

// Operation DeleteProductTypePhaseConfig:  For variables, look at type DeleteProductTypePhaseConfigVars in ../index.d.ts
const { data } = await DeleteProductTypePhaseConfig(dataConnect, deleteProductTypePhaseConfigVars);

// Operation ListProjectPhases:  For variables, look at type ListProjectPhasesVars in ../index.d.ts
const { data } = await ListProjectPhases(dataConnect, listProjectPhasesVars);

// Operation GetProjectPhase:  For variables, look at type GetProjectPhaseVars in ../index.d.ts
const { data } = await GetProjectPhase(dataConnect, getProjectPhaseVars);

// Operation CreateProjectPhase:  For variables, look at type CreateProjectPhaseVars in ../index.d.ts
const { data } = await CreateProjectPhase(dataConnect, createProjectPhaseVars);


```