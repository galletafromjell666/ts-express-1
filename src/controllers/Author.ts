import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';

const CreateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    });
    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((err) => res.status(500).json({ err }));
};

const ReadAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findById(authorId)
        .then((author) => {
            return author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not found' });
        })
        .catch((err) => res.status(500).json({ err }));
};

const ReadAllAuthor = (req: Request, res: Response, next: NextFunction) => {
    return Author.find()
        .then((authors) => {
            return res.status(200).json({ authors });
        })
        .catch((err) => res.status(500).json({ err }));
};

const UpdateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findById(authorId)
        .then((author) => {
            if (author) {
                author.set(req.body);
                return author
                    .save()
                    .then((author) => res.status(201).json({ author }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};

const DeleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findByIdAndDelete(authorId)
        .then((author) => {
            return author ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' });
        })
        .catch((err) => res.status(500).json({ err }));
};

export default { CreateAuthor, ReadAuthor, ReadAllAuthor, UpdateAuthor, DeleteAuthor };
