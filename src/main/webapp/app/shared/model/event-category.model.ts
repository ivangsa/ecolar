import { IEventCategory } from 'app/shared/model//event-category.model';

export interface IEventCategory {
    id?: string;
    name?: string;
    description?: string;
    parentCategories?: IEventCategory[];
    mainCategory?: IEventCategory;
}

export class EventCategory implements IEventCategory {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public parentCategories?: IEventCategory[],
        public mainCategory?: IEventCategory
    ) {}
}
