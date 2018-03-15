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

import Auth from './components/Auth/Auth';
import Chat from './components/Chat/Chat';
import GameRoom from './components/GameRoom/GameRoom';
import Games from './components/Games/Games';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import Lobby from './components/Lobby/Lobby';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import UserProfile from './components/UserProfile/UserProfile';

const appRoutes = [
  {
    path: '/home',
    sidebarName: 'Home',
    icon: HomeIcon,
    component: Home
  },
  {
    path: '/chat',
    sidebarName: 'Chat',
    icon: Person,
    component: Chat
  },
  {
    path: '/game-room',
    sidebarName: 'Game Room',
    icon: Gamepad,
    component: GameRoom
  },
  {
    path: '/games',
    sidebarName: 'Games',
    icon: Gamepad,
    component: Games
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
    component: LeaderBoard
  },
  {
    path: '/lobby',
    sidebarName: 'Lobby',
    icon: Room,
    component: Lobby
  },
  {
    path: '/music-player',
    sidebarName: 'Music Player',
    icon: MusicNote,
    component: MusicPlayer
  },
  {
    path: '/user-profile',
    sidebarName: 'User Profile',
    icon: AccountBox,
    component: UserProfile
  },
  { redirect: true, path: '/', to: '/home', navbarName: 'Redirect' }
];

export default appRoutes;
