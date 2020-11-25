layui.define(['element','dropdown', 'baseSetting','admin','formSelects', 'view','validate','baseSetting','lovexian','jquery', 'laydate', 'form', 'table', 'treeSelect','laytpl'], function(exports){
    var $ = layui.jquery,
        admin = layui.admin,
        laydate = layui.laydate,
        setter = layui.setter,
        viewDtu = layui.view,
        $view = $('#lovexian-gateway'),//与html中id相同
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

    element.on('tab(gatewayInfoTable)',function (data) {
        var idvalue=data.index+1;//从0开始
        layui.data('id',{key:'gatewayTypeId',value:idvalue});
        // $searchForm.find('input[name="actTitle"]').val("");
        initTable();
    });

    //渲染权限
    var fakerData = ["faker"];
    var getTpl = actionMoreTpl.innerHTML
        ;view = document.getElementById('actionMoreContainer');
    laytpl(getTpl).render(fakerData, function (html) {
        view.innerHTML = html;
    });
    laydate.render({
        elem: '#createAt',
        range: true,
        trigger: 'click',
        position: 'fixed'
    });
    element.tabChange('gatewayTab',1);

    dropdown.render({//添加删除小组件
        elem: $view.find('.action-more'),
        click: function (name, elem, event) {
            var checkStatus = table.checkStatus('gatewayInfoTable');
            if (name === 'add') {
                addgatewayInfo("",0);
                //跳转到actionAdd页面
                // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/theme/life/actionAdd';
            }
            if (name === 'delete') {//批量删除
                if (!checkStatus.data.length) {
                    lovexian.alert.warn('请选择需要删除的网关信息');
                } else {
                    lovexian.modal.confirm('删除网关', '确定删除这些网关信息吗？', function () {
                        var gatewayIds = [];
                        layui.each(checkStatus.data, function (key, item) {
                            gatewayIds.push(item.id)
                        });
                        deleteActions(gatewayIds.join(','));
                    });
                }
            }

        },
        options: [{
            name: 'add',
            title: '添加网关信息',
            perms: 'gatewayInfo:add'
        }, {
            name: 'delete',
            title: '批量删除',
            perms: 'gatewayInfo:del'
        },
        ]
    });

    function addgatewayInfo(data,isEdit){
        // console.log(isEdit);
        lovexian.popup("theme/settings/gatewayManage/gatewayAdd",isEdit?"编辑网关":"添加网关信息",$.extend(data,{isEdit:isEdit}),function () {
                if(isEdit===1) {
                    layui.use('theme/settings/gatewayManage/gatewayAdd', layui.factory('theme/settings/gatewayManage/gatewayAdd'));
                    form.val("lawerForm",{
                        "id":data.id,
                        "gateId":data.gateId,
                        "longitude":data.longitude,
                        "latitude":data.latitude,
                        "descInfo":data.descInfo,
                        "status":data.status,
                        "elecCharge":data.elecCharge,
                        "serverIp":data.serverIp,
                        "serverPort":data.serverPort,
                        "createdAt":data.createdAt,
                        "updatedAt":data.updatedAt,
                        "disInfo":data.disInfo,
                    });
                    $('.thumbImg').attr("src",data.lawerHeadPhoto);

                } else{
                    layui.use('theme/settings/gatewayManage/gatewayAdd', layui.factory('theme/settings/gatewayManage/gatewayAdd'));

                }

            },
            function () {
                // $query.click();
            });
    }

    function initTable() {//初始化界面（下面的表格）
        tableIns = lovexian.table.init({
        elem: $('#gatewayInfoTable'),
        id: 'gatewayInfoTable',
        url: proPath + '/admin/gateways/listByTypeId?',//id根据组件而动，初始化表格
        type:'GET',
        headers:{
            Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
        },
        cols: [[
            {type: 'checkbox',fixed: 'lift'},
            {field: 'gateId', title: '网关标识 ', minWidth: 120,align:'center',fixed: 'lift'},//对应后台idea的字段
            {title: '网关状态', templet: '#check-state',minWidth:120,align:'center'},
            {title: '电量', templet: '#check-charge',minWidth:120,align:'center'},
            /*{field: 'elecCharge', title: '电量', minWidth:120,align:'center'},*/
            /*{field: 'longitude', title: '经度', minWidth:120,align:'center'},
            {field: 'latitude', title: '纬度', minWidth:180,align:'center'},*/
           /* {field: 'descInfo', title: '位置信息', minWidth:120,align:'center'},*/
            {field: 'serverIp', title: '服务器地址', minWidth: 120, sort: true,align:'center'},
            {field: 'serverPort', title: '服务器端口',minWidth: 180, sort: true,align:'center'},
            {field: 'createdAt', title: '部署时间', minWidth: 180, sort: true,align:'center'},
            {field: 'updatedAt', title: '最后更新时间',minWidth: 180, sort: true,align:'center'},
            {title: '操作', toolbar: '#action-option', minWidth: 120, fixed: 'right'}
        ]],
    });
}



   /* function gatewaydtuInfo(data,isEdit){//初始化界面
        var data3=window.gatewaydata;

        var data5 = data3.gateId;
        var data4= JSON.stringify(data3),
        tableIns = lovexian.table.init({
            elem: $('#gatewayInfoTable'),
            id: 'gatewayInfoTable',
            url: proPath + '/admin/gatewayDtu/gatewayDtu?gateId='+data5,//id根据组件而动，初始化表格
            type:'GET',
            headers:{
                Authentication :layui.data(setter.tableName)[setter.TOKENNAME]
            },
            cols: [[
                {type: 'checkbox',fixed: 'lift'},
                {field: 'gatewayId', title: '网关标识 ', minWidth: 120,align:'center',fixed: 'lift'},//对应后台idea的字段
                {field: 'dtuId', title: 'DTU标识', minWidth:130,align:'center'},
                {field: 'dtuName', title: 'DTU名称', minWidth:130,align:'center'},
                {field: 'dtuType', title: 'DTU类型', minWidth:130,align:'center'},
                {title: 'DTU状态', templet: '#check-state',minWidth:120,align:'center'},
                {field: 'createdAt', title: '部署时间', minWidth: 180, sort: true,align:'center'},
                {field: 'updatedAt', title: '最后更新时间',minWidth: 180, sort: true,align:'center'},
            ]],
        });
    }*/


    /*function  queryDtu(data,isEdit)
    {
        lovexian.popup("theme/settings/gatewayManage/queryDtu",isEdit?"编辑DTU信息":"添加律师",$.extend(data,{isEdit:isEdit}),function ()
        {  if(isEdit===1) {
            window.formData2=data;
            //alert(window.formData2.dtuId);
            layui.use('theme/settings/gatewayManage/queryDtu', layui.factory('theme/settings/gatewayManage/queryDtu/${data.dtuId}'));
            $('.thumbImg').attr("src",data.lawerHeadPhoto);
        } else{
            layui.use('theme/settings/gatewayManage/queryGatewayDtu/${data.dtuId}', layui.factory('theme/settings/gatewayManage/queryDtu/${data.dtuId}'));
        }
        },function () {
            // $query.click();
        });
    }*/

    table.on('tool(gatewayInfoTable)', function (obj) {
        var data = obj.data,
            layEvent = obj.event;
        window.gatewaydata = data;



        if (layEvent === 'del') {//删除景点信息
            //逻辑删除
            if(data.deleteState == '0'){
                lovexian.modal.confirm('删除网关信息', '确定删除这条网关记录吗？', function () {
                    lovexian.del(proPath + '/admin/gateways/deleteById?id='+ obj.data.id, null, function () {
                        console.log("success");
                        lovexian.alert.success('删除该网关成功');
                        $query.click();
                    });
                });
            //物理删除
            }else if(data.deleteState == '1'){
                lovexian.modal.confirm('彻底删除网关信息', '确定彻底删除这条网关记录吗？', function () {
                    lovexian.del(proPath + '/admin/gateways/completelyDelete?id='+ obj.data.id, null, function () {
                        console.log("success");
                        lovexian.alert.success('彻底删除该网关成功');
                        $query.click();
                    });
                });
            }
        }


        if (layEvent === 'edit') {
            //编辑也跳转到actionAdd，根据类型判断是添加还是编辑
            addgatewayInfo(obj.data,1);
        }

        if (layEvent === 'restore') {
            //还原
            lovexian.modal.confirm('还原网关信息', '确定还原这条网关记录吗？', function () {
                lovexian.post(proPath + '/admin/gateways/restoreById?id='+ obj.data.id, null, function () {
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

        if (layEvent == 'sel'){
            lovexian.get(proPath + "/admin/gatewayDtu/gatewayDtu",{"gateId":data.gateId},function (res) {
                if (res.status = '200'){
                    admin.popup({
                        id: 'LAY-theme-action-check',
                        area: ['400px','80%'],
                        shadeClose: 0,
                        title: 'DTU关联信息',
                        success:function () {
                            console.log(res.data.dtuName);
                            viewDtu(this.id).render('common/checkHistory',{
                                history: res.data.rows,
                            }).then(function () {
                                //视图文件请求完毕，试图内容渲染回顾
                            }).done(function () {
                                //视图文件请求完毕和内容渲染完毕的回顾
                            });
                        }
                    });
                }else {
                    lovexian.alert.error("获取关联DTU历史信息失败!");
                }
            });
        }

    });//操作





    function deleteActions(gatewayIds) {//操作组件之一，删除
        lovexian.del(proPath + '/admin/gateways/BatchDelete/' + gatewayIds, null, function () {
            console.log("success");
            lovexian.alert.success('删除选中网关');
            $query.click();
        });
    }

    function showContent(data){//操作组件之一，展示
        var ifr_document = document.getElementById("preview-html").contentWindow.document;
        if(ifr_document){
            //设置标题
            var title_str = data.lawerName;
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
    function getQueryParams() {
        return {
            pageSize: 10,
            pageNum: 1,
            gateId: $searchForm.find('input[name="gateId"]').val().trim(),
            status: $searchForm.find('select[name="status"]').val(),
            deleteState: $searchForm.find('select[name="deleteState"]').val(),
        };
    }

    $query.on('click',function () {
        var params = getQueryParams();
        console.log(params);
        tableIns.reload({where: params});
    });

    $reset.on('click',function () {//重置
        initTable();
    });


    //对外暴露的接口
    exports('theme/settings/gatewayManage/gateway', {});
});