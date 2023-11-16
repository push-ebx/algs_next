export interface Article {
  id?: number,
  title?: string;
  author?: string;
  category?: string;
  subcategory?: string;
  content?: string;
  is_draw?: boolean;
}

export interface Tree {
  category: string,
  title: string,
  subcategory?: string,
  id: number
}