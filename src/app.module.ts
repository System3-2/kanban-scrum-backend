import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ProjectsModule } from './projects/projects.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { CommentsModule } from './comments/comments.module';
import { IssuesModule } from './issues/issues.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { RequestLogger } from './logger/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),

    MailerModule.forRoot({
      transport: {
        service: process.env.MAIL_SERVICE,
        host: '',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@kanban.com>',
      },
      template: {
        dir: join(process.cwd(), 'src/templates'),
        adapter: new HandlebarsAdapter(),
      },
      options: {
        strict: true,
      },
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    DatabaseModule,
    ProjectsModule,
    CommentsModule,
    IssuesModule,
    UserModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {
 // let's add a middleware on all routes
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLogger).forRoutes('*');
  }
}
