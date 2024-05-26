import React from 'react';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardActionArea, CardContent, CardMedia, Grow, Fade } from '@material-ui/core';

const ErrCom = ({setSec, width}) => {
      React.useEffect(() => {
        setSec('Page not found')
      }, [])
    return ( 
        <>
          <div class="video-background">
          <Fade in={true} timeout={800}>
                <img src="https://i.scdn.co/image/ab67618600001016c97ddcdef5391fab6c0e619b"  width={width} />
              </Fade>
              </div>

              {width > 800 ? (
            <div className="cover mt-4">
            <Grow in={true} timeout={1000}>
          <Card className="col-md-4 m-5">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Error 404 | Page not Found
                </Typography>
                <hr />
                <Typography color="textSecondary">
                  Sorry, but this page is unavaliable right now
                </Typography>
              </CardContent>
            </Card>
            </Grow>
          </div>
          ) : (
        <div className="bnktheme pb-5 pt-2">
    <Grow in={true} timeout={1000}>
  <Card className="ml-2 mr-2">
            <CardContent>
                <Typography variant="h5" component="h2">
                  Error 404 | Page not Found
                </Typography>
                <hr />
                <Typography color="textSecondary">
                  Sorry, but this page is unavaliable right now
                </Typography>
              </CardContent>
    </Card>
    </Grow>
  </div>
          )}
        </>
     );
}
 
export default ErrCom;