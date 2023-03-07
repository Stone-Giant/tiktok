// assets
import { IconDashboard, IconVideo, IconUser, IconBrandTiktok } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconVideo, IconUser, IconBrandTiktok };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'usersetting',
            title: 'User Setting',
            type: 'item',
            url: '/usersetting',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'videolist',
            title: 'Video List',
            type: 'item',
            url: '/videolist',
            icon: icons.IconVideo,
            breadcrumbs: false
        },
        {
            id: 'tiktokaccount',
            title: 'Tiktok Account',
            type: 'item',
            url: '/tiktokaccount',
            icon: icons.IconBrandTiktok,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
