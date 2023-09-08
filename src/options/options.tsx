/* global document */

import React from 'react';
import ReactDOM from 'react-dom/client';

import Container from './Container';
import Check from './Check';
import RadioGroupDemo from './RadioGroupDemo';
import './i18n';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="techstack-option-background">
      <Container title={t('general')}>
        <Check
          title={t('allow-share-version-info')}
          subTitle={t('allow-share-version-info-more')}
          storageKey="allow_report_version"
          defaultValue={true}
        />
      </Container>
      <Container title={t('appearance')}>
        <Check
          title={t('auto-collapse')}
          subTitle={t('auto-collapse-more')}
          storageKey="auto_collapsed"
          defaultValue={false}
        />
        <Check
          title={t('enable-feedback')}
          subTitle={t('enable-feedback-more')}
          storageKey="enable_feedback"
          defaultValue={true}
        />
        <RadioGroupDemo
          title={t('position')}
          labels={[t('top'), t('middle'), t('bottom')]}
          options={['top', 'middle', 'bottom']}
          defaultValue="top"
          storageKey="techstack_position"
          imgLink={['../options/1.png', '../options/2.png', '../options/3.png']}
        />
      </Container>

      {/* <MyRadioGroup /> */}
      {/* <ToggleGroupDemo /> */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('display-container')!);
root.render(<Index />);
