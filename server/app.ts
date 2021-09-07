import {
  Application,
  isHttpError,
  RouteParams,
  Router,
  RouterContext,
  Status,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import getFiltrateData from "./filtrateData.ts";
import getVideoUrl from "./getVideoUrl.ts";

// 获取环境变量
const env = Deno.env.toObject();
const PORT = env.PORT || 3000;
// const HOST = env.HOST || "127.0.0.1";
const HOST = env.HOST || "172.21.73.140";

// 构建一个 oak 应用
const router = new Router();
const app = new Application();

router.get("/", (ctx) => {
  ctx.response.body = "Hello World ";
});

app.use(router.routes());
app.use(router.allowedMethods());
console.log(`Listening on port ${PORT}...`);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          // handle NotFound
          break;
        case Status.InternalServerError:
          console.log(err);
          break;
        default:
          // handle other statuses
      }
    } else {
      // rethrow if you can't handle the error
      throw err;
    }
  }
});

/** 获取帖子 */
export const getPost = async (
  ctx: RouterContext<RouteParams, Record<string, any>>,
) => {
  const {
    params,
    response,
    request,
  } = ctx;

  const searchUrl = request.url.searchParams.get("url");
  if (!searchUrl) {
    response.status = 400;
    response.body = { msg: `Cannot find url ${searchUrl}` };
    return;
  }
  const filtrateData = await getFiltrateData(searchUrl, "post");

  response.status = 200;
  response.body = filtrateData;
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
  if (!searchUrl) {
    response.status = 400;
    response.body = { msg: `Cannot find url ${searchUrl}` };
    return;
  }

  const filtrateData = await getFiltrateData(searchUrl, "like");

  response.status = 200;
  response.body = filtrateData;
};

/** 获取视频链接 */
export const getVideo = async (
  ctx: RouterContext<RouteParams, Record<string, any>>,
) => {
  const {
    params,
    response,
    request,
  } = ctx;

  const searchUrl = request.url.searchParams.get("url");
  if (!searchUrl) {
    response.status = 400;
    response.body = { msg: `Cannot find url ${searchUrl}` };
    return;
  }

  const filtrateData = await getVideoUrl(searchUrl);

  response.status = 200;
  response.body = filtrateData;
};

router
  .get("/post", getPost)
  .get("/like", getLike)
  .get("/video", getVideo);

await app.listen(`${HOST}:${PORT}`);
