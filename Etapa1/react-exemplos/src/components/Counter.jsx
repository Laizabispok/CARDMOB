import { useState } from 'react'
import '../App.css'

function Counter({ title, initial = 0 }) { // Recebe props corretamente
  const [count, setCount] = useState(Number(initial)) // Atribui o valor inicial ao contador

  return (
    <>
      <h1>{title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default Counter
