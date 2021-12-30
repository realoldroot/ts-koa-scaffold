import { Context, Next } from "koa";
import { CustomError } from "./custom-error";

export default () => async (ctx: Context, next: Next): Promise<any> => {
  try {
    const data = await next();
    if (data === undefined) {
      ctx.status = 404;
    } else {
      ctx.body = data;
    }
  } catch (error) {
    if (error instanceof CustomError) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: error.errMsg,
      };
    } else {
      throw error;
    }
  }
};
