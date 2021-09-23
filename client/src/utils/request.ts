import Taro from "@tarojs/taro";

type RequestOpts = Omit<Taro.request.Option, "url">;

type RequestResponse<T = any> = {
  data: T;
  response: Response;
};

interface RequestMethodInTaro {
  <T = any>(
    url: string,
    options?: RequestOpts & { skipErrorHandler?: boolean },
  ): Promise<RequestResponse<T>>;
}

const request: RequestMethodInTaro = (url: string, options: RequestOpts) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      method: "GET",
      ...options,
      header: {
        "Content-Type": "application/json",
        ...options?.header,
      },
      url,
      
    }).then(
      (response) => {
        resolve(response?.data ?? response);
      },
      (err) => {
        reject(err);
      },
    );
  });
};



export { request };
