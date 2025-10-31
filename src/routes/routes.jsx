import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import MyProducts from './../pages/MyProducts';
import MyBids from './../pages/MyBids';
import CreateProduct from './../pages/CreateProduct';

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
        path: "all-products",
        element: <AllProducts />
      },
      {
        path: "my-products",
        element: <MyProducts />
      },
      {
        path: 'my-bids',
        element: <MyBids />
      },
      {
        path: 'create-product',
        element: <CreateProduct />
      }
    ]
  },
]);