import { Module } from "@nestjs/common";
import { AdminSalesController } from "./admin-sales.controller";
import { SalesService } from "./sales.service";

@Module({
  controllers: [AdminSalesController],
  providers: [SalesService],
})
export class SalesModule {}
