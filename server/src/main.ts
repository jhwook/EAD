import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as path from 'path';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { AppModule } from './app.module';

export class SocketAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    },
  ) {
    const server = super.createIOServer(port, { ...options, cors: true });
    return server;
  }
}

async function bootstrap() {
  // const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    // new ExpressAdapter(server),
  );

  // const io = require('socket.io')(server, {
  //   cors: {
  //     origin: 'https://example.com',
  //     methods: ['GET', 'POST'],
  //   },
  // });
  app.useWebSocketAdapter(new SocketAdapter(app));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    // origin: ['http://localhost:3000'],
    origin: true,
    credentials: true,
  });

  // http://localhost:4000/media/users/aaa.png
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });
  const { PORT } = process.env;
  // await app.init();
  // http.createServer(server).listen(PORT);
  await app.listen(PORT);
}
bootstrap();
