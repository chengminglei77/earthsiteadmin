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


  // $("#command").on("change",function () {
  //     if ($('#command option:selected').val()=="A1"){
  //       $('#sensorNum').hide();
  //     }
  // })


//CRC-16MODEBUS校验代码

  var CRC = {};

  // CRC.CRC16 = function (data) {
  //   var len = data.length;
  //   if (len > 0) {
  //     var crc = 0xFFFF;
  //
  //     for (var i = 0; i < len; i++) {
  //       crc = (crc ^ (data[i]));
  //       for (var j = 0; j < 8; j++) {
  //         crc = (crc & 1) != 0 ? ((crc >> 1) ^ 0xA001) : (crc >> 1);
  //       }
  //     }
  //     var hi = ((crc & 0xFF00) >> 8);  //高位置
  //     var lo = (crc & 0x00FF);         //低位置
  //
  //     return [hi, lo];
  //   }
  //   return [0, 0];
  // };
  //
  // CRC.isArray = function (arr) {
  //   return Object.prototype.toString.call(arr) === '[object Array]';
  // };
  //
  // CRC.ToCRC16 = function (str, isReverse) {
  //   return CRC.toString(CRC.CRC16(CRC.isArray(str) ? str : CRC.strToByte(str)), isReverse);
  // };
  //
  // CRC.ToModbusCRC16 = function (str, isReverse) {
  //   return CRC.toString(CRC.CRC16(CRC.isArray(str) ? str : CRC.strToHex(str)), isReverse);
  // };
  //
  // CRC.strToByte = function (str) {
  //   var tmp = str.split(''), arr = [];
  //   for (var i = 0, c = tmp.length; i < c; i++) {
  //     var j = encodeURI(tmp[i]);
  //     if (j.length == 1) {
  //       arr.push(j.charCodeAt());
  //     } else {
  //       var b = j.split('%');
  //       for (var m = 1; m < b.length; m++) {
  //         arr.push(parseInt('0x' + b[m]));
  //       }
  //     }
  //   }
  //   return arr;
  // };
  //
  // CRC.convertChinese = function (str) {
  //   var tmp = str.split(''), arr = [];
  //   for (var i = 0, c = tmp.length; i < c; i++) {
  //     var s = tmp[i].charCodeAt();
  //     if (s <= 0 || s >= 127) {
  //       arr.push(s.toString(16));
  //     }
  //     else {
  //       arr.push(tmp[i]);
  //     }
  //   }
  //   return arr;
  // };
  //
  // CRC.filterChinese = function (str) {
  //   var tmp = str.split(''), arr = [];
  //   for (var i = 0, c = tmp.length; i < c; i++) {
  //     var s = tmp[i].charCodeAt();
  //     if (s > 0 && s < 127) {
  //       arr.push(tmp[i]);
  //     }
  //   }
  //   return arr;
  // };

  // CRC.strToHex = function (hex, isFilterChinese) {
  //   hex = isFilterChinese ? CRC.filterChinese(hex).join('') : CRC.convertChinese(hex).join('');
  //
  //   //清除所有空格
  //   hex = hex.replace(/\s/g, "");
  //   //若字符个数为奇数，补一个0
  //   hex += hex.length % 2 != 0 ? "0" : "";
  //
  //   var c = hex.length / 2, arr = [];
  //   for (var i = 0; i < c; i++) {
  //     arr.push(parseInt(hex.substr(i * 2, 2), 16));
  //   }
  //   return arr;
  // };

  // CRC.padLeft = function (s, w, pc) {
  //   if (pc == undefined) {
  //     pc = '0';
  //   }
  //   for (var i = 0, c = w - s.length; i < c; i++) {
  //     s = pc + s;
  //   }
  //   return s;
  // };
  //
  // CRC.toString = function (arr, isReverse) {
  //   if (typeof isReverse == 'undefined') {
  //     isReverse = true;
  //   }
  //   var hi = arr[0], lo = arr[1];
  //   return CRC.padLeft((isReverse ? hi + lo * 0x100 : hi * 0x100 + lo).toString(16).toUpperCase(), 4, '0');
  // };



  CRC.CRC16 = function (bytes) {
    let crc = 0x0000; // initial value
    let polynomial = 0x1021;// poly value reversed 0x1021; 0x8408

    let i, j;
    for (i = 0; i < bytes.length; i++) {
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
    return crc;
  };


  CRC.stringToBytes =function ( str ) {

    var result = [];
    var list = str.split("");
    for(var i=0;i<list.length;i++){
      // if(i != 0){
      //   //加空格，分割二进制
      //   result.push(" ");
      // }
      var item = list[i];

      //将字符串转化为10进制数据
      var binaryStr = item.toString(16);
      var res1=str_pad(binaryStr);
      result.push(res1);

    }
    console.log(result);
    return result.join("");
  };

  // var num = 444;
  //
  // var hex_num = num.toString(16);
  // console.log(hex_num);
  function str_pad(hex){
    var zero = '00';
    var tmp  = 2-hex.length;
    return '0x' + zero.substr(0,tmp) + hex;
  }

  $(function () {
    $('#crc').on('click', function () {
      var command = $("#command").val();
      var deviceId = $("#deviceId").val();
      var sensorSerialNum = $("#sensorSerialNum").val();
      var sensorNum = $("#sensorNum").val();
      var sensorType = $("#sensorType").val();
      var sensorAddr = $("#sensorAddr").val();

      var num='12345678';
      var bytes = [];
      bytes = CRC.stringToBytes(num);
      console.log(bytes);

      // var change=bytes.toString(16);
      // console.log(change);
      var hex=CRC.CRC16(bytes);
      alert(hex.toString(16));

      // alert(CRC.CRC16('12345678',false));

      // alert(CRC.ToCRC16('AA5501A4000302000A', true));
      // alert(CRC.ToCRC16('AA5501A4000302000A', false));
      // alert(command + deviceId + sensorSerialNum + sensorNum + sensorType + sensorAddr);
      var crc=CRC.CRC16(command + deviceId + sensorSerialNum + sensorNum + sensorType + sensorAddr, false);
      // alert(crc);
      var cmd = "AA55" + command + deviceId + sensorSerialNum + sensorNum + sensorType + sensorAddr + crc + "55AA";
      $('#crcData').val(cmd);
      // alert(cmd);
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