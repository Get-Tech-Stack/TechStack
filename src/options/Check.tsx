import React from 'react';

interface CheckProps {
  title: string;
  subTitle: string;
}
const Check = ({ title, subTitle }: CheckProps) => {
  return (
    <div className="techstack-checkbox-root">
      <input type="hidden" />

      <input className="techstack-checkbox" type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
      <label className="techstack-checkbox-title-primary">{title}</label>
      <span className="techstack-checkbox-title-second">{subTitle}</span>
    </div>
  );
};

export default Check;
