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
        searchUrl: proPath + '/admin/dtus/listByTypeId?',
        response: {
            statusCode: 200
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
        error: function (id, url, searchVal, err) {
            // console.error(err);
            lovexian.alert.error('获取角色列表失败');
        },
    })
    Window.gatewayDtu= layui.formSelects.value('example6_3');


    layui.use(['form'], function(){
        var $ = layui.$
            ,form = layui.form;

        var region = $("select[name='status']").val();
        console.log(region);
        // ap-chengdu
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
        layer.closeAll();
        return false;
    });

    form.on("submit(relateDtus)",function (data) {
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

    });




    form.on("submit(cancelBtn)",function(data){
        layer.closeAll();
    });

    //对外暴露的接口
    exports('theme/settings/gatewayManage/gatewayAdd', {});
});