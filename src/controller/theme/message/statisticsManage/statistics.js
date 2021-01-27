layui.define(['element','dropdown', 'baseSetting','admin','formSelects', 'view','validate','baseSetting','lovexian','jquery', 'laydate', 'form', 'table', 'treeSelect','laytpl'], function(exports){
    var $ = layui.jquery,
        admin = layui.admin,
        laydate = layui.laydate,
        setter = layui.setter,
        $view = $('#lovexian-statistics'),//与html中id相同
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
    element.on('tab(statisticsTab)',function (data) {
        var idvalue=data.index+1;//从0开始
        initTable();
    });
    element.tabChange('statisticsTab',0);

    //渲染权限
    var fakerData = ["faker"];
    // var getTpl = actionMoreTpl.innerHTML
    //     , view = document.getElementById('actionMoreContainer');
    // laytpl(getTpl).render(fakerData, function (html) {
    //     view.innerHTML = html;
    // });
    laydate.render({
        elem: '#createTime',
        range: true,
        trigger: 'click',
        position: 'fixed'
    });


/*    dropdown.render({//添加删除小组件
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
    });*/

/*    function addalarmInfo(data,isEdit){
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
    }*/

    function initTable() {
        console.log($(".layui-tab-title .layui-this").attr("lay-id"))
        tableIns = lovexian.table.init({
            elem: $('#DeviceStatistics' + $(".layui-tab-title .layui-this").attr("lay-id")),
            id: 'DeviceStatistics' + $(".layui-tab-title .layui-this").attr("lay-id"),
            url: proPath + '/admin/DeviceStatistics/listByTypeId?type='+$(".layui-tab-title .layui-this").attr("lay-id"),
            type: 'GET',
            headers: {
                Authentication: layui.data(setter.tableName)[setter.TOKENNAME]
            },
            cols: [[{type: 'checkbox',fixed: 'lift'},
                {field: 'settingId', title: '设备型号', minWidth: 120, sort: true,align:'center'},

                {field: 'eqDuration', title: '工作时间 ', minWidth: 120,align:'center'},//对应后台idea的字段
                //{field: 'recordNms', title: '记录数', minWidth:180,align:'center'},
                {field: 'packetSize', title: '信息包总量', minWidth: 120, sort: true,align:'center'},
                {field: 'infoTotal', title: '信息总量', minWidth: 120, sort: true,align:'center'},
                {field: 'updatedAt', title: '更新时间', minWidth: 120, sort: true,align:'center'},
                //{field: 'type', title: '设备类型', minWidth: 180, sort: true,align:'center'},
                {title: '操作', toolbar: '#action-option', minWidth: 120, fixed: 'right'}
            ]],
        });
    }

    table.on('tool(DeviceStatistics)', function (obj) {
        var data = obj.data,
            layEvent = obj.event;
        //alert("ss");
       // console.log(data.status)
        if (layEvent == 'del') {

                lovexian.modal.confirm('删除统计信息', '确定删除这条统计设备记录吗？', function () {
                    lovexian.del(proPath + '/admin/DeviceStatistics/deleteById?id=' + obj.data.id, null, function () {
                        console.log("success");
                        lovexian.alert.success('删除成功');
                        $query.click();
                    });
                });
            }
    });

    /*    if (layEvent === 'edit') {
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
        }*/
//操作


/*    function deleteActions(alarmIds) {//操作组件之一，删除
        lovexian.del(proPath + '/admin/alarmInfo/BatchDelete/' + alarmIds, null, function () {
            console.log("success");
            lovexian.alert.success('删除选中报警信息');
            $query.click();
        });
    }*/


    function getQueryParams() {
        return {//根据find不同,调用不同的方法,其中dtuName对应queryDtuInfo,而status对应listByTypeId
        //sensorId: $searchForm.find('input[name="sensorId"]').val().trim(),//此处对应<input type="text" name="dtuName" autocomplete="off" class="layui-input">
            settingId: $searchForm.find('input[name="settingId"]').val(),
    };
    }

    $query.on('click',function () {
        var params = getQueryParams();
        //alert("ss");
        console.log(params);
        tableIns.reload({where: params});
    });

    $reset.on('click',function () {//重置
        $searchForm[0].reset();
        initTable();
    });


    //对外暴露的接口
    exports('theme/message/statisticsManage/statistics', {});
});