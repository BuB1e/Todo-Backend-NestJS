import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum TaskStatus {
    TO_DO,
    IN_PROGRESS,
    DONE
}

@Entity({ name : "tasks" })
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default : TaskStatus.TO_DO
    })
    status: TaskStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.tasks, {
        cascade: true,
        onDelete: "CASCADE",
    })
    user: User;
}
