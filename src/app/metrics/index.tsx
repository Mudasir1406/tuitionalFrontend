import GoogleAnalytics from "./google-analytics";
import GoogleTagManager from "./google-tag-manager";
import MicrosoftClarity from "./microsoft-clarity";

const Metrics = () => (
  <>
    <MicrosoftClarity />
    <GoogleAnalytics />
    <GoogleTagManager />
  </>
);

export default Metrics;
