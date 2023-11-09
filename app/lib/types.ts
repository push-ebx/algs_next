export interface Article {
  id?: number,
  title?: string;
  author?: string;
  file_url?: string;
  category?: string;
  subcategory?: string;
  is_draw?: boolean;
}

export interface ArticleByCategory {
  category: {
    subcategory: Article[]
  }
}