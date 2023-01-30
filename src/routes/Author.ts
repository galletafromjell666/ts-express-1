import express from 'express';
import controller from '../controllers/Author';

const router = express.Router();

router.post('/create', controller.CreateAuthor);
router.get('/get/:authorId', controller.ReadAuthor);
router.get('/get/', controller.ReadAllAuthor);
router.patch('/update/:authorId', controller.UpdateAuthor);
router.delete('/delete/:authorId', controller.DeleteAuthor);

export = router;
