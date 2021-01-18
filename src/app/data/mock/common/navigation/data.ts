/* tslint:disable:max-line-length */
import { TreoNavigationItem } from '@treo/components/navigation';

export const defaultNavigation: TreoNavigationItem[] = [
    {
        id: 'products',
        title: 'Products',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'products.example',
                title: 'Overview',
                type: 'basic',
                link: '/products'
            },
        ]
    },
    {
        id: 'solutions',
        title: 'Solutions',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'solutions',
                title: 'Overview',
                type: 'basic',
                link: '/solutions'
            },
            {
                id: 'solutions.by-use-case',
                title: 'By Use Case',
                type: 'basic',
                link: '/solutions/by-use-case'
            },
            {
                id: 'solutions.industry',
                title: 'By Industry',
                type: 'basic',
                link: '/solutions/by-industry'
            },
            {
                id: 'solutions.by-organisation-type',
                title: 'By Organisation Type',
                type: 'basic',
                link: '/solutions/by-organisation-type'
            },
        ]
    },
    {
        id: 'services',
        title: 'Services',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'services',
                title: 'Overview',
                type: 'basic',
                link: '/services',
            },
        ],
    },
];
export const compactNavigation: TreoNavigationItem[] = [
    {
        id: 'products',
        title: 'products',
        type: 'aside',
        icon: 'apps',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }
];
export const futuristicNavigation: TreoNavigationItem[] = [
    {
        id: 'products.example',
        title: 'Example component',
        type: 'basic',
        icon: 'heroicons:chart-pie',
        link: '/example'
    },
    {
        id: 'products.dummy.1',
        title: 'Dummy menu item #1',
        icon: 'heroicons:calendar',
        type: 'basic'
    },
    {
        id: 'products.dummy.2',
        title: 'Dummy menu item #1',
        icon: 'heroicons:user-group',
        type: 'basic'
    }
];
export const horizontalNavigation: TreoNavigationItem[] = [
    /*
    {
        id: 'products',
        title: 'Products',
        type: 'group',
        icon: 'category',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    */
    {
        id: 'solutions',
        title: 'Solutions',
        type: 'basic',
        icon: 'emoji_objects',
        link: '/solutions',
    },
    {
        id: 'services',
        title: 'Services',
        type: 'basic',
        icon: 'code',
        link: '/services',
    },
    {
        title: 'Documentation',
        type: 'basic',
        icon: 'menu_book',
        link: '/documentations'
    },
    {
        title: 'Learn',
        type: 'basic',
        icon: 'school',
        link: '/learn'
    },
    {
        title: 'Partners',
        type: 'basic',
        icon: 'group',
        link: '/partners'
    },
];
