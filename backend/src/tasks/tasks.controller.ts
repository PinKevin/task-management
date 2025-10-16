import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import type { Request } from 'express';
import { GetTaskParamsDto } from './dto/getTaskParams.dto';
import { GetAllTasksQueryDto } from './dto/getAllTasksQuery.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const creator = req.user;

    return await this.tasksServices.createTask(createTaskDto, creator);
  }

  @Get()
  async getAllTasks(@Req() req: Request, @Query() query: GetAllTasksQueryDto) {
    const user = req.user;
    return await this.tasksServices.getAllTasks(user, query);
  }

  @Get(':taskId')
  async getTask(@Req() req: Request, @Param() params: GetTaskParamsDto) {
    const user = req.user;
    return await this.tasksServices.getTask(user, params);
  }
}
