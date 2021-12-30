import { Context } from "koa";
import Hello from "../model/Hello.model";
import helloService from "../service/hello.service";

async function index(ctx: Context): Promise<object> {
  return { data: "Hello world" };
}

async function hello(ctx: Context): Promise<Hello | null> {
  return helloService.findOne();
}

export default {
  hello,
  index,
};
