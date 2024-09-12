import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Joblisting from "./pages/Job-listing";
import Job from "./pages/Job";
import PostJobs from "./pages/Post-Jobs";
import SavedJobs from "./pages/Saved-jobs";
import MyApplications from "./pages/My-applications";
import { ThemeProvider } from "./components/theme.provider";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/onboarding",
        element: (
          <PrivateRoute>
            <Onboarding />
          </PrivateRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <PrivateRoute>
            <Joblisting />
          </PrivateRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <PrivateRoute>
            <Job />
          </PrivateRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <PrivateRoute>
            <PostJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <PrivateRoute>
            <SavedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-applications",
        element: (
          <PrivateRoute>
            <MyApplications />,
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
