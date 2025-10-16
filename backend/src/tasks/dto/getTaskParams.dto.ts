import { IsNumberString } from 'class-validator';

export class GetTaskParamsDto {
  @IsNumberString()
  taskId: string;
}
