'use server'

import {sql} from '@vercel/postgres';
import { db } from '@vercel/postgres';
import {Article, Tree} from "@/app/lib/types";
import {TreeType} from "@/app/ui";

export async function fetchAllArticles() {
  try {
    console.log(process.env.POSTGRES_URL)
    const client = await db.connect();

    const data = await client.sql<Tree>`
      SELECT category, title, subcategory, id FROM articles
      ORDER BY category, subcategory, title;
    `;

    const tree: TreeType = {title: "Содержание", child: []};

    let category = '';
    let subcategory = '';
    let index_category = 0;
    let index_subcategory = 0;

    for (const article of data.rows) {
      if (article.subcategory !== subcategory) {
        if (article.category !== category) { // если новая категория, то и новая подкатегория
          tree.child?.push({
            child: [{title: article.subcategory, child: [{title: article.title, id: article.id}]}],
            title: article.category
          });
          index_category++;
          index_subcategory = 0;
        } else { // если та же категория, но другая подкатегория
          // @ts-ignore
          tree.child[index_category - 1].child.push({
            title: article.subcategory,
            child: [{title: article.title, id: article.id}]
          });
          index_subcategory++;
        }
      } else { // та же подкатегория
        // @ts-ignore
        tree.child[index_category - 1].child[index_subcategory].child.push({title: article.title, id: article.id});
      }
      category = article.category!;
      subcategory = article.subcategory!;
    }

    return tree;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tree data.');
  }
}

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
    const client = await db.connect();
    const data = await client.sql`
      INSERT INTO articles (title, author, category, subcategory, content, is_draw)
      VALUES (${article.title}, ${article.author}, ${article.category}, ${article.subcategory}, ${article.content}, ${article.is_draw});
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create article.');
  }
}