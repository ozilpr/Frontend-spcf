import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import persianCat from '../persian-cat.png'

const Welcome = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div>
      <h1 className='title'>Dashboard</h1>
      <h2 className='subtitle'>
        Selamat Datang <strong>{user && user.nama_user} </strong>
      </h2>
      <div className='text-center h-screen mb-24'>
        <div className='w-4/5 mx-auto  bg-orange-500 border border-gray-500 rounded-lg shadow'>
          <div className='text-center'>
            <img
              className='rounded inline-block max-w-sm pt-4'
              src={persianCat}
              alt='persian cat'
            />
            <div className='p-4'>
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-white'>
                Sistem Pakar Diagnosis Penyakit Kucing Persia Metode Certainty
                Factor
              </h5>
              <p className='mb-3 font-normal text-justify text-white'>
                Aplikasi ini digunakan untuk mendiagnosis penyakit pada kucing
                Persia berdasarkan gejala yang terlihat. Metode CF menghitung
                tingkat kepastian atau keyakinan terhadap hipotesis penyakit
                berdasarkan aturan dan fakta yang ada. Dengan memasukkan gejala,
                sistem menghitung Certainty Factor (CF) untuk setiap penyakit
                yang mungkin terjadi pada kucing Persia dan memberikan diagnosis
                yang paling mungkin. Hal ini membantu pemilik kucing Persia
                mengambil langkah-langkah perawatan dan pengobatan yang tepat
                untuk menjaga kesehatan kucing mereka. Meskipun sistem ini
                berguna, sebaiknya tetap berkonsultasi dengan dokter hewan untuk
                diagnosis yang akurat dan pengobatan yang tepat.
              </p>
              <Link
                to={'/diagnose'}
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-400'
              >
                Pergi ke Halaman Diagnosis
                <svg
                  className='w-3.5 h-3.5 ml-2'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M1 5h12m0 0L9 1m4 4L9 9'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
