import React from 'react';
import AddUserForm from '../Form';

const ManagementUsersPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <p>This is the Manage Users page where you can add, edit, or remove users.</p>
      <AddUserForm/>
    </div>
  );
};

export default ManagementUsersPage;
