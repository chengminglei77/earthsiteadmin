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

    /*element.on('tab(gatewayInfoTable)',function (data) {
        var idvalue=data.index+1;//从0开始
        layui.data('id',{key:'gatewayTypeId',value:idvalue});
        // $searchForm.find('input[name="actTitle"]').val("");
        initTable();
    });*/
/*    element.tabChange('commandTab',1);*/

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
            lovexian.alert.success('保存成功');
            // $('#lovexian-job').find('#query').click();
        });
        layer.closeAll();
        return false;
    });

    dropdown.render({//添加删除小组件
        elem: $view.find('.action-more'),
        click: function (name, elem, event) {
            if (name === 'history') {
                commandHistory("",0);
                //跳转到actionAdd页面
                // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/theme/life/actionAdd';
            }
        },
        options: [{
            name: 'history',
            title: '添加报警信息',
            perms: 'commandInfo:add'
        }]
    });

    function commandHistory(data,history){
        console.log(history);
        lovexian.popup("theme/messagemanage/commandManage/commandAdd","接口信息",$.extend(data,{isEdit:isEdit}),
            function () {
                // $query.click();
            });
    }


    form.on("submit(cancelBtn)",function(data){
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