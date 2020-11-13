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

    // layui.use('table', function(){
    //     var table = layui.table;
    //     table.render({
    //         elem: '#demo'
    //         ,height: 312
    //         ,url: '/demo/table/user/' //数据接口
    //         ,page: true //开启分页
    //         ,cols: [[ //表头
    //             {field: 'KEY', title: '下发指令', width:350, sort: true, fixed: 'left'}
    //             ,{field: 'value', title: '值', width:350}
    //             ,{field: 'description', title: '描述信息', width:350}
    //         ]]
    //     });
    //
    // });
    var btn = document.getElementById("btn");
    $(function(){
        $('#btn').on('click', function(){
            $.ajax({
                type: "POST",
                url:"http://192.168.1.113:5000/command",
                data:{
                    cmd:"12"
                },
                dataType:"json",
                async: true,
                success: function(data) {
                    alert("服务器返回的数据是"+data);
                    var cmd=data.cmd;
                    console.log(cmd);
                    var cmdToHexadecimal=cmd.toString(16);
                    console.log(cmdToHexadecimal);
                },
            });
        });
    });

    $(function () {
        $('#btn').on('click',function () {
            addCommandInfo();
        })
    });
    function addCommandInfo(){
        lovexian.popup("theme/messagemanage/commandManage/command");
    }




    form.on("submit(execute)",function(data){

        var id = $("input[name='id']").val();     //input[name='id']是访问input对象id属性
        var command = $('.commandInfo').val();
        var description=$('.commandReason').val();
        // var dealtime = new Date(dealTime);
        //dtudata对象
        var commanddata = {
            id:id,
            command:command,
            description:description,
        };
        lovexian.post(proPath + '/admin/commandInfo/saveOrUpdate',commanddata,function () {//存入数据的路径
            lovexian.alert.success('执行成功');
            // $('#lovexian-job').find('#query').click();
        });
        layui.use('theme/messagemanage/commandManage/command', layui.factory('theme/messagemanage/commandManage/command'));
        layer.closeAll();
        return false;
    });

    form.on("submit(cancelBtn)",function(data){

        alert( layui.formSelects.value('example6_3','val'));
        alert(layui.formSelects.value('example6_3', 'name'));
        layer.closeAll();
    });

    //国际版
    laydate.render({
        elem: '#test1-1'
        ,type: 'datetime'
    });

    $reset.on('click',function () {//重置
        // $searchForm[0].reset();
        initTable();
    });

    //对外暴露的接口
    exports('theme/messagemanage/commandManage/commandAdd', {});
});