layui.define(['form','layer','admin','layedit','formSelects','lovexian','laydate','upload','baseSetting','rate'],function(exports){
    var form = layui.form,
        admin = layui.admin,
        layer = layui.layer,
        proPath = layui.baseSetting.LoveXianConfig.proApi,
        laypage = layui.laypage,
        lovexian = layui.lovexian,
        setter = layui.setter,
        formSelects = layui.formSelects,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;
        $ = layui.jquery,
        validate = layui.validate;
    //表单校验
    form.verify(validate);
    form.render();



    form.on('select(status)',function (data)
        {

            var value = data.value;
            window.value1=value;
            //alert(value);
            // var text = data.elem[data.elem.selectedIndex].text;
            // alert(text);
            //from.render('select');
        }
    );

    formSelects.config('example6_3', {
        searchUrl: proPath + '/admin/gatewayDtu/findDtusNotInGatewayDtu?',
        type: 'get',                //请求方式: post, get, put, delete...
        header: {},                 //自定义请求头
        data: {},                   //自定义除搜索内容外的其他数据
        searchName: 'dtuId',      //自定义搜索内容的key值
        searchVal: '',              //自定义搜索内容, 搜素一次后失效, 优先级高于搜索框中的值
        keyName: 'name',            //自定义返回数据中name的key, 默认 name
        keyVal: 'value',            //自定义返回数据中value的key, 默认 value
        keySel: 'selected',         //自定义返回数据中selected的key, 默认 selected
        keyDis: 'disabled',         //自定义返回数据中disabled的key, 默认 disabled
        keyChildren: 'children',    //联动多选自定义children
        delay: 500,                 //搜索延迟时间, 默认停止输入500ms后开始搜索
        response: {
            statusCode: 200,          //成功状态码
            statusName: 'code',     //code key
            msgName: 'msg',         //msg key
            dataName: 'data'        //data key
        },
        header: {
            Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
        },

        beforeSuccess: function (id, url, searchVal, result) {
            lovexian.alert.success('获取DTU列表成功');
            var data = result.data.rows;
            var tranData = [];
            for (var i = 0; i < data.length; i++) {
                tranData.push({
                    name: data[i].dtuId,
                    value: data[i].dtuId,
                })
            }
            result.data = tranData;
            return result;
            window.dtu = result;
        },
        success: function(id, url, searchVal, result){      //使用远程方式的success回调
            console.log(id);        //组件ID xm-select
            console.log(url);       //URL
            console.log(searchVal); //搜索的value
            console.log(result);    //返回的结果
        },
        error: function (id, url, searchVal,err) {
            // console.error(err);
            lovexian.alert.error('获取角色列表失败');
        },
    })
    Window.gatewayDtu= layui.formSelects.value('example6_3');

    formSelects.render({
        //...
        paging: true,
    })



    form.on("submit(addNews)",function(data){

        var id = $("input[name='id']").val();     //input[name='id']是访问input对象id属性
        var gateId = $('.gateId').val();
        var longitude = $('.longitude').val();
        var latitude = $('.latitude').val();
        var descInfo = $('.descInfo').val();
        var elecCharge=$('.elecCharge').val();
        var serverIp=$('.serverIp').val();
        var serverPort=$('.serverPort').val();
        var createdAt=$('.createdAt').val();
        var updatedAt=$('.updatedAt').val();
        var disInfo= $('.disInfo ').val();
        var deleteState= $('.deleteState').val();
        /*$.trim($("#status").val());  //获取val
        $("#status option:selected").text();*/
        window.status = data;

        //dtudata对象
       var gatewaydata = {
            id:id,
            gateId:gateId,
            longitude:longitude,
            latitude:latitude,
            descInfo:descInfo,
            status:window.value1,
            elecCharge: elecCharge,
            serverIp:serverIp,
            serverPort:serverPort,
            createdAt:createdAt,
            updatedAt:updatedAt,
            disInfo:disInfo,
           deleteState:deleteState,
        };
        lovexian.post(proPath + '/admin/gateways/saveOrUpdate',gatewaydata,function () {//存入数据的路径
                lovexian.alert.success('保存成功');
            // $('#lovexian-job').find('#query').click();
        });

        var value1 = layui.formSelects.value('example6_3',`val`);
        for (var i = 0; i < value1.length; i++) {
            var tranData = {
                gatewayId: gatewaydata.gateId,
                dtuId: value1[i]
            };
            lovexian.post(proPath + '/admin/gatewayDtu/saveOrUpdate', tranData);
        }

        layer.closeAll();
        return false;
    });

   /* form.on("submit(relateDtus)",function (data) {
        var gatewayId = $('.gateId').val();
        var dtuId = $('.dtuId').val();
        window.dtu = data;

        var gatewayDtudata = {
            gatewayId:gatewayId,
            dtuId:dtuId,

        };
        lovexian.post(proPath + '/admin/gatewayDtu/saveOrUpdate',gatewayDtudata,function () {//存入数据的路径
            lovexian.alert.success('关联成功');
            // $('#lovexian-job').find('#query').click();
        });
        layer.closeAll();
        return false;

    });*/




    form.on("submit(cancelBtn)",function(data){
        layer.closeAll();
    });

    //对外暴露的接口
    exports('theme/settings/gatewayManage/gatewayAdd', {});
});