{
  lib,
  inputs,
  system, stdenv,
  writeShellScript,
  fd,
  which,
  bun,
  dart-sass,
  vte,
  libgtop,
  gtksourceview4,
  # accountsservice,
  cage,
  cava,
  swww,
  gvfs,
  # brotab,
  # sptlrx,
  cliphist,
  # showmethekey, # TODO:
  wl-clipboard,
  brightnessctl,
  taskwarrior,
  # ledger,
  # gcalcli,
  grim,
  slurp,
  swappy,
  ydotool,
  gromit-mpx,
  hyprpicker,
  # wl-screenrec,
  wf-recorder,
  nerdfonts,
  version ? "git",
}: let
  name = "kaizen";

  matugen = inputs.matugen.packages.${system}.default;
  gtk-session-lock = inputs.gtk-session-lock.packages.${system}.default;
  ags = inputs.ags.packages.${system}.default.override {
    extraPackages = [
      vte libgtop gtksourceview4 gtk-session-lock
    ];
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
    # wl-screenrec # High performance screen recorder
    wf-recorder # Screen recording of wlroots-based compositors

    # DASHBOARD
    taskwarrior

    # Fonts
    nerdfonts
  ];

  config = stdenv.mkDerivation {
    inherit name;
    src = ../config;
    buildPhase = ''
      ${bun}/bin/bun build ./desktop/main.ts \
      --outfile desktop.js \
      --external 'resource://*' \
      --external 'gi://*' \

      ${bun}/bin/bun build ./lockscreen/main.ts \
      --outfile lockscreen.js \
      --external 'resource://*' \
      --external 'gi://*' \

      ${bun}/bin/bun build ./greeter/main.ts \
      --outfile greeter.js \
      --external 'resource://*' \
      --external 'gi://*' \
    '';

    installPhase = ''
      mkdir -p $out

      cp -r css $out
      cp -r assets $out
      cp -r shaders $out

      cp -r desktop $out
      cp -r greeter $out
      cp -r lockscreen $out

      cp -f desktop.js $out/desktop.js
      cp -f greeter.js $out/greeter.js
      cp -f lockscreen.js $out/lockscreen.js
    '';
  };

  addBins = list: builtins.concatStringsSep ":" (builtins.map (p: "${p}/bin") list);

  greeter = writeShellScript "kaizen-dm" ''
    export PATH=$PATH:${addBins dependencies}
    ${cage}/bin/cage -ds -m last ${ags}/bin/ags -- -c ${config}/greeter.js
  '';

  lockscreen = writeShellScript "kaizen-lock" ''
    export PATH=$PATH:${addBins dependencies}
    ${ags}/bin/ags -b ${name}-lock -c ${config}/lockscreen.js
  '';

  desktop = writeShellScript name ''
    export PATH=$PATH:${addBins dependencies}
    ${ags}/bin/ags -b ${name} -c ${config}/desktop.js $@
  '';
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

    meta = {
      mainProgram = "kaizen";
      license = lib.licenses.mit;
      platforms = lib.platforms.linux;
      homepage = "https://github.com/TheRiceCold/kaizen";
      description = "A linux desktop environment configuration using Aylur's Gtk Shell.";
    };
  }
