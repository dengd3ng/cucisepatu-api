const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 


app.get('/', (req, res) => {
  res.send('API Layanan Cuci Sepatu by Denzel');
});

app.post('/items', async (req, res) => {
  const { nama_pelanggan, nama_sepatu } = req.body;

  if (!nama_pelanggan || !nama_sepatu) {
    return res.status(400).json({ error: 'Nama pelanggan dan nama sepatu wajib diisi' });
  }

  const { data, error } = await supabase
    .from('sepatu')
    .insert([
      { nama_pelanggan, nama_sepatu, status: 'Masuk' } 
    ])
    .select(); 

  if (error) {
    console.error('Error creating item:', error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});


app.get('/items', async (req, res) => {
  const { status } = req.query; 

  let query = supabase.from('sepatu').select('*').order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching items:', error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  
  const { data, error } = await supabase
    .from('sepatu')
    .select('*')
    .eq('id', id)
    .single(); 

  if (error) {
    console.error('Error fetching item:', error);
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Item tidak ditemukan' });
  }

  res.status(200).json(data);
});

app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_pelanggan, nama_sepatu, status } = req.body; 


  if (!status && !nama_pelanggan && !nama_sepatu) {
     return res.status(400).json({ error: 'Tidak ada data untuk diupdate' });
  }

  let updateData = {};
  if (nama_pelanggan) updateData.nama_pelanggan = nama_pelanggan;
  if (nama_sepatu) updateData.nama_sepatu = nama_sepatu;
  if (status) updateData.status = status;

  const { data, error } = await supabase
    .from('sepatu')
    .update(updateData)
    .eq('id', id)
    .select(); 

  if (error) {
    console.error('Error updating item:', error);
    return res.status(500).json({ error: error.message });
  }
  
  if (!data || data.length === 0) {
     return res.status(404).json({ error: 'Item tidak ditemukan' });
  }

  res.status(200).json(data[0]);
});

app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('sepatu')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting item:', error);
    return res.status(500).json({ error: error.message });
  }

  res.status(204).send(); 
});


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});


module.exports = app;


