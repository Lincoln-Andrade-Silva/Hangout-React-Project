export interface IPost {
    id: string;
    title: string;
    description: string;
    category: string;
    city: string;
    venue: string;
    date: Date;
}

export class Post implements Post {
    constructor(init?: PostFormValues) {
        Object.assign(this, init)
    }
}

export class PostFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    city: string = '';
    venue: string = '';

    constructor(post?: IPost) {
        if (post) {
            this.id = post.id;
            this.title = post.title;
            this.category = post.category;
            this.description = post.description;
            this.date = post.date;
            this.city = post.city;
            this.venue = post.venue;
        }
    }
}