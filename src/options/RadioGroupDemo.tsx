import React, { useEffect, useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

interface ToggleGroupProps {
  title: string;
  subTitle: string;

  storageKey: string;
  defaultValue: string;
  options: string[];
  labels: string[];
}

const RadioGroupDemo = ({ storageKey, title, defaultValue, options, labels }: ToggleGroupProps) => {
  const [value, setValue] = useState('default');

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

  const handleGroupChange = (value: string) => {
    chrome.storage.sync.set({ [storageKey]: value });
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
    </form>
  );
};

export default RadioGroupDemo;
