import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  options: Option[];
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, fullWidth = false, size = 'md', className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors bg-white text-gray-900';
    const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';
    const width = fullWidth ? 'w-full' : '';

    const sizes = {
      sm: 'py-2 text-sm',
      md: 'py-2.5 text-sm',
      lg: 'py-3 text-base'
    };

    return (
      <div className={`${width} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            ${baseStyles}
            ${errorStyles}
            ${sizes[size]}
            ${props.disabled ? 'bg-gray-50 cursor-not-allowed text-gray-500' : ''}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-900">
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select'; 