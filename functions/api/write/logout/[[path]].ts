// 退出登录端点：清除 cookie 并尝试清除浏览器的 Basic Auth 凭据
export async function onRequest(context) {
   // 返回 401 并要求重新认证，这会让浏览器清除已保存的凭据
   // 同时清除 cookie
   return new Response("已退出登录", {
      status: 401,
      headers: { 
         'Content-Type': 'text/plain; charset=utf-8',
         'Set-Cookie': 'flaredrive_auth=; Path=/; Max-Age=0',
         'WWW-Authenticate': 'Basic realm="已退出登录"'
      }
   });
}
