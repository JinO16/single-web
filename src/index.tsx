import React from "react";
import { createRoot } from 'react-dom/client';
import Home from '@pages/home/index';
// import { App } from '@containers/home/app';
// const App:React.FC  = () => <div>入口文件</div>;

const container = document.getElementById('root');
console.log('container--', container);
const root = createRoot(container as Element); // createRoot(container!) if you use TypeScript
root.render(<Home />);