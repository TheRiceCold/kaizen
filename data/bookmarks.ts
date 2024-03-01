type Bookmark = {
  url: string,
  icon: string,
  label: string,
}

const bookmarks: Bookmark[] = [
  {
    icon: 'github',
    label: 'My GitHub',
    url: 'https://github.com/TheRiceCold'
  },
  {
    icon: 'nixos',
    label: 'Nix packages',
    url: 'https://search.nixos.org'
  },
  {
    icon: 'gmail',
    label: 'Gmail',
    url: 'https://gmail.com'
  },
  {
    icon: 'youtube',
    label: 'Youtube',
    url: 'https://youtube.com'
  },
  {
    icon: 'google',
    label: 'Google',
    url: 'https://google.com'
  },
  {
    icon: 'reddit',
    label: 'Reddit',
    url: 'https://reddit.com'
  },
]

export default bookmarks
