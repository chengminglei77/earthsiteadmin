layui.define(['element','dropdown', 'baseSetting','admin','formSelects', 'view','validate','baseSetting','lovexian','jquery', 'laydate', 'form', 'table', 'treeSelect','laytpl'], function(exports){
    var $ = layui.jquery,
        admin = layui.admin,
        laydate = layui.laydate,
        setter = layui.setter,
        $view = $('#lovexian-dtuSensors'),//与对应html中id相同(html的第8行)
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
    $querySensors=$searchForm.find("div[name='querySensors']");
    var stars;

    form.render();
    initTable();
    var typeId=1;
    // layui.data('id',{key:'actionTypeId',value:1});
    // alert(layui.data('id').actionTypeId);

    element.on('tab(dtusTable)',function (data) {
        var idvalue=data.index+1;//从0开始
        layui.data('id',{key:'dtuTypeId',value:idvalue});
        // $searchForm.find('input[name="actTitle"]').val("");
        initTable();
    });

    //渲染权限
    var fakerData = ["faker"];
    var getTpl = actionMoreDtuTpl.innerHTML
        , view = document.getElementById('actionMoreContainer');
    laytpl(getTpl).render(fakerData, function (html) {
        view.innerHTML = html;
    });
    laydate.render({
        elem: '#createdAt',
        range: true,
        trigger: 'click',
        position: 'fixed'
    });
    element.tabChange('dtuSensorsTab',1);//需要修改的地方
    var data2=window.formData2;

    function initTable() {//初始化界面（下面的表格）
        tableIns = lovexian.table.init({
            elem: $('#dtuSensorsTab'),
            id: 'dtuSensorsTab',
            url: proPath + '/admin/dtuSensor/selectCheckList?',data2,//id根据组件而动，初始化表格
            type:'GET',
            headers:{
                Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
            },
            cols: [[
                //{type: 'checkbox',fixed: 'lift'},
                {field: 'dtuId', title: 'DTU的ID ',fixed: 'lift'},//field对应后台idea的字段
                //{field: 'dtuType', title: 'DTU类型', minWidth:130,align:'center'},
                //{title: 'DTU状态', templet: '#check-state',minWidth:120,align:'center'},
                //{field: 'longitude', title: '经度', minWidth:120,align:'center'},
                //{field: 'latitude', title: '纬度', minWidth:120,align:'center'},
                //{field: 'descInfo', title: '位置信息', minWidth:120,align:'center'},
                //{field: 'createdAt', title: '部署时间', minWidth: 180, sort: true,align:'center'},
                //{field: 'updatedAt', title: '更新时间',minWidth: 180, sort: true,align:'center'},
                // {field: 'disInfo', title: 'dis信息',minWidth: 180, sort: true,align:'center'},
                {field: 'sensorId',minWidth:130, title: '传感器ID '},
                {field: 'typeId', minWidth:130,title: '传感器类别 '},
                {field: 'dtuName',minWidth:130, title: 'dtu名字 '},
                {title: '操作', toolbar: '#action-option', minWidth: 120, fixed: 'right'}
            ]],

        });
    }








    $query.on('click',function () {
        var params = getQueryParams();
        console.log(params);
        tableIns.reload({where: params});
    });
    $reset.on('click',function () {//刷新
        initTable();
    });
    $querySensors.on('click',function () {//刷新
        initTable();
    });

    //对外暴露的接口
    exports('theme/settings/dtuManage/querySensors', {});
});