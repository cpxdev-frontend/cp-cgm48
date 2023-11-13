import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, TextField, Zoom, FormControlLabel, Radio, Button, CardHeader, MenuItem, Backdrop } from '@material-ui/core';
import Swal from 'sweetalert2';

import {
    GoogleAuthProvider,
    TwitterAuthProvider,
    signInWithPopup,
    signOut,
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

const Registype = [
    {label: "Choose service", value: 0},
    {label: "Google Account", value: 1},
    {label: "Microsoft Account", value: 2},
    {label: "Yahoo Account", value: 3}
]

const RegisterMember = ({fet, setSec}) => {
    const classes = useStyles();
    const [ regis, setRegis ] = React.useState({
        name: "",
        email: "",
        googleid: "",
        msid: "",
        yahooid: ""
    })
    const [Load, setLoad] = React.useState(false);
    const [choose, setChoose] = React.useState(0);

    const UpdateParam = (key, value) => {
        let tempedit = regis
        tempedit[key] = value
        setRegis(tempedit);
    }

    function ValidateEmail(mail) 
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        return (false)
    }

    const otpprocess = (format) => {
      Swal.fire({
          title: "Success",
          icon: 'success',
          text: 'Registration complete.',
        }).then(() => {
          window.location.href = '/'
        })

    }

    const RegisterAPI = (obj) => {
        fetch(fet + '/cgm48/registerFanSpace', {
            method :'post',
            body: JSON.stringify(regis),
            headers: {
                'Content-Type': 'application/json'
              },
        })
            .then(response => response.json())
            .then(data => {
                setLoad(false)
                if (data == null) {
                  deleteUser(obj.user)
                    Swal.fire({
                        title: "Error while login, please try again",
                        icon: 'error',
                        text: 'Please take for a while or contact us.',
                      })
                } else {
                    if (data.status == 2) {
                      deleteUser(obj.user)
                        Swal.fire({
                            title: "Error while login, please try again",
                            icon: 'error',
                            text: 'Please take for a while or contact us.',
                          })
                    } else if (data.status == 1) {
                      deleteUser(obj.user)
                        Swal.fire({
                            title: "This login authentication is already used",
                            icon: 'error',
                            text: 'Please choose another account or service.',
                          })
                    } else {
                      setLoad(true)
                      otpprocess(data.otp)
                    }
                }
            }).catch(() => {
              deleteUser(obj.user)
                setLoad(false)
            })
    }

    const RegisterAction = () => {
        if (ValidateEmail(regis.email) == false) {
            Swal.fire({
                title: "Email format is incorrect",
                icon: 'warning',
                text: 'Please check email and try again.',
              })
            return;
        } else if (regis.name == '' || regis.email == '') {
            Swal.fire({
                title: "Blank value found",
                icon: 'warning',
                text: 'Please check name and email field is not empty and try again.',
              })
            return;
        } else if (choose == 0) {
            Swal.fire({
                title: "Fan Space Platform need at least one Account service to make Seamless Login.",
                icon: 'warning',
                text: 'Please choose account service to continue.',
              })
            return;
        }
        let provider = null;
    switch (choose) {
      case 1:
        provider = new GoogleAuthProvider();
        break;
      case 2:
        provider = new OAuthProvider("microsoft.com");
        break;
      case 3:
        provider = new OAuthProvider("yahoo.com");
        break;
      default:
        alert("Login fail");
        return;
    }
    setLoad(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        switch (choose) {
            case 1:
              UpdateParam('googleid', result.user.uid);
              break;
            case 2:
              UpdateParam('msid', result.user.uid);
              break;
            case 3:
              UpdateParam('yahooid', result.user.uid);
              break;
            default:
              return;
          }
          RegisterAPI(result)    
      })
      .catch((error) => {
        // Handle error.
        setLoad(false)
        Swal.fire({
          title: "Account Link fail",
          icon: 'error',
          text: 'Seamless Login required to use one of these service to make login process.',
        })
      });
    }

    React.useEffect(() => {
        setSec('Register Fan Space Membership')
    }, [])

    return (
        <div className='mt-3 container'>
            <CardHeader title='Register Fan Space Membership' subheader='One registration, for all Fan Space platform. No password need' />
            <div className='col-md-12'>
              <TextField
                 label="Your name"
                 className="m-3"
                 fullWidth={true}
                 onChange={(e) => UpdateParam('name',e.target.value)}
                 ></TextField>
            <TextField
                 label="Your Email"
                 className="m-3"
                 type='email'
                 fullWidth={true}
                 onChange={(e) => UpdateParam('email',e.target.value)}
                 ></TextField>
                   <TextField
                        select
                        label="Choose Account which you linked"
                        value={choose}
                        fullWidth={true}
                        className="m-3"
                        onChange={(e) => setChoose(e.target.value)}
                        >
                     {Registype.map((option) => (
                         <MenuItem key={option.value} value={option.value}>
                         {option.label}
                         </MenuItem>
                     ))}
              </TextField>
                 <div className='justify-content-center row'>
                    <p className='text-info'>Notes: You can link to another account after login complete.</p>
                 </div>
                 <div className='justify-content-center row mb-4'>
                 <Button onClick={() => RegisterAction()} variant='contained'>Register</Button>
                 </div>
            </div>
            <Backdrop className={classes.backdrop} open={Load}>
            <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" />
        </Backdrop>
        </div>
    )
}

export default RegisterMember;