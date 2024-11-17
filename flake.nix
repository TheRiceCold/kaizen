{
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";

    ags.url = "github:aylur/ags";
    astal.url = "github:aylur/astal";
    # matugen.url = "github:iniox/matugen";
  };

  outputs = inputs @ { self, nixpkgs, ... }:
    let
      genSystems = nixpkgs.lib.genAttrs ["aarch64-linux" "x86_64-linux"];
      pkgs = genSystems (system: import nixpkgs { inherit system; });
    in {
      packages = genSystems(system: rec {
        default = pkgs.${system}.callPackage ./nix { inherit inputs; };
        kaizen = default;
      });
    };
}

