import {is_authenticated} from "@/utils/auth";

export async function onRequest(context) {
   if(!is_authenticated(context)){
      var header = new Headers()
      header.set("WWW-Authenticate",'Basic realm="FlareDrive 管理员登录"')
      return new Response("请输入管理员账号密码", {
         status: 401,
         headers: header,
      });
   }
    
   // 登录成功，设置 cookie 并直接重定向回主页
   const referer = context.request.headers.get('Referer');
   const redirectUrl = referer || '/';
   
   return new Response(null, {
      status: 302,
      headers: { 
         'Location': redirectUrl,
         'Set-Cookie': 'flaredrive_auth=1; Path=/; Max-Age=604800; SameSite=Lax'
      }
   });
}
