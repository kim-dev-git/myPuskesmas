import moment from 'moment'
moment.locale('id')

export function toInputDate(value) {
  const options = 'yyyy-MM-DD'
  if(value.seconds) {
    return String(moment(value.seconds * 1000).format(options))
  } else {
    return String(moment(value).format(options))
  }
}

export function toCountdown(value) {
  let start = moment ()
  let end
  
  if(value.seconds) {
    end = moment(value.seconds * 1000)
  } else {
    end = moment(value)
  }

  const countdown = {
    days:  end.diff(start, 'days'),
    hours: end.diff(start, 'hours'),
    minutes: end.diff(start, 'minutes') % 60,
    seconds: end.diff(start, 'seconds') % 60,
  }

  return countdown

}

export function toObjectDate(value) {
  let date
  if(value.seconds) {
    date = moment(value.seconds * 1000)
  } else {
    date = moment(value)
  }

  return {
    day: date.format('DD'),
    month: date.format('MMMM'),
    year: date.format('yyyy'),
  }
}

export function toDate(value) {
  const options = 'DD/MM/yyyy'
  if (!value) return null
  if (value.seconds) {
    return String(moment(value.seconds * 1000).format(options))
  } else {
    return String(moment(value).format(options))
  }
}

export function toUSDate(value) {
  const options = 'MMMM DD, yyyy'
  if(value.seconds) {
    return String(moment(value.seconds * 1000).format(options))
  } else {
    return String(moment(value).format(options))
  }
}

export function fromNow(value) {
  if(value.seconds) {
    return String(moment(value.seconds * 1000).fromNow())
  } else {
    return String(moment(value).fromNow())
  }
}
