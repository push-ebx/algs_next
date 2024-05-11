const fs = require('fs').promises;
const {v4: uuidv4} = require('uuid');
const path = require('path');

class ArticleService {
  async createArticle(title, content, category, subcategory, is_draft, author_id) {
    try {
      const file_name = uuidv4();
      const filePath = path.join(__dirname, '../public', `${file_name}.md`);

      await fs.writeFile(filePath, content);

      await mysql.query(`
        INSERT INTO articles (title, file_name, category, subcategory, is_approved, author_id, created_at, is_draft)
        VALUES ('${title}', '${file_name}', '${category}', '${subcategory}', ${0}, '${author_id}', NOW(), ${is_draft ? 1 : 0})
      `);

      const [[{ article_id }]] = await mysql.query(`SELECT LAST_INSERT_ID() as id`);
      return article_id;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getArticlesByUserId(author_id) {
    try {
      const [articles] = await mysql.query(`
        SELECT * FROM articles WHERE author_id = '${author_id}'
      `);
      return articles;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getArticleById(article_id) {
    try {
      const [[article]] = await mysql.query(`
        SELECT * FROM articles WHERE article_id = '${article_id}'
      `);
      return article;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUnapprovedArticles() {
    try {
      const [unapproved_articles] = await mysql.query(`
        SELECT * FROM articles WHERE is_approved = 0
      `);
      return unapproved_articles;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteArticle(article_id) {
    try {
      await mysql.query(`
        DELETE FROM articles WHERE article_id = '${article_id}'
      `);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async updateArticle(article_id, title, category, subcategory, is_draft) {
    try {
      await mysql.query(`
        UPDATE articles 
        SET title = '${title}', category = '${category}', subcategory = '${subcategory}', is_draft = ${is_draft ? 1 : 0}, is_approved = 0
        WHERE article_id = '${article_id}'
      `);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async approveArticle(article_id) {
    try {
      await mysql.query(`
        UPDATE articles 
        SET is_approved = 1
        WHERE id = '${article_id}'
      `);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async setDraft(article_id, is_draft) {
    try {
      await mysql.query(`
        UPDATE articles 
        SET is_draft = ${is_draft ? 1 : 0}
        WHERE article_id = '${article_id}'
      `);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getTree() {
    try {
      const [data] = await mysql.query(`
      SELECT category, subcategory, title, id FROM articles
      ORDER BY category, subcategory, title;
    `);

      const tree = { title: "Содержание", child: [] };

      let currentCategory = '';
      let currentSubcategory = '';
      let categoryIndex = -1;
      let subcategoryIndex = -1;

      for (const article of data) {
        if (article.category !== currentCategory) {
          // новая категория
          tree.child.push({ title: article.category, child: [] });
          categoryIndex++;
          subcategoryIndex = -1;
          currentCategory = article.category;
          currentSubcategory = '';
        }

        if (article.subcategory !== currentSubcategory) {
          // новая подкатегория
          tree.child[categoryIndex].child.push({ title: article.subcategory, child: [] });
          subcategoryIndex++;
          currentSubcategory = article.subcategory;
        }

        // добавляем статью в подкатегорию
        tree.child[categoryIndex].child[subcategoryIndex].child.push({ title: article.title, id: article.id });
      }

      return tree;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new ArticleService();