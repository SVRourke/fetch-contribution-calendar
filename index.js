const cheerio = require('cheerio');

const parseContribs = (contribs) => {
  return (contribs.map(c => {
    const attribs = contribs[c].attribs

    return ({
      date: attribs['data-date'],
      count: attribs['data-count'],
      relativeLevel: attribs['data-level']
    })
  }))
}

const fetchContributions = async (userName) => {
  const response = await fetch(`https://api.allorigins.win/raw?url=https://github.com/users/${userName}/contributions`, {method: 'GET'})
  const text = await response.text()
  const data = await cheerio.load(text)
  const rects = await data('rect.ContributionCalendar-day')
  return parseContribs(rects).slice(0, -5)
}

export { fetchContributions }
