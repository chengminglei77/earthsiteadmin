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
        var alarmInfo = $('.alarmInfo').val();
        var status = $('.status').val();
        var alarmTime = $('.alarmTime').val();
        var dealAdmin = $('.dealAdmin').val();
        var dealTime = $('.dealTime').val();
        var alarmReason=$('.alarmReason').val();

        var dealtime = new Date(dealTime);
        //dtudata对象
        var dtudata = {
            id:id,
            alarmInfo:alarmInfo,
            status:status,
            alarmTime:alarmTime,
            dealAdmin:dealAdmin,
            dealTime:dealtime,
            alarmReason:alarmReason,
        };

        lovexian.post(proPath + '/admin/alarmInfo/saveOrUpdate',dtudata,function () {//存入数据的路径
            lovexian.alert.success('保存成功');
            // $('#lovexian-job').find('#query').click();
        });
        layer.closeAll();
        return false;
    });
    form.on("submit(cancelBtn)",function(data){
        layer.closeAll();
    });
    //国际版
    laydate.render({
        elem: '#test1-1'
        ,type: 'datetime'
    });

    //对外暴露的接口
    exports('theme/settings/alarmManage/alarmAdd', {});
});