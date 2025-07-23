import GoogleAnalytics from "./google-analytics";
import GoogleTagManager from "./google-tag-manager";
import MicrosoftClarity from "./microsoft-clarity";
import Pixel from "./pixel";

const Metrics = () => (
  <>
    <MicrosoftClarity />
    <GoogleAnalytics />
    <GoogleTagManager />
    <Pixel />
  </>
);

export default Metrics;
