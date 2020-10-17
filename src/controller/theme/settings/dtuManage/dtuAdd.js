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



    // //上传缩略图
    // upload.render({
    //     elem: '.thumbBox',
    //     url: proPath+'/fileupload/smallfile',
    //     method : "post",  //此处是为了演示之用，实际使用中请将此删除，默认用post方式提交
    //     headers: {
    //         Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
    //     },
    //     done: function(res, index, upload){
    //         $('.thumbImg').attr('src',res.data.url);
    //         $('.thumbBox').css("background","#fff");
    //     }
    // });
    //
    // //格式化时间
    // function filterTime(val){
    //     if(val < 10){
    //         return "0" + val;
    //     }else{
    //         return val;
    //     }
    // }
    //
    // form.verify({
    //     name : function(val){
    //         if(val == ''){
    //             return "律师姓名不能为空";
    //         }
    //     },
    //     locationName:function(val)
    //     {
    //         if(val =='')
    //         {
    //             return "工作机构不能为空"
    //         }
    //     },
    //     telNumber:function(val){
    //         if(val == ''){
    //             return "手机号码不能为空"
    //         }
    //     },
    //     skillField:function(val){
    //         if(val == ''){
    //             return "擅长领域不能为空"
    //         }
    //     },
    //     thumbImg: function () {
    //
    //         if(typeof ($(".thumbImg").attr("src"))=="undefined")
    //         {
    //             return "请上传图片";
    //         }
    //     },
    // });
    //
    // function removeTAG(str){
    //     return str.replace(/<[^>]+>/g, "").trim();
    // }
   /* var data3=window.formData2;
    var data5 = data3.dtuId;*/

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
        }
    })
    Window.dtuSensorsAdd= layui.formSelects.value('example6_3');
/*
    form.on('test', function (data){
        url:proPath + '/admin/dtuSensor/selectCheckList?dtuId='+data5,
        dataType:'json',
        //type:'post',
        success:function(data){

            $.each(data,function(index,item){
                console.log(item);
                //option 第一个参数是页面显示的值，第二个参数是传递到后台的值
                $('#selectId').append(new Option(item.typeId,item.sensorId));//往下拉菜单里添加元素
                //设置value（这个值就可以是在更新的时候后台传递到前台的值）为2的值为默认选中
                //$('#selectId').val(2);
            })
            form.render(); //更新全部表单内容
            //form.render('select'); //刷新表单select选择框渲染
        }
    });*/

   /* form.on('select(test)', function(data){
        alert(123);
    });*/


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
        //window.dtuSensors=dtudata;
        lovexian.post(proPath + '/admin/dtus/saveOrUpdate',dtudata);

        layer.closeAll();
        return false;

    });
    form.on("submit(addNews)",function(data){

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
    });


//取消按钮,直接关闭当前窗口
    form.on("submit(cancelBtn)",function(data){
        layer.closeAll();
    });

    //对外暴露的接口
    exports('theme/settings/dtuManage/dtuAdd', {});
});