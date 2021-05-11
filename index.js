const axios = require('axios');
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
  const response = await axios.get(`https://github.com/users/${userName}/contributions`)
  const data = await response.data
  const $ = await cheerio.load(data)
  const scraped = await $('rect.ContributionCalendar-day')
  return parseContribs(scraped.slice(0, -5))
}

module.exports.fetchContributions = fetchContributions;