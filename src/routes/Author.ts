import express from 'express';
import controller from '../controllers/Author';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.author.create), controller.CreateAuthor);
router.get('/get/:authorId', controller.ReadAuthor);
router.get('/get/', controller.ReadAllAuthor);
router.patch('/update/:authorId', ValidateSchema(Schemas.author.update), controller.UpdateAuthor);
router.delete('/delete/:authorId', controller.DeleteAuthor);

export = router;
