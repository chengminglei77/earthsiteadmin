layui.define(['element','dropdown', 'baseSetting','admin','formSelects', 'view','validate','baseSetting','lovexian','jquery', 'laydate', 'form', 'table', 'treeSelect','laytpl'], function(exports){
    var $ = layui.jquery,
        admin = layui.admin,
        laydate = layui.laydate,
        setter = layui.setter,
        $view = $('#lovexian-command'),//与html中id相同
        laytpl = layui.laytpl,
        lovexian = layui.lovexian,
        dropdown = layui.dropdown,
        form = layui.form,
        table = layui.table,
        router = layui.router(),
        search = router.search,
        proPath = layui.baseSetting.LoveXianConfig.proApi,
        element = layui.element,
        pre_layer = $(".preview-layer"),
        pre_bg = $(".preview-bg"),
        pre_phone = $("#previewPhone");
    $searchForm = $view.find('form');
    $query=$searchForm.find("div[name='query']");
    $reset=$searchForm.find("div[name='reset']");
    var stars;

    form.render();
    initTable();
    var typeId=1;
    // layui.data('id',{key:'actionTypeId',value:1});
    // alert(layui.data('id').actionTypeId);

    element.on('tab(commandInfoTable)',function (data) {
        var idvalue=data.index+1;//从0开始
        // $searchForm.find('input[name="actTitle"]').val("");
        initTable();
    });

    //渲染权限
    var fakerData = ["faker"];
    var getTpl = actionMoreTpl.innerHTML
        , view = document.getElementById('actionMoreContainer');
    laytpl(getTpl).render(fakerData, function (html) {
        view.innerHTML = html;
    });
    laydate.render({
        elem: '#createTime',
        range: true,
        trigger: 'click',
        position: 'fixed'
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
            title: '添加报警信息',
            perms: 'commandInfo:add'
        }, {
            name: 'delete',
            title: '批量删除',
            perms: 'commandInfo:del'
        }]
    });

    function addcommandInfo(data,isEdit){
        // console.log(isEdit);
        lovexian.popup("theme/messagemanage/commandManage/commandAdd",isEdit?"编辑报警信息":"添加报警信息",$.extend(data,{isEdit:isEdit}),function () {
                if(isEdit===1) {
                    layui.use('theme/messagemanage/commandManage/commandAdd', layui.factory('theme/messagemanage/commandManage/commandAdd'));
                    form.val("lawerForm",{
                        "id":data.id,
                        "command":data.command,
                        "cmd_status":data.cmd_status,
                        "send_Time":data.send_Time,
                        "receive_Time":data.receive_Time,
                        "count":data.count,
                        "description":data.description,
                    });

                } else{
                    layui.use('theme/messagemanage/commandManage/commandAdd', layui.factory('theme/messagemanage/commandManage/commandAdd'));

                }

            },
            function () {
                // $query.click();
            });
    }

    function initTable() {//初始化界面（下面的表格）
        tableIns = lovexian.table.init({
            elem: $('#commandInfoTable'),
            id: 'commandInfoTable',
            url: proPath + '/admin/commandInfo/listByTypeId?',//id根据组件而动，初始化表格
            type:'GET',
            headers:{
                Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
            },
            cols: [[
                {type: 'checkbox',fixed: 'lift'},
                {field: 'command', title: '接口信息', minWidth: 120,align:'center',fixed: 'lift'},//对应后台idea的字段
                {title: '处理状态',templet: '#check-state', minWidth: 180, align:'center'},
                {field: 'sendTime', title: '发送时间',minWidth: 180, align:'center'},
                {field: 'receiveTime', title: '接收时间', minWidth:120,align:'center'},
                {field: 'count', title: '数量', minWidth:120,align:'center'},
                {field: 'description', title: '描述', minWidth: 180, sort: true,align:'center'},
                {title: '操作', toolbar: '#action-option', minWidth: 120, fixed: 'right'}
            ]],
        });
    }

    table.on('tool(commandInfoTable)', function (obj) {
        var data = obj.data,
        layEvent = obj.event;
        console.log(data.status)
        if (layEvent === 'del') {//删除景点信息
            //逻辑删除
            if(data.cmdStatus == 1) //已处理则删除
                 {
                lovexian.modal.confirm('删除物理信息', '确定删除这条物理记录吗？', function () {
                    lovexian.del(proPath + '/admin/commandInfo/completelyDelete?id=' + obj.data.cmdStatus, null, function () {
                        console.log("success");
                        lovexian.alert.success('删除该物理信息成功');
                        $query.click();
                    });
                });
            }
            else {
                lovexian.alert.warn('该物理信息未处理，不能删除');
            }
        }
        if (layEvent === 'edit') {
            //编辑也跳转到actionAdd，根据类型判断是添加还是编辑
            addcommandInfo(obj.data,1);
        }
        if (layEvent === 'restore') {
            //还原
            lovexian.modal.confirm('还原报警信息', '确定还原这条报警记录吗？', function () {
                lovexian.del(proPath + '/admin/commandInfo/restoreById?id='+ obj.data.id, null, function () {
                    console.log("success");
                    lovexian.alert.success('还原该报警信息成功');
                    $query.click();
                });
            });
        }
        if (layEvent === 'destroy') {
            //彻底删除
            lovexian.modal.confirm('删除报警信息', '确定彻底删除这条报警记录吗？', function () {
                lovexian.del(proPath + '/admin/commandInfo/completelyDelete?id='+ obj.data.id, null, function () {
                    console.log("success");
                    lovexian.alert.success('删除该报警信息成功');
                    $query.click();
                });
            });
        }
    });//操作


    function deleteActions(commandIds) {//操作组件之一，删除
        lovexian.del(proPath + '/admin/commandInfo/BatchDelete/' + commandIds, null, function () {
            console.log("success");
            lovexian.alert.success('删除选中报警信息');
            $query.click();
        });
    }


    function getQueryParams() { var createTimeFrom='',
        createTimeTo='',

        createTime = $searchForm.find('input[name="createTime"]').val();
        //alert(createTime);
        if (createTime) {
            createTimeFrom = createTime.split(' - ')[0];
            createTimeTo = createTime.split(' - ')[1];
        }
    /*     alert(createTimeFrom);
         alert(createTimeTo);*/
        return {
            createTimeFrom: createTimeFrom,
            createTimeTo: createTimeTo,
            status: $searchForm.find('select[name="cmd_status"]').val(),
            deleteState: $searchForm.find('select[name="delete_status"]').val(),
        };
    }

    $query.on('click',function () {
        var params = getQueryParams();
        console.log(params);
        tableIns.reload({where: params});
    });

    $reset.on('click',function () {//重置
        $searchForm[0].reset();
        initTable();
    });


    //对外暴露的接口
    exports('theme/settings/commandManage/command', {});
});