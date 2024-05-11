const { db } = require('@vercel/postgres');
const { article } = require('../app/lib/placeholder-data.ts');

async function main() {
  const client = await db.connect();

  // await client.sql`
  //   CREATE TABLE IF NOT EXISTS articles (
  //     id INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
  //     title VARCHAR(255) NOT NULL,
  //     author VARCHAR(255) NOT NULL,
  //     category VARCHAR(255) NOT NULL,
  //     subcategory VARCHAR(255) NOT NULL,
  //     content TEXT NOT NULL,
  //     is_draw BIT
  //   );
  // `;
  //
  await client.sql`
    INSERT INTO articles (id, title, author, category, subcategory, content, is_draw)
    VALUES (${1}, ${'Двоичная куча'}, ${'Nikita'}, ${'Стуктуры дданных'}, ${'Деревья'}, ${article}, ${1})
    ON CONFLICT (id) DO NOTHING;
  `;

  const res = await client.sql`
    select * from articles
    order by category, subcategory;
  `

  // console.log(res.)

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
