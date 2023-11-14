import React from 'react'
import Swal from 'sweetalert2';
import moment from 'moment'
import {
    BrowserRouter,
    Route,
    Link,
    Switch as BasicSwitch,
    useHistory,
  } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, TextField, Zoom, FormControlLabel, Badge, Button, CardHeader, Switch, Backdrop } from '@material-ui/core';
import {
    GoogleAuthProvider,
    TwitterAuthProvider,
    signInWithPopup,
    deleteUser,
    OAuthProvider
  } from "firebase/auth";
  import auth from "../fbindex";

  import { makeStyles } from '@material-ui/core/styles';
  import AOS from "aos";
  
  const useStyles = makeStyles((theme) => ({
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    }));
let api;
let timerIntervalOTP;

const AccountMana = ({fet, setSec, width, triggerUpdate}) => {
    const [Load, setLoad] = React.useState(false);
    const History = useHistory()
    const classes = useStyles();
    const [ data, setData ] = React.useState(undefined)
    const [ uid, setID ] = React.useState('')
    const [customback, setBack] = React.useState(false);

    const [jiwaback, setJiwa] = React.useState(false);

    const [ Prof, setPro ] = React.useState('')

        React.useEffect(() => {
            if (customback) {
                localStorage.setItem('customback', '')
            } else {
                localStorage.removeItem('customback')
            }
            }, [customback]);

            React.useEffect(() => {
              if (jiwaback) {
                  localStorage.setItem('jiwa', '')
              } else {
                  localStorage.removeItem('jiwa')
              }
              }, [jiwaback]);

        const getverify = () => {
          Swal.fire({
            title: "How to verify your account",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "Get Started",
            text: 'After you click the "Get Started" button, you will receive an OTP sent to the email address you provided during registration. Please copy that OTP code into next dialog to confirm it. If OTP is correct, your account will be verified scuccessfully.',
          }).then((result) => {
            if (result.isConfirmed) {
              setLoad(true)
              fetch(fet + '/cgm48/reverify?i=' + JSON.parse(localStorage.getItem('loged')).user.uid , {
                method :'post'
              })
              .then(response => response.json())
              .then(data => {
                  setLoad(false)
                  if (data.status == true) {
                    Swal.fire({
                      title: 'Please confirm to verify Fan Space Membership Account by enter OTP. Please check your email inbox.',
                      html: 'Please enter OTP in <strong></strong> second(s). OTP RefID is <b>' + data.otp + '</b>',
                      input: 'text',
                      inputAttributes: {
                          autocapitalize: 'off',
                          placeholder: "Enter OTP which we sent to your current email",
                          maxlength: 6,
                          required: true
                      },
                      allowOutsideClick: false,
                      showDenyButton: true,
                      confirmButtonText: 'Confirm',
                      denyButtonText: `Cancel`,
                      timer: 180000,
                      didOpen: () => {
                          Swal.showLoading();
                          api = setTimeout(() => {
                              Swal.hideLoading();
                              clearTimeout(api);
                          }, 3000)
                          timerIntervalOTP = setInterval(() => {
                              Swal.getHtmlContainer().querySelector('strong')
                                  .textContent = (Swal.getTimerLeft() / 1000)
                                      .toFixed(0)
                          }, 100)
                      },
                      preConfirm: function (val) {
                          if (val.length === 0 || val.length < 6) {
                              Swal.showValidationMessage(`Please enter OTP to confirm changing`)
                          }
                          return { otpget: val };
                      },
                      didClose: () => {
                        if (Swal.getTimerLeft() < 100) {
                          Swal.fire({
                              title: 'OTP is expired',
                              text: 'Please try again.',
                              icon: "error"
                          })
                        }
                      },
                      willClose: () => {
                        setLoad(false)
                          clearTimeout(api);
                          clearInterval(timerIntervalOTP);
                      }
                  }).then((result) => {
                      if (result.isConfirmed) {
                        setLoad(true)
                        fetch(fet + "/cgm48/setverify?i=" + JSON.parse(localStorage.getItem('loged')).user.uid + "&otp=" + result.value.otpget + "&refid=" + data.otp, {
                          method: 'put'
                        })
                          .then(x => x.json())
                          .then(y => {
                            setLoad(false)
                              if (y.verified == true) {
                                  Swal.fire({
                                      title: 'Verify success',
                                      text: "Thank you for verify your account",
                                      icon: "success"
                                  }).then(() => {
                                    Fetch();
                                    triggerUpdate();
                                  })
                              } else {
                                  Swal.fire({
                                      title: 'Something went wrong',
                                      text: y.message,
                                      icon: "error"
                                  })
                              }
                          }).catch(() => {
                              
                          });
                      }
                  })
                  } else {
                    Swal.fire({
                      title: "Error while send OTP, please try again",
                      icon: 'error',
                      text: 'Please take for a while or contact us.',
                    })
                  }
              }).catch(() => {
                  setData(null)
              })
            }
          });
        }


        const Fetch= () => {
            if (localStorage.getItem('loged') != null) {
                fetch(fet + '/cgm48/membershipData?i=' + JSON.parse(localStorage.getItem('loged')).user.uid , {
                    method :'post'
                })
                .then(response => response.json())
                .then(data => {
                    setLoad(false)
                    if (data != null) {
                        setData(data)
                        setID(data.memId)
                        setPro(data.img)
                        setSec(data.memUser + '\'s Account Studio')
                    } else {
                        setData(null)
                    }
                }).catch(() => {
                    setData(null)
                })
            } else {
                setData(null)
            }
        }

    React.useState(() => {
        setSec('Fetching Your Membership Profile')
        if (localStorage.getItem('customback') != null) {
            setBack(true)
           } else {
              setBack(false)
           }
           if (localStorage.getItem('jiwa') != null) {
            setJiwa(true)
           } else {
              setJiwa(false)
           }
           Fetch()
    }, []) 

   
    if (data === null) {
        return (
            <div className='mt-3 container text-center'>
            <h1>User not found</h1>
        </div>
        )
    }
    const keypass = [
        "c822c1b63853ed273b89687ac505f9fa",
        "b73c2d22763d1ce2143a3755c1d0ad3a",
        "241fe8af1e038118cd817048a65f803e"
    ]

    const Updateparam = (type) => {
      if (data.verified == false) {
        Swal.fire({
          title: 'You cannot link more account',
          text: "Please confirm account before add more linked account",
          icon: 'warning'
        })
        return;
      }
        let provider = null;
        switch (type) {
            case 0:
              provider = new GoogleAuthProvider();
              break;
            case 1:
              provider = new OAuthProvider("microsoft.com");
              break;
            case 2:
              provider = new OAuthProvider("yahoo.com");
              break;
            default:
              alert("Login fail");
              return;
          }
          setLoad(true)
          signInWithPopup(auth, provider)
            .then((result) => {
                fetch(fet + '/cgm48/uptLoginID', {
                    method :'put',
                    body: JSON.stringify({
                        id: uid,
                        uid: result.user.uid,
                        t: keypass[type]
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                      },
                })
                    .then(response => response.json())
                    .then(res => {
                        setLoad(false)
                        if (res.status == true) {
                           let temp = data
                           switch (type) {
                            case 0:
                              temp.googleId = result.user.uid
                              break;
                            case 1:
                              temp.twitterId = result.user.uid
                              break;
                            case 2:
                              temp.yahooId = result.user.uid
                              break;
                            default:
                              alert("Login fail");
                              return;
                          }
                            setLoad(true)
                          Fetch()
                        } else {
                            deleteUser(result.user)
                            Swal.fire({
                                title: "Error while link account, please try again",
                                icon: 'error',
                                text: 'Please take for a while or contact us.',
                              })
                        }
                    }).catch(() => {
                      deleteUser(result.user)
                        setLoad(false)
                        Swal.fire({
                            title: "Error while link account, please try again",
                            icon: 'error',
                            text: 'Please take for a while or contact us.',
                          })
                    })  
            })
            .catch((error) => {
              // Handle error.
              setLoad(false)
              Swal.fire({
                title: "Account Link fail",
                icon: 'error',
                text: 'Please try again.',
              })
            });
    }

    if (data === undefined) {
       return (
        <div className='mt-3 container text-center'>
        <h1>Loading user</h1>
    </div>
       )
    }
    return ( 
        <div className='mt-3 container'>
            <CardHeader title={'Welcome back, ' + data.memUser} subheader={'Fan Space Support ID: ' + data.memId} />
            <div className='mt-4 mb-3 row'>
                <div className='col-md-3'>
                     <img alt={localStorage.getItem("i")} src={Prof} width='100%' className='cir' />
                </div>
                <div className='col-md pt-4'>
                    <p>Registration Date: {moment.utc(data.registered).local().format('DD MMMM yyyy HH:mm')}</p>
                    {data.obj == null ? (
                        <p>You don't have any Kami-Oshi right now</p>
                    ) : (
                        <p>Your Kami-Oshi is <a className='cur' onClick={() => History.push('/member/' + data.obj.name.toLowerCase())}>{data.obj.fullnameEn[0]} {data.obj.fullnameEn[1]} ({data.obj.name} CGM48)</a></p>
                    )}
                    <div className='cur' onClick={() => window.open('//cp-tpop.pages.dev/membership', '_blank')}>
                      Notes: You can change your profile image by Login with same account credential on T-POP Megaverse Platform (Click here to Continue)
                    </div>
                   {
                    !data.verified && (
                      <Button onClick={() => getverify()} className='mt-3' variant='contained' color='primary'>Click here to verify your account</Button>
                    )
                   }
                </div>
            </div>
            <div className='row'>
                    <p className='pt-3'>Account Link: </p>
                    <Button onClick={() => Updateparam(0)} className='m-1' variant='contained' color='primary' disabled={data.googleId != '' ? true : false}>{data.googleId != '' ? 'Google Account: Already Linked' : 'Link to Google Account'}</Button>
                    <Button onClick={() => Updateparam(1)} className='m-1' variant='contained' color='primary' disabled={data.msId != '' ? true : false}>{data.msId != '' ? 'Microsoft Account: Already Registered' : 'Link to Microsoft Account'}</Button>
                    <Button onClick={() => Updateparam(2)} className='m-1' variant='contained' color='primary' disabled={data.yahooId != '' ? true : false}>{data.yahooId != '' ? 'Yahoo Account: Already Registered' : 'Link to Yahoo Account'}</Button>
            </div>
            <Backdrop className={classes.backdrop} open={Load}>
            <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" />
        </Backdrop>
        </div>
     );
}
 
export default AccountMana;