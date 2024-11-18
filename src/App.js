import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// pages & layouts imports
import Category from "./pages/Category";
import HomePage from "./pages/HomePage";
import ReviewDetails from "./pages/ReviewDetails";
import MainLayout from "./layouts/MainLayout";

// apollo client
const client = new ApolloClient({
  uri: "http://localhost:1338/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  // Define your router using `createBrowserRouter` and `createRoutesFromElements`
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* Home Page Route */}
        <Route index element={<HomePage />} />
        <Route path="homepage" element={<HomePage />} />{" "}
        <Route path="category" element={<Category />} />
        <Route path="category/:id" element={<Category />} />
        <Route path="details" element={<ReviewDetails />} />
        <Route path="details/:id" element={<ReviewDetails />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </div>
  );
};

export default App;
