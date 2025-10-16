import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Brackets, Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UsersService } from 'src/users/users.service';
import { GetAllTasksQueryDto } from './dto/getAllTasksQuery.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

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
      creator,
      user: assignedUser,
    });

    await this.taskRepository.save(newTask);

    return {
      message: 'Successfully create new task',
    };
  }

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

    queryBuilder.where(
      new Brackets((qb) => {
        qb.where('task.user = :userId', { userId: user.userId }).orWhere(
          'task.creator = :userId',
          { userId: user.userId },
        );
      }),
    );

    if (query.status) {
      queryBuilder.andWhere('task.status = :status', {
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

  async getTask(user: User, taskId: number) {
    const task = await this.taskRepository.findOne({
      where: [
        { taskId, user: { userId: user.userId } },
        { taskId, creator: { userId: user.userId } },
      ],
      relations: ['user', 'creator'],
    });

    return (
      task ?? {
        message: 'Task not found',
      }
    );
  }

  async updateTask(user: User, taskId: number, updateTaskDto: UpdateTaskDto) {
    const taskToUpdate = await this.taskRepository.findOne({
      where: [
        { taskId, user: { userId: user.userId } },
        { taskId, creator: { userId: user.userId } },
      ],
    });
    if (!taskToUpdate) {
      throw new NotFoundException('Task not found');
    }

    if (updateTaskDto.title) {
      taskToUpdate.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      taskToUpdate.description = updateTaskDto.description;
    }
    if (updateTaskDto.status) {
      taskToUpdate.status = updateTaskDto.status;
    }
    if (updateTaskDto.deadline) {
      taskToUpdate.deadline = updateTaskDto.deadline;
    }

    if (updateTaskDto.userId) {
      const assignedUser = await this.usersService.findOneByUserId(
        updateTaskDto.userId,
      );
      if (!assignedUser) {
        throw new NotFoundException(`Selected user not found`);
      }
      taskToUpdate.user = assignedUser;
    }

    await this.taskRepository.save(taskToUpdate);

    return {
      message: 'Successfully edit task',
    };
  }

  async deleteTask(user: User, taskId: number) {
    const deleteResult = await this.taskRepository
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where('taskId = :taskId', { taskId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('creator = :userId', { userId: user.userId }).orWhere(
            'user = :userId',
            { userId: user.userId },
          );
        }),
      )
      .execute();

    if (deleteResult.affected === 0) {
      throw new NotFoundException('Task not found');
    }

    return {
      message: 'Successfully deleted task',
    };
  }
}
