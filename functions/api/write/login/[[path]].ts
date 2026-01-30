import {is_authenticated} from "@/utils/auth";

export async function onRequest(context) {
   const url = new URL(context.request.url);
   const forceLogin = url.searchParams.has('force');
   const cookies = context.request.headers.get('Cookie') || '';
   const hasAuthCookie = cookies.includes('flaredrive_auth=1');
   
   // 如果是强制登录模式，或者没有认证信息，要求登录
   if(!is_authenticated(context)){
      return new Response("请输入管理员账号密码", {
         status: 401,
         headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'WWW-Authenticate': 'Basic realm="FlareDrive 管理员登录"'
         }
      });
   }
   
   // 如果是强制登录且已有 cookie，说明是退出后重新登录
   // 验证 Basic Auth 通过后才设置 cookie
    
   // 登录成功，设置 cookie
   return new Response("登录成功", {
      status: 200,
      headers: { 
         'Content-Type': 'text/plain; charset=utf-8',
         'Set-Cookie': 'flaredrive_auth=1; Path=/; Max-Age=604800; SameSite=Lax'
      }
   });
}
