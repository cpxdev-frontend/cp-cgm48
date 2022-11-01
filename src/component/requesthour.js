
import { CardContent, Card, Typography, Grow, Fade, CardHeader } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react'
import AOS from "aos";

const RequestHr = ({fet, setSec}) => {
  const [arr, setArr] = React.useState(null)

  function numberWithCommas(x) {
    const options = { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    };
    return Number(x).toLocaleString('en', options);
}

    React.useEffect(() =>{
        setSec('Request Hour 2022')
        AOS.init({ duration: 1000 });
        fetch(fet + '/bnk48/requesthrlist', {
          method :'post'
      })
          .then(response => response.json())
          .then(data => {
            if (data.status == 200) {
              setArr(data.res)
            } else {
              setArr([])
            }
          }).catch(() => {
            setArr([])
          })
    },[])
    return ( 
        <>
{window.innerWidth > 1200 && (
              <div class="video-background">
               <Fade in={true} timeout={800}>
                <img src="https://pbs.twimg.com/media/FgS1W--VsAAvv0R?format=jpg&name=4096x4096"  width={window.innerWidth} />
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

        <TableContainer>
                <Table stickyHeader aria-label="simple table">
                  <TableHead data-aos='fade-down'>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell align="center">Album Image</TableCell>
                      <TableCell align="center">Song Name</TableCell>
                      <TableCell align="center">Song Artist</TableCell>
                      <TableCell align="right">Spent Token</TableCell>
                      <TableCell align="center">Avaliable on Spotify</TableCell>
                    </TableRow>
                  </TableHead>
          {
            arr == null ? (
              <TableBody>
              <TableCell colSpan={5} align='center'><img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="40px" /></TableCell>
        </TableBody>
            ) : ((arr.length == 0) ? (
              <TableBody>
                  <TableCell colSpan={6} align='center'>Voting is end. The voting are being collected. Please come back again in November 1, 2022</TableCell>
            </TableBody>
            ) : arr.map((item) => (
                <TableBody key={item.trackID} className='text-left' onClick={() => window.open(item.reflink,'_blank')} data-aos='fade-right'>
                        <TableCell component="th">
                          {item.rank}
                        </TableCell>
                        <TableCell align="center">
                            <img src={item.src} width={100} />
                          </TableCell>
                          <TableCell align="center">
                          {item.songName}
                          </TableCell>
                          <TableCell align="center">
                          {item.songArtist}
                          </TableCell>
                          <TableCell align="right">
                          {numberWithCommas(item.spentToken)}
                          </TableCell>
                          <TableCell align="center">
                          {item.trackID != '' ? 'YES': '-'}
                          </TableCell>
                  </TableBody>
            )))
          }
            </Table>
              </TableContainer>

          <Card className='mt-5' data-aos='zoom-in-up'>
            <CardContent>
            <CardHeader title="Election Report" subheader="Reported by Token X. Visualization Statistic by Google Data Studio" data-aos='flip-down' />
              <hr />
              <div className='text-center' data-aos='zoom-out'>
                {
                  window.innerWidth >1200 ? (
                    <iframe src="https://datastudio.google.com/embed/reporting/cc4745e7-3ad7-4bf2-8af6-f19a6ac77915/page/JXU6C" frameborder="0" width="90%" height={window.innerWidth< 600 ? "500px" : '700px'} />
                  ) : (
                    <iframe src="https://datastudio.google.com/embed/reporting/cc4745e7-3ad7-4bf2-8af6-f19a6ac77915/page/JXU6C" frameborder="0" width="100%" height={window.innerWidth< 600 ? "500px" : '700px'} />
                  )
                }
              {window.innerWidth < 800 && (
                  <a className='mt-3' href='https://datastudio.google.com/embed/reporting/cc4745e7-3ad7-4bf2-8af6-f19a6ac77915/page/JXU6C'>Click here to view Virtualization (Powered by Google Data Studio)</a>
              )}
              </div>
            </CardContent>
          </Card>
        </div>
        </>
     );
        }
        export default RequestHr