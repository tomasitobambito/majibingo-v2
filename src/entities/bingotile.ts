import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class BingoTile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    text: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    emote: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}