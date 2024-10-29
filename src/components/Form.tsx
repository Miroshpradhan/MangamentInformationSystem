import { useState } from 'react';
import SelectRoles from './SelectRoles';
import SelectWards from './SelectWards';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { options, municipalrolesOptions, wardrolesoption, Option } from '@/types/SelectWardOptions';

const AddUserForm = () => {
  const [status, setStatus] = useState('active');
  const [selectedWard, setSelectedWard] = useState<Option | null>(null);
  const [selectedRole, setSelectedRole] = useState<Option | null>(null);

  // Determine the roles options based on selected ward
  const isNagarpalika = selectedWard?.value === 'nagarpalika'; // Check if selected ward is 'nagarpalika'
  const roleOptions = isNagarpalika ? municipalrolesOptions : wardrolesoption; // Use correct roles based on the selected ward

  const handleWardChange = (ward: Option | null) => {
    setSelectedWard(ward);
    setSelectedRole(null); // Reset role selection when ward changes
  };

  return (
    <form className="w-4/5 grid grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-lg">
     
      <div className="flex flex-col items-start">
        <Label className="mb-2 text-light capitalize">Username</Label>
        <Input placeholder="Enter username" className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <div className="flex flex-col items-start">
        <Label className="mb-2 text-light capitalize">Email</Label>
        <Input type="email" placeholder="Enter email" className="w-full p-2 border border-gray-300 rounded" />
      </div>

      <div className="flex flex-col items-start">
        <Label className="mb-2 text-light capitalize">Ward No</Label>
        <SelectWards 
          options={options} 
          onChange={handleWardChange} 
          value={selectedWard} 
        />
      </div>

      {/* Roles */}
      <div className="flex flex-col items-start">
        <Label className="mb-2 text-light capitalize">Roles</Label>
        <SelectRoles 
          options={roleOptions} 
          onChange={setSelectedRole} 
          value={selectedRole} 
        />
      </div>

      {/* Status */}
      <div className="flex flex-col items-start">
        <Label className="mb-2 text-light capitalize">Status</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="active"
              checked={status === 'active'}
              onChange={() => setStatus('active')}
              className="form-radio text-blue-600"
            />
            <span>Active</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="blocked"
              checked={status === 'blocked'}
              onChange={() => setStatus('blocked')}
              className="form-radio text-red-600"
            />
            <span>Blocked</span>
          </label>
        </div>
      </div>

      <div className="col-span-2 flex justify-end">
        <button
          type="submit"
          className="btn-normal btn-blue rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
