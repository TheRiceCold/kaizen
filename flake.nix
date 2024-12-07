{
  description = "A desktop environment for Hyprland that implements the Kaizen philosophy of continuous improvement";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    astal.url = "github:aylur/astal";
    ags.url = "github:aylur/ags";
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
