import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import type { Request } from 'express';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const creator = req.user;

    return await this.tasksServices.createTask(createTaskDto, creator);
  }
}
