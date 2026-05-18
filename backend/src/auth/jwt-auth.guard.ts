import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { verifyJwt } from "./jwt.util";

type RequestWithUser = {
  headers: {
    authorization?: string;
  };
  user?: unknown;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Missing bearer token.");
    }

    const secret = this.configService.getOrThrow<string>("JWT_SECRET");
    request.user = verifyJwt(token, secret);

    return true;
  }

  private extractTokenFromHeader(request: RequestWithUser) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
