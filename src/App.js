
import Homepage from "./pages/home/home";
import Login from "./pages/login/Login";
// document
import Documents from "./pages/document/Documents";
import NewDocument from "./pages/document/NewDocument";
import Deshboard from "./pages/document/Deshboard";
import WorkFlow from "./pages/document/WorkFlow";
import ApproveList from "./pages/document/ApproveList";
import Viewdocument from "./pages/document/Viewdocument";
import DocumentApproved from "./pages/document/DocumentApproved";
// revise 
import Revisedocuments from "./pages/document/component/documentRevise/Revisedocuments";
// search hositoru 
import JournalHistory from "./pages/document/JournalHistory";
import SearchJournalgroup from "./pages/document/SearchJournalgroup";

import EditRejectdocument from "./pages/document/EditRejectdocuments";
import Rejectdocuments from "./pages/document/Rejectdocuments";
import Editdocuments from "./pages/document/component/newDocument/Editdocuments";
import DraftAdddocuments from "./pages/document/component/approvedList/draftAdddocuments"; // add draft detail
import SendStatus from "./pages/document/component/newDocument/SendStatus";
// view document
import DocmentViewAll from "./pages/document/DocmentViewAll";

// approved group 
import Approvejournalgroup from "./pages/document/component/approvedbygroup/approvejournalgroup";
import ApprovedGroup from "./pages/document/ApprovedGroup";
import Editjournalgroup from "./pages/document/component/approvedbygroup/editjournalgroup";

// flows 
import ViewFlowProcess from "./pages/document/ViewFlowProcess";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

// menu list
import AdminonlyRoute from "./pages/routeadmin/AdminonlyRoute";
import Admin from "./pages/routeadmin/Admin";
import { ToastContainer, toast } from 'react-toastify';
import NotFound from "./pages/NotFound/NotFound";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Homepage />} />
            <Route path="loginByuser/:jourId/:userId" index element={<Login />} />
            <Route path="documents" element={<Documents />} />
            <Route path="documentApproved" element={<DocumentApproved />} />
            <Route path="deshboard" element={<Deshboard />} />
            <Route path="workflow" element={<WorkFlow />} />
            <Route path="newducument" element={<NewDocument />} />
            <Route path="approvelist" element={<ApproveList />} />
            <Route path="viewdocument/:id/:status" element={<Viewdocument />} />
            <Route path="editRejectdocument/:id/:status" element={<EditRejectdocument />} />
            <Route path="rejectdocuments/:id/:status" element={<Rejectdocuments />} />
            <Route path="editdocument/:id" element={<Editdocuments />} />
            <Route path="docmentViewAll/:id" element={<DocmentViewAll />} />
            <Route path="sendStatus/:id" element={<SendStatus />} />
            <Route path="draftAdddocuments/:id" element={<DraftAdddocuments />} />
            <Route path="ViewFlowProcess/:id" element={<ViewFlowProcess />} />
            <Route path="revisedocuments/:id" element={<Revisedocuments />} />
            <Route path="journalHistory" element={<JournalHistory />} />
            <Route path="reviseGroup" element={<SearchJournalgroup />} />
            <Route path="approvejournalgroup/:id/:status" element={<Approvejournalgroup />} />
            <Route path="editjournalgroup/:id/:status" element={<Editjournalgroup />} />
            <Route path="approvedgroup" element={<ApprovedGroup />} />
            <Route path="*" element={<NotFound />} />
            {/* ส่วนของ admin */}
            <Route path="/admin/*"
              element={
                <AdminonlyRoute>
                  <Admin />
                </AdminonlyRoute>
              }
            >
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
