"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3030;
    if (process.env.NODE_ENV === 'production') {
        app.enableCors({
            origin: true,
            credentials: true,
        });
    }
    else {
        app.enableCors({
            origin: true,
            credentials: true,
        });
    }
    await app.listen(port, '0.0.0.0');
    console.log(`http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map