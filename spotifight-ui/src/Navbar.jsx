const pic = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFk%0D%0Ab2JlIElsbHVzdHJhdG9yIDIyLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246%0D%0AIDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5z%0D%0APSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMu%0D%0Ab3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMjI2IDEzNyIg%0D%0Ac3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIyNiAxMzc7IiB4bWw6c3BhY2U9InBy%0D%0AZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZGlzcGxheTpub25lO2ZpbGw6%0D%0AI0U1RTVFNTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDF7Zm9udC1mYW1pbHk6J011%0D%0Ac2VvU2Fucy01MDAnO30KCS5zdDJ7Zm9udC1zaXplOjE3Mi44MDM0cHg7fQoJLnN0M3tlbmFibGUt%0D%0AYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDR7ZmlsbDojRTVFNUU1O30KPC9zdHlsZT4KPHRleHQg%0D%0AaWQ9InRleHQiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgMC40MTg3IDEzMC4yOTU0KSIgY2xh%0D%0Ac3M9InN0MCBzdDEgc3QyIj5DT0RFU0xJTkcuSU88L3RleHQ+CjxnIGNsYXNzPSJzdDMiPgoJPHBh%0D%0AdGggY2xhc3M9InN0NCIgZD0iTTcwLjgsNi4yYzI5LjQsMCw0NC40LDE2LjEsNDQuNCwxNi4xbC04%0D%0ALjUsMTIuOGMwLDAtMTQuMi0xMy4zLTM1LjMtMTMuM2MtMjcuMywwLTQ1LjEsMjAuNy00NS4xLDQ2%0D%0ALjcKCQljMCwyNi4xLDE4LjEsNDguMiw0NS4zLDQ4LjJjMjMsMCwzNy43LTE1LjksMzcuNy0xNS45%0D%0AbDkuMiwxMi4zYzAsMC0xNi44LDE5LjQtNDcuMywxOS40Yy0zNi42LDAtNjIuNC0yOC02Mi40LTYz%0D%0ALjgKCQlDOC43LDMzLjIsMzUuMyw2LjIsNzAuOCw2LjJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3Q0IiBk%0D%0APSJNMTk1LjMsNi4yYzM1LjMsMCw2Mi42LDI3LjEsNjIuNiw2Mi4yYzAsMzUuOS0yNy4zLDYzLjkt%0D%0ANjIuNiw2My45Yy0zNS4zLDAtNjIuNy0yOC02Mi43LTYzLjkKCQlDMTMyLjYsMzMuNCwxNjAuMSw2%0D%0ALjIsMTk1LjMsNi4yeiBNMTk1LjMsMTE2LjZjMjQuOSwwLDQ0LjktMjAuNyw0NC45LTQ4LjJjMC0y%0D%0ANi42LTIwLTQ2LjctNDQuOS00Ni43Yy0yNC45LDAtNDUuMSwyMC00NS4xLDQ2LjcKCQlDMTUwLjIs%0D%0AOTUuOSwxNzAuNSwxMTYuNiwxOTUuMywxMTYuNnoiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0y%0D%0AODIuOCw4LjNoNDAuNGMzNy4zLDAsNjEuOSwyMi4zLDYxLjksNjAuOGMwLDM4LjctMjQuNSw2MS4y%0D%0ALTYxLjksNjEuMmgtNDAuNFY4LjN6IE0zMjIsMTE1LjQKCQljMjcuNSwwLDQ1LjQtMTYuMiw0NS40%0D%0ALTQ2LjNjMC0yOS45LTE4LjEtNDYtNDUuNC00NmgtMjIuMXY5Mi4zSDMyMnoiLz4KCTxwYXRoIGNs%0D%0AYXNzPSJzdDQiIGQ9Ik00MTAuNyw4LjNoNzAuOXYxNC45aC01My43djM4LjJoNDMuN3YxNC45aC00%0D%0AMy43djM5LjJoNTYuN3YxNC45aC03My44VjguM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik01%0D%0AMTAsMTAzLjNjMCwwLDEzLDEzLjEsMzEuMSwxMy4xYzExLjQsMCwyMS4xLTYuNCwyMS4xLTE4YzAt%0D%0AMjYuNC01OS4xLTIwLjctNTkuMS01OC4yYzAtMTksMTYuNC0zNCwzOS40LTM0CgkJYzIyLjYsMCwz%0D%0ANC42LDEyLjMsMzQuNiwxMi4zbC03LjgsMTQuMmMwLDAtMTEuMi0xMC41LTI2LjgtMTAuNWMtMTMs%0D%0AMC0yMi4xLDguMS0yMi4xLDE3LjhjMCwyNS4yLDU5LjEsMTguNSw1OS4xLDU4LjEKCQljMCwxOC44%0D%0ALTE0LjUsMzQuNC0zOC43LDM0LjRjLTI1LjksMC00MC40LTE2LjEtNDAuNC0xNi4xTDUxMCwxMDMu%0D%0AM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik02MDQsOC4zaDE3LjF2MTA3LjFoNTQuNnYxNC45%0D%0ASDYwNFY4LjN6Ii8+Cgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNNjk1LjQsOC4zaDE3LjF2MTIyaC0x%0D%0ANy4xVjguM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik03NDUuNyw4LjNoMTYuOWw1NC4zLDc5%0D%0ALjNjNC41LDYuNiwxMC4yLDE3LjYsMTAuMiwxNy42aDAuM2MwLDAtMS4yLTEwLjktMS4yLTE3LjZW%0D%0AOC4zaDE3LjF2MTIyaC0xNi44CgkJbC01NC40LTc5LjFjLTQuNS02LjctMTAuMi0xNy44LTEwLjIt%0D%0AMTcuOGgtMC4zYzAsMCwxLjIsMTAuOSwxLjIsMTcuOHY3OS4xaC0xNy4xVjguM3oiLz4KCTxwYXRo%0D%0AIGNsYXNzPSJzdDQiIGQ9Ik05MzAuNiw2LjJjMjkuMiwwLDQ0LjQsMTQuNyw0NC40LDE0LjdsLTgu%0D%0ANiwxMi44YzAsMC0xMy43LTExLjktMzQuNC0xMS45Yy0yOC43LDAtNDYsMjAuOS00Niw0NwoJCWMw%0D%0ALDI4LjMsMTkuNCw0Ny45LDQ0LjksNDcuOWMyMS4xLDAsMzQuNi0xNS4yLDM0LjYtMTUuMlY4My44%0D%0AaC0xOS45VjY4LjloMzUuNHY2MS4zaC0xNXYtNy42YzAtMi42LDAuMi01LjIsMC4yLTUuMmgtMC4z%0D%0ACgkJYzAsMC0xMy4zLDE0LjktMzcuNSwxNC45Yy0zMi44LDAtNjAtMjUuOS02MC02My4yQzg2OC40%0D%0ALDMzLjksODk1LDYuMiw5MzAuNiw2LjJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTAwNC40%0D%0ALDExMi41aDE3LjZ2MTcuOGgtMTcuNlYxMTIuNXoiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0x%0D%0AMDUwLDguM2gxNy4xdjEyMkgxMDUwVjguM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0xMTU0%0D%0ALjcsNi4yYzM1LjMsMCw2Mi42LDI3LjEsNjIuNiw2Mi4yYzAsMzUuOS0yNy4zLDYzLjktNjIuNiw2%0D%0AMy45Yy0zNS4zLDAtNjIuNy0yOC02Mi43LTYzLjkKCQlDMTA5MiwzMy40LDExMTkuNSw2LjIsMTE1%0D%0ANC43LDYuMnogTTExNTQuNywxMTYuNmMyNC45LDAsNDQuOS0yMC43LDQ0LjktNDguMmMwLTI2LjYt%0D%0AMjAtNDYuNy00NC45LTQ2LjdjLTI0LjksMC00NS4xLDIwLTQ1LjEsNDYuNwoJCUMxMTA5LjYsOTUu%0D%0AOSwxMTI5LjgsMTE2LjYsMTE1NC43LDExNi42eiIvPgo8L2c+Cjwvc3ZnPgo="



import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  IndexRoute,
  BrowserRouter,
  withRouter
} from "react-router-dom";
import "./Navbar.css";
import $ from 'jquery';

class Navbar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
 this.scrollMe = this.scrollMe.bind(this);
  }

  scrollMe() {
    $(window).scroll(function() {
      var sc = $(window).scrollTop()
      if (sc > 50) {
        $("#header-sroll").addClass("small")
      } else {
        $("#header-sroll").removeClass("small")
      }
    });
  }

  render(props) {
    return (<div onScroll={this.scrollMe}>
      <div id="header">
        <div id="header-sroll">
          <h1>

            <img src={pic} width="10%" alt="codeslingio"/>

            <Link align="right" className="mastb" to="/friends">
              <span className="showme">Friends</span>
            </Link>
            <Link align="right" className="mastb" to="/history">
              <span className="showme">Histories</span>
            </Link>

            <Link align="right" className="mastb" to="/messages">
              <span className="showme">Messages</span>
            </Link>
          </h1>

        </div>
      </div>
    </div>)

      }


    }


export default Navbar;
