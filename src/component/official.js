import React from 'react';
import { Card, CardHeader, DialogActions, DialogTitle, DialogContent, Zoom, CardActions, IconButton, Dialog, Button, Grow, Typography, CardContent } from '@material-ui/core';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AOS from "aos";
import moment from 'moment'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../../src/official.css"; // requires a loader
import { Timeline } from 'react-twitter-widgets'

const Offi = ({fet, setSec, width}) => {
    const [Loaded, setLoaded] = React.useState(false);
    const [Arr, setArr] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [para, setpara] = React.useState('');
    const [fetLLoad, setFet] = React.useState(false);

    React.useEffect(() => {
        AOS.init({ duration: 800 });
        setSec('Official Update')
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setTimeout(() => {
            setLoaded(true)
            setArr([])
        }, 5000);
        // fetch(encodeURI(fet + '/cgm48/getoffnewsnew?tstamp=' + Math.floor( new Date().getTime()  / 1000)), {
        //     method: 'post', // or 'PUT'
        //     })
        //     .then(response => response.text())
        //     .then(data => {
        //         setLoaded(true)
        //         setArr(data.replaceAll("twstalker", "twitter"))
        //         const elements = document.querySelectorAll(".activity-posts");
        //         elements.forEach(function(element) {
        //             element.setAttribute('data-aos', 'zoom-in-down');
        //         });

        //         const img = document.querySelectorAll(".main-photo");
        //         img.forEach(function(element) {
        //             element.classList.add('text-center');
        //         });
        //     })
        //     .catch((error) => {
        //         setLoaded(true)
        //     console.error('Error:', error);
        //     });
    }, [])

    function removeurl(text) {
        const uri = text.match(/https?:\/\/\S+/gi)
        const re = text.replace(uri, '')
        return re
      }
        const hand = (order, val) => {
            setOpen(order)
            if (order == true) {
                setpara(val)
                setFet(true)
            } else {
                setFet(false)
                setpara('')
            }
        }


    return ( 
        <>
        <h3 className='text-center mt-5'>Official Update</h3>
        <p className='text-center'>News or announcement update from CGM48 Official. Powered by Twitter</p>
        {Loaded ? (
             <div className={"stage justify-content-center pt-5" + (width > 600 ? ' pl-5 pr-5' : ' pl-3 pr-3')}>
             <br />
             <div className='col-12'>
             {Arr != null ? (
                 <Timeline
                 dataSource={{
                   sourceType: 'profile',
                   screenName: 'cgm48official'
                 }}
               />
             ) : (
                 <div className='text-center col-md-12'>
                    No update from CGM48 Official
                 </div>
             )}
             </div>
             {
                para != '' && (
                    <Dialog
                           open={open}
                           onClose={() => hand('')}
                           fullWidth={true}
                           maxWidth='md'
                           aria-labelledby="alert-dialog-title"
                           aria-describedby="alert-dialog-description"
                       >
                           <DialogTitle id="alert-dialog-title">{'More tweet about "' + para.title.substring(0, 60) + '..."'}</DialogTitle>
                           <DialogContent>
                           <Grow in={!fetLLoad} timeout={300}>
                               <div className='d-flex justify-content-center'>
                           <TwitterTweetEmbed
                               tweetId={para.link.replace("https://india.unofficialbird.com/bnk48official/status/", "").replace("#m", "")}
                               onLoad={() => setFet(false)}
                               />
                               </div>
                               </Grow>
                               {fetLLoad && (
                                    <Zoom in={fetLLoad} timeout={{ enter: 200, exit: 200}}>
                               <div className='text-center'>
                                    <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                                    </div>
                                    </Zoom>
                               )}
                           </DialogContent>
                           <DialogActions>
                           <Button onClick={() => hand('')} className="text-dark">
                               Close
                           </Button>
                           </DialogActions>
                       </Dialog>
                )
             }
             </div>
        ) : (
            <div className='text-center'>
            <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
            <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" className='text-center mt-3 mb-5' />
            </Zoom>
            </div>
        )}
        </>
    );
}
 
export default Offi;
