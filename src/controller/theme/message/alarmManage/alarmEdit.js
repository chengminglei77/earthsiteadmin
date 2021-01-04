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


   /* form.on('select(required)', function (data) {        //对应lay-filter
        required= data.value;                            //获取value值
        text= data.elem[data.elem.selectedIndex].text;   //获取显示的值
        form.render();
    });
*/
    form.on('select(State)',function (data)
        {

            var value = data.value;
            window.value3=value;
            //alert(value);
             var text = data.elem[data.elem.selectedIndex].text;
             //alert(text);
            //from.render('select');
        });

    form.on("submit(addNews)",function(data){

        var id = $("input[name='id']").val();     //input[name='id']是访问input对象id属性
        var alarmInfo = $('.alarmInfo').val();
        var status = $("select[name='status']").val();
        var alarmTime = $('.alarmTime').val();
        var dealAdmin = $('.dealAdmin').val();
        var dealTime = $('.dealTime').val();
        var alarmReason=$('.alarmReason').val();

        var alarmTime = new Date(alarmTime);
        var dealTime = new Date(dealTime);

        //dtudata对象
        var alarmdata = {
            id:id,
            alarmInfo:alarmInfo,
            status:window.value3,
            alarmTime:alarmTime,
            dealAdmin:dealAdmin,
            dealTime:dealTime,
            alarmReason:alarmReason,
        };

        lovexian.post(proPath + '/admin/alarmInfo/saveOrUpdate',alarmdata,function () {//存入数据的路径
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
        elem: '#alarmTime'
        ,type: 'datetime'
        ,position: 'fixed'
    });
      /*laydate.render({
        elem: '#dealTime'
        ,type: 'datetime'
        ,trigger: 'click'
        ,position: 'fixed'
    });*/

    //if(data.dealTime == null) {
        layui.use('laydate', function () {
            var laydate = layui.laydate;
            laydate.render({
                elem: '#dealTime'// input里时间的Id
                , type: 'datetime'
                , trigger: 'click'
                , position: 'fixed'
                , value: new Date()
                , done: function (value, date) {
                }
            });
        });
    //}
    //对外暴露的接口
    exports('theme/message/alarmManage/alarmEdit', {});
});