'use server'

import { db } from '@vercel/postgres';
import {Article} from "@/app/lib/types";

export async function fetchListArticles() {
  try {
    const client = await db.connect();

    const data = await client.sql<Article>`
      SELECT title, id, is_draw FROM articles
      ORDER BY id;
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch list articles.');
  }
}