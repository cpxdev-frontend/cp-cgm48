import React from 'react'
import AOS from 'aos'
import moment from 'moment';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardHeader, CardContent, IconButton, Grow, Fade, Tooltip } from '@material-ui/core';

    import LocationOnIcon from '@material-ui/icons/LocationOn';
    import CachedIcon from '@material-ui/icons/Cached';

const Finder = ({fet, setSec, width}) => {
    const [Loaded, setLoaded] = React.useState(false);
    const [Arr, setArr] = React.useState([]);
    const [nearest, setSignal] = React.useState(null);
    const [estimatedis, setDistance] = React.useState(0);

    function degToRad(deg) {
        return deg * (Math.PI / 180.0);
    }

    const remainEvent = (unixStart) => {
        let start = moment(); // some random moment in time (in ms)
        let end = moment.unix(unixStart); // some random moment after start (in ms)
        const ms = end.diff(start)
        const date = moment.duration(ms)
        // execution
        let f = Math.floor(date.asDays()) + ' Day(s) ' + moment.utc(ms).format("H") + ' Hour(s) ' + moment.utc(ms).format("mm") + ' Minute(s) ';
        return f
    }

    function distance(position1,position2){

        var lat2=position2.latitude;
        var lon2=position2.longitude;
        var R = 10000000; // metres

        if (position1.place != undefined) {
            if ((position1.locate != undefined || position1.locate != null) && !position1.place.includes('IAMP')) {
                var lat1=parseFloat(position1.locate[0]);
                var lon1=parseFloat(position1.locate[1]);
                var φ1 = degToRad(lat1);
                var φ2 = degToRad(lat2);
                var Δφ = degToRad(lat2-lat1);
                var Δλ = degToRad(lon2-lon1);
            
                var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            
                var d = R * c;
                return d;
            }
            if ((position1.locate == undefined || position1.locate == null) && position1.place.includes('IAMP')) {
                var lat1=position1.placeobj.placeCoodinate[0];
                var lon1=position1.placeobj.placeCoodinate[1];
                var φ1 = degToRad(lat1);
                var φ2 = degToRad(lat2);
                var Δφ = degToRad(lat2-lat1);
                var Δλ = degToRad(lon2-lon1);
            
                var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            
                var d = R * c;
                return d;
            }
        }
        return null
    }

    const progress = (cood, data) => {
        let arr = []
        for(var i=0;i<data.length;i++){
            if (distance(data[i],cood) != null && moment().unix() >= data[i].timerange[0] - 604800) {
                arr.push({
                 distance: distance(data[i],cood),
                 data: data[i]
                })
            }
        }

        const numbers = arr.map((item) => item.distance);

        if (arr.length > 0) {
            const smallestNumber = numbers.reduce((min, current) => {
                return current < min ? current : min;
            });

            const nearest = arr.filter(x=> x.distance == smallestNumber)[0]

            setSignal(nearest);
        } 
        setLoaded(true)
    }

    const FindAction = (data) => {
        setLoaded(false)
        navigator.geolocation.getCurrentPosition(function(position) {
            progress(position.coords, data)
          });
    }

    React.useEffect(() => {
        AOS.init({ duration: 800 });
        setSec('CGM48 Event Finder')
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(encodeURI(fet + '/cgm48/getadsupdate'), {
            method: 'post', // or 'PUT'
            })
            .then(response => response.json())
            .then(data => {
                setArr(data)
                FindAction(data)
            })
            .catch((error) => {
                setLoaded(true)
            console.error('Error:', error);
            });
    }, [])

   


    return ( 
        <>
       <CardHeader className='container mt-5' title='CGM48 Event Finder' subheader='New feature for CGM48 Fans who want to see CGM48 events from your nearby.'
         action={
            <IconButton onClick={() =>
                Loaded == true ? FindAction(Arr) : null
            }>
              <CachedIcon />
            </IconButton>
          } />
        <div className='container'>
            
        {Loaded && nearest != null ? (
               <Card className='mb-3' data-aos="fade-right">
               <CardContent className='row'>
                   <div className='col-md-5'>
                       <img src={nearest.data.src} width="100%" />
                   </div>
                   <div className='col-md mt-3'>
                       <h4 data-aos="zoom-in-right">{nearest.data.title}&nbsp;
                       {nearest.data.timerange[0] > 0 && nearest.data.timerange[1] == 0 && nearest.data.timerange[0] <= moment().unix() && (
                           <span className='badge badge-success'>
                               Event has been started
                           </span>
                           )}
                           {nearest.data.timerange[0] > 0 && nearest.data.timerange[1] > 0 && nearest.data.timerange[0] < nearest.data.timerange[1] &&
                           moment().unix() >= nearest.data.timerange[0] && moment().unix() <= nearest.data.timerange[1] && (
                           <span className='badge badge-success'>
                                Event is starting
                           </span>
                           )}
                       </h4>
                       {nearest.data.timerange[0] > 0 && nearest.data.timerange[0] > moment().unix() && (
                           <p className='mt-1 mb-3'>
                               Event is coming soon in <b>{moment.unix(nearest.data.timerange[0]).format('ddd DD MMMM yyyy H:mm A')} {moment().unix() >= nearest.data.timerange[0] -259200 && moment().unix() < nearest.data.timerange[0] && (
                               <i>
                                   <br /> Please be patient in {remainEvent(nearest.data.timerange[0])}
                               </i>
                           )}</b>
                           </p>
                           )}
                           {nearest.data.timerange[0] > 0 && nearest.data.timerange[1] == 0 && nearest.data.timerange[0] <= moment().unix() && (
                           <p className='mt-1 mb-3'>
                               Event has been started since <b>{moment.unix(nearest.data.timerange[0]).format('ddd DD MMMM yyyy')}</b>
                           </p>
                           )}
                           {nearest.data.timerange[0] > 0 && nearest.data.timerange[1] > 0 && nearest.data.timerange[0] < nearest.data.timerange[1] &&
                           moment().unix() >= nearest.data.timerange[0] && moment().unix() <= nearest.data.timerange[1] && (
                           <p className='mt-1 mb-3'>
                                Event is starting until <b>{moment.unix(nearest.data.timerange[1]).format('ddd DD MMMM yyyy H:mm A')}</b>
                           </p>
                           )}
                           
                           
                       <p className='text-muted mt-3' data-aos="zoom-in">{nearest.data.desc}</p>
                       {
                           nearest.data.link != '' && (
                               <div data-aos="fade-down">
                               <a href={nearest.data.link} target='_blank'>More detail of this event</a>
                               </div>
                           )
                       }
                       {
                           nearest.data.place != '' && nearest.data.place.includes('IAMP') && (
                           <a href={nearest.data.placeobj.ref} target='_blank' className='mt-1' data-toggle="tooltip" data-placement="down" title={nearest.data.placeobj.placeDesc}>
                               <LocationOnIcon/> Location: {nearest.data.placeobj.placeName + ", " + nearest.data.placeobj.placeProvince}
                           </a>
                           )
                       }
                       {
                           nearest.data.place != '' && !nearest.data.place.includes('IAMP') && (
                           <a href={nearest.data.place} target='_blank' className='mt-1'>
                               <LocationOnIcon/> Where is this event?
                           </a>
                           )
                       }
                       {nearest.distance >= 0.5 ? (
                        <p data-aos="zoom-in-right" className='mt-3'>Approximate distance of {(nearest.distance / 1000).toFixed(2)} kilometers from your current address.</p>
                       ) : (
                        <p data-aos="zoom-in-right" className='mt-3'>You maybe are here!</p>
                       )}
                   </div>
               </CardContent>
           </Card>
        ) : Loaded && nearest == null ? (
            <Card className='mb-3 text-center'>
            <CardContent className='row'>
               <h5>Not found the nearest BNK48 event from here.</h5>
            </CardContent>
        </Card>
     )  : (
            <div className='text-center'>
            <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
            <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" className='text-center mt-3 mb-5' />
            </Zoom>
            </div>
        )}
        </div>
        </>
    );
}
 
export default Finder;