import { TaskStatus } from '../tasks.entity';
import {
  IsEnum,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetAllTasksQueryDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  deadlineOrder?: 'ASC' | 'DESC';

  @IsOptional()
  @IsNumberString()
  page?: string;
}
