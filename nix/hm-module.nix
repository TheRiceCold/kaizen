self: { config, pkgs, lib, ...}:
let
  inherit (pkgs.stdenv.hostPlatform) system;
  inherit (lib.options) mkOption mkEnableOption;
  cfg = config.programs.kaizen;
  jsonFormat = pkgs.formats.json { };

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
    settings = lib.mkOption {
      type = jsonFormat.type;
      default = { };
      example = lib.literalExpression ''
        {
          bar.battery.percentage = false;
          theme.dark.bg = "#131318";
          theme.dark.fg = "#e5e1e9";
          theme.dark.primary.bg =  "#c3c0ff";
          theme.dark.primary.fg = "#2b2a60";
          theme.dark.error.bg = "#ffb4ab";
          theme.dark.error.fg = "#690005";
          theme.dark.widget = "#e5e1e9";
          theme.dark.border = "#928f9a";
          autotheme = true; 
        };
      '';
      # TODO: make documentation
      description = ''
        Configuration written to {file}`$XDG_DATA_HOME/ags/config.json`.
        See
        # TODO: make documentation
        for the documentation.
      '';
    }; 
  };

  config = lib.mkIf cfg.enable {

    home.packages = [ cfg.package ];
    
    xdg.dataFile = lib.mkIf (cfg.settings != {}) {
      "ags/config.json".source =
        jsonFormat.generate "config.json" cfg.settings;
    };

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
