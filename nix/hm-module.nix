self: { config, pkgs, lib, ...}:
let
  inherit (pkgs.stdenv.hostPlatform) system;
  inherit (lib.options) mkOption mkEnableOption;
  cfg = config.programs.kaizen;

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
    systemd = mkOption {
      default = false;
      description = ''
        Starts Kaizen as a systemd service.

        This will reload the configuration on profile activation.
      '';
    };
  };

  config = lib.mkIf cfg.enable {

    home.packages = [ cfg.package ];

    systemd.user.services.kaizen = let
      cmd = "${cfg.package}/bin/kaizen -b kaizen";
    in lib.mkIf cfg.systemd {
      Unit = {
        Description = "A linux desktop environment configuration using Aylur's Gtk Shell.";
        Documentation = "https://github.com/TheRiceCold/kaizen";
        PartOf = ["graphical-session.target"];
        After = ["graphical-session.target"];
        Before = ["xdg-desktop-autostart.target"];
      };

      Service = {
        ExecStart = cmd;
        ExecReload = "${cmd}; ${cmd} quit"; 
        ExecStop = "${cmd} quit";
        Restart = "on-failure";
        KillMode = "mixed";
      };

      Install = {
        WantedBy = ["graphical-session.target"];
      };
    };
  };
}
