async function Login(email: string, mdp: string) {
  console.log(email, mdp)
}

export const AuthService = {
  login: (email: string, mdp: string) => Login(email, mdp),
}
