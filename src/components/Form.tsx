import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import SelectRoles from './SelectRoles';
import SelectWards from './SelectWards';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { municipalrolesOptions, wardrolesoption, Option } from '@/types/SelectWardOptions';
import apiClient from "@/config/axios";
import { useAuth } from './AuthContext';

const AddUserForm = () => {
  const { municipalityId, isLoggedIn } = useAuth(); 
  const [status, setStatus] = useState('active');
  const [selectedWard, setSelectedWard] = useState<Option | null>(null);
  const [selectedRole, setSelectedRole] = useState<Option | null>(null);
  const [wards, setWards] = useState<Option[]>([]);

  const isNagarpalika = selectedWard?.value === 'nagarpalika'; 
  const roleOptions = isNagarpalika ? municipalrolesOptions : wardrolesoption; 

  const handleWardChange = (ward: Option | null) => {
    setSelectedWard(ward);
    setSelectedRole(null);
  };

  useEffect(() => {
    const fetchWards = async () => {
      if (municipalityId && isLoggedIn) {
        try {
          const token = localStorage.getItem('token');
          const response = await apiClient.get(`/ward/${municipalityId}`, {
            headers: { Authorization: token },
          });

          const wardOptions = response.data.data.wards.map((ward: any) => ({
            label: ward.name, 
            value: ward.id,
          }));

          const permanentOptions = [
            { label: 'Nagarpalika', value: 'nagarpalika' },
          
          ];
          const allOptions = [...permanentOptions, ...wardOptions];
          setWards(allOptions); 
        } catch (err) {
          console.error('Error fetching wards:', err);
          toast.error('Failed to load wards.');
        }
      }
    };
    fetchWards();
  }, [municipalityId, isLoggedIn]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!selectedWard) {
      toast.error('Please select a ward.');
      return;
    }
    if (!selectedRole) {
      toast.error('Please select a role.');
      return;
    }
  
    const userData = {
      username: event.currentTarget.username.value,
      email: event.currentTarget.email.value,
      ward: selectedWard.value,
      role: selectedRole.value,
      status: status,
      municipality_id: municipalityId,
      first_name: event.currentTarget.username.value,
    };
  
    try {
      const token = localStorage.getItem('token'); 
      const response = await apiClient.post('/users', userData, {
        headers: {
          Authorization: token,
        },
      });
  
      if (response.data.success) {
        toast.success('User added successfully.');
       
      } else {
        toast.error('Failed to add user: ' + response.data.message);
      }
    } catch (err) {
      console.error('Error adding user:', err);
      toast.error('Failed to add user.');
    }
  };
  
  return (
    <form className="w-full max-w-md mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
   <div className="flex flex-col items-start">
      <Label className="mb-2 text-light capitalize">Username</Label>
      <Input name="username" placeholder="Enter username" className="w-full p-2 border border-gray-300 rounded" required />
    </div>

    <div className="flex flex-col items-start">
      <Label className="mb-2 text-light capitalize">Email</Label>
      <Input type="email" name="email" placeholder="Enter email" className="w-full p-2 border border-gray-300 rounded" required />
    </div>

    <div className="flex flex-col items-start">
      <Label className="mb-2 text-light capitalize">Ward No</Label>
      <SelectWards 
        options={wards} 
        onChange={handleWardChange} 
        value={selectedWard} 
      />
    </div>

    <div className="flex flex-col items-start">
      <Label className="mb-2 text-light capitalize">Roles</Label>
      <SelectRoles 
        options={roleOptions} 
        onChange={setSelectedRole} 
        value={selectedRole} 
      />
    </div>

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
            value="inactive" 
            checked={status === 'inactive'}
            onChange={() => setStatus('inactive')} 
            className="form-radio text-red-600"
          />
          <span>Inactive</span>
        </label>
      </div>
    </div>

    <div className="col-span-2 flex justify-end">
      <button type="submit" className="btn-normal btn-blue rounded px-4 py-2 font-semibold hover:bg-blue-700 transition">
        Add User
      </button>
    </div>
  </form>
);
};
export default AddUserForm;
