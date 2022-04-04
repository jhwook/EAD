"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketAdapter = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const path = require("path");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const http_exception_filter_1 = require("./common/exceptions/http-exception.filter");
const app_module_1 = require("./app.module");
class SocketAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, Object.assign(Object.assign({}, options), { cors: true }));
        return server;
    }
}
exports.SocketAdapter = SocketAdapter;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useWebSocketAdapter(new SocketAdapter(app));
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
    const { PORT } = process.env;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map