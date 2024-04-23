###### *<div align=right><sub>Last nix update: april 23, 2024</sub></div>*

<h1 align=center>
  Kaizen<br />
</h1>

> [!INFO]
> The japanese word "kaizen" is a philosophy to improve continuously and change for the better.

A linux desktop environment configuration using [Aylur's Gtk Shell][ags]. This configuration is designed to improve workflow with useful development tools.

## ▶️ Showcase
**Status Bar** - Includes window options, audio visualizer/player and screen tools like Draw, Colors, Keys, Record, Snip, etc. <br />
**Quicksettings** - Includes Tabs for Notifications, Wifi, Bluetooth, Audio Control and Display options. <br />
**Date Menu (WIP)** - Includes Tabs for Calendar, Weather/Forecast, Agenda/Todo List, Timer and Events. <br />
**AI Tools (WIP)** - OpenAI ChatGPT and Google Gemini (for now) <br />
**Shortcuts/Cheatsheet** <br />
**Power/Session Menu** <br />
**Lockscreen (WIP)** <br />
**Overview (TODO)** <br />
 
## 🍳 How to cook?
### Manual Installation
#### Dependencies
- [Cava] - Audio visualizer
- [Gromit-mpx] - Annotation Tool
- [Matugen] - Color generation tool
- [Hyprpicker] - Wayland Color Picker
- [Swww] - Animated Wallpaper Daemon
- [Aylur's Gtk Shell][ags] - A customizable and extensive shell
- [Hyprland] - Dynamic Tiling Manager Wayland Compositor
``` bash
git clone https://github.com/thericecold/kaizen
cp -r kaizen/desktop ~/.config/ags
ags -c ~/.config/ags/config.js
```

**Add this line to `.config/hypr/hyprland.conf` to execute on startup**
```
exec-once = kaizen
```

### Nix
---
- **Try it without installing**
``nix run github:thericecold/kaizen``

- **Nix flake profile install**
``nix profile install github:thericecold/kaizen``

- **Flake Input Installation**

    ``flake.nix``
    ``` nix
    {
      inputs = {    
        nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
        home-manager = {
          url = "github:nix-community/home-manager";
          inputs.nixpkgs.follows = "nixpkgs";
        };
        kaizen.url = "github:thericecold/kaizen";
      };

      outputs = { nixpkgs, kaizen, ... } @ inputs: let
        system = "x86_64-linux";
      in {
        homeConfigurations."your_username" = home-manager.lib.homeManagerConfiguration {
          pkgs = import nixpkgs { inherit system; };
          extraSpecialArgs = { inherit kaizen; };
          modules = [ ./home.nix ];
        }
      };
    }
    ```
    ``home.nix``
    ``` nix
    { kaizen, ... }: {
       imports = [ kaizen.homeManagerModules.default; ]; 
       programs.kaizen.enable = true;
    }
    ```

## 🙏 Acknowledgements
- [Joey Mckur](https://github.com/aylur/dotfiles) Developer of Ags
- [end-4](https://github.com/end-4/dots-hyprland) Widget Ideas and AI tools

[ags]: https://github.com/aylur/ags
[swww]: https://github.com/LGFae/swww
[cava]: https://github.com/karlstav/cava
[matugen]: https://github.com/InioX/matugen
[hyprland]: https://github.com/hyprwm/Hyprland
[gromit-mpx]: https://github.com/bk138/gromit-mpx
[hyprpicker]: https://github.com/hyprwm/hyprpicker
