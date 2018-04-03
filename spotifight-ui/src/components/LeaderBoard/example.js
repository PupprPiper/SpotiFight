
class Modal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modalData: {},
    }
    this.fetchGithubData = this.fetchGithubData.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.props.githubData !== nextProps.githubData 
      ? this.fetchGithubData(nextProps.githubData)
    : null;
  }
  
  fetchGithubData(username) {
    var url = "https://api.github.com/users/";
    fetch(`${url}${username}`)
    .then(res => res.json())
    .then(data => this.setState({ modalData: data }));
  }
    
  render () {
    const { githubData } = this.props;
    const { modalData } = this.state;
    
    return (
      <div className="modal" id="myModal">
        <div className="modal-content">
          <div className="modal-body">
            {!modalData 
              ? <h3 style={{ textAlign: "center"}}>"Loading"</h3>
              : 
              <div className="showModal">
              <div className="modal-img-div">
                <img src={modalData.avatar_url} className="modal-img" alt={`Image of ${modalData.name}`} width="100" height="100" />
              </div>
              <div className="modal-header">
                <h3>{modalData.name}</h3>
                <a href={`https://github.com/${modalData.login}`} target="_blank">
                  <p>{modalData.login}</p>
                </a>
              </div>
              <hr />
              <div className="github-data">
                <span><strong>{modalData.followers}</strong> followers |</span>
                <span><strong>{modalData.public_repos}</strong> repos |</span>
                <span><strong>{modalData.following}</strong> following</span>
              </div>
              <hr />
              <div className="modal-data">
                  {modalData.location 
                  ? <p><i className="fas fa-map-marker"></i> {modalData.location}</p> : null}
                  {modalData.blog 
                  ? <p><i className="fas fa-link"></i><a href={modalData.blog} target="_blank"> {modalData.blog}</a></p> : null}
              </div>
              </div>
            }
          </div>
          <div className="modal-footer">
            <button type="button" className="close-footer" onClick={this.props.closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      styleHeader: {
        backgroundColor: "white",
        color: "rgba(240, 88, 67, 0.8)"
      },
      onSort: true,
      githubData: "",
    }
    this.pastMonthPoints = this.pastMonthPoints.bind(this);
    this.alltimePoints = this.alltimePoints.bind(this);
    this.fetchAlltime = this.fetchAlltime.bind(this);
    this.fetchMonthPoints = this.fetchMonthPoints.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  componentDidMount() {
    this.alltimePoints();
  }
  
  pastMonthPoints() {
    this.setState({ onSort: false });
    return this.fetchMonthPoints();
  }
  
  alltimePoints() {
    this.setState({ onSort: true });
    return this.fetchAlltime();
  }
  
  fetchMonthPoints() {
    var url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent?origin=*";
    fetch(url).then(res => res.json()).then(data =>this.setState({ data }));
  }
  
  fetchAlltime() {
    var url = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime?origin=*";
    fetch(url).then(res => res.json()).then(data => 
      this.setState({ data })
    );
  }
  
  openModal (e) {
    e.preventDefault();
    this.setState({ 
      githubData: e.target.innerText }, () => {
        document.body.style.overflow = "hidden";
        document.getElementById("myModal").style.display = "block";
    });
  }
  
  closeModal(){
    document.getElementById("myModal").style.display = "none";
    document.body.style.overflow = "auto";
  }
  
  render () {
    return (
      <div className="leaderboard-table">
        <Modal closeModal={this.closeModal} githubData={this.state.githubData} />
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Avatar</th>
              <th>User Name</th>
              <th 
                className="sort-header" 
                onClick={this.pastMonthPoints} 
                style={!this.state.onSort ? this.state.styleHeader : null}>Past 30days</th>
              <th 
                className="sort-header" 
                onClick={this.alltimePoints} 
                style={this.state.onSort ? this.state.styleHeader : null}>All Time</th>
            </tr>
          </thead>
          <tbody>
          {!this.state.data ? <tr></tr> :
            this.state.data.map( (user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td><img src={user.img} alt="avatar" width="50" height="50" className="table-img"></img></td>
                <td onClick={this.openModal}>{user.username}</td>
                <td>
                  <div className="recent-bar">
                    <div className="recent-progress" style={{width:`${user.recent}px`}}>
                    </div>
                    <p>{user.recent}</p>
                  </div>
                </td>
                <td>
                  <div className="alltime-bar">
                    <div className="alltime-progress" style={{width:`${user.alltime/10000*70}px`}}>
                    </div>
                    <p>{user.alltime}</p>
                  </div>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

class Theme extends React.Component {
  constructor() {
    super();
    
    this.handleTheme = this.handleTheme.bind(this);
  }
  

  handleTheme(e) {
    const root = document.documentElement;
    const lightColor = 'rgb(220, 220, 220)';
    const darkColor = 'rgba(50, 50, 70, 0.9)';
    const hoverRed = 'rgb(240, 88, 67)';
    
    switch(e.target.value) {
      case 'light':
        root.style.setProperty('--bg', lightColor)
        root.style.setProperty('--bg-text', darkColor)
        root.style.setProperty('--hover-text', 'white')
        break;
      default: 
        root.style.setProperty('--bg', darkColor)
        root.style.setProperty('--bg-text', lightColor)
        root.style.setProperty('--hover-text', hoverRed)
    }
  }

  render() {
    return (
      <div className="theme">
        Select Theme: 
        <button type="button" onClick={this.handleTheme} value="dark">Dark</button>
        <button type="button" onClick={this.handleTheme} value="light">Light</button>
      </div>
    )
  }
}

class App extends React.Component {  
  render () {
    return (
    <div>
      <Theme />
      <Table />
    </div>
    );
  }
}

ReactDOM.render( <App />, document.getElementById("root"));