import React from 'react';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardHeader, CardContent, CardMedia, Grow, Fade } from '@material-ui/core';
    import MoreVertIcon from '@material-ui/icons/MoreVert';
    import { useHistory } from 'react-router-dom';
const Contact = ({fet, setSec, width}) => {
  const History = useHistory()
    React.useEffect(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
       
        setSec('Follow and Support CGM48')
    }, [])

    return ( 
        <>
        {width >1200 && (
          <div class="video-background">
           <Fade in={true} timeout={800}>
           <img src="https://i.scdn.co/image/ab67618600001016c2994cce3910cf0ef40d7653" width={width} />
              </Fade>
      </div>
        )}
             {width >1200 ? (
            <div className="cover mt-4">
            <Grow in={true} timeout={1000}>
          <Card className="col-md-4 m-5">
              <CardContent>
              <Typography variant="h5" component="h2">
                Follow CGM48
                </Typography>
                <hr />
                <Typography color="textSecondary">
                You have many way to follow every update from Social Platform
                <ListItem>
                    <ListItemText primary="Facebook" secondary={(<a href='//www.facebook.com/cgm48official' target='_blank'>cgm48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Instagram" secondary={(<a href='//www.instagram.com/cgm48official' target='_blank'>cgm48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Mobile Application" secondary={(<a href='//app.bnk48.com' target='_blank'>iAM48 Mobile Application. Avaliable to download in Apple App Store or Google Play Store</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Twitter" secondary={(<a href='//twitter.com/cgm48official' target='_blank'>cgm48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Tiktok" secondary={(<a href='//www.tiktok.com/@cgm4848official_th' target='_blank'>@cgm4848official_th</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Youtube" secondary={(<a href='//www.youtube.com/c/cgm48official' target='_blank'>cgm48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Also Streaming Platform" secondary={(<a href='/music' target='_blank'>Go to Music page</a>)} />
                  </ListItem>
                  <ListItem onClick={() => History.push('/48group')} className='cur'>
                    <ListItemText primary="48 Group Network" secondary='See another 48 group band in here.' />
                  </ListItem>
                </Typography>
              </CardContent>
            </Card>
            </Grow>
          </div>
          ) : (
        <div className="pb-5 pt-2">
    <Grow in={true} timeout={1000}>
  <Card className="bnktheme ml-2 mr-2">
  <CardContent>
              <Typography variant="h5" component="h2">
                Follow CGM48
                </Typography>
                <hr />
                <Typography color="textSecondary">
                You have many way to follow every update from Social Platform
                <ListItem>
                    <ListItemText primary="Facebook" secondary={(<a href='//www.facebook.com/cgm48official' target='_blank'>cgm48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Instagram" secondary={(<a href='//www.instagram.com/cgm48official' target='_blank'>cgm48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Mobile Application" secondary={(<a href='//app.bnk48.com' target='_blank'>iAM48 Mobile Application. Avaliable to download in Apple App Store or Google Play Store</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Twitter" secondary={(<a href='//twitter.com/cgm48official' target='_blank'>cgm48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Tiktok" secondary={(<a href='//www.tiktok.com/@cgm4848official_th' target='_blank'>@cgm4848official_th</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Youtube" secondary={(<a href='//www.youtube.com/c/cgm48official' target='_blank'>cgm48official</a>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Also Streaming Platform" secondary={(<a href='/music' target='_blank'>Go to Music page</a>)} />
                  </ListItem>
                  <ListItem onClick={() => History.push('/48group')} className='cur'>
                    <ListItemText primary="48 Group Network" secondary='See another 48 group band in here.' />
                  </ListItem>
                </Typography>
              </CardContent>
    </Card>
    </Grow>
  </div>
          )}
        </>
    );
}
 
export default Contact;
