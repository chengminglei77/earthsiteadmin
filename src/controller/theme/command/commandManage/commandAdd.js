layui.define(['form', 'layer', 'admin', 'layedit', 'lovexian', 'laydate', 'upload', 'baseSetting', 'rate'], function (exports) {
  var form = layui.form,
      admin = layui.admin,
      layer = layui.layer,
      proPath = layui.baseSetting.LoveXianConfig.proApi,
      laypage = layui.laypage,
      lovexian = layui.lovexian,
      setter = layui.setter,
      upload = layui.upload,
      layedit = layui.layedit,
      laydate = layui.laydate,
      $ = layui.jquery;
  $ = layui.jquery,
      validate = layui.validate;
  //表单校验
  form.verify(validate);
  form.render();


  form.on('select(command)', function(data){
    // console.log(data);
    // console.log(data.elem); //得到select原始DOM对象
    // console.log(data.value); //得到被选中的值
    // console.log(data.othis); //得到美化后的DOM对象
      var command =data.value;
    console.log(command);
    // switch (command) {
    //   case 'A1':$("#sensorSerialNum").removeAttr("disabled");
    //   case 'A2':$("#sensorSerialNum").attr("disabled", true).addClass('layui-disabled');
    //             $("#sensorType").attr("disabled", true).addClass('layui-disabled');
    //             $("#sensorAddr").attr("disabled", true).addClass('layui-disabled');
    // }
    if(command=="A1"||command=="0")  {
      $("#sensorSerialNum").removeAttr("disabled");
      $("#sensorType").removeAttr("disabled");
      $("#sensorNum").removeAttr("disabled");
      $("#sensorAddr").removeAttr("disabled");
      $("#sensorTime").attr("disabled", true);

      }
    else if(command=="A2"||command == 'A5'||command == 'A7'||command=='A9'){
      $("#sensorSerialNum").attr("disabled", true).addClass('layui-disabled');
        $("#sensorType").attr("disabled", true);
      $("#sensorNum").attr("disabled", true).addClass('layui-disabled');
      $("#sensorAddr").attr("disabled", true).addClass('layui-disabled');
      $("#sensorTime").attr("disabled", true);

  }
    else if(command=='A3'){
      $("#sensorSerialNum").attr("disabled", true).addClass('layui-disabled');
      $("#sensorType").attr("disabled", true);
      $("#sensorAddr").attr("disabled", true).addClass('layui-disabled');
      $("#sensorTime").attr("disabled", true);
    }
    else if(command=='A4'){
      $("#sensorSerialNum").attr("disabled", true).addClass('layui-disabled');
      $("#sensorType").attr("disabled", true);
      $("#sensorNum").attr("disabled", true).addClass('layui-disabled');
      $("#sensorAddr").attr("disabled", true).addClass('layui-disabled');
    }



    form.render('select');
  });


  var CRC = {};

  CRC.CRC16 = function (bytes) {
    let crc = 0x0000; // initial value
    let polynomial = 0x8408;// poly value reversed 0x1021; 0x8408

    for (var i = 0; i < bytes.length; i++) {
      crc ^= (bytes[i] & 0x000000ff);
      for (j = 0; j < 8; j++) {
        if ((crc & 0x00000001) != 0) {
          crc >>= 1;
          crc ^= polynomial;
        } else {
          crc >>= 1;
        }
      }
    }

    // console.log(crc.toString(16));
    return (crc.toString(16));
  }


  function str_pad(hex){
    if (hex<10){
      return '0x'+'0'+hex;
    }
    else {
      return '0x'+hex;
    }
  }

  $(function () {
    $("#command").on('click',function () {
      console.log('A1')
    });
    $('#crc').on('click', function () {
      var command = $("#command").val();
      var deviceId = $("#deviceId").val();
      var sensorSerialNum = $("#sensorSerialNum").val();
      var sensorNum = $("#sensorNum").val();
      var sensorType = $("#sensorType").val();
      var sensorAddr = $("#sensorAddr").val();
      var sensorTime=$("#sensorTime").val();

      if (command=='A1'){
        var data=[Number(deviceId),Number(sensorSerialNum),Number(sensorType),Number(sensorAddr)];
        var data_len=data.length;
        var encrc=[0xAA,0x55,0x00,parseInt(("0x"+command)) ,data_len,Number(deviceId),Number(sensorSerialNum),Number(sensorType),Number(sensorAddr)];
        console.log("encrc1:",encrc);

        var crc=CRC.CRC16(encrc);
        console.log("crc:",crc);


        var cmd = ['0xAA55','0x00','0x'+command ,'0x0'+data_len,'0x0'+deviceId,'0x0'+Number(sensorSerialNum),'0x0'+Number(sensorType),'0x0'+Number(sensorAddr),'0x'+crc,'0x55AA'];
        $('#crcData').val(cmd);
      }
      else if (command=='A2'){
        var encrc2=[0xAA,0x55,0x00,parseInt(("0x"+command)) ,0x00,0x01,Number(deviceId)];
        console.log("encrc2:",encrc2);

        var crc=CRC.CRC16(encrc2);
        console.log("crc2:",crc);

        var cmd = ['0xAA55','0x00',("0x"+command) ,'0x0001','0x0'+Number(deviceId),'0x'+crc,'0x55AA'];
        $('#crcData').val(cmd);
      }
      else if (command=='A3') {
        var encrc3=[0xAA,0x55,0x00,parseInt(("0x"+command)) ,0x00,0x02,Number(deviceId),Number(sensorNum)];
        console.log("encrc3:",encrc3);

        var crc=CRC.CRC16(encrc3);
        console.log("crc3:",crc);

        var cmd = ['0xAA55','0x00',("0x"+command) ,'0x0002','0x0'+Number(deviceId),'0x0'+Number(sensorNum),'0x'+crc,'0x55AA'];
        $('#crcData').val(cmd);
      }
      else if (command=='A4'){

        var encrc4=['0xAA','0x55','0x00',parseInt(("0x"+command)) ,'0x00','0x03','0x'+Number(deviceId),'0x00','0x'+Number(sensorTime)];
        console.log("encrc4:",encrc4);

        var crc=CRC.CRC16(encrc4);
        console.log("crc4:",crc);

        var cmd = ['0xAA55','0x00',("0x"+command) ,'0x0003','0x0'+Number(deviceId),'0x00'+Number(sensorTime),'0x'+crc,'0x55AA'];
        $('#crcData').val(cmd);
      }
      else if (command=='A5'){

        var encrc5=[0xAA,0x55,0x00,parseInt(("0x"+command)) ,0x00,0x01,Number(deviceId)];
        console.log("encrc5:",encrc5);

        var crc=CRC.CRC16(encrc5);
        console.log("crc5:",crc);

        var cmd = ['0xAA55','0x00',("0x"+command) ,'0x0001','0x0'+Number(deviceId),'0x'+crc,'0x55AA'];
        $('#crcData').val(cmd);
      }
      else if (command=='A7'){
        var encrc7=[0xAA,0x55,0x00,parseInt(("0x"+command)) ,0x00,0x01,Number(deviceId)];
        console.log("encrc7:",encrc7);

        var crc=CRC.CRC16(encrc7);
        console.log("crc7:",crc);

        var cmd = ['0xAA55','0x00',("0x"+command) ,'0x0001','0x0'+Number(deviceId),'0x'+crc,'0x55AA'];
        $('#crcData').val(cmd);
      }
      else if (command=='A9'){
        var encrc9=[0xAA,0x55,0x00,parseInt(("0x"+command)) ,0x00,0x01,Number(deviceId)];
        console.log("encrc9:",encrc9);

        var crc=CRC.CRC16(encrc9);
        console.log("crc9:",crc);

        var cmd = ['0xAA55','0x00',("0x"+command) ,'0x0001','0x0'+Number(deviceId),'0x'+crc,'0x55AA'];
        $('#crcData').val(cmd);
      }




      // 测试(1)	设置上报数据的传感器类型和传感器地址：0xA1
      // var str=[0xAA,0x55,0x00,0xA1,0x04,0x01,0x02,0x01,0x04];
      // console.log(str);
      // var hex=CRC.CRC16(str);
      // console.log(hex);

      //测试（2）：获取当前上报数据的传感器类型和传感器地址以及传感器个数：0xA2
      // var str=[0xAA,0x55,0x00,0xA2,0x00,0x01,0x01];
      // console.log(str);
      // var hex=CRC.CRC16(str);
      // console.log(hex);

      //测试(3)	删除某个上报数据的传感器：0xA3
      // var str=[0xAA,0x55,0x00,0xA3,0x00,0x02,0x01,0x02];
      // console.log(str);
      // var hex=CRC.CRC16(str);
      // console.log(hex);

      //测试（4）：	设置传感器上报数据时间：0xA4
      var str=['0xAA','0x55','0x00','0xA4','0x00','0x03','0x01','0x00','0x30'];
      console.log(str);
      var hex=CRC.CRC16(str);
      console.log(hex);

      //测试（5）：获取传感器上报数据时间：0xA5
      // var str=[0xAA,0x55,0x00,0xA5,0x00,0x01,0x01];
      // console.log(str);
      // var hex=CRC.CRC16(str);
      // console.log(hex);

      //测试（7）：查询传感器数据指令：0xA7
      // var str=[0xAA,0x55,0x00,0xA7,0x00,0x01,0x01];
      // console.log(str);
      // var hex=CRC.CRC16(str);
      // console.log(hex);

      //测试(9)查询电量指令：0xA9
      // var str=[0xAA,0x55,0x00,0xA9,0x00,0x01,0x01];
      // console.log(str);
      // var hex=CRC.CRC16(str);
      // console.log(hex);
    });
  });


  var btn = document.getElementById("btn");
  $(function getValue() {
    var str = $("selectid option:selected").val();
    $('#btn').on('click', function () {
      $.ajax({
        type: "GET",
        url: "http://192.168.43.87:5000/command",
        data: {
          cmd: 12
        },
        dataType: "json",
        async: true,
        success: function (data) {
          /* alert("服务器返回的数据是"+data);
           var cmd=data.cmd;
           console.log(cmd);
           var cmdToHexadecimal=cmd.toString(16);
           console.log(cmdToHexadecimal);*/
        },
      });

    });
  });
  function getQueryParams() {
    return {//根据find不同,调用不同的方法,其中dtuName对应queryDtuInfo,而status对应listByTypeId
      deviceId: $searchForm.find('input[name="deviceId"]').val().trim(),//此处对应<input type="text" name="dtuName" autocomplete="off" class="layui-input">
      command: $searchForm.find('select[name="command"]').val(),//此处对应html里面的select框:<select name="status">
      sensorType: $searchForm.find('select[name="sensorType"]').val(),//此处对应html里面的select框:<select name="status">
      sensorSerialNum: $searchForm.find('input[name="sensorSerialNum"]').val().trim(),
      sensorNum: $searchForm.find('input[name="sensorNum"]').val().trim(),
      sensorAddr: $searchForm.find('input[name="sensorAddr"]').val().trim(),

    };
    // lovexian.popup("theme/messagemanage/commandManage/command");
  }


  form.on("submit(execute)", function (data) {

    var id = $("input[name='id']").val();     //input[name='id']是访问input对象id属性
    var command = $('.commandInfo').val();
    var description = $('.commandReason').val();
    // var dealtime = new Date(dealTime);
    //dtudata对象
    var commanddata = {
      id: id,
      command: command,
      description: description,
    };
    lovexian.post(proPath + '/admin/commandInfo/saveOrUpdate', commanddata, function () {//存入数据的路径
      lovexian.alert.success('执行成功');
      // $('#lovexian-job').find('#query').click();
    });
    layui.use('theme/command/commandManage/command', layui.factory('theme/command/commandManage/command'));
    layer.closeAll();
    return false;
  });

  form.on("submit(cancelBtn)", function (data) {

    alert(layui.formSelects.value('example6_3', 'val'));
    alert(layui.formSelects.value('example6_3', 'name'));
    layer.closeAll();
  });

  //国际版
  laydate.render({
    elem: '#test1-1'
    , type: 'datetime'
  });


  //对外暴露的接口
  exports('theme/command/commandManage/commandAdd', {});
});