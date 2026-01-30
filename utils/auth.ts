// 仅检查用户是否已认证（不检查路径权限）
export function is_authenticated(context) {
    var headers = new Headers(context.request.headers);
    if(!headers.get('Authorization')) return false;
    
    try {
        const Authorization = headers.get('Authorization').split("Basic ")[1];
        if (!Authorization) return false;
        
        const account = atob(Authorization);
        if(!account) return false;
        if(!context.env[account]) return false;
        
        return true;
    } catch (error) {
        return false;
    }
}

export function get_auth_status(context) {
    var dopath = context.request.url.split("/api/write/items/")[1]
    
    // 如果不是 /api/write/items/ 路径，只检查是否已认证
    if (dopath === undefined) {
        return is_authenticated(context);
    }
    
    if(context.env["GUEST"]){
        if(dopath.startsWith("_$flaredrive$/thumbnails/"))return true;
        const allow_guest = context.env["GUEST"].split(",")
        for (var aa of allow_guest){
            if(aa == "*"){
                return true
            }else if(dopath.startsWith(aa)){
                return true
            }
        }
    }
    var headers = new Headers(context.request.headers);
    if(!headers.get('Authorization'))return false
    const Authorization=headers.get('Authorization').split("Basic ")[1]
    const account = atob(Authorization);
    if(!account)return false
    if(!context.env[account])return false
    if(dopath.startsWith("_$flaredrive$/thumbnails/"))return true;
    const allow = context.env[account].split(",")
    for (var a of allow){
        if(a == "*"){
            return true
        }else if(dopath.startsWith(a)){
            return true
        }
    }
    return false;
  }
