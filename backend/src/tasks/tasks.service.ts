import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    private usersService: UsersService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, creator: User) {
    const assignedUser = await this.usersService.findOneByUserId(
      createTaskDto.userId,
    );
    if (!assignedUser) {
      throw new NotFoundException(`Selected user not found`);
    }

    const newTask = this.taskRepository.create({
      ...createTaskDto,
      creator: creator,
      user: assignedUser,
    });

    await this.taskRepository.save(newTask);

    return {
      message: 'Berhasil membuat task baru',
    };
  }
}
