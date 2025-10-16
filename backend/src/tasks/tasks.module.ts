import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';
import { UsersModule } from 'src/users/users.module';
import { TasksController } from './tasks.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule, AuthModule],
  providers: [TasksService, AuthGuard],
  controllers: [TasksController],
})
export class TasksModule {}
