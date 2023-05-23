package com.rfid;

import android.os.Build;
import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.solid.*;

import java.util.HashSet;
import java.util.function.Consumer;

/**
 * RFID应用程序
 * todo 统一实现接口
 *
 * @author zhaohaha
 * Created on 2023/05/19
 */
public class RFIDApplication {

    /**
     * SReader
     */
    private SReader reader = null;

    /**
     * 连接地址 tcp/ip 或者 串口地址
     */
    private String address;

    private ReactContext reactContext;

    /**
     * 有参/无参构造
     */
    public RFIDApplication(ReactContext reactContext) {
        this.reactContext = reactContext;
    }

    /**
     * 连接
     */
    public void connect(String address, Consumer<String> callback) throws Exception {
        if (reader != null) {
            // 关闭连接
            reader.ShutDown();
            reader = null;
        }
        System.out.println(address);
        this.address = address;
        reader = SReader.create(address);

        // 添加事件监听器
        reader.addReadListener(new PrintListener());

        // todo
        // 进行连接
        reader.Connect();
        if (callback != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                callback.accept(address);
            }
        }
    }

    public ReaderInfo getReaderInfo() throws ReaderException {
        if (reader != null) {
            return reader.getReaderInfo();
        }

        return null;
    }

    public void connect(String address) throws Exception {
        this.connect(address, null);
    }

    public void shutdown() {
        if (reader != null) {
            reader.ShutDown();
            reader = null;
        }
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    class PrintListener implements ReaderListener {
        HashSet<String> seenTags = new HashSet<String>();
        int total = 1;

        @Override
        public void ReaderGPIO(Gpio_Info gpio_info) {
            // TODO Auto-generated method stub
            System.out.println("Id:" + gpio_info.getID() + "  High:" + gpio_info.getHigh());
        }

        @Override
        public void ReaderException(Exception e) {
            // TODO Auto-generated method stub
            System.out.println("ee ReaderException: " + e.getMessage());
        }

        @Override
        public void TagReadData(TagData t) {
            WritableMap params = new WritableNativeMap();
            params.putInt("ant", t.getAnt());
            params.putInt("num", t.getNum());
            params.putInt("rssi", t.getRssi());
            params.putString("epc", t.epcString());
            if (t.getData() != null) {
                WritableArray array = new WritableNativeArray();
                for (byte b : t.getData()) {
                    array.pushInt(b);
                }
                params.putArray("data", array);
            }

            DeviceEventManagerModule.RCTDeviceEventEmitter emitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
            if (emitter != null) {
                emitter.emit("tagReadData", params);
            }
        }

    }

}