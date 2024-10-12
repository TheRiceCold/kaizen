self: {
  config,
  pkgs,
  lib,
  ...
}: let
  inherit (pkgs.stdenv.hostPlatform) system;
  inherit (lib.options) mkOption mkEnableOption;
  cfg = config.programs.kaizen;
  jsonFormat = pkgs.formats.json {};

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
      default = {};
      inherit (jsonFormat) type;
      example = lib.literalExpression ''
        {
          theme = {
            auto = true;
          };
          widgets = {
            chatbot = {
              useHistory = true;
              default = "gemini";
              gemini = {
                key = "api_key";
                model = "gemini-1.0.-pro";
              };
              chatgpt = {
                key = "api_key";
                model = "gpt-3.5-turbo";
              };
            };
            status-bar = {
              date = { interval = 5000; format = "%a %d %b %I:%M %p"; };
              cava = { smooth = true; length = "long"; };
              buttons = {
                left = ["dashboard" "workspace"];
                middle = ["indicator"];
                right = ["quicksettings" "date" "power"];
              };
            };

            notifications = {
              enable = true;
              blacklist = [ "Spotify" ]
            };

            dashboard = { };
          };
          session = {
            logout = "pkill Hyprland";
            shutdown = "shutdown now";
            sleep = "systemctl suspend";
            reboot = "systemctl reboot";
          };
        };
      '';
      # TODO: write documentation
      description = ''
        Configuration written to {file}`$XDG_DATA_HOME/kaizen/config.json`.
        for the documentation.
      '';
    };
  };

  config = lib.mkIf cfg.enable {
    home.packages = [cfg.package];

    xdg.dataFile = lib.mkIf (cfg.settings != {}) {
      "kaizen/config.json".source = jsonFormat.generate "config.json" cfg.settings;
    };

    systemd.user.services.kaizen = let
      cmd = "${cfg.package}/bin/kaizen -b kaizen";
    in
      lib.mkIf cfg.systemd {
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
