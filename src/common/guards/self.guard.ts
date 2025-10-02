import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class SelfGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const paramId = request.params?.id
        const user = request.admin ?? request.recipient;
        if (user.id != paramId) {
          throw new ForbiddenException({
            message: "Ruxsat etilmagan foydalanuvchi",
          });
        }
        return true
    }
}