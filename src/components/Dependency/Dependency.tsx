import React from 'react';

interface DependencyProps {
    data: any;
}
const Dependency = ({ data }: DependencyProps) => {
    return (
        <div>
            <a className="dep-link" href={data.homepage} target="_blank" rel="noreferrer">
                <img className="dep-icon" alt={data.name} src={data.icon}></img>
                <div className="dep-name">{data.name}</div>
            </a>
        </div>
    );
};

export default Dependency;
