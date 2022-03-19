import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
  };

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    // origin: 'http://localhost:4000'
    origin: true,
    credentials: true,
  });
  await app.init();
  const { PORT } = process.env;
  http.createServer(server).listen(PORT);
  https.createServer(httpsOptions, server).listen(443);

  // await app.listen(PORT);
}
bootstrap();
