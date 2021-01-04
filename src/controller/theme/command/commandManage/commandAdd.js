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


    laydate.render({
        elem: '#createTime',
        range: true,
        trigger: 'click',
        position: 'fixed'
    });
    function getQueryParams() {
        var createTimeFrom='',
            createTimeTo='',

            createTime = $searchForm.find('input[name="createTime"]').val();
        //alert(createTime);
        if (createTime) {
            createTimeFrom = createTime.split(' - ')[0];
            createTimeTo = createTime.split(' - ')[1];
        }
        return {
            pageSize: 10,
            pageNum: 1,
            createTimeFrom: createTimeFrom,
            createTimeTo: createTimeTo,
            status: $searchForm.find('select[name="status"]').val(),
            deleteState: $searchForm.find('select[name="delete_status"]').val(),
        };
    }
    $("#command").on("change",function () {
        if ($('#command option:selected').val()=="A1"){
            
        }
    })
    var btn = document.getElementById("btn");
    $(function getValue(){
        var str=$("selectid option:selected").val();
        $('#btn').on('click', function(){
            $.ajax({
                type: "GET",
                url:"http://192.168.43.87:5000/command",
                data: {
                    cmd: 'AA55'
                },
                dataType:"json",
                async: true,
                success: function(data) {
                   /* alert("服务器返回的数据是"+data);
                    var cmd=data.cmd;
                    console.log(cmd);
                    var cmdToHexadecimal=cmd.toString(16);
                    console.log(cmdToHexadecimal);*/
                },
            });

        });
    });


    $(function () {
        $('#btn').on('click',function () {
           var command=$("#command").val();
           var deviceId=$("#deviceId").val();
           var sensorSerialNum=$("#sensorSerialNum").val();
           var sensorNum=$("#sensorNum").val();
           var sensorType=$("#sensorType").val();
           var createTime=$("#createTime").val();
           var sensorAddr=$("#sensorAddr").val();
           alert(command+","+deviceId+","+sensorSerialNum+","+sensorNum+","+sensorType+","+createTime+","+sensorAddr);

        });
    });
    function getQueryParams(){
            return {//根据find不同,调用不同的方法,其中dtuName对应queryDtuInfo,而status对应listByTypeId
                deviceId: $searchForm.find('input[name="deviceId"]').val().trim(),//此处对应<input type="text" name="dtuName" autocomplete="off" class="layui-input">
                command: $searchForm.find('select[name="command"]').val(),//此处对应html里面的select框:<select name="status">
                sensorType: $searchForm.find('select[name="sensorType"]').val(),//此处对应html里面的select框:<select name="status">
                sensorSerialNum:$searchForm.find('input[name="sensorSerialNum"]').val().trim(),
                sensorNum:$searchForm.find('input[name="sensorNum"]').val().trim(),
                sensorAddr:$searchForm.find('input[name="sensorAddr"]').val().trim(),

            };
        // lovexian.popup("theme/messagemanage/commandManage/command");
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
        layui.use('theme/command/commandManage/command', layui.factory('theme/command/commandManage/command'));
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



    //对外暴露的接口
    exports('theme/command/commandManage/commandAdd', {});
});