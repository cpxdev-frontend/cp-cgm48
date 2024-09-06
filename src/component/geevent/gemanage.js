import React from 'react';
import { Button, TextField, MenuItem, Card, CardContent, FormControlLabel, Checkbox, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

  const Streamchannel = [
      {
        label: 'BNK48 LIVE',
        value: '2',
    },
    {
        label: 'CGM48 LIVE',
        value: '3',
    }
  ]
  const streamplat = [
    {
        label: 'Youtube',
        value: 'youtube',
    },
    {
      label: 'Facebook',
      value: 'facebook',
  },
      {
      label: 'Another Platform',
      value: 'other',
  }
]

const GeMana = ({fet}) => {
    const classes = useStyles();
    const [ done, setDone ] = React.useState(false);
    const [ cgmon, setCg ] = React.useState(false);

    const [list, setList] = React.useState([]); 
    const [ Tar, setTar ] = React.useState('-');
    const [mem, setMem] = React.useState([]); 
    const [ MemTar, setMemTar ] = React.useState('-');
    const [ ChannelSet, setChannel ] = React.useState('');
    const [Score, setScore] = React.useState(''); 
    const [Str, setStr] = React.useState(''); 
    const [Plat, setPlat] = React.useState(''); 

    const [load, setLoad] = React.useState(false); 

   

    React.useEffect(() => {
        if (sessionStorage.getItem("dashad") == null) {
          let person = prompt("Please enter identity password", "");
          if (person == null || person == "") {
              alert('Access denied')
              window.location.href = "/"
          } else {
            fetch(fet + '/bnk48/authcheck?nm=' +btoa(person), {
              method: 'POST', // or 'PUT'
            })
              .then(response => response.text())
              .then(data => {
                  if (data == "true") {
                    sessionStorage.setItem("dashad", "")
                    setDone(true)
                  } else {
                    alert('Access denied')
                    window.location.href = "/"
                  }
              })
              .catch((error) => {
                alert('Server cannot be respond. Access denied')
                window.location.href = "/"
              });
          }
        } else {
            sessionStorage.setItem("dashad", "")
            setDone(true)
        }
      }, [])

    const sub = (e) => {
        e.preventDefault()
        if (Tar == '-') {
            alert("Please choose Election rank number.")
            return false
        }
        if (MemTar == '-') {
            alert("Please choose hosted BNK48 member for this event.")
            return false
        }
        setLoad(true)
        const Obj = {
            rank: Tar,
            name: MemTar,
            sc: parseFloat(Score)
          }
          fetch(fet + '/bnk48/addelec', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(Obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            })
            .then(response => response.text())
            .then(data => {
                if (data == "true") {
                    alert("Election result update success.")
                } else {
                    alert("Ranking is exist.")
                }
                setLoad(false)
                setTar("-")
                setMemTar("-")
                setScore("")
            })
            .catch((error) => {
                alert("System will be temporary error for a while. Please try again")
                setLoad(false)
                setTar("-")
                setMemTar("-")
                setScore("")
            });
    }

    const sub2 = (e) => {
        e.preventDefault()
        if (Str != '') {
            setLoad(true)
          fetch(fet + '/bnk48/setstream?ch=' + ChannelSet+'&uri=' + Str + '&plat=' + Plat, {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            })
            .then(response => response.text())
            .then(data => {
                if (data == "true") {
                    alert("Update stream success.")
                } else {
                    alert("Error to update.")
                }
                setLoad(false)
                setStr("")
                setChannel("")
            })
            .catch((error) => {
                alert("System will be temporary error for a while. Please try again")
                setLoad(false)
                setStr("")
                setChannel("")
            });
        } else {
            alert("Please add youtube ID.")
            setStr("")
            return false
        }
    }

    if (done) {
      return ( 
          <>
        <Card>
            <form autoComplete='off' onSubmit={sub2}>
            <CardContent className='row pl-5 pr-5'>
                <div className='col-md-5'>
                    <TextField
                        required={true}
                        label="Add Youtube Stream ID or Facebook Live Url / Facebook Watch Url"
                        value={Str}
                        fullWidth={true}
                        className="mb-3"
                        type="text"
                        onChange={(e) => setStr(e.target.value)}
                    />
                </div>
                <div className='col-md-3'>
                <TextField
                        required={true}
                        fullWidth={true}
                        select
                        label="Channel"
                        value={ChannelSet}
                        className="mb-3"
                        onChange={(e) => setChannel(e.target.value)}
                        >
                            {Streamchannel.length > 0 && Streamchannel.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                </div>
                <div className='col-md-3'>
                <TextField
                        required={true}
                        fullWidth={true}
                        id="platselect"
                        select
                        label="Platform"
                        value={Plat}
                        className="mb-3"
                        onChange={(e) => setPlat(e.target.value)}
                        >
                            {streamplat.length > 0 && streamplat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                </div>
                <Button color='primary' type='submit'>Update</Button>
            </CardContent>
            </form>
        </Card>
        <Backdrop className={classes.backdrop} open={load}>
            <img src="https://d3hhrps04devi8.cloudfront.net/main/cgm-circular.svg" width="50px" />
        </Backdrop>
        </>
     );
    }
    return null
}
 
export default GeMana;
