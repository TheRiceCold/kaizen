{ 
  inputs, writeShellScript, system, stdenv,

  # Utilities
  fd, bun, which, dart-sass, wl-clipboard,

  # SERVICES
  cage,
  # showmethekey    # TODO:
  hyprpicker,       # Color Picker
  wl-screenrec,     # Screen Recorder
  sptlrx,           # Spotify lyrics
  gromit-mpx,       # Annotation Tool
  cava,             # Audio Visualizer
  swww,             # Animated Wallpaper Daemon
  brightnessctl,    # Read and Control Brightness 
  networkmanager,   #
  accountsservice,  #
  version ? "git"
} : let
  name = "kaizen";

  ags = inputs.ags.packages.${system}.default.override {
    extraPackages = [ accountsservice ];
  };

  dependencies = [
    inputs.matugen.packages.${system}.default
    inputs.hyprland.packages.${system}.default

    fd which dart-sass wl-clipboard

    cava
    swww
    sptlrx
    gromit-mpx
    hyprpicker
    wl-screenrec
    brightnessctl
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
      cp -r greeter $out
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
