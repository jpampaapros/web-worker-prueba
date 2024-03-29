import { useEffect, useRef, useCallback } from 'react'

const WorkerComponent = () => {
    const workerRef = useRef()
    useEffect(() => {
        workerRef.current = new Worker(new URL('../worker.js', import.meta.url))
        workerRef.current.onmessage = (evt) =>
            alert(`WebWorker Response => ${evt.data}`)
        return () => {
            workerRef.current.terminate()
        }
    }, [])

    const handleWork = useCallback(async () => {
        workerRef.current.postMessage(100000)
    }, [])

    return (
        <div>
            <p>Do work in a WebWorker!</p>
            <button onClick={handleWork}>Calculate PI</button>
        </div>
    )
}

export default WorkerComponent;