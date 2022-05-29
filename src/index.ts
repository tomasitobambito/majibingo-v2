import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Tile } from './entities/tile';
import { Suggestion } from './entities/suggestion';
import { User } from './entities/user';
import express from 'express';
import routes from './api/routes';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'majibingo',
    entities: [Tile, Suggestion, User],
    synchronize: true,
    logging: false,
});

const main = async () => {
    await AppDataSource.initialize()
    .then(() => {
        console.log('initialized');
    })
    .catch((error) => console.log(error));

    const app = express();

    app.use(express.json());
    app.use('/api/', routes);
    
    app.listen(8000, () => {
        console.log("Listening on port 8000")
    })
}

main().catch((error) => console.log(error));