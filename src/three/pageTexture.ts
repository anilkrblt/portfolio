import {CanvasTexture, LinearFilter} from 'three';

import {PALETTE, drawPage, type PageContent, type PageMode} from './pageArt';

export {ACCENT, type PageContent, type PageMode} from './pageArt';

export function createPageTexture(content: PageContent, mode: PageMode = 'art'): CanvasTexture {
  const texture = new CanvasTexture(drawPage(content, mode));
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 4;
  return texture;
}

/** The paper the translation is written onto, as a linear-space rgb triple. */
export function paperTone(variant: PageContent['variant']): [number, number, number] {
  const hex = PALETTE[variant].paper;
  return [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ];
}
