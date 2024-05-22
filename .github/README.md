###### *<div align=right><sub>Last nix update: may 22, 2024</sub></div>*

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
  **[<kbd> <br> Installation <br> </kbd>](#-how-to-cook)** 
  **[<kbd> <br> Acknowledgements&nbsp; <br> </kbd>](#-Acknowledgements)**

</h1>
<p align=center>
  A linux desktop environment configuration using <a href='https://github.com/aylur/ags'>Aylur's Gtk Shell</a>.<br/>
  The japanese word <b>kaizen</b> is a philosophy to improve continuously and change for the better.<br />
</p>

<p align=center>
  This configuration is designed to improve daily workflow with an intuitive and minimal design that includes smart widgets and powerful development tools.
</p>

## 🔥 Showcase

https://github.com/TheRiceCold/kaizen/assets/44263259/4c3e38e9-320c-4d7a-968a-509b556e1ac2

### 🪟 Windows

<details>
  <summary><b>Status Bar</b></summary>

- **Right Buttons**
  - Logo Icon: Toggles launcher window
  - Workspace: Toggles workspaces overview window
  - Extend Button
    - Window Options
      - Fullscreen, Toggle Float, Center Layout, Quit
      - Floats Only: Pin and Center
    - Developer Tools
      - API Tools: Opens API Tools Side Menu
      - Android: Starts and opens BlissOS VM. [view my setup]()
      - Debian: Starts Debian Container. [view my setup]()
      - Windows 11: Opens Windows 11 VM. [view my setup]()
    - Shortcuts: Opens shortcuts window.
    - Help: Opens the wiki page.
- **Left Buttons**: 
  - Extend Button
    - Draw: Starts annotation/drawing tool.
    - Colors: Toggles color popup widget.
    - Keys: Key/keyboard options.
    - Zoom: Zoom toggle options.
    - Record: Screen record options.
    - Snip: Screenshot options.
  - System Tray Applications
  - Control Button: Toggles quicksettings side menu widget
  - Date Button: Toggles Date sidemenu widget
  - Power Button: Opens Powermenu window 
- **Middle Status**:
  > [!NOTE] Click to open Media player popup and scroll up/down to switch between player and visualizer.

</details>

<details>
  <summary><b>Popups</b></summary>
  <ul>
    <li><b>Dock(dock)</b></li>
    <li><b>Keyboard(keyboard)</b></li>
    <li><b>Indicator</b></li>
    <li><b>Color Tool(color)</b></li>
    <li><b>Media Player(media)</b></li>
    <li><b>Notifications</b></li>
    <li><b>Annotation Tools(annotation)</b></li>
  </ul>
</details>

<details>
  <summary><b>Fullscreen</b></summary>

- **Overview**
- **Shortcuts**
- **Power Menu**

</details>

<details>
  <summary><b>Side Menus</b></summary>

- **API Tools (apis)**
  - Google Gemini
  - OpenAI ChatGPT
- **Date menu (date)**: 
  - Calendar
  - Weather and Forecast
  - Agenda/Todo List
  - Pomodoro
  - Events
- **Quick settings (quicksettings)**: 
  - Notification List 
  - Wifi List
  - Bluetooth List,
  - Sound and Audio Settings
  - Display Settings

</details>

<details>
  <summary><b>Lockscreen</b></summary>
  <img src='https://github.com/thericecold/dots/blob/main/assets/screenshots/lockscreen.jpg' />
</details>

<details>
  <summary><b>Login Manager/Greeter (TODO)</b></summary>
</details>

#### How to toggle?
> [!NOTE] 
> use "ags" instead of "kaizen" if you installed this manually<br/>
> The contents of `Side Menus` and `Popups` window with parenthesis are the `<widget-name>`

Toggle a window: `kaizen -t <window-name>`

Toggle a widget: `kaizen -r "toggleWidget('<widget-name>');"`

Example: `~/.config/hypr/hyprland.conf`
``` conf
bind=SUPER, f4, ags -t powermenu # Window
bind=SUPER, m, ags -r "toggleWidget('media');" # Widget
```

## 🫕 How to cook?
### Manual Installation
> [!NOTE]
> This list may be incomplete, so please check the packages inside the `default.nix` file.
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

**Add this line `exec-once = ags` to `.config/hypr/hyprland.conf` to execute on startup.**

---

### ❄️ Nix Installation
- Try it without installing `nix run github:thericecold/kaizen`
- Nix flake profile install `nix profile install github:thericecold/kaizen`
- Flake Input Installation

    `flake.nix`
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
    `home.nix`
    ``` nix
    { kaizen, ... }: {
      imports = [ kaizen.homeManagerModules.default; ]; 
      programs.kaizen = {
        enable = true;
        # // TODO:
        # options = {
        #   theme = {
        #     gaps = 1.5;
        #     padding = 4;
        #     radius = 16;
        #     blur-size = 4;
        #     shadows = true;
        #     border-width = 1;
        #     colorscheme = "poimandres";
        #   };
        #   font =  {
        #     size = 10;
        #     name = "Ubuntu Nerd Font";
        #   };
        # };
      };
    }
    ```

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
