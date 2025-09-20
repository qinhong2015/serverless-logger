const { hello } = require('./dist/handler');

async function run() {
  const res = await hello({});
  console.log('handler result:', res);
}

run().catch(err => { console.error(err); process.exit(1); });
