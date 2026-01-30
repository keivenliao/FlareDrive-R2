import {is_authenticated} from "@/utils/auth";

// 这个端点用于静默检查登录状态，不会触发浏览器登录框
export async function onRequest(context) {
   const headers = new Headers(context.request.headers);
   const authHeader = headers.get('Authorization');
   const authenticated = is_authenticated(context);
   
   return new Response(JSON.stringify({ 
      authenticated,
      hasAuthHeader: !!authHeader,
      authHeaderStart: authHeader ? authHeader.substring(0, 20) + '...' : null
   }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
   });
}
