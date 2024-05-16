{
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";

    ags.url = "github:aylur/ags";
    matugen.url = "github:iniox/matugen";
    gtk-session-lock.url = "github:Cu3PO42/gtk-session-lock";
  };

  outputs = inputs @ { self, nixpkgs, ... }: let
    version = builtins.replaceStrings["\n"] [""] (builtins.readFile ./version);
    genSystems = nixpkgs.lib.genAttrs [ "aarch64-linux" "x86_64-linux" ];
    pkgs = genSystems (system: import nixpkgs { inherit system; });
  in {
    packages = genSystems (system: rec {
      default = pkgs.${system}.callPackage ./nix { inherit inputs version; };
      kaizen = default;
    });

    homeManagerModules.default = import ./nix/hm-module.nix self;
  };
}
