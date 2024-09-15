import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Fade, Grow, CardActionArea, CardHeader , Typography, Zoom, Link, Breadcrumbs, Button, Drawer, ButtonGroup, IconButton, Slide, CardContent, List , Grid,Backdrop,Avatar } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import CountUp from 'react-countup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import CakeIcon from '@material-ui/icons/Cake';
import GroupIcon from '@material-ui/icons/Group';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PanToolIcon from '@material-ui/icons/PanTool';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import moment from 'moment'

import { Share } from 'react-twitter-widgets'

import { Fireworks } from 'fireworks-js/dist/react'
import Swal from 'sweetalert2'
import AOS from "aos";

import IRBio from './ir/bio'

var pm = new Audio('https://cdn.pixabay.com/download/audio/2022/03/14/audio_a791c6fdc8.mp3?filename=firework-show-short-64657.mp3')

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const fwoptions = {
    speed: 3,
  }

  const fwstyle = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: 'transperent'
  }

  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    drawer: {
        width: window.innerWidth < 700 ? '85%' : 400,
        flexShrink: 0,
      },
      drawerPaper: {
          width: window.innerWidth < 700 ? '85%' : 400,
      },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
  }));

  const hbdparse = [
    "May this special day bring you endless joy and tons of precious memories!",
    "Today is the birthday of the person who is spreading joy and positivity all around. May your birthday and your life be as wonderful as you are!",
    "Your birthday only comes once a year, so make sure this is the most memorable one ever and have a colorful day.",
    "Wishing you a wonderful day and all the most amazing things on your Big Day!"
]

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    const MemDetail = ({fet, kamio, setSec, triggerUpdate, width, verify}) => {
        let { c } = useParams()

        const classes = useStyles();
        const [open, setOpen] = React.useState(false);
        const [irtog, setIRtog] = React.useState(false);
        const History = useHistory()
        const [mem, setmem] = React.useState('');
        const [arr, setArr] = React.useState([]); 
        const [janken, setJanken] = React.useState(null); 
        const [Loaded, setLoaded] = React.useState(false);
        const [change, setChange] = React.useState(false);
        const [birthday, setBirthday] = React.useState(false);
        const [kami, setKami] = React.useState(0);
        const [follower2, setFol2] = React.useState(0);
        const [newspop, setNewspop] = React.useState(null);
        const [follower, setFol] = React.useState(0);
        const [countstep, setCount] = React.useState(false);
        const [loadfollow, setFollow] = React.useState(true);
        const [memLive, setMemLive] = React.useState(null);

        const [v, setV] = React.useState(false);
        
        const [play, onPlay] = React.useState(false);
        const [GEPoster, setGEPoster] = React.useState('');
        const [GEPro, setGEPromote] = React.useState('');
        const [fol, setFollowName] = React.useState('');
        const [live, setLive] = React.useState(null);


        const numberWithCommasx = (x) => {
            return parseInt(x).toLocaleString('en-US');
        }


        const fetchfollower = (name) => {
            setFollowName(name)
            setFollow(true)
            fetch(fet + '/cgm48/getfollower?name=' + name  , {
                method :'post'
            })
              .then(response => response.text())
              .then(data => {
                setFol(data.split(',')[1])
                setFol2(data.split(',')[0])
                setFollow(false)
              }).catch(() => {
                setFol(-1)
                setFollow(false)
              });
        }

        const fetchLoad = () => {
           
            setKami(0)
            fetch(fet + '/cgm48/getcgmkami?i=' + (JSON.parse(localStorage.getItem("loged")).user.uid).toString()  , {
                method :'get'
            })
              .then(response => response.json())
              .then(data => {
                setV(data.verified)
                if (data.obj != 'none' && (data.obj.name).toLowerCase() == c) {
                  setKami(2)
                } else {
                  setKami(1)
                }
              });
        }

        const BirthdayCheck = (val) => {
            fetch(fet + '/cgm48/getmemberbybirth?tz=' + Intl.DateTimeFormat().resolvedOptions().timeZone, {
            method :'post'
        })
            .then(response => response.json())
            .then(data => {
                if (data.count > 0) {
                     const arr = (data.response)
                     const i = arr.findIndex(x => x.name == val)
                     if (i > -1) {
                        //navigator.vibrate(1000);
                        setBirthday(true)
                        if (val == capitalizeFirstLetter(kamio)) {
                            navigator.vibrate([50, 50,50, 50,50, 50]);
                            JankenCong()

                            setTimeout(() => {
                                if (localStorage.getItem('kamibirth') == null) {
                                    Swal.fire({
                                        title: "Don't be alarmed. This is new feature for Fan Space Membership. you maybe feel vibrate from your device when today is your Kami-Oshi's birthday.",
                                        icon: 'info',
                                        iconColor: '#49C5A8',
                                      }).then(() => {
                                        window.localStorage.setItem('kamibirth', '')
                                      })
                                }
                            }, 7000);
                        }
                     }
                } else {
                    setBirthday(false)
                }
            });
        }

        const PlaySong = () => {
            if (pm.paused) { 
                pm.play()
                onPlay(true)
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.metadata = new window.MediaMetadata({
                        title: 'Happy Birthday, ' + arr[0].name +'!',
                        artist: hbdparse[Math.floor(Math.random() * 4)],
                        artwork: [
                            { src: arr[0].img, sizes: '500x500' },
                        ],
                        album: 'CGM48 Fans Space platform'
                    });
                }
                var loop = setInterval(function () {
                    if (pm.paused) { 
                        clearInterval(loop)
                        onPlay(false)
                    }
                }, 100);
            }
        }

        const JankenCong = () => {
            onPlay(true)
            setTimeout(() => {
                onPlay(false)
            }, 5000);
        }

        const Subsc = (val) =>{
            if (localStorage.getItem("loged") == null)
            {
                Swal.fire({
                    title: "You need to login to set this member to your Kami-Oshi.",
                    icon: 'warning',
                    iconColor: '#49C5A8',
                  })
            } else {
                if (arr[0].graduated == true) {
                    Swal.fire({
                        title: arr[0].name +" BNK48 is graduated",
                        icon: 'error',
                        text: 'This member is graduated. You cannot select this member to your Kami-Oshi anymore.',
                      })
                    return false
                }
                if (localStorage.getItem("loged") != null && kamio != ''  && kamio != '-') {
                    Swal.fire({
                        title: 'Confirm to Change your Kami-Oshi',
                        text: "You will change Kami-Oshi from \"" + capitalizeFirstLetter(kamio) + "\" to \"" + capitalizeFirstLetter(val) + "\". Are you sure?",
                        icon: 'question',
                        iconColor: '#49C5A8',
                        footer: 'Notes: Since 2 March 2023, You can change your Kami-Oshi only one time per month.',
                        showCancelButton: true
                      }).then((result) => {
                        if (result.isConfirmed) {
                            setChange(true)
                            fetch(fet + '/cgm48/uptcgmKami?i=' + (JSON.parse(localStorage.getItem("loged")).user.uid).toString() + '&name=' + val, {
                                method: 'POST', // or 'PUT'
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                })
                                .then(response => response.text())
                                .then(data => {
                                    setChange(false)
                                    if (data == "true") {
                                        fetchLoad()
                                        triggerUpdate()
                                    } else {
                                        if (verify) {
                                            Swal.fire({
                                                title: "You just changed Kami-Oshi not long ago.",
                                                icon: 'warning',
                                                text: 'We recommend that you maybe change your Kami-Oshi on next month.',
                                              })
                                        } else {
                                            Swal.fire({
                                                title: "Fan Space Membership Account is not verified.",
                                                icon: 'warning',
                                                text: 'Please verify your account then choose or change your Kami-Oshi again.',
                                              })
                                        }
                                    }
                                })
                                .catch((error) => {
                                    alert("System will be temporary error for a while. Please try again")
                                    setChange(false)
                                    setKami(1)
                                });
                        }
                      })
                } else if (kamio == '-') {
                    setChange(true)
                    fetch(fet + '/cgm48/uptcgmKami?i=' + (JSON.parse(localStorage.getItem("loged")).user.uid).toString() + '&name=' + val, {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        })
                        .then(response => response.text())
                        .then(data => {
                            setChange(false)
                            if (data == "true") {
                                fetchLoad()
                                triggerUpdate()
                            } else {
                                if (verify) {
                                    Swal.fire({
                                        title: "You just changed Kami-Oshi not long ago.",
                                        icon: 'warning',
                                        text: 'We recommend that you maybe change your Kami-Oshi on next month.',
                                      })
                                } else {
                                    Swal.fire({
                                        title: "Fan Space Membership Account is not verified.",
                                        icon: 'warning',
                                        text: 'Please verify your account then choose or change your Kami-Oshi again.',
                                      })
                                }
                            }
                        })
                        .catch((error) => {
                            alert("System will be temporary error for a while. Please try again")
                            setChange(false)
                            setKami(1)
                        });
                  } else {
                      setKami(0)
                    fetch(fet + '/cgm48/getcgmkami?i=' + (JSON.parse(localStorage.getItem("loged")).googleId).toString()  , {
                        method :'get'
                    })
                      .then(response => response.json())
                      .then(data => {
                        setKami(1)
                        setV(data.verified)
                        if (data.obj != 'none') {
                            Swal.fire({
                                title: 'Confirm to Change your Kami-Oshi',
                                text: "You will change Kami-Oshi from \"" + capitalizeFirstLetter(kamio) + "\" to \"" + capitalizeFirstLetter(val) + "\". Are you sure?",
                                icon: 'question',
                                iconColor: '#49C5A8',
                                footer: 'Notes: Since 2 March 2023, You can change your Kami-Oshi only one time per month.',
                                showCancelButton: true
                              }).then((result) => {
                                if (result.isConfirmed) {
                                    setChange(true)
                                    fetch(fet + '/cgm48/uptcgmKami?i=' + (JSON.parse(localStorage.getItem("loged")).user.uid).toString() + '&name=' + val, {
                                        method: 'POST', // or 'PUT'
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        })
                                        .then(response => response.text())
                                        .then(data => {
                                            setChange(false)
                                            if (data == "true") {
                                                fetchLoad()
                                                triggerUpdate()
                                            } else {
                                                if (verify) {
                                                    Swal.fire({
                                                        title: "You just changed Kami-Oshi not long ago.",
                                                        icon: 'warning',
                                                        text: 'We recommend that you maybe change your Kami-Oshi on next month.',
                                                      })
                                                } else {
                                                    Swal.fire({
                                                        title: "Fan Space Membership Account is not verified.",
                                                        icon: 'warning',
                                                        text: 'Please verify your account then choose or change your Kami-Oshi again.',
                                                      })
                                                }
                                            }
                                        })
                                        .catch((error) => {
                                            alert("System will be temporary error for a while. Please try again")
                                            setChange(false)
                                            setKami(1)
                                        });
                                }
                              })
                        } else {
                            setChange(true)
                            fetch(fet + '/cgm48/uptcgmKami?i=' + (JSON.parse(localStorage.getItem("loged")).user.uid).toString() + '&name=' + val, {
                                method: 'POST', // or 'PUT'
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                })
                                .then(response => response.text())
                                .then(data => {
                                    setChange(false)
                                    if (data == "true") {
                                        fetchLoad()
                                        triggerUpdate()
                                    } else {
                                        if (verify) {
                                            Swal.fire({
                                                title: "You just changed Kami-Oshi not long ago.",
                                                icon: 'warning',
                                                text: 'We recommend that you maybe change your Kami-Oshi on next month.',
                                              })
                                        } else {
                                            Swal.fire({
                                                title: "Fan Space Membership Account is not verified.",
                                                icon: 'warning',
                                                text: 'Please verify your account then choose or change your Kami-Oshi again.',
                                              })
                                        }
                                    }
                                })
                                .catch((error) => {
                                    alert("System will be temporary error for a while. Please try again")
                                    setChange(false)
                                    setKami(1)
                                });
                        }
                      }).catch(() => {
                        setKami(1)
                      })
                  }
            }
        }

        const getJanken = (mem) => {
            fetch(fet + '/bnk48/getjanken2023?member=' + mem, {
                method :'post'
            })
                .then(response => response.json())
                .then(datastatus => {
                    if (datastatus.inRank) {
                        setJanken(datastatus.response)
                        
                        // if (datastatus.response.jankenRank == 1) {
                        //     navigator.vibrate([500, 200]);
                        //     JankenCong()
                        // }
                    }
                }).catch(() => {
                    
                })
        }

        React.useEffect(() => {
            AOS.init({ duration: 1000 });
            document.body.scrollTop = document.documentElement.scrollTop = 0;
           
            if (c != null && c != "") {
                setSec('Loading Member description')

                if (localStorage.getItem("loged") != null) {
                    fetch(fet + '/cgm48/getcgmkami?i=' + (JSON.parse(localStorage.getItem("loged")).user.uid).toString()  , {
                      method :'get'
                  })
                    .then(response => response.json())
                    .then(data => {
                        setV(data.verified)
                      if (data.obj != 'none' && (data.obj.name).toLowerCase() == c) {
                        setKami(2)
                      } else {
                        setKami(1)
                      }
                    });
                  } else {
                    setKami(1)
                  }
                setmem(c)
                fetch(fet + '/cgm48/getmember?name=' + c +'&tstamp=' + Math.floor( new Date().getTime()  / 1000), {
                    method :'post'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.response == 'Not found this member in record.') {
                        History.push("/")
                    } else {
                        if (localStorage.getItem("loged") != null) {
                            fetch(fet + '/cgm48/getmemberlivestatus?i=' + JSON.parse(localStorage.getItem("loged")).user.uid +'&mem=' + data.response.name, {
                                method :'post'
                            })
                                .then(response => response.json())
                                .then(dataads => {
                                    if (dataads.status) {
                                        if (dataads.isLive) {
                                            setLive(dataads)
                                        }
                                    } else {
                                        Swal.fire({
                                            title: "System error",
                                            text: "Contact support",
                                            icon: 'error',
                                          })
                                    }
                                }).catch(() => {
                                    setNewspop([])
                                })
                        }
                        const resp = data.response;
                        fetch(fet + '/cgm48/getadsupdateformem?n=' + resp.name.toLowerCase() + '&g=' + resp.gen + '&t=' + resp.team.toLowerCase(), {
                            method :'post'
                        })
                            .then(response => response.json())
                            .then(dataads => {
                                const obj = dataads.filter(x => x.memtag.indexOf(c.toLowerCase()) > -1 || x.memtag.indexOf('All') > -1 || x.memtag.indexOf('gen' + data.response.gen) > -1 || x.memtag.indexOf('team_' + data.response.team.toLowerCase()) > -1)
                                setNewspop(obj)
                                fetchfollower(data.follower)
                            }).catch(() => {
                                setNewspop([])
                            })
                            // fetch(fet + '/cgm48/memberlivelist', {
                            //     method :'post'
                            // })
                            //     .then(response => response.json())
                            //     .then(dataads => {
                            //         setMemLive(dataads)
                            //     }).catch(() => {
                            //         setMemLive([])
                            //     })
                            setMemLive([])
                        setSec(data.response.name)
                        const temp =[]
                        temp.push(data.response)
                        setArr(temp)
                        setLoaded(true)
                        BirthdayCheck(data.response.name)
                    }
                }).catch(() => {
                    setArr([])
                    setLoaded(true)
                })
            } else {
                History.push("/")
            }
            return (() => {
                pm.pause()
            })
        }, [])
        function numberWithCommas(x) {
            const options = { 
              minimumFractionDigits: 2,
              maximumFractionDigits: 2 
            };
            return Number(x).toLocaleString('en', options);
        }

        const remainEvent = (unixStart) => {
            let start = moment(); // some random moment in time (in ms)
            let end = moment.unix(unixStart); // some random moment after start (in ms)
            const ms = end.diff(start)
            const date = moment.duration(ms)
            // execution
            let f = Math.floor(date.asDays()) + ' Day(s) ' + moment.utc(ms).format("H") + ' Hour(s) ' + moment.utc(ms).format("mm") + ' Minute(s) ';
            return f
        }

        const pageDirect = (link) => {
            if (link.includes('https:') || link.includes('http:')) {
              window.open(link, '_blank')
            } else {
              History.push(link)
            }
          }

        function ordinal_suffix_of(i) {
            var j = i % 10,
                k = i % 100;
            if (j == 1 && k != 11) {
                return i + "st";
            }
            if (j == 2 && k != 12) {
                return i + "nd";
            }
            if (j == 3 && k != 13) {
                return i + "rd";
            }
            return i + "th";
        }
        const tokenrateexchange = 90;

        const session4thAl = (url) => {
            if (localStorage.getItem("loged") == null) {
                Swal.fire({
                   title: "BNK48 4th Album Image",
                   text: "This content is exclusively for CGM48 Fan Space Membership only, please login as Google Account and try again",
                   icon: 'error',
                 })
               } else {
                const img = 'https://cdn.statically.io/gl/cpx2017/iamprofile@main/bnk4thalbum/pcpop/' + url.name.toLowerCase() + '.png'
                Swal.fire({
                    title: "BNK48 4th Album \"Gingham Check\" Image",
                    imageUrl: img,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Download',
                    denyButtonColor: '#3AA504',
                    denyButtonText: 'Listening it!',
                    footer: 'You can hold tap or right click on image then save it to your phone or PC',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      window.open(img, '_blank')
                    } else if (result.isDenied) {
                     window.open('https://bnk48.bfan.link/0810-GinghamCheckTH', '_blank')
                   }
                  })
               }
        }

        const showge4Promote = (u) => {
            Swal.fire({
                title: "BNK48 16th Single Senbatsu General Election Promote Video", html:
                '<iframe width="100%" height="315" src="' + u +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                confirmButtonText: 'Go to GE4 Lobby page'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                History.push('/ge4')
              }
            })
        }

        const showge4 = (u) => {
            Swal.fire({
                title: "BNK48 16th Single Senbatsu General Election Poster Image",
                imageUrl: u,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Download',
                denyButtonColor: '#3AA504',
                denyButtonText: 'Go to GE4 Lobby page',
                footer: 'You can hold tap or right click on image then save it to your phone or PC',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                window.open(u, '_blank')
            } else if (result.isDenied) {
                window.open('https://cp-bnk48.pages.dev/ge4', '_blank')
              }
            })
        }

        return (  
        <>
                <Snackbar open={live != null} autoHideDuration={10000} onClose={() => setLive(null)} anchorOrigin={{ vertical: 'top',
    horizontal: 'center'}}>
        <Alert severity="info" onClick={() => {
            window.open('https://app.bnk48.com/member-live/' + live.link, '_blank')
            setLive(null)
        }}>
            {live != null && (
            <CardHeader title={<h6>{live.member} CGM48 is LIVE now on IAM48 Application. Let's watch it!</h6>} subheader={live.desc} />
            )}
        </Alert>
        </Snackbar>

            <div className="pt-5 pb-2" data-aos="zoom-in" data-aos-duration="300">
                <h3 className={width > 600 ? ' ml-5' : ' ml-3'}>{mem != '' ? 'About ' + capitalizeFirstLetter(mem) + ' CGM48' : 'Fetching Header'}</h3>
                <Breadcrumbs className={width > 600 ? ' ml-5' : ' ml-3'} aria-label="breadcrumb">
                    <Link color="inherit" onClick={() => History.push("/memberlist")}>
                        Members
                    </Link>
                    <Typography color="textPrimary">{capitalizeFirstLetter(mem)}</Typography>
                </Breadcrumbs>
                <hr />
                {Loaded ? (
                    <>
                    {arr.length > 0 && arr.map((item, i) => (
                            <div>
                            <Fade in={play} timeout={{enter:300,exit:500}}>
                            <Fireworks options={fwoptions} style={fwstyle} />
                            </Fade>
                            <Card className={(width > 600 ? ' m-5' : ' m-3') + " pb-2 bnktheme row"} key={i}>
                              <div className={width > 1600 ? 'col-md-3 mb-1' : 'col-lg-3 mb-1'}>
                              <div className='p-3 pt-5' data-aos="zoom-in" data-aos-duration="800">
                                        <Avatar src={item.img} style={{width: '100%', height: '100%'}} />
                                        </div>
                            </div>
                            <div data-aos="fade-in" data-aos-duration="1500">
                                <div className='col-md mt-5 mb-5'>
                                    <h4>{item.fullnameEn[0]} {item.fullnameEn[1]} [{item.name}]</h4>
                                        
                                       {loadfollow ? (
                                            <Skeleton />
                                        ):(
                                            <>
                                            {follower > -1 ? (
                                                <Zoom in={true}>
                                                    <p data-toggle="tooltip" data-placement="bottom" title={item.name + ' CGM48 have ' +numberWithCommasx(follower2) + "  gifts sent on IAM48 Application"}>{countstep == false ? (<CountUp end={follower} onEnd={() => setCount(true)} duration={3} />) : numberWithCommas(follower)} gift rated on IAM48 Application</p>
                                                </Zoom>
                                            ): (
                                                <button className='cur btn btn-info' onClick={() => fetchfollower(fol)}>Something went wrong, please click here to refresh page</button>
                                            )}
                                            </>
                                        )} 
                                        {item.headcaptain != undefined && (
                                            <p className="mb-3 badge badge-pill badge-primary">CGM48 Captain</p>
                                        )}
                                         {item.headcaptain != undefined && (
                                            <br />
                                        )}
                                    <Button onClick={() => Subsc(mem)} className={(kami == 1 ? 'bg-primary' : 'text-dark') + ' mt-3'} variant="contained" disabled={kami == 1 ? false : true}>{kami == 0 && <img className='pb-1' src="https://d3hhrps04devi8.cloudfront.net/main/cgm-circular.svg" width="20px" />} {kami == 2 ? "She's your Kami-Oshi" : kami == 1 ? 'Set as Kami-Oshi' : 'Loading Status'}</Button> 
                                   
                                    <hr />
                                    {item.shihainin != undefined && (
                                    <CardActionArea className="mb-3" onClick={() => History.push('/shihainin')}>
                                            <p class="badge text-light" style={{backgroundColor: "#BF953F"}}>CGM48 Manager (Shihainin)</p>
                                         </CardActionArea>
                                    )}
                                    <br />
                                    {item.captain != undefined && (
                                        <p className="mb-3 badge badge-pill badge-warning">CGM48 {item.captain}</p>
                                    )}
                                   
                                    <>
                                        <h6><LocationOnIcon fontSize="small"/> {item.province}</h6>
                                        {birthday ? (
                                            <h6><CakeIcon fontSize="small"/> Today is her birthday! ({new Date().getFullYear() - new Date(item.birthday).getFullYear() + ' years old'})</h6>
                                        ) : (
                                                 <>
                                                       {moment(item.birthday).format('M') == new Date().getMonth() + 1 && parseInt(moment(item.birthday).format('D')) - new Date().getDate() > 0 ? (<h6><CakeIcon fontSize="small"/> {moment(item.birthday).format('DD MMMM YYYY') + ' (' + (parseInt(moment(item.birthday).format('D')) - new Date().getDate()) + ' day(s) to go)'}</h6>) : (<h6><CakeIcon fontSize="small"/> {moment(item.birthday).format('DD MMMM YYYY')}</h6>)}
                                                  </>
                                        )}
                                        {!item.graduated && (
                                            <>
                                            <p><GroupIcon fontSize="small"/> {item.team != "" ? item.team : 'Trainee'}</p>
                                            <p><AccountCircleIcon fontSize="small"/> {ordinal_suffix_of(item.gen)} Generation</p>
                                            </>
                                        )}
                                        <p><FavoriteIcon fontSize="small"/>&nbsp;
                                            {
                                                item.favorite.length > 0 ? item.favorite.map((its, i) => i == item.favorite.length - 1 ? its : its + ', ') : 'None'
                                            }
                                        </p>
                                        <p><NaturePeopleIcon fontSize="small"/>&nbsp;
                                            {
                                                item.hobby.length > 0 ? item.hobby.map((its, i) => i == item.hobby.length - 1 ? its : its + ', ') : 'None'
                                            }
                                        </p>
                                        {item.graduated && (
                                            <p><PanToolIcon fontSize="small"/> Graduated</p>
                                        )}
                                        {!item.graduated && (
                                            <>
                                            Follow her:&nbsp;
                                            <a className='text-light' href={item.follow[0]} target='_blank'><FacebookIcon/></a>
                                            <a className='text-light' href={item.follow[1]} target='_blank'><InstagramIcon/></a>
                                            <a className='text-light' href={'https://app.bnk48.com/members/cgm48/' + item.name.toLowerCase()} target='_blank'><PhoneIphoneIcon/></a>
                                            </>
                                        )}
                                    </>
                                    <hr />
                                    <a className='text-dark' href={item.ref} target='_blank'>Reference from CGM48 official Site</a>
                                    <br />
                                    {v && birthday && (
                                        <div className='row p-3 mt-3'>
                                            <Button onClick={()=> PlaySong()}color="primary" variant="contained">Click here see effect</Button> 
                                            <div className='ml-3 pt-2'>
                                            <Share 
                                                  url={"https://cp-cgm48.pages.dev/member/" + item.name.toLowerCase()}
                                                  options={{ text: "(You can custom your blessing here)", hashtags: item.name+"CGM48,fanspaceplatform,48groupthailand", size:"large"}}
                                                id='blessingshare'
                                            />
                                            </div>
                                            <br/>
                                            <label className='col-md-12 mt-3 text-muted'>Notes: Click Tweet Button to blessing her on Twitter (Twitter login required)</label>
                                        </div> 
                                    )}
                                    {item.graduated === true && item.graduatedDate != undefined && (
                                        <div className='border border-info pb-3 mt-2 pt-3 rounded text-center'>
                                        <h6>
                                          Member info of {item.name} CGM48 has been plan to removed from CGM48 Fan Space in {moment(item.graduatedDate + ' 00:00:00').utcOffset('+0700').local().format('DD MMMM YYYY HH:mm:ss')}.
                                        </h6>
                                      </div>
                                     )}
                                </div>
                        </div>
                    </Card>
                    {
                    item.ir != undefined && (
                        <Drawer
                        className={classes.drawer}
                                anchor='right'
                                variant="temporary"
                                color="primary"
                                open={irtog}
                                onClose={()=> setIRtog(false)}
                                classes={{
                                    paper: classes.drawerPaper
                                  }}
                            >
                               <IRBio fet={fet} irItem={item.ir} /> 
                        </Drawer>
                    )
                }
                            </div>
                    ))}
                    </>
                ) : (
                    <Grow in={!Loaded} timeout={600}>
                            <div>
                            <Card className={(width > 600 ? ' m-5' : ' m-3') + " pb-2 bnktheme row"}>
                            <div className={width > 1600 ? 'col-md-4 mb-1' : 'col-lg-4 mb-1'}>
                                <Skeleton height={530} />
                            </div>
                                <div className='col-md mt-5 mb-5'>
                                    <Skeleton />
                                    <hr />
                                    <>
                                        <h6><LocationOnIcon fontSize="small"/> <Skeleton /></h6>
                                        <h6><CakeIcon fontSize="small"/> <Skeleton /></h6>
                                        <p><GroupIcon fontSize="small"/> <Skeleton /></p>
                                        <p><AccountCircleIcon fontSize="small"/> <Skeleton /></p>
                                        <p><FavoriteIcon fontSize="small"/>&nbsp;
                                            <Skeleton />
                                        </p>
                                        <p><NaturePeopleIcon fontSize="small"/>&nbsp;
                                            <Skeleton />
                                        </p>
                                        <>
                                            <Skeleton />
                                        </>
                                    </>
                                    <hr />
                                    <Skeleton />
                                </div>
                    </Card>
                            </div>
                    </Grow>
                )}
                <div className='container mt-5'>
                    {newspop != null && newspop.length > 0 && (<h3 className='mb-4' data-aos="flip-up">Incoming events for {capitalizeFirstLetter(mem)} CGM48</h3>)}
                    {newspop != null && (
                    <>
                        {
                            newspop.length > 0 ?  newspop.map((ita, i) => (
                                <Card className='mb-3' data-aos="fade-right">
                                    <CardContent className='row'>
                                        <div className='col-md-5'>
                                        {ita.video != undefined && ita.video != "" ? (
                                            <iframe src={ita.video} width="100%" height={window.innerWidth * (0.4)}></iframe>
                                        ) : (
                                            <img src={ita.src} width="100%" />
                                        )}
                                        </div>
                                        <div className='col-md mt-3'>
                                            <h4 data-aos="zoom-in-right">{ita.title}&nbsp;
                                            {ita.timerange[0] > 0 && ita.timerange[1] == 0 && ita.timerange[0] <= moment().unix() && (
                                                <span className='badge badge-success'>
                                                    Event has been started
                                                </span>
                                                )}
                                                {ita.timerange[0] > 0 && ita.timerange[1] > 0 && ita.timerange[0] < ita.timerange[1] &&
                                                moment().unix() >= ita.timerange[0] && moment().unix() <= ita.timerange[1] && (
                                                <span className='badge badge-success'>
                                                     Event is starting
                                                </span>
                                                )}
                                            </h4>
                                            {ita.timerange[0] > 0 && ita.timerange[0] > moment().unix() && (
                                                <p className='mt-1 mb-3'>
                                                    Event is coming soon in <b>{moment.unix(ita.timerange[0]).format('ddd DD MMMM yyyy H:mm A')} {moment().unix() >= ita.timerange[0] -259200 && moment().unix() < ita.timerange[0] && (
                                                    <i>
                                                        <br /> This event is soon in {remainEvent(ita.timerange[0])}
                                                    </i>
                                                )}</b>
                                                </p>
                                                )}
                                                {ita.timerange[0] > 0 && ita.timerange[1] == 0 && ita.timerange[0] <= moment().unix() && (
                                                <p className='mt-1 mb-3'>
                                                    Event has been started since <b>{moment.unix(ita.timerange[0]).format('ddd DD MMMM yyyy')}</b>
                                                </p>
                                                )}
                                                {ita.timerange[0] > 0 && ita.timerange[1] > 0 && ita.timerange[0] < ita.timerange[1] &&
                                                moment().unix() >= ita.timerange[0] && moment().unix() <= ita.timerange[1] && (
                                                <p className='mt-1 mb-3'>
                                                     Event is starting until <b>{moment.unix(ita.timerange[1]).format('ddd DD MMMM yyyy H:mm A')}</b>
                                                </p>
                                                )}
                                            <p className='text-muted mt-3' data-aos="zoom-in">{ita.desc}</p>
                                            {
                                                ita.link != '' && (
                                                    <div data-aos="fade-down" className='hoversense'>
                                                          <a onClick={() => pageDirect(ita.link)}>More detail of this event</a>
                                                    </div>
                                                )
                                            }
                                             {
                                                ita.place != '' && ita.place.includes('IAMP') && (
                                                <a href={ita.placeobj.ref} target='_blank' className='mt-1' data-toggle="tooltip" data-placement="down" title={ita.placeobj.placeDesc}>
                                                    <LocationOnIcon/> Location: {ita.placeobj.placeName + ", " + ita.placeobj.placeProvince}
                                                </a>
                                                )
                                            }
                                            {
                                                ita.place != '' && !ita.place.includes('IAMP') && (
                                                <a href={ita.place} target='_blank' className='mt-1'>
                                                    <LocationOnIcon/> Where is this event?
                                                </a>
                                                )
                                            }
                                        </div>
                                    </CardContent>
                                </Card>
                            )) : (
                                <Card className="text-center" data-aos="zoom-in-up">
                                    <CardContent>
                                    {capitalizeFirstLetter(mem)} CGM48 doesn't have incoming events right now.
                                    </CardContent>
                                </Card>
                            )
        
                        }
                        </>
                    )}
                </div>


                {/* <div className='container mt-5'>
                    {memLive != null && memLive.length > 0 && (<h3 className='mb-4' data-aos="flip-up">LIVE Schedule for {capitalizeFirstLetter(mem)} CGM48 in IAM48 Application</h3>)}
                    {memLive != null && (
                    <>
                        {
                            memLive.length > 0 ?  memLive.map((ita, i) => mem.toLowerCase() == ita.member && (
                                <Card className='mb-3' data-aos="fade-right">
                                    <CardContent className='row'>
                                        <div className='col-md-5'>
                                            <img src={ita.src} width="100%" />
                                        </div>
                                        <div className='col-md mt-3'>
                                            <h4 data-aos="zoom-in-right">{ita.title}</h4>
                                            <h6 className='mt-1 mb-3'>
                                                LIVE will be started in <b>{moment.utc(ita.date).local().format('DD MMMM YYYY HH:mm:ss')}</b>
                                            </h6>
                                            <p className='mt-1 mb-3'>
                                                LIVE Streaming Platform: <b>{ita.platform}</b>
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )) : (
                                <Card className="text-center" data-aos="zoom-in-up">
                                    <CardContent>
                                    {capitalizeFirstLetter(mem)} CGM48 doesn't have scheduled LIVE in IAM48 Application right now.
                                    </CardContent>
                                </Card>
                            )
        
                        }
                        </>
                    )}
                </div> */}
               
                <Zoom in={newspop == null || memLive == null ? true : false} timeout={{ enter: 200, exit: 200}}>
                        <div className='text-center pb-3'>
                            <img src="https://d3hhrps04devi8.cloudfront.net/main/cgm-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                        </div>
                    </Zoom>
                    <Backdrop className={classes.backdrop} open={change}>
                        <img src="https://d3hhrps04devi8.cloudfront.net/main/cgm-circular.svg" width="50px" />
                    </Backdrop>
            </div>
        </>
         );
    }
     
    export default MemDetail;
