// 退出登录端点：清除 cookie 并尝试清除浏览器的 Basic Auth 凭据
export async function onRequest(context) {
   // 清除 cookie
   const clearCookie = 'flaredrive_auth=; Path=/; Max-Age=0';
   
   const html = `<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>退出登录</title>
   <script>
      var returnPath = sessionStorage.getItem('flaredrive_return_path');
      sessionStorage.removeItem('flaredrive_return_path');
      window.location.replace(returnPath ? '/?p=' + encodeURIComponent(returnPath) : '/');
   </script>
</head>
<body></body>
</html>`;
   
   // 返回 401 状态码并带上 WWW-Authenticate 头，这会触发浏览器清除保存的凭据
   // 但我们不真的要求用户登录，而是直接跳转走
   return new Response(html, {
      status: 200,
      headers: { 
         'Content-Type': 'text/html; charset=utf-8',
         'Set-Cookie': clearCookie,
         // 清除浏览器保存的 Basic Auth 凭据
         'Clear-Site-Data': '"cookies", "storage"'
      }
   });
}
