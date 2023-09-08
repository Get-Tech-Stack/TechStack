/* global document */

import React from 'react';
import ReactDOM from 'react-dom/client';

import Container from './Container';
import Check from './Check';
import RadioGroupDemo from './RadioGroupDemo';
// import MyRadioGroup from './Grounp';
// import ToggleGroupDemo from './ToggleGroupDemo';

const Index = () => {
  return (
    <div className="techstack-option-background">
      <Container title="通常">
        <Check title="允许报告版本" subTitle="报告版本" storageKey="allow_report_version" defaultValue={true} />
      </Container>
      <Container title="界面">
        <Check title="自动折叠" subTitle="当技术栈过多时折叠技术栈" storageKey="auto_collapsed" defaultValue={false} />
        <Check title="显示反馈" subTitle="当技术栈过多时折叠技术栈" storageKey="enable_feedback" defaultValue={true} />
        <RadioGroupDemo
          title="技术栈的位置"
          subTitle="技术栈的位置"
          labels={['最上方', 'about之后', 'language之后']}
          options={['top', 'middle', 'bottom']}
          defaultValue="top"
          storageKey="techstack_position"
        />
      </Container>

      {/* <MyRadioGroup /> */}
      {/* <ToggleGroupDemo /> */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('display-container')!);
root.render(<Index />);
