var isClick = false;
jQuery(document).ready(function() {
/* layer 的使用 icon [0-! 1-√ 2-x 3-? 4-🔒 5-😭 6-(*^_^*) ]
   function(){
     layer.msg('也可以这样', {
        time: 20000, //20s后自动关闭
        btn: ['明白了', '知道了']
        });
   }
*/

    //获取表单所有信息
    getElements = function (formId) {
        var form = document.getElementById(formId);
        if (!$(form).is('form')) {
            layer.msg('非表单数据',{icon: 3});
            return false;
        }
        return form;
    };

    //AJAX 提议提交表单信息
    $('.submitFormBtu').click(function (e) {
        e.defaultPrevented = false;
        var _this = $(this);
        var back_url = $(this).data('back_url');
        var is_confirm = $(this).data('is_confirm');
        var elements = getElements('postForm');
        if(!isClick) {
            isClick = true;
            if(is_confirm) {
                layer.confirm(
                    '确定提交嘛？',
                    {icon: 3, title:'提示'},
                    function(){
                        ajaxElement(elements, _this, back_url);
                    }
                );
            } else {
                ajaxElement(elements, _this, back_url);
            }

        }
    });

    //AJAX 提交
    ajaxElement = function (elements, _this, back_url){
        $.ajax({
            url : $(elements).attr('action'),
            type : 'POST',
            dataType : 'json',
            data : $(elements).serialize(),
            success : function (res) {
                isClick = false;
                if (res.status == 1) {
                    if (res.message) {
                        layer.msg(res.message, {icon: 1});
                    }
                    if (res.url) {
                        window.location.href=res.url;
                    }
                    if (back_url != null && back_url !== 'undefined') {
                        window.location.href = back_url;
                    } else {
                        window.location.reload();
                    }

                } else {
                    layer.msg(res.message, {icon: 2});
                    return false;
                }
            },
            error : function () {
                isClick = false;
                layer.msg('服务器繁忙', {icon: 2});
                return false;
            }
        });
    };

    //AJAX  GET提交删除操作
    $('.submitDelete').click(function (){
        var url = $(this).data('url');
        var id = $(this).data('id');
        layer.confirm(
            '你确定要删除该条(ID:'+id+')记录吗?',
            {icon: 3, title:'提示'},
            function(){
                $.ajax({
                    type:'get',
                    url:url,
                    data:{'id':id},
                    dataType:'json',
                    success:function(res){
                        if (res.status == '1') {
                            window.location.reload();
                        } else {
                            layer.msg( res.message, {icon: 2});
                        }
                    }
                });
            }
        );
    });

    //AJAX 搜索
    $('.searchBtn').on('click', function () {
        var elements = getElements('searchForm');
        var params = $(elements).serialize();
        var paramsObj = $(elements).serializeArray();
        var isEmpty = true;
        var url = '';

        for(var key in paramsObj){
            if(paramsObj[key]['value']){
                isEmpty = false;
            }
        }

        if(isEmpty){
            url = $(elements).attr('action')
        } else {
            url =$(elements).attr('action')+'?'+params;
        }

        window.location.href= url;
    });


    //AJAX  GET提交删除操作
    $('.deleteFiles').click(function (){
        var url = $(this).data('url');
        var file_id = $(this).data('file_id');
        layer.confirm(
            '删除文件不可找回，你确定要删除该文件吗?',
            {icon: 3, title:'提示'},
            function(){
                $.ajax({
                    type:'get',
                    url:url,
                    data:{'file_id':file_id},
                    dataType:'json',
                    success:function(res){
                        if (res.status == '1') {
                            window.location.reload();
                        } else {
                            layer.msg( res.message, {icon: 2});
                        }
                    }
                });
            }
        );
    });

    //弹层
    $('.layerModel').click(function () {
        var url = $(this).data('url');
        var id = $(this).data('id');
        lock = false;
        // console.log(lock);
        if(!lock){
            $.ajax({
                type:'get',
                url:url,
                data:{'id':id},
                dataType:'json',
                success:function(res){
                    if (res.status == 1) {
                        if(!lock){
                            layer.open({
                                type: 2, // Layer提供了5种层类型。可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                                area: [res.data['width'], res.data['height']],
                                title: res.data['title'],
                                // shade: 0.8,  //遮罩透明度
                                shadeClose: true, //点击遮罩区域是否关闭页面
                                content: res.data['url']
                            });
                            lock = true;
                            // console.log(lock);
                        }
                        lock = true;
                    } else {
                        if(!lock) {
                            lock = true;
                            layer.msg( res.message, {icon: 2});
                        }

                    }
                }
            });
        }
    });

    //AJAX 提议提交表单信息
    $('.layerSubmitFormBtu').click(function (e) {
        e.defaultPrevented = false;
        var _this = $(this);
        var is_confirm = $(this).data('is_confirm');
        var elements = getElements('postForm');
        if(!isClick) {
            isClick = true;
            if(is_confirm) {
                layer.confirm(
                    '确定提交嘛？',
                    {icon: 3, title:'提示'},
                    function(){
                        ajaxLayerElement(elements, _this);
                    }
                );
            } else {
                ajaxLayerElement(elements, _this);
            }

            setTimeout(function () {
               isClick = false;
            }, 10000);
        }
    });

    //AJAXLayer 提交
    ajaxLayerElement = function (elements, _this){
        $.ajax({
            url : $(elements).attr('action'),
            type : 'POST',
            dataType : 'json',
            data : $(elements).serialize(),
            success : function (res) {
                console.log(res);
                if (res.status == 1) {
                    if (res.message) {
                        parent.layer.msg(res.message, {icon: 1,  time: 1000});
                    }
                } else {
                    parent.layer.msg(res.message, {icon: 2,  time: 1000});
                    return false;
                }
                setTimeout(function () {
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭
                },1200);
            },
            error : function () {
                layer.msg('服务器繁忙', {icon: 2,  time: 1000});
                return false;
            }
        });
    };





















    getUserInfo = function (ele, _this, url) {
        var value = $(_this).val();
        var optionstring = '';
        $(ele).show();
        $(ele).empty();
        $.ajax({
            url : url,
            data : {realname : value},
            dataType : 'json',
            type : 'POST',
            success : function (res){
                if(res.status == 0){
                    layer.msg(res.message, '错误提示');
                } else {
                    if(res.data.length == 0){
                        optionstring = "<option>暂无查到相关用户</option>";
                    } else {
                        $.each(res.data,function(key,value){  //循环遍历后台传过来的json数据
                            optionstring += "<option  value=" + value.id + ">"  + value.realname + " --- " + value.id + "</option>";
                        });
                    }

                    $(ele).append(optionstring);
                }
            },
            error : function (){
                layer.msg('服务器繁忙', '错误提示');
            }
        });
    };

    //添加负责人
    $('#select_search_leader').click(function(e){
        if(e.target.nodeName == 'OPTION'){
            createKeyword(e.target);
        }
        $('#select_search_leader').hide();
        $('#input_search_leader').val('');
    });

    //添加秘书
    $('#select_search_secretary').click(function(e){
        if(e.target.nodeName == 'OPTION'){
            createKeyword(e.target);
        }
        $('#select_search_secretary').hide();
        $('#input_search_secretary').val('');
    });

    //生成小标签
    createKeyword = function (ele){
        console.log($(ele).parent());
        var saveIdName = $(ele).parent().attr('data-save-id');
        var limits = $(ele).parent().attr('data-limit-num');
        var postName = document.getElementById(saveIdName).value;
        var values_id = $(ele).val();
        var values = $(ele).text();//去掉两边的空格

        if(values && values != '暂无查到相关用户'){
            values = values.replace(/\s+/g,"");//去掉两边的空格
            var html =  '<span class="span-tag">'+
                '<span>' +values+'</span>'+
                '&nbsp;&nbsp;'+
                '<a href="javascript:void(0);" onclick="cancelObj(this)" data-id="'+ saveIdName +'" class="fa fa-close" style="color: #fff"></a>'+
                '</span>';
            var keyLength = 0;
            if(postName){
                keyLength = postName.split(',').length;
            }
            if(keyLength < limits){

                if(postName.indexOf(values_id) === -1){ //没有出现
                    $(ele).parent().parent().before(html).end().val('');
                    if(keyLength == 0){
                        $('#'+saveIdName).val(values_id);
                    }else{
                        $('#'+ saveIdName).val(postName +','+ values_id);
                    }
                }else {
                    layer.msg('用户已经存在','错误提示');
                }

            } else {
                $(ele).val('');
                layer.msg('最多就能生成'+ limits +'个标签','错误提示');
            }

        }
    };

    //判断一个字符串是否在一个数组中
    in_array = function (searchValue, stringArray) {
        for (s = 0; s < stringArray.length; s++) {
            thisEntry = stringArray[s].toString();
            if (thisEntry == searchValue) {
                return true;
            }
        }
        return false;
    };

    //删除关键字
    cancelObj = function (ele){
        var saveIdName = $(ele).attr('data-id');
        var keyword = $('#'+ saveIdName).val();
        var str = $(ele).prev().html();
        str = Number(str.split('---')[1]); //获取其中的id值
        var arr = keyword.split(',');
        console.log(arr);
        var keyLength = arr.length;
        var reg;
        if(keyLength == 1){//只有一个的时候
            reg = new RegExp(str);
            console.log(reg);
        }else{
            if(arr[0] == str){//第一个
                reg = new RegExp(str+',');
            }else if(keyLength){//最后一个
                reg = new RegExp(','+str);
            }else{//中间随意
                reg = new RegExp(str+',');
            }
        }
        console.log(reg);
        var removeObj = keyword.replace(reg,'');
        console.log(removeObj);
        $('#'+ saveIdName).val(removeObj);
        $(ele).parent().remove();
    };

    //根据class来提交数据
    classBtu = function(ele, message){
        var url = $(ele).attr('data-action');
        var id = $(ele).attr('data-id');
        $.confirm({
            title: '确认',
            content: '你确定'+message+'该条(ID:'+id+')记录吗?',
            type: 'green',
            icon: 'glyphicon glyphicon-question-sign',
            buttons: {
                ok: {
                    text: '确认',
                    btnClass: 'btn-primary',
                    action: function() {
                        $.ajax({
                            url : url,
                            type : 'POST',
                            dataType : 'json',
                            data : {id:id},
                            success : function (res) {
                                if (res.status == 1) {
                                    window.location.reload();
                                } else {
                                    layer.msg(res.message,'错误提示');
                                }
                            },
                            error : function () {
                                layer.msg('服务器繁忙','错误提示');
                            }
                        });
                    }
                },
                cancel: {
                    text: '取消',
                    btnClass: 'btn-primary'
                }
            }
        });
    };
});
