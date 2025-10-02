import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class JwtAuthAdminGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization;
        if(!authHeader){
            throw new UnauthorizedException("Auth header topilmadi");
        }
        const token = authHeader.split(" ")[1]
        if(!token){
            throw new UnauthorizedException("token topilmadi");
        }
        let decodetToken:any
        try{
            decodetToken = this.jwtService.verify(token)
        }catch(error){
            throw new UnauthorizedException({
              message: "Foydalanuvchi avtorizatsiyadan otmagan",
              error,
            });
        }
        request.admin = decodetToken
        return true
    }
}