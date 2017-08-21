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
    const element = componentInstance.render();

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
    console.log('Composite');
    const componentInstance = new FeactCompositeComponentWrapper(element);
    return componentInstance.mountComponent(container);
  }
};

const MyTitle = Feact.createClass({
  render() {
    return Feact.createElement('h1', null, this.props.msg);
  }
});

Feact.render(
  Feact.createElement(MyTitle, { msg: 'hey there Feact'}),
  document.getElementById('root')
);