###### *<div align=right><sub>Last nix update: april 24, 2024</sub></div>*

<center>
  <h1>Kaizen<br />
    <a href='https://nixos.org'>
      <img src='https://img.shields.io/badge/NixOS-unstable-blue.svg?style=for-the-badge&labelColor=1b1e28&logo=NixOS&logoColor=add7ff&color=add7ff'>
    </a>
    <a href='https://github.com/TheRiceCold/kaizen'>
      <img src='https://img.shields.io/github/languages/code-size/thericecold/kaizen?color=5de4c7&labelColor=1b1e28&style=for-the-badge&logo=github&logoColor=5de4c7'>
    </a>
    <a href='https://github.com/TheRiceCold/kaizen/stargazers'>
      <img src='https://img.shields.io/github/stars/thericecold/kaizen?color=fcc5e9&labelColor=1b1e28&style=for-the-badge&logo=starship&logoColor=fcc5e9'>
    </a>
  </h1>
  <p>The japanese word "kaizen" is a philosophy to improve continuously and change for the better.</p>
</center>

A linux desktop environment configuration using [Aylur's Gtk Shell][ags]. This configuration is designed to improve workflow with useful development tools.

## ▶️ Showcase
**Status Bar** - Includes window options(left), audio visualizer/player(middle) and screen tools(right) like draw, colors, recorder, keys, etc.

<img src='https://github.com/TheRiceCold/kaizen/blob/main/screenshots/status-bar.gif' />

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
- Try it without installing
``nix run github:thericecold/kaizen``

- Nix flake profile install
``nix profile install github:thericecold/kaizen``

- Flake Input Installation

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
