import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Recado } from "./Recado";

@Entity({name: 'user'})
export class User extends BaseEntity {
    @PrimaryColumn({ name: 'id'})
    id?: string;

    @Column({ name: 'username'})
    username: string;

    @Column({ name: 'password'})
    password: string;

    @OneToMany(() => Recado, (recado) => recado.user)
    recado?: Recado[]
    

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }

    @BeforeInsert()
    criarID() {
        this.id = uuid()
    }
}