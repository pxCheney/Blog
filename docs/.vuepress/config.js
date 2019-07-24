module.exports = {
  base: '/Blog/',
  title: '❤',
  description: 'pxCheney',
  // theme: 'awesome',
  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico` }],
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    // navbar
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/foo/one' },
        ]
      },
      { text: 'GitHub', link: 'https://github.com/pxCheney' },
    ],
    // sidebar
    sidebar: {
      '/Front/': [
        '/Front/',
        {
          title: 'JavaScript',
          // collapsable: false,
          children: [
            '/Front/JavaScript/DesignPattern',
          ]
        }, {
          title: 'React',
          // collapsable: false,
          children: [
            '/Front/React/',
            '/Front/React/Compose',
            '/Front/React/Hocks',
            '/Front/React/UseState',
            '/Front/React/UseReducer',
          ]
        }, {
          title: 'React Native',
          // collapsable: false,
          children: [
            '/Front/ReactNative/LinkPhoneSetting',
            '/Front/ReactNative/adb-Android调试桥',
            '/Front/ReactNative/HeighterWords',
          ]
        }, {
          title: 'Other Node',
          children: [
            '/Front/OtherNote/UML'
          ]
        }
      ],
    }
  }
}
