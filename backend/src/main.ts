import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: false,
  });

  const configService = app.get(ConfigService);
  await app.get(PrismaService).enableShutdownHooks(app);
  const apiPrefix = configService.get<string>("API_PREFIX", "api");
  const frontendUrl = configService.get<string>("FRONTEND_URL", "http://localhost:3000");
  const adminPanelUrl = configService.get<string>(
    "ADMIN_PANEL_URL",
    "http://localhost:3001",
  );
  const port = configService.get<number>("PORT", 4000);

  app.setGlobalPrefix(apiPrefix);
  app.enableCors({
    origin: [frontendUrl, adminPanelUrl],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Used Billiard Store API")
    .setDescription("Backend API for the Used Billiard Store storefront and lead flows.")
    .setVersion("1.0.0")
    .build();

  const swaggerDocument = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, swaggerDocument, {
    jsonDocumentUrl: `${apiPrefix}/docs/json`,
    yamlDocumentUrl: `${apiPrefix}/docs/yaml`,
    customSiteTitle: "Used Billiard Store API Docs",
  });

  await app.listen(port);
}

void bootstrap();
