// 退出登录端点：清除 cookie
export async function onRequest(context) {
   return new Response("已退出登录", {
      status: 200,
      headers: { 
         'Content-Type': 'text/plain; charset=utf-8',
         'Set-Cookie': 'flaredrive_auth=; Path=/; Max-Age=0'
      }
   });
}
