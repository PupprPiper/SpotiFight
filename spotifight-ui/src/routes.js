import {
  AccountBox,
  MusicNote,
  Room,
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  Notifications,
  Accessibility,
  Gamepad,
  Home as HomeIcon
} from 'material-ui-icons';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Chat from './components/Chat/Chat';
import GameRoom from './components/GameRoom/GameRoom';
import Games from './components/Games/Games';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import Lobby from './components/Lobby/Lobby';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import UserProfile from './components/UserProfile/UserProfile';
import Friends from './components/Friends/Friends';
import Flappy from './components/Games/Flappy/Flappy';
import Verify from './components/Auth/Verify';
import CountDown from './components/Games/CountDown';

// import store from './components/Games/Flappy/store';
const store = 'test';

const appRoutes = [
  {
    path: '/home',
    sidebarName: 'Home',
    icon: HomeIcon,
    component: Home,
    protected: true
  },
  {
    path: '/friends',
    sidebarName: 'Friends',
    icon: Person,
    component: Friends,
    protected: true
  },
  {
    path: '/signup',
    sidebarName: 'Signup',
    icon: AccountBox,
    component: Signup
  },
  {
    path: '/login',
    sidebarName: 'Login',
    icon: AccountBox,
    component: Login
  },
  {
    path: '/game-room',
    sidebarName: 'Game Room',
    icon: Gamepad,
    component: GameRoom,
    protected: true,
    hidden: true
  },
  {
    path: '/landing-page',
    sidebarName: 'Landing Page',
    icon: Dashboard,
    component: LandingPage
  },
  {
    path: '/leader-board',
    sidebarName: 'Leader Board',
    icon: Accessibility,
    component: LeaderBoard,
    protected: true
  },
  {
    path: '/lobby',
    sidebarName: 'Lobby',
    icon: Room,
    component: Lobby,
    protected: true,
    hidden: true
  },
  {
    path: `/user-profile/`,
    sidebarName: 'User Profile',
    icon: AccountBox,
    component: UserProfile,
    protected: true
  },
  {
    path: `/count-down`,
    sidebarName: 'Count Down',
    component: CountDown,
    protected: true,
    hidden: true
  },
  {
    to: '/landing-page',
    redirect: true,
    path: '/',
    component: LandingPage
  }
];

export default appRoutes;
