import React, { useEffect, useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import storage from '../utils/storage';

interface ToggleGroupProps {
  title: string;
  // subTitle: string;

  storageKey: string;
  defaultValue: string;
  options: string[];
  labels: string[];
  imgLink: string[];
}

const RadioGroupDemo = ({ storageKey, title, defaultValue, options, labels, imgLink }: ToggleGroupProps) => {
  const [value, setValue] = useState('default');

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

  const handleGroupChange = (value: string) => {
    storage.set({ [storageKey]: value });
    setValue(value);
  };
  return (
    <form>
      <div className="techstack-checkbox-title-primary">{title}</div>
      <RadioGroup.Root
        className="RadioGroupRoot"
        value={value}
        onValueChange={handleGroupChange}
        defaultValue={defaultValue}
        aria-label="View density"
      >
        {labels.map((label, index) => {
          return (
            <div key={`r${index + 1}`} style={{ display: 'flex', alignItems: 'center' }}>
              <RadioGroup.Item className="RadioGroupItem" value={options[index]} id={`r${index + 1}`}>
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor={`r${index + 1}`}>
                {label}
              </label>
            </div>
          );
        })}
      </RadioGroup.Root>

      <div className="techstack-img-container">
        <img className="techstack-img" src={imgLink[options.indexOf(value)]}></img>
      </div>
    </form>
  );
};

export default RadioGroupDemo;
