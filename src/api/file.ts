import MyAxios from "@/utils/request";

//文件上传
export function fileUpload(params: any) {
  return MyAxios.request({
    url: "/api/file/upload",
    method: "POST",
    data: params,
  });
}
