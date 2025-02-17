layui.define(['jquery', 'laydate', 'form', 'table', 'lovexian', 'dropdown','laytpl'], function (exports) {
    var $ = layui.jquery,
        laydate = layui.laydate,
        lovexian = layui.lovexian,
        form = layui.form,
        table = layui.table,
        dropdown = layui.dropdown,
        $view = $('#lovexian-login-log'),
        $query = $view.find('#query'),
        $reset = $view.find('#reset'),
        $searchForm = $view.find('form'),
        laytpl = layui.laytpl,
        sortObject = {field: 'loginTime', type: null},
        tableIns;

    laydate.render({
        elem: '#createTime',
        range: true,
        trigger: 'click'
    });

    //渲染权限
    var fakerData = ["faker"];
    var getTpl = actionMoreTpl.innerHTML
        , view = document.getElementById('actionMoreContainer');
    laytpl(getTpl).render(fakerData, function (html) {
        view.innerHTML = html;
    });

    form.render();

    initTable();

    dropdown.render({
        elem: $view.find('.action-more'),
        click: function (name, elem, event) {
            if (name === 'delete') {
                var checkStatus = table.checkStatus('loginLogTable');
                if (!checkStatus.data.length) {
                    lovexian.alert.warn('请勾选需要删除的日志');
                } else {
                    lovexian.modal.confirm('删除日志', '确定删除所选日志？', function () {
                        var logIds = [];
                        layui.each(checkStatus.data, function (key, item) {
                            logIds.push(item.id)
                        });
                        deleteLogs(logIds.join(','))
                    });
                }
            }
            if (name === 'export') {
                var params = $.extend(getQueryParams(), {field: sortObject.field, order: sortObject.type});
                params.pageSize = $view.find(".layui-laypage-limits option:selected").val();
                params.pageNum = $view.find(".layui-laypage-em").next().html();
                lovexian.download(ctx + 'loginLog/excel', params, '登录日志表.xlsx');
            }
        },
        options: [ {
            name: 'delete',
            title: '删除日志',
            perms: 'loginlog:delete'
        }, {
            name: 'export',
            title: '导出Excel',
            perms: 'loginlog:export'
        }]
    });

    table.on('tool(loginLogTable)', function (obj) {
        var data = obj.data,
            layEvent = obj.event;
        if (layEvent === 'del') {
            lovexian.modal.confirm('删除日志', '确定删除该条登录日志？', function () {
                deleteLogs(data.id);
            });
        }
    });

    table.on('sort(loginLogTable)', function (obj) {
        sortObject = obj;
        tableIns.reload({
            initSort: obj,
            where: $.extend(getQueryParams(), {
                field: obj.field,
                order: obj.type
            })
        });
    });

    $query.on('click', function () {
        var params = $.extend(getQueryParams(), {field: sortObject.field, order: sortObject.type});
        tableIns.reload({where: params, page: {curr: 1}});
    });

    $reset.on('click', function () {
        $searchForm[0].reset();
        sortObject.type = 'null';
        tableIns.reload({where: getQueryParams(), page: {curr: 1}, initSort: sortObject});
    });

    function initTable() {
        tableIns = lovexian.table.init({
            elem: $view.find('table'),
            id: 'loginLogTable',
            url: ctx + 'loginLog/list',
            cols: [[
                {type: 'checkbox'},
                {field: 'username', title: '登录用户'},
                {field: 'ip', title: 'IP地址'},
                {field: 'location', title: '登录地点', minWidth: 180},
                {field: 'loginTime', title: '登录时间', minWidth: 180, sort: true},
                {field: 'system', title: '登录系统'},
                {field: 'browser', title: '浏览器'},
                {title: '操作', toolbar: '#login-log-option'}
            ]]
        });
    }

    function deleteLogs(logIds) {
        lovexian.get(ctx + 'loginLog/delete/' + logIds, null, function () {
            lovexian.alert.success('删除登录日志成功');
            $query.click();
        });
    }

    function getQueryParams() {
        var createTimeFrom,
            createTimeTo,
            createTime = $searchForm.find('input[name="createTime"]').val();
        if (createTime) {
            createTimeFrom = createTime.split(' - ')[0];
            createTimeTo = createTime.split(' - ')[1];
        }
        return {
            loginTimeFrom: createTimeFrom,
            loginTimeTo: createTimeTo,
            username: $searchForm.find('input[name="username"]').val().trim()
        };
    }

    //对外暴露的接口
    exports('monitor/loginLog', {});
})