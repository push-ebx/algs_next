'use server'

import { db } from '@vercel/postgres';
import {Article} from "@/app/lib/types";


export async function fetchArticleByID(id?: number) {
  try {
    if (!id) return;
    const client = await db.connect();
    const data = await client.sql<Article>`
      SELECT * FROM articles
      WHERE id=${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch article data.');
  }
}

export async function createArticle(article: Article) {
  try {

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create article.');
  }
}

export async function getLastArticleID() {
  try {
    const client = await db.connect();
    const data = await client.sql`
        SELECT MAX(id) FROM articles;
    `;

    return data.rows[0].max;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create article.');
  }
}

export async function updateArticle(article: Article) {
  try {
    const client = await db.connect();
    const data = await client.sql`
      UPDATE articles
      SET title=${article.title}, author=${article.author}, category=${article.category}, subcategory=${article.subcategory}, content=${article.content}, is_draw=${article.is_draw}, header_image=${article.header_image}
      WHERE id=${article.id};
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update article.');
  }
}