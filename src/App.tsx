import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Import your AuthProvider

import AddProjectForm from './components/Projects/AddProjectForm';
import DashboardPage from './components/Admin/DashboardPage';

import { Login } from './components';
import AdminDashboard from './components/Admin/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import GrantsPage from './components/Admin/Grantpage';
import AddUserForm from './components/Form';
import ProgramsPage from './components/Admin/ProgramPage';
import ManagementUsersPage from './components/Admin/ManagmentUsersPage';

import ManagementWardsPage from './components/Admin/ManagementWardsPage';
import ProjectLists from './components/Projects/ProjectLists';
import ProjectItem from './components/Projects/ProjectItem';
import ApproveGrantPage from './components/Projects/ApprovaGrantPage';

function App() {
  return (
  
   <AuthProvider> 
      <Router>
        <>
          <Toaster richColors />
          <Routes>
          
            <Route path="/" element={<Login/>} />
            <Route path="/addproject" element={<AddProjectForm />} />
            <Route path="/viewproject" element={<ProjectLists/>} />
            <Route path="/approveproject" element={<ProjectItem/>} />
            <Route path="/dashboards" element={
              <div className='w-full flex justify-center items-center h-[90vh] p-0 m-0'>
                <AddUserForm/>
              </div>
            } />
            <Route path="/dashboard" element={<AdminDashboard />}>
            <Route index element={<DashboardPage/>} />
              <Route path="grants" element={<GrantsPage/>} />
              <Route path="programs" element={<ProgramsPage/>} />
              <Route path="management/users" element={<ManagementUsersPage />} />
              <Route path="management/wards" element={<ManagementWardsPage />} />
              {/* <Route path="/grant-proposal" element={<ApproveGrantPage/>} /> */}
            </Route>
            <Route path="/demodashboard" element={<AdminDashboard/>} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
           
          </Routes>
        </>
      </Router>
       </AuthProvider> 
   
  );
}

export default App;
