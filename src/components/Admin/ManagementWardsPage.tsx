import React, { useState, FormEvent } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Ward {
  id: number;
  number: string;
}

const ManagementWardsPage: React.FC = () => {
  const [wards, setWards] = useState<Ward[]>([
    { id: 1, number: '1' },
    { id: 2, number: '2' },
    { id: 3, number: '3' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editWard, setEditWard] = useState<Ward | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [wardToDelete, setWardToDelete] = useState<number | null>(null);

  const handleAddWard = () => setIsAdding(true);

  const handleCancel = () => {
    setIsAdding(false);
    setEditWard(null);
    setShowDeleteConfirm(false);
    setWardToDelete(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const wardNumber = (form.elements.namedItem("wardNumber") as HTMLInputElement).value;

    if (editWard) {
      setWards(wards.map((ward) => (ward.id === editWard.id ? { ...ward, number: wardNumber } : ward)));
    } else {
      setWards([...wards, { id: Date.now(), number: wardNumber }]);
    }

    setIsAdding(false);
    setEditWard(null);
  };

  const handleEdit = (ward: Ward) => {
    setEditWard(ward);
    setIsAdding(true);
  };

  const handleDelete = (id: number) => {
    setWardToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (wardToDelete !== null) {
      setWards(wards.filter((ward) => ward.id !== wardToDelete));
      setShowDeleteConfirm(false);
      setWardToDelete(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Wards</h2>
      <button onClick={handleAddWard} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Ward</button>

      {isAdding && (
        <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-start p-4">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-xl font-semibold mb-4">{editWard ? "Edit Ward" : "Add Ward"}</h3>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Ward Number: 
                <input
                  type="text"
                  name="wardNumber"
                  defaultValue={editWard ? editWard.number : ''}
                  required
                  className="border border-gray-300 rounded px-3 py-2 w-full mt-1"
                />
              </label>
              <div className="flex justify-end mt-4">
                <button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this ward?</p>
            <div className="flex justify-end mt-4">
              <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">Cancel</button>
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      <ul className="ward-list mt-4 border border-gray-200 rounded-md">
        {wards.map((ward, index) => (
          <li
            key={ward.id}
            className={`ward-item flex justify-between items-center py-2 px-4 ${
              index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
            }`}
          >
            <span>Ward {ward.number}</span>
            <div className="flex items-center">
              <button onClick={() => handleEdit(ward)} className="text-blue-500 mr-4 text-2xl">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(ward.id)} className="text-red-500 text-2xl">
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagementWardsPage;
