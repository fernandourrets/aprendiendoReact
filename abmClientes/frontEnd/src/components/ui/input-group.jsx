import React from "react";

// The main wrapper for the input and its addons
export const InputGroup = ({ children, className = "" }) => {
  return (
    <div className={`relative flex items-stretch w-full ${className}`}>
      {children}
    </div>
  );
};

// For text or icons added to the start/end
export const InputGroupAddon = ({ children, className = "" }) => {
  return (
    <span className={`flex items-center px-3 bg-gray-100 border border-gray-300 text-gray-500 sm:text-sm ${className}`}>
      {children}
    </span>
  );
};

// The actual input field, styled to merge with addons
export const InputGroupInput = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`block w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all ${className}`}
      {...props}
    />
  );
});

// For text or icons added to the start/end
export const selectType = ({ children, className = "" }) => {
  return (
    <span className={`flex items-center px-3 bg-gray-100 border border-gray-300 text-gray-500 sm:text-sm ${className}`}>
      {children}
    </span>
  );
};