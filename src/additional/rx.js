import {timer, Subject} from 'rxjs'
import {map, filter, buffer, debounceTime} from 'rxjs/operators'

export const Stream = (time) => {
  return timer(0, 1000).pipe(
    map(second => second + time)
  )
}

export const click$ = new Subject()

export const doubleClick$ = click$.pipe(
  buffer(click$.pipe(debounceTime(200))),
  map(click => click.length),
  filter(click => click === 2)
)