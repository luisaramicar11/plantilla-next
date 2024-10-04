import React from 'react';

interface ISelectProps {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectLanguage: React.FC<ISelectProps> = ({ label, onChange }) => {
    return (
        <div>
            <label htmlFor="language-select">{label}</label><br />
            <select id="language-select" onChange={onChange}>
                <option disabled value="">
                    --Choose an option--
                </option>
                <option value=""></option>
                <option value=""></option>
            </select>
        </div>
    );
};

export default SelectLanguage;
