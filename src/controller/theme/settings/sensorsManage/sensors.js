layui.define(['element','dropdown', 'baseSetting','admin','formSelects', 'view','validate','baseSetting','lovexian','jquery', 'laydate', 'form', 'table', 'treeSelect','laytpl'], function(exports){
    var $ = layui.jquery,
        admin = layui.admin,
        laydate = layui.laydate,
        setter = layui.setter,
        $view = $('#lovexian-sensorInfo'),//与对应html中id相同(html的第8行)
        laytpl = layui.laytpl,
        lovexian = layui.lovexian,
        dropdown = layui.dropdown,
        form = layui.form,
        viewDtu = layui.view,
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

    element.on('tab(sensorsTable)',function (data) {
        var idvalue=data.index+1;//从0开始
        layui.data('id',{key:'dtuTypeId',value:idvalue});
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
        elem: '#createdAt',
        range: true,
        trigger: 'click',
        position: 'fixed'
    });
    element.tabChange('sensorTab',1);//需要修改的地方

    dropdown.render({//添加删除小组件
        elem: $view.find('.action-more'),
        click: function (name, elem, event) {
            var checkStatus = table.checkStatus('sensorsTable');
            if (name === 'add') {
                addSensorInfo("",0);
            }
            if (name === 'delete') {//批量删除
                if (!checkStatus.data.length) {
                    lovexian.alert.warn('请选择需要删除的传感器信息');
                } else {
                    lovexian.modal.confirm('删除传感器', '确定删除这些传感器信息吗？', function () {
                        var sensorsIds = [];
                        layui.each(checkStatus.data, function (key, item) {
                            sensorsIds.push(item.id)
                        });
                        deleteActions(sensorsIds.join(','));
                    });
                }
            }
        },
        options: [{
            name: 'add',
            title: '添加传感器信息',
            perms: 'sensorsInfo:add'
        }, {
            name: 'delete',
            title: '批量删除',
            perms: 'sensorsInfo:del'
        }]
    });

    function addSensorInfo(data,isEdit){
        // console.log(isEdit);
        lovexian.popup("theme/settings/sensorsManage/sensorsAdd",isEdit?"编辑传感器信息":"添加传感器信息",$.extend(data,{isEdit:isEdit}),function () {
                if(isEdit===1) {
                    layui.use('theme/settings/sensorsManage/sensorsAdd', layui.factory('theme/settings/sensorsManage/sensorsAdd'));
                    form.val("lawerForm",{//此处显示修改时框内显示的内容.显示原来未修改时的信息
                        "id":data.id,
                        "sensorId":data.sensorId,
                        "typeId":data.typeId,
                        "longitude":data.longitude,
                        "latitude":data.latitude,
                        "status":data.status,
                        "disInfo":data.disInfo,
                    });
                    $('.thumbImg').attr("src",data.lawerHeadPhoto);
                } else{
                    layui.use('theme/settings/sensorsManage/sensorsAdd', layui.factory('theme/settings/sensorsManage/sensorsAdd'));
                }
            },
            function () {
                // $query.click();
            });
    }

    function initTable() {//初始化界面（下面的表格）
        tableIns = lovexian.table.init({
            elem: $('#sensorsTable'),
            id: 'sensorsTable',
            url: proPath + '/admin/sensors/listByTypeId?',//id根据组件而动，初始化表格
            type:'GET',
            headers:{
                Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
            },
            cols: [[
                {type: 'checkbox',fixed: 'lift'},
                {field: 'sensorId', title: '传感器型号', minWidth: 120},//对应后台idea的字段
                {field: 'typeId', title: '传感器类别', minWidth:120,align:'center'},
                {title: '传感器状态', templet: '#check-state',minWidth:120,align:'center'},
                {field: 'createdAt', title: '部署时间', minWidth: 180, sort: true,align:'center'},
                {field: 'updatedAt', title: '更新时间',minWidth: 180, sort: true,align:'center'},
                {field: 'sensorFrequency', title: '采集频率',minWidth: 180, sort: true,align:'center'},
                {title: '操作', toolbar: '#action-option', minWidth: 180, fixed: 'right'}
            ]],
        });
    }







    //对下方的sensorsTable(列表)的操作
    table.on('tool(sensorsTable)', function (obj) {
        var data = obj.data,
            layEvent = obj.event;

        if (layEvent === 'del') {//删除景点信息
            if(data.status == '0') {
                lovexian.modal.confirm('删除传感器信息', '确定删除这条传感器的记录吗？', function () {
                    lovexian.del(proPath + '/admin/sensors/deleteById?id=' + obj.data.id, null, function () {
                        console.log("success");
                        lovexian.alert.success('删除该传感器成功');
                        $query.click();
                    });
                });
            }
        else if(data.status == '1')
            {
                lovexian.modal.confirm('删除传感器信息', '确定删除这条传感器的记录吗？', function () {
                    lovexian.del(proPath + '/admin/sensors/deleteById?id=' + obj.data.id, null, function () {
                        console.log("success");
                        lovexian.alert.success('删除该传感器成功');
                        $query.click();
                    });
                });
            }
        }

        if (layEvent === 'edit') {
            //编辑也跳转到actionAdd，根据类型判断是添加还是编辑
            addSensorInfo(obj.data,1);
        }
        if (layEvent === 'restore') {
            //还原
            lovexian.modal.confirm('还原传感器信息', '确定还原这条传感器记录吗？', function () {
                lovexian.post(proPath + '/admin/sensors/restoreById?id='+ obj.data.id, null, function () {
                    console.log("success");
                    lovexian.alert.success('还原传感器信息成功');
                    $query.click();
                });
            });
        }
        if (layEvent === 'destroy') {
            //彻底删除
            lovexian.modal.confirm('删除传感器信息', '确定彻底删除这条传感器的记录吗？', function () {
                lovexian.del(proPath + '/admin/sensors/completelyDelete?id=' + obj.data.id, null, function () {
                    console.log("success");
                    lovexian.alert.success('彻底删除该传感器成功');
                    $query.click();
                });
            });
        }

        if (layEvent === 'queryDtu')
        {
            //alert(data.dtuId);

            lovexian.get(proPath + "/admin/dtuSensor/selectDtuInfo",{"sensorId":data.sensorId},function (res) {
                if (res.status = '200'){
                    admin.popup({
                        id: 'LAY-theme-action-check',
                        area: ['400px','80%'],
                        shadeClose: 0,
                        title: 'Dtu关联信息',
                        success:function () {
                            console.log(res.data.dtuName);
                            viewDtu(this.id).render('common/checkDtu',{
                                history: res.data.rows,
                            }).then(function () {
                                //视图文件请求完毕，试图内容渲染回顾
                            }).done(function () {
                                //视图文件请求完毕和内容渲染完毕的回顾
                            });
                        }
                    });
                }else {
                    lovexian.alert.error("获取关联传感器历史信息失败!");
                }
            });

        }

        if (layEvent == 'alarmInfo'){
            lovexian.get(proPath + "/admin/alarmInfo/sensorsAlarmInfoHistory",{"sensorId":data.sensorId},function (res) {
                if (res.status = '200'){
                    admin.popup({
                        id: 'LAY-theme-action-check',
                        area: ['400px','80%'],
                        shadeClose: 0,
                        title: '历史报警信息',
                        success:function () {
                            console.log(res.data.sensorId);
                            viewDtu(this.id).render('common/sensorsAlarmInfo',{
                                history: res.data,
                            }).then(function () {
                                //视图文件请求完毕，试图内容渲染回顾
                            }).done(function () {
                                //视图文件请求完毕和内容渲染完毕的回顾
                            });
                        }
                    });
                }else {
                    lovexian.alert.error("获取历史报警信息失败!");
                }
            });
        }
    });//操作




    function deleteActions(sensorsIds) {//操作组件之一，批量删除
        lovexian.del(proPath + '/admin/sensors/BatchDelete/' + sensorsIds, null, function () {
            console.log("success");
            lovexian.alert.success('删除选中传感器成功');
            $query.click();
        });
    }

    function showContent(data){//操作组件之一，展示
        var ifr_document = document.getElementById("preview-html").contentWindow.document;
        if(ifr_document){
            //设置标题
            var title_str = data.dtuName;
            var ifr_title = $(ifr_document).find(".article-title .title");
            ifr_title.html(title_str);
            //设置作者
            var author_str = data.creatorName;
            var ifr_author = $(ifr_document).find(".article-top .article-time");
            ifr_author.html(author_str);
            //设置正文
            var content_str = data.introduction;
            var tickets=data.tickets
            var ifr_content = $(ifr_document).find(".article-content");
            ifr_content.html("introduction:"+content_str+"</br>"+tickets);
            //设置图片
            var image_src = data.lawerHeadPhoto;
            var ifr_image = $(ifr_document).find(".img");
            ifr_image.html(image_src);
        }
    }
    function getQueryParams() {//trim():去除字符串的头尾空格,val():设置输入域的值,find()方法返回通过测试（函数内判断）的数组的第一个元素的值。
        return {//根据find不同,调用不同的方法,其中dtuName对应queryDtuInfo,而status对应listByTypeId
            //sensorId: $searchForm.find('input[name="sensorId"]').val().trim(),//此处对应<input type="text" name="dtuName" autocomplete="off" class="layui-input">
            typeId: $searchForm.find('select[name="typeId"]').val(),
            status: $searchForm.find('select[name="status"]').val(),//此处对应html里面的select框:<select name="status">
            deleteState: $searchForm.find('select[name="delete_status"]').val(),

        };
    }
    $query.on('click',function () {
        var params = getQueryParams();
        console.log(params);
        tableIns.reload({where: params});
    });
    $reset.on('click',function () {//刷新
        $searchForm[0].reset();
        initTable();
    });




    //对外暴露的接口
    exports('theme/settings/sensorsManage/sensors', {});
});
