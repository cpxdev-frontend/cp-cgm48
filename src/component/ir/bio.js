import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, CardMedia, Typography, Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const useStyles = makeStyles((theme) => ({

  }));
  const bnk = {
    path: 'https://cdn.statically.io/gl/cpx2017/iamprofile@main/bnk4thalbum/profile/bnk/',
    type: '.jpg'
  }
  const cgm = {
    path: 'https://cdn.statically.io/gl/cpx2017/iamprofile@main/cgm486thsing/',
    type: '.jpg'
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
const IRBio = ({fet, irItem, width}) => {
    const classes = useStyles();
    const [Loaded, setLoaded] = React.useState(true);
    const [data, setData] = React.useState(true);
    const [name, setHover] = React.useState('');
    React.useEffect(() => {
        fetch(fet + '/cgm48/getIRProject?id=' + irItem.id, {
          method :'post'
        })
          .then(response => response.json())
          .then(data => {
            setData(data.response)
            setLoaded(false)
          });
    }, [])
    if (Loaded) {
      return ( 
          <div style={{
              position: 'absolute',
              left: '45%',
              top: '45%',
            }}>
            <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" />
          </div>
  
       );
    }
    return (
      <div>
        <CardMedia src={data.img != '' ? data.img  : 'https://pbs.twimg.com/media/Fdpfji9UcAAkEXp?format=jpg&name=large'} component='img' style={{maxHeight: '150px'}} />
        <CardHeader title={data.name} subheader="Independent Records's Project" />
        <CardContent>
          <Typography>
            {data.desc}
          </Typography>
        </CardContent>
        <CardContent className='mt-4'>
          <Typography>
            Member Included{name}
            <AvatarGroup className='zoommas mt-2' spacing={5} max={width < 600 ? 8 : 10}>
              {
                data.members.map((items) => (
                  <Avatar onMouseEnter={() => setHover(': '+capitalizeFirstLetter(items.name))} onMouseLeave={() => setHover('')} className='zoomx' alt={items.name + items.band} src={items.band == 'bnk' ? (bnk.path + items.name + bnk.type) : items.band == 'cgm' ? (cgm.path + items.name + cgm.type) : ''} />
                ))
              }
            </AvatarGroup>
            <Typography className='mt-1' variant='subtitles1'>Notes: {width > 700 ? 'Please leave your mouse over member image avatar to view name' : 'You maybe cannot see all members for limitation of screen size.'}</Typography>
          </Typography>
        </CardContent>
      </div>
    )
}
 
export default IRBio;