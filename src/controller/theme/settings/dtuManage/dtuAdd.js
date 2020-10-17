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
        var status = $('.status').val();
        var disInfo = $('.disInfo').val();

        var dtudata = {
            id:id,
            dtuId:dtuId,
            dtuName:dtuName,
            longitude:longitude,
            latitude:latitude,
            descInfo:descInfo,
            dtuType: dtuType,
            elcVolume:elcVolume,
            status:status,
            disInfo:disInfo,
        };

        lovexian.post(proPath + '/admin/dtus/saveOrUpdate',dtudata);

        layer.closeAll();
        return false;

    });







//取消按钮,直接关闭当前窗口
    form.on("submit(cancelBtn)",function(data){
        layer.closeAll();
    });

    //对外暴露的接口
    exports('theme/settings/dtuManage/dtuAdd', {});
});