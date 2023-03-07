import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

//custom page routing
const VideoList = Loadable(lazy(() => import('views/video-list')));
const UserSetting = Loadable(lazy(() => import('views/user-setting')));
const TiktokAccount = Loadable(lazy(() => import('views/tiktok-account')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'videolist',
            element: <VideoList />
        },
        {
            path: 'usersetting',
            element: <UserSetting />
        },
        {
            path: 'tiktokaccount',
            element: <TiktokAccount />
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
