// 这个端点用于静默检查登录状态，不会触发浏览器登录框
export async function onRequest(context) {
   const headers = new Headers(context.request.headers);
   const cookieHeader = headers.get('Cookie') || '';
   
   // 检查是否有登录 cookie
   const authenticated = cookieHeader.includes('flaredrive_auth=1');
   
   return new Response(JSON.stringify({ authenticated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
   });
}
