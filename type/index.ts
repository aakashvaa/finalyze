import { navbars } from '@/utils/constant'

export type FullNavbarType = (typeof navbars)[number]

export type NavbarType = Exclude<FullNavbarType, 'details'>
