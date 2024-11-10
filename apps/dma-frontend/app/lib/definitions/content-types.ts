type Base = {
    documentId: string;
    id: number;
    name: string;
    description: string;
}

type StrapiImage = {
    name: string;
    url: string;
    ext: string;
    hash: string;
    height: number;
    width: number;
    size: number;
    mime: string;
}

type CoverImage = Omit<Base, "name" | "description"> & StrapiImage & {
    formats: {
        large: StrapiImage;
        thumbnail: StrapiImage;
        small: StrapiImage;
        medium: StrapiImage;
    }
}

export type Category = Base & {
    services: Service[];
}

export type Service = Base & {
    showcases: Showcase[];
    category: Category;
    tagline: string;
    cover_image: CoverImage;
}

export type Showcase = Base & {
    service: Service;
    cover_image: CoverImage;
    link: string;
}
