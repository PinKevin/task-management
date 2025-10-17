import { IsDateString, IsNotEmpty, IsString, NotEquals } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @NotEquals(0)
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
