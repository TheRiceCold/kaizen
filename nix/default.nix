{ 
  inputs, system, stdenv,
  writeShellScript, 

  # Utilities
  fd, bun, which, dart-sass,

  gtksourceview3,
  # accountsservice,

  # SERVICES
  # vte,
  cage,
  cava,
  swww,
  # brotab,
  # sptlrx,
  ydotool,
  cliphist,
  gromit-mpx,
  hyprpicker,
  # showmethekey, # TODO:
  wl-clipboard,
  brightnessctl,
  networkmanager,
  swappy,
  slurp, grim,
  wl-screenrec,
  version ? "git"
} : let
  name = "kaizen";

  matugen = inputs.matugen.packages.${system}.default;
  hyprland = inputs.hyprland.packages.${system}.default;
  # gtk-session-lock = inputs.gtk-session-lock.packages.${system}.default;
  ags = inputs.ags.packages.${system}.default.override {
    extraPackages = [ gtksourceview3 ];
  };

  dependencies = [
    fd 
    which 
    dart-sass 
  
    cava              # Audio Visualizer
    swww              # Animated Wallpaper Daemon
    # brotab
    # sptlrx            # Spotify Lyrics
    matugen           # Color generation tool
    ydotool           # Generic command-line automation tool
    hyprland          # Dynamic tiling manager Wayland compositor
    cliphist          # Clipboard History Manager
    hyprpicker        # Wayland Color Picker
    gromit-mpx        # Annotation Tool
    grim
    slurp             # Region Selector
    swappy
    wl-screenrec      # High Performance Screen Recorder
    wl-clipboard      # Command-line copy/paste utilities for Wayland
    brightnessctl     # Read and Control Brightness
    networkmanager
    # gtk-session-lock  # GTK3 screen lockers using ext-session-lock-v1 protocol
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
