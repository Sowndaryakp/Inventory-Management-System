import { Icons } from "@/components/icons"

interface NavItem {
    title: string
    to?: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
}

interface NavItemWithChildren extends NavItem {
    items?: NavItemWithChildren[]
}

export const mainMenu: NavItemWithChildren[] = [
    {
        title: 'Home',
        to: '',
    },
    // {
    //     title: 'Dropdown',
    //     items: [
    //         {
    //             title: 'Sample',
    //             to: '/sample',
    //         },
    //         {
    //             title: 'Sample Dua',
    //             to: '/#',
    //         },
    //     ]
    // },
    // {
    //     title: 'Empty',
    //     to: 'empty',
    // },
    {
        title: 'Inventory',
        // to: 'inventory',
        items: [
            // {
            //     title: 'Admin Dashboard',
            //     to: '/adminDashboard',
            // },
            {
                title: 'Inventory',
                to: '/inventory',
            },
            {
                title: 'Batch',
                to: '/batch',
            },
            {
                title: 'Location',
                to: '/location',
            },
            
        ]
    },
    {
        title: 'Admin',
        items: [
            // {
            //     title: 'Admin Dashboard',
            //     to: '/adminDashboard',
            // },
            {
                title: 'Add Data Dashboard',
                to: '/addDataDashboard',
            },
            {
                title: 'Approve Request',
                to: '/approveRequests',
            },
            
        ]
    },
    {
        title: 'Register',
        items: [
            {
                title: 'User Register',
                to: '/userRegister',
            },
            {
                title: 'Login',
                to: '/login',
            },
        ]
    },
    // {
    //     title: 'Calibrations Alerts',
    //     items:[
    //         {
    //             title: 'Calibration Alerts',
    //             to: '/calibrationAlerts',
    //         }
    //     ]
    // }
   
]

export const adminMenu: NavItemWithChildren[] = [
    // {
    //     title: 'Admin Dashboard',
    //     to: '/admin',
    // },
    // Add more admin menu items as needed
];
