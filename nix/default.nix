{
  inputs,
  writeShellScript,
  system,
  stdenv,

  bun,
  dart-sass,

  fd,
  which,
  pavucontrol,
  brightnessctl,
  networkmanager,
  accountsservice,

  swww,            # Animated wallpaper Daemon
  hyprpicker,      # Color Picker
  wl-clipboard,    # Clipboard Utility
  wl-screenrec,    # Screen Recorder
  gromit-mpx,      # Annotation Tool
  sptlrx,          # Spotify lyrics

  version ? "git"
} : let
  name = "kaizen";

  ags = inputs.ags.packages.${system}.default.override {
    extraPackages = [ accountsservice ];
  };

  dependencies = [
    inputs.matugen.packages.${system}.default
    inputs.hyprland.packages.${system}.default

    fd
    which
    dart-sass
    brightnessctl
    swww
    gromit-mpx
    sptlrx
    wl-screenrec
    wl-clipboard
    hyprpicker
    pavucontrol
    networkmanager
  ];

  addBins = list: builtins.concatStringsSep ":" (builtins.map (p: "${p}/bin") list);

  desktop = writeShellScript name ''
    export PATH=$PATH:${addBins dependencies}
    ${ags}/bin/ags -b ${name} -c ${config}/config.js $@
  '';

  config = stdenv.mkDerivation {
    inherit name;
    src = ../ags;

    buildPhase = ''
      ${bun}/bin/bun build ./main.ts \
      --outfile main.js \
      --external 'resource://*' \
      --external 'gi://*' \
    '';

    installPhase = ''
      mkdir -p $out
      cp -r assets $out
      cp -r misc $out
      cp -r style $out
      cp -r windows $out
      cp -f main.js $out/config.js
    '';
  };
in stdenv.mkDerivation {
  inherit name version;
  src = config;
  
  installPhase = ''
    mkdir -p $out/bin
    cp -r . $out
    cp ${desktop} $out/bin/${name}
  '';
}
