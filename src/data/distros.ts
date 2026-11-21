import { LinuxDistro, DesktopEnvShowcase, MatchmakerQuestion } from '@/types';

export const LINUX_DISTROS: LinuxDistro[] = [
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    tagline: 'Linux for human beings — the world’s most widely used desktop distribution.',
    category: 'beginner',
    family: 'Debian',
    logoColor: '#E95420',
    accentColor: '#77216F',
    description: 'Developed by Canonical, Ubuntu is the gateway to Linux for millions. It offers phenomenal hardware compatibility, thousands of pre-packaged apps, and long-term support guarantees.',
    longOverview: 'Ubuntu revolutionized desktop Linux in 2004 by introducing easy installation and out-of-the-box driver detection. Available in standard 6-month releases and ultra-stable 5-year Long Term Support (LTS) editions, it is the de facto baseline for web tutorials, hardware vendors, and third-party software developers.',
    beginnerFriendlyScore: 5,
    customizabilityScore: 4,
    stabilityScore: 5,
    gamingScore: 4,
    resourceUsage: 'Medium',
    releaseModel: 'Fixed Release (LTS)',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '2 GHz dual-core 64-bit',
      recCpu: '2.5 GHz quad-core or better',
      minRam: '2 GB',
      recRam: '4 GB to 8 GB',
      minStorage: '25 GB SSD',
      recStorage: '50 GB+ SSD',
      architecture: 'x86_64, ARM64 (Raspberry Pi)'
    },
    desktopEnvironment: {
      default: 'Customized GNOME 46',
      alternatives: ['Kubuntu (KDE)', 'Xubuntu (XFCE)', 'Lubuntu (LXQt)', 'Ubuntu MATE'],
      windowManager: 'Mutter',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Yaru Dark / Light',
      accentColors: ['#E95420', '#77216F', '#2C001E'],
      desktopVibe: 'Sleek aubergine & vibrant orange with a left-side launcher dock and smooth rounded corners.',
      appearanceTags: ['Left Dock', 'Modern Flat', 'Aubergine Glow', 'High DPI Ready']
    },
    packageManager: {
      name: 'APT & Snap',
      cliCommand: 'sudo apt install <package>',
      updateCommand: 'sudo apt update && sudo apt upgrade',
      softwareStore: 'Ubuntu App Center (Debian & Snap Store)',
      supportsFlatpak: true,
      supportsSnap: true
    },
    pros: [
      'Huge global community — almost any error has an answer online',
      'Wide proprietary driver support (NVIDIA, Wi-Fi, Bluetooth)',
      'Steam and gaming setups work effortlessly out of the box',
      'Long Term Support (LTS) versions are supported for up to 10 years'
    ],
    cons: [
      'Forced Snap packages for certain apps (like Firefox/Chromium)',
      'Telemetry features enabled by default during installation'
    ],
    bestFor: 'First-time Linux users, everyday PC work, web developers, university students',
    officialSite: 'https://ubuntu.com',
    downloadSize: '5.8 GB ISO',
    terminalNeofetch: {
      asciiArt: [
        '         _---_        ',
        '       /       \\      ',
        '      |  (o) (o) |     ',
        '      |    _    |     ',
        '       \\  `---` /      ',
        '        `-----`       '
      ],
      os: 'Ubuntu 24.04.1 LTS x86_64',
      kernel: 'Linux 6.8.0-generic',
      uptime: '4 hours, 20 mins',
      packages: '1842 (dpkg), 12 (snap)',
      shell: 'bash 5.2.21',
      de: 'GNOME 46.0',
      wm: 'Mutter (Wayland)'
    }
  },
  {
    id: 'arch',
    name: 'Arch Linux',
    tagline: 'Keep It Simple, Stupid (KISS) — the ultimate rolling release for tinkerers.',
    category: 'power-user',
    family: 'Arch',
    logoColor: '#1793D1',
    accentColor: '#33AADD',
    description: 'A DIY distribution where you build your operating system piece-by-piece from a command line. Famous for the Arch User Repository (AUR) and the legendary Arch Wiki.',
    longOverview: 'Arch Linux provides only the bare minimum core system during install. You personally choose every package, audio server (PipeWire), window manager, and display manager. Because it follows a rolling release schedule, you never need to reinstall: you get software updates the same day upstream developers publish them.',
    beginnerFriendlyScore: 1,
    customizabilityScore: 5,
    stabilityScore: 4,
    gamingScore: 5,
    resourceUsage: 'Very Low',
    releaseModel: 'Rolling Release',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '512 MHz 64-bit CPU',
      recCpu: 'Any modern 64-bit processor',
      minRam: '512 MB',
      recRam: '2 GB to 16 GB (depends on desktop chosen)',
      minStorage: '2 GB CLI only / 20 GB with GUI',
      recStorage: '30 GB+ SSD',
      architecture: 'x86_64'
    },
    desktopEnvironment: {
      default: 'None (Pure TTY terminal on boot; you install GNOME, KDE, or Hyprland)',
      alternatives: ['Hyprland', 'KDE Plasma', 'i3wm', 'Sway', 'GNOME'],
      windowManager: 'User Choice',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'User Configured (Nord / Catppuccin / Tokyo Night)',
      accentColors: ['#1793D1', '#33AADD', '#0F141C'],
      desktopVibe: 'Hyper-customized aesthetic with tiling window animations, dotfiles, and custom Waybar status lines.',
      appearanceTags: ['Minimalist', 'Tiling WM', 'High Performance', 'Keyboard Driven']
    },
    packageManager: {
      name: 'Pacman & AUR (yay / paru)',
      cliCommand: 'sudo pacman -S <package>',
      updateCommand: 'sudo pacman -Syu',
      softwareStore: 'Arch User Repository (AUR) with over 85,000 community packages',
      supportsFlatpak: true,
      supportsSnap: true
    },
    pros: [
      'The Arch Wiki is the best documentation in all of open source computing',
      'The AUR contains virtually every software package ever written for Linux',
      'Zero bloatware: absolutely nothing is on your disk unless you asked for it',
      'Bleeding-edge Linux kernels give the best performance for modern AMD/Intel CPUs & GPUs'
    ],
    cons: [
      'Command-line text installer (though `archinstall` script helps beginners)',
      'Manual intervention occasionally required during major package upgrades'
    ],
    bestFor: 'Software engineers, custom desktop enthusiasts, curious learners, power users',
    officialSite: 'https://archlinux.org',
    downloadSize: '1.1 GB ISO',
    terminalNeofetch: {
      asciiArt: [
        '          /\\          ',
        '         /  \\         ',
        '        /\\   \\        ',
        '       /      \\       ',
        '      /   ,,   \\      ',
        '     /   |  |  -\\     ',
        '    /_-`""    ""`-_   '
      ],
      os: 'Arch Linux x86_64',
      kernel: 'Linux 6.12.8-arch1-1',
      uptime: '14 days, 3 hours',
      packages: '840 (pacman)',
      shell: 'zsh 5.9',
      de: 'Hyprland (Wayland)',
      wm: 'Hyprland'
    }
  },
  {
    id: 'fedora',
    name: 'Fedora Workstation',
    tagline: 'Leading the future of open-source technology with pure GNOME & pure innovation.',
    category: 'enterprise',
    family: 'Red Hat',
    logoColor: '#51A2DA',
    accentColor: '#0B57A4',
    description: 'Sponsored by Red Hat (IBM), Fedora is famous for pioneering new Linux technologies (Wayland, PipeWire, Btrfs, Flatpak) while preserving rock-solid stability and modern design.',
    longOverview: 'Fedora strikes the ideal balance between bleeding-edge software and dependable stability. It features an untouched, vanilla GNOME desktop providing a distraction-free, gesture-driven workflow. Linus Torvalds himself famously runs Fedora on his personal workstations.',
    beginnerFriendlyScore: 4,
    customizabilityScore: 4,
    stabilityScore: 5,
    gamingScore: 4,
    resourceUsage: 'Medium',
    releaseModel: 'Fixed Release (LTS)',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '2 GHz quad-core 64-bit',
      recCpu: '2.5 GHz quad-core or multi-thread',
      minRam: '2 GB',
      recRam: '4 GB to 16 GB',
      minStorage: '20 GB',
      recStorage: '40 GB+ SSD',
      architecture: 'x86_64, ARM64, RISC-V'
    },
    desktopEnvironment: {
      default: 'Pure Vanilla GNOME 47',
      alternatives: ['Fedora KDE Spin', 'Fedora Cinnamon', 'Fedora Sway'],
      windowManager: 'Mutter',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Adwaita Material Flat',
      accentColors: ['#51A2DA', '#0B57A4', '#1E1E1E'],
      desktopVibe: 'Ultra-clean, clutter-free minimalism with 3-finger touchpad gestures and dynamic workspaces.',
      appearanceTags: ['Vanilla GNOME', 'Modern Gestures', 'Clean Typography', 'Blue Accents']
    },
    packageManager: {
      name: 'DNF 5 & Flatpak (Flathub)',
      cliCommand: 'sudo dnf install <package>',
      updateCommand: 'sudo dnf upgrade',
      softwareStore: 'GNOME Software with integrated Flathub one-click installs',
      supportsFlatpak: true,
      supportsSnap: true
    },
    pros: [
      'Pioneers the latest Linux tech: Btrfs file system with automatic snapshot support',
      'Cleanest implementation of pure GNOME without proprietary clutter',
      'Backed by enterprise giant Red Hat; high code auditing standards',
      'Fast, modern DNF package management and native Flatpak sandboxing'
    ],
    cons: [
      'Strict commitment to 100% open-source software means proprietary codecs require RPM Fusion repository toggle',
      '6-month rapid release cycle requires upgrading every 9 to 13 months'
    ],
    bestFor: 'Developers, system administrators, creators who want modern packages with enterprise stability',
    officialSite: 'https://fedoraproject.org',
    downloadSize: '2.4 GB ISO',
    terminalNeofetch: {
      asciiArt: [
        '        /""""""""\\      ',
        '       /   ____   \\     ',
        '      |   /    \\   |    ',
        '      |   |  F |   |    ',
        '      |   \\____/   |    ',
        '       \\__________/     '
      ],
      os: 'Fedora Linux 41 (Workstation Edition) x86_64',
      kernel: 'Linux 6.11.4-200.fc41.x86_64',
      uptime: '2 days, 1 hour',
      packages: '1620 (rpm), 25 (flatpak)',
      shell: 'bash 5.2.26',
      de: 'GNOME 47.1',
      wm: 'Mutter (Wayland)'
    }
  },
  {
    id: 'mint',
    name: 'Linux Mint',
    tagline: 'The undisputed champion of comfort, elegance, and Windows-friendly familiarity.',
    category: 'beginner',
    family: 'Debian',
    logoColor: '#87CF3E',
    accentColor: '#5C9E26',
    description: 'Designed to feel instantly familiar to anyone moving from Windows 10 or 7. Features the refined Cinnamon desktop, built-in backup tools, and zero learning curve.',
    longOverview: 'Linux Mint is built on top of Ubuntu LTS but removes unwanted bloat (like Snaps) in favor of user choice, native Flatpaks, and the home-grown Cinnamon desktop environment. It comes with out-of-the-box media codecs, an automated Update Manager that classifies risk, and the Timeshift snapshot utility to restore your OS if something goes wrong.',
    beginnerFriendlyScore: 5,
    customizabilityScore: 4,
    stabilityScore: 5,
    gamingScore: 4,
    resourceUsage: 'Low',
    releaseModel: 'Fixed Release (LTS)',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '1 GHz single-core 64-bit',
      recCpu: '2 GHz dual-core or better',
      minRam: '2 GB',
      recRam: '4 GB',
      minStorage: '20 GB',
      recStorage: '30 GB+ SSD',
      architecture: 'x86_64'
    },
    desktopEnvironment: {
      default: 'Cinnamon 6.2',
      alternatives: ['MATE Edition', 'XFCE Edition (for ultra-old PCs)'],
      windowManager: 'Muffin',
      waylandDefault: false
    },
    themeStyle: {
      styleName: 'Mint-Y Dark / Emerald',
      accentColors: ['#87CF3E', '#2F343F', '#1C1F26'],
      desktopVibe: 'Classic taskbar at the bottom, traditional Start menu with search, system tray in bottom right.',
      appearanceTags: ['Windows Familiar', 'Bottom Taskbar', 'Emerald Accents', 'Zero Bloat']
    },
    packageManager: {
      name: 'APT & Flatpak',
      cliCommand: 'sudo apt install <package>',
      updateCommand: 'sudo apt update && sudo apt upgrade',
      softwareStore: 'Mint Software Manager with one-click Flatpak & Deb installs',
      supportsFlatpak: true,
      supportsSnap: false
    },
    pros: [
      'Number one recommended distro for Windows switchers: zero retraining needed',
      'Timeshift system snapshot tool is built-in and makes breakages reversible',
      'No Snap packages forced on users; native Flatpak support enabled by default',
      'Incredible battery life and low RAM consumption on laptops'
    ],
    cons: [
      'Wayland display server support is still experimental in Cinnamon',
      'Conservative visual aesthetic may feel slightly traditional rather than futuristic'
    ],
    bestFor: 'Everyday users, Windows migrants, parents, office laptops, people who want their computer to just work',
    officialSite: 'https://linuxmint.com',
    downloadSize: '2.8 GB ISO',
    terminalNeofetch: {
      asciiArt: [
        '   _________________   ',
        '  |  _     _     _  |  ',
        '  | | |   | |   | | |  ',
        '  | | |___| |___| | |  ',
        '  | |_____________| |  ',
        '  |_________________|  '
      ],
      os: 'Linux Mint 22 (Wilma) x86_64',
      kernel: 'Linux 6.8.0-38-generic',
      uptime: '1 day, 6 hours',
      packages: '2012 (dpkg), 8 (flatpak)',
      shell: 'bash 5.2.21',
      de: 'Cinnamon 6.2.9',
      wm: 'Muffin (X11)'
    }
  },
  {
    id: 'debian',
    name: 'Debian',
    tagline: 'The Universal Operating System — bedrock of the open source universe.',
    category: 'enterprise',
    family: 'Debian',
    logoColor: '#D70A53',
    accentColor: '#A80036',
    description: 'The foundation for Ubuntu, Mint, Kali, and hundreds of others. Known for unshakeable stability, rigorous software testing, and steadfast commitment to free software philosophy.',
    longOverview: 'Started in 1993 by Ian Murdock, Debian is run by a decentralized community of volunteers without corporate ownership. Debian’s "Stable" branch is so rigorously tested that it runs on the International Space Station, mission-critical banks, and the vast majority of web servers across the internet.',
    beginnerFriendlyScore: 3,
    customizabilityScore: 4,
    stabilityScore: 5,
    gamingScore: 3,
    resourceUsage: 'Very Low',
    releaseModel: 'Fixed Release (LTS)',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '1 GHz CPU',
      recCpu: '2 GHz dual-core',
      minRam: '1 GB (CLI) / 2 GB (Desktop)',
      recRam: '4 GB',
      minStorage: '10 GB',
      recStorage: '25 GB SSD',
      architecture: 'x86_64, i386, ARM64, MIPS, RISC-V, s390x'
    },
    desktopEnvironment: {
      default: 'Choice during installer (GNOME, KDE Plasma, XFCE, Cinnamon, MATE, LXQt)',
      alternatives: ['XFCE', 'KDE Plasma', 'LXDE'],
      windowManager: 'Depends on DE',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Debian Emerald & Ruby',
      accentColors: ['#D70A53', '#1C202A', '#EAEAEA'],
      desktopVibe: 'Stately, rock-solid, distraction-free purity.',
      appearanceTags: ['Unbreakable', 'Pure FOSS', 'Universal Architecture', 'Lightweight']
    },
    packageManager: {
      name: 'APT & Dpkg',
      cliCommand: 'sudo apt install <package>',
      updateCommand: 'sudo apt update && sudo apt upgrade',
      softwareStore: 'Synaptic Package Manager & GNOME Software',
      supportsFlatpak: true,
      supportsSnap: true
    },
    pros: [
      'Legendary unshakeable stability: it almost never crashes',
      'Supports virtually every processor architecture known to humankind',
      'True non-profit community governance with no corporate tracking or advertising',
      'In Debian 12+, non-free firmware for Wi-Fi is included out of the box'
    ],
    cons: [
      'Software versions in Debian Stable can be 1-2 years older than cutting-edge releases',
      'Installer offers lots of technical questions that can intimidate true beginners'
    ],
    bestFor: 'Home servers, programming infrastructure, older hardware, purists who prize stability over new features',
    officialSite: 'https://debian.org',
    downloadSize: '3.7 GB DVD ISO / 600 MB Netinst',
    terminalNeofetch: {
      asciiArt: [
        '         ,---,_        ',
        '       /        \\      ',
        '      |   ,--,   |     ',
        '      |   |  |   |     ',
        '       \\  `--`  /      ',
        '        `------`       '
      ],
      os: 'Debian GNU/Linux 12 (bookworm) x86_64',
      kernel: 'Linux 6.1.0-26-amd64',
      uptime: '38 days, 12 hours',
      packages: '1420 (dpkg)',
      shell: 'bash 5.2.15',
      de: 'GNOME 43.9',
      wm: 'Mutter (Wayland)'
    }
  },
  {
    id: 'pop-os',
    name: 'Pop!_OS',
    tagline: 'Built by System76 for STEM pros, creators, and hardcore Linux gamers.',
    category: 'gaming',
    family: 'Debian',
    logoColor: '#48B9C7',
    accentColor: '#FFA726',
    description: 'An Ubuntu-based powerhouse with dedicated ISOs containing pre-configured NVIDIA drivers, built-in window auto-tiling, hybrid graphics toggles, and the revolutionary Rust-based COSMIC desktop.',
    longOverview: 'Pop!_OS is crafted by hardware maker System76. It solves the biggest headaches Linux gamers and engineers face: GPU driver installation, power management on hybrid laptops, and fast window management. It includes out-of-the-box Flatpak integration and encryption by default.',
    beginnerFriendlyScore: 5,
    customizabilityScore: 4,
    stabilityScore: 5,
    gamingScore: 5,
    resourceUsage: 'Medium',
    releaseModel: 'Fixed Release (LTS)',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '2 GHz dual-core 64-bit',
      recCpu: 'Modern multi-core CPU',
      minRam: '4 GB',
      recRam: '8 GB to 16 GB',
      minStorage: '25 GB SSD',
      recStorage: '60 GB+ NVMe SSD',
      architecture: 'x86_64'
    },
    desktopEnvironment: {
      default: 'COSMIC Desktop (Rust)',
      alternatives: ['GNOME (Pop Shell)'],
      windowManager: 'cosmic-comp',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Pop Dark & Cyan Tech',
      accentColors: ['#48B9C7', '#FFA726', '#1E232A'],
      desktopVibe: 'Industrial cyan & warm amber with smooth floating dock and smart window tiling layout.',
      appearanceTags: ['Auto-Tiling', 'NVIDIA Ready', 'COSMIC Rust', 'Gamer Aesthetic']
    },
    packageManager: {
      name: 'APT & Flatpak',
      cliCommand: 'sudo apt install <package>',
      updateCommand: 'sudo apt update && sudo apt full-upgrade',
      softwareStore: 'Pop!_Shop with one-click Flatpak sandboxed software',
      supportsFlatpak: true,
      supportsSnap: false
    },
    pros: [
      'Separate download ISO with NVIDIA drivers pre-installed eliminates black-screen bugs',
      'Auto-tiling window manager switch allows keyboard navigation without complex config files',
      'One-click battery vs performance mode switcher for gaming laptops',
      'Full-disk encryption enabled by default during installation'
    ],
    cons: [
      'COSMIC desktop is in active evolution from GNOME to pure Rust',
      'Recovery partition requires slightly more storage space (4 GB partition created)'
    ],
    bestFor: 'PC Gamers, data scientists, machine learning engineers, dual-GPU laptop users',
    officialSite: 'https://system76.com/pop',
    downloadSize: '3.4 GB ISO (Intel/AMD) / 3.8 GB ISO (NVIDIA)',
    terminalNeofetch: {
      asciiArt: [
        '      //   //   //     ',
        '     //   //   //      ',
        '    //   //   //       ',
        '   ((   ((   ((        ',
        '    \\\\   \\\\   \\\\       ',
        '     \\\\   \\\\   \\\\      '
      ],
      os: 'Pop!_OS 24.04 LTS x86_64',
      kernel: 'Linux 6.9.3-76060903-generic',
      uptime: '5 hours, 14 mins',
      packages: '1980 (dpkg), 34 (flatpak)',
      shell: 'bash 5.2.21',
      de: 'COSMIC (Wayland)',
      wm: 'cosmic-comp'
    }
  },
  {
    id: 'manjaro',
    name: 'Manjaro',
    tagline: 'Arch Linux made accessible, polished, and friendly for everyone.',
    category: 'gaming',
    family: 'Arch',
    logoColor: '#35BF5C',
    accentColor: '#289849',
    description: 'Brings the superpowers of Arch Linux (rolling releases & AUR) to everyday users through graphical installers, automatic hardware configuration, and curated package staging.',
    longOverview: 'Manjaro holds back upstream Arch packages for a brief testing period (1-2 weeks) to catch bugs before they reach user machines. It offers dedicated editions for KDE Plasma, XFCE, and GNOME, along with the Pamac graphical app store that makes browsing the AUR as easy as using an app store on a smartphone.',
    beginnerFriendlyScore: 4,
    customizabilityScore: 5,
    stabilityScore: 4,
    gamingScore: 5,
    resourceUsage: 'Low to Medium',
    releaseModel: 'Rolling Release',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '1 GHz 64-bit CPU',
      recCpu: '2 GHz quad-core',
      minRam: '2 GB',
      recRam: '4 GB to 8 GB',
      minStorage: '30 GB SSD',
      recStorage: '50 GB SSD',
      architecture: 'x86_64, ARM64'
    },
    desktopEnvironment: {
      default: 'KDE Plasma / XFCE / GNOME',
      alternatives: ['Cinnamon', 'i3', 'Sway'],
      windowManager: 'KWin / Mutter',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Breath Dark / Teal',
      accentColors: ['#35BF5C', '#1E222D', '#2B313F'],
      desktopVibe: 'Crisp emerald-teal accents, smooth blur effects, and customized Pamac store.',
      appearanceTags: ['Teal Accents', 'KDE Blur', 'Pamac GUI', 'Modern Polished']
    },
    packageManager: {
      name: 'Pamac & Pacman',
      cliCommand: 'sudo pacman -S <package> / pamac install <pkg>',
      updateCommand: 'sudo pacman -Syu',
      softwareStore: 'Pamac GUI with AUR, Flatpak, and Snap toggles in Settings',
      supportsFlatpak: true,
      supportsSnap: true
    },
    pros: [
      'Access to the massive Arch User Repository (AUR) without manual terminal builds',
      'Manjaro Hardware Detection (MHWD) installs proprietary GPU drivers in 1 click',
      'Kernel manager allows switching between Linux Kernels with a simple GUI dropdown',
      'Active gaming community with Steam and Proton pre-installed'
    ],
    cons: [
      'Delayed package holding can occasionally cause minor desync with AUR packages',
      'Rolling updates still require occasional user mindfulness'
    ],
    bestFor: 'Gamers wanting rolling updates, intermediate users who want Arch without the CLI install',
    officialSite: 'https://manjaro.org',
    downloadSize: '3.6 GB ISO',
    terminalNeofetch: {
      asciiArt: [
        '    ||||||||| ||||     ',
        '    ||||||||| ||||     ',
        '    ||||      ||||     ',
        '    |||| |||| ||||     ',
        '    |||| |||| ||||     ',
        '    |||| |||| ||||     '
      ],
      os: 'Manjaro Linux x86_64',
      kernel: 'Linux 6.10.13-3-MANJARO',
      uptime: '3 days, 8 hours',
      packages: '1240 (pacman), 18 (flatpak)',
      shell: 'zsh 5.9',
      de: 'KDE Plasma 6.1.5',
      wm: 'KWin (Wayland)'
    }
  },
  {
    id: 'opensuse',
    name: 'openSUSE (Tumbleweed & Leap)',
    tagline: 'The chameleon of computing — German enterprise engineering meets snappy rolling releases.',
    category: 'enterprise',
    family: 'Independent',
    logoColor: '#73BA25',
    accentColor: '#173F35',
    description: 'Renowned for YaST (the most complete system control center in Linux), automated Btrfs Snapper rollback booting, and the choice between rock-solid Leap or bleeding-edge Tumbleweed.',
    longOverview: 'openSUSE is developed in Nuremberg, Germany and sponsored by SUSE. Its standout feature is Snapper integration: before every system update, it captures a filesystem snapshot. If an update ever breaks your PC, you simply pick the previous snapshot from the GRUB boot menu and your computer boots normally.',
    beginnerFriendlyScore: 3,
    customizabilityScore: 5,
    stabilityScore: 5,
    gamingScore: 4,
    resourceUsage: 'Medium',
    releaseModel: 'Rolling Release',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '2 GHz dual-core 64-bit',
      recCpu: 'Quad-core modern CPU',
      minRam: '2 GB',
      recRam: '4 GB to 8 GB',
      minStorage: '40 GB (for Btrfs snapshots)',
      recStorage: '80 GB+ SSD',
      architecture: 'x86_64, ARM64, PowerPC, s390x'
    },
    desktopEnvironment: {
      default: 'KDE Plasma 6 or GNOME 47',
      alternatives: ['XFCE', 'Generic Desktop'],
      windowManager: 'KWin',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Geeko Green & Breeze',
      accentColors: ['#73BA25', '#173F35', '#232629'],
      desktopVibe: 'Clean green chameleon insignia with ultra-robust YaST configuration panels.',
      appearanceTags: ['YaST Control Center', 'Snapper Snapshots', 'Green Chameleon', 'KDE First-Class']
    },
    packageManager: {
      name: 'Zypper & RPM',
      cliCommand: 'sudo zypper install <package>',
      updateCommand: 'sudo zypper dup (Tumbleweed) / zypper up (Leap)',
      softwareStore: 'openSUSE Software Center & YaST Software Management',
      supportsFlatpak: true,
      supportsSnap: true
    },
    pros: [
      'Snapper Btrfs integration allows booting directly into older snapshots from the bootloader',
      'YaST Control Center provides graphical configuration for firewalls, partitions, and servers',
      'Open Build Service (OBS) offers high-quality automated testing via openQA',
      'First-class KDE Plasma integration with exceptional attention to detail'
    ],
    cons: [
      'Zypper package manager is slightly slower than pacman or DNF5',
      'Community size in English is somewhat smaller than Ubuntu or Arch'
    ],
    bestFor: 'Sysadmins, KDE Plasma lovers, developers wanting reliable rolling releases with safety nets',
    officialSite: 'https://opensuse.org',
    downloadSize: '4.3 GB Offline ISO / 200 MB Netinst',
    terminalNeofetch: {
      asciiArt: [
        '      .----.          ',
        '     /  ..  \\         ',
        '    |  /  \\  |        ',
        '    |  \\__/  |        ',
        '     \\  __  /         ',
        '      `----`          '
      ],
      os: 'openSUSE Tumbleweed x86_64',
      kernel: 'Linux 6.11.2-1-default',
      uptime: '6 days, 2 hours',
      packages: '2410 (rpm)',
      shell: 'bash 5.2.32',
      de: 'KDE Plasma 6.1.5',
      wm: 'KWin (Wayland)'
    }
  },
  {
    id: 'kali',
    name: 'Kali Linux',
    tagline: 'The world’s most advanced penetration testing and ethical hacking platform.',
    category: 'security',
    family: 'Debian',
    logoColor: '#007DFE',
    accentColor: '#555555',
    description: 'Maintained by Offensive Security, Kali comes pre-loaded with over 600 forensic, vulnerability assessment, and penetration testing tools like Wireshark, Metasploit, Nmap, and Burp Suite.',
    longOverview: 'Kali Linux is designed exclusively for cybersecurity professionals and ethical hackers. Built on top of Debian Testing, it features custom kernel patches for wireless 802.11 packet injection and the "Kali Undercover" mode which camouflages your screen to look like Windows 10 when working in public places.',
    beginnerFriendlyScore: 2,
    customizabilityScore: 4,
    stabilityScore: 4,
    gamingScore: 2,
    resourceUsage: 'Low to Medium',
    releaseModel: 'Semi-Rolling',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '1 GHz CPU',
      recCpu: '2.5 GHz quad-core',
      minRam: '2 GB',
      recRam: '8 GB+ (for memory-heavy toolchains)',
      minStorage: '20 GB',
      recStorage: '50 GB+ SSD',
      architecture: 'x86_64, ARM64, Raspberry Pi'
    },
    desktopEnvironment: {
      default: 'Lightweight XFCE Customized',
      alternatives: ['GNOME', 'KDE Plasma'],
      windowManager: 'Xfwm4',
      waylandDefault: false
    },
    themeStyle: {
      styleName: 'Kali Dragon Dark',
      accentColors: ['#007DFE', '#161920', '#2E3440'],
      desktopVibe: 'Dark dragon motif with high-contrast cyber blue accents and categorized security menus.',
      appearanceTags: ['Ethical Hacking', 'Dragon Motif', 'Undercover Mode', 'Tool Packed']
    },
    packageManager: {
      name: 'APT',
      cliCommand: 'sudo apt install <package>',
      updateCommand: 'sudo apt update && sudo apt full-upgrade',
      softwareStore: 'Kali Repository with specialized security metapackages',
      supportsFlatpak: true,
      supportsSnap: true
    },
    pros: [
      'Over 600 pre-installed and calibrated ethical hacking tools',
      'Custom kernel with raw packet injection and wireless driver patches',
      'Kali Undercover mode quickly disguises the UI as Windows 10',
      'Industry standard for OSCP and professional security certifications'
    ],
    cons: [
      'NOT meant for everyday daily driving, gaming, or general office work',
      'Root user orientation can lead beginners to accidentally break their system'
    ],
    bestFor: 'Cybersecurity students, penetration testers, network security analysts, digital forensics',
    officialSite: 'https://kali.org',
    downloadSize: '3.9 GB ISO',
    terminalNeofetch: {
      asciiArt: [
        '      ..............   ',
        '    ..            ..   ',
        '   .  (o)      (o)  .  ',
        '   .                .  ',
        '    ..   \\____/   ..   ',
        '      ............     '
      ],
      os: 'Kali GNU/Linux Rolling x86_64',
      kernel: 'Linux 6.8.11-kali1-amd64',
      uptime: '1 hour, 45 mins',
      packages: '2830 (dpkg)',
      shell: 'zsh 5.9',
      de: 'XFCE 4.18',
      wm: 'Xfwm4'
    }
  },
  {
    id: 'nixos',
    name: 'NixOS',
    tagline: 'Declarative, atomic, and mathematically reproducible computing.',
    category: 'power-user',
    family: 'Independent',
    logoColor: '#5277C3',
    accentColor: '#7EBAE4',
    description: 'An innovative operating system configured entirely via a single configuration file (`configuration.nix`). Every change is atomic: you can rollback to any previous system state instantly.',
    longOverview: 'In NixOS, you never install software the traditional way. Instead, you declare your desired system state in code. If an upgrade breaks a single application, you reboot and select the previous generation in the bootloader. Thousands of DevOps engineers use NixOS to guarantee their laptops match their servers bit-for-bit.',
    beginnerFriendlyScore: 1,
    customizabilityScore: 5,
    stabilityScore: 5,
    gamingScore: 4,
    resourceUsage: 'Low to Medium',
    releaseModel: 'Semi-Rolling',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '1 GHz 64-bit CPU',
      recCpu: 'Multi-core modern processor',
      minRam: '2 GB',
      recRam: '8 GB+ (for building Nix expressions)',
      minStorage: '30 GB (generations take space)',
      recStorage: '100 GB+ SSD',
      architecture: 'x86_64, aarch64'
    },
    desktopEnvironment: {
      default: 'Declared in config (GNOME / KDE / Hyprland / i3)',
      alternatives: ['KDE Plasma', 'Hyprland', 'Sway'],
      windowManager: 'User Configured in configuration.nix',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Nix Snowflake Blue',
      accentColors: ['#5277C3', '#7EBAE4', '#1E2530'],
      desktopVibe: 'Symmetrical lambda snowflake motif with developer-centric tooling.',
      appearanceTags: ['Declarative', 'Atomic Rollbacks', 'Flakes', 'DevOps Favorite']
    },
    packageManager: {
      name: 'Nix Package Manager',
      cliCommand: 'nix-shell -p <pkg> / nix-env -iA nixos.<pkg>',
      updateCommand: 'nixos-rebuild switch --upgrade',
      softwareStore: 'Nixpkgs (over 100,000 packages — the largest repo in existence)',
      supportsFlatpak: true,
      supportsSnap: false
    },
    pros: [
      '100% reproducible: copy your `configuration.nix` to a new computer and it recreates your exact setup',
      'Atomic upgrades: an update either succeeds completely or does not touch your running system',
      'Nixpkgs is officially the largest software repository in the entire open source world',
      'Generations feature allows instant rollback if anything misbehaves'
    ],
    cons: [
      'Steep learning curve: requires learning the Nix functional programming language',
      'Does not conform to the Linux Filesystem Hierarchy Standard (no `/bin` or `/usr/lib`)'
    ],
    bestFor: 'DevOps engineers, functional programming enthusiasts, system architects who want total reproducibility',
    officialSite: 'https://nixos.org',
    downloadSize: '2.5 GB ISO',
    terminalNeofetch: {
      asciiArt: [
        '     \\\\  \\\\ //        ',
        '      \\\\  \\\\//         ',
        '  ==   \\\\  //   ==     ',
        '        //\\\\           ',
        '       //  \\\\          ',
        '      //    \\\\         '
      ],
      os: 'NixOS 24.05 (Uakari) x86_64',
      kernel: 'Linux 6.6.48',
      uptime: '22 days, 4 hours',
      packages: '1310 (nix-system)',
      shell: 'zsh 5.9',
      de: 'GNOME 46.4',
      wm: 'Mutter (Wayland)'
    }
  },
  {
    id: 'steamos',
    name: 'SteamOS & Bazzite',
    tagline: 'The handheld gaming revolution — PC power with console simplicity.',
    category: 'gaming',
    family: 'Arch',
    logoColor: '#1A9FFF',
    accentColor: '#101822',
    description: 'Valve’s gaming operating system powering the Steam Deck. Features an immutable read-only root filesystem, GameScope micro-compositor, and seamless Proton Windows game compatibility.',
    longOverview: 'SteamOS 3 transformed PC gaming by proving that modern Windows games (Cyberpunk, Elden Ring, Baldur’s Gate 3) can run faster on Linux through Valve’s Proton translation layer. It boots directly into Steam Gamepad UI but allows switching to full KDE Plasma desktop with a single tap.',
    beginnerFriendlyScore: 5,
    customizabilityScore: 3,
    stabilityScore: 5,
    gamingScore: 5,
    resourceUsage: 'Low',
    releaseModel: 'Atomic / Immutable',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: 'Quad-core x86_64 CPU with AVX2 support',
      recCpu: 'AMD Zen 2+ or Intel 10th Gen+ with modern Vulkan GPU',
      minRam: '8 GB',
      recRam: '16 GB',
      minStorage: '64 GB',
      recStorage: '256 GB+ NVMe SSD',
      architecture: 'x86_64'
    },
    desktopEnvironment: {
      default: 'Steam Gamepad UI + KDE Plasma 6 Desktop',
      alternatives: ['GNOME (via Bazzite)'],
      windowManager: 'Gamescope (Gaming) / KWin (Desktop)',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Steam Deck OLED Cyber Neon',
      accentColors: ['#1A9FFF', '#000000', '#1B2838'],
      desktopVibe: 'Console-grade big picture interface with haptic feedback and instant suspend/resume.',
      appearanceTags: ['Console Mode', 'Proton Gaming', 'Gamescope HDR', 'Immutable Root']
    },
    packageManager: {
      name: 'Flatpak & OSTree (or Bazzite rpm-ostree)',
      cliCommand: 'flatpak install <app>',
      updateCommand: 'System Settings -> Check for Updates',
      softwareStore: 'KDE Discover (Flathub)',
      supportsFlatpak: true,
      supportsSnap: false
    },
    pros: [
      'Plays thousands of top Windows games out of the box via Proton with zero configuration',
      'Instant sleep and resume even in the middle of graphic-intensive AAA games',
      'Immutable root filesystem guarantees the OS cannot be corrupted by accidental commands',
      'Built-in performance overlay (FPS, battery draw, thermal monitoring, frame-rate limiting)'
    ],
    cons: [
      'Anti-cheat games that require Windows kernel-level ring-0 drivers (Valorant, Fortnite) do not run',
      'Root filesystem is read-only, requiring Flatpaks for desktop applications'
    ],
    bestFor: 'Gamers, living room TV PCs, Steam Deck and Legion Go owners, console-like simplicity',
    officialSite: 'https://store.steampowered.com/steamos',
    downloadSize: '2.9 GB (SteamOS) / 3.8 GB (Bazzite ISO)',
    terminalNeofetch: {
      asciiArt: [
        '      .--------.       ',
        '     /  (o)  (o)\\      ',
        '    |     __     |     ',
        '    |    (__)    |     ',
        '     \\          /      ',
        '      `--------`       '
      ],
      os: 'SteamOS Holo 3.5.19 x86_64',
      kernel: 'Linux 6.5.0-valve16-1-neptune',
      uptime: '1 day, 11 hours',
      packages: '890 (pacman), 42 (flatpak)',
      shell: 'bash 5.1.16',
      de: 'SteamOS Gamepad / KDE Plasma 5.27',
      wm: 'Gamescope'
    }
  },
  {
    id: 'zorin',
    name: 'Zorin OS',
    tagline: 'The friendliest bridge from Windows & macOS — elegance meets ultimate comfort.',
    category: 'beginner',
    family: 'Debian',
    logoColor: '#17A8E6',
    accentColor: '#1B2028',
    description: 'Specifically engineered to make switching from Windows or macOS seamless. Offers the "Zorin Appearance" app that transforms the entire desktop layout with a single click.',
    longOverview: 'Built on Ubuntu LTS, Zorin OS is tailored for students, schools, and anyone transitioning away from Windows 11. It includes built-in Windows App Support (Wine) that automatically guides users when they double-click `.exe` or `.msi` installers. The "Lite" edition brings old 10-year-old laptops back to life.',
    beginnerFriendlyScore: 5,
    customizabilityScore: 4,
    stabilityScore: 5,
    gamingScore: 4,
    resourceUsage: 'Low to Medium',
    releaseModel: 'Fixed Release (LTS)',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '1 GHz dual-core 64-bit',
      recCpu: '2 GHz quad-core or better',
      minRam: '2 GB (Zorin Lite) / 4 GB (Core)',
      recRam: '8 GB',
      minStorage: '15 GB (Lite) / 40 GB (Core)',
      recStorage: '50 GB SSD',
      architecture: 'x86_64'
    },
    desktopEnvironment: {
      default: 'Zorin Desktop (Custom GNOME & XFCE)',
      alternatives: ['Zorin Lite (XFCE)'],
      windowManager: 'Mutter',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Zorin Glass / Modern Aqua',
      accentColors: ['#17A8E6', '#0F1218', '#FFFFFF'],
      desktopVibe: 'Glassmorphic frosted panels, smooth animations, and 1-click Windows 11 / macOS / Classic layout switcher.',
      appearanceTags: ['Windows 11 Layout', 'Mac Layout', 'Zorin Connect', 'Frosted Glass']
    },
    packageManager: {
      name: 'APT, Flatpak, & Snap',
      cliCommand: 'sudo apt install <package>',
      updateCommand: 'sudo apt update && sudo apt upgrade',
      softwareStore: 'Software Store with unified Flathub, Snap, and APT search',
      supportsFlatpak: true,
      supportsSnap: true
    },
    pros: [
      'Zorin Appearance lets you switch between Windows 11, Windows Classic, and macOS layouts with one click',
      'Built-in `.exe` detector prompts Wine installation automatically when double-clicking Windows apps',
      'Zorin Connect syncs phone notifications, photos, and clipboard with your PC effortlessly',
      'Gorgeous fluid animations that feel premium and modern even on modest hardware'
    ],
    cons: [
      '"Pro" edition with additional premium desktop layouts costs a one-time fee (Core is 100% free)',
      'Based on Ubuntu LTS, so packages are updated conservatively'
    ],
    bestFor: 'Former Windows 10/11 users, older relatives, non-tech-savvy family members, stylish laptops',
    officialSite: 'https://zorin.com/os',
    downloadSize: '3.1 GB ISO',
    terminalNeofetch: {
      asciiArt: [
        '    ___________        ',
        '    \\_________ \\       ',
        '             / /       ',
        '            / /        ',
        '           / /_________',
        '          /___________/'
      ],
      os: 'Zorin OS 17.2 Core x86_64',
      kernel: 'Linux 6.8.0-45-generic',
      uptime: '8 hours, 30 mins',
      packages: '1940 (dpkg), 14 (flatpak)',
      shell: 'bash 5.2.21',
      de: 'Zorin Desktop (GNOME 43.9)',
      wm: 'Mutter (Wayland)'
    }
  },
  {
    id: 'alpine',
    name: 'Alpine Linux',
    tagline: 'Small, simple, secure — the lightweight engine of the Docker revolution.',
    category: 'minimal',
    family: 'Independent',
    logoColor: '#0D597F',
    accentColor: '#1B3B4B',
    description: 'An ultra-compact 5 MB base image built around musl libc and busybox. Powers millions of containerized cloud workloads and embedded routers worldwide.',
    longOverview: 'Alpine Linux was created with security and minimalism as first principles. By replacing glibc with musl and GNU coreutils with BusyBox, all userland binaries are compiled as Position Independent Executables (PIE) with stack smashing protection. It boots in a fraction of a second and runs comfortably in 128 MB of RAM.',
    beginnerFriendlyScore: 2,
    customizabilityScore: 4,
    stabilityScore: 5,
    gamingScore: 1,
    resourceUsage: 'Very Low',
    releaseModel: 'Fixed Release (LTS)',
    initSystem: 'OpenRC',
    systemRequirements: {
      minCpu: '100 MHz x86/ARM/RISC-V',
      recCpu: '1 GHz CPU',
      minRam: '128 MB',
      recRam: '1 GB',
      minStorage: '100 MB',
      recStorage: '5 GB',
      architecture: 'x86_64, aarch64, armhf, ppc64le, riscv64, s390x'
    },
    desktopEnvironment: {
      default: 'CLI only by default; can install XFCE or Sway',
      alternatives: ['Sway', 'XFCE', 'i3'],
      windowManager: 'User Choice',
      waylandDefault: false
    },
    themeStyle: {
      styleName: 'Alpine Minimal Slate',
      accentColors: ['#0D597F', '#1B3B4B', '#FFFFFF'],
      desktopVibe: 'Pure speed, sub-second boot times, zero bloat, military-grade compactness.',
      appearanceTags: ['Docker Standard', 'musl libc', 'OpenRC', 'Ultra Lightweight']
    },
    packageManager: {
      name: 'APK (Alpine Package Keeper)',
      cliCommand: 'apk add <package>',
      updateCommand: 'apk update && apk upgrade',
      softwareStore: 'Alpine APK Repositories',
      supportsFlatpak: true,
      supportsSnap: false
    },
    pros: [
      'Weighs only ~5 MB to 150 MB: installs in seconds and uses almost zero memory',
      'Package manager (`apk`) is universally recognized as the fastest package installer on Linux',
      'Enhanced security with proactive stack protection and PaX/grsecurity support',
      'The undisputed industry standard for Docker container microservices'
    ],
    cons: [
      'Uses `musl libc` instead of `glibc`, causing compatibility issues with proprietary commercial software and games',
      'Uses OpenRC instead of systemd, meaning standard `systemctl` commands do not apply'
    ],
    bestFor: 'Docker container images, home firewalls, Raspberry Pi appliances, minimal server microservices',
    officialSite: 'https://alpinelinux.org',
    downloadSize: '200 MB Standard ISO / 5 MB Docker Image',
    terminalNeofetch: {
      asciiArt: [
        '       /\\              ',
        '      /  \\             ',
        '     / /\\ \\            ',
        '    / /  \\ \\           ',
        '   / / /\\ \\ \\          ',
        '  /_/_/  \\_\\_\\         '
      ],
      os: 'Alpine Linux v3.20 x86_64',
      kernel: 'Linux 6.6.51-0-lts',
      uptime: '45 days, 18 hours',
      packages: '320 (apk)',
      shell: 'ash',
      de: 'None (Headless Server)',
      wm: 'None'
    }
  },
  {
    id: 'tails',
    name: 'Tails (The Amnesic Incognito Live System)',
    tagline: 'Your privacy in a USB stick — leave zero trace, route everything through Tor.',
    category: 'security',
    family: 'Debian',
    logoColor: '#56347C',
    accentColor: '#1F1B24',
    description: 'A portable operating system that protects against surveillance and censorship. Boots live from a USB drive, routes all internet traffic through the Tor network, and vanishes from RAM upon shutdown.',
    longOverview: 'Tails is trusted by investigative journalists (including Edward Snowden), human rights activists, and whistleblowers. It never writes to the host computer’s hard drive unless specifically requested via encrypted persistence. When you unplug the USB, Tails shuts down and wipes system memory with cryptographic overwrite.',
    beginnerFriendlyScore: 4,
    customizabilityScore: 2,
    stabilityScore: 5,
    gamingScore: 1,
    resourceUsage: 'Low',
    releaseModel: 'Fixed Release (LTS)',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: '64-bit IBM-compatible PC',
      recCpu: '2 GHz dual-core',
      minRam: '2 GB',
      recRam: '4 GB',
      minStorage: '8 GB USB flash drive (runs in RAM)',
      recStorage: '16 GB USB with encrypted persistence',
      architecture: 'x86_64'
    },
    desktopEnvironment: {
      default: 'Custom GNOME Shell Classic',
      alternatives: ['None (Hardened configuration)'],
      windowManager: 'Mutter',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Tails Amethyst & Onion Tor',
      accentColors: ['#56347C', '#1A1423', '#F3F4F6'],
      desktopVibe: 'Clean, secure, distraction-free with Tor Circuit status indicator and VeraCrypt quick mounts.',
      appearanceTags: ['Tor Network', 'Amnesic RAM Wipe', 'Zero Footprint', 'Encrypted USB']
    },
    packageManager: {
      name: 'APT (Tor Hidden Service Mirrors)',
      cliCommand: 'sudo apt install <package>',
      updateCommand: 'Built-in automatic live upgrade prompt',
      softwareStore: 'Synaptic / Additional Software Persistence',
      supportsFlatpak: false,
      supportsSnap: false
    },
    pros: [
      'Leaves zero trace on the host computer: RAM is wiped with pseudo-random data upon shutdown',
      'All internet connections are strictly routed through the Tor network or blocked by default',
      'Comes pre-loaded with state-of-the-art cryptography tools: KeePassXC, OnionShare, VeraCrypt',
      'Runs directly from a flash drive without touching existing Windows or macOS installations'
    ],
    cons: [
      'Browsing through the Tor network is inherently slower than direct broadband internet',
      'Not designed for daily desktop work, heavy gaming, or persistent software installations'
    ],
    bestFor: 'Whistleblowers, journalists, human rights defenders, anyone using public Wi-Fi or untrusted computers',
    officialSite: 'https://tails.net',
    downloadSize: '1.3 GB USB Image',
    terminalNeofetch: {
      asciiArt: [
        '       .----.          ',
        '      /  ..  \\         ',
        '     |  /  \\  |        ',
        '     |  \\__/  |        ',
        '      \\      /         ',
        '       `----`          '
      ],
      os: 'Tails 6.8.1 x86_64',
      kernel: 'Linux 6.1.0-26-amd64',
      uptime: '45 mins',
      packages: '1580 (dpkg)',
      shell: 'bash 5.2.15',
      de: 'GNOME 43.9',
      wm: 'Mutter (Wayland)'
    }
  },
  {
    id: 'elementary',
    name: 'Elementary OS',
    tagline: 'The thoughtful, capable, and ethical replacement for Windows and macOS.',
    category: 'beginner',
    family: 'Debian',
    logoColor: '#64BAFF',
    accentColor: '#3689E6',
    description: 'Renowned for its handcrafted Pantheon desktop, meticulous human interface guidelines (HIG), pay-what-you-can indie AppCenter, and seamless trackpad multi-touch gestures.',
    longOverview: 'Elementary OS is created by designers who believe open source shouldn’t sacrifice beauty or ergonomics. Every first-party application (Music, Mail, Files, Code, Calendar) follows strict UI guidelines. Its AppCenter pioneered ethical monetization for indie Linux software developers.',
    beginnerFriendlyScore: 5,
    customizabilityScore: 3,
    stabilityScore: 5,
    gamingScore: 3,
    resourceUsage: 'Medium',
    releaseModel: 'Fixed Release (LTS)',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: 'Intel Core i3 or comparable dual-core 64-bit',
      recCpu: 'Quad-core processor',
      minRam: '4 GB',
      recRam: '8 GB',
      minStorage: '32 GB SSD',
      recStorage: '64 GB+ SSD',
      architecture: 'x86_64'
    },
    desktopEnvironment: {
      default: 'Pantheon Desktop 7',
      alternatives: ['None (Pantheon is integrated)'],
      windowManager: 'Gala',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Pantheon Azure & Frosted Dock',
      accentColors: ['#64BAFF', '#3689E6', '#F6F6F6'],
      desktopVibe: 'Mac-inspired top panel with centered clock, bottom floating Plank dock, and unified typography.',
      appearanceTags: ['Mac Ergonomics', 'Pantheon Desktop', 'Human Interface Guidelines', 'Indie AppCenter']
    },
    packageManager: {
      name: 'Flatpak & APT',
      cliCommand: 'flatpak install <app>',
      updateCommand: 'AppCenter Updates Tab / sudo apt update',
      softwareStore: 'Elementary AppCenter (curated native Flatpaks)',
      supportsFlatpak: true,
      supportsSnap: false
    },
    pros: [
      'One of the most aesthetically pleasing and consistent desktops in the computer industry',
      'Top-tier multi-touch gestures: 3-finger swipe switches workspaces as fluidly as macOS',
      'Curated AppCenter with privacy-respecting native applications',
      'Screen Time and parental limits built right into system settings'
    ],
    cons: [
      'Strict design philosophy intentionally limits arbitrary desktop widget customization',
      'Min/Max window button behavior differs from Windows (no minimize button by default)'
    ],
    bestFor: 'Designers, students, Mac refugees, writers, anyone who appreciates meticulous visual elegance',
    officialSite: 'https://elementary.io',
    downloadSize: '2.8 GB ISO',
    terminalNeofetch: {
      asciiArt: [
        '       .-------.       ',
        '      /   ___   \\      ',
        '     |   /   \\   |     ',
        '     |   | e |   |     ',
        '      \\   ---   /      ',
        '       `-------`       '
      ],
      os: 'elementary OS 7.1 Horus x86_64',
      kernel: 'Linux 6.5.0-28-generic',
      uptime: '3 hours, 20 mins',
      packages: '1620 (dpkg), 19 (flatpak)',
      shell: 'bash 5.2.15',
      de: 'Pantheon',
      wm: 'Gala (Wayland)'
    }
  },
  {
    id: 'gentoo',
    name: 'Gentoo Linux',
    tagline: 'Source-based mastery — compile every binary specifically for your exact processor.',
    category: 'power-user',
    family: 'Independent',
    logoColor: '#D190E8',
    accentColor: '#54487A',
    description: 'A meta-distribution where almost every single program and kernel component is compiled directly from source code using the legendary Portage package manager and custom compiler flags.',
    longOverview: 'Gentoo treats the operating system as pure clay. Through Portage and `USE` flags, you decide whether an app compiles with or without specific library dependencies. A machine running Gentoo can squeeze every drop of floating-point throughput from an AMD Threadripper or Intel Core Ultra.',
    beginnerFriendlyScore: 1,
    customizabilityScore: 5,
    stabilityScore: 4,
    gamingScore: 4,
    resourceUsage: 'Very Low',
    releaseModel: 'Rolling Release',
    initSystem: 'OpenRC',
    systemRequirements: {
      minCpu: 'Any 64-bit CPU',
      recCpu: 'Fast multi-core CPU with 8+ cores (for compile speed)',
      minRam: '2 GB',
      recRam: '16 GB to 32 GB (for compiling Chromium / GCC)',
      minStorage: '20 GB',
      recStorage: '100 GB+ Fast NVMe SSD',
      architecture: 'x86_64, ARM64, RISC-V, MIPS, Alpha, SPARC'
    },
    desktopEnvironment: {
      default: 'None (Compile whatever DE or WM you prefer)',
      alternatives: ['KDE Plasma', 'GNOME', 'Hyprland', 'DWM'],
      windowManager: 'User Choice',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Gentoo Lavender & Purple Cow',
      accentColors: ['#D190E8', '#54487A', '#1C1527'],
      desktopVibe: 'Extreme hacker aesthetic, compiling matrix terminals, maximum CPU utilization.',
      appearanceTags: ['Source Compiled', 'Portage USE Flags', 'Extreme Performance', 'Mastery']
    },
    packageManager: {
      name: 'Portage (emerge)',
      cliCommand: 'emerge --ask <package>',
      updateCommand: 'emerge --sync && emerge -auDN @world',
      softwareStore: 'Portage Tree (ebuilds compiled on localhost)',
      supportsFlatpak: true,
      supportsSnap: true
    },
    pros: [
      'Ultimate hardware optimization: compiler flags (`-march=native -O2`) tune binaries to your silicon',
      'Portage `USE` flags let you strip out unneeded dependencies, reducing attack surfaces and bloat',
      'Incredible educational value: you will understand every layer of how Linux links and runs',
      'Supports OpenRC, systemd, or runit based on your personal preference'
    ],
    cons: [
      'Compiling major programs like WebKit, Firefox, or the Linux Kernel can take hours',
      'Requires substantial technical patience and deep command line proficiency'
    ],
    bestFor: 'Computer science students, compiler tinkerers, performance perfectionists, Linux veterans',
    officialSite: 'https://gentoo.org',
    downloadSize: '500 MB Minimal Install CD',
    terminalNeofetch: {
      asciiArt: [
        '       .----.          ',
        '      /   __ `\\        ',
        '     |   /  \\  |       ',
        '     |   \\__/  |       ',
        '      \\       /        ',
        '       `----`          '
      ],
      os: 'Gentoo Linux x86_64',
      kernel: 'Linux 6.10.10-gentoo',
      uptime: '18 days, 9 hours',
      packages: '1150 (emerge)',
      shell: 'zsh 5.9',
      de: 'Sway (Wayland)',
      wm: 'Sway'
    }
  },
  {
    id: 'void',
    name: 'Void Linux',
    tagline: 'Independent, stable, and blisteringly fast — powered by runit & XBPS.',
    category: 'power-user',
    family: 'Independent',
    logoColor: '#478061',
    accentColor: '#2B4D3A',
    description: 'An independent operating system created from scratch by an ex-NetBSD maintainer. Features the ultra-fast XBPS package manager and the lightweight runit init system instead of systemd.',
    longOverview: 'Void Linux is neither Debian nor Arch. It was built from the ground up to offer simplicity and speed. By replacing systemd with `runit`, service management is straightforward and transparent. Packages install instantaneously with the C-based XBPS package manager.',
    beginnerFriendlyScore: 2,
    customizabilityScore: 5,
    stabilityScore: 5,
    gamingScore: 4,
    resourceUsage: 'Very Low',
    releaseModel: 'Rolling Release',
    initSystem: 'runit',
    systemRequirements: {
      minCpu: 'Pentium 4 or ARMv6+',
      recCpu: 'Any 64-bit dual-core',
      minRam: '512 MB',
      recRam: '2 GB to 4 GB',
      minStorage: '10 GB',
      recStorage: '25 GB SSD',
      architecture: 'x86_64 (glibc / musl), ARM64'
    },
    desktopEnvironment: {
      default: 'XFCE (or CLI base)',
      alternatives: ['KDE Plasma', 'XFCE', 'i3', 'Bspwm'],
      windowManager: 'User Choice',
      waylandDefault: false
    },
    themeStyle: {
      styleName: 'Void Pine & Obsidian',
      accentColors: ['#478061', '#2B4D3A', '#131A16'],
      desktopVibe: 'Subtle forest pine accents with sub-5-second cold boot times.',
      appearanceTags: ['runit Init', 'XBPS Speed', 'glibc & musl', 'Independent']
    },
    packageManager: {
      name: 'XBPS (X Binary Package System)',
      cliCommand: 'xbps-install -S <package>',
      updateCommand: 'xbps-install -Su',
      softwareStore: 'XBPS Repositories & xbps-src compile template system',
      supportsFlatpak: true,
      supportsSnap: false
    },
    pros: [
      '`runit` init system is fast, lightweight, and easy to understand compared to monolithic systemd',
      'XBPS package manager is blisteringly fast at resolving dependencies and unpacking packages',
      'Both `glibc` and `musl` libc editions available for download',
      'Rock-solid rolling release that rarely ever breaks'
    ],
    cons: [
      'No systemd means third-party software relying strictly on systemd unit files requires writing runit run scripts',
      'Smaller repository size than the Debian or AUR ecosystem'
    ],
    bestFor: 'Minimalists, UNIX traditionalists, low-spec laptops, BSD switchers who enjoy Linux',
    officialSite: 'https://voidlinux.org',
    downloadSize: '1.2 GB Live XFCE ISO / 600 MB Base',
    terminalNeofetch: {
      asciiArt: [
        '       \\-____-/        ',
        '      /        \\       ',
        '     |   ( )    |      ',
        '     |          |      ',
        '      \\  ____  /       ',
        '       /-    -\\        '
      ],
      os: 'Void Linux x86_64',
      kernel: 'Linux 6.9.12_1',
      uptime: '11 days, 14 hours',
      packages: '650 (xbps)',
      shell: 'bash 5.2.26',
      de: 'XFCE 4.18',
      wm: 'Xfwm4'
    }
  },
  {
    id: 'endeavouros',
    name: 'EndeavourOS',
    tagline: 'A friendly terminal-centric gateway to the Arch universe.',
    category: 'power-user',
    family: 'Arch',
    logoColor: '#7F3FBF',
    accentColor: '#FF6F61',
    description: 'The successor to Antergos. Provides a clean Calamares graphical installer for vanilla Arch Linux with a warm, welcoming community and helpful beginner post-install tools.',
    longOverview: 'EndeavourOS embraces Arch Linux philosophy without making you fight a text installer. Its "Welcome" utility offers one-click NVIDIA driver installers, package cache cleaners, and software selections for GNOME, KDE, XFCE, or i3. It stays 99% pure Arch with minimal overlay.',
    beginnerFriendlyScore: 3,
    customizabilityScore: 5,
    stabilityScore: 4,
    gamingScore: 5,
    resourceUsage: 'Low',
    releaseModel: 'Rolling Release',
    initSystem: 'systemd',
    systemRequirements: {
      minCpu: 'Dual-core 64-bit CPU',
      recCpu: 'Quad-core modern CPU',
      minRam: '2 GB',
      recRam: '4 GB to 16 GB',
      minStorage: '20 GB',
      recStorage: '40 GB+ SSD',
      architecture: 'x86_64, ARM64'
    },
    desktopEnvironment: {
      default: 'Choice in installer (KDE Plasma, GNOME, XFCE, Cinnamon, i3wm)',
      alternatives: ['KDE Plasma', 'GNOME', 'XFCE', 'Sway', 'i3wm'],
      windowManager: 'User Choice',
      waylandDefault: true
    },
    themeStyle: {
      styleName: 'Endeavour Space Purple & Coral',
      accentColors: ['#7F3FBF', '#FF6F61', '#1A1528'],
      desktopVibe: 'Deep space spacecraft motif with warm purple gradients and friendly terminal banners.',
      appearanceTags: ['Arch Calamares', 'Space Purple', 'Friendly Community', 'Clean Vanilla']
    },
    packageManager: {
      name: 'Pacman & Yay (AUR)',
      cliCommand: 'sudo pacman -S <package> / yay -S <pkg>',
      updateCommand: 'yay',
      softwareStore: 'Arch User Repository (AUR) via `yay` helper',
      supportsFlatpak: true,
      supportsSnap: true
    },
    pros: [
      'Graphical Calamares installer makes installing Arch Linux take under 5 minutes',
      'The friendliest and most welcoming forum community in the entire Linux ecosystem',
      'Pre-configures `yay` AUR helper out of the box with zero fuss',
      'Near 100% vanilla Arch: no custom repo delays, pure upstream updates'
    ],
    cons: [
      'Assumes the user is willing to learn basic command line utilities over time',
      'No default graphical software center (encourages learning pacman & yay)'
    ],
    bestFor: 'Curious beginners wanting to experience Arch safely, developers, PC gamers',
    officialSite: 'https://endeavouros.com',
    downloadSize: '2.6 GB ISO',
    terminalNeofetch: {
      asciiArt: [
        '        /\\             ',
        '       /  \\            ',
        '      / /\\ \\           ',
        '     / /  \\ \\          ',
        '    / /    \\ \\         ',
        '   /_/      \\_\\        '
      ],
      os: 'EndeavourOS Linux x86_64',
      kernel: 'Linux 6.11.3-arch1-1',
      uptime: '4 days, 16 mins',
      packages: '920 (pacman)',
      shell: 'bash 5.2.26',
      de: 'KDE Plasma 6.1.5',
      wm: 'KWin (Wayland)'
    }
  }
];

