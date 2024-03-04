import React from 'react';
import { Card, CardContent, CardHeader, Backdrop, AppBar, Box, Tabs, Tab,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import AOS from "aos";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

  var m;


  const numberWithCommasx = (x) => {
    return parseInt(x).toLocaleString('en-US');
}

const Stream = ({fet, setSec, width}) => {
  const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const [streaminfo, setInfo] = React.useState(null);
    const [Load, setLoad] = React.useState(true);
    const [comment, setCom] = React.useState(null);

    const [comin, setCurrentCom] = React.useState(-1);

      const fetchlivecomment = (id) => {
        if (id == undefined) {
          return;
        }
        fetch(fet + '/cgm48/getstreamcomment?id=' + id, {
          method :'post'
      })
          .then(response => response.json())
          .then(data => {
            const newData = {
              view: data.view,
              comments: data.comments.filter(x => !x.snippet.textMessageDetails.messageText.includes('::'))
            }
            setCom(newData)

            setCurrentCom(Math.floor(Math.random() * newData.comments.length))
      })
    }

    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        fetch(fet + '/cgm48/getstreamlist?ch=3', {
            method :'post'
        })
            .then(response => response.json())
            .then(data => {
                if (data.length == 1 && data[0].link == '') {
                    setSec('No Live today')
                } else {
                    setSec('[Live] ' + data[0].title)
                }
              setInfo(data)

              fetchlivecomment(data[0].id)
              m = setInterval(() => {
                fetchlivecomment(data[0].id)
              }, 15000);

              setLoad(false)
            }).catch(() => {
              setLoad(false)
            })
    },[])



      const handleChange = (event, newValue) => {
        setValue(newValue);
        setCom(null)
        setCurrentCom(-1)
        setSec('[Live] ' + streaminfo[newValue].title)
        clearInterval(m)
        
        fetchlivecomment(streaminfo[newValue].id)
        m = setInterval(() => {
          fetchlivecomment(streaminfo[newValue].id)
        }, 8000);
      };
    return ( 
        <>
        <AppBar position="static" className='mt-2'>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="LIVE Room 1" {...a11yProps(0)} />
            {streaminfo != null && streaminfo.filter(x => x.link != '').length > 1 && (
                <Tab label="LIVE Room 2" {...a11yProps(1)} />
            )}
        </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <Card>
                <CardContent className='text-center align-center'>
                    {streaminfo != null && streaminfo[0].link != '' ? (
                        <CardHeader title='Live Streaming Station' subheader={(streaminfo[0].livestatus == 'live' ? '[LIVE] "' + streaminfo[0].title : streaminfo[0].title) + '" by ' + streaminfo[0].uploader} />
                    ): (
                        <CardHeader title='Live Streaming Station' subheader='Special Live Streaming will coming soon' />
                    )}

                    {comment != null && comment.view != ""  && (
                      <CardHeader title={window.innerWidth > 900 ? (<span class="badge badge-pill badge-info">
                      There are currently {numberWithCommasx(comment.view)} people(s) watching this live.</span>) : (<span class="badge badge-pill badge-info">
                      {numberWithCommasx(comment.view)} views</span>)} />
                    )}
                
                
                    <div className='container' data-aos="zoom-out-up">
                        {streaminfo != null && streaminfo[0].link != '' ? (
                            <iframe src={streaminfo[0].link} width="100%" height={width >1200 ? 700 : '100%'} allowFullScreen />
                        ) : (
                            <h6>Stream not found</h6>
                        )}
                    </div>
                </CardContent>
                <CardContent>
                {
                  comment != null && comment.view != "" && comin > -1 && (
                    <CardContent className='text-left align-start'>
                      <CardHeader title={<div dangerouslySetInnerHTML={{ __html: comment.comments[comin].snippet.textMessageDetails.messageText }}></div>} subheader={'Comment from Youtube user since ' + moment(comment.comments[comin].snippet.publishedAt).local().format('DD MMMM YYYY HH:mm:ss')} />
                  </CardContent>
                  )
                }
                </CardContent>
            </Card>
        </TabPanel>
        {streaminfo != null && streaminfo.filter(x => x.link != '').length > 1 && (
        <TabPanel value={value} index={1}>
         <Card>
                <CardContent className='text-center align-center'>
                    {streaminfo != null && streaminfo[1].link != '' ? (
                        <CardHeader title='Live Streaming Station' subheader={(streaminfo[1].livestatus == 'live' ? '[LIVE] "' + streaminfo[1].title : streaminfo[1].title) + '" by ' + streaminfo[1].uploader} />
                    ): (
                        <CardHeader title='Live Streaming Station' subheader='Special Live Streaming will coming soon' />
                    )}

                    {comment != null && comment.view != ""  && (
                      <CardHeader title={window.innerWidth > 900 ? (<span class="badge badge-pill badge-info">
                      There are currently {numberWithCommasx(comment.view)} people(s) watching this live.</span>) : (<span class="badge badge-pill badge-info">
                      {numberWithCommasx(comment.view)} views</span>)} />
                    )}
                
                    <div className='container' data-aos="zoom-out-up">
                        {streaminfo != null && streaminfo[1].link != '' ? (
                            <iframe src={streaminfo[1].link} width="100%" height={width >1200 ? 700 : '100%'} allowFullScreen />
                        ) : (
                            <h6>Stream not found</h6>
                        )}
                    </div>
                </CardContent>
                <CardContent>
                {
                  comment != null && comment.view != "" && comin > -1 && (
                    <CardContent className='text-left align-start'>
                      <CardHeader title={<div dangerouslySetInnerHTML={{ __html: comment.comments[comin].snippet.displayMessage }}></div>} subheader={'Comment from Youtube user since ' + moment(comment.comments[comin].snippet.publishedAt).local().format('DD MMMM YYYY HH:mm:ss')} />
                  </CardContent>
                  )
                }
                </CardContent>
            </Card>
        </TabPanel>
        )}
        <Card className='mt-3'>
          <CardContent className="text-center">
            New feature: This is CGM48 LIVE Room. The new feature of watching CGM48 LIVE Sreaming event. The first Room can be detected from CGM48 Youtube official and another sponsership platform (for Press Promote etc.). The second Room can be detected from another sponsership platform (for Press Promote etc. - if included). You can switch LIVE Room which you want seamlessly.
          </CardContent>
        </Card>
            <Backdrop className={classes.backdrop} open={Load}>
            <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" />
        </Backdrop>
        </>
     );
}
 
export default Stream;