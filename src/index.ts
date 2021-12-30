import Koa from "koa";
import Router from "koa-router";
import koaBody from "koa-body";
import koaStatic from "koa-static";
import cros from "./common/cros";
import logger from "./common/logger";
import db from "./db";
import path from "path";
import response from "./common/response";
import routers from "./routers";

const createServer = (): void => {
  const port = 8080;
  const app = new Koa();
  const router = new Router();

  routers.forEach(route =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (router as any)[route.method](route.path, route.action),
  );

  app.use(koaStatic(path.join(__dirname, "../public")));
  app.use(cros());
  app.use(
    koaBody({
      multipart: true,
      formidable: {
        uploadDir: path.join(__dirname, "../public/uploads"),
        keepExtensions: true,
        maxFieldsSize: 1024 * 1024 * 10,
        // onFileBegin: (name, file) => {}, // 文件上传前设置
      },
    }),
  );
  app.use(response());
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(port, () => {
    logger.info(`http://localhost:${port}`);
  });
};

(async (): Promise<void> => {
  const sequelize = db.init();
  //自动创建表
  await sequelize.sync({ alter: true });
  createServer();
})();
