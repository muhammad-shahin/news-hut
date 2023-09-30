import Home from "../Home/Home";
import Login from "../Login/login";
import NewsCategory from "../NewsCategory/NewsCategory";
import Root from "../Root/Root";
import SignUp from "../SignUp/SignUp";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/news-category",
        element: <NewsCategory />,
      },
    ],
  },
];

export default routes;
