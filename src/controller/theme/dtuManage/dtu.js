layui.define(['element','dropdown', 'baseSetting','admin','formSelects', 'view','validate','baseSetting','lovexian','jquery', 'laydate', 'form', 'table', 'treeSelect','laytpl'], function(exports){
    var $ = layui.jquery,
        admin = layui.admin,
        laydate = layui.laydate,
        setter = layui.setter,
        $view = $('#lovexian-dtus'),//与对应html中id相同(html的第8行)
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

    element.on('tab(dtusTable)',function (data) {
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
    element.tabChange('dtuTab',1);//需要修改的地方

    dropdown.render({//添加删除小组件
        elem: $view.find('.action-more'),
        click: function (name, elem, event) {
            var checkStatus = table.checkStatus('dtuTab');
            if (name === 'add') {
                addLawerInfo("",0);
                //跳转到actionAdd页面
                // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/theme/life/actionAdd';
            }
            if (name === 'delete') {//批量删除
                if (!checkStatus.data.length) {
                    lovexian.alert.warn('请选择需要删除的律师信息');
                } else {
                    lovexian.modal.confirm('删除律师', '确定删除这些律师信息吗？', function () {
                        var lawerIds = [];
                        layui.each(checkStatus.data, function (key, item) {
                            lawerIds.push(item.id)
                        });
                        deleteActions(lawerIds.join(','));
                    });
                }
            }

        },
        options: [{
            name: 'add',
            title: '添加律师信息',
            perms: 'add:lawerInfo'
        }, {
            name: 'delete',
            title: '批量删除',
            perms: 'del:lawerInfo'
        }]
    });
    function clearFormData() {
        $(".lawerName").val("");
        $(".lawerOrganization").val("");
        $(".telNumber").val("");
        $(".skillField").val("");
        $(".workTime").val("");
        $(".lawerAbstract").val("");
        $(".keywords").val("");
        // $(".thumbImg").val("");
        $(".others").val("");
        $(".thumbImg").attr('src',"");
        $(".star").val("");
    }
    function addLawerInfo(data,isEdit){
        // console.log(isEdit);
        lovexian.popup("theme/dtuManage/dtuAdd",isEdit?"编辑律师":"添加律师",$.extend(data,{isEdit:isEdit}),function () {
                if(isEdit===1) {
                    layui.use('theme/dtuManage/dtuAdd', layui.factory('theme/dtuManage/dtuAdd'));
                    form.val("lawerForm",{//此处显示修改时框内显示的内容.显示原来未修改时的信息
                        "dtuName":data.dtuName,
                        "dtuId":data.dtuId,
                        "dtuType":data.dtuType,
                        "status":data.status,
                        "disInfo":data.disInfo,
                    });
                    $('.thumbImg').attr("src",data.lawerHeadPhoto);

                } else{
                    layui.use('theme/dtuManage/dtuAdd', layui.factory('theme/dtuManage/dtuAdd'));

                }

            },
            function () {
                // $query.click();
            });
    }
    /*  function addLawerInfo2(data,isEdit){//新增数据页面
          var width = $(window).width() - $("#my-side").width()+'px';
          var height = $(window).height() - $("#my-header").height()+'px';
          var edit = isEdit;


          var index = layui.layer.open({
              title : "律师信息",
              type : 1,
              skin:"layui-layer-admin-page",
              offset: 'rb',
              area :[width,height],
              content : "theme/life/lawerAdd",
              shade : false,
              resize:false,
              anim: 2,
              success : function(layero, index){
                  if(isEdit===1)
                  {
                      console.log(data)
                      layui.use('rate', function(){
                          var rate = layui.rate;
                          //渲染
                          var ins1 = rate.render({
                              elem: '#test2',  //绑定元素,
                              length: 5,
                              value: data.star
                              ,text: true //开启文本
                              ,choose: function(value){
                                  stars = value;
                              }
                          });
                      });
                      form.val("lawerForm",{
                          'id':data.id,
                          "lawerName":data.lawerName,
                          "lawerOrganization":data.lawerOrganization,
                          "telNumber":data.telNumber,
                          "skillField":data.skillField,
                     /!*     "workTime":data.workTime,*!/
                          "lawerAbstract":data.lawerAbstract,
                          "keywords":data.keywords,
                          "stars":data.stars,

                      });
                      $('.thumbImg').attr("src",data.lawerHeadPhoto);
  /!*                    var strings = data.star.toString().split("星");
                      star = parseInt(strings[0]);*!/


                  }
                  else{
                      stars=0;
                      layui.use('rate', function(){
                          var rate = layui.rate;
                          //渲染
                          var ins1 = rate.render({
                              elem: '#test2',  //绑定元素,
                              length: 5
                              ,text: true //开启文本
                              ,value: stars
                              ,choose: function(value){
                                  stars = value;
                              }
                          });
                      });
                  }
              },
              end:function (layero, index) {
                  clearFormData();
                  initTable();
              },
          })
      }*/
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
                {field: 'dtuName', title: 'dtu名 ', minWidth: 120,align:'center',fixed: 'lift'},//field对应后台idea的字段
                {field: 'dtuType', title: 'dtu类型', minWidth:120,align:'center'},
                {field: 'status', title: 'dtu状态', minWidth:180,align:'center'},
                {field: 'createdAt', title: '创建时间', minWidth: 180, sort: true,align:'center'},
                {field: 'updatedAt', title: '更新时间',minWidth: 180, sort: true,align:'center'},
                {field: 'disInfo', title: 'dis信息',minWidth: 180, sort: true,align:'center'},
                {title: '操作', toolbar: '#action-option', minWidth: 120, fixed: 'right'}
            ]],
        });
    }

    table.on('tool(dtusTable)', function (obj) {
        var data = obj.data,
            layEvent = obj.event;
        var type
        if(obj.event === 'showImage'){
            layer.open({
                type: 1
                ,id:'dtusTable'+type
                ,btn: '关闭'
                ,btnAlign: 'c' //按钮居中
                ,shade: 0 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });
        }
        if (layEvent === 'detail') {//三大组件之detail,要修改
            showContent(data);
            pre_layer.show();
            resetPrePhoneCss();
            pre_bg.on("click",function(){
                pre_layer.hide();
            });
            //预览图片居中样式
            var css_str = {};
            var pos_left = 0;
            var pos_top = 0;
            $(window).resize(resetPrePhoneCss);
            //重置预览手机页面的CSS
            function resetPrePhoneCss(){
                pos_left = $(window).width() / 2 - pre_phone.width() / 2;
                pos_top = $(window).height() / 2 - pre_phone.height() / 2+25;
                css_str = {
                    left:pos_left + "px",
                    top:pos_top + "px"
                }
                pre_phone.css(css_str);
            }
        }
        if (layEvent === 'del') {//删除景点信息
            lovexian.modal.confirm('删除dtu信息', '确定删除这条dtu的记录吗？', function () {
                lovexian.del(proPath + '/admin/dtus/deleteById?id='+ obj.data.id, null, function () {
                    console.log("success");
                    lovexian.alert.success('删除该dtu成功');
                    $query.click();
                });
            });
        }
        if (layEvent === 'edit') {
            //编辑也跳转到actionAdd，根据类型判断是添加还是编辑
            addLawerInfo(obj.data,1);
        }
    });//操作


    function deleteActions(lawerIds) {//操作组件之一，批量删除
        lovexian.del(proPath + '/admin/lawerInfo/BatchDelete/' + lawerIds, null, function () {
            console.log("success");
            lovexian.alert.success('删除文章成功');
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
    function getQueryParams() {
        var createdAt = $searchForm.find('input[name="createdAt"]').val();
        return {
            dtuName: $searchForm.find('input[name="dtuName"]').val().trim(),
            status: $searchForm.find("select[name='status']").val(),
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

    //置顶状态的请求
    form.on('switch(isTop)',function(data){
        var id=$(data.elem).val();
        var text = data.elem.checked ? '置顶':'不置顶';
        layer.confirm("您正在【"+text+"】该信息，您确定吗？",{icon: 3, title:'提示'}, function (index) {
            lovexian.post(proPath+"/admin/lawerInfo/updateLawer",{"isTop":text==='置顶'? 1:0,"id":id},function(res){
                if(res.code == 200){
                    layer.alert('【'+text+'】成功^_^', {
                        icon: 1,
                        skin: 'layui-layer-molv'
                    });
                }else{
                    layer.alert('【'+text+'】失败~_~', {
                        icon: 2,
                        skin: 'layui-layer-hong'
                    });
                    if(text === '置顶')
                        data.elem.checked = true;
                    else
                        data.elem.checked = false;
                }
                form.render();
            });
            layer.close(index);
        });
    });

    //展示状态的请求
    form.on('switch(isShow)',function(data){
        var id=$(data.elem).val();
        var text = data.elem.checked ? '展示':'不展示';
        layer.confirm("您正在【"+text+"】该信息，您确定吗？",{icon: 3, title:'提示'}, function (index) {
            lovexian.post(proPath+"/admin/lawerInfo/updateLawer",{"isShow":text==='展示'? 1:0,"id":id},function(res){
                if(res.code == 200){
                    layer.alert('【'+text+'】成功^_^', {
                        icon: 1,
                        skin: 'layui-layer-molv'
                    });
                }else{
                    layer.alert('【'+text+'】失败~_~', {
                        icon: 2,
                        skin: 'layui-layer-hong'
                    });
                    if(text === '展示')
                        data.elem.checked = true;
                    else
                        data.elem.checked = false;
                }
                form.render();
            });
            layer.close(index);
        });
    });



    //对外暴露的接口
    exports('theme/dtuManage/dtu', {});
});