// 创建单个元素的辅助类
class FeactDOMComponent {
  constructor(element) {
    this._currentElement = element;
  }

  mountComponent(container) {
    const domElement = document.createElement(this._currentElement.type);
    const textNode = document.createTextNode(this._currentElement.props.children);

    domElement.appendChild(textNode);
    container.appendChild(domElement);

    this._hostNode = domElement;
    return domElement;
  }
}

// 创建组合组件的辅助类
class FeactCompositeComponentWrapper {
  constructor(element) {
    this._currentElement = element;
  }

  mountComponent(container) {
    const Component = this._currentElement.type;
    const componentInstance = new Component(this._currentElement.props);
    let element = componentInstance.render();

    // 这里先暂时使用循环来检查 element 的类型
    while (typeof element.type === 'function') {
      element = (new element.type(element.props)).render();
    }

    const domComponentInstance = new FeactDOMComponent(element);
    return domComponentInstance.mountComponent(container);
  }
}

const Feact = {
  createElement(type, props, children) {
    const element = {
      type,
      props: props || {}
    };

    if (children) {
      element.props.children = children;
    }

    return element;
  },

  createClass(spec) {
    function Constructor(props) {
      this.props = props;
    }

    Constructor.prototype.render = spec.render;
    return Constructor;
  },

  // 与 createClass使用有点问题，因此先注释掉
  // render(element, container) {
  //   const componentInstance = new FeactDOMComponent(element);
  //   return componentInstance.mountComponent(container);
  // }

  render(element, container) {
    // 此处应该判断 element 是 原生的DOM元素还是 组合组件。
    // 如果是 原生的DOM元素，可以用上面的 render 方法；
    // 如果是 组合组件，就用下面的这个辅助类
    console.log('Composite');
    const componentInstance = new FeactCompositeComponentWrapper(element);
    return componentInstance.mountComponent(container);
  }
};

// 在创建自定义的 组件类 时，需要预先定义好这个 组件类 中的元素，
// 也就是自定义 render 方法。在 render 方法里创建 元素
const MyTitle = Feact.createClass({
  render() {
    // 此时这里如果返回一个 组合组件，那么 FeactCompositeComponentWrapper 里
    // 需要相应修改
    if (this.props.asTitle) {
      return Feact.createElement(
        MyTitle, 
        {
          msg: this.props.msg
        });
    } else {
      return Feact.createElement('h1', null, this.props.msg);
    }
  }
});

Feact.render(
  Feact.createElement(MyTitle, { asTitle: true, msg: 'hey there Feact'}),
  document.getElementById('root')
);