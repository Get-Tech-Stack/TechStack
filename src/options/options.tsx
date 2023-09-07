/* global document */

import React from 'react';
import ReactDOM from 'react-dom/client';

import Col from './Col';
import Check from './Check';

const Index = () => {
  return (
    <div className="techstack-option-background">
      <Col title="hello" />
      <Check title="允许报告版本" subTitle="报告版本" />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('display-container')!);
root.render(<Index />);
