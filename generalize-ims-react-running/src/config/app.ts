interface AppConfig {
    name: string,
    github: {
        title: string,
        url: string
    },
    author: {
        name: string,
        url: string
    },
}

export const appConfig: AppConfig = {
    name: "Inventory Management System",
    github: {
        title: "React Starter",
        url: "https://cmti.res.in/about-us/",
    },
    author: {
        name: "cmti",
        url: "https://cmti.res.in/about-us/",
    }
}

