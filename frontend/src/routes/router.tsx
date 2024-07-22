import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppBase from "../components/AppBase";
import { ErrorPage } from "./ErrorPage";
import { HomePage } from "./pages/HomePage";
import { LinePage } from "./pages/LinePage";
import { StopPage } from "./pages/StopPage";

const router = createBrowserRouter([
    {
        element: <AppBase />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: "/hat/:line",
                        element: <LinePage />,
                    },
                    {
                        path: "/durak/:stop",
                        element: <StopPage />,
                    },
                ],
            }
        ],
    }
]);

export const IstanbusRouter = () => <RouterProvider router={router} />;
