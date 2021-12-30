import hellController from "./controller/hello.controller";
interface Controller {
  path: string;
  method: string;
  action: Function;
}

const routers: Controller[] = [
  {
    path: "/",
    method: "get",
    action: hellController.index,
  },
  {
    path: "/hello",
    method: "get",
    action: hellController.hello,
  },
];

export default routers;
