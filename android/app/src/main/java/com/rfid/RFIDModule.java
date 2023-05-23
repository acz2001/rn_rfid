package com.rfid;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.jetbrains.annotations.NotNull;

import com.solid.ReaderException;

public class RFIDModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    RFIDApplication application = new RFIDApplication();

    public RFIDModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NotNull
    @Override
    public String getName() {
        return "RFID";
    }

    @ReactMethod
    public void create(String uriString, Callback successCallback, Callback errorCallback) {
        try {
            application.connect(uriString, (s) -> {
                successCallback.invoke(s);
            });
            application.getReaderInfo();
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

    @ReactMethod
    public void shutdown(Callback successCallback, Callback errorCallback) {
        try {
            application.shutdown();
            successCallback.invoke(false);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

}
