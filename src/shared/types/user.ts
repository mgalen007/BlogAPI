export interface IUser {
    id: string
    username: string
    email: string
    bio: string | null
    passwordHash: string
    createdAt: Date
    updatedAt: Date
}