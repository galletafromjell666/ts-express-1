import express from 'express';
import controller from '../controllers/Book';

const router = express.Router();

router.post('/create', controller.CreateBook);
router.get('/get/:bookId', controller.ReadBook);
router.get('/get/', controller.ReadAllBook);
router.patch('/update/:bookId', controller.UpdateBook);
router.delete('/delete/:bookId', controller.DeleteBook);

export = router;
