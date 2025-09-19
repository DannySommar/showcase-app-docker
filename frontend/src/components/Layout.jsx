import Header from './Header'

export default function Layout({children}) {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <footer>
        <p>Skibidi</p>
      </footer>
    </div>
  )
}