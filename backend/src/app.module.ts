import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CategoriesModule } from "./categories/categories.module";
import { validateEnvironment } from "./config/env.validation";
import { HealthModule } from "./health/health.module";
import { InquiriesModule } from "./inquiries/inquiries.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from "./products/products.module";
import { SalesModule } from "./sales/sales.module";
import { UploadsModule } from "./uploads/uploads.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate: validateEnvironment,
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    ProductsModule,
    SalesModule,
    CategoriesModule,
    InquiriesModule,
    UploadsModule,
    UsersModule,
  ],
})
export class AppModule {}
