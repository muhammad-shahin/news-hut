import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import routes from "./components/Router/Routes";
import AuthContextProvider from "./context/AuthContextProvider";
const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
