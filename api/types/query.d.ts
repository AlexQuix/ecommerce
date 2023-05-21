export interface IQueryPagination{
    page: number;
}

export interface IQueryCategory extends IQueryPagination{
    category_name: string;
}

export interface IQueryColor extends IQueryPagination{
    color: string;
}

export interface IQueryProduct extends IQueryPagination{
    product_name: string;
    min_price: number;
    max_price: number;
    quantity: number;
    offer: number;
    category: string;
}