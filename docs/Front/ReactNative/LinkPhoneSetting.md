# LinkPhoneSetting

## iOS

**iOS打开设置还是比较简单的，使用Linking组件即可：**

``` js
Linking.openURL('app-settings:')
  .catch(err => console.log('error', err))
```

## Android

1. **在**`android/app/src/main/java/com/<projectname>/`**文件夹下创建**`opensettings`**文件夹**
1. **在这个文件夹下创建模块文件**`OpenSettingsModule.java`**（模块功能）和包文件**`OpenSettingsPackage.java`**（注册我们的模块）**。
3. **在**`OpenSettingsModule.java`**文件中，填入如下代码**

``` java
package com.<projectname>.opensettings; // 记得把<projectname>改为你的项目名称

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class OpenSettingsModule extends ReactContextBaseJavaModule {

  @Override
  public String getName() {
    /**
     * return the string name of the NativeModule which represents this class in JavaScript
     * In JS access this module through React.NativeModules.OpenSettings
     */
    return "OpenSettings";
  }

  @ReactMethod
  public void openNetworkSettings(Callback cb) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cb.invoke(false);
      return;
    }
    try {
      currentActivity.startActivity(new Intent(android.provider.Settings.ACTION_SETTINGS));
      cb.invoke(true);
    } catch (Exception e) {
      cb.invoke(e.getMessage());
    }
  }

  /* constructor */
  public OpenSettingsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }
}
```
4. **上面的模块功能可以通过调用openNetworkSettings函数打开android设置。现在我们需要注册这个模块。在**`OpenSettingsPackage.java`**里填入如下代码：**

``` java
package com.<projectname>.opensettings; // 记得把<projectname>改为你的项目名称

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class OpenSettingsPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new OpenSettingsModule(reactContext));

    return modules;
  }

//   @Override
//   public List<<Class>? extends JavaScriptModule> createJSModules() {
//     return Collections.emptyList();
//   }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}
```
5. **把包提供到**`MainApplication.java`**文件的getPackages方法中:**

``` java
import com.<projectname>.opensettings.*; // 还是要修改成自己项目名
...
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new OpenSettingsPackage() /* <---- add here */
  );
}
```

6. **准备工作完成，接下来调用：**

``` java
import { NativeModules } from 'react-native'

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  openSettings() {
    NativeModules.OpenSettings.openNetworkSettings(data => {
      console.log('call back data', data)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.openSettings}>Open Android Settings</Text>
      </View>
    )
  }
}   
```
