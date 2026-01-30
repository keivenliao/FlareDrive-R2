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
    
   // 登录成功，返回一个自动跳转回主页的页面
   const html = `<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>登录成功 - FlareDrive</title>
   <style>
      body {
         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100vh;
         margin: 0;
         background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
         color: white;
      }
      .container {
         text-align: center;
         padding: 40px;
         background: rgba(255,255,255,0.1);
         border-radius: 16px;
         backdrop-filter: blur(10px);
      }
      h1 { margin: 0 0 10px 0; }
      p { margin: 0; opacity: 0.9; }
   </style>
</head>
<body>
   <div class="container">
      <h1>✓ 登录成功</h1>
      <p>正在返回...</p>
   </div>
   <script>
      setTimeout(function() {
         var returnPath = sessionStorage.getItem('flaredrive_return_path');
         sessionStorage.removeItem('flaredrive_return_path');
         if (returnPath) {
            window.location.href = '/?p=' + encodeURIComponent(returnPath);
         } else {
            window.location.href = '/';
         }
      }, 800);
   </script>
</body>
</html>`;
   
   return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
   });
}
