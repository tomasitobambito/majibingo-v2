import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { BingoTile } from './entities/bingotile';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'majibingo',
    entities: [BingoTile],
    synchronize: true,
    logging: false,
});

const main = async () => {
    await AppDataSource.initialize()
    .then(() => {
        console.log('initialized');
    })
    .catch((error) => console.log(error));
}

main().catch((error) => console.log(error));