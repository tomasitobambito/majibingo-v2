import { Request, Response } from "express";
import { Tile } from "../../entities/tile";
import { TileRequest } from "src/types";

export const getAll = async (_req: Request, res: Response) => {
    try {
        await Tile.find().then((data) => {
            res.json(data);
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const getById = async(req: Request<{id: number}>, res: Response) => {
    try {
        await Tile.findOne({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            if (!data) {
                res.status(400).send({
                    message: "No tile with this id was found"
                });
                return;
            }
            res.json(data);
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const newTile: TileRequest = req.body;

        if (!newTile.text) {
            res.status(400).send({
                message: "Need to provide text field to create a new tile"
            });
            return;
        }

        if (!newTile.emote) newTile.emote = "";

        await Tile.save(newTile as Tile);

        res.json(newTile);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const updateById = async (req: Request<{id: number}>, res: Response) => {
    try {
        await Tile.findOne({
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

            const updateTile: TileRequest = req.body;
            
            if (updateTile.text) data.text = updateTile.text;
            if (updateTile.emote) data.emote = updateTile.emote;

            await Tile.save(data);

            res.json(data);
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const deleteById = async (req: Request<{id: number}>, res: Response) => {
    try {
        await Tile.findOne({
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

            await Tile.remove(data as Tile);

            res.json({
                message: "Tile has been deleted"
            });
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}