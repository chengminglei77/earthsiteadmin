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
      $ = layui.jquery,
      validate = layui.validate;
  //表单校验
  form.verify();
  form.render();
  form.on('select(command)', function(data){
    // console.log(data);
    // console.log(data.elem); //得到select原始DOM对象
    // console.log(data.value); //得到被选中的值
    // console.log(data.othis); //得到美化后的DOM对象
    const command = data.value;
    console.log(command);
  //   if(command=="A1"||command=="0")  {
  //     $("#sensorSerialNum").removeAttr("disabled");
  //     $("#sensorType").removeAttr("disabled");
  //     $("#sensorNum").removeAttr("disabled");
  //     $("#sensorAddr").removeAttr("disabled");
  //     $("#sensorTime").attr("disabled", true);
  //
  //     }
  //   else if(command=="A2"||command == 'A5'||command == 'A7'||command=='A9'){
  //     $("#sensorSerialNum").attr("disabled", true).addClass('layui-disabled');
  //     $("#sensorType").attr("disabled", true);
  //     $("#sensorNum").attr("disabled", true).addClass('layui-disabled');
  //     $("#sensorAddr").attr("disabled", true).addClass('layui-disabled');
  //     $("#sensorTime").attr("disabled", true);
  //
  // }
  //   else if(command=='A3'){
  //     $("#sensorSerialNum").attr("disabled", true).addClass('layui-disabled');
  //     $("#sensorType").attr("disabled", true);
  //     $("#sensorAddr").attr("disabled", true).addClass('layui-disabled');
  //     $("#sensorTime").attr("disabled", true);
  //   }
  //   else if(command=='A4'){
  //     $("#sensorSerialNum").attr("disabled", true).addClass('layui-disabled');
  //     $("#sensorType").attr("disabled", true);
  //     $("#sensorNum").attr("disabled", true).addClass('layui-disabled');
  //     $("#sensorAddr").attr("disabled", true).addClass('layui-disabled');
  //   }

    if(command==="A5"){
          $("#time").hide();
    }else if (command==="A4"){
      $("#time").show();
    }
    form.render('select');
  });

  var CRC = {};

  CRC.CRC16 = function (bytes) {
    let crc = 0x0000; // initial value
    let polynomial = 0x8408;// poly value reversed 0x1021; 0x8408

    for (var i = 0; i < bytes.length; i++) {
      crc ^= (bytes[i] & 0x000000ff);
      for (let j = 0; j < 8; j++) {
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

 $('#crc').click( function () {
      var command = $("#command").val();
      var deviceId = $("#deviceId").val();
      var sensorSerialNum = $("#sensorSerialNum").val();
      var sensorNum = $("#sensorNum").val();
      var sensorType = $("#sensorType").val();
      var sensorAddr = $("#sensorAddr").val();
      var sensorTime = $("#sensorTime").val();

      if(command==='0'){
          layer.msg('必填项不能为空');
      }else{
          if (command==='A4'){
              if(deviceId==='0'||sensorTime==='0'){
                  layer.msg('必填项不能为空');
              }else {
                  var frameNum = '00';
                  var data = ['0xAA','0x55','0x'+frameNum,'0xA4','0x00','0x03','0x'+deviceId.toString(),'0x00','0x'+sensorTime.toString()];
                  var crc = CRC.CRC16(data);
                  var cmd = 'AA55'+frameNum + command+'0003'+deviceId.toString()+'00'+sensorTime.toString()+crc.toUpperCase()+'55AA';

                  $('#crcData').val(cmd);
              }
          }else if (command==='A5'){
              if(deviceId==='0'){
                  layer.msg('必填项不能为空');
              }else {
                  var data = ['0xAA','0x55','0x00','0xA5','0x00','0x01','0x'+deviceId.toString()];
                  var crc = CRC.CRC16(data);
                  var cmd = 'AA5500'+command+'0001'+deviceId.toString()+crc.toUpperCase()+'55AA';

                  $('#crcData').val(cmd);
              }
          }
      }
    });

  $('#sendMessageBtn').on('click', function () {
    var at = $("#sendMessage").val();
    var ascii;
    switch (at) {
      case 'AT':ascii=4154+'0D0A';break;
      case 'ATT':ascii=415454+'0D0A';break;
      case 'ATI':ascii=415449+'0D0A';break;
      case '+++':ascii='2B2B2B';break;
    }
    console.log(ascii);
    // $.ajax({
    //   type:"post",
    //   url:"http://39.105.171.192:9090/admin/gatewaysConfig/setGatewayConfig",
    //   data: {
    //     at:at,
    //     ascii:ascii,
    //   },
    //   async: true,
    //   dataType: 'json',
    //   success: function (msg) {
    //     // alert("msg="+msg.data);
    //     $('#receiveMessage').val(msg.data);
    //   },
    // });
    console.log(sendMessage);
    //   lovexian.post(proPath + '/admin/gatewaysConfig/setGatewayConfig',sendData,function () {//存入数据的路径
    //     lovexian.alert.success('发送成功');
    //
    //   });
  });
 $('#clearMessageBtn').on('click',function () {
   $('#sendMessage').val("");
   form.render();
 });
  $('#clearMessageBtn2').on('click',function () {
    $('#receiveMessage').val("");
    form.render();
  });

  // form.on("submit(sendMessageBtn)",function(data){
  //
  //   var at = $("input[name='sendMessageBtn']").val();     //input[name='id']是访问input对象id属性
  //   var ascii;
  //   switch (at) {
  //     case 'AT':ascii=4154;break;
  //     case 'ATT':ascii=415454;break;
  //     case 'ATI':ascii=415449;break;
  //   }
  //   console.log(at);
  //   //dtudata对象
  //   var senddata = {
  //     at:at,
  //     ascii:ascii,
  //   };
  //
  //   lovexian.post(proPath + '/admin/alarmInfo/saveOrUpdate',alarmdata,function () {//存入数据的路径
  //     lovexian.alert.success('保存成功');
  //     // $('#lovexian-job').find('#query').click();
  //   });
  //   layer.closeAll();
  //   return false;
  // });
    $('#commandSent').click(function () {
        let crcData = $('#crcData').val();
        if (crcData!='') {
            alert('您要发送的命令是：'+ $('#crcData').val());
            $.get('http://101.34.99.176:8886/command?cmd='+crcData , function () {
                    lovexian.alert.success('发送成功');
                }
            )

            var type = $("#command").val();
            var description = $('.commandReason').val();
            var deviceId = $("#deviceId").val();
            console.log(description)
            var commandData = {
                command: crcData,
                description: description,
                time:new Date(),
                type:type,
                deviceID: deviceId
            };
            lovexian.post(proPath + '/admin/commandInfo/saveOrUpdate',commandData,function () {//存入数据的路径
                lovexian.alert.success('命令已发送，结果请至命令历史中查看');
            });
        }else {
            lovexian.alert.warn('未填写发送数据');
        }
    });

  function showCmd(cmd1){
    console.log(cmd1);
    var str=cmd1[0];
    $('#btn').on('click',function () {
      $.ajax({
        type: "post",
        // url: "http://39.105.171.192:8886/command?cmd="+str,
        data: {
          // cmd: str
        },
        dataType: "json",
        async: true,
        success: function (data) {
          console.log("cmd1="+cmd);
          /* alert("服务器返回的数据是"+data);
           var cmd=data.cmd;
           console.log(cmd);
           var cmdToHexadecimal=cmd.toString(16);
           console.log(cmdToHexadecimal);*/
        },
      });
      var description = $('.commandReason').val();
      var commanddata = {
            command: str,
            description: description,
          };
      lovexian.post(proPath + '/admin/commandInfo/saveOrUpdate',commanddata,function () {//存入数据的路径
        lovexian.alert.success('保存成功');
        // $('#lovexian-job').find('#query').click();
      });
    })
  }

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
