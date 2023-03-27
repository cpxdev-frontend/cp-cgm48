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

const AccountMana = ({fet, setSec, width}) => {
    const [Load, setLoad] = React.useState(false);
    const History = useHistory()
    const classes = useStyles();
    const [ data, setData ] = React.useState(undefined)
    const [ uid, setID ] = React.useState('')
    const [customback, setBack] = React.useState(false);

        React.useEffect(() => {
            if (customback) {
                localStorage.setItem('customback', '')
            } else {
                localStorage.removeItem('customback')
            }
            }, [customback]);


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
        let provider = null;
        switch (type) {
            case 0:
              provider = new GoogleAuthProvider();
              break;
            case 1:
              provider = new TwitterAuthProvider();
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
                     <img alt={localStorage.getItem("i")} src={JSON.parse(localStorage.getItem("loged")).user.photoURL} width='100%' className='cir' />
                </div>
                <div className='col-md pt-4'>
                    <p>Registration Date: {moment.utc(data.registered).local().format('DD MMMM yyyy HH:mm')}</p>
                    {data.obj == null ? (
                        <p>You don't have any Kami-Oshi right now</p>
                    ) : (
                        <p>Your Kami-Oshi is <a className='cur' onClick={() => History.push('/member/' + data.obj.name.toLowerCase())}>{data.obj.fullnameEn[0]} {data.obj.fullnameEn[1]} ({data.obj.name} CGM48)</a></p>
                    )}
                    {/* {width > 1100 && data.obj != null && data.obj.twelvethsingle != undefined && data.obj.twelvethsingle.includes('bnk12thsing/main') && (
                          <FormControlLabel
                          className='ml-2 pt-4'
                          control={
                            <Switch
                              checked={customback}
                              name="reduce"
                              onChange={()=> setBack(!customback)}
                              color="primary"
                            />
                          }
                          label={"Show your Kami-Oshi as Background on BNK48 Fan Space Homepage"}
                        />
                    )} */}
                </div>
            </div>
            <div className='row'>
                    <p className='pt-3'>Account Link: </p>
                    <Button onClick={() => Updateparam(0)} className='m-1' variant='contained' color='primary' disabled={data.googleId != '' ? true : false}>{data.googleId != '' ? 'Google Account: Already Linked' : 'Link to Google Account'}</Button>
                    <Button onClick={() => Updateparam(1)} className='m-1' variant='contained' color='primary' disabled={data.twitterId != '' ? true : false}>{data.twitterId != '' ? 'Twitter Account: Already Linked' : 'Link to Twitter Account'}</Button>
                    <Button onClick={() => Updateparam(2)} className='m-1' variant='contained' color='primary' disabled={data.yahooId != '' ? true : false}>{data.yahooId != '' ? 'Yahoo Account: Already Linked' : 'Link to Yahoo Account'}</Button>
            </div>
            <Backdrop className={classes.backdrop} open={Load}>
            <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" />
        </Backdrop>
        </div>
     );
}
 
export default AccountMana;