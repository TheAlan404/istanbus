import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppBase from "../components/AppBase";
import { ErrorPage } from "./ErrorPage";
import { HomePage } from "./pages/home/HomePage";
import { LinePage } from "./pages/line/LinePage";
import { StopPage } from "./pages/StopPage";
import { AnnouncementsPage } from "./pages/Announcements";

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
                    {
                        path: "/duyurular",
                        element: <AnnouncementsPage />,
                    },
                ],
            }
        ],
    }
]);

export const IstanbusRouter = () => <RouterProvider router={router} />;
