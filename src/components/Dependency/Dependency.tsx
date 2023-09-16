import React from 'react';

interface DependencyProps {
  data: any;
}
const Dependency = ({ data }: DependencyProps) => {
  return (
    <div>
      <a className="techstack-link" href={data.homepage} target="_blank" rel="noreferrer">
        <img className="techstack-icon" alt={data.name} src={data.icon}></img>
        <div className="techstack-name">{data.name}</div>
      </a>
    </div>
  );
};

export default Dependency;
