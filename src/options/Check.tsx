import React, { useEffect } from 'react';

interface CheckProps {
  title: string;
  subTitle: string;

  storageKey: string;
  defaultValue: boolean;
}
const Check = ({ title, subTitle, storageKey: storageKey, defaultValue }: CheckProps) => {
  const [value, setValue] = React.useState(false);
  useEffect(() => {
    chrome.storage.sync.get([storageKey]).then((result) => {
      if (result[storageKey] === undefined) {
        chrome.storage.sync.set({ [storageKey]: defaultValue });
        setValue(defaultValue);
      } else {
        setValue(result[storageKey]);
      }
    });
  }, []);

  const handleCheckboxClick = () => {
    setValue(!value);
    chrome.storage.sync.set({ [storageKey]: !value });
    console.log(`set ${storageKey} to ${!value}`);
  };

  return (
    <div className="techstack-checkbox-root">
      <input type="hidden" />

      <input className="techstack-checkbox" type="checkbox" onChange={handleCheckboxClick} checked={value} />
      <label className="techstack-checkbox-title-primary">{title}</label>
      <span className="techstack-checkbox-title-second">{subTitle}</span>
    </div>
  );
};

export default Check;
