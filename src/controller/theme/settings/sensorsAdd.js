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



    //上传缩略图
    upload.render({
        elem: '.thumbBox',
        url: proPath+'/fileupload/smallfile',
        method : "post",  //此处是为了演示之用，实际使用中请将此删除，默认用post方式提交
        headers: {
            Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
        },
        done: function(res, index, upload){
            $('.thumbImg').attr('src',res.data.url);
            $('.thumbBox').css("background","#fff");
        }
    });

    //格式化时间
    function filterTime(val){
        if(val < 10){
            return "0" + val;
        }else{
            return val;
        }
    }

    form.verify({
        name : function(val){
            if(val == ''){
                return "律师姓名不能为空";
            }
        },
        locationName:function(val)
        {
            if(val =='')
            {
                return "工作机构不能为空"
            }
        },
        telNumber:function(val){
            if(val == ''){
                return "手机号码不能为空"
            }
        },
        skillField:function(val){
            if(val == ''){
                return "擅长领域不能为空"
            }
        },
        thumbImg: function () {

            if(typeof ($(".thumbImg").attr("src"))=="undefined")
            {
                return "请上传图片";
            }
        },
    });

    function removeTAG(str){
        return str.replace(/<[^>]+>/g, "").trim();
    }
    form.on("submit(addNews)",function(data){

        if($('.thumbImg')[0].src==""){
            layer.alert("图片不能为空",  {time:2000, icon:5, shift:6},function(index){
                layer.close(index);
            });
            return ;
        }
        var id = $("input[name='id']").val();
        var lawerName = $('.lawerName').val();
        /*var longitude = $('#longitude').val();
        var latitude = $('.latitude').val();*/
        var lawerOrganization = $('.lawerOrganization').val();//name用#,class 别名用.
        var telNumber=$('.telNumber').val();
        // var workTime=$('.workTime').val();
        // workTime = $searchForm.find('input[name="workTime"]').val();
        var skillField=$('.skillField').val();
        var lawerAbstract=$('.lawerAbstract').val();
        var others=$('.others').val();
        var $headImage=$('.thumbImg').attr("src");
        var checkState= $('.lawerStatus select').val();   //发布状态

        //弹出loading
        // var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        //实际使用时的提交信息

        // alert(stars);
        var star = starNum | starEle.config.value;

        // alert(checkState);
        if(  star===0 ||star===null)
        {
            layer.alert("没有评分",  {time:2000, icon:5, shift:6},function(index){
                layer.close(index);
            });
            return ;
        }

        else{
            var lawerdata = {
                id:id,
                lawerName:lawerName,
                lawerOrganization:lawerOrganization,
                telNumber:telNumber,
                // workTime:workTime,
                lawerAbstract:lawerAbstract,
                skillField:skillField,
                star:star,
                checkState:checkState,
                lawerHeadPhoto : $headImage,  //缩略图
                languageType : $('.languageType select').val(),    //发布状态
            };
            stars = 0;
            lovexian.post(proPath + '/admin/lawerInfo/saveOrUpdate',lawerdata,function () {//存入数据的路径
                var status = $('.newsStatus select').val();
                if( status == '0'){
                    lovexian.alert.success('保存草稿成功');
                }else{
                    lovexian.alert.success('发布成功，等待审核');
                }

                // $('#lovexian-job').find('#query').click();
            });
            layer.closeAll();
            return false;
        }
    });
    form.on("submit(cancelBtn)",function(data){
        layer.closeAll();
    });

    //对外暴露的接口
    exports('theme/life/lawerAdd', {});
});