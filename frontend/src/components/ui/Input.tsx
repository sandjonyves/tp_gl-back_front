import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, fullWidth = false, className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-400';
    const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';
    const width = fullWidth ? 'w-full' : '';

    return (
      <div className={`${width} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            ref={ref}
            className={`
              ${baseStyles}
              ${errorStyles}
              ${Icon ? 'pl-10' : ''}
              ${props.disabled ? 'bg-gray-50 cursor-not-allowed text-gray-500' : 'bg-white'}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 