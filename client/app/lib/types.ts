export interface Article {
  id: number | null;
  title: string;
  file_name: string;
  category: string;
  subcategory: string;
  is_approved: boolean;
  author_id: number;
  created_at: string;
  is_draft: boolean;
}

export interface Tree {
  category: string,
  title: string,
  subcategory?: string,
  id: number
}