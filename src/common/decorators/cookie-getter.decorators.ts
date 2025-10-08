import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CookieGetter = createParamDecorator(
    async (key:string, contex: ExecutionContext): Promise<string>=>{
        const require = contex.switchToHttp().getRequest()
        const refreshtToken = require.cookie[key]

        if(!refreshtToken){
            throw new BadRequestException("Token is not found");
        }
        return refreshtToken
    }
)