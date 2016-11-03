/**
 * Created by Administrator on 2015/10/19.
 */
/**
 * 连库就靠这个了
 * @param url 服务路径
 * @param method get/post
 * @param async 同步，异步
 * @param data 参数
 * @param success 解析函数
 * @param timeout 超时
 * @param callback “callback”调用jsonp，其它调用ajax
 */
function ajaxJson(url, data, success, callback, method, timeout, async)
{
    if(method == null || method == "")
        method = "get";

    if(async == null || async == "")
        async = false;

    if(timeout == null || timeout == "")
        timeout = 10000;

    var times = (new Date).getTime();

    if(callback == 'callback')
    {
        jQuery.jsonp(//
            {
                url : url,
                type: method,
                async: false,
                data : data,
                dataType : 'jsonp',
                timeout: timeout,
                callbackParameter : 'jsoncallback',
                success : function(data)
                {
                    var json = eval('('+data+')');
//                console.log("get data from ajax "+json);
                    success(json);
                },
                error: function(xhr, textStatus, errorThrown)
                {
                    console.log(xhr+" , "+textStatus+","+errorThrown);
                    console.log("jsonp error return!");
                }
            })
    }
    else
    {
        jQuery.ajax(//跨域问题，无法连DEV
            {
                url: url,
                type: method,
                async: async,
                data: data,
                timeout: timeout,
                dataType: 'json',
                success: function(datas)
                {
                    success(datas);
                },
                error: function()
                {
                    console.log("ajax error return!");
                }
            });
    }
}


