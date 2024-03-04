import React from 'react';
import { Card, CardHeader, DialogActions, DialogTitle, DialogContent, Zoom, CardActions, IconButton, Dialog, Button, Grow, Typography, CardContent } from '@material-ui/core';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AOS from "aos";
import moment from 'moment'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Offi = ({fet, setSec, width}) => {
    const [Loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        AOS.init({ duration: 800 });
        setSec('Official Update')
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setLoaded(true)
    }, [])



    return ( 
        <>
        <h3 className='text-center mt-5'>Official Update</h3>
        <p className='text-center'>News or announcement update from CGM48 Official. Powered by Facebook</p>
       <div className='container d-flex justify-content-center'>
       <iframe src={"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcgm48official&tabs=timeline&width=500&small_header=false&adapt_container_width=true&height=700&hide_cover=false&show_facepile=true"} width="500px" height="700px" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
       </div>
        </>
    );
}
 
export default Offi;
