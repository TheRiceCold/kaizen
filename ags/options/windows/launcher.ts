import { opt } from 'lib/option'

export default {
  position: opt<'left' | 'center' | 'right'>('left'),
  iconSize: opt(48),
  width: opt(0),
  margin: opt(80),
  maxItem: opt(5),
  nix: {
    max: opt(8),
    pkgs: opt('nixpkgs/nixos-unstable'),
  },
  sh: {
    max: opt(16),
  },
  apps: {
    max: opt(6),
    iconSize: opt(62),
  },
}
