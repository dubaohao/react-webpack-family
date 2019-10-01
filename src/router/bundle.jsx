// 按需加载
// 为什么要实现按需加载？
//
// 我们现在看到，打包完后，所有页面只生成了一个build.js,当我们首屏加载的时候，就会很慢。因为他也下载了别的页面的js了哦。
// 如果每个页面都打包了自己单独的JS，在进入自己页面的时候才加载对应的js，那首屏加载就会快很多哦。

// 在 react-router 2.0时代， 按需加载需要用到的最关键的一个函数，就是require.ensure()，它是按需加载能够实现的核心。
// 在4.0版本，官方放弃了这种处理按需加载的方式，选择了一个更加简洁的处理方式。
// 传送门
// 根据官方示例，我们开搞
//
// npm install bundle-loader --save-dev
import React from 'react'

class Bundle extends React.Component{
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  };

  componentDidMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load = (props) => {
    this.setState({
      mod: null
    });
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.props.children(this.state.mod)
  }
}

export default Bundle;
