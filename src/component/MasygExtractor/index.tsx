import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MasygNavigation from "./MasygNavigation.tsx";
import ProtectedRoute from "./ProtectedRoutes.tsx";
import ErrorPage from "../ErrorPage.tsx";
import DocsManagement from "./DocsManagement";


const SettingsPage = lazy(() => import("./SettingsPage"));
const SubscriptionSuccess = lazy(() => import("./SettingsPage/Subscription/SuccessPage.tsx"));
const ResetPassword = lazy(() =>
  import("../authenticationForm/resetPassword/ResetPassword.tsx")
);

const MasygExtractor: React.FC = () => {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MasygNavigation />} errorElement={<ErrorPage />}>
        <Route
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <DocsManagement  />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <SettingsPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="reset-password/:token"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path="payment/success"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SubscriptionSuccess />
            </Suspense>
          }
        />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default MasygExtractor;
