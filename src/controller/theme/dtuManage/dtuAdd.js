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





    form.on("submit(addNews)",function(data){

        //此处要和下方var dtudata =里面的数量类型一致
        var id = $("input[name='id']").val();
        var dtuId = $('.dtuId').val();
        var dtuName = $('.dtuName').val();
        var longitude = $('.longitude').val();
        var latitude = $('.latitude').val();
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
    exports('theme/dtuManage/dtuAdd', {});
});