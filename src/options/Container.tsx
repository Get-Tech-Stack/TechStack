import React from 'react';

interface ContainerProps {
  title: string;
  children: React.ReactNode;
}
const Container = ({ title, children }: ContainerProps) => {
  return (
    <div className="techstack-container">
      <h2 className="techstack-container-title">{title}</h2>
      <div className="techstack-container-children">{children}</div>
    </div>
  );
};

export default Container;
