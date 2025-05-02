import { useEffect, useState } from "react";

type GeoLocationData = {
  ip: string | null;
  country: string | null;
  browser: string | null;
  pageURL: string | null;
  date: string | null;
  time: string | null;
  Medium: string | null;
  isLoading: boolean;
  error: string | null;
};

const getLocation = async () => {
  const res = await fetch("/api/location");
  const data = await res.json();
  return data;
  //   console.log("User Location:", data);
};

const useGeoLocation = (): GeoLocationData => {
  const [geoData, setGeoData] = useState<GeoLocationData>({
    ip: null,
    country: null,
    browser: null,
    pageURL: null,
    date: null,
    time: null,
    Medium: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Client-side only check
        if (typeof window === "undefined") return;

        // Get basic browser info
        const browser = navigator.userAgent;
        const pageURL = window.location.href;
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();
        const params = new URLSearchParams(window.location.search);

        // Get IP address
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipResponse.json();

        // Get geo data
        // const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        // const geoData = await geoResponse.json();
        // const res = await fetch("/api/location");
        // const geoData = await res.json();
        const geoData: any = await getLocation();

        setGeoData({
          ip,
          country: geoData.country || null,
          browser,
          pageURL,
          date: currentDate,
          time: currentTime,
          Medium: params.get("gad_source")
            ? "google Ads"
            : params.get("fbclid")
            ? "facebook"
            : "SEO",
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setGeoData((prev: any) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        }));
      }
    };

    fetchData();
  }, []);

  return geoData;
};
export default useGeoLocation;
