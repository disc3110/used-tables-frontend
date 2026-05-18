import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("health")
@Controller("health")
export class HealthController {
  @Get()
  @ApiOkResponse({
    description: "Simple health probe for the API.",
  })
  getHealth() {
    return {
      status: "ok",
      service: "used-billiard-store-backend",
      timestamp: new Date().toISOString(),
    };
  }
}
