import { signal } from '@preact/signals-react'

import { IUser } from '../api/types'

export const currentUser = signal<IUser | null>(null)
