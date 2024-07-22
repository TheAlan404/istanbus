import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppBase from "../components/AppBase";
import { ErrorPage } from "./ErrorPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppBase />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    }
                ],
            }
        ],
    }
]);

export const IstanbusRouter = () => <RouterProvider router={router} />;
