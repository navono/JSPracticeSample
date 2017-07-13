import React, {Component} from 'react';
import Member from './Member';

const getFakeMembers = count => new Promise((resolve, reject) => {
  const api = `http://api.randomuser.me/?nat=US&results=${count}`;
  const request = new XMLHttpRequest();
  request.open('GET', api);
  request.onload = () => (request.status === 200) ?
    resolve(JSON.parse(request.response).results) :
    reject(Error(request.statusText));
  request.onerror = err => reject(err);
  request.send();
})

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      loading: false,
      error: null
    }
  }

  componentWillMount() {
    this.setState({loading: true});

    // 在组件渲染前使用setState是不是触发更新循环，只会在组件渲染后才会触发更新循环
    getFakeMembers(this.props.count).then(
      members => {
        this.setState({members, loading: false});
      },
      error => {
        this.setState({error, loading: false});
      }
    )
  }

  // 一些第三方库的初始化也可以放在 ccomponentDidMount ，也就是在组件渲染之后，已经拥有了DOM树。
  // 一些后台处理也可放在此方法内，比如定时器，同时需要在 componentWillUnmount 里清除。
  // 在此方法内使用 setState 会触发更新循环

  // componentWillReceiveProps(nextProps)

  // shouldComponentUpdate(nextProps, nextState)

  componentWillUpdate(nextProps, nextState) {
    console.log('updating lifecycle');
  }

  // componentDidUpdate(prevProps, prevState)

  render() {
    const {members, loading, error} = this.state;
    return (
      <div className="member-list">
        {(loading) ? 
          <span>Loading Members</span> :
          (members.length) ?
            members.map((user, i) => 
              <Member key={i} {...user} />):
            <span>0 members loaded...</span>
        }
        {(error) ? <p>Error loading Members: error</p> : ''}
      </div>
    );
  }
}

export default MemberList;
