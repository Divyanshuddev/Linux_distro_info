export type DistroCategory = 
  | 'beginner'
  | 'gaming'
  | 'security'
  | 'power-user'
  | 'enterprise'
  | 'minimal';

export type DistroFamily = 
  | 'Debian'
  | 'Arch'
  | 'Red Hat'
  | 'Independent'
  | 'Slackware';

export interface SystemRequirements {
  minCpu: string;
  recCpu: string;
  minRam: string;
  recRam: string;
  minStorage: string;
  recStorage: string;
  architecture: string;
}

export interface DesktopEnvironmentInfo {
  default: string;
  alternatives: string[];
  windowManager: string;
  waylandDefault: boolean;
}

export interface ThemeStyle {
  styleName: string;
  accentColors: string[];
  desktopVibe: string;
  appearanceTags: string[];
}

export interface PackageManagerInfo {
  name: string;
  cliCommand: string;
  updateCommand: string;
  softwareStore: string;
  supportsFlatpak: boolean;
  supportsSnap: boolean;
}

export interface LinuxDistro {
  id: string;
  name: string;
  tagline: string;
  category: DistroCategory;
  family: DistroFamily;
  logoColor: string;
  accentColor: string;
  description: string;
  longOverview: string;
  beginnerFriendlyScore: number; // 1 to 5
  customizabilityScore: number; // 1 to 5
  stabilityScore: number; // 1 to 5
  gamingScore: number; // 1 to 5
  resourceUsage: 'Very Low' | 'Low' | 'Low to Medium' | 'Medium' | 'High';
  releaseModel: 'Rolling Release' | 'Fixed Release (LTS)' | 'Semi-Rolling' | 'Atomic / Immutable';
  initSystem: 'systemd' | 'OpenRC' | 'runit' | 's6';
  systemRequirements: SystemRequirements;
  desktopEnvironment: DesktopEnvironmentInfo;
  themeStyle: ThemeStyle;
  packageManager: PackageManagerInfo;
  pros: string[];
  cons: string[];
  bestFor: string;
  officialSite: string;
  downloadSize: string;
  terminalNeofetch: {
    asciiArt: string[];
    os: string;
    kernel: string;
    uptime: string;
    packages: string;
    shell: string;
    de: string;
    wm: string;
  };
}

export interface DesktopEnvShowcase {
  id: string;
  name: string;
  tagline: string;
  vibe: string;
  memoryUsage: string;
  customizability: string;
  distrosFeaturing: string[];
  features: string[];
  panelPosition: 'bottom' | 'top' | 'dock-left' | 'floating' | 'tiling-border';
}

export interface MatchmakerQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    icon: string;
    weight: {
      category?: DistroCategory[];
      preferredFamilies?: DistroFamily[];
      resourceUsage?: ('Very Low' | 'Low' | 'Low to Medium' | 'Medium')[];
      specificDistros?: string[];
    };
  }[];
}
