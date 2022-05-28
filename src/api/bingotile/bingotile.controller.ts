import { Request, Response } from "express";
import { BingoTile } from "../../entities/bingotile";

class BingoTileRequest {
    text: string;
    emote: string;
}

export const getAll = async (_req: Request, res: Response) => {
    await BingoTile.find().then((data) => {
        res.json(data);
    })
}

export const getById = async(req: Request<{id: number}>, res: Response) => {
    try {
        await BingoTile.findOne({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            res.json(data);
        })
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const newTile: BingoTileRequest = req.body;

        if(!newTile.text) {
            res.sendStatus(400);
            return;
        }

        if (!newTile.emote) newTile.emote = "";

        await BingoTile.save(newTile as BingoTile);

        res.json(newTile);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const updateById = async (req: Request<{id: number}>, res: Response) => {
    try {
        const tile = await BingoTile.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!tile) {
            res.status(400).send({
                message: "No tile with this id was found"
            });
            return;
        }

        const updateTile: BingoTileRequest = req.body;

        if (updateTile.text) tile.text = updateTile.text;
        if (updateTile.emote) tile.emote = updateTile.emote;

        await BingoTile.save(tile);

        res.json(tile);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const deleteById = async (req: Request<{id: number}>, res: Response) => {
    try {
        const tile = await BingoTile.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!tile) {
            res.status(400).send({
                message: "No tile with this id was found"
            });
        }

        await BingoTile.remove(tile as BingoTile);

        res.json({
            message: "Tile has been deleted",
            tile: tile
        })
    } catch (e) {
        res.status(500).send(e.message);
    }
}