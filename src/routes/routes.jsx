import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import MyProducts from './../pages/MyProducts';
import MyBids from './../pages/MyBids';
import CreateProduct from './../pages/CreateProduct';
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import ProductDetils from "../pages/ProductDetils";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/all-products",
        element: <AllProducts />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/my-products",
        element: <PrivateRoute><MyProducts /></PrivateRoute>
      },
      {
        path: '/my-bids',
        element: <PrivateRoute><MyBids /></PrivateRoute>
      },
      {
        path: '/create-product',
        element: <PrivateRoute><CreateProduct /></PrivateRoute>
      },
      {
        path: '/product-details/:id',
        element: <ProductDetils />,
        loader: async ({ params }) => fetch(`https://smart-deals-server-sigma-beige.vercel.app/products/${params.id}`)
      }
    ]
  },
]);