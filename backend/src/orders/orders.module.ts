import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AdminOrdersController } from "./admin-orders.controller";
import { OrdersService } from "./orders.service";

@Module({
  imports: [PrismaModule],
  controllers: [AdminOrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
