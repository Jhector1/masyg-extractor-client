import React, { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import DocsManagementNavigation from "./DocsManagementNavigation.tsx";
import ErrorPage from "../../ErrorPage.tsx";
import { useModal } from "../../../hooks/useModal.ts";
import { useAuth } from "../../../context/index.tsx";
import Spinner from "../../../tool/Spinner/index.tsx";
import { useMenu } from "@/context/MenuContext.tsx";

const MasygDashboard = lazy(() => import("./Dashboard.tsx"));
const AllDocs = lazy(() => import("./AllDocument.tsx"));

const DocsManagement: React.FC = () => {
  const { isOpen, closeModal, openModal } = useModal();
  const { state } = useAuth();
  const [uploads, setUploads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
 const { isMenuOpen, toggleMenu } = useMenu();

  if(loading)
    return <Spinner opacity={1}/>
  return (
    <div className="flex gap-5 justify-around min-h-screen bg-gray-100 p-4">
      {/* Sidebar */}
      {state.isAuthenticated && uploads.length>0 && <DocsManagementNavigation open={isMenuOpen ? 'flex': 'hidden'} openModal={openModal} />}

      {/* Main Content */}
      <div className="flex-1">

        <Routes>
          <Route
            index
            element={
              <Suspense fallback={<div>Loading Dashboard...</div>}>
                <MasygDashboard loading={loading} setLoading={setLoading} isUploaderOpen={isOpen} closeFileUploader={closeModal} uploads={uploads} setUploads={setUploads}/>
                {/* <AllDocs uploads={uploads} loading={loading} /> */}
              </Suspense>
            }
          />
          <Route
            path="alldocs"
            element={
              <Suspense fallback={<div>Loading Documents...</div>}>
                {/* <AllDocs /> */}
              </Suspense>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default DocsManagement;
