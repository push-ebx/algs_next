const articleService = require('../services/article-service');

class ArticleController {
  async createArticle(req, res, next) {
    try {
      const { title, content, category, subcategory, is_draft } = req.body;
      const id = await articleService.createArticle(title, content, category, subcategory, is_draft, req.user_id);
      return res.send({status: 'ok', success: true, message: 'Статья успешно создана!', data: {id}});
    } catch (e) {
      next(e);
    }
  }

  async getArticlesByUserId(req, res, next) {
    try {
      const articles = await articleService.getArticlesByUserId(req.user_id);
      return res.send({ status: 'ok', success: true, data: articles });
    } catch (e) {
      next(e);
    }
  }

  async getArticleById(req, res, next) {
    try {
      const { article_id } = req.query;
      const article = await articleService.getArticleById(article_id);
      if (article) {
        return res.send({ status: 'ok', success: true, data: article });
      } else {
        return res.send({ status: 'ok', success: false, message: 'Статья не найдена' });
      }
    } catch (e) {
      next(e);
    }
  }

  async getUnapprovedArticles(req, res, next) {
    try {
      const unapprovedArticles = await articleService.getUnapprovedArticles();
      return res.send({ status: 'ok', success: true, data: unapprovedArticles });
    } catch (e) {
      next(e);
    }
  }

  async deleteArticle(req, res, next) {
    try {
      const { article_id } = req.query;
      await articleService.deleteArticle(article_id);
      return res.send({ status: 'ok', success: true, message: 'Статья успешно удалена!' });
    } catch (e) {
      next(e);
    }
  }

  async updateArticle(req, res, next) {
    try {
      const { article_id } = req.query;
      const { title, category, subcategory, is_draft } = req.body;
      await articleService.updateArticle(article_id, title, category, subcategory, is_draft);
      return res.send({ status: 'ok', success: true, message: 'Статья успешно обновлена!' });
    } catch (e) {
      next(e);
    }
  }

  async approveArticle(req, res, next) {
    try {
      const userRole = req.role;
      if (userRole !== 'moderator' && userRole !== 'admin') {
        return res.status(403).send({ status: 'error', message: 'У вас нет прав на это действие' });
      }
      const { article_id } = req.query;

      await articleService.approveArticle(article_id);
      return res.send({ status: 'ok', success: true, message: 'Статья успешно одобрена!' });
    } catch (e) {
      next(e);
    }
  }

  async setDraft(req, res, next) {
    try {
      const { article_id } = req.query;
      const { is_draft } = req.body;
      await articleService.setDraft(article_id, is_draft);
      return res.send({ status: 'ok', success: true, message: 'Статус черновика успешно обновлен!' });
    } catch (e) {
      next(e);
    }
  }

  async getTree(req, res, next) {
    const tree = await articleService.getTree();
    return res.send({ status: 'ok', success: true, data: tree });
  }
}

module.exports = new ArticleController();