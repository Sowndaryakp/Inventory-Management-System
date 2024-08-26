import React from 'react';

// Table component
interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className={`overflow-auto max-w-full ${className}`}>
      <table className="min-w-full sm:min-w-[600px]">
        {children}
      </table>
    </div>
  );
};

// TableHeader component
export const TableHeader: React.FC = ({ children }) => {
  return <thead>{children}</thead>;
};

// TableBody component
export const TableBody: React.FC = ({ children }) => {
  return <tbody>{children}</tbody>;
};

// TableRow component
export const TableRow: React.FC = ({ children }) => {
  return <tr>{children}</tr>;
};

// TableHead component
export const TableHead: React.FC = ({ children }) => {
  return <th className="p-2">{children}</th>;
};

// TableCell component
export const TableCell: React.FC = ({ children }) => {
  return <td className="p-2">{children}</td>;
};
