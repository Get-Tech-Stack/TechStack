import React from 'react';
import { useTranslation } from 'react-i18next';
import Dependency from '../Dependency/Dependency';
interface CategoryProps {
  name: string;
  deps: any;
}
const Category = ({ name, deps }: CategoryProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="techstack-title">{t(name)}</div>
      <div className="techstack-deps">
        {deps.map((dependency: any) => (
          <Dependency key={dependency.name} data={dependency} />
        ))}
      </div>
    </div>
  );
};

export default Category;
