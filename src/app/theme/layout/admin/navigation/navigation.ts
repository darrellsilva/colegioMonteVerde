export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;

  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Principal',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'informationSchool',
    title: 'Informacion',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'mensualidad',
        title: 'Mensualidad',
        type: 'item',
        url: '/mensualidad',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'administracion',
    title: 'Administracion',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'alumnos',
        title: 'Alumnos',
        type: 'item',
        url: '/alumnos',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      },
      {
        id: 'profesores',
        title: 'Profesores',
        type: 'item',
        url: '/profesores',
        classes: 'nav-item',
        icon: 'feather icon-server'
      },
      {
        id: 'cursos',
        title: 'Cursos',
        type: 'item',
        url: '/cursos',
        classes: 'nav-item',
        icon: 'feather icon-server'
      },
      {
        id: 'pagos',
        title: 'Pagos',
        type: 'item',
        url: '/pagos',
        classes: 'nav-item',
        icon: 'feather icon-server'
      },
      {
        id: 'asistencia',
        title: 'Asistencia',
        type: 'item',
        url: '/asistencia',
        classes: 'nav-item',
        icon: 'feather icon-server'
      },
      {
        id: 'notas',
        title: 'Notas',
        type: 'item',
        url: '/notas',
        classes: 'nav-item',
        icon: 'feather icon-server'
      }
    ]
  }
];
