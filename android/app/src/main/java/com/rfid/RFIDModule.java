package com.rfid;

import android.widget.Toast;

import java.util.logging.Logger;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

import org.jetbrains.annotations.NotNull;

import com.solid.ReaderException;

public class RFIDModule extends ReactContextBaseJavaModule {

    private static final Logger LOGGER = Logger.getLogger(RFIDModule.class.getName());
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public RFIDModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "RFID";
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

    @ReactMethod
    public void create(String uriString, Callback successCallback, Callback errorCallback){
        try {
            RFIDApplication application = new RFIDApplication();
            application.connect(uriString,(s) -> {
                successCallback.invoke(s);
            });
            application.getReaderInfo();
//            successCallback.invoke(this.ReadSingleEPC());
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

}
