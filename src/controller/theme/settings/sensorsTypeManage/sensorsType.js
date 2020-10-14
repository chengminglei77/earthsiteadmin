layui.define(['element','dropdown', 'baseSetting','admin','formSelects', 'view','validate','baseSetting','lovexian','jquery', 'laydate', 'form', 'table', 'treeSelect','laytpl'], function(exports){
    var $ = layui.jquery,
        admin = layui.admin,
        laydate = layui.laydate,
        setter = layui.setter,
        $view = $('#lovexian-sensorsType'),//与对应html中id相同(html的第8行)
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

    element.on('tab(sensorsTypeTable)',function (data) {
        var idvalue=data.index+1;//从0开始
        layui.data('id',{key:'sensorsTypeId',value:idvalue});
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
    element.tabChange('sensorTypeTab',1);//需要修改的地方

    dropdown.render({//添加删除小组件
        elem: $view.find('.action-more'),
        click: function (name, elem, event) {
            var checkStatus = table.checkStatus('sensorsTypeTable');
            if (name === 'add') {
                addSensorTypeInfo("",0);
            }
            if (name === 'delete') {//批量删除
                if (!checkStatus.data.length) {
                    lovexian.alert.warn('请选择需要删除的传感器类别的信息');
                } else {
                    lovexian.modal.confirm('删除传感器', '确定删除这些传感器信息吗？', function () {
                        var sensorsTypeIds = [];
                        layui.each(checkStatus.data, function (key, item) {
                            sensorsTypeIds.push(item.id)
                        });
                        deleteActions(sensorsTypeIds.join(','));
                    });
                }
            }
        },
        options: [{
            name: 'add',
            title: '添加传感器类型的信息',
            perms: 'sensorsTypeInfo:add'
        }, {
            name: 'delete',
            title: '批量删除',
            perms: 'sensorsTypeInfo:add'
        }]
    });

    function addSensorTypeInfo(data,isEdit){
        // console.log(isEdit);
        lovexian.popup("theme/settings/sensorsTypeManage/sensorsTypeAdd",isEdit?"编辑律师":"添加律师",$.extend(data,{isEdit:isEdit}),function () {
                if(isEdit===1) {
                    layui.use('theme/settings/sensorsTypeManage/sensorsTypeAdd', layui.factory('theme/settings/sensorsTypeManage/sensorsTypeAdd'));
                    form.val("lawerForm",{//此处显示修改时框内显示的内容.显示原来未修改时的信息
                        "id":data.id,
                        "sensorName":data.sensorName,
                        "sensorType":data.sensorType,
                        "sensorModel":data.sensorModel,
                        "sensorProducer":data.sensorProducer,
                        "sensorFrequency":data.sensorFrequency,
                        "sensorDesc":data.sensorDesc,
                    });
                    $('.thumbImg').attr("src",data.lawerHeadPhoto);
                } else{
                    layui.use('theme/settings/sensorsTypeManage/sensorsTypeAdd', layui.factory('theme/settings/sensorsTypeManage/sensorsTypeAdd'));
                }
            },
            function () {
                // $query.click();
            });
    }

    function initTable() {//初始化界面（下面的表格）
        tableIns = lovexian.table.init({
            elem: $('#sensorsTypeTable'),
            id: 'sensorsTypeTable',
            url: proPath + '/admin/sensorType/listByTypeId?',//id根据组件而动，初始化表格
            type:'GET',
            headers:{
                Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
            },
            cols: [[
                {type: 'checkbox',fixed: 'lift'},
                {field: 'sensorName', title: '传感器名', minWidth: 120,align:'center',fixed: 'lift'},//对应后台idea的字段
                //{field: 'sensorType', title: '传感器类别', minWidth:120,align:'center'},

                {field: 'sensorModel', title: '传感器型号', minWidth: 180,align:'center'},
                {field: 'sensorFrequency', title: '传感器采样频率', minWidth: 180,align:'center'},
                {field: 'sensorProducer', title: '生产厂家',minWidth: 180,align:'center'},
                {title: '操作', toolbar: '#action-option', minWidth: 120, fixed: 'right'}
            ]],
        });
    }







    //对下方的sensorsTypeTable(列表)的操作
table.on('tool(sensorsTypeTable)', function (obj) {
        var data = obj.data,
            layEvent = obj.event;

        if (layEvent === 'del') {//删除景点信息

            lovexian.modal.confirm('删除传感器信息', '确定删除这条传感器类型的记录吗？', function () {
                lovexian.del(proPath + '/admin/sensorType/deleteById?id=' + obj.data.id, null, function () {
                    console.log("success");
                    lovexian.alert.success('删除该传感器成功');
                    $query.click();
                });
            });
        }

        if (layEvent === 'edit') {
            //编辑也跳转到actionAdd，根据类型判断是添加还是编辑
            addSensorTypeInfo(obj.data,1);
        }
    if (layEvent === 'restore') {
        //还原
        lovexian.modal.confirm('还原传感器信息', '确定还原这条传感器记录吗？', function () {
            lovexian.post(proPath + '/admin/sensorType/restoreById?id='+ obj.data.id, null, function () {
                console.log("success");
                lovexian.alert.success('还原传感器信息成功');
                $query.click();
            });
        });
    }
    if (layEvent === 'destroy') {
        //彻底删除
        lovexian.modal.confirm('删除传感器信息', '确定彻底删除这条传感器的记录吗？', function () {
            lovexian.del(proPath + '/admin/sensorType/completelyDelete?id=' + obj.data.id, null, function () {
                console.log("success");
                lovexian.alert.success('彻底删除该传感器成功');
                $query.click();
            });
        });
    }
    });//操作


    function deleteActions(sensorsTypeIds) {//操作组件之一，批量删除
        lovexian.del(proPath + '/admin/sensorType/BatchDelete/' + sensorsTypeIds, null, function () {
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
            sensorName: $searchForm.find('input[name="sensorName"]').val().trim(),//此处对应<input type="text" name="dtuName" autocomplete="off" class="layui-input">
            sensorModel: $searchForm.find('input[name="sensorModel"]').val(),
            deleteState: $searchForm.find('select[name="delete_status"]').val(),
            //status: $searchForm.find("select[name='status']").val(),//此处对应html里面的select框:<select name="status">
        };
    }
    $query.on('click',function () {
        var params = getQueryParams();
        console.log(params);
        tableIns.reload({where: params});
    });
    $reset.on('click',function () {//刷新
        initTable();
    });




    //对外暴露的接口
    exports('theme/settings/sensorsTypeManage/sensorsType', {});
});