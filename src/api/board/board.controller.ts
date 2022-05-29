import { Request, Response } from "express";
import seedrandom from "seedrandom";
import { TileRequest } from "src/types";
import { Tile } from "../../entities/tile";

export const get = async (req: Request<{seed: string}>, res: Response) => {
    try {
        await Tile.find().then((data) => {
            const tiles: TileRequest[] = mapToTileRequest(data);

            const board = createBoard(tiles, req.params.seed);

            res.json(board);
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}

const createBoard = (tiles: TileRequest[], seed: string): TileRequest[] => {
    const prng = seedrandom(seed);

    const board: TileRequest[] = [];

    while(board.length < 25) {
        let pick = tiles[Math.floor(prng() * tiles.length)];
        if (!board.includes(pick)) {
            board.push(pick);
        }
    }

    return board;
}

const mapToTileRequest = (tiles: Tile[]): TileRequest[] => {
    const mappedTiles: TileRequest[] = [];

    tiles.forEach((e) => {
        mappedTiles.push({
            text: e.text,
            emote: e.emote
        });
    })

    return mappedTiles;
} 