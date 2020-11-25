layui.define(['element','dropdown', 'baseSetting','admin','formSelects', 'view','validate','baseSetting','lovexian','jquery', 'laydate', 'form', 'table', 'treeSelect','laytpl'], function(exports){
    var $ = layui.jquery,
        admin = layui.admin,
        laydate = layui.laydate,
        setter = layui.setter,
        $view = $('#lovexian-dispalyAll'),//与对应html中id相同(html的第8行)
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


    console.log("iframe");
    $(function () {
      addIframe();
    });
    function addIframe() {
      $('<iframe />');
      for (i=0;i<8;i++){
        $('<iframe />',{
          name:'frame'+i,id:'frame'+i,src:"http://123.57.94.242:3000/d-solo/y7Vpa9FMz/tu-yi-zhi?orgId=1&from=1603179999198&to=1603201599198&panelId=4"
        }).appendTo("#add");
      }

    }


    //对外暴露的接口
    exports('theme/dataDisplay/displayAll', {});
});