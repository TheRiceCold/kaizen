self: { pkgs, lib, ...}:
let
  inherit (pkgs.stdenv.hostPlatform) system;
  inherit (lib.options) mkOption mkEnableOption;

  defaultPackage = self.packages.${system}.default;
in {
  options.programs.kaizen = {
    enable = mkEnableOption "kaizen";
    package = mkOption {
      default = defaultPackage;
      description = ''
        Kaizen package to use.

        By default, this option will use the `packages.default` as exposed by this flake
      '';
    };
  };

  config = {
    programs.kaizen.package = lib.mkDefault defaultPackage;
  };
}
