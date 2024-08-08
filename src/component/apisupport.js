import React from 'react';
import { Card, CardContent, CardHeader, CardActionArea} from '@material-ui/core'

const API = ({setSec, width}) => {
    const [ stat, setstat] = React.useState(null);
    const APITest = () => {
      setSec('API Service')
      fetch('https://cpxdevconnect.azurewebsites.net/home/status')
      .then(function () {
          setSec('API Service [System health is good]')
          setstat(true)
      }).catch(function () {
        setSec('API Service [System maybe lost]')
        // handle error
        setstat(false)
      });
      }
      React.useEffect(() => {
        APITest();
      }, [])
    return ( 
        <Card>
            <CardContent className={width > 700 ? 'pl-5 pr-5' : 'pl-2 pr-2'}>
                <CardHeader title='API Service' subheader='Unofficial CGM48 Members Public API' />
                <hr />
                <p>We also serve CGM48 members profile on Public API service. Member profile contents which you see in website are using this service also. Please see our <a href='https://cp-apicenter.pages.dev/cgm48' target='_blank'>documentation</a> here</p>
                <h6 className='text-info'>CPXDev Data Connect has been discontinued in October 31, 2024 in 11:59 PM. (UTC +07:00). You can request access token until August 31, 2024 in 11:59 PM. (UTC +07:00). Including BNK48 and CGM48 Fan Space Public API will be closed too.</h6>
                <hr />
                <CardActionArea className={stat === true ? 'text-success' : stat === false ? 'text-danger' : ''}>
                    API Service Status: {stat === true ? 'Systems are great.' : stat === false ? 'Systems is temporary down or under maintenance.' : 'Checking API status'}
                </CardActionArea>
            </CardContent>
        </Card>
     );
}
 
export default API;
