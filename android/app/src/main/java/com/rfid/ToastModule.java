package com.rfid;

import android.widget.Toast;

import java.util.logging.Logger;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

import com.solid.SReader;
import org.jetbrains.annotations.NotNull;

import java.io.Reader;
import java.util.HashSet;

import com.solid.Gen2;
import com.solid.Gpio_Info;
import com.solid.ReaderException;
import com.solid.ReaderListener;
import com.solid.SReader;
import com.solid.TagData;
import com.solid.Gen2.InventryValue;

public class ToastModule extends ReactContextBaseJavaModule {

    private static final Logger LOGGER = Logger.getLogger(ToastModule.class.getName());
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public ToastModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "ToastExample";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration, Callback errorCallback, @NotNull Callback successCallback) {
//    LOGGER.info("This is an info message.");
        successCallback.invoke(message);
    }

    private static SReader reader;

    /**
     * 断开连接
     */
    @ReactMethod
    public void shutdown() {
        if (reader != null) {
            reader.ShutDown();
        }
    }

    /**
     * 结束盘点
     */
    @ReactMethod
    public void inventryStop() {
        if (reader != null) {
            reader.Inventry_stop();
        }
    }

    @ReactMethod
    public void create(String uriString, Callback errorCallback, Callback successCallback) {
        try {
            reader = SReader.create("sld://" + uriString);

            reader.Connect();

            // 设置天线
            int[] antList = {1};
            reader.setAntenna(antList);

            // 设置功率
            int power = 30;
            reader.setReaderPower(power);

            ReaderListener listener = new PrintListener();
            reader.addReadListener(listener);

            int q = 4;
            int session = 1;
            Gen2.InventryValue value = new InventryValue(q, session);
            reader.Inventry(value, null);


            successCallback.invoke(this.ReadSingleEPC());
        } catch (ReaderException e) {
            // TODO: handle exception
            System.out.println("ReaderException:" + e.getMessage());
            errorCallback.invoke(e.getMessage());
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println("Exception" + e.getMessage());
            errorCallback.invoke(e.getMessage());
        }

    }

    /**
     * 读取EPC
     */
    private String ReadSingleEPC() {
        TagData tagData = reader.ReadSingleEPC();
        return tagData.epcString()
    }

    static class PrintListener implements ReaderListener {
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
            // TODO Auto-generated method stub
            String epc = t.epcString();
            // System.out.println("New tag: " + t.epcString()+" ant:"+ t.getAnt());
            if (!seenTags.contains(epc)) {
                System.out.println("New tag: " + t.epcString() + " ant:" + t.getAnt() + "  total:" + total);
                total++;
                seenTags.add(epc);
            }
        }

    }

}
