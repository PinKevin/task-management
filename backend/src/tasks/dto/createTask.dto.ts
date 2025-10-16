import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  deadline: string;
}
