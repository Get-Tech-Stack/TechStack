import React from 'react';
import { useTranslation } from 'react-i18next';
import Dependency from './Dependency';
interface StackCollectProps {
    name: string;
    deps: any;
}
const StackCollect = ({ name, deps }: StackCollectProps) => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="f4">{t(name)}</div>
            <div className="deps">
                {deps.map((dependency: any) => (
                    <Dependency key={dependency.name} data={dependency} />
                ))}
            </div>
        </div>
    );
};

export default StackCollect;
