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

    element.on('tab(commandTab)',function (data) {
        var idvalue=data.index+1;//从0开始
        initTable();
    });
    element.tabChange('commandTab',"00");

    //渲染权限
    var fakerData = ["faker"];
    var view = document.getElementById('actionMoreContainer');
   /* laytpl(getTpl).render(fakerData, function (html) {
        view.innerHTML = html;
    });*/
    laydate.render({
        elem: '#sendTime',
        range: true,
        trigger: 'click',
        position: 'fixed'
    });

    function initTable() {
        // console.log($(".layui-tab-title .layui-this").attr("lay-id"));
        tableIns = lovexian.table.init({
            elem: $('#commandInfoTable' + $(".layui-tab-title .layui-this").attr("lay-id")),
            id: 'commandInfoTable' + $(".layui-tab-title .layui-this").attr("lay-id"),
            url: proPath + '/admin/commandInfo/listByTypeId?status='+$(".layui-tab-title .layui-this").attr("lay-id"),
            type: 'GET',
            headers: {
                Authentication: layui.data(setter.tableName)[setter.TOKENNAME]
            },
            cols: [[
                {field: 'command', title: '命令信息',minWidth: 120,align:'center',fixed: 'lift'},//对应后台idea的字段
                {title: '执行状态', templet: '#check-state',minWidth:120,align:'center'},
                {field: 'sendTime', title: '发送时间', minWidth:180,align:'center'},
                {field: 'receiveTime', title: '响应时间', minWidth: 120, sort: true,align:'center'},
                {field: 'description', title: '描述',minWidth: 180, sort: true,align:'center'},
            ]],
        });
    }

    function getQueryParams() {
        var sendTimeFrom='',
            sendTimeTo='',
            sendTime = $searchForm.find('input[name="sendTime"]').val();
        //alert(createTime);
        if (sendTime) {
            sendTimeFrom = sendTime.split(' - ')[0];
            sendTimeTo = sendTime.split(' - ')[1];
        }
        /*     alert(createTimeFrom);
             alert(createTimeTo);*/
        return {
            sendTimeFrom: sendTimeFrom,
            sendTimeTo: sendTimeTo,
            command: $searchForm.find('select[name="command"]').val(),
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
    exports('theme/command/commandManage/command', {});
});