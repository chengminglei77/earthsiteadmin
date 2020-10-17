layui.define(['element','dropdown', 'baseSetting','admin','formSelects', 'view','validate','baseSetting','lovexian','jquery', 'laydate', 'form', 'table', 'treeSelect','laytpl'], function(exports){
    var $ = layui.jquery,
        admin = layui.admin,
        laydate = layui.laydate,
        setter = layui.setter,
        $view = $('#lovexian-alarm'),//与html中id相同
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

    element.on('tab(alarmInfoTable)',function (data) {
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
    element.tabChange('alarmTab',1);

    dropdown.render({//添加删除小组件
        elem: $view.find('.action-more'),
        click: function (name, elem, event) {
            var checkStatus = table.checkStatus('alarmInfoTable');
            if (name === 'add') {
                addalarmInfo("",0);
                //跳转到actionAdd页面
                // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/theme/life/actionAdd';
            }
            if (name === 'delete') {//批量删除
                if (!checkStatus.data.length) {
                    lovexian.alert.warn('请选择需要删除的报警信息');
                } else {
                    lovexian.modal.confirm('删除报警信息', '确定删除这些报警信息吗？', function () {
                        var alarmIds = [];
                        layui.each(checkStatus.data, function (key, item) {
                            alarmIds.push(item.id)
                        });
                        deleteActions(alarmIds.join(','));
                    });
                }
            }

        },
        options: [{
            name: 'add',
            title: '添加报警信息',
            perms: 'alarmInfo:add'
        }, {
            name: 'delete',
            title: '批量删除',
            perms: 'alarmInfo:del'
        }]
    });

    function addalarmInfo(data,isEdit){
        // console.log(isEdit);
        if(isEdit===1){
        lovexian.popup("theme/messagemanage/alarmManage/alarmEdit",isEdit?"编辑报警信息":"添加报警信息",$.extend(data,{isEdit:isEdit}),function () {
                    layui.use('theme/messagemanage/alarmManage/alarmEdit', layui.factory('theme/messagemanage/alarmManage/alarmEdit'));
                    form.val("lawerForm",{
                        "id":data.id,
                        "alarmInfo":data.alarmInfo,
                        "status":data.status,
                        "alarmTime":data.alarmTime,
                        "dealAdmin":data.dealAdmin,
                        "dealTime":data.dealTime,
                        "alarmReason":data.alarmReason,
                        "deletestatus":data.deletestatus,
                    });
            },
            function () {
                // $query.click();
            });}
        else{
            lovexian.popup("theme/messagemanage/alarmManage/alarmAdd",isEdit?"编辑报警信息":"添加报警信息",$.extend(data,{isEdit:isEdit}),function () {
                        layui.use('theme/messagemanage/alarmManage/alarmAdd', layui.factory('theme/messagemanage/alarmManage/alarmAdd'));
                },
                function () {
                    // $query.click();
                });

        }
    }

    function initTable() {//初始化界面（下面的表格）
        tableIns = lovexian.table.init({
            elem: $('#alarmInfoTable'),
            id: 'alarmInfoTable',
            url: proPath + '/admin/alarmInfo/listByTypeId?',//id根据组件而动，初始化表格
            type:'GET',
            headers:{
                Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
            },
            cols: [[
                {type: 'checkbox',fixed: 'lift'},
                {field: 'alarmInfo', title: '报警信息 ', minWidth: 120,align:'center',fixed: 'lift'},//对应后台idea的字段
                {title: '处理状态', templet: '#check-state',minWidth:120,align:'center'},
                {field: 'alarmTime', title: '报警时间', minWidth:180,align:'center'},
                {field: 'dealAdmin', title: '处理人', minWidth: 120, sort: true,align:'center'},
                {field: 'dealTime', title: '处理时间',minWidth: 180, sort: true,align:'center'},
                {field: 'alarmReason', title: '报警原因', minWidth: 180, sort: true,align:'center'},
                {title: '操作', toolbar: '#action-option', minWidth: 120, fixed: 'right'}
            ]],
        });
    }

    table.on('tool(alarmInfoTable)', function (obj) {
        var data = obj.data,
            layEvent = obj.event;
        console.log(data.status)
        if (layEvent === 'del') {
            //逻辑删除
            if(data.status == 1) //已处理则删除
                 {
                lovexian.modal.confirm('删除报警信息', '确定删除这条报警记录吗？', function () {
                    lovexian.del(proPath + '/admin/alarmInfo/deleteById?id=' + obj.data.id, null, function () {
                        console.log("success");
                        lovexian.alert.success('删除该报警信息成功');
                        $query.click();
                    });
                });
            }
            else {
                lovexian.alert.warn('该报警信息未处理，不能删除');
            }
        }
        if (layEvent === 'edit') {
            //编辑也跳转到actionAdd，根据类型判断是添加还是编辑
            addalarmInfo(obj.data,1);
        }

        if (layEvent === 'restore') {
            //还原
            lovexian.modal.confirm('还原报警信息', '确定还原这条报警记录吗？', function () {
                lovexian.post(proPath + '/admin/alarmInfo/restoreById?id='+ obj.data.id, null, function () {
                    console.log("success");
                    lovexian.alert.success('还原该报警信息成功');
                    $query.click();
                });
            });
        }
        if (layEvent === 'destroy') {
            //彻底删除
            lovexian.modal.confirm('删除报警信息', '确定彻底删除这条报警记录吗？', function () {
                lovexian.del(proPath + '/admin/alarmInfo/completelyDelete?id='+ obj.data.id, null, function () {
                    console.log("success");
                    lovexian.alert.success('删除该报警信息成功');
                    $query.click();
                });
            });
        }
    });//操作


    function deleteActions(alarmIds) {//操作组件之一，删除
        lovexian.del(proPath + '/admin/alarmInfo/BatchDelete/' + alarmIds, null, function () {
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
            status: $searchForm.find('select[name="status"]').val(),
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
    exports('theme/messagemanage/alarmManage/alarm', {});
});