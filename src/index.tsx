import React, { Suspense } from "react";
import { createRoot } from 'react-dom/client';
import { HashRouter, Route } from "react-router-dom";
import routers from './routers';

const App = () => (
  <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
            {
                routers.map(({path, component}) =>
                <Route
                    key={path}
                    path={path}
                    component={component}
                />)
            }
        </Suspense>
    </HashRouter>
)
const container = document.getElementById('root');
const root = createRoot(container as Element); // createRoot(container!) if you use TypeScript
root.render(<App />);