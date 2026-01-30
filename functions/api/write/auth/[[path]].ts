import {is_authenticated} from "@/utils/auth";

// 这个端点用于静默检查登录状态，不会触发浏览器登录框
export async function onRequest(context) {
   const authenticated = is_authenticated(context);
   
   return new Response(JSON.stringify({ authenticated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
   });
}
