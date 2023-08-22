/* global document */

import React from 'react';
import ReactDOM from 'react-dom/client';

const Index = () => <div>Hello React!</div>;

const root = ReactDOM.createRoot(document.getElementById('display-container')!);
root.render(<Index />);
