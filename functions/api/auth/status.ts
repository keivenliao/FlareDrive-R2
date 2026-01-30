import {get_auth_status} from "@/utils/auth";

// 这个端点用于静默检查登录状态，不会触发浏览器登录框
export async function onRequest(context) {
   // 检查是否有有效的 Authorization 头
   const headers = new Headers(context.request.headers);
   const authHeader = headers.get('Authorization');
   
   if (!authHeader) {
      // 没有认证信息，返回未登录状态，但不带 WWW-Authenticate 头
      return new Response(JSON.stringify({ authenticated: false }), {
         status: 200,
         headers: { 'Content-Type': 'application/json' }
      });
   }
   
   // 有认证信息，验证是否有效
   // 简单验证：检查环境变量中是否存在该账号
   try {
      const Authorization = authHeader.split("Basic ")[1];
      if (!Authorization) {
         return new Response(JSON.stringify({ authenticated: false }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
         });
      }
      
      const account = atob(Authorization);
      if (!account || !context.env[account]) {
         return new Response(JSON.stringify({ authenticated: false }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
         });
      }
      
      // 验证通过
      return new Response(JSON.stringify({ authenticated: true }), {
         status: 200,
         headers: { 'Content-Type': 'application/json' }
      });
   } catch (error) {
      return new Response(JSON.stringify({ authenticated: false }), {
         status: 200,
         headers: { 'Content-Type': 'application/json' }
      });
   }
}
