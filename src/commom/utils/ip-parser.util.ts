export default function cleanIpAndReplace(ip: string): string {
  if(!ip.length) return 'unknown'
    return ip.replace(/^.*:/, '')
  }