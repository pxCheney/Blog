# adb-Android调试桥

1. 安装homebrew

> ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2. 安装adb

> brew cask install android-platform-tools

3. 启动adb

> adb devices

`List of devices attached**`  
`DT4YHE1467182778    device`

1. 建立devices debugger-ui 链接🔗

> adb reverse tcp:8081 tcp:8081

3. react-native-echarts 安卓打包无法build的问题

> 在android/fastlane/Fasfile文件添加
``` js
  def removeResources()
    puts 'Remove Resources'
    sh("rm -rf ../app/src/main/res/drawable-*")
    sh("rm -rf ../app/src/main/res/raw/app_components_echarts_components_echarts_tpl.html")
  end
```
