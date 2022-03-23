Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('@nestjs/core');
const common_1 = require('@nestjs/common');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const platform_express_1 = require('@nestjs/platform-express');
const path = require('path');
const http_exception_filter_1 = require('./common/exceptions/http-exception.filter');
const app_module_1 = require('./app.module');

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
  };
  const server = express();
  const app = await core_1.NestFactory.create(
    app_module_1.AppModule,
    new platform_express_1.ExpressAdapter(server),
  );
  app.use(cookieParser());
  app.useGlobalPipes(new common_1.ValidationPipe());
  app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });
  await app.init();
  const { PORT } = process.env;
  http.createServer(server).listen(PORT);
  https.createServer(httpsOptions, server).listen(443);
}
bootstrap();
// # sourceMappingURL=main.js.map
