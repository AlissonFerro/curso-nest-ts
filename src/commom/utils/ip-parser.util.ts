export default function cleanIpAndReplace(ip: string): string {
    return ip.replace(/^.*:/, '')
  }