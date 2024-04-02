import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale,
    BarElement } from 'chart.js';
    import Table from '@material-ui/core/Table';
    import TableBody from '@material-ui/core/TableBody';
    import TableCell from '@material-ui/core/TableCell';
    import TableContainer from '@material-ui/core/TableContainer';
    import TableHead from '@material-ui/core/TableHead';
    import TableRow from '@material-ui/core/TableRow';
    import { makeStyles } from '@material-ui/core/styles';
    import Fab from '@material-ui/core/Fab';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment'
import { Bar } from 'react-chartjs-2';
import RefreshIcon from '@material-ui/icons/Refresh';
import AOS from "aos";
import { CardHeader } from '@material-ui/core';

ChartJS.register(ArcElement,LinearScale, CategoryScale,
    BarElement, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    rank: {
        width: theme.spacing(10),
    },
    img: {
        width: theme.spacing(30),
    },
    }));

function numberWithCommas(x) {
    const options = { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    };
    return Number(x).toLocaleString('en', options);
}
var ox;
const SongChart = ({fet, setSec, width}) => {
    const classes = useStyles();
    const History = useHistory()
    const [data, setData] = React.useState(null)
    const [data2, setData2] = React.useState(null)
    const [fetready, setFet] = React.useState(false)
    const [bnk, setBnk] = React.useState([])
    const [cgm, setCgm] = React.useState([])

const fetchapi = () => {
    AOS.init({ duration: 1000 });
    setData(null)
    setData2(null)
    setFet(false)
    fetch(fet + '/cgm48/tkxlist/0xE4629861b811d23Afde5E4476DFA79003C0E83d1', {
        method :'post'
    })
        .then(response => response.json())
        .then(data => {
            setData(data)
            fetch(fet + '/cgm48/tkxlist/0xa8E49Dce482E68df7D89509b4810dc466bd6f24A?chartLimit=6', {
                method :'post'
            })
                .then(response => response.json())
                .then(datax => {
                    setData2(datax)
                    setTimeout(() => {
                        setFet(true)
                    }, 10000);
                }); 
        }); 
}

    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        setSec('Ms. Songkran 48 Contest Result Virtualization')
        fetch(fet + '/bnk48/memberlist?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'get'
        })
            .then(response => response.json())
            .then(data => {
                setBnk(data.response)
            }).catch(() => {
            })
        fetch(fet + '/cgm48/memberlist?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'get'
        })
            .then(response => response.json())
            .then(data => {
                setCgm(data.response)
            }).catch(() => {
            })
            fetchapi()
    }, [])