export const DESKTOP_ENVIRONMENTS: DesktopEnvShowcase[] = [
  {
    id: 'gnome',
    name: 'GNOME 47',
    tagline: 'Modern, gesture-driven minimalism with an uncluttered workflow.',
    vibe: 'Ideal for laptops and multi-touch trackpads. Features fullscreen activities overview, dynamic virtual desktops, and distraction-free top bar.',
    memoryUsage: '900 MB – 1.4 GB idle',
    customizability: 'Medium (via GNOME Extensions & CSS)',
    distrosFeaturing: ['Fedora', 'Ubuntu', 'Debian', 'Pop!_OS'],
    features: ['3-Finger Fluid Trackpad Gestures', 'Adwaita Material You Style', 'Wayland Pure Architecture', 'Dynamic Workspaces'],
    panelPosition: 'top'
  },
  {
    id: 'kde-plasma',
    name: 'KDE Plasma 6',
    tagline: 'The ultimate in customization, fluid animations, and visual power.',
    vibe: 'Looks familiar like Windows out of the box, but every widget, panel, border, and blur shader can be customized down to the pixel.',
    memoryUsage: '600 MB – 950 MB idle',
    customizability: 'Extreme (Infinite widgets, themes, scripts)',
    distrosFeaturing: ['openSUSE', 'Manjaro', 'SteamOS', 'Arch Linux', 'Fedora Spin'],
    features: ['Wobbly Windows & 3D Blur Effects', 'HDR & Fractional Scaling Support', 'KDE Connect Mobile Sync', 'Infinitely Configurable Panels'],
    panelPosition: 'bottom'
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon 6',
    tagline: 'Traditional elegance with zero learning curve for Windows refugees.',
    vibe: 'Classic taskbar at the bottom, familiar Start menu, desklets, and system tray. Reliable, responsive, and comfortable.',
    memoryUsage: '700 MB – 1.1 GB idle',
    customizability: 'High (Themes, Applets, Desklets)',
    distrosFeaturing: ['Linux Mint', 'Fedora Cinnamon', 'Debian Cinnamon'],
    features: ['Instant Windows 7/10 Ergonomics', 'Corner Hot Corners', 'Built-in Desklets', 'Low GPU Overhead'],
    panelPosition: 'bottom'
  },
  {
    id: 'hyprland',
    name: 'Hyprland (Dynamic Tiling)',
    tagline: 'Next-generation Wayland tiling compositor with buttery physics.',
    vibe: 'Windows automatically tile side-by-side with smooth spring animations, gradient borders, and dual-layer blur. Keyboard-driven speed.',
    memoryUsage: '250 MB – 450 MB idle',
    customizability: 'Infinite (Text file dotfiles & Waybar)',
    distrosFeaturing: ['Arch Linux', 'NixOS', 'EndeavourOS', 'Void Linux'],
    features: ['Dual-Layer Rounded Glass Blur', 'Spring-Physics Window Snapping', 'Sub-millisecond Input Latency', 'Multi-Monitor Workspaces'],
    panelPosition: 'tiling-border'
  },
  {
    id: 'xfce',
    name: 'XFCE 4.18',
    tagline: 'The lightweight workhorse that runs fast on any computer ever made.',
    vibe: 'Unbelievably lean, rock-solid, and modular. Breathes lightning-fast new life into 15-year-old laptops or low-power servers.',
    memoryUsage: '350 MB – 550 MB idle',
    customizability: 'High (Custom panels, themes, icons)',
    distrosFeaturing: ['Xubuntu', 'Kali Linux', 'Mint XFCE', 'Manjaro XFCE', 'Void'],
    features: ['Ultra-Low Memory Footprint', 'Sub-Second Application Launching', 'Modular Panel Items', 'Rock-Solid Stability'],
    panelPosition: 'bottom'
  }
];

export const MATCHMAKER_QUESTIONS: MatchmakerQuestion[] = [
  {
    id: 1,
    question: 'What is your primary goal with Linux?',
    subtitle: 'This helps us pinpoint the right balance of software and features.',
    options: [
      {
        label: 'Everyday Computing & Work',
        description: 'Web browsing, video calls, office docs, schoolwork, and movies.',
        icon: '💻',
        weight: { category: ['beginner'] }
      },
      {
        label: 'PC Gaming (Steam, Proton, Emulation)',
        description: 'Playing modern AAA titles, indie games, and retro emulation.',
        icon: '🎮',
        weight: { category: ['gaming'] }
      },
      {
        label: 'Software Engineering & Tinkering',
        description: 'Coding, compilers, Docker, custom keyboards, and total OS control.',
        icon: '⚡',
        weight: { category: ['power-user', 'enterprise'] }
      },
      {
        label: 'Cybersecurity, Privacy & Pentesting',
        description: 'Network auditing, ethical hacking, digital anonymity, and encryption.',
        icon: '🛡️',
        weight: { category: ['security'] }
      }
    ]
  },
  {
    id: 2,
    question: 'How comfortable are you with the command line (Terminal)?',
    subtitle: 'Linux can be 100% graphical or completely keyboard-driven — choose your comfort level.',
    options: [
      {
        label: 'I want things to work graphically like Windows/Mac',
        description: 'App stores, click-to-install, zero terminal commands required.',
        icon: '🖱️',
        weight: { specificDistros: ['mint', 'ubuntu', 'zorin', 'elementary', 'pop-os'] }
      },
      {
        label: 'I know a few commands, but enjoy a nice GUI',
        description: 'Comfortable with basic terminal commands when needed, but appreciate polish.',
        icon: '⌨️',
        weight: { specificDistros: ['fedora', 'manjaro', 'opensuse', 'pop-os', 'endeavouros'] }
      },
      {
        label: 'Give me the raw power of the terminal!',
        description: 'I want to build my OS, edit dotfiles, and script everything.',
        icon: '💻',
        weight: { specificDistros: ['arch', 'nixos', 'gentoo', 'void', 'alpine'] }
      }
    ]
  },
  {
    id: 3,
    question: 'What hardware will you install Linux on?',
    subtitle: 'Different distributions optimize for different machine specifications.',
    options: [
      {
        label: 'Modern PC / Laptop (Less than 5 years old)',
        description: 'Modern Intel/AMD processor, 8GB+ RAM, SSD or NVMe drive.',
        icon: '🚀',
        weight: { specificDistros: ['fedora', 'pop-os', 'ubuntu', 'arch', 'opensuse', 'zorin'] }
      },
      {
        label: 'Older or Low-Spec Laptop (5–15 years old)',
        description: 'Limited RAM (2GB–4GB), spinning HDD, older dual-core processor.',
        icon: '⏳',
        weight: { resourceUsage: ['Very Low', 'Low'], specificDistros: ['mint', 'zorin', 'alpine', 'void', 'debian'] }
      },
      {
        label: 'Dedicated Gaming Rig with NVIDIA GPU',
        description: 'Dedicated NVIDIA GeForce graphics card requiring proprietary drivers.',
        icon: '⚡',
        weight: { specificDistros: ['pop-os', 'steamos', 'manjaro', 'fedora', 'endeavouros'] }
      }
    ]
  },
  {
    id: 4,
    question: 'How do you want software updates delivered?',
    subtitle: 'Stability vs Cutting Edge — one of the biggest philosophical choices in Linux.',
    options: [
      {
        label: 'Rock-Solid Stability (Fixed releases, updates tested for months)',
        description: 'I want my system to never change unexpectedly. Reliability is king.',
        icon: '🛡️',
        weight: { specificDistros: ['debian', 'mint', 'ubuntu', 'zorin', 'elementary'] }
      },
      {
        label: 'Bleeding Edge (Rolling releases, newest versions immediately)',
        description: 'I want Linux kernel updates, new drivers, and latest desktop features the week they release.',
        icon: '🔥',
        weight: { specificDistros: ['arch', 'opensuse', 'manjaro', 'endeavouros', 'nixos'] }
      }
    ]
  }
];

