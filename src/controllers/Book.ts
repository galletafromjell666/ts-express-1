import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';

const CreateBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author
    });
    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((err) => res.status(500).json({ err }));
};

const ReadBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findById(bookId)
        .populate('author')
        .then((book) => {
            return book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found' });
        })
        .catch((err) => res.status(500).json({ err }));
};

const ReadAllBook = (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .then((books) => {
            return res.status(200).json({ books });
        })
        .catch((err) => res.status(500).json({ err }));
};

const UpdateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.set(req.body);
                return book
                    .save()
                    .then((book) => res.status(201).json({ book }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};

const DeleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findByIdAndDelete(bookId)
        .then((book) => {
            return book ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' });
        })
        .catch((err) => res.status(500).json({ err }));
};

export default { CreateBook, ReadBook, ReadAllBook, UpdateBook, DeleteBook };
