import Home from '@pages/home';
import Editor from '@pages/editor';

const Routers = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/editor',
        name: 'editor',
        component: Editor
    },
];
export default Routers;
