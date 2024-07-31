import React, { useEffect, useState } from 'react';
import supabase from './conector';

const App = () => {
    const [data, setData] = useState([]);


    // Fungsi handleForm untuk menangani submit form
    function handleForm(e) {
        e.preventDefault();

        const namaBarang = e.target.nama_barang.value;
        
        

        // Validasi input agar tidak kosong
        if (namaBarang === '') {
            alert(' list harus diisi !!');
            return;
        }

        // Memasukkan data ke dalam tabel 'card' di Supabase
        supabase.from('card').insert({ nama_barang: namaBarang }) // Menyesuaikan nama kolom
            .then(res => {
                console.info(res);
                if (res.error) {
                    console.error('Error inserting data:', res.error);
                } else {
                    // Mengambil data terbaru setelah insert berhasil
                    fetchData();
                }
            });


            e.target.nama_barang.value = ''
            
            
    }

    const fetchData = () => {
        supabase.from('card').select()
            .then(res => {
                console.log('Fetched data:', res.data); // Log hasil data yang diambil
                if (res.error) {
                    console.error('Error fetching data:', res.error);
                } else {
                    setData(res.data); // Memperbarui state data dengan hasil yang diambil dari Supabase
                }
            });
    }


    function handleEditBtn(id, currentName) {
        let newTeks = prompt('edit list !!', currentName)

        if ( newTeks !== null && newTeks !== '') {
            supabase.from('card').update({nama_barang: newTeks}).eq('id', id)
            .then(res => {
                console.error(res.error);
                fetchData(res)
            })
        }
    }


    function handleDelete(id) {
        
        const conf = window.confirm('yakin ingin menghapus list ??');
        if (!conf) return;

        supabase.from('card').delete().eq('id', id)
        .then(res => {
            fetchData()
        })
    }
    

    // Menggunakan useEffect untuk mengambil data saat komponen pertama kali dirender
    useEffect(() => {
        fetchData() ;
    }, []); // [] sebagai dependensi agar hanya dijalankan sekali saat komponen dimounting

    return (
        <div className={`w-screen h-full flex flex-col  justify-center`}>
            <div className={`w-screen flex flex-col items-center gap-6 mt-5`}>
                <h1 className={`text-lg font-bold text-center`}>
                    Biar Ga Lupa Pas Disuruh Emakk <br />
                    DiList Yoo
                </h1>
                <form onSubmit={handleForm} className={`items-center mt-3 flex gap-3`}>
                    <input id='nama_barang' name='nama_barang' type="text" className={`w-[100%] border rounded-md py-1 p-1`} placeholder='masukan daftar barang ' autoComplete='off' />
                    <button type='submit' className={`border px-3 py-1 rounded-md hover:scale-105 bg-slate-50 hover:bg-slate-100`}>List</button>
                </form>
            </div>
            <div className='flex flex-col w-full justify-center  items-center'>
                
                <div className={`w-full mt-5 p-5 `}>
                    <table className='border w-full text-center '>
                        <thead >
                            <tr className='border'>
                            <th className={`border p-2 text-center`} >id</th>
                            <th className={`border w-[70%]`} >Nama List</th>
                            <th className={`border w-[20%]`}>action</th>
                            </tr>
                        </thead>

                        <tbody className={`py-5 h-7`}>

                        {data.map((e, index) => (  

                            <tr key={index} className='h-3 text-center font-light text-sm ' >
                            <td className={`border text-center `} >{e.id}</td>
                            <td  className={`border w-[70%] text-center capitalize`}>{e.nama_barang}</td>
                            <td className={`w-full  flex items-center text-center p-2 justify-center gap-2`}>
                                <button onClick={ () => handleEditBtn(e.id, e.nama_barang)}  className='border px-3 text-[12px] bg-blue-400 hover:bg-blue-500 text-white rounded-md'>Edit</button>
                                <button onClick={() => handleDelete(e.id)} className='border px-3 text-[12px] bg-red-400 hover:bg-red-500 text-white rounded-md' >Delete</button>
                            </td>
                            </tr>

                          ))}
                           
                        </tbody>
                    </table>
                    <h1 className={`mt-2 text-center`}>Terima Kasih Sudah Menggunakan <br /> Aplikasi List Sederhana </h1>
                </div>
                <h1 className={`absolute bottom-0 right-2 font-bold`} >By : Adam</h1>
            </div>
        </div>
    );
}

export default App;
