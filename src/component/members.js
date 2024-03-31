import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, TextField, Zoom, MenuItem, Button, ButtonGroup, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import vPack from './pack.json'
import moment from 'moment'
import AOS from "aos";
import Skeleton from '@material-ui/lab/Skeleton';

const Memberlist = ({fet, setSec, width}) => {
    React.useEffect(() => {
        setSec('Members')
      },[])
    const History = useHistory()

    const [seGroup, setGr] = React.useState('-');
    const [seFill, setFr] = React.useState('-');
    const [seGrad, setGrad] = React.useState('-');
    const [search, setSearch] = React.useState('');
    const [Loaded, setLoaded] = React.useState(false);
    const [Filter, setFilter] = React.useState([]);


    const [Arr, setArr] = React.useState([]);
    const [mem, setmem] = React.useState([]);
    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        var url = new URL(window.location.href);
        if (url.searchParams.get("filter") != null && url.searchParams.get("val") != null) {
            setFilter(vPack[url.searchParams.get("filter")])
            setGr(url.searchParams.get("filter"));
            setFr(url.searchParams.get("val"))
            setLoaded(false)
            fetch(fet + '/cgm48/getmemberby?filter=' + url.searchParams.get("filter") + '&param=' + url.searchParams.get("val") + '&tstamp=' + Math.floor( new Date().getTime()  / 1000), {
              method :'post'
          })
              .then(response => response.json())
              .then(async data => {
                  setArr(data.response)
                  if (search !== '') {
                      const txt = search.toLowerCase()
                      setSearch(txt)
                      const d = data.response.filter(x => (x.name.toLowerCase()).includes(txt));
                      setmem(d)
                  } else {
                      setmem(data.response)
                      setArr(data.response)
                  }
                  setLoaded(true)
              }); 
        } else {
            fetch(fet + '/cgm48/memberlist?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
                method :'get'
            })
                .then(response => response.json())
                .then(data => {
                    setmem(data.response)
                    setArr(data.response)
                    setLoaded(true)
                }).catch(() => {
                    setmem([])
                    setArr([])
                    setLoaded(true)
                })
        }
 
    }, [])


    const ChangeRoute = (name) =>{
        History.push("/member/" + name.toLowerCase())
    }

    const SearchEng = (val) => {
        const txt = val.toLowerCase()
        setSearch(txt)
        if (txt == '') {
            setmem(Arr)
        } else {
            const data = Arr.filter(x => (x.name.toLowerCase()).includes(txt));
            setmem(data)
        }
    }

    const handleChangeGroup = (event) => {
        setFr('-')
        setGr(event.target.value);
        if (event.target.value == 'team') {
            setFilter(vPack.team)
        } else if (event.target.value == 'gen') {
            setFilter(vPack.gen)
        } else {
            setFilter([])
        }
      };

      const onSearch = () => {
        if (Arr.length > 0 && mem.length > 0) {
            let newfilter = [];
             if (seGroup != '-' && seFill != "-") {
   
                if (seGroup == "team") {
                    newfilter = Arr.filter(x => x.team == seFill)
                } else if (seGroup == "gen") {
                    newfilter = Arr.filter(x => x.gen == seFill)
                }
        
                 if (search !== '') {
                    const txt = search.toLowerCase()
                    setSearch(txt)
                    const d = newfilter.filter(x => (x.name.toLowerCase()).includes(txt));
                    setmem(d)
                } else {
                    setmem(newfilter)
                }
             }
        }
      }
    
      const onReset = () => {
        if (seGroup != '-' || seFill != "-" || search != '') {
            setmem(Arr)
            setFilter([])
            setGr('-')
            setFr('-')
            setSearch('')
        }
    }

    return ( 
        <>
        <h3 className='text-center mt-4'>Members</h3>
        <br />
        <div className="stage text-center pt-5 pb-2">
        {Loaded && Arr.length > 0 && (
            <Card className={"text-left " + (width > 700 ? 'ml-5 mr-5' : 'ml-2 mr-2')}>
            <TextField label="Search Member" value={search} className="m-3" onChange={(e) => SearchEng(e.target.value)} />
            <TextField
                select
                label="Choose Group"
                value={seGroup || '-'}
                className="m-3"
                onChange={(e) => handleChangeGroup(e)}
                >
                    {vPack.drop.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
             </TextField>
             {Filter.length > 0 && seGroup != '-' && (
                 <TextField
                 select
                 label="Choose Filter type"
                 value={seFill || '-'}
                 className="m-3"
                 onChange={(e) => setFr(e.target.value)}
                 >
                     {Filter.map((option) => (
                         <MenuItem key={option.value} value={option.value}>
                         {option.label}
                         </MenuItem>
                     ))}
              </TextField>
             )}
              <TextField
                 select
                 label="Graduation Status"
                 value={seGrad || '-'}
                 className="m-3"
                 onChange={(e) => setGrad(e.target.value)}
                 >
                     {vPack.graduation.map((option) => (
                         <MenuItem key={option.value} value={option.value}>
                         {option.label}
                         </MenuItem>
                     ))}
              </TextField>
             <ButtonGroup>
             {seGroup != '-' && seFill != '-' && (
                 <Button className='ml-5 mt-4 mb-3' color="primary" onClick={() => onSearch()} variant="contained">Search</Button>
             )}
              <Button className={(seGroup != '-' && seFill != '-' ? 'ml-3' : 'ml-5') + ' mt-4 mb-3 mr-2'} color="secondary" onClick={() => onReset()} variant="contained">Reset</Button>
             </ButtonGroup>
             </Card>
        )}
             <Zoom in={mem.length > 0 ? Loaded : false}>
             <Card className='mt-2 ml-5 mr-5'>
                        <CardContent>
                         Found {seGrad == 2 ? mem.filter(x => x.graduated == true).length : seGrad == 1 ? mem.filter(x => x.graduated == false).length : mem.length} matched BNK48 members
                     </CardContent>
                 </Card>
             </Zoom>
            
             {Loaded ? (
               <Grid container className='mt-3 justify-content-center' spacing={2}>
                {mem.length > 0 ? mem.map((item, i) => (seGrad == 2 ? item.graduated == true : seGrad == 1 ? item.graduated == false : item.graduated != undefined) && (
                  <Grid data-aos="zoom-in" item md={3} data-aos-duration="1000">
                      <div className='mb-5 p-1' onClick={() => ChangeRoute(item.name)}>
                        <Card>
                            <CardActionArea>
                            <CardMedia
                                    src={item.img}
                                    component="img"
                                    className={item.graduated == true ? 'grayimg' : ''}
                                    />
                                <CardContent>
                                    <h5>{item.name}</h5>
                                     {item.shihainin != undefined && (
                                         <p class="badge text-light" style={{backgroundColor: "#BF953F"}}>CGM48 Manager (Shihainin)</p>
                                     )}
                                     <br />
                                    {item.headcaptain != undefined && (
                                        <p class="badge badge-pill badge-info">CGM48 Captain</p>
                                    )}
                                    <br />
                                    {item.graduated == true && (
                                        <p class="badge badge-pill badge-warning">Graduating Announced</p>
                                    )}
                                </CardContent>
                                </CardActionArea>
                                </Card> 
                            </div>
                   </Grid>
                )) : (
                    <div className='text-center col-md-12'>
                        <h6>No CGM48 members to show. Please try different keyword</h6>
                    </div>
                )}
                </Grid>
            ) : (
                <Grid container className='mt-3 justify-content-center' spacing={2}>
                <Grid item md={3} xs={12} data-aos="fade-in" data-aos-duration="200">
                <div className='mb-5 p-1'>
                  <Card>
                  <CardActionArea>
                         <Skeleton variant="rect" height={300} />
                          <CardContent>
                              <h5><Skeleton variant="text" /></h5>
                          </CardContent>
                          </CardActionArea>
                          </Card> 
                      </div>
                </Grid>
                <Grid item md={3} xs={12} data-aos="fade-in" data-aos-duration="200">
                <div className='mb-5 p-1'>
                  <Card>
                  <CardActionArea>
                         <Skeleton variant="rect" height={300} />
                          <CardContent>
                              <h5><Skeleton variant="text" /></h5>
                          </CardContent>
                          </CardActionArea>
                          </Card> 
                      </div>
                </Grid>
                <Grid item md={3} xs={12} data-aos="fade-in" data-aos-duration="200">
                <div className='mb-5 p-1'>
                  <Card>
                  <CardActionArea>
                         <Skeleton variant="rect" height={300} />
                          <CardContent>
                              <h5><Skeleton variant="text" /></h5>
                          </CardContent>
                          </CardActionArea>
                          </Card> 
                      </div>
                </Grid>
                <Grid item md={3} xs={12} data-aos="fade-in" data-aos-duration="200">
                <div className='mb-5 p-1'>
                  <Card>
                  <CardActionArea>
                         <Skeleton variant="rect" height={300} />
                          <CardContent>
                              <h5><Skeleton variant="text" /></h5>
                          </CardContent>
                          </CardActionArea>
                          </Card> 
                      </div>
                </Grid>
          </Grid>
            )}
        </div>
        </>
     );
}
 
export default Memberlist;
