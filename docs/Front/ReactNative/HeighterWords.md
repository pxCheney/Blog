# Heighter Words

**最近因为需求global search需要将search的keyWords高亮进行显示，由于native中react是编译不了Text类型的Element，所以只能自己实现。在GitHub上看到一个非常实用的组件，便记录了下来**

- 此组件为[react-native-highlight-words](https://github.com/clauderic/react-native-highlight-words),由于许久未维护，建议抽离出来。

``` js
import React from 'react';
import {Text} from 'react-native';
import {findAll} from 'highlight-words-core';
import PropTypes from 'prop-types';

Highlighter.propTypes = {
  autoEscape: PropTypes.bool, // 转义在正则表达式中有意义的字符
  highlightStyle: Text.propTypes.style, // 突出显示的文本样式
  searchWords: PropTypes.arrayOf(PropTypes.string).isRequired, // keyWords
  textToHighlight: PropTypes.string.isRequired, // 用于突出显示keyWords的文本
  sanitize: PropTypes.func, // 在比较之前处理每个搜索词和文本以突出显示
  style: Text.propTypes.style // 文本样式
};

/**
* Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
* This function returns an array of strings and <Text> elements (wrapping highlighted words).
*/
export default function Highlighter({
  autoEscape,
  highlightStyle,
  searchWords,
  textToHighlight,
  sanitize,
  style,
  ...props
}) {
  const chunks = findAll({textToHighlight, searchWords, sanitize, autoEscape});

  return (
    <Text style={style} {...props}>
      {chunks.map((chunk, index) => {
        const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);

        return (!chunk.highlight)
            ? text
            : (
                <Text
                    key={index}
                    style={chunk.highlight && highlightStyle}
                >
                    {text}
                </Text>
            );
      })}
    </Text>
  );
}
```
