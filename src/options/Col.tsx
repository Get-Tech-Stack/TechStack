import React from 'react';

interface ColProps {
  title: string;
}
const Col = ({}: ColProps) => {
  return (
    <div className="tackstack-container">
      <h2 className="techstack-container-title">Tech Stack</h2>

      <button className="techstack-save-btn">Save</button>
    </div>
  );
};

export default Col;
