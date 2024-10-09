{
  inputs,
  system,
  stdenv,
  writeShellScript,
  # UTILITIES
  fd,
  which,
  # BUNDLERS/COMPILERS
  esbuild,
  dart-sass,
  vte,
  gtksourceview4,
  # accountsservice,
  # SERVICES
  cage,
  cava,
  swww,
  gvfs,
  # brotab,
  # sptlrx,
  ydotool,
  cliphist,
  gromit-mpx,
  hyprpicker,
  # showmethekey, # TODO:
  wl-clipboard,
  brightnessctl,
  # Dashboard
  # ledger,
  # gcalcli,
  taskwarrior,
  # ScreenTools
  grim,
  slurp,
  swappy,
  wl-screenrec,
  version ? "git",
}: let
  name = "kaizen";

  matugen = inputs.matugen.packages.${system}.default;
  gtk-session-lock = inputs.gtk-session-lock.packages.${system}.default;
  ags = inputs.ags.packages.${system}.default.override {
    extraPackages = [vte gtksourceview4 gtk-session-lock];
  };

  dependencies = [
    fd
    which
    dart-sass

    cava # Audio Visualizer
    gvfs # Virtual Filesystem support library
    swww # Animated Wallpaper Daemon
    matugen # Color generation tool
    cliphist # Clipboard History Manager
    wl-clipboard # Command-line copy/paste utilities for Wayland
    brightnessctl # Read and Control Brightness

    # ScreenTools
    grim # Screenshot tool
    slurp # Region Selector
    gromit-mpx # Annotation Tool
    hyprpicker # Wayland Color Picker
    swappy # Annotation gui made in gtk
    ydotool # Generic command-line automation tool
    wl-screenrec # High Performance Screen Recorder

    # DASHBOARD
    taskwarrior
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
in
  stdenv.mkDerivation {
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
