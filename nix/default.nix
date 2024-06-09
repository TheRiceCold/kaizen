{
  inputs, system, stdenv,
  writeShellScript,

  # Utilities
  fd, esbuild, which, dart-sass,

  gtksourceview3,
  # accountsservice,

  # SERVICES
  vte,
  cage,
  cava,
  swww,
  # brotab,
  # sptlrx,
  ydotool,
  cliphist,
  gromit-mpx,
  hyprpicker,
  pop-launcher,
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
  gtk-session-lock = inputs.gtk-session-lock.packages.${system}.default;
  ags = inputs.ags.packages.${system}.default.override {
    extraPackages = [ vte gtksourceview3 gtk-session-lock ];
  };

  dependencies = [
    fd
    which
    dart-sass

    cava              # Audio Visualizer
    swww              # Animated Wallpaper Daemon
    matugen           # Color generation tool
    ydotool           # Generic command-line automation tool
    cliphist          # Clipboard History Manager
    hyprpicker        # Wayland Color Picker
    gromit-mpx        # Annotation Tool
    grim              # Screenshot tool
    slurp             # Region Selector
    swappy            # Annotation gui made in gtk
    wl-screenrec      # High Performance Screen Recorder
    wl-clipboard      # Command-line copy/paste utilities for Wayland
    brightnessctl     # Read and Control Brightness
    networkmanager
  ];

  addBins = list: builtins.concatStringsSep ":" (builtins.map (p: "${p}/bin") list);

  greeter = writeShellScript "kaizen-dm" ''
    export PATH=$PATH:${addBins dependencies}
    ${cage}/bin/cage -ds -m last ${ags}/bin/ags -- -c ${config}/greeter.js
  '';

  lockscreen = writeShellScript "kaizen-lock" ''
    export PATH=$PATH:${addBins dependencies}
    ${ags}/bin/ags -b kaizen-lock -c ${config}/lockscreen.js
  '';

  desktop = writeShellScript name ''
    export PATH=$PATH:${addBins dependencies}
    ${ags}/bin/ags -b ${name} -c ${config}/config.js $@
  '';

  config = stdenv.mkDerivation {
    inherit name;
    src = ../ags;

    buildPhase = ''
      ${esbuild}/bin/esbuild \
      --bundle ./desktop/main.ts \
      --outfile=main.js \
      --format=esm \
      --external:resource://\* \
      --external:gi://\* \

      ${esbuild}/bin/esbuild \
      --bundle ./lockscreen/main.ts \
      --outfile=lockscreen.js \
      --format=esm \
      --external:resource://\* \
      --external:gi://\* \

      ${esbuild}/bin/esbuild \
      --bundle ./greeter/main.ts \
      --outfile=greeter.js \
      --format=esm \
      --external:resource://\* \
      --external:gi://\* \
    '';

    installPhase = ''
      mkdir -p $out

      cp -r css $out
      cp -r misc $out
      cp -r assets $out

      cp -r desktop $out
      cp -r greeter $out
      cp -r lockscreen $out

      cp -f main.js $out/config.js
      cp -f greeter.js $out/greeter.js
      cp -f lockscreen.js $out/lockscreen.js
    '';
  };
in stdenv.mkDerivation {
  inherit name version;
  src = config;
  
  installPhase = ''
    mkdir -p $out/bin
    cp -r . $out
    cp ${desktop} $out/bin/${name}
    cp ${greeter} $out/bin/${name}-dm
    cp ${lockscreen} $out/bin/${name}-lock
  '';
}
