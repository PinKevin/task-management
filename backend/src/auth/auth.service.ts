import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(inputUsername: string, inputPassword: string) {
    const user = await this.usersService.findOneByUsername(inputUsername);

    if (!user || !(await bcrypt.compare(inputPassword, user.password))) {
      throw new UnauthorizedException('Username atau password salah');
    }
    const payload = {
      id: user.userId,
      username: user.username,
      name: user.name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
