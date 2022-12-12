import {ReactNode} from 'react';
import {Auth0Provider} from '@auth0/auth0-react';

interface Auth0Props {
    children: ReactNode;
}
const Auth0ProviderWithHistory = ({children} : Auth0Props) => {
    return(
        <Auth0Provider domain = "dev-aq0ru8q8.us.auth0.com" clientId= "r3y9wfEj1L9wK7AzUOQVId9ltv3BLGOi" redirectUri={window.location.origin}
        audience="https://dev-aq0ru8q8.us.auth0.com/api/v2/"
        scope="read:current_user read:users update:current_user_metadata">
            {children}
        </Auth0Provider>
    );
}

export default Auth0ProviderWithHistory;