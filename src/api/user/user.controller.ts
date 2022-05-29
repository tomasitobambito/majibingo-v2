import { User } from "../../entities/user"
import { Request, Response } from "express";
import { UserRequest } from "../../types";
import argon2 from "argon2";

export const getAll = async (_req: Request, res: Response) => {
    try {
        await User.find().then((data) => {
            res.json(data);
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const getById = async(req: Request<{id: number}>, res: Response) => {
    try {
        await User.findOne({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            if(!data) {
                res.status(400).send({
                    message: "No user with this id was found"
                });
                return;
            }
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        User.count({
            where: {
                username: req.body.username
            }
        }).then(async (data) => {
            if (data > 0) {
                res.status(400).send({
                    message: "Username isn't unique"
                });
                return;
            }
        
            const hashedPassword = await argon2.hash(req.body.password);

            const newUser: UserRequest = {
                username: req.body.username,
                password: hashedPassword 
            };

            User.save(newUser as User);

            res.json(newUser);
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const updateById = async (req: Request<{id: number}>, res: Response) => {
    try {
        await User.findOne({
            where: {
                id: req.params.id
            }
        }).then(async (data) => {
            if (!data) {
                res.status(400).send({
                    message: "No user with this id was found"
                });
                return;
            }

            if (req.body.username) {
                const count = await User.count({where: {username: req.body.username}}); 

                if (count > 0) {
                    res.status(400).send({
                        message: "Username is not unique"
                    });
                    return;
                }

                data.username = req.body.username;
            }

            if (req.body.password) {
                const hashedPassword = await argon2.hash(req.body.password);

                data.password = hashedPassword;
            }

            await User.save(data as User);

            res.json(data);
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const deleteById = async (req: Request<{id: number}>, res: Response) => {
    try {
        await User.findOne({
            where: {
                id: req.params.id
            }
        }).then(async (data) => {
            if (!data) {
                res.status(400).send({
                    message: "No tile with this id was found"
                });
                return;
            }

            await User.remove(data as User);

            res.json({
                message: "User has been deleted"
            });
        })
    } catch (e) {
        res.status(500).send(e.message);
    }
}