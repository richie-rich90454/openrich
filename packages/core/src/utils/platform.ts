import { isClient } from './is-client';

export function isMac(): boolean {
  return isClient && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

export function isIOS(): boolean {
  return isClient && /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function isChrome49Plus(): boolean {
  if (!isClient) return false;
  const match = navigator.userAgent.match(/Chrome\/(\d+)/);
  if (!match) return false;
  return Number.parseInt(match[1]!, 10) >= 49;
}
