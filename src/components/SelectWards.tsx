import Select from 'react-select';
import { Option } from '@/types/SelectWardOptions';
import {  useEffect } from 'react';

interface SelectWardsProps {
  options: Option[];
  onChange: (option: Option | null) => void; 
  value: Option | null;
}

const SelectWards = ({ options, onChange, value }: SelectWardsProps) => {  
 
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

export default SelectWards;
