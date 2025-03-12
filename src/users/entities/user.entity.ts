import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : "users"}) // table name that see on database
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({unique : true})
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(() => Task, (task) => task.userId)
    tasks: Task[];

}
