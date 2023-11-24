import React from 'react'
import AOS from 'aos'
import moment from 'moment';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardActionArea, CardContent, IconButton, Grow, Fade, Tooltip, CardHeader, Avatar } from '@material-ui/core';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CachedIcon from '@material-ui/icons/Cached';
import {bnklink, bnktype,cgmlink,cgmtype} from '../config'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {
    useHistory,
  } from "react-router-dom";

mapboxgl.accessToken = 'pk.eyJ1IjoiY3B4dGgyMDE3IiwiYSI6ImNsZHY0MzN6bTBjNzEzcXJmamJtN3BsZ3AifQ.mYNwWaYKsiLeYXngFDtaWQ';

const bnk = {
    path: bnklink,
    type: bnktype
  }
  const cgm = {
    path: cgmlink,
    type: cgmtype
  }
  
const Finder = ({fet, setSec, width, kamin}) => {
    const History = useHistory()
    const [Loaded, setLoaded] = React.useState(false);
    const [refresh, setRe] = React.useState(true);
    const [Arr, setArr] = React.useState([]);
    const [loc, setLocate] = React.useState([]);
    const [nearest, setSignal] = React.useState(null);
    const [eventPlace, setEventPlace] = React.useState('');

    const mapContainer = React.useRef(null);
    const map = React.useRef(null);

    const remainEvent = (unixStart) => {
        let start = moment(); // some random moment in time (in ms)
        let end = moment.unix(unixStart); // some random moment after start (in ms)
        const ms = end.diff(start)
        const date = moment.duration(ms)
        // execution
        let f = Math.floor(date.asDays()) + ' Day(s) ' + moment.utc(ms).format("H") + ' Hour(s) ' + moment.utc(ms).format("mm") + ' Minute(s) ';
        return f
    }

    const progress = (data) => {
        if (data.place.includes('IAMP') || (!data.place.includes('IAMP')  && data.locate != null)) {
            setRe(false)
            if (data.place.includes('IAMP') ) {
                setEventPlace('')
                if (loc.filter(x => x.id == data.newsId).length > 0) {
                    setRe(true)
                    setEventPlace(loc.filter(x => x.id == data.newsId)[0].place)
                } else {
                    fetch(encodeURI(fet + '/locator/getlocate?lat=' + data.placeobj.placeCoodinate[0] + '&lon=' + data.placeobj.placeCoodinate[1]), {
                        method: 'post', // or 'PUT'
                        })
                        .then(response => response.json())
                        .then(res => {
                            setEventPlace(res.display_name.split(", ")[0])
                            let t = loc
                            t.push({
                                id: data.newsId,
                                place: res.display_name.split(", ")[0]
                            })
                            setRe(true)
                            setLocate(t)
                        })
                        .catch((error) => {
                        console.error('Error:', error);
                        });
                }
            } else {
                setEventPlace('')
                if (loc.filter(x => x.id == data.newsId).length > 0) {
                    setRe(true)
                    setEventPlace(loc.filter(x => x.id == data.newsId)[0].place)
                } else {
                    fetch(encodeURI(fet + '/locator/getlocate?lat=' + data.locate[0] + '&lon=' + data.locate[1]), {
                        method: 'post', // or 'PUT'
                        })
                        .then(response => response.json())
                        .then(res => {
                            setEventPlace(res.display_name.split(", ")[0])
                            let t = loc
                            t.push({
                                id: data.newsId,
                                place: res.display_name.split(", ")[0]
                            })
                            setRe(true)
                            setLocate(t)
                        })
                        .catch((error) => {
                        console.error('Error:', error);
                        });
                }
            }
         }
    }




    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
 

    const checkeventStart = (start, end) => {
       if (moment().unix() < start) {
            return 0
       } else if (moment().unix() >= start && moment().unix() <= end) {
            return 1
       } else {
            return 2
       }
    }

    function scrollToBottom() {
        if ('scrollBehavior' in document.documentElement.style) {
        // ใช้ smooth scroll ถ้าเบราว์เซอร์รองรับ
        document.getElementById('card').scrollIntoView({
            behavior: 'smooth'
          });
        }
    }
  
    function scrollToTop() {
        if ('scrollBehavior' in document.documentElement.style) {
        // ใช้ smooth scroll ถ้าเบราว์เซอร์รองรับ
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        } else {
        // ใช้ scroll ปกติถ้าไม่รองรับ
        window.scrollTo(0, 0);
        }
        setEventPlace('')
        setSignal(null)
    }
  
  
    const pageDirect = (link) => {
        if (link.includes('https:') || link.includes('http:')) {
          window.open(link, '_blank')
        } else {
          History.push(link)
        }
      }

  

    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        setSec('Event Finder')
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        if (map.current) return; // initialize map only once
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [98.99720764160156, 18.785381317138672],
            zoom: 10,
            maxZoom:20,
            minZoom: 8
          });
          
          map.current.addControl(
            new mapboxgl.GeolocateControl({
                fitBoundsOptions: {
                    maxZoom: 10
                },
              positionOptions: {
              enableHighAccuracy: false
              },
              trackUserLocation: true,
            })
            );
          fetch('https://cpxdevservice.onrender.com/cgm48/getadsupdate',{
            method: 'post'
          })
          .then(response => response.json())
          .then((data) => {
            if (map.current != null) {
              let geo = []
              for (let i=0; i< data.length; i++){
                if (data[i].place.includes('IAMP') || (!data[i].place.includes('IAMP') && data[i].locate != null) && data[i].timerange[1] > 0) {
                    if (data[i].place.includes('IAMP') ) {
                        const coodinate = [data[i].placeobj.placeCoodinate[1], data[i].placeobj.placeCoodinate[0]]
                        const popup = new mapboxgl.Popup()
                          .setHTML('<p id="'+ data[i].newsId + '">' + data[i].title +'</p>')
                          .addTo(map.current);
                        popup.remove();
                        let props; 
                        switch(checkeventStart(data[i].timerange[0], data[i].timerange[1])) {
                            case 0 : {
                                props = { "color": "#00aeff",easeId: data[i].newsId }
                                break;
                            }
                            case 1 : {
                                props = { "color": "#49C5A8",easeId: data[i].newsId }
                                break;
                            }
                            default : {
                                props = { "color": "#747575",easeId: data[i].newsId }
                                break;
                            }
                        }
                        new mapboxgl.Marker(props)
                          .setLngLat(coodinate).addTo(map.current).setPopup(popup)
                    } else {
                        const coodinate = [data[i].locate[1], data[i].locate[0]]
                        const popup = new mapboxgl.Popup()
                          .setHTML('<p id="'+ data[i].newsId + '">' + data[i].title +'</p>')
                          .addTo(map.current);
                        popup.remove();
                        let props; 
                        switch(checkeventStart(data[i].timerange[0], data[i].timerange[1])) {
                            case 0 : {
                                props = { "color": "#00aeff",easeId: data[i].newsId }
                                break;
                            }
                            case 1 : {
                                props = { "color": "#49C5A8",easeId: data[i].newsId }
                                break;
                            }
                            default : {
                                props = { "color": "#747575",easeId: data[i].newsId }
                                break;
                            }
                        }
                        new mapboxgl.Marker(props)
                          .setLngLat(coodinate).addTo(map.current).setPopup(popup)
                    }
                 }
              }
              setArr(data)
              setLoaded(true)
              map.current.on("click", (e) => {
                if (e.target._popups[0] == undefined || refresh == false) {
                    return;
                }
                const marker = JSON.parse(JSON.stringify(e.target._popups[0]._lngLat));
                let d = null;
                for (let i=0; i< data.length; i++){
                    if (data[i].place.includes('IAMP') || (!data[i].place.includes('IAMP') && data[i].locate != null) && data[i].timerange[1] > 0) {
                        if (data[i].place.includes('IAMP') ) {
                            if (data[i].placeobj.placeCoodinate[0] == marker.lat && data[i].placeobj.placeCoodinate[1] == marker.lng) {
                                d = data[i]
                                break;
                            }
                        } else {
                            if (data[i].locate[0] == marker.lat && data[i].locate[1] == marker.lng) {
                                    d = data[i]
                                    break;
                            }
                        }
                     }
                  }
                
                  if (d != null) {
                    if (d.place.includes('IAMP') ) {
                        map.current.setCenter([d.placeobj.placeCoodinate[1], d.placeobj.placeCoodinate[0]]);
                    } else {
                        map.current.setCenter([d.locate[1], d.locate[0]]);
                    }
                }
                setTimeout(() => {
                    if (d != null) {
                      setSignal(d)
                      progress(d)
                    }
                    
                  scrollToBottom()
                }, 2000);
              });
            }
          })
          .catch((a) => {console.log(a)});
    }, [])

   


    return ( 
        <>
        <CardHeader className='container mt-5' title='CGM48 Event Finder' subheader='New feature for CGM48 Fans who want to see CGM48 events from your nearby.' />
       
        {/* <p className='text-center'>All upcoming CGM48 Theater Stage showtime at CGM48 Campus, 4th Floor at The Mall Bangkapi. See navigate to Theater from <a href="https://goo.gl/maps/CFvM1PSbY7smBPkh9" target="_blank">here</a></p> */}
 
        <div className='container mb-3'>
        <Card className='pt-3 pb-3 mb-3' data-aos="zoom-in">
            <div ref={mapContainer} className="map-container" />
           </Card>
        {Loaded && nearest != null ? (
               <Card className='mb-5' data-aos="fade-right" id="card">
               <CardContent className='row'>
                   <div className='col-md-5'>
                       <img src={nearest.src} width="100%" />
                   </div>
                   <div className='col-md mt-3'>
                       <h4 data-aos="zoom-in-right">{nearest.title}&nbsp;
                       {nearest.timerange[0] > 0 && nearest.timerange[1] == 0 && nearest.timerange[0] <= moment().unix() && (
                           <span className='badge badge-success'>
                               Event has been started
                           </span>
                           )}
                           {nearest.timerange[0] > 0 && nearest.timerange[1] > 0 && nearest.timerange[0] < nearest.timerange[1] &&
                           moment().unix() >= nearest.timerange[0] && moment().unix() <= nearest.timerange[1] && (
                           <span className='badge badge-success'>
                                Event is starting
                           </span>
                           )}
                       </h4>
                       {nearest.timerange[0] > 0 && nearest.timerange[0] > moment().unix() && (
                           <p className='mt-1 mb-3'>
                               Event is coming soon in <b>{moment.unix(nearest.timerange[0]).format('ddd DD MMMM yyyy H:mm A')} {moment().unix() >= nearest.timerange[0] -259200 && moment().unix() < nearest.timerange[0] && (
                               <i>
                                   <br /> This event is soon in {remainEvent(nearest.timerange[0])}
                               </i>
                           )}</b>
                           </p>
                           )}
                           {nearest.timerange[0] > 0 && nearest.timerange[1] == 0 && nearest.timerange[0] <= moment().unix() && (
                           <p className='mt-1 mb-3'>
                               Event has been started since <b>{moment.unix(nearest.timerange[0]).format('ddd DD MMMM yyyy')}</b>
                           </p>
                           )}
                           {nearest.timerange[0] > 0 && nearest.timerange[1] > 0 && nearest.timerange[0] < nearest.timerange[1] &&
                           moment().unix() >= nearest.timerange[0] && moment().unix() <= nearest.timerange[1] && (
                           <p className='mt-1 mb-3'>
                                Event is starting until <b>{moment.unix(nearest.timerange[1]).format('ddd DD MMMM yyyy H:mm A')}</b>
                           </p>
                           )}
                           
                           
                       <p className='text-muted mt-3' data-aos="zoom-in">{nearest.desc}</p>
                       {
                           nearest.link != '' && (
                               <div data-aos="fade-down">
                               <a onClick={() => pageDirect(nearest.link)}>More detail of this event</a>
                               </div>
                           )
                       }
                       {
                           nearest.place != '' && nearest.place.includes('IAMP') && (
                           <a href={nearest.placeobj.ref} target='_blank' className='mt-1' data-toggle="tooltip" data-placement="down" title={nearest.placeobj.placeDesc}>
                               <LocationOnIcon/> {nearest.placeobj.placeName + ", " + nearest.placeobj.placeProvince}
                           </a>
                           )
                       }
                       {
                           nearest.place != '' && !nearest.place.includes('IAMP') && (
                           <a href={nearest.place} target='_blank' className='mt-1'>
                               <LocationOnIcon/> {eventPlace != '' ? eventPlace : 'Locating event place'}
                           </a>
                           )
                       }
                       {kamin != '' && kamin != '-' && nearest != null && (nearest.memtag.indexOf(kamin.toLowerCase()) != -1 || nearest.memtag.indexOf('All') != -1 || nearest.memtag.indexOf('all') != -1) && (
                        <div className="alert alert-info mt-3" role="alert">
                            <p>Your Kami-Oshi ({kamin} CGM48) has joined to this event. You should not miss it!</p>
                        </div>
                       )}
                         {nearest.memtag.indexOf('All') == -1 && !nearest.memtag[0].includes("gen") && (
                        <div className='container mt-2 row'>
                            <p className='pt-2'>CGM48 Member(s):&nbsp;</p>
                            <AvatarGroup max={6}>
                            {nearest.memtag.map((img) => (
                                <Avatar alt={img} src={cgm.path + img + cgm.type} />
                            ))}
                        </AvatarGroup>
                            </div>
                       )}
                        {nearest.memtag.indexOf('All') == 0 && !nearest.memtag[0].includes("gen") && (
                        <div className='container mt-2 row'>
                            <p className='pt-2'>CGM48 Member(s):&nbsp;</p>
                            <AvatarGroup max={6}>
                            <Avatar alt="all" src="https://i.scdn.co/image/ab6761610000e5eb8d172dbf9c9be2b794ce5355" />
                        </AvatarGroup>
                            </div>
                       )}
                       <br />
                       <div onClick={() => scrollToTop()} className='cur mt-3 hoversense'>
                            <a>Click to choose another CGM48 events</a>
                       </div>
                   </div>
               </CardContent>
           </Card>
        ) : Loaded && nearest == null ? (
            <Card className='text-center mb-3'>
            <CardContent className='row text-center'>
               <h5>Please click marker on map to view CGM48 event detail.</h5>
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