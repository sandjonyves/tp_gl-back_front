import React from 'react';
import { X, AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'error' | 'warning' | 'info' | 'success';
  className?: string;
  onClose?: () => void;
  title?: string;
}

export const Alert = ({
  children,
  variant = 'info',
  className = '',
  onClose,
  title
}: AlertProps) => {
  const variants = {
    error: {
      container: 'bg-red-50/80 backdrop-blur-sm text-red-800 border-red-200',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      title: 'text-red-800 font-medium',
      closeButton: 'hover:bg-red-100/50'
    },
    warning: {
      container: 'bg-yellow-50/80 backdrop-blur-sm text-yellow-800 border-yellow-200',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      title: 'text-yellow-800 font-medium',
      closeButton: 'hover:bg-yellow-100/50'
    },
    info: {
      container: 'bg-blue-50/80 backdrop-blur-sm text-blue-800 border-blue-200',
      icon: <Info className="h-5 w-5 text-blue-500" />,
      title: 'text-blue-800 font-medium',
      closeButton: 'hover:bg-blue-100/50'
    },
    success: {
      container: 'bg-green-50/80 backdrop-blur-sm text-green-800 border-green-200',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: 'text-green-800 font-medium',
      closeButton: 'hover:bg-green-100/50'
    }
  };

  const currentVariant = variants[variant];

  return (
    <div
      className={`
        relative rounded-xl border p-4
        transform transition-all duration-300 ease-in-out
        hover:shadow-lg hover:scale-[1.02]
        ${currentVariant.container}
        ${className}
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 animate-bounce-subtle">
          {currentVariant.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h3 className={`text-sm font-medium mb-1 ${currentVariant.title}`}>
              {title}
            </h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`
              ml-4 -mt-1 -mr-2 p-2 rounded-lg
              transition-colors duration-200
              ${currentVariant.closeButton}
            `}
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}; 