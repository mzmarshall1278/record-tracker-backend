import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./User.model";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    return ctx.switchToHttp().getRequest().user;
});