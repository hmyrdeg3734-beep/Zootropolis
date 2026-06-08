async function run() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTelsMPrRpaGcnRljhmpnCBKkUsGAHarox5rFi9Rc8zvpBwhQif6lzsbUixfwULyiNeFk7dKIXJlhN7/pub?output=csv';
  try {
    const res = await fetch(url);
    const text = await res.text();
    const rows = text.split('\n');
    console.log(`Total rows fetched: ${rows.length}`);
    for (let i = 100; i < Math.min(rows.length, 110); i++) {
      console.log(`Row ${i}: ${rows[i]}`);
    }
  } catch (err) {
    console.error('Error fetching:', err);
  }
}
run();
