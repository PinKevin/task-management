import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UsersService } from 'src/users/users.service';
import { GetTaskParamsDto } from './dto/getTaskParams.dto';
import { GetAllTasksQueryDto } from './dto/getAllTasksQuery.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    private usersService: UsersService,
  ) {}

  async getAllTasks(user: User, query: GetAllTasksQueryDto) {
    let pageNumber;
    if (query.page) {
      pageNumber = parseInt(query.page);
    } else {
      pageNumber = 1;
    }
    const offset = pageNumber * 10 - 10;

    const queryBuilder = this.taskRepository
      .createQueryBuilder('task')
      .limit(10)
      .offset(offset);

    queryBuilder.where('task.user_id = :userId OR task.created_by = :userId', {
      userId: user.userId,
    });

    if (query.status) {
      queryBuilder.where('task.status = :status', {
        status: query.status,
      });
    }

    if (query.deadlineOrder) {
      queryBuilder.orderBy('task.deadline', query.deadlineOrder);
    } else {
      queryBuilder.orderBy('task.deadline', 'ASC');
    }

    const tasks = await queryBuilder.getMany();
    return tasks;
  }

  async getTask(user: User, getTaskParamsDto: GetTaskParamsDto) {
    const taskId = parseInt(getTaskParamsDto.taskId);
    const task = await this.taskRepository.findOne({
      where: {
        taskId,
        user,
      },
    });

    return (
      task ?? {
        message: 'Task not found',
      }
    );
  }

  async createTask(createTaskDto: CreateTaskDto, creator: User) {
    const assignedUser = await this.usersService.findOneByUserId(
      createTaskDto.userId,
    );
    if (!assignedUser) {
      throw new NotFoundException(`Selected user not found`);
    }

    const newTask = this.taskRepository.create({
      ...createTaskDto,
      creator,
      user: assignedUser,
    });

    await this.taskRepository.save(newTask);

    return {
      message: 'Berhasil membuat task baru',
    };
  }
}
