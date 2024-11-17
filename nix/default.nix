{
  lib,
  inputs,
  system, stdenv,
  writeShellScript,
  fd, which, dart-sass,

  brightnessctl,

  version ? "git",
}: let
  name = "kaizen-astal";

  ags = inputs.ags.packages.${system}.default.override {
    extraPackages = with inputs.astal.packages.${system}; [
      notifd
      battery
      network
      bluetooth
      hyprland
      apps
      tray
      # cava
      mpris
      wireplumber
    ];
  };

  dependencies = [
    fd
    which
    dart-sass
    brightnessctl # Read and control brightness
  ];

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
    ${ags}/bin/ags run ${config}/app.ts
  '';
in
  stdenv.mkDerivation {
    inherit name version;
    src = config;

    installPhase = ''
      mkdir -p $out/bin
      cp -r . $out
      cp ${desktop} $out/bin/${name}
    '';

    meta = {
      mainProgram = "kaizen";
      license = lib.licenses.mit;
      platforms = lib.platforms.linux;
      homepage = "https://github.com/TheRiceCold/kaizen";
      description = "A linux desktop environment configuration using Aylur's Gtk Shell.";
    };
  }

