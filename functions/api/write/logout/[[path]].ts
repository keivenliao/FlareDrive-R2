// 退出登录端点：清除 cookie
export async function onRequest(context) {
   const referer = context.request.headers.get('Referer');
   const redirectUrl = referer || '/';
   
   return new Response(null, {
      status: 302,
      headers: { 
         'Location': redirectUrl,
         'Set-Cookie': 'flaredrive_auth=; Path=/; Max-Age=0',
         'Clear-Site-Data': '"cookies"'
      }
   });
}
