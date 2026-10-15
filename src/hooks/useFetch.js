import { useEffect } from "react"
import { useState } from "react"

const useFetch = ({ url, selector }) => {
  const [data, setDate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)



  useEffect(() => {
    setLoading(true)
    const controller = new AbortController()
    const signal = controller.signal

    const getFetch = async () => {
      try {
        const response = await fetch(url, signal);
        if (!response.ok) {
          throw new Error("Algo fallo - error " + response.status)
        }
        const json = await response.json();
        setDate(selector(json))
        setError(false)
        console.log(selector(json));

      } catch (err) {
        console.error("Algo salio mal - info:" + err);
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getFetch()
    return () => {
      controller.abort()
    }

  }, [])


  return { data, loading, error }
}

export default useFetch