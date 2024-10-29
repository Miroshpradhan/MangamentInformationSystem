import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import { Toaster } from "@/components/ui/sonner";
import AddUserForm from './components/Form';
import Grants from './components/Admin/Grantpage'; // Example component
import Programs from './components/Admin/ProgramPage'; // Example component
import Users from './components/Admin/ManagmentUsersPage'; // Example component
import Wards from './components/Admin/ManagementWardsPage'; // Example component

function App() {
  return (
    <Router>
      <>
        <Toaster richColors />
        <Routes>
          <Route path="/" element={
        
              <Login />
           
          } />
           <Route path="/dashboards" element={    <div className='w-full flex justify-center items-center h-[90vh] p-0 m-0'>

<AddUserForm />
</div>   } />
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route index element={<div>Select an option from the menu</div>} />
            <Route path="grants" element={<Grants />} />
            <Route path="programs" element={<Programs />} />
            <Route path="management/users" element={<Users />} />
            <Route path="management/wards" element={<Wards />} />
          </Route>

          <Route path="/demodashboard" element={<AdminDashboard />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
