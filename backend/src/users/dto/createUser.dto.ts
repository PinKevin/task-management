import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'src/helpers/match.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password')
  confirmPassword: string;
}
