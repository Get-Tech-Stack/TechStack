import React, { useEffect } from 'react';
import * as Switch from '@radix-ui/react-switch';
import storage from '../utils/storage';

interface CheckProps {
  title: string;
  subTitle: string;

  storageKey: string;
  defaultValue: boolean;
}
const Check = ({ title, subTitle, storageKey: storageKey, defaultValue }: CheckProps) => {
  const [value, setValue] = React.useState(false);
  useEffect(() => {
    storage.get([storageKey]).then((result) => {
      if (result[storageKey] === undefined) {
        storage.set({ [storageKey]: defaultValue });
        setValue(defaultValue);
      } else {
        setValue(result[storageKey]);
      }
    });
  }, []);

  const handleCheckboxClick = () => {
    setValue(!value);
    storage.set({ [storageKey]: !value });
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
        </div>
      </div>
    </form>
  );
};

export default Check;
