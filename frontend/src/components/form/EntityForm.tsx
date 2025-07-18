'use client';

import { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';

export type Field = { 
  name: string; 
  label: string; 
  type?: 'text' | 'number' | 'date' | 'select'; 
  options?: { label: string; value: string | number }[];
};

type EntityFormProps = {
  initialData?: Record<string, unknown> | null;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  fields: Field[];
};

export default function EntityForm({
  initialData = {},
  onSubmit,
  fields,
}: EntityFormProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData || {});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
    let parsedValue: string | number = value;
    if (type === 'number') {
        parsedValue = value === '' ? '' : Number(value);
    }
    console.log(parsedValue)
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        console.log(formData)
        await onSubmit(formData);
    } finally {
        setLoading(false);
    }
  };

  return (
    <form className="bg-white p-6 rounded-xl shadow w-full" onSubmit={handleSubmit}>
      {fields.map((field) =>
        field.type === 'select' ? (
          <SelectField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formData[field.name] as string | number}
            onChange={handleChange}
            options={field.options || []}
          />
        ) : (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.name] as string | number}
            onChange={handleChange}
          />
        )
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        {loading ? 'Saving...' : 'Submit'}
      </button>
    </form>
  );
}
