export interface IPipedInstance {
  name: string;
  api_url: string;
  locations: string;
  version: string;
  up_to_date: boolean;
  cdn: boolean;
  registered: number;
  last_checked: number;
  cache: boolean;
  s3_enabled: boolean;
  image_proxy_url: string;
  registration_disabled: boolean;
  uptime_24h: number;
  uptime_7d: number;
  uptime_30d: number;
}

export interface IPipedInstanceConfig {
  imageProxyUrl: string;
  countries: string[];
  s3Enabled: boolean;
  regionstrationDisabled: boolean;
}