return ( <div className='container mt-4'>
<div className='row'>
        <div className='col-md d-flex align-items-center'>
            <h4>Ms. Songkran 48 Contest Realtime Result</h4>
        </div>
        <div className='col-md-auto'>
            <div className='row'>
            <div className='col-md-auto'>
                <h6>1st Round<br />All Transactions</h6>
                {data != null ? <p className='text-right'>{data.transactions.transactions_count}</p> : <Skeleton />}
            </div>
            <div className='col-md-auto'>
                <h6>1st Round<br />All Spent Tokens</h6>
                {data != null ? <p className='text-right'>{numberWithCommas(data.allToken)}</p> : <Skeleton />}
            </div>
            <div className='col-md-auto'>
                <h6>1st Round<br />All Est. Spent Amount (THB)</h6>
                {data != null ? <p className='text-right'>{numberWithCommas(data.allCash)}</p> : <Skeleton />}
            </div>
            </div>
            <hr />
            <div className='row'>
            <div className='col-md-auto'>
                <h6>Final Round<br />All Transactions</h6>
                {data2 != null ? <p className='text-right'>{data2.transactions.transactions_count}</p> : <Skeleton />}
            </div>
            <div className='col-md-auto'>
                <h6>Final Round<br />All Spent Tokens</h6>
                {data2 != null ? <p className='text-right'>{numberWithCommas(data2.allToken)}</p> : <Skeleton />}
            </div>
            <div className='col-md-auto'>
                <h6>Final Round<br />All Est. Spent Amount (THB)</h6>
                {data2 != null ? <p className='text-right'>{numberWithCommas(data2.allCash)}</p> : <Skeleton />}
            </div>
            </div>
        </div>  
</div>
        {data != null && data2 != null ? <p className='text-right'>Notes: Final Vote rate {(((data2.allToken - data.allToken) / data2.allToken) * 100) < 0 ? 'decreased' : 'increased'} {numberWithCommas(((data2.allToken - data.allToken) / data2.allToken) * 100)}% from the first round.</p> : <Skeleton />}
<hr />
<div className={'row mt-5' + (data == null ? ' chartfixed' : '')}>
        <div className={'col-md-8' + (width < 700 ? ' mt-5' : '')}>
            {data != null ? <div>
                <Bar
                        data={{
                            labels: data.onChart.labels,
                            datasets: [
                                {
                                  label: 'BNK48 and CGM48 members',
                                  data: data.onChart.data,
                                  backgroundColor: data.onChart.labels.map((x) => x.includes('CGM48') ? '#49C5A8' : '#cb96c2'),
                                  borderColor: data.onChart.labels.map((x) => x.includes('CGM48') ? '#49C5A8' : '#cb96c2'),
                                  borderWidth: 0,
                                },
                              ],
                            }}
                      />
            </div> : <Skeleton height={400} width='100%'  />}
        </div>
        <div className='col-md-4'>
            {data2 != null ? <div>
                <Doughnut
                plugins={[ChartDataLabels]}
                options={{
                    plugins:{
                        datalabels:{
                            color: '#454444',
                            formatter: (value, ctx) => {
                                return data2.list[ctx.dataIndex].header + "\n("+ numberWithCommas((value / data2.allToken)*100) + '%)';
                              }
                        }
                    }
                }}
                        data={{
                            labels: data2.onChart.labels,
                            datasets: [
                              {
                                label: 'BNK48 and CGM48 members',
                                data: data2.onChart.data,
                                backgroundColor: data2.onChart.labels.map((x) => x.includes('CGM48') ? '#49C5A8' : '#cb96c2'),
                                borderColor: data2.onChart.labels.map((x) => x.includes('CGM48') ? '#c2fcef' : '#fac5f1'),
                                borderWidth: 1,
                              },
                            ],
                            }}
                      />
            </div> : <Skeleton height={400} width='100%' />}
        </div>
</div>
<CardHeader className='mt-3' title='1st Round Result' />
<TableContainer>
                <Table stickyHeader aria-label="simple table">
                <caption className='text-right'>Note: These result is syncing from <a href='https://scan.tokenx.finance/address/0xE4629861b811d23Afde5E4476DFA79003C0E83d1/read-contract' target='_blank'>Token X Smart Contract (TKX Scan)</a> and every value may change. Please check the official results at BNK48 Official soon.</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.rank}>Rank</TableCell>
                      <TableCell className={classes.img} align="center">Member Image</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Band</TableCell>
                      <TableCell align="right">Team</TableCell>
                      <TableCell align="right">Token</TableCell>
                      <TableCell align="right">Win Rate (%)</TableCell>
                    </TableRow>
                  </TableHead>
                  {data != null && bnk.length > 0 && cgm.length > 0 ? data.list.map((item, i) => (
                     <TableBody key={item.header + item.desc} onClick={() => item.desc.includes('CGM48') ? History.push('/member/' + item.header.toLowerCase()) : item.desc.includes('BNK48') ? window.open('//cp-bnk48.pages.dev/member/' + item.header.toLowerCase(), '_target') : ''}
                        data-aos='fade-right' className={i >= 0 && i<=19 ? 'bg-success' : ''}
                    >
                        <TableCell component="th" className={classes.rank}>
                          {i + 1}
                        </TableCell>
                        <TableCell align="center" className={classes.img}>
                        <img src={item.desc.includes('BNK48') ? bnk.filter(x => x.name == item.header)[0].img : cgm.filter(x => x.name == item.header)[0].img} className={classes.large + ' cir avatarlimit'} />
                          </TableCell>
                          <TableCell align="center">
                          {item.desc.includes('BNK48') ? bnk.filter(x => x.name == item.header)[0].fullnameEn[0] : cgm.filter(x => x.name == item.header)[0].fullnameEn[0]}  {item.desc.includes('BNK48') ? bnk.filter(x => x.name == item.header)[0].fullnameEn[1] : cgm.filter(x => x.name == item.header)[0].fullnameEn[1]} ({item.header})
                          </TableCell>
                          <TableCell align="center">
                          {item.desc}
                          </TableCell>
                          {
                            item.desc.includes('CGM48') ? (
                              <TableCell align="right">
                              {item.team == "" ? 'None' : (item.desc.includes('BNK48') ? bnk.filter(x => x.name == item.header)[0].team : cgm.filter(x => x.name == item.header)[0].team)}
                              </TableCell>
                            ) : (
                              <TableCell align="right">
                              {item.team == "" ? 'None' : (item.desc.includes('BNK48') ? bnk.filter(x => x.name == item.header)[0].team[0] : cgm.filter(x => x.name == item.header)[0].team[0])}
                              </TableCell>
                            )
                          }
                           <TableCell align="right">
                          {numberWithCommas(item.token)}
                          </TableCell>
                          <TableCell align="right">
                          {numberWithCommas((item.token / data.allToken) * 100)}
                          </TableCell>
                  </TableBody>
                  )): (
                    <>
                    <TableBody>
                        <TableCell colSpan={7} component="th">
                            <Skeleton height={70} width='100%' />
                        </TableCell>
                  </TableBody>
                    <TableBody>
                        <TableCell colSpan={7} component="th">
                            <Skeleton height={70} width='100%' />
                        </TableCell>
                  </TableBody>
                    <TableBody>
                        <TableCell colSpan={7} component="th">
                            <Skeleton height={70} width='100%' />
                        </TableCell>
                  </TableBody>
                    <TableBody>
                        <TableCell colSpan={7} component="th">
                            <Skeleton height={70} width='100%' />
                        </TableCell>
                  </TableBody>
                    </>
                  )}
                </Table>
              </TableContainer>

              <CardHeader className='mt-3' title='Final Round Result' />
                <TableContainer>
                <Table stickyHeader aria-label="simple table">
                <caption className='text-right'>Note: These result is syncing from <a href='https://scan.tokenx.finance/address/0xa8E49Dce482E68df7D89509b4810dc466bd6f24A/read-contract' target='_blank'>Token X Smart Contract (TKX Scan)</a> and every value may change. Please check the official results at BNK48 Official soon.</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.rank}>Rank</TableCell>
                      <TableCell className={classes.img} align="center">Member Image</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Band</TableCell>
                      <TableCell align="right">Team</TableCell>
                      <TableCell align="right">Token</TableCell>
                      <TableCell align="right">Win Rate (%)</TableCell>
                    </TableRow>
                  </TableHead>
                  {data2 != null && bnk.length > 0 && cgm.length > 0 ? data2.list.map((item, i) => (
                     <TableBody key={item.header + item.desc} onClick={() => item.desc.includes('CGM48') ? History.push('/member/' + item.header.toLowerCase()) : item.desc.includes('BNK48') ? window.open('//cp-bnk48.pages.dev/member/' + item.header.toLowerCase(), '_target') : ''}
                        data-aos='fade-right' className={i >= 0 && i<=5 ? 'bg-success' : ''}
                    >
                        <TableCell component="th" className={classes.rank}>
                          {i + 1}
                        </TableCell>
                        <TableCell align="center" className={classes.img}>
                        <img src={item.desc.includes('BNK48') ? bnk.filter(x => x.name == item.header)[0].img : cgm.filter(x => x.name == item.header)[0].img} className={classes.large + ' cir avatarlimit'} />
                          </TableCell>
                          <TableCell align="center">
                          {item.desc.includes('BNK48') ? bnk.filter(x => x.name == item.header)[0].fullnameEn[0] : cgm.filter(x => x.name == item.header)[0].fullnameEn[0]}  {item.desc.includes('BNK48') ? bnk.filter(x => x.name == item.header)[0].fullnameEn[1] : cgm.filter(x => x.name == item.header)[0].fullnameEn[1]} ({item.header})
                          </TableCell>
                          <TableCell align="center">
                          {item.desc}
                          </TableCell>
                          {
                            item.desc.includes('CGM48') ? (
                              <TableCell align="right">
                              {item.team == "" ? 'None' : (item.desc.includes('BNK48') ? bnk.filter(x => x.name == item.header)[0].team : cgm.filter(x => x.name == item.header)[0].team)}
                              </TableCell>
                            ) : (
                              <TableCell align="right">
                              {item.team == "" ? 'None' : (item.desc.includes('BNK48') ? bnk.filter(x => x.name == item.header)[0].team[0] : cgm.filter(x => x.name == item.header)[0].team[0])}
                              </TableCell>
                            )
                          }
                           <TableCell align="right">
                          {numberWithCommas(item.token)}
                          </TableCell>
                          <TableCell align="right">
                          {numberWithCommas((item.token / data.allToken) * 100)}
                          </TableCell>
                  </TableBody>
                  )): (
                    <>
                    <TableBody>
                        <TableCell colSpan={7} component="th">
                            <Skeleton height={70} width='100%' />
                        </TableCell>
                  </TableBody>
                    <TableBody>
                        <TableCell colSpan={7} component="th">
                            <Skeleton height={70} width='100%' />
                        </TableCell>
                  </TableBody>
                    <TableBody>
                        <TableCell colSpan={7} component="th">
                            <Skeleton height={70} width='100%' />
                        </TableCell>
                  </TableBody>
                    <TableBody>
                        <TableCell colSpan={7} component="th">
                            <Skeleton height={70} width='100%' />
                        </TableCell>
                  </TableBody>
                    </>
                  )}
                </Table>
              </TableContainer>
              {
                data != null && fetready && (
                    <Fab onClick={() => fetchapi()} style={{position: 'fixed', zIndex: 900, bottom: '35%', right: 5}}>
                        <RefreshIcon />
                    </Fab>
                )
              }
    </div> );
}
 
export default SongChart;