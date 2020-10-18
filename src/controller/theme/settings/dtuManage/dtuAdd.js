layui.define(['form','layer','admin','layedit','formSelects','lovexian','laydate','upload','baseSetting','rate'],function(exports){
    var form = layui.form,
        admin = layui.admin,
        layer = layui.layer,
        proPath = layui.baseSetting.LoveXianConfig.proApi,
        laypage = layui.laypage,
        lovexian = layui.lovexian,
        setter = layui.setter,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery,
    formSelects = layui.formSelects,
    $ = layui.jquery,

        validate = layui.validate;
    //表单校验
    form.verify(validate);
    form.render();





    formSelects.config('example6_3', {
        searchUrl: proPath + '/admin/sensors/listByTypeId?',
        response: {
            statusCode: 200
        },
        header: {
            Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
        },

        beforeSuccess: function (id, url, searchVal, result) {
            var data = result.data.rows;
            var tranData = [];
            for (var i = 0; i < data.length; i++) {
                tranData.push({
                    name: data[i].typeId,
                    value: data[i].sensorId
                })
            }
            result.data = tranData;
            return result;
        },
        error: function (id, url, searchVal, err) {
            // console.error(err);
            lovexian.alert.error('获取角色列表失败');
        },

           // layer.closeAll();
    });
    //Window.dtuSensorsAdd= layui.formSelects.value('example6_3');

form.on('select(State)',function (data)
    {

        var value = data.value;
        window.value=value;
        //alert(value);
        // var text = data.elem[data.elem.selectedIndex].text;
        // alert(text);
        //from.render('select');
    }

);

    form.on("submit(addNews)",function(data){

        //此处要和下方var dtudata =里面的数量类型一致
        var id = $("input[name='id']").val();
        var dtuId = $('.dtuId').val();
        var dtuName = $('.dtuName').val();
        var longitude = $('.longitude').val();
        var latitude = $('.latitude').val();
        var descInfo = $('.descInfo').val();
        var dtuType = $('.dtuType').val();
        var elcVolume = $('.elcVolume').val();
        var status = $('.status select').val();
        var disInfo = $('.disInfo').val();
        var value=window.value;
        var dtudata = {
            id:id,
            dtuId:dtuId,
            dtuName:dtuName,
            longitude:longitude,
            latitude:latitude,
            descInfo:descInfo,
            dtuType: dtuType,
            elcVolume:elcVolume,
            status:value,
            disInfo:disInfo,
        };
        //window.dtuSensors=dtudata;
        lovexian.post(proPath + '/admin/dtus/saveOrUpdate',dtudata);

        layer.closeAll();
        return false;

    });
   /* form.on("submit(addNews)",function(data){

        var id = $("input[name='id']").val();
        var dtuId = $('.dtuId').val();
        var region = $("select[name='region']").val();
        var dtudata1 = {
            id:id,
            dtuId:dtuId,
            sensorId:Window.dtuSensorsAdd.sensorId,
        };

        lovexian.post(proPath + '/admin/dtuSensor/saveOrUpdate',dtudata1);
        layer.closeAll();
        return false;
    });*/


//取消按钮,直接关闭当前窗口
    form.on("submit(cancelBtn)",function(data){
        layer.closeAll();
    });

    //对外暴露的接口
    exports('theme/settings/dtuManage/dtuAdd', {});
});