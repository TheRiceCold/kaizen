###### *<div align=right><sub>Last nix update: april 29, 2024</sub></div>*

<h1 align=center>
  <img src='https://github.com/thericecold/dots/blob/main/assets/ibu-circle.png' width='150px'/>

  Kaizen<br />
  <a href='https://nixos.org'>
    <img src='https://img.shields.io/badge/NixOS-unstable-blue.svg?style=for-the-badge&labelColor=1b1e28&logo=NixOS&logoColor=add7ff&color=add7ff'>
  </a>
  <a href='https://github.com/TheRiceCold/kaizen'>
    <img src='https://img.shields.io/github/languages/code-size/thericecold/kaizen?color=5de4c7&labelColor=1b1e28&style=for-the-badge&logo=github&logoColor=5de4c7'>
  </a>
  <a href='https://github.com/TheRiceCold/kaizen/stargazers'>
    <img src='https://img.shields.io/github/stars/thericecold/kaizen?color=fcc5e9&labelColor=1b1e28&style=for-the-badge&logo=starship&logoColor=fcc5e9'>
  </a>

  **[<kbd> <br> Overview <br> </kbd>](#-overview)** 
  **[<kbd> <br> Installation <br> </kbd>](#-how-to-cook-installation)** 
  **[<kbd> <br> Acknowledgements&nbsp; <br> </kbd>](#-Acknowledgements)**

</h1>
<p align=center>The japanese word "kaizen" is a philosophy to improve continuously and change for the better.</p>

A linux desktop environment configuration using [Aylur's Gtk Shell][ags]. This configuration is designed to improve workflow with useful development tools.

## 🔥 Showcase

https://github.com/TheRiceCold/kaizen/assets/44263259/4c3e38e9-320c-4d7a-968a-509b556e1ac2

### Widgets
<details>
  <summary>
    <b>Status Bar</b> - Features a variety commands for windows options, screentools, music player, popup tools, etc.
  </summary>
  <img src='https://github.com/TheRiceCold/kaizen/blob/main/screenshots/status-bar.gif' />
</details>

<details>
  <summary>
    <b>Quicksettings</b> - Includes Tabs for Notifications, Wifi, Bluetooth, Audio Control and Display options.
  </summary>
  <!-- <img src='https://github.com/TheRiceCold/kaizen/blob/main/screenshots/status-bar.gif' /> -->
</details>

<details>
  <summary>
    <b>Date Menu</b>(WIP) - Includes Tabs for Calendar, Weather/Forecast, Agenda/Todo List, Timer and Events.
  </summary>
  <!-- <img src='https://github.com/TheRiceCold/kaizen/blob/main/screenshots/status-bar.gif' /> -->
</details>

<details>
  <summary>
    <b>AI Tools</b>(WIP) - OpenAI ChatGPT and Google Gemini (for now).
  </summary>
  <!-- <img src='https://github.com/TheRiceCold/kaizen/blob/main/screenshots/status-bar.gif' /> -->
</details>

<details>
  <summary>
    <b>Cheatsheet/Shortcuts</b>
  </summary>
  <!-- <img src='https://github.com/TheRiceCold/kaizen/blob/main/screenshots/status-bar.gif' /> -->
</details>

<details>
  <summary>
    <b>Power/Sesion Menu</b>
  </summary>
  <!-- <img src='https://github.com/TheRiceCold/kaizen/blob/main/screenshots/status-bar.gif' /> -->
</details>

<details>
  <summary>
    <b>Lockscreen</b>(WIP)
  </summary>
  <!-- <img src='https://github.com/TheRiceCold/kaizen/blob/main/screenshots/status-bar.gif' /> -->
</details>

<details>
  <summary>
    <b>Overview</b>(WIP) - Show workspaces and windows
  </summary>
  <!-- <img src='https://github.com/TheRiceCold/kaizen/blob/main/screenshots/status-bar.gif' /> -->
</details>

## 🫕 How to cook?
### Manual Installation
> [!NOTE]
> This list may be incomplete, so please check the packages inside the 'default.nix' file.
#### Dependencies
- Utilities: [bun], [dart-sass], [fd], [gtk3]
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
exec-once = ags
```

### ❄️ Nix
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


## 🪟 Toggling widgets and windows
Toggle the widgets with keyboard shortcuts
> [!NOTE]
> Replace "ags" with "kaizen" if you installed this using nix

Example: `~/.config/hypr/hyprland.conf`
``` conf
bind=SUPER, f4, ags -t powermenu # Window
bind=SUPER, m, ags -r "toggleMedia('media');" # Widget
```
windows: powermenu, shortcuts, overview, launcher <br/>
widgets: quicksettings, apis, media, colors, datemenu, keyboard, dock


## 🙏 Acknowledgements
- [Joey Mckur](https://github.com/aylur/dotfiles) Developer/Owner of Ags
- [end-4](https://github.com/end-4/dots-hyprland) Widget Ideas and AI tools

[gtk3]: https://docs.gtk.org/gtk3
[bun]: https://github.com/oven-sh/bun
[fd]: https://github.com/sharkdp/fd
[ags]: https://github.com/aylur/ags
[swww]: https://github.com/LGFae/swww
[cava]: https://github.com/karlstav/cava
[matugen]: https://github.com/InioX/matugen
[dart-sass]: https://github.com/sass/dart-sass
[hyprland]: https://github.com/hyprwm/Hyprland
[gromit-mpx]: https://github.com/bk138/gromit-mpx
[hyprpicker]: https://github.com/hyprwm/hyprpicker
