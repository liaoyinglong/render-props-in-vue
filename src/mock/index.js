import Mock from "mockjs";

function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}
const List = [];
const count = 50;

const baseContent = "我是测试数据我是测试数据";
const image_uri =
  "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      author: "@first",
      reviewer: "@first",
      title: "@title(5, 10)",
      content_short: "我是测试数据",
      content: baseContent,
      forecast: "@float(0, 100, 2, 2)",
      importance: "@integer(1, 3)",
      "type|1": ["CN", "US", "JP", "EU"],
      "status|1": ["published", "draft", "deleted"],
      display_time: "@datetime",
      comment_disabled: true,
      pageviews: "@integer(300, 5000)",
      image_uri,
      platforms: ["a-platform"]
    })
  );
}
const getList = config => {
  const {
    importance,
    type,
    title,
    current = 1,
    pageSize = 10,
    sort
  } = param2Obj(config.url);

  let mockList = List.filter(item => {
    if (importance && item.importance !== +importance) return false;
    if (type && item.type !== type) return false;
    if (title && item.title.indexOf(title) < 0) return false;
    return true;
  });

  if (sort === "-id") {
    mockList = mockList.reverse();
  }
  const pageList = mockList.filter(
    (item, index) =>
      index < pageSize * current && index >= pageSize * (current - 1)
  );

  return {
    current: +current,
    pageSize: +pageSize,
    total: +pageList.length,
    list: pageList
  };
};

Mock.mock(/\/article\/list/, "get", getList);

export default Mock;
