import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UsersService, AuthGuard],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
