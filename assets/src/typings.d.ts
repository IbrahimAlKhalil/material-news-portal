import {NavMenu} from "./pages/layout/main-nav";

interface WidgetData {
    name: string
    data?: any
}

interface Widget {
    data?: any
}

interface PostCommon {
    slug: string
    title: string
}

interface Response {
    message?: string
    status?: number
}

declare global {
    interface Window {
        saharaData: {
            mainMenu: NavMenu[]
            logo: string
            description: string
            widgets: (string | WidgetData)[]
            methods: {}
            fallbackImage: string
            storageUrl: string
            dates: string
        },
        saharaRoutes: {
            menu: string
            posts: string
            archiveUrl: string
            homeContents: string
            footer: string,
            comments: string
            comment: string
            category: string
            archive: string
            postView: string
            search: string
        }
    }
}