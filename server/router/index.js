const express = require("express");
const authMiddleware = require('../middlewares/auth-middleware');
const AuthController = require("../controllers/auth-controller");
const UserController = require("../controllers/user-controller");
const ArticleController = require("../controllers/article-controller");

const router = express.Router();

router.post("/auth/login", AuthController.login);
router.post("/auth/registration", AuthController.registration);

router.get("/user/get", authMiddleware, UserController.getUser)
router.get("/users/get", authMiddleware, UserController.getUsers);
router.get("/users/assign-role", authMiddleware, UserController.assignRole);

router.post("/article/create", authMiddleware, ArticleController.createArticle);
router.get("/articles/unapproved", authMiddleware, ArticleController.getUnapprovedArticles);
router.get("/article/get", ArticleController.getArticleById);
router.get("/articles/get", authMiddleware, ArticleController.getArticlesByUserId);
router.delete("/article/delete", authMiddleware, ArticleController.deleteArticle);
router.put("/article/update", authMiddleware, ArticleController.updateArticle);
router.post("/article/approve-article", authMiddleware, ArticleController.approveArticle);
router.post("/article/setDraft", authMiddleware, ArticleController.setDraft);
router.get("/articles/get-tree", ArticleController.getTree);
router.get("/article/get-random", ArticleController.getRandomArticle);

// router.post("/user/upload", UserController.uploadImage);

router.get("/", (req, res) => res.send({ status: "ok" }));

module.exports = router;