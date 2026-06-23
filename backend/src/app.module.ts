import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MailModule } from "./mail/mail.module";
import { CategoriesModule } from "./categories/categories.module";
import { CheckoutModule } from "./checkout/checkout.module";
import { validateEnvironment } from "./config/env.validation";
import { HealthModule } from "./health/health.module";
import { InquiriesModule } from "./inquiries/inquiries.module";
import { OrdersModule } from "./orders/orders.module";
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
    MailModule,
    HealthModule,
    AuthModule,
    ProductsModule,
    SalesModule,
    CategoriesModule,
    CheckoutModule,
    OrdersModule,
    InquiriesModule,
    UploadsModule,
    UsersModule,
  ],
})
export class AppModule {}
