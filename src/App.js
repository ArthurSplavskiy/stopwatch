import {useState, useEffect} from 'react'
import {Stream, doubleClick$, click$} from './additional/rx'
import {TimeFormat} from './additional/TimeFormat'

function App() {
  const [run, setRun] = useState(false)
  const [sec, setSec] = useState(0)
  const [wait, setWait] = useState(false)
  const [time, setTime] = useState(TimeFormat(0))

  useEffect(() => {
    setTime(TimeFormat(sec))
  }, [sec])

  useEffect(() => {
    if(run){
      const sub = Stream(sec).subscribe(setSec)
      return () => sub.unsubscribe()
    } else {
      if(!wait) {
        setSec(0)
      }
    }
  }, [run, wait, sec])

  useEffect(() => {
    doubleClick$.subscribe(() => {
      setWait(true)
      setRun(false)
    })
  }, [])
    
  const startStop = () => {
    if(wait){
      setWait(false)
      setRun(true)
    } else {
      setRun(prev => !prev)
    }
  }

  const reset = () => {
    new Promise(resolve => {
      setRun(false)
      setSec(0)
      resolve()
    }).then(() => {
      setRun(true)
    })
  }
  
  return (
    <div className='wrapper'>

      <div className='display'>
        {time.H}:{time.M}:{time.S}
      </div>

      <div className='controls'>

        <button
          className='button'
          onClick={startStop}>
            {run ? 'Stop' : 'Start'}
        </button>

        <button
          className='button'
          onClick={() => click$.next()}
          disabled={!run}>
            Wait
        </button>

        <button
          className='button'
          onClick={reset}
          disabled={!run}>
            Reset
        </button>

      </div>

    </div>
  )
}

export default App
