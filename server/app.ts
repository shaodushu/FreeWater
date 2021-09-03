import {
  Application,
  RouteParams,
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import getFiltrateData from "./filtrateData.ts";

// 获取环境变量
const env = Deno.env.toObject();
const PORT = env.PORT || 3000;
const HOST = env.HOST || "127.0.0.1";

// 构建一个 oak 应用
const router = new Router();
const app = new Application();

router.get("/", (ctx) => {
  ctx.response.body = "Hello World ";
});

app.use(router.routes());
app.use(router.allowedMethods());
console.log(`Listening on port ${PORT}...`);

/** 获取帖子 */
export const getPost = async (
  ctx: RouterContext<RouteParams, Record<string, any>>,
) => {
  const {
    params,
    response,
    request,
  } = ctx;

  try {
    const searchUrl = request.url.searchParams.get("url");
    const filtrateData = await getFiltrateData(searchUrl, "post");

    if (filtrateData.length) {
      response.status = 200;
      response.body = filtrateData;
      return;
    }
  } catch (error) {
    console.log(error);
    response.status = 500;
    response.body = error;
  }
};

/** 获取喜欢 */
export const getLike = async (
  ctx: RouterContext<RouteParams, Record<string, any>>,
) => {
  const {
    params,
    response,
    request,
  } = ctx;
  const searchUrl = request.url.searchParams.get("url");
  const filtrateData = await getFiltrateData(searchUrl, "like");

  if (filtrateData.length) {
    response.status = 200;
    response.body = filtrateData;
    return;
  }
  response.status = 400;
  response.body = { msg: `Cannot find url ${searchUrl}` };
};

router
  .get("/post", getPost)
  .get("/like", getLike);

await app.listen(`${HOST}:${PORT}`);
