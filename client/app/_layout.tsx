import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { getConfig } from "./config";
import MainDisplay from "./maindisplay";
import Login from "./login";
import Expo from "expo";
import LoadingScreen from "@/components/Loading";

const onRedirectCallback = (appState: any) => {};
const config = getConfig();

const providerConfig = {
    domain: config.domain,
    clientId: config.clientId,
    onRedirectCallback,
    authorizationParams: {
      redirect_uri: config.redirect_uri,
      audience: config.audience,
    },
  };


export default function RootLayout() {
    return (
    <Auth0Provider {...providerConfig}>
        <AuthContent />
    </Auth0Provider>
    )
}

function AuthContent() {
    const { isAuthenticated, isLoading } = useAuth0();
  
    if (isLoading) {
      return <LoadingScreen />; // show a loading message or spinner while checking auth status
    }
  
    return isAuthenticated ? <MainDisplay /> : <Login />;
}