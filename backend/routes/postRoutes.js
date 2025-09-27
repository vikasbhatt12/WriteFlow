
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createPost, getAllPosts, getPostById, updatePost, deletePost, getMyPosts } = require('../controllers/postController');



router.get('/', getAllPosts);
router.get('/my-posts', protect, getMyPosts); 
router.get('/:id', getPostById);
router.post('/', protect, createPost);     
router.put('/:id', protect, updatePost);  
router.delete('/:id', protect, deletePost); 


module.exports = router;