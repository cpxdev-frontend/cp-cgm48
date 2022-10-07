import { CardContent, Card, Typography, Grow, Fade } from '@material-ui/core';
import React from 'react'

const RequestHr = ({fet, setSec}) => {
    React.useEffect(() =>{
        setSec('Request Hour 2022')
    },[])
    return ( 
        <>
           {window.innerWidth > 1200 && (
              <div class="video-background">
               <Fade in={true} timeout={800}>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@latest/bnk48/mainoff.jpg"  width={window.innerWidth} />
                  </Fade>
          </div>
            )}
                {window.innerWidth >1200 ? (
                <div className="cover mt-4">
                <Grow in={true} timeout={1000}>
              <Card className="col-md-4 m-5">
              <CardContent>
                <Typography variant="h5" component="h2">
                BNK48 and CGM48 Request Hour 2022
                </Typography>
                <hr />
                <Typography color="textSecondary">
                The first concert of BNK48 and CGM48 that you can participate in voting <b>25 songs</b> from <b>124 songs</b> of BNK48 and CGM48 songs for this concert. 
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                 You can check voting summary and virtualization chart result below.
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
                BNK48 and CGM48 Request Hour 2022
                </Typography>
                <hr />
                <Typography color="textSecondary">
                The first concert of BNK48 and CGM48 that you can participate in voting <b>25 songs</b> from <b>124 songs</b> of BNK48 and CGM48 songs for this concert. 
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                 You can check voting summary and virtualization chart result below.
                </Typography>
              </CardContent>
        </Card>
        </Grow>
      </div>
          )}


        <div className={'stage text-center ' + (window.innerWidth > 700 ? 'p-5' : 'p-2')}>
            <Card>
                <CardContent>
                    Voting is end. The voting are being collected. Please come back again in November 1, 2022
                </CardContent>
            </Card>
        </div>
        </>
     );
}
 
export default RequestHr;