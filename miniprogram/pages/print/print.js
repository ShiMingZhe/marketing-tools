// pages/print/print.js
var app = getApp();
var deviceId;
var i = 0;
var serviceId = [];
var characteristicId = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bluetoothDevices:[]
  },
  /**搜索蓝牙设备 */
  search: function() {
    var that = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log(res, "success");
        wx.getBluetoothDevices({//获取蓝牙设备
          success: function (res) {
            console.log(res)
            that.setData({
              bluetoothDevices:res.devices
            });
            /*console.log(res)
            i = 0;
            while (res.devices[i]) {
              console.log(i);
              console.log(res.devices[i].name, res.devices[i].deviceId);
              if (res.devices[i].name == 'YahBoom_BL') {
                deviceId = res.devices[i].deviceId;
                console.log(deviceId);
              }
              i++;
            }*/
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '请打开蓝牙',
          duration:2000
        })
        console.log(res, "fail");
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.onBluetoothAdapterStateChange(function(res){
      console.log('adapterState changed, now is', res);
    })
  },
  /**打开适配器 */
  openAdapter:function() {
    wx.openBluetoothAdapter({
      success: function(res) {// 开始搜索
        wx.startBluetoothDevicesDiscovery({
          services: [],
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res, "fail")
          },
        })
        console.log(res,"success");
      },
      fail: function(res) {
        console.log(res, "fail");
      }
    })
  },
  /**关闭适配器 */
  closeAdapter:function() {
    wx.closeBluetoothAdapter({
      success: function(res) {
        console.log(res,"success")
      },
      fail:function(res) {
        console.log(res,"fail");
      }
    })
  },
  opendiscovery: function () {
    wx.startBluetoothDevicesDiscovery({
      services: [],
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res, "fail")
      },
    })
  },

  closediscovery: function () {
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res, "fail")
      },
    })
  },

  getdevice: function () {
    function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )
      return hexArr.join('');
    }
    wx.getBluetoothDevices({
      success: function (res) {
        console.log(res)
        i = 0;
        while (res.devices[i]) {
          console.log(i);
          console.log(res.devices[i].name, res.devices[i].deviceId);
          if (res.devices[i].name == 'YahBoom_BL') {
            deviceId = res.devices[i].deviceId;
            console.log(deviceId);
          }
          i++;
        }
      }
    })
  },
  getconnecteddevice: function () {
    wx.getConnectedBluetoothDevices({
      //services:[],
      success: function (res) {
        console.log(res)
      }
    })
  },
  connecteddevice: function () {
    wx.createBLEConnection({
      deviceId: deviceId,
      success: function (res) {
        console.log(res);
      },
    })
  },
  getservice: function () {
    wx.getBLEDeviceServices({
      deviceId: deviceId,
      success: function (res) {
        console.log(res.services);
        i = 0;
        while (res.services[i]) {
          serviceId[i] = res.services[i].uuid;
          console.log(serviceId[i]);
          i++;
        }
      },
    })
  },
  getcharacteristics: function () {
    wx.getBLEDeviceCharacteristics({
      deviceId: deviceId,
      serviceId: serviceId[0],
      success: function (res) {
        console.log('device getBLEDeviceCharacteristics:', res.characteristics)
      }
    })
    wx.getBLEDeviceCharacteristics({
      deviceId: deviceId,
      serviceId: serviceId[1],
      success: function (res) {
        i = 0;
        while (res.characteristics[i]) {
          characteristicId[i] = res.characteristics[i].uuid;
          console.log(characteristicId[i]);
          i++;
        }
      }
    })
  },
  startread: function () {
    wx.readBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: serviceId[1],
      characteristicId: characteristicId[0],
      success: function (res) {
        console.log('readBLECharacteristicValue:', res.errCode)
      }
    })
  },
  startnotify: function () {
    wx.notifyBLECharacteristicValueChange({
      state: true,
      deviceId: deviceId,
      serviceId: serviceId[1],
      characteristicId: characteristicId[0],
      success: function (res) {
        console.log('notifyBLECharacteristicValueChange success', res.errMsg)
      }
    })
    function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )
      return hexArr.join('');
    }
    wx.onBLECharacteristicValueChange(function (res) {
      console.log('characteristic value comed:', ab2hex(res.value))
    })
  },
  startwrite: function () {
    let buffer = new ArrayBuffer(3)
    let dataView = new DataView(buffer)
    dataView.setUint8(1, 100)

    wx.writeBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: serviceId[1],
      characteristicId: characteristicId[0],
      value: buffer,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})