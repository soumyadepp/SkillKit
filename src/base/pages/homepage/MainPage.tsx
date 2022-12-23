import { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import AdminPage from './AdminPage';
import Userpage from './UserPage';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';
import LandingPage from '../LandingPage';
import { Data, UserDetailType } from '../../types';
import useFetch from '../../api/hooks/apiHooks';
import { MetaDataContext } from '../../../App';


const baseApiURL = process.env.REACT_APP_BACKEND_URL;
type MainPageProps = {
  picture?:string;
  updateMetaData : Function
}

export default function MainPage(props:MainPageProps) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const {picture} = props;
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  // const [propMetadata, setPropMetadata] = useState<UserDetailType>();
  const propMetadata = useContext(MetaDataContext);
  // const {data:APIData,loading:APILoading,error:APIError} = useFetch({url:`${baseApiURL}/users/metadata/${user?.email}`,method:'GET'});
  // const fetchMetaData = useContext(FetchMetaDataContext);
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  //auth0 function
  const getUserMetadata = async () => {
    const domain = "dev-aq0ru8q8.us.auth0.com"
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      });

      setToken(accessToken);
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { app_metadata, user_metadata } = await metadataResponse.json();
      setUserMetadata(user_metadata);
      setRole(app_metadata?.roles[0] || 'user');
      localStorage.setItem('user_data', JSON.stringify(user_metadata));

    } catch (e: any) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);
  //end of auth0 function *** Don't change this *** 


  if (!user || !isAuthenticated) return <LandingPage />
  else if (role === 'admin') return <AdminPage updateMetaData={props.updateMetaData} isAdmin={true} user={user} token={token} userDetails={propMetadata} userMetadata={userMetadata} picture={picture} />
  else if (role === 'user') return <Userpage updateMetaData={props.updateMetaData} isAdmin={false} user={user} token={token} userDetails={propMetadata} userMetadata={userMetadata} picture={picture}/>
  else return <FullScreenLoader text="Fetching Data..."/>
}
