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

type CoreGeoResult = { ip: string | null; country: string | null };

// Module-level Promise cache — shared across all component instances.
// Only 2 network requests (ipify + /api/location) fire per page load
// regardless of how many components call useGeoLocation().
let _geoPromise: Promise<CoreGeoResult> | null = null;

const fetchGeoOnce = (): Promise<CoreGeoResult> => {
  if (!_geoPromise) {
    _geoPromise = (async () => {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const { ip } = await ipRes.json();
      const locRes = await fetch(`/api/location?ip=${ip}`);
      const data = await locRes.json();
      return { ip: ip ?? null, country: data.country ?? null };
    })().catch(() => {
      _geoPromise = null; // reset on error so next mount can retry
      return { ip: null, country: null };
    });
  }
  return _geoPromise;
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
    if (typeof window === "undefined") return;

    const browser = navigator.userAgent;
    const pageURL = window.location.href;
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const params = new URLSearchParams(window.location.search);
    const medium = params.get("gad_source")
      ? "google Ads"
      : params.get("fbclid")
      ? "facebook"
      : "SEO";

    fetchGeoOnce()
      .then(({ ip, country }) => {
        setGeoData({
          ip,
          country,
          browser,
          pageURL,
          date: currentDate,
          time: currentTime,
          Medium: medium,
          isLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        setGeoData((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Unknown error",
        }));
      });
  }, []);

  return geoData;
};

export default useGeoLocation;
