{
  lib,
  inputs,
  system, stdenv,
  writeShellScript,
  fd, which, dart-sass,

  libsoup_3,
  libnotify,

  gvfs,          # Virtual Filesystem support
  swww,          # Animated wallpaper daemon
  matugen,       # Color generation tool
  hyprpicker,    # Wayland color picker
  gromit-mpx,    # Desktop annotation tool
  pop-launcher,  # IPC-based desktop launcher service
  brightnessctl, # Read and control brightness

  version ? "git",
}: let
  name = "kaizen";
  astal-packages = with inputs.astal.packages.${system}; [
    auth
    notifd
    battery
    network
    bluetooth
    hyprland
    apps
    tray
    cava
    mpris
    wireplumber
  ];

  ags = inputs.ags.packages.${system}.default.override {
    extraPackages = [ libsoup_3 libnotify ] ++ astal-packages;
  };

  dependencies = [
    fd which dart-sass
    gvfs swww matugen hyprpicker gromit-mpx brightnessctl pop-launcher
  ];

  # config = stdenv.mkDerivation {
  #   inherit name;
  #   src = ../config;
  #
  #   installPhase = ''
  #     mkdir -p $out
  #     cp -r . $out
  #
  #     ${ags}/bin/ags bundle ./desktop.ts $out/kaizen
  #     chmod +x $out/kaizen
  #   '';
  # };
  
  # desktop = writeShellScript name ''
  #   export PATH=$PATH:${lib.makeBinPath dependencies}
  #   ${config}/kaizen
  # '';

  # lockscreen = writeShellScript name ''
  #   export PATH=$PATH:${lib.makeBinPath dependencies}
  #   ${ags}/bin/ags run ${config}/lockscreen.ts
  # '';

 config = stdenv.mkDerivation {
    inherit name;
    src = ../config;

    installPhase = ''
      mkdir -p $out
      cp -r . $out
    '';
  };

  desktop = writeShellScript name ''
    export PATH=$PATH:${lib.makeBinPath dependencies}
    ${ags}/bin/ags run ${config}/desktop.ts $@
  '';
in
  stdenv.mkDerivation {
    inherit name version;
    src = config;

    installPhase = ''
      mkdir -p $out/bin
      cp -r . $out
      cp ${desktop} $out/bin/${name}
      ln -s ${ags}/bin/ags $out/bin/ags
    '';

    meta = {
      mainProgram = "kaizen";
      license = lib.licenses.mit;
      platforms = lib.platforms.linux;
      homepage = "https://github.com/TheRiceCold/kaizen";
      description = "A desktop environment for Hyprland that implements the Kaizen philosophy of continuous improvement";
    };
  }

