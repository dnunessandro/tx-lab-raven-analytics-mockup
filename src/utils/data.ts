const randomTemplateData = {
  book: [
    { name: 'PinnacleSports', id: 'PinnacleSports' },
    {
      name: 'Sbobet.com',
      id: 'Sbobet.com',
    },
    {
      name: 'IBCBET',
      id: 'IBCBET',
    },
    {
      name: '188bet',
      id: '188bet',
    },
    {
      name: '10BET',
      id: '10BET',
    },
  ],
  sport: [
    { name: 'golf', id: 'golf' },
    { name: 'soccer', id: 'soccer' },
    { name: 'boxing', id: 'boxing' },
    { name: 'basketball', id: 'basketball' },
    { name: 'tennis', id: 'tennis' },
  ],
  league: [
    { name: 'League 1', id: 'League 1' },
    { name: 'League 2', id: 'League 2' },
    { name: 'League 3', id: 'League 3' },
    { name: 'League 4', id: 'League 4' },
  ],
  match: [
    { name: 'Match 1', id: 'Match 1' },
    { name: 'Match 2', id: 'Match 2' },
    { name: 'Match 3', id: 'Match 3' },
    { name: 'Match 4', id: 'Match 4' },
    { name: 'Match 5', id: 'Match 5' },
    { name: 'Match 6', id: 'Match 6' },
  ],
  ot: [
    { name: '1x2', id: '1x2' },
    { name: 'double teams to score', id: 'double teams to score' },
    { name: 'asian handicap', id: 'asian handicap' },
  ],
};

const createMockupData = (entriesPerValue) => {
  const nArray = Array.from(Array(entriesPerValue).keys());
  const data = [];

  console.log(nArray);

  randomTemplateData.book.forEach((bookmakerEntry) => {
    nArray.forEach(() => {
      const randSportIndex = Math.floor(
        Math.random() * randomTemplateData.sport.length
      );
      const randLeagueIndex = Math.floor(
        Math.random() * randomTemplateData.league.length
      );
      const randMatchIndex = Math.floor(
        Math.random() * randomTemplateData.match.length
      );
      const randOTIndex = Math.floor(
        Math.random() * randomTemplateData.ot.length
      );
      data.push({
        book: bookmakerEntry.name,
        bookmaker_id: bookmakerEntry.id,
        sport: randomTemplateData.sport[randSportIndex].name,
        sport_id: randomTemplateData.sport[randSportIndex].id,
        league: randomTemplateData.league[randLeagueIndex].name,
        league_id: randomTemplateData.league[randLeagueIndex].id,
        match: randomTemplateData.match[randMatchIndex].name,
        tipid: randomTemplateData.match[randMatchIndex].id,
        ot: randomTemplateData.ot[randOTIndex].name,
        odds_type_id: randomTemplateData.ot[randOTIndex].id,
        day: randomDate(new Date(2021, 0, 1), new Date()),
        overround: parseFloat((Math.random() + 1).toFixed(3)),
        price_update: parseFloat((Math.random() + 2).toFixed(3)),
        downtime: Math.floor(Math.random() * 30),
      });
    });
  });
  return data;
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export { createMockupData };
