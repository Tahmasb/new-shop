import { useState } from "react"

export default function useCounter(init, max = 10) {
  const [count, setCount] = useState(init)
  const addCount = () => {
    setCount((prevCount) => prevCount + 1)
    if (count >= max) setCount(max)
  }
  const minusCount = () => {
    setCount((prevCount) => prevCount - 1)
  }
  return [count, addCount, minusCount]
}
