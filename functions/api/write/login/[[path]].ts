import {is_authenticated} from "@/utils/auth";

export async function onRequest(context) {
   if(!is_authenticated(context)){
      return new Response("请输入管理员账号密码", {
         status: 401,
         headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'WWW-Authenticate': 'Basic realm="FlareDrive 管理员登录"'
         }
      });
   }
    
   // 登录成功，设置 cookie
   return new Response("登录成功", {
      status: 200,
      headers: { 
         'Content-Type': 'text/plain; charset=utf-8',
         'Set-Cookie': 'flaredrive_auth=1; Path=/; Max-Age=604800; SameSite=Lax'
      }
   });
}
