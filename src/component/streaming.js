import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faItunes, faDeezer, faYoutube, faTiktok, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons'
import { Typography, ListItem, Zoom, Container, Grid,
    Card, CardHeader, CardContent, CardMedia, Grow, Fade, CardActionArea } from '@material-ui/core';
    import CircularProgress from '@material-ui/core/CircularProgress';
    import AOS from "aos";

const MusicSt = ({fet, setSec}) => {
    const [data, setData] = React.useState([])
    const [hover, setHover] = React.useState('')
    const [Loaded, setLoaded] = React.useState(false);
    React.useEffect(()=> {
      setSec('Song Album List')
      AOS.init({ duration: 1000 });
      setLoaded(true)
        fetch(fet + '/cgm48/getsongal', {
            method: 'post', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
            .then(response => response.json())
            .then(r => {
              setLoaded(false)
                setData(r.items)
            })
            .catch((error) => {
              setLoaded(false)
                console.error('Error:', error);
            });
    }, [])
    return ( 
        <>
        <Card>
        <h3 className='text-center mt-5'>CGM48 Song Album List</h3>
            <p className='text-center'>Released CGM48 albums and singles. Powered by Spotify.</p>
            <div className='container border border-success rounded mb-3'>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        All CGM48 songs is avaliable on below streaming platform
                    </div>
                    <div className='col-md-12 text-center'>
                        <FontAwesomeIcon icon={faYoutubeSquare} size="lg" className='mr-1 cur' onClick={() => window.open('https://www.youtube.com/c/CGM48Official', '_target').focus()} data-toggle="tooltip" data-placement="top" title="See Music Video on youtube" />
                        <FontAwesomeIcon icon={faSpotify} size="lg" className='mr-1 cur' onClick={() => window.open('https://open.spotify.com/artist/22Y0wVJzrL68AKJk61nZd6?si=vzyowMB7Q0KkuM7UP3dtww', '_target').focus()} data-toggle="tooltip" data-placement="top" title="Play on Spotify" />
                        <FontAwesomeIcon icon={faDeezer} size="lg" className='mr-1 cur' onClick={() => window.open('https://www.deezer.com/en/artist/86679482', '_target').focus()} data-toggle="tooltip" data-placement="top" title="Listen on Deezer (Lossless included)" />
                        <FontAwesomeIcon icon={faItunes} size="lg" className='mr-1 cur' onClick={() => window.open('https://music.apple.com/us/artist/cgm48/1500258933', '_target').focus()} data-toggle="tooltip" data-placement="top" title="Avaliable on Apple Music and Itune Store" />
                        <FontAwesomeIcon icon={faYoutube} size="lg" className='mr-1 cur' onClick={() => window.open('https://music.youtube.com/channel/UC7ilNjVMjF4Bnd1aa25C5tg', '_target').focus()} data-toggle="tooltip" data-placement="top" title="See on Youttube Music" />
                        {/* <FontAwesomeIcon icon={faTiktok} size="lg" className='cur' onClick={() => window.open('https://www.tiktok.com/@bnk48official_th', '_target').focus()} data-toggle="tooltip" data-placement="top" title="Share moment in TikTok" /> */}
                    </div>
                </div>
            </div>

        </Card>
        {Loaded && (
        <Zoom in={Loaded} timeout={{ enter: 200, exit: 200}}>
          <Card className='p-5 text-center mt-5'>
                <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/cgm-circular.svg" width="50px" className='text-center mt-5 mb-5' />
                Connect to service
          </Card>
         </Zoom>
        )}
            {window.innerWidth >1200 && (
          <div class="video-background">
           <Fade in={true} timeout={800}>
           <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/cgm48/cgm_2565.png" width={window.innerWidth} />
              </Fade>
      </div>
        )}
  <Container>
         <Grid container spacing={2} className='justify-content-center mt-3'>
              {data.length > 0 ? data.map((item,i) => (item.release_date.includes(new Date().getFullYear()) || item.release_date.includes(new Date().getFullYear() - 1)) ? (
                <Grid data-aos="zoom-in" key={item.id} item md={3}>
                 <Card key={item.id} className={'text-center mb-3' + (window.innerWidth < 700 ? ' bnktheme' : '')}>
                  <CardContent>
                    <CardActionArea onClick={() => window.open(item.external_urls.spotify, '_blank').focus()}>
                  <Typography variant="h5" component="h2">
                    {item.name}
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={item.images[0].url}
                        component="img"
                    />
                     <Typography variant="body1">
                        {item.album_type =='single' && item.total_tracks == 1 ? 'The single song by ' + item.artists[0].name : item.album_type =='single' && item.total_tracks > 1 ? 'This Extended Play (EP) included ' + item.total_tracks +' tracks.'  : 'This Studio Album included ' + item.total_tracks +' tracks.' }
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(item.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
                </Grid>
              ) : null) : (
                <Zoom in={!Loaded} timeout={{ enter: 200, exit: 200}}>
                <Card className='col-md-12 p-5 text-center mb-5 mt-5'>
                      There was a problem connecting to the service. Please try again later
                </Card>
              </Zoom>
              )}
      </Grid>
      </Container>
        </>
     );
}
 
export default MusicSt;