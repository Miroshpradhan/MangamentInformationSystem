import Select from 'react-select';
import { Option } from '@/types/SelectWardOptions';

interface SelectWardsProps {
  options: Option[];
  onChange: (option: Option | null) => void; 
  value: Option | null;
}

const SelectWards = ({ options, onChange, value }: SelectWardsProps) => {
  return (
    <div className="w-full">
      <Select 
        options={options} 
        value={value} 
        onChange={onChange} 
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        placeholder="Select a ward..."
      />
    </div>
  );
};

export default SelectWards;
