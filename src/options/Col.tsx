import React from 'react';

interface ColProps {
  title: string;
  children: React.ReactNode;
}
const Col = ({ title, children }: ColProps) => {
  return (
    <div className="techstack-container">
      <h2 className="techstack-container-title">{title}</h2>
      <div className="techstack-container-children">{children}</div>
    </div>
  );
};

export default Col;
