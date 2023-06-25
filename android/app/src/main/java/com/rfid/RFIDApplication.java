package com.rfid;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.solid.*;

import java.util.Objects;

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

    private String currentEpc;

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
    public void connect(String address) throws Exception {
        this.shutdown();
        this.address = address;
        reader = SReader.create(address);
        reader.Connect();
    }

    public ReaderInfo getReaderInfo() throws ReaderException {
        if (reader != null) {
            return reader.getReaderInfo();
        }

        return null;
    }

    public void shutdown() {
        this.currentEpc = null;
        if (reader != null) {
            this.stopRead();
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

    private final ReaderListener readerListener = new ReaderListener() {

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
            final String epc = t.epcString();
            if (Objects.equals(epc, currentEpc)) {
                return;
            }
            currentEpc = epc;
            WritableMap params = new WritableNativeMap();
            params.putInt("ant", t.getAnt());
            params.putInt("num", t.getNum());
            params.putString("epc", epc);

            DeviceEventManagerModule.RCTDeviceEventEmitter emitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
            if (emitter != null) {
                emitter.emit("tagReadData", params);
            }
        }

    };

    private volatile boolean readStop;
    private Thread thread = null;

    public void startRead() {
        readStop = false;
        thread = new Thread(() -> {

            // 添加事件监听器
            reader.addReadListener(readerListener);

            Gen2.InventryValue value = new Gen2.InventryValue(4, 0);

            while (!readStop) {
                try {
                    reader.Inventry(value, null);
                } catch (Exception e) {
                    System.err.println("error:" + e.getMessage());
                }
            }
        });
        thread.start();
    }

    public void stopRead() {
        if (readStop) {
            return;
        }
        readStop = true;
//        reader.removeReadListener(readerListener);
        try {
            while (thread.isAlive()) {
                Thread.sleep(50);
            }
//            reader.Inventry_stop();
            reader.removeReadListener(readerListener);
        } catch (Exception e) {
            System.err.println("error:" + e.getMessage());
        }
    }

    public void setReadPower(int power) throws ReaderException {
        if (reader == null) {
            throw new RuntimeException("设备未连接");
        }
        reader.setReaderPower(power);
    }

}
