import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {

  }

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.taskRepository.create({
        ...createTaskDto,
        userId
    });

    return await this.taskRepository.save(task);
}

  async findAll(userId: number) {
    return await this.taskRepository.find({
      where : {
        userId
      }
    });
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({
      where : { id }
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where : { id }
    });

    if(!task) { 
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    Object.assign(task, updateTaskDto)
    
    return await this.taskRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({
      where : { id }
    });

    if(!task) { 
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return await this.taskRepository.remove(task);
  }
}
