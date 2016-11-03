/**
 * Created by Administrator on 2015/10/19.
 */
/**
 * ����Ϳ������
 * @param url ����·��
 * @param method get/post
 * @param async ͬ�����첽
 * @param data ����
 * @param success ��������
 * @param timeout ��ʱ
 * @param callback ��callback������jsonp����������ajax
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
        jQuery.ajax(//�������⣬�޷���DEV
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


