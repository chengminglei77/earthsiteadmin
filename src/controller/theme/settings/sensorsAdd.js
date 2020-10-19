layui.define(['form','layer','admin','layedit','lovexian','laydate','upload','baseSetting','rate'],function(exports){
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
        $ = layui.jquery;
    $ = layui.jquery,
        validate = layui.validate;
    //表单校验
    form.verify(validate);
    form.render();

    form.on('select(status)',function (data)
        {

            var value = data.value;
            window.value2=value;
            //alert(value);
            // var text = data.elem[data.elem.selectedIndex].text;
            // alert(text);
            //from.render('select');
        }

    );


    form.on("submit(addNews)",function(data){

        //此处要和下方var dtudata =里面的数量类型一致
        var id = $("input[name='id']").val();
        var sensorId = $('.sensorId').val();
        var typeId = $('.typeId').val();
        var longitude = $('.longitude').val();
        var latitude = $('.latitude').val();
        var disInfo = $('.disInfo').val();
        var sensordata = {
            id:id,
            sensorId: sensorId,
            typeId:typeId,
            longitude:longitude,
            latitude:latitude,
            status:window.value2,
            disInfo:disInfo,
        };

        lovexian.post(proPath + '/admin/sensors/saveOrUpdate',sensordata);
        layer.closeAll();
        return false;

    });


//取消按钮,直接关闭当前窗口
    form.on("submit(cancelBtn)",function(data){
        layer.closeAll();
    });

    //对外暴露的接口
    exports('theme/settings/sensorsAdd', {});
});