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

        var id = $("input[name='id']").val();     //input[name='id']是访问input对象id属性
        var gateId = $('.gateId').val();
        var longitude = $('.longitude').val();
        var latitude = $('.latitude').val();
        var descInfo = $('.descInfo').val();
        var status = $('.status').val();
        var elecCharge=$('.elecCharge').val();
        var serverIp=$('.serverIp').val();
        var serverPort=$('.serverPort').val();
        var createdAt=$('.createdAt').val();
        var updatedAt=$('.updatedAt').val();
        var disInfo= $('.disInfo ').val();

        //dtudata对象
        var dtudata = {
            id:id,
            gateId:gateId,
            longitude:longitude,
            latitude:latitude,
            descInfo:descInfo,
            status:status,
            elecCharge: elecCharge,
            serverIp:serverIp,
            serverPort:serverPort,
            createdAt:createdAt,
            updatedAt:updatedAt,
            disInfo:disInfo,
        };

        lovexian.post(proPath + '/admin/gateways/saveOrUpdate',dtudata);
        layer.closeAll();
        return false;
    });
    form.on("submit(cancelBtn)",function(data){
        layer.closeAll();
    });

    //对外暴露的接口
    exports('theme/gatewayManage/gatewayAdd', {});
});