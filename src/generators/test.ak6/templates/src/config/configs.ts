import { IConfig } from "./config"

const CONFIGS: Record<string, IConfig> = {
  "qa": {
    'gRPCUrl': '192.168.2.14:5002',
    "serviceUrl": "https://servicesqa.siigo.com/auth",
    "nominaUrl": "https://servicesqa.siigo.com/payroll/liquidator/api/v1/Payroll"
  },
  "preprod": {
    'gRPCUrl': '192.168.2.14:5002',
    "serviceUrl": "https://services.siigo.com/auth",
    "nominaUrl": "https://servicesqa.siigo.com/payroll/liquidator/api/v1/Payroll"
  },
}

export default CONFIGS;