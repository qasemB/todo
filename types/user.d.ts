export type UserInfoTyp = {
    id: string,
    phone: string,
    email: string,
    firstName: string,
    lastName: string,
    role: "admin" | "user",
    gender: 0 | 1,
    createdAt: string
}