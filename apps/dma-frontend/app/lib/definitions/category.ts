type Base = {
    documentId: string;
    id: number;
    name: string;
    description: string;
}

export type Category = Base & {
    services: Service[];
}

export type Service = Base & {
    showcases: Showcase[];
    category: Category;
    tagline: string;
}

export type Showcase = Base & {
    service: Service;
}

export type StrapiError = {
    error: {
        message: string;
    }
}