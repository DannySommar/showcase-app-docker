

export default function LoginPage() {
  return (
    <div className="login-page">
      <h1>Login page</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}