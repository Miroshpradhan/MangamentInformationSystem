import Select from 'react-select';
import { Option } from '@/types/SelectWardOptions';
import { useEffect } from 'react';

interface SelectRolesProps {
  options: Option[]; // Role options passed from the parent
  onChange: (option: Option | null) => void; // Function to handle changes
  value: Option | null; // Current selected value
}

const SelectRoles = ({ options, onChange, value }: SelectRolesProps) => {  
  // Effect to update the value state from props if necessary
  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <div className="w-full">
      <Select 
        options={options} 
        value={value} 
        onChange={onChange} 
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
      />
    </div>
  );
}

export default SelectRoles;
