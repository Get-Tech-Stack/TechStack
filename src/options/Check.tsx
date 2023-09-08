import React, { useEffect } from 'react';
import * as Switch from '@radix-ui/react-switch';

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
    <form>
      <div className="techstack-checkbox-root">
        <label className="techstack-checkbox-title-primary">{title}</label>
        <div className="techstack-checkbox">
          <Switch.Root className="SwitchRoot" id={storageKey} checked={value} onCheckedChange={handleCheckboxClick}>
            <Switch.Thumb className="SwitchThumb" />
          </Switch.Root>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label className="Label" htmlFor={storageKey} style={{ paddingRight: 15 }}>
              {subTitle}
            </label>
          </div>

          {/* <span className="techstack-checkbox-title-second"></span> */}
        </div>
      </div>
      {/* <input className="techstack-checkbox" type="checkbox" onChange={handleCheckboxClick} checked={value} /> */}
    </form>
  );
};

export default Check;
