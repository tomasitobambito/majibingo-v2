import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Tile extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    text: string;

    @Column({
        type: 'text',
        default: '',
    })
    emote: string;

    @Column({
        type: 'text',
        default: 'tomasito',
    })
    addedBy: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}