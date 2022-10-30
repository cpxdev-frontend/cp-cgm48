
import { CardContent, Card, Typography, Grow, Fade, CardActionArea } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react'

const RequestHr = ({fet, setSec}) => {
  const [arr, setArr] = React.useState(null)

    React.useEffect(() =>{
        setSec('Request Hour 2022')
        fetch(fet + '/cgm48/requesthrlist', {
          method :'post'
      })
          .then(response => response.json())
          .then(data => {
            if (data.status == true) {
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


        <div className={'stage text-center ' + (window.innerWidth > 700 ? 'p-5' : 'p-2')}>
            <Card>
                <CardContent>
                    Voting is end. The voting are being collected. Please come back again in November 1, 2022
                </CardContent>
            </Card>

        <TableContainer>
                <Table stickyHeader aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell align="center">Member Image</TableCell>
                      <TableCell align="center">Song Name</TableCell>
                      <TableCell align="center">Song Artist</TableCell>
                      <TableCell align="right">Spent Token</TableCell>
                    </TableRow>
                  </TableHead>
          {
            arr == null ? (
              <TableBody>
              <TableCell colSpan={5} align='center'><img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="40px" /></TableCell>
        </TableBody>
            ) : ((arr.length == 0) ? (
              <TableBody>
                  <TableCell colSpan={5} align='center'>Voting is end. The voting are being collected. Please come back again in November 1, 2022</TableCell>
            </TableBody>
            ) : arr.map((item) => (
                <TableBody key={item.trackID} className='text-left' onClick={() => window.open(item.reflink,'_blank')}>
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
                          {item.spentToken}
                          </TableCell>
                  </TableBody>
            )))
          }
            </Table>
              </TableContainer>
        </div>
        </>
     );
        }
        export default RequestHr