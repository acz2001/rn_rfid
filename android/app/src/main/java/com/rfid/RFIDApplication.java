package com.rfid;

import android.os.Build;
import com.solid.ReaderException;
import com.solid.ReaderInfo;
import com.solid.SReader;

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

    /**
     * 有参/无参构造
     */
    public RFIDApplication() {
    }

    public RFIDApplication(String address) {
        this.address = address;
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
}
