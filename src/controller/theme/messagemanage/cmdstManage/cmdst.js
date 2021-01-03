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

    form.render();
    initTable();

    element.on('tab(cmdstatisticsTab)',function (data) {
        initTable();
    });
    element.tabChange('cmdstatisticsTab',"FS");

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
        console.log($(".layui-tab-title .layui-this").attr("lay-id"))
        tableIns = lovexian.table.init({
            elem: $('#cmdstatisticsTable' + $(".layui-tab-title .layui-this").attr("lay-id")),
            id: 'cmdstatisticsTable' + $(".layui-tab-title .layui-this").attr("lay-id"),
            url: proPath + '/admin/cmdstatistics/listByTypeId?settingID='+$(".layui-tab-title .layui-this").attr("lay-id"),
            type: 'GET',
            headers: {
                Authentication: layui.data(setter.tableName)[setter.TOKENNAME]
            },
            cols: [[
                {field: 'frameNum', title: '帧序号', minWidth: 100,align:'center',fixed: 'lift'},
                {field: 'settingID', title: '设备名', minWidth: 100,align:'center'},
                {field: 'data', title: '数据帧',minWidth: 250, sort: true,align:'center'},
                {field: 'colTime', title: '采集时间', minWidth:180,align:'center'},
            ]],
        });
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
    exports('theme/messagemanage/cmdstManage/cmdst', {});
});