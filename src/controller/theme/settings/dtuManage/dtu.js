layui.define(['element','dropdown', 'baseSetting','admin','formSelects', 'view','validate','baseSetting','lovexian','jquery', 'laydate', 'form', 'table', 'treeSelect','laytpl'], function(exports){
    var $ = layui.jquery,
        admin = layui.admin,
        laydate = layui.laydate,
        setter = layui.setter,
        $view = $('#lovexian-dtus'),//与对应html中id相同(html的第8行)
        laytpl = layui.laytpl,
        viewDtu = layui.view,
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
    element.tabChange('dtuTab',1);//需要修改的地方

    dropdown.render({//添加删除小组件
        elem: $view.find('.action-more'),
        click: function (name, elem, event) {
            var checkStatus = table.checkStatus('dtusTable');
            if (name === 'add') {
                addDtuInfo("",0);
                //跳转到actionAdd页面
                // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/theme/life/actionAdd';
            }
            if (name === 'delete') {//批量删除
                if (!checkStatus.data.length) {
                    lovexian.alert.warn('请选择需要删除的dtu信息');
                } else {
                    lovexian.modal.confirm('删除dtu', '确定删除这些dtu信息吗？', function () {
                        var dtuIds = [];
                        layui.each(checkStatus.data, function (key, item) {
                            dtuIds.push(item.id)
                        });
                        deleteActions(dtuIds.join(','));
                    });
                }
            }
        },
        options: [{
            name: 'add',
            title: '添加DTU信息',
            perms: 'dtuInfo:add'
        }, {
            name: 'delete',
            title: '批量删除',
            perms: 'dtuInfo:del'
        }]
    });

    function addDtuInfo(data,isEdit){
        // console.log(isEdit);
        lovexian.popup("theme/settings/dtuManage/dtuAdd",isEdit?"编辑DTU信息":"添加DTU",$.extend(data,{isEdit:isEdit}),function () {
                if(isEdit===1) {
                    window.formData3=data;
                    layui.use('theme/settings/dtuManage/dtuAdd', layui.factory('theme/settings/dtuManage/dtuAdd'));
                    form.val("lawerForm",{//此处显示修改时框内显示的内容.显示原来未修改时的信息
                        "dtuId":data.dtuId,
                        "sensorId":data.sensorId,
                        "dtuName":data.dtuName,
                        "longitude":data.longitude,
                        "latitude":data.latitude,
                        "descInfo":data.descInfo,
                        "dtuType":data.dtuType,
                        "elcVolume":data.elcVolume,
                        "status":data.status,
                        "disInfo":data.disInfo,
                        "delState":data.delState,
                    });
                    $('.thumbImg').attr("src",data.lawerHeadPhoto);

                } else{
                    layui.use('theme/settings/dtuManage/dtuAdd', layui.factory('theme/settings/dtuManage/dtuAdd'));

                }
            },
            function () {
                // $query.click();
            });
    }
    function  addSensors(data,isEdit)
    {
        lovexian.popup("theme/settings/dtuManage/sensorsAdd",isEdit?"编辑DTU信息":"添加律师",$.extend(data,{isEdit:isEdit}),function ()
        {  if(isEdit===1) {
            //alert("sdd");
            window.formData1=data;

            layui.use('theme/settings/dtuManage/sensorsAdd', layui.factory('theme/settings/dtuManage/sensorsAdd'));
            form.val("lawerForm",{//此处显示修改时框内显示的内容.显示原来未修改时的信息
                "dtuId":window.formData1.dtuId,
                "sensorId":data.sensorId,
            });
            $('.thumbImg').attr("src",data.lawerHeadPhoto);

        } else{
            layui.use('theme/settings/dtuManage/sensorsAdd', layui.factory('theme/settings/dtuManage/sensorsAdd'));

        }
        },function () {
            // $query.click();
        });
    }
    function  querySensors(data,isEdit)
    {


    }

    function initTable() {//初始化界面（下面的表格）
        tableIns = lovexian.table.init({
            elem: $('#dtusTable'),
            id: 'dtusTable',
            url: proPath + '/admin/dtus/listByTypeId?',//id根据组件而动，初始化表格
            type:'GET',
            headers:{
                Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
            },
            cols: [[
                {type: 'checkbox',fixed: 'lift'},
                {field: 'dtuName', title: 'DTU名 ', minWidth: 120,align:'center',fixed: 'lift'},//field对应后台idea的字段
                {field: 'dtuType', title: 'DTU类型', minWidth:130,align:'center'},
                {title: 'DTU状态', templet: '#check-state',minWidth:120,align:'center'},
                {title: '电量', templet: '#check-charge',minWidth:120,align:'center'},
                /*{field: 'elecCharge', title: '电量', minWidth:120,align:'center'},*/
                {field: 'batCapacity', title: '电池容量', minWidth:120,align:'center'},
                //{field: 'longitude', title: '经度', minWidth:120,align:'center'},
                //{field: 'latitude', title: '纬度', minWidth:120,align:'center'},
                //{field: 'descInfo', title: '位置信息', minWidth:120,align:'center'},
                {field: 'createdAt', title: '部署时间', minWidth: 180, sort: true,align:'center'},
                {field: 'updatedAt', title: '更新时间',minWidth: 180, sort: true,align:'center'},
                // {field: 'disInfo', title: 'dis信息',minWidth: 180, sort: true,align:'center'},
                {title: '操作', toolbar: '#action-option', minWidth: 120, fixed: 'right'}
            ]],
        });
    }







    //对下方的dtusTable(列表)的操作
    table.on('tool(dtusTable)', function (obj) {
        var data = obj.data,
            layEvent = obj.event;
        //window.getsensors = data

        if (layEvent === 'del') {//删除景点信息
//逻辑删除


                lovexian.modal.confirm('删除DTU信息', '确定删除这条DTU的记录吗？', function () {
                    lovexian.del(proPath + '/admin/dtus/deleteById?id='+ obj.data.id, null, function () {
                        console.log("success");
                        lovexian.alert.success('删除该dtu成功');
                        $query.click();
                    });
                });



        }
        if (layEvent === 'destroy') {//删除景点信息
//物理删除


            lovexian.modal.confirm('删除DTU信息', '确定删除这条DTU的记录吗？', function () {
                lovexian.del(proPath + '/admin/dtus/completelyDelete?id='+ obj.data.id, null, function () {
                    console.log("success");
                    lovexian.alert.success('彻底删除该dtu成功');
                    $query.click();
                });
            });
        }
        if (layEvent === 'restore') {
            //还原
            lovexian.modal.confirm('还原传感器信息', '确定还原这条传感器记录吗？', function () {
                lovexian.post(proPath + '/admin/dtus/restoreById?id='+ obj.data.id, null, function () {
                    console.log("success");
                    lovexian.alert.success('还原传感器信息成功');
                    $query.click();
                });
            });
        }
        if (layEvent === 'edit') {
            //编辑也跳转到actionAdd，根据类型判断是添加还是编辑
            addDtuInfo(obj.data,1);
        }
        if (layEvent === 'addSensors')
        {
            addSensors(obj.data,1);
        }
        if (layEvent === 'querySensors')
        {
            //alert(data.dtuId);

            lovexian.get(proPath + "/admin/dtuSensor/selectCheckList",{"dtuId":data.dtuId},function (res) {
                if (res.status = '200'){
                    admin.popup({
                        id: 'LAY-theme-action-check',
                        area: ['400px','80%'],
                        shadeClose: 0,
                        title: '传感器关联信息',
                        success:function () {
                            console.log(res.data.sensorId);
                            viewDtu(this.id).render('common/checkSensors',{
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
    });//操作


    function deleteActions(dtuIds) {//操作组件之一，批量删除
        lovexian.del(proPath + '/admin/dtus/BatchDelete/' + dtuIds, null, function () {
            console.log("success");
            lovexian.alert.success('删除选中dtu成功');
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
            var tickets=data.tickets;
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
            dtuName: $searchForm.find('input[name="dtuName"]').val().trim(),//此处对应<input type="text" name="dtuName" autocomplete="off" class="layui-input">
            status: $searchForm.find('select[name="status"]').val(),
            delState: $searchForm.find('select[name="delState"]').val(),//此处对应html里面的select框:<select name="status">
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
    exports('theme/settings/dtuManage/dtu', {});
});