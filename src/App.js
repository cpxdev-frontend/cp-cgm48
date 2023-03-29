import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch as BasicSwitch,
  useHistory,
} from "react-router-dom";
import { Alert, AlertTitle } from '@material-ui/lab';
import "aos/dist/aos.css";

import { HubConnectionBuilder } from "@microsoft/signalr";

import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signOut,
  OAuthProvider,
  deleteUser
} from "firebase/auth";
import auth from "./fbindex";

import 'sweetalert2/dist/sweetalert2.min.css'
import moment from 'moment'
import { AppBar, Toolbar,Typography, IconButton, Drawer, FormControlLabel, Switch, ListItem, ListItemIcon, Divider, ListItemText,
Dialog, DialogActions, Button, DialogTitle, DialogContent, Avatar, Badge, CardContent, CardMedia, Slide, Grow, Fade, TextField, Menu, MenuItem } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AcUnitIcon from '@material-ui/icons/AcUnit'
import YouTubeIcon from '@material-ui/icons/YouTube';
import LanguageIcon from '@material-ui/icons/Language';
import DnsIcon from '@material-ui/icons/Dns';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import CodeIcon from '@material-ui/icons/Code';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import TheatersIcon from '@material-ui/icons/Theaters';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import SlideshowIcon from '@material-ui/icons/Slideshow';

import Home from './component/home';
import MemberList from './component/members';
import LiveCom from './component/livestream'
import MamSam from './component/memberdetail';
import News from './component/news';
import MvCom from './component/music';
import MusicCom from './component/streaming';
import Account from './component/account';
import Offici from './component/official';
import Api from './component/apisupport';
import FollowCom from './component/follow';
import RequestCom from './component/requesthour'
import PageErr from './component/404'
import Mana from './component/geevent/gemanage'
import RegisCom from './component/register';
import Fenetwork from './component/48groupnetwork';

import Fet from './fetch'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Carousel from 'react-material-ui-carousel'
import Swal from 'sweetalert2'

var checkloop;
const drawerWidth = 240;
const Client = '961896647339-roenm2ee6i60ed2rhbe2sqee0unlqj0f.apps.googleusercontent.com'

const useStyles = makeStyles((theme) => ({
  sm: {
    width: theme.spacing(3.8),
    height: theme.spacing(3.8),
  },
  lg: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  search: {
    right: theme.spacing(1),
    position: 'absolute',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  fabButton: {
    position: 'fixed',
    zIndex: 1000,
    bottom: 30,
    left: window.innerWidth > 600 ? 100 : 20,
    width: "auto",
    right: window.innerWidth > 600 ? 100 : 20,
  },
}));

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);


const timesch = {
  regis: {
    open: 1641834000,
    close: 1643043599
  },
  vote: {
    open: 1646888400, 
    close: 1649307600
  },
  preannoun: 1647000000,
  announ: 1649473200
}

var url = new URL(window.location.href);
var imgget = url.searchParams.get("imgstar");

function App() {
  const [Section, setSec] = React.useState('');
  const [con, setConnection] = React.useState(null);
  const cls = useStyles();
  const History = useHistory()
  const [ Reduce, setReduce] = React.useState(false)
  const [ EvtPop, setpopup] = React.useState(true)
  const [open, setOpen] = React.useState(false);
  const [uri, setUri] = React.useState('');
  const [login, setLogin] = React.useState(false);
  const [MemberDl, setMemDl] = React.useState(false);
  const [loginLoad, setLogLoad] = React.useState(false);
  const [kamiimg, setKami] = React.useState('');
  const [kamin, setKname] = React.useState('');
  const [survey, setSur] = React.useState('');
  const [ImgThumb, setImageThumb] = React.useState('');
  const [spcLive, setLive] = React.useState(false);
  const [geready, setReadyGE] = React.useState(false);
  const [newspop, setNewspop] = React.useState([]);
  const [memUpdate, setUpdate] = React.useState([]);
  const [stream, setStream] = React.useState(null);
  const [tokenID, setToken] = React.useState('');
  const [point, setPoint] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null)
  
  const [TokenLoad, setLoadToken] = React.useState(false);
  const [allDone, setAllDone] = React.useState(false);
  const [styleFade, setSty] = React.useState(0);
  
  const ref = React.useRef(null)
  const [footerHeight, setFooterH] = React.useState(0)
  

  const [width, setRealwidth] = React.useState(window.innerWidth);
  function handleWindowResize() {
    setRealwidth(window.innerWidth);
  }
  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

    React.useEffect(() => {
    const currentP = document.documentElement.scrollTop || document.body.scrollTop;
    window.scrollTo(0, currentP + 1);
     window.scrollTo(0, currentP - 1);
     window.scrollTo(0, currentP);
   }, [Reduce]);

   React.useEffect(() => {
    if (ref.current != null){
      setFooterH(ref.current.clientHeight)
    } 
  })
  
  React.useEffect(() => {
    const newConnection = new HubConnectionBuilder()
        .withUrl("https://cpxdevapi.azurewebsites.net/status")
        .build();

    setConnection(newConnection);
}, []);

React.useEffect(() => {
  if (con) {
      con.start()
          .then(result => {
            con.on("responsestatus", function (res) {
              if (res =='fail') {
                 document.getElementById("root").style.display = "none";
                   Swal.fire({
                     title: 'System is under maintenance',
                     text: 'You can contact us for ask more information.',
                     icon: 'error',
                     allowOutsideClick: false,
                     showConfirmButton: false
                   })
              }
          });
          })
          .catch(e => {
          
          });
          
          con.onclose(error => {
            document.getElementById("root").style.display = "none";
            Swal.fire({
              title: 'System is under maintenance',
              text: 'You can contact us for ask more information.',
              icon: 'error',
              allowOutsideClick: false,
              showConfirmButton: false
            })
        });
  }
}, [con]);


   React.useEffect(() => {
    if (ref.current != null){
      setFooterH(ref.current.clientHeight)
    } 
  })

   const FetchKami = (fetdata) => {
    if (localStorage.getItem("loged") != null) {
      fetch(fetdata + '/cgm48/getcgmkami?i=' + (JSON.parse(localStorage.getItem("loged")).user.uid).toString()  , {
        method :'get'
    })
      .then(response => response.json())
      .then(data => {
        setLogLoad(false)
        setOpen(false)
        if (data.obj != 'none') {
          setKami(data.obj.img)
          setKname(data.obj.name)
          localStorage.setItem('i', data.uname)
          // FetchWallet(fetdata, data.wallet)
        } else {
          setKami('-')
          localStorage.setItem('i', data.uname)
          setKname('-')
        }
        setLogin(true)
      });
    }
  }


  React.useEffect(() => {
    document.title = Section + ' | CGM48 Fans Space'
  }, [Section])

  const ReduceAction = () => {
    if (localStorage.getItem("lowgraphic") == null) {
      localStorage.setItem("lowgraphic", "")
      setReduce(true)
    } else {
      localStorage.removeItem("lowgraphic")
      setReduce(false)
    }
  }

  const FetLive = (fet) => {
    fetch(fet + '/cgm48/getstream?ch=3', {
      method :'post'
  })
      .then(response => response.json())
      .then(data => {
        if (data.link != '') {
          setStream(data)
          setImageThumb(data.src)
          setLive(true)
        } else {
          setLive(false)
        }
      }).catch(() => {
        setLive(false)
      })
  }

  const FetchPopNews = (fet) => {
    if (sessionStorage.getItem("ads") == null) {
      setpopup(true)
    } else {
      setpopup(false)
    }
    
    fetch(fet + '/cgm48/getadsupdate', {
      method :'post'
  })
      .then(response => response.json())
      .then(data => {
        

        fetch(fet + '/cgm48/getmemberbybirth?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
          method :'post'
      })
        .then(response => response.json())
        .then(dres => {
          sessionStorage.setItem("ads", 'i')
          if (dres.count == 0) {
            let tempd = []
            const withprio = data.filter(x => x.priority != undefined);
            const nonprio = data.filter(x => x.priority == undefined);
            for (let iw = 0; iw< withprio.length; iw++) {
              tempd.push(withprio[iw])
          }
           
            for (let ij = 0; ij< nonprio.length; ij++) {
              tempd.push(nonprio[ij])
            }
            setNewspop(tempd)
            if (kamin !== '') {
                setUpdate(tempd.filter(x => x.memtag.indexOf(kamin.toLowerCase()) || x.memtag.indexOf('All')))
            }
          } else {
            let tempd = []
            const withprio = data.filter(x => x.priority != undefined);
            const nonprio = data.filter(x => x.priority == undefined);
            for (let iw = 0; iw< withprio.length; iw++) {
                tempd.push(withprio[iw])
            }
            for (let i = 0; i< dres.response.length; i++) {
              if (dres.response[i].graduated == false) {
              tempd.push({
                title: 'Happy birthday! ' +  dres.response[i].name + ' CGM48',
                desc: 'Today is her birthday! Let\'s celebrate each other together.',
                link: '/member/' + dres.response[i].name.toLowerCase(),
                src: dres.response[i].img,
                place: '',
                timerange: [
                  moment(dres.response[i].birth +" 00:00:00", "YYYY-MM-DD HH:mm:ss").unix(),
                  moment(dres.response[i].birth +" 23:59:59", "YYYY-MM-DD HH:mm:ss").unix()
              ],
                memtag: [
                  dres.response[i].name.toLowerCase()
                ]
              })
            }
            }
            for (let ij = 0; ij< nonprio.length; ij++) {
              tempd.push(nonprio[ij])
            }
            setNewspop(tempd)
            if (kamin !== '') {
                setUpdate(tempd.filter(x => x.memtag.indexOf(kamin.toLowerCase()) || x.memtag.indexOf('All')))
            }
          }
        }).catch(() => {
        })
      }).catch(() => {
      })
  }

  React.useEffect(() => {
    function isOdd() {
      const ran = Math.floor((Math.random() * 1000) + 1);
      return Math.abs(ran % 2) == 1;
   }
   
    setSty(isOdd() == true ? 2 :1)
    if (localStorage.getItem("lowgraphic") == null) {
      setReduce(false)
    } else {
      setReduce(true)
    }
    if (localStorage.getItem("loged") == null) {
      setLogin(false)
    } else {
      setLogin(true)
    }
    
  if (sessionStorage.getItem('ads') == null) {
    setReadyGE(true)
  } else {
    setReadyGE(false)
  }

    var dem = setInterval(function(){ 
      if (Fet().ul !== '') {
        clearInterval(dem)
        var timeo = setInterval(function(){ 
          if (sessionStorage.getItem('ads') != null) {
            clearInterval(timeo)
            setAllDone(true)
          }
        }, 4500);
        setUri(Fet().ul)
        FetchKami(Fet().ul)
        FetLive(Fet().ul)
        FetchPopNews(Fet().ul)
      }
  }, 10);

  setInterval(function(){ 
    if (Fet().ul !== '') {
     FetLive(Fet().ul)
    }
}, 60000);
  }, [])


  const responseGoogle = (response) => {
    localStorage.setItem("loged", JSON.stringify(response.profileObj))
    fetch(Fet().ul + '/cgm48/addFanMember?i=' + (JSON.parse(localStorage.getItem("loged")).googleId).toString() + "&usname=" + (JSON.parse(localStorage.getItem("loged")).name).toString() + "&email=" + (JSON.parse(localStorage.getItem("loged")).email).toString(), {
      method: 'POST', // or 'PUT'
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      })
      .then(response => response.text())
      .then(data => {
        if (data == "false") {
          FetchKami(Fet().ul)
          setLogin(true)
          setLogLoad(false)
          setOpen(false)
        } else {
          alert("System will be temporary error for a while. Please try again")
          setLogLoad(false)
          setMemDl(false)
          setLogin(false)
          localStorage.removeItem("loged")
          setOpen(false)
        }
      })
      .catch((error) => {
          alert("System will be temporary error for a while. Please try again")
          setLogLoad(false)
          setMemDl(false)
          setLogin(false)
          localStorage.removeItem("loged")
          setOpen(false)
      });
  }

  const loginAction = (action) => {
    let provider = null
    switch (action) {
      case 1:
        provider = new GoogleAuthProvider();
        break;
      case 2:
        provider = new TwitterAuthProvider();
        break;
      case 3:
        provider = new OAuthProvider("yahoo.com");
        break;
      default:
        return;
    }
    setLogLoad(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        fetch(Fet().ul + '/cgm48/checklogin?i=' + result.user.uid  , {
          method :'get'
      })
        .then(response => response.text())
        .then(data => {
          setAnchorEl(null)
          if (data == 'true') {
            localStorage.setItem("loged", JSON.stringify(result));
            FetchKami(Fet().ul)
          } else {
            setLogLoad(false)
            setLogin(false)
            deleteUser(result.user);
            Swal.fire({
              title: 'User not found',
              text: 'This user don\'t be register to our system. please try again.',
              icon: 'error'
            })
          }
        });
      })
      .catch((error) => {
        // Handle error.
        setAnchorEl(null)
        setOpen(false)
        setLogLoad(false)
        setMemDl(false)
        Swal.fire({
          title: 'Login error or canceled by user',
          text: 'For exclusive feature. You need to login Fan Space Membership.',
          icon: 'warning'
        })
      });
  }

  const errorlog = (response) => {
    setLogLoad(false)
    console.log(response);
  }

  const Signout = (response) => {
    setLogLoad(false)
    setMemDl(false)
    setLogin(false)
    localStorage.removeItem("loged")
    localStorage.removeItem("i")
    setOpen(false)
    setKname('')
    setKami('')
    if (window.location.pathname == '/account') {
      History.push('/')
    }
  }

  const setTokenDialog = () => {
    setLoadToken(true)
    fetch(uri + '/bnk48/upttokenid?i='  + (JSON.parse(localStorage.getItem("loged")).googleId).toString() + '&wallet=' + survey, {
      method :'post'
  })
      .then(response => response.text())
      .then(data => {
        if (data == "true") {
          setMemDl(false)
          Swal.fire({
            title: 'Your iAM Wallet code has been link to Fan Space successfully.',
            icon: 'success',
            iconColor: 'rgb(203, 150, 194)'
          }).then(() => {
            window.location.reload()
          })
        } else {
          setLoadToken(false)
          Swal.fire({
            title: 'Your iAM Wallet code is incorrect.',
            icon: 'error',
            iconColor: 'rgb(203, 150, 194)'
          })
        }
      }).catch(() => {
        setLoadToken(false)
        Swal.fire({
          title: 'Cannot connect to server. please try again',
          icon: 'error',
          iconColor: 'rgb(203, 150, 194)'
        })
      })
   
  }

  if (uri != '' && allDone) {
    return (<>
       <Slide in={localStorage.getItem('lowgraphic') == null && width > 1100 ? !open : true} timeout={600} direction='down'>
       <AppBar position="sticky" className='bnktheme app-barcurve'>
          <Toolbar>
            {open == false && (
            <IconButton onClick={() => setOpen(true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            )}
            <div className='cur' onClick={()=> History.push('/')}>
              <Typography variant='h5' className='title'>
               CGM48 Fans Space
              </Typography>
            </div>
                <div className={cls.search + ' mt-2'}>
              {width >1200 && (
                <FormControlLabel
                className={login ? 'pb-3' : ''}
                control={
                  <Switch
                    checked={Reduce}
                    name="reduce"
                    onChange={()=> ReduceAction()}
                    color="secondary"
                  />
                }
                label={Reduce ? "Focus on Efficiency" : "Focus on Modern"}
              />
              )}
               {login&& (
                 <ListItemIcon onClick={() => setMemDl(true)} className={(width >1200 ? 'mt-2' : '') + ' cur'}>
                 <Badge
                   overlap="circular"
                   anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'right',
                   }}
                   badgeContent={kamiimg != '' && kamiimg != '-' ? <img src={kamiimg} data-toggle="tooltip" data-placement="top" title={"\"" + kamin + "\" is your Kami-Oshi"} className={cls.sm + ' border border-white rounded-circle cir avatarlimit'} /> : ''}
                 >
                  <Avatar alt={localStorage.getItem("i")} src={JSON.parse(localStorage.getItem("loged")).user.photoURL} />
                 </Badge>
                 </ListItemIcon>
              )}
              </div>
          </Toolbar>
        </AppBar>
       </Slide>

        <Drawer
                  className={cls.drawer}
                  variant="temporary"
                  color="primary"
                  anchor="left"
                  open={open}
                  classes={{
                    paper: cls.drawerPaper,
                  }}
                >
                <div className={cls.drawerHeader} position="fixed">
                  <IconButton onClick={() => setOpen(false)} size="large">
                    <CloseIcon />
                  </IconButton>
                </div>
                <Divider />
                <d onClick={() => setOpen(false)}>
                <ListItem component={Link} className={window.location.pathname == '/' ? 'activeNav' : ''} to='/' button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem component={Link} to='/memberlist' className={window.location.pathname == '/memberlist' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Members" />
                </ListItem>
                <ListItem component={Link} to='/news' className={window.location.pathname == '/news' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="News" />
                </ListItem>
                <ListItem component={Link} onClick={()=> window.open('//bnk48fan.cpxdev.tk/janken', '_blank')} button>
                  <ListItemIcon>
                    <HowToVoteIcon />
                  </ListItemIcon>
                  <ListItemText primary='BNK48 and CGM48 Janken Tournament 2023' secondary='External link: BNK48 fan Space' />
                </ListItem>
                <ListItem component={Link} to='/livestream' className={window.location.pathname == '/livestream' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <LiveTvIcon className={spcLive ? 'text-success' : ''} />
                  </ListItemIcon>
                  <ListItemText primary="Special Live" secondary={spcLive ? 'Livestream is launching' : ''} />
                </ListItem>
                <ListItem component={Link} to='/mv' className={window.location.pathname == '/mv' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <YouTubeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Music Video" />
                </ListItem>
                <ListItem component={Link} to='/music' className={window.location.pathname == '/music' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <MusicNoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Released album and single" />
                </ListItem>
                <ListItem component={Link} to='/officialupdate' className={window.location.pathname == '/officialupdate' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Official Update" />
                </ListItem>
                <ListItem component={Link} onClick={()=> window.open('//bnk48fan.cpxdev.tk/ge3', '_blank')} button>
                  <ListItemIcon>
                    <HowToVoteIcon />
                  </ListItemIcon>
                  <ListItemText primary='BNK48 12th Single General Election' secondary='External link: BNK48 fan Space' />
                </ListItem>
                <ListItem component={Link} to='/requesthour' className={window.location.pathname == '/requesthour' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <TheatersIcon />
                  </ListItemIcon>
                  <ListItemText primary='BNK48 and CGM48 Request Hour 2022' />
                </ListItem>
                <ListItem component={Link} to='/api' className={window.location.pathname == '/api' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText primary='API' />
                </ListItem>
                <ListItem component={Link} to='/follow' className={window.location.pathname == '/follow' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <ThumbUpAltIcon />
                  </ListItemIcon>
                  <ListItemText primary='Follow and Support' />
                </ListItem>
                {!login && (
                  <ListItem component={Link} to='/register' className={window.location.pathname == '/register' ? 'activeNav' : ''} button>
                  <ListItemIcon>
                    <AssignmentReturnedIcon />
                  </ListItemIcon>
                  <ListItemText primary='Register Membership' secondary='Public Beta State' />
                </ListItem>
                )}
                </d>
                <Divider />
                <ListItem onClick={() => {
                  setOpen(false)
                  Swal.fire({
                    title: 'Region mode will enhance system performance. Current region connection has been referenced by IP address',
                    showDenyButton: true,
                    confirmButtonText: 'View System Status',
                    denyButtonText: `Close`,
                    icon: 'info',
                    iconColor: 'rgb(203, 150, 194)'
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      window.open('//status.cpxdev.tk', '_blank')
                    }
                  })
                }} button>
                  <ListItemIcon>
                    <DnsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Region: ' + Fet().nme} />
                </ListItem>
                {
                  loginLoad ? (
                    <ListItem onClick={() => setMemDl(true)} button>
                    <ListItemIcon>
                    <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="40px" />
                    </ListItemIcon>
                    <ListItemText primary="Signing in" />
                  </ListItem>
                  ) : (
                    <>
                      {!login ? (
                        <>
                        <ListItem onClick={(e) => setAnchorEl(e.currentTarget)} button>
                        <ListItemIcon>
                          <VpnKeyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login Fan Space Membership" secondary='Public Beta State'/>
                      </ListItem>
                        <Menu
                          id="lock-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={() => setAnchorEl(null)}
                        >
                          <MenuItem onClick={(e) => loginAction(1)}>Google Account</MenuItem>
                          <MenuItem onClick={(e) => loginAction(2)}>Twitter Account</MenuItem>
                          <MenuItem onClick={(e) => loginAction(3)}>Yahoo Account</MenuItem>
                        </Menu>
                        </>
                ) : (
                  <ListItem onClick={() => setMemDl(true)} button>
                  <ListItemIcon>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    badgeContent={kamiimg != '' && kamiimg != '-' ? <img src={kamiimg} data-toggle="tooltip" data-placement="top" title={"\"" + kamin + "\" is your Kami-Oshi"} className={cls.sm + ' border border-white rounded-circle cir avatarlimit'} /> : ''}
                  >
                    <Avatar alt={localStorage.getItem("i")} src={JSON.parse(localStorage.getItem("loged")).user.photoURL} />
                  </Badge>
                  
                  </ListItemIcon>
                  <ListItemText primary="You're logged in" secondary={localStorage.getItem("i")} />
                </ListItem>
                )}
                    </>
                  )
                }
                
                
                </Drawer>
                <div style={{marginBottom: footerHeight + 'px'}}>
                <BasicSwitch>
                  <Route exact path="/" render={() => <Home fet={Fet().ul} gp={Reduce} ImgThumb={ImgThumb} stream={stream} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/memberlist" render={() => <MemberList fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/livestream" render={() => <LiveCom fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/member/:c" render={() => <MamSam fet={Fet().ul} kamio={kamin} setSec={(v) => setSec(v)} triggerUpdate={() =>  FetchKami(Fet().ul)} width={width} />} />
                  <Route path="/news" render={() => <News fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/mv" render={() => <MvCom gp={Reduce} fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/music" render={() => <MusicCom gp={Reduce} fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/officialupdate" render={() => <Offici fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/api" render={() => <Api fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/mana" render={() => <Mana fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/follow" render={() => <FollowCom fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/requesthour" render={() => <RequestCom fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/register" render={() => <RegisCom fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  <Route path="/48group" render={() => <Fenetwork fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                  {
                    login && (
                      <Route path="/account" render={() => <Account fet={Fet().ul} setSec={(v) => setSec(v)} width={width} />} />
                    )
                  }

                  <Route exact render={() => <PageErr setSec={(v) => setSec(v)} width={width} />} />
                </BasicSwitch>
                </div>
                
                      
                  
        <footer className={'fixed-bottom text-center text-dark bg-light pt-2'} ref={ref}>
          Copyright {new Date().getFullYear()}, CPXDevStudio Allright Reserved
          <br /> All BNK48 and CGM48 contents are licensed by Independent Artist Management (iAM). These member images and all events poster is objective for CGM48 supporting only.
        </footer>


        {localStorage.getItem("loged") != null && (
           <Dialog
           open={localStorage.getItem("loged") != null ? MemberDl : false}
           onClose={() => setMemDl(false)}
           fullWidth={true}
           maxWidth='sm'
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description"
          
       >
           <DialogTitle id="alert-dialog-title">Are you sure to sign-out</DialogTitle>
           <DialogContent>
             {kamin != '-' ? (
           <ListItem onClick={() => {
            const last = window.location.href
              History.push("/member/" + kamin.toLowerCase())
              if (last.includes('/member')) {
                History.go(0)
              }
              setMemDl(false)
           }} button>
               <ListItemIcon>
               <img src={kamiimg} className={cls.lg + ' border border-white rounded-circle cir avatarlimit'} />
             </ListItemIcon>
             <ListItemText primary={'Your Kami-Oshi is ' + kamin + ' CGM48'} secondary={newspop.length > 0 && newspop.filter(x => ((x.memtag.indexOf(kamin.toLowerCase()) > -1 || x.memtag.indexOf('All') > -1 || x.memtag.indexOf('ge') > -1) && x.timerange[1] == 0) || ((x.memtag.indexOf(kamin.toLowerCase()) > -1 || x.memtag.indexOf('All') > -1 || x.memtag.indexOf('ge') > -1) && x.timerange[1] > 0 && moment().unix() <= x.timerange[1])).length > 0 ? 'Your Kami-Oshi have ' + newspop.filter(x => x.memtag.indexOf(kamin.toLowerCase()) > -1 || x.memtag.indexOf('All') > -1 || x.memtag.indexOf('ge') > -1).length +' incoming event(s). Click here to check it!' : 'Click here to see more description of your Kami-Oshi'} />
              </ListItem>
             ) : (
           <ListItem button>
               <ListItemIcon>
                         <Avatar src="" />
                       </ListItemIcon>
                       <ListItemText primary="You don't have any Kami-Oshi" secondary='Please choose your member which you love only once person.' />
                       </ListItem>
             )}
              {/* {tokenID != '' ? (
           <ListItem onClick={() => {
            navigator.clipboard.writeText(tokenID);
            alert('Your Wallet code has copied to clipboard');
           }} button>
             <ListItemText primary={'Your Token balance' + (point < 0.01 && tokenID != '' ? ' (Your BNK token is insufficient)' : '')} secondary={point + ' Token (s)'} />
             </ListItem>
             ) : (
               <>
                 <ListItem>
                       <ListItemText primary="Now you can also check BNK Token balance from this site" secondary='Please enter your iAM wallet code below in first time (Check it in iAM48 application)' />
                       </ListItem>
                <ListItem>
                      <ListItemText primary={(<TextField value={survey} onChange={(e) => setSur(e.target.value)} fullWidth label="Enter your wallet code here" disabled={TokenLoad} />)} secondary={TokenLoad == false ? (<Button onClick={() => setTokenDialog()} variant="contained" className='mt-1' color='primary'>Add</Button>):(<img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" className='mt-2' width="40px" />)} />
                </ListItem>
               </>
             )} */}
                     <ListItem className='text-info' button>
                       <ListItemText primary='Feature will be unavaliable when you not sign in' secondary='Choose and share your Kami-Oshi member, Fandom group view and add new event' />
                     </ListItem>
           </DialogContent>
           <DialogActions>
           <Button onClick={(e) => {Signout(e)}} className="text-danger">
               Sign out
           </Button>
           <Button onClick={(e) => {History.push('/account'); setMemDl(false); setOpen(false)}} className="text-dark">
               Account Studio (Beta)
           </Button>
           <Button onClick={(e) => {setMemDl(false)}} className="text-dark">
               Close
           </Button>
           </DialogActions>
       </Dialog>
        )}
       
       {newspop.length >0 && window.location.pathname != '/mana'  && window.location.pathname != '/member' && (
        <Dialog
      open={EvtPop}
      onClose={() => {
        setpopup(false)
        sessionStorage.setItem("ads", 'i')
      }}
      maxWidth='md'
      scroll='body'
TransitionComponent={Grow}
transitionDuration={500}
  >
    
    {newspop.length > 1 ?
    (<Carousel interval={8000}>{
      newspop.map((item, i) => (
        <>
        <DialogTitle id="alert-dialog-title">Advertisement - {item.title}</DialogTitle>
          <DialogContent>
            <CardContent>
              <CardMedia src={item.src} component="img" width={80} />
              <Typography className='mt-3' variant="body2" component="p">
                  {item.desc}
              </Typography>
            {item.timerange[0] > 0 && item.timerange[1] == 0 && (
             <p className='mt-1 mb-3'>
                This event has been started since <b>{moment.unix(item.timerange[0]).format('ddd DD MMMM yyyy')}</b>
            </p>
            )}
             {item.timerange[0] > 0 && item.timerange[1] > 0 && item.timerange[0] < item.timerange[1] && (
             <p className='mt-1 mb-3'>
                This event has been started in <b>{moment.unix(item.timerange[0]).format('ddd DD MMMM yyyy H:mm A')}</b> to <b>{moment.unix(item.timerange[1]).format('ddd DD MMMM yyyy H:mm A')}</b>
            </p>
            )}

              <a onClick={() => {
                if (item.link.includes('https://')) { window.open(item.link, '_blank') } else {History.push(item.link); setpopup(false);
              }}} className='mt-1'>
                  Reference Link
              </a>
            <br />
              {
                item.place != '' && item.place.includes('IAMP') && (
                  <a href={item.placeobj.ref} target='_blank' className='mt-1' data-toggle="tooltip" data-placement="down" title={item.placeobj.placeDesc}>
                     <LocationOnIcon/> Location: {item.placeobj.placeName + ", " + item.placeobj.placeProvince}
                  </a>
                )
              }
               {
                item.place != '' && !item.place.includes('IAMP') && (
                  <a href={item.place} target='_blank' className='mt-1'>
                     <LocationOnIcon/> Where is this event?
                  </a>
                )
              }
              <br/>
              {item.memtag.length > 0 && (<div>
                Member included {
                  (item.memtag.map((nametag, ii) => (
                    <a href={nametag == 'All' || nametag == 'ge' ? ("/memberlist") :nametag.includes('gen') ? ("/memberlist?filter=gen&val=" + nametag.replace("gen" , "")) : ("/member/" + nametag)} target='_blank'>
                    {nametag == 'ge' ? 'All 48 winners of BNK48 12th Single Senbutsu General Election' : nametag.includes('gen') === true ? 'CGM48 Generation ' + nametag.replace("gen" , "") : (ii == 0 ? capitalizeFirstLetter(nametag) : ', ' + capitalizeFirstLetter(nametag))}
                    </a>
                  )))
                }
              </div>)}
            </CardContent>
          </DialogContent>
        </>
      ))
    }</Carousel>) : (
      <>
      <DialogTitle id="alert-dialog-title">Advertisement - {newspop[0].title}</DialogTitle>
        <DialogContent>
          <CardContent>
            <CardMedia src={newspop[0].src} component="img" width={80} />
            <Typography className='mt-3 tw' variant="body2" component="p">
                {newspop[0].desc}
            </Typography>

            {newspop[0].timerange[0] > 0 && newspop[0].timerange[1] == 0 && (
             <p className='mt-1 mb-3'>
                This event has been started since <b>{moment.unix(newspop[0].timerange[0]).format('ddd DD MMMM yyyy')}</b>
            </p>
            )}
             {newspop[0].timerange[0] > 0 && newspop[0].timerange[1] > 0 && newspop[0].timerange[0] < newspop[0].timerange[1] && (
             <p className='mt-1 mb-3'>
                This event has been started in <b>{moment.unix(newspop[0].timerange[0]).format('ddd DD MMMM yyyy H:mm A')}</b> to <b>{moment.unix(newspop[0].timerange[1]).format('ddd DD MMMM yyyy H:mm A')}</b>
            </p>
            )}
            <a onClick={() => {
                if (newspop[0].link.includes('https://')) { window.open(newspop[0].link, '_blank') } else {History.push(newspop[0].link); setpopup(false);
              }}} className='mt-1'>
                Reference Link
            </a>
            <br />
              {
                newspop[0].place != '' && newspop[0].place.includes('IAMP') && (
                  <a href={newspop[0].placeobj.ref} target='_blank' className='mt-1' data-toggle="tooltip" data-placement="down" title={newspop[0].placeobj.placeDesc}>
                     <LocationOnIcon/> Location: {newspop[0].placeobj.placeName + ", " + newspop[0].placeobj.placeProvince}
                  </a>
                )
              }
               {
                newspop[0].place != '' && !newspop[0].place.includes('IAMP') && (
                  <a href={newspop[0].place} target='_blank' className='mt-1'>
                     <LocationOnIcon/> Where is this event?
                  </a>
                )
              }
               {newspop[0].memtag.length > 0 && (<div>
                Member included {
                  (newspop[0].memtag.map((nametag, ii) => (
                    <a href={nametag == 'All' || nametag == 'ge' ? ("/memberlist") :nametag.includes('gen') ? ("/memberlist?filter=gen&val=" + nametag.replace("gen" , "")): ("/member/" + nametag)} target='_blank'>
                    {nametag == 'ge' ? 'All 48 winners of BNK48 12th Single Senbutsu General Election' : (ii == 0 ? capitalizeFirstLetter(nametag) : nametag.includes('gen') ? 'CGM48 Generation ' + nametag.replace("gen" , "") : ', ' + capitalizeFirstLetter(nametag))}
                    </a>
                  )))
                }
              </div>)}
          </CardContent>
        </DialogContent>
      </>
    )}
    
      <DialogActions>
      <Button onClick={() => {
        setpopup(false)
      }} className="text-dark">
          Close
      </Button>
      </DialogActions>
  </Dialog>
       )}
       </>
  )
  }
  
  return (
    <div className="container mt-5 mb-5">
      {width > 900 ? (
         <div className="row" onDoubleClick={() => setAllDone(true)}>
         <Fade in={styleFade != 0 ? true : false} timeout={400} style={{ transitionDelay: styleFade == 2 ? 0 : 400 }}>
           <div className="col pr-0">
               <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/pc/1.jpg" width="100%" />
           </div>
         </Fade>
         <Fade in={styleFade != 0 ? true : false}  timeout={400} style={{ transitionDelay: styleFade == 2 ? 200 : 200 }}>
           <div className="col p-0">
               <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/pc/2.jpg" width="100%" />
           </div>
         </Fade>
           <Fade in={styleFade != 0 ? true : false}  timeout={400} style={{ transitionDelay: styleFade == 2 ? 400 :  0 }}>
           <div className="col pl-0">
               <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/pc/3.jpg" width="100%" />
           </div>
         </Fade>
         <Grow in={uri != '' && geready ? true : false} timeout={1000}>
         <div className={cls.fabButton}>
             <Alert severity="info">
             <AlertTitle>Move forward to 2023 with 3rd Original song of CGM48 "2565" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
               Double click or tap on image to skip this page
             </Alert>
             </div>
         </Grow>
         <Grow in={uri != '' && !geready ? true : false} timeout={1000}>
         <div className={cls.fabButton}>
             <Alert severity="info">
             <AlertTitle>Move forward to 2023 with 3rd Original song of CGM48 "2565" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
                     Double click/tap here on image or wait 5 seconds to skip this page
             </Alert>
             </div>
         </Grow>
       </div>
      ) : (
        <div className="row" onDoubleClick={() => setAllDone(true)}>
        <Fade in={styleFade != 0 ? true : false} timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 0 : 350 }}>
          <div className="col pr-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/1.jpg" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1250 : 450 }}>
          <div className="col p-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/2.jpg" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1350 : 550 }}>
          <div className="col pl-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/3.jpg" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 250 :  650 }}>
          <div className="col pr-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/4.jpg" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1150 :  750 }}>
          <div className="col p-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/5.jpg" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1450 :  850 }}>
          <div className="col pl-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/6.jpg" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 350 :  950 }}>
          <div className="col pr-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/7.jpg" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1050 :  1050 }}>
          <div className="col p-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/8.jpg" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1550 :  1150 }}>
          <div className="col pl-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/9.jpg" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 450 :  1250 }}>
          <div className="col pr-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/10.jpg" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 950 :  1350 }}>
          <div className="col p-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/11.jpg" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1650 :  1450 }}>
          <div className="col pl-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/12.jpg" width="100%" />
          </div>
        </Fade>
          <div className="w-100"></div>
          <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 550 :  1550 }}>
          <div className="col pr-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/13.jpg" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 850 :  1650 }}>
          <div className="col p-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/14.jpg" width="100%" />
          </div>
        </Fade>
        <Fade in={styleFade != 0 ? true : false}  timeout={styleFade == 2 ? 300 : 500} style={{ transitionDelay: styleFade == 2 ? 1650 :  1450 }}>
          <div className="col pl-0">
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/phone/15.jpg" width="100%" />
          </div>
        </Fade>
        <Grow in={uri != '' && geready ? true : false} timeout={1000}>
        <div className={cls.fabButton}>
            <Alert severity="info">
              <AlertTitle>Move forward to 2023 with 3rd Original song of CGM48 "2565" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
              Double click or tap on image to skip this page
            </Alert>
            </div>
        </Grow>
        <Grow in={uri != '' && !geready ? true : false} timeout={1000}>
        <div className={cls.fabButton}>
            <Alert severity="info">
            <AlertTitle>Move forward to 2023 with 3rd Original song of CGM48 "2565" on both Youtube Music Video and Music Streaming Platform</AlertTitle>
                    Double click/tap here on image or wait 5 seconds to skip this page
            </Alert>
            </div>
        </Grow>
      </div>
      )}
  </div>
  )
}

export default App;







