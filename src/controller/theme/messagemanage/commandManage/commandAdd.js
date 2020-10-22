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

    element.on('tab(commandTab)',function (data) {
        var idvalue=data.index+1;//从0开始
        initTable();
    });
    element.tabChange('commandTab',1);


    dropdown.render({//添加删除小组件
        elem: $view.find('.action-more'),
        click: function (name, elem, event) {
            var checkStatus = table.checkStatus('commandInfoTable');
            if (name === 'add') {
                addcommandInfo("",0);
                //跳转到actionAdd页面
                // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/theme/life/actionAdd';
            }
            if (name === 'delete') {//批量删除
                if (!checkStatus.data.length) {
                    lovexian.alert.warn('请选择需要删除的报警信息');
                } else {
                    lovexian.modal.confirm('删除报警信息', '确定删除这些报警信息吗？', function () {
                        var commandIds = [];
                        layui.each(checkStatus.data, function (key, item) {
                            commandIds.push(item.id)
                        });
                        deleteActions(commandIds.join(','));
                    });
                }
            }

        },
        options: [{
            name: 'add',
            title: '添加接口信息',
            perms: 'commandInfo:add'
        }, {
            name: 'delete',
            title: '批量删除',
            perms: 'commandInfo:del'
        }]
    });




    form.on("submit(addNews)",function(data){

        var id = $("input[name='id']").val();     //input[name='id']是访问input对象id属性
        var command = $('.commandInfo').val();
        var status = $('.status').val();
        var sendTime = $('.sendTime').val();
        var receiveTime = $('.receiveTime').val();
        var description=$('.commandReason').val();
        // var dealtime = new Date(dealTime);
        //dtudata对象
        var dtudata = {
            id:id,
            command:command,
            status:status,
            count:count,
            description:description,
        };
        lovexian.post(proPath + '/admin/commandInfo/saveOrUpdate',dtudata,function () {//存入数据的路径
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
    exports('theme/settings/commandManage/commandAdd', {});
});