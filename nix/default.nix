{ 
  inputs, writeShellScript, system, stdenv,

  # Utilities
  fd, bun, which, dart-sass,

  # SERVICES
  cage,
  gtk3,
  # showmethekey # TODO:
  hyprpicker,
  sptlrx,
  wl-screenrec,
  gromit-mpx,
  cava,
  swww,
  ydotool,
  cliphist,
  wl-clipboard,
  brightnessctl,
  networkmanager,
  accountsservice,
  version ? "git"
} : let
  name = "kaizen";

  matugen = inputs.matugen.packages.${system}.default; # Color Generation tool
  hyprland = inputs.hyprland.packages.${system}.default;
  ags = inputs.ags.packages.${system}.default.override {
    extraPackages = [ accountsservice ];
  };

  dependencies = [
    fd 
    which 
    dart-sass 

    gtk3
    cava            # Audio Visualizer
    swww            # Animated Wallpaper Daemon
    sptlrx          # Spotify Lyrics
    matugen         # Color generation tool
    ydotool         # Generic command-line automation tool
    hyprland        # Dynamic tiling manager Wayland compositor
    cliphist        # Clipboard History Manager
    hyprpicker      # Wayland Color Picker
    gromit-mpx      # Annotation Tool
    wl-clipboard    # Command-line copy/paste utilities for Wayland
    wl-screenrec    # High Performance Screen Recorder
    brightnessctl   # Read and Control Brightness
    networkmanager
  ];

  addBins = list: builtins.concatStringsSep ":" (builtins.map (p: "${p}/bin") list);

  greeter = writeShellScript "greeter" ''
    export PATH=$PATH:${addBins dependencies}
    ${cage}/bin/cage -ds -m last ${ags}/bin/ags -- -c ${config}/greeter.js
  '';

  desktop = writeShellScript name ''
    export PATH=$PATH:${addBins dependencies}
    ${ags}/bin/ags -b ${name} -c ${config}/config.js $@
  '';

  config = stdenv.mkDerivation {
    inherit name;
    src = ../desktop;

    buildPhase = ''
      ${bun}/bin/bun build ./main.ts \
      --outfile main.js \
      --external 'resource://*' \
      --external 'gi://*' \

      ${bun}/bin/bun build ./greeter \
      --outfile=greeter.js \
      --external 'resource://*' \
      --external 'gi://*' \
    '';

    installPhase = ''
      mkdir -p $out
      cp -r misc $out
      cp -r style $out
      cp -r assets $out
      cp -r windows $out
      cp -f main.js $out/config.js
      cp -f greeter.js $out/greeter.js
    '';
  };
in stdenv.mkDerivation {
  inherit name version;
  src = config;
  
  installPhase = ''
    mkdir -p $out/bin
    cp -r . $out
    cp ${desktop} $out/bin/${name}
    cp ${greeter} $out/bin/greeter
  '';
}