export const LINUX_101_FAQS = [
  {
    q: 'What actually is "Linux"? Isn\'t it just one operating system?',
    a: 'Technically, "Linux" is just the Kernel — the core software engine created by Linus Torvalds in 1991 that talks directly to your computer hardware (CPU, RAM, GPU, Wi-Fi). A "Distribution" (or Distro) bundles the Linux kernel together with system libraries, a package manager, sound servers, and a visual desktop environment into a complete, usable operating system.'
  },
  {
    q: 'Why are there so many different Linux distributions?',
    a: 'Because Linux is open-source, anyone is free to assemble and customize it for different philosophies: Ubuntu focuses on beginner ease; Arch focuses on minimalist DIY control; Kali focuses on cybersecurity; Alpine focuses on micro-cloud containers; and SteamOS focuses on console gaming. You choose the flavor that suits your personality and needs.'
  },
  {
    q: 'What is a "Desktop Environment" (DE)?',
    a: 'Unlike Windows or macOS where the user interface is locked to the operating system, Linux completely decouples the interface from the engine. You can change your desktop environment (like GNOME, KDE Plasma, Cinnamon, or XFCE) just like changing a theme or launcher on an Android phone, without reinstalling your OS!'
  },
  {
    q: 'Can I play my Steam games and Windows apps on Linux?',
    a: 'YES! Thanks to Valve\'s revolutionary "Proton" translation layer (built into the Steam Linux client), over 90% of top Steam Windows games run smoothly on Linux with equal or even better frame rates. For non-Steam Windows apps, compatibility layers like Wine and Bottles run `.exe` files effortlessly.'
  },
  {
    q: 'Can I test Linux without wiping or touching my existing Windows / Mac install?',
    a: 'Absolutely! Every major Linux distro offers a "Live USB" mode. You flash the ISO onto a USB drive with a free tool like Rufus or BalenaEtcher, plug it into your computer, and boot into a fully functioning Linux desktop running directly in your RAM. Your existing Windows hard drive is not touched until you explicitly click "Install".'
  }
];
