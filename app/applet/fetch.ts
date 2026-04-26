import https from 'https';
https.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vTelsMPrRpaGcnRljhmpnCBKkUsGAHarox5rFi9Rc8zvpBwhQif6lzsbUixfwULyiNeFk7dKIXJlhN7/pub?output=csv', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data.split('\n').slice(0, 10).join('\n'));
  });
});
