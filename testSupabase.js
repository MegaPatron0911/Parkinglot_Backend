const supabase = require('./DatabaseConnection');

async function test() {
  const { data, error } = await supabase
    .from('vehiculo')
    .select('*');
  if (error) console.error(error);
  else console.log(data);
}

test();
