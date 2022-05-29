import { Request, Response } from "express";
import { Suggestion } from "../../entities/suggestion";
import { TileRequest } from "src/types";

export const getAll = async (_req: Request, res: Response) => {
    try {
        await Suggestion.find().then((data) => {
            res.json(data);
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const getById = async(req: Request<{id: number}>, res: Response) => {
    try {
        await Suggestion.findOne({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            if (!data) {
                res.status(400).send({
                    message: "No suggestion with this id was found"
                });
                return;
            }
            res.json(data);
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const create = async(req: Request, res: Response) => {
    try {
        const newSuggestion: TileRequest = req.body;

        if (!newSuggestion.text) {
            res.status(400).send({
                message: "Need to provide text to create a new suggestion"
            });
            return;
        }

        if (!newSuggestion.emote) newSuggestion.emote = "";
        
        await Suggestion.save(newSuggestion as Suggestion);

        res.json(newSuggestion);
    } catch (e) {
        res.status(500).send(e.message);  
    }
}

export const deleteById = async (req: Request<{id: number}>, res: Response)  => {
    try {
        await Suggestion.findOne({
            where: {
                id: req.params.id
            }
        }).then(async (data) => {
            if (!data) {
                res.status(400).send({
                    message: "No suggestion with this id was found"
                });
                return;
            }

            await Suggestion.remove(data as Suggestion);

            res.json({
                message: "Suggestion has been deleted"
            });
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}