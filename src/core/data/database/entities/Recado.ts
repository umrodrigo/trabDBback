import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './User';

@Entity({name: 'recados'})
export class Recado extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id'})
    id?: number;

    @Column({ name: 'descricao' })
    descricao: string;

    @Column({ name: 'detalhamento' })
    detalhamento: string;

    @Column({ name: 'user_id'})
    userID: string;

    @ManyToOne(() => User, user => user.recado)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
    user?: User;
    
    

    constructor(descricao: string, detalhamento: string, userID:string) {
        super();
        this.descricao = descricao;
        this.detalhamento = detalhamento;
        this.userID = userID;
    }
}