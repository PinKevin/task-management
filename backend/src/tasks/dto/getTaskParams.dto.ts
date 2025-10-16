import { IsNumberString } from 'class-validator';
import { User } from 'src/users/users.entity';

export class GetTaskParamsDto {
  @IsNumberString()
  taskId: string;
}
