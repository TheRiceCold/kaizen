import { opt } from 'lib/option'

export default {
  position: opt<'left' | 'center' | 'right'>('left'),
  iconSize: opt(48),
  width: opt(0),
  margin: opt(80),
  maxItem: opt(5),
  nix: {
    pkgs: opt('nixpkgs/nixos-unstable'),
    max: opt(8),
  },
  sh: {
    max: opt(16),
  },
  apps: {
    iconSize: opt(62),
    max: opt(6),
    favorites: opt([
      'firefox',
      'spotify',
      'discord',
      'neovide',
      'godot',
      'krita',
      'blender',
      'inkscape',
    ]),
  },
}
