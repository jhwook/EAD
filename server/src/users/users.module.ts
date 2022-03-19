import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from '../auth/auth.module';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.naver.com',
        port: 465,
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS,
        },
      },
      // template: {
      //   dir: `${process.cwd()}/template/`,
      //   adapter: new HandlebarsAdapter(), // or new PugAdapter()
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
