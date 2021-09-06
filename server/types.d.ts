declare namespace API {
  /** 数据类型 */
  type DataType = "like" | "post" | "iteminfo";
  /** 视频 */
  type Aweme = {
    /** 标题 */
    title: string;
    /** 视频链接 */
    url: string;
    /** 封面 */
    cover: string;
  };
}
