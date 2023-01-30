import express from 'express';
import controller from '../controllers/Book';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';
const router = express.Router();

router.post('/create', ValidateSchema(Schemas.book.create), controller.CreateBook);
router.get('/get/:bookId', controller.ReadBook);
router.get('/get/', controller.ReadAllBook);
router.patch('/update/:bookId', ValidateSchema(Schemas.book.create), controller.UpdateBook);
router.delete('/delete/:bookId', controller.DeleteBook);

export = router;
