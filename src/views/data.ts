export function queryPlatformList() {
  const platformList = [
    { name: "淘宝", code: "taobao" },
    { name: "京东", code: "jd" },
    { name: "抖音", code: "douyin" },
  ];
  return platformList;
 }
 
 const dataList: any[] = [
  {
    id: 1,
    channelType: "sms",
    channelName: "阿里短信通知",
    platforms: queryPlatformList().filter((item) => item.code !== "taobao"),
    status: 1,
    createTime: "2021-09-07 00:52:15",
    updateTime: "2021-11-07 00:52:15",
    createBy: "vshen",
    updateBy: "vshen",
    ext: {
      url: "https://sms.aliyun.com",
      account: "vshen",
      password: "vshen57",
      sign: "signVhsen123124",
    },
  },
  {
    id: 2,
    channelType: "dingtalk",
    channelName: "预警消息钉钉通知",
    platforms: queryPlatformList().filter((item) => item.code !== "jingdong"),
    status: 1,
    createTime: "2021-11-10 00:52:15",
    updateTime: "2021-11-07 00:52:15",
    createBy: "vshen",
    updateBy: "vshen",
    ext: {
      accessType: "webhook",
      address: "https://dingtalk.aliyun.com",
    },
  },
  {
    id: 3,
    channelType: "email",
    channelName: "预警消息邮件通知",
    platforms: queryPlatformList().filter((item) => item.code !== "douyin"),
    status: 0,
    ext: {
      host: "https://smpt.aliyun.com",
      account: "vshen@qq.com",
      password: "vshen@360.com",
    },
    createTime: "2021-11-07 00:52:15",
    updateTime: "2021-11-07 00:52:15",
    createBy: "vshen",
    updateBy: "vshen",
  },
 ];
 
 export function queryPage({ form }: any, pagenation: any) {
  return new Promise((resolve) => {
    let result: any[] = dataList;
    Object.keys(form).forEach((key) => {
      const value = form[key];
      result = dataList.filter((item) => item[key] == value);
    });
 
    resolve({ success: true, data: { list: result } });
  });
 }
 export function create(data: any = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      dataList.push({
        id: Date.now(),
        platform: [],
        ...data,
      });
      resolve({ success: true, message: "创建成功!" });
    }, 500);
  });
 }
 
 export function update(data: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = dataList.findIndex((item) => item.id == data.id);
      const target = dataList[index];
      Object.keys(data).forEach((key) => {
        target[key] = data[key];
      });
      dataList.splice(index, 1, target);
      resolve({ success: true, message: "更新成功!" });
      console.log("update", dataList);
    }, 500);
  });
 }
 
 export function remove(id: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = dataList.findIndex((item) => item.id == id);
      dataList.splice(index, 1);
      resolve({ success: true, message: "删除成功!" });
      console.log("remove", dataList);
    }, 500);
  });
 }
 
 