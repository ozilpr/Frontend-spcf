import React, { useEffect, useState, Fragment, useMemo } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { IoArrowUp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const FormDiagnose = () => {
  const [checked, setChecked] = useState([])
  const [evd, setEvd] = useState([])
  const [hpt, setHpt] = useState([])
  const [rule, setRule] = useState([])

  const nav = useNavigate()

  // hasil diagnosis
  const [diagnosed, setDiagnosed] = useState([])
  const [andDiagnosed, setAndDiagnosed] = useState([])

  const urlRls = 'http://localhost:5000/get-rls'
  const urlEvd = 'http://localhost:5000/get-evd'
  const urlHpt = 'http://localhost:5000/get-hpt'

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await axios.get(urlRls).then((json) => setRule(json.data))
    await axios.get(urlEvd).then((json) => setEvd(json.data))
    await axios.get(urlHpt).then((json) => setHpt(json.data))
  }

  // Add/Remove checked item from list
  const handleCheck = (e) => {
    let updatedList = [...checked]

    if (e.target.checked) {
      updatedList = [...checked, e.target.value]
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1)
    }
    setChecked(updatedList)
  }

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, evd) => {
        return total + ', ' + evd
      })
    : ''

  // refresh
  const resetCheck = () => {
    nav(0)
  }

  // Return item based on whether item is checked
  let isChecked = (evd) =>
    checked.includes(evd) ? 'checked-item' : 'not-checked-item'

  useEffect(() => {
    const filterRules = checked.map((evd) =>
      rule.filter((rls) => evd.includes(rls.tbl_gejala.nama_gejala))
    )

    const groupEvd = filterRules.filter((arr) => arr.length > 1)

    const cfAndResults = {}

    const groupedEvd = groupEvd.flat()

    groupedEvd.forEach((group) => {
      const { gejala_id } = group
      const { nama_gejala } = group.tbl_gejala

      if (!cfAndResults.hasOwnProperty(gejala_id)) {
        cfAndResults[gejala_id] = {
          nama_gejala: nama_gejala,
          gejala_id,
          penyakit: [],
          cfValues: [],
          minCf: Infinity,
        }
      }

      const { penyakit_id } = group
      const penyakitInfo = hpt.find((hpt) => hpt.penyakit_id === penyakit_id)

      const mb = parseFloat(group.mb).toFixed(2)
      const md = parseFloat(group.md).toFixed(2)
      const cf = mb - md
      cfAndResults[gejala_id].cfValues.push(cf.toFixed(2))

      cfAndResults[gejala_id].penyakit.push({
        penyakit_id: penyakit_id,
        nama_penyakit: penyakitInfo.nama_penyakit,
        sm_penyakit: penyakitInfo.sm_penyakit,
        detail_penyakit: penyakitInfo.detail_penyakit,
      })

      cfAndResults[gejala_id].minCf = (
        Math.min(...cfAndResults[gejala_id].cfValues) * 100
      ).toFixed(2)
    }, {})

    setAndDiagnosed(cfAndResults)

    const groupedRules = filterRules.flat()

    let uniqueGroupedRules = {}

    if (groupedRules.length > 0) {
      uniqueGroupedRules = groupedRules.reduce((res, rule) => {
        const { penyakit_id } = rule
        if (!res[penyakit_id]) {
          res[penyakit_id] = []
        }
        res[penyakit_id].push(rule)
        return res
      }, {})
    }

    const cfResults = {}

    Object.entries(uniqueGroupedRules).forEach(([penyakit_id, rules]) => {
      let totalMb = 0
      let totalMd = 0

      rules.forEach((rule) => {
        const { mb, md } = rule
        const mbValue = parseFloat(mb)
        const mdValue = parseFloat(md)

        const newMb =
          totalMb === 0 ? mbValue : totalMb + mbValue * (1 - totalMb)
        const newMd =
          totalMd === 0 ? mdValue : totalMd + mdValue * (1 - totalMd)

        totalMb = newMb
        totalMd = newMd
      })

      const cf = totalMb - totalMd

      cfResults[penyakit_id] = cf
    })

    for (const penyakit_id in cfResults) {
      const totalCF = cfResults[penyakit_id]
      const percent = (totalCF * 100).toFixed(2)
      cfResults[penyakit_id] = percent
    }

    // Membuat objek baru untuk menyimpan hasil yang diinginkan
    const cfResultsWithHpt = {}

    // Iterasi melalui cfResults
    Object.entries(cfResults).forEach(([hptId, cf]) => {
      // Mencari data penyakit yang sesuai berdasarkan penyakit_id
      const penyakit = hpt.find((p) => p.penyakit_id === parseInt(hptId))

      // Jika data penyakit ditemukan, menambahkan data ke objek baru
      if (penyakit) {
        cfResultsWithHpt[hptId] = {
          penyakit_id: penyakit.penyakit_id,
          nama_penyakit: penyakit.nama_penyakit,
          sm_penyakit: penyakit.sm_penyakit,
          detail_penyakit: penyakit.detail_penyakit,
          cf: cf,
        }
      }
    })

    const sortedCFResults = Object.values(cfResultsWithHpt).sort(
      (a, b) => b.cf - a.cf
    )

    setDiagnosed(sortedCFResults[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])

  // mengurutkan cf terbesar ke terkecil
  const andDiagnosedValues = useMemo(
    () => Object.values(andDiagnosed),
    [andDiagnosed]
  )

  //
  const [sortedAndDiagnosed, setSortedAndDiagnosed] = useState([])

  useEffect(() => {
    const newSort = andDiagnosedValues
      .sort((a, b) => parseFloat(b.minCf) - parseFloat(a.minCf))
      .reduce((acc, curr, index) => {
        acc[index + 1] = curr
        return acc
      }, {})
    setSortedAndDiagnosed(newSort)
  }, [andDiagnosedValues])

  // show/close dialog
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // show diagnose result
  const diagnose = () => {
    openModal()
  }

  const NothingComponent = () => {
    return (
      <div className=''>
        <h3>
          Silahkan pilih gejala atau kondisi yang ssedang dialami oleh kucing
          terlebih dahulu
        </h3>
      </div>
    )
  }

  const Component1 = () => {
    if (!diagnosed) {
      return <NothingComponent />
    }

    return (
      <div key={diagnosed.penyakit_id}>
        <div className='border border-sm border-slate-700 px-2 mb-4 rounded bg-green-400 text-black'>
          <h3>
            <p>
              Gejala yang dipilih: <strong>{checkedItems}</strong>
            </p>
            {'Berdasarkan gejala yang dipilih, kucing terkena '}
            <strong>{diagnosed.nama_penyakit}</strong>
            {' dengan nilai CF sebesar '}
            <strong>{diagnosed.cf}</strong>
            {'%'}
          </h3>
        </div>
        <div className='border border-sm border-slate-700 px-2 mb-4 rounded bg-green-400 text-black'>
          <p className='text-sm'>
            <strong>Detail penyakit: </strong> {diagnosed.detail_penyakit}
          </p>
        </div>
        <div className='border border-sm border-slate-700 px-2 mb-4 rounded bg-green-400 text-black'>
          <p className='text-sm'>
            <strong>Solusi penyakit: </strong> {diagnosed.sm_penyakit}
          </p>
        </div>
      </div>
    )
  }

  const Component2 = () => {
    if (!sortedAndDiagnosed) {
      return <NothingComponent />
    }

    return (
      <div>
        <div className='font-bold'>
          <h3>Penyakit lainnya: </h3>
        </div>
        {Object.keys(sortedAndDiagnosed).length > 0 &&
          Object.entries(sortedAndDiagnosed).map(([gejala_id, data]) => (
            <div
              key={gejala_id}
              className='border border-sm border-slate-700 px-2 mb-4 rounded bg-yellow-200 text-black'
            >
              <h3 className='mt-2'>
                Penyakit yang dipengaruhi oleh gejala{' '}
                <strong>{data.nama_gejala} </strong>:
              </h3>

              <p className='text-sm'>
                {data.penyakit.map((penyakit, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span> dan </span>}
                    <strong>{penyakit.nama_penyakit}</strong>
                  </React.Fragment>
                ))}
              </p>
              <h3 className='inline'>Nilai CF: </h3>
              <p className='text-sm mt-2 inline'>
                <strong>{data.minCf}</strong>%
              </p>
            </div>
          ))}
      </div>
    )
  }

  // nilai cf untuk dibandingkan
  const [andCf, setAndCf] = useState('0')
  const [CombCf, setCombCf] = useState('0')

  const parsedCf = parseFloat(CombCf)
  const parsedAndCf = parseFloat(andCf)

  useEffect(() => {
    if (sortedAndDiagnosed && Object.keys(sortedAndDiagnosed).length > 0) {
      setAndCf(sortedAndDiagnosed[Object.keys(sortedAndDiagnosed)[0]].minCf)
    } else if (
      sortedAndDiagnosed &&
      Object.keys(sortedAndDiagnosed).length === 0
    ) {
      setAndCf('0')
    }
  }, [sortedAndDiagnosed])

  useEffect(() => {
    if (diagnosed && Object.keys(diagnosed).length > 0) {
      setCombCf(diagnosed.cf)
    } else if (diagnosed && Object.keys(diagnosed).length === 0) {
      setCombCf('0')
    }
  }, [diagnosed])

  const renderDiagnose = () => {
    if (parsedAndCf === 0) return <Component1 />

    if (parsedCf !== 0 || parsedAndCf !== 0)
      return (
        <React.Fragment>
          <Component1 />
          <Component2 />
        </React.Fragment>
      )

    return null
  }

  const DiagnoseComponent = () => {
    const diagnosisComponent = renderDiagnose()

    return <div>{diagnosisComponent}</div>
  }

  // utk scroll ke atas
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // show/close whyButton
  let [whyOpen, setWhyOpen] = useState(false)
  function closeAnswer() {
    setWhyOpen(false)
  }

  function openAnswer() {
    setWhyOpen(true)
  }

  const whyButton = () => {
    openAnswer()
  }

  return (
    <div className='flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0 md:px-4 '>
      <div className='w-full sm:px-16 px-4 py-10 my-6 overflow-hidden bg-white rounded-lg'>
        <div className='mb-4'>
          <h1 className=' text-2xl font-bold decoration-gray-400'>
            Pilih gejala atau kondisi yang sedang dialami oleh kucing persia
          </h1>
          <div className='w-full'>
            <button
              onClick={whyButton}
              className='p-1 mr-1 text-sm font-bold border rounded-md border-white bg-gray-400 hover:bg-gray-500 text-white'
            >
              Mengapa harus memilih gejala?
            </button>
            <p className='text-red-500'>* = Gejala khusus kucing betina</p>
          </div>
          <div className='my-2'>
            <p>
              yang dipilih: <strong>{checkedItems}</strong>
            </p>
          </div>
          <div className='list-container'>
            <form action='' id='list-evd'>
              <div className='md:columns-2'>
                {evd.map((evd, index) => (
                  <div key={index + 1}>
                    <span className='inline'>{index + 1}. </span>
                    <input
                      name='evd'
                      value={evd.nama_gejala}
                      data-id={evd.gejala_id}
                      type='checkbox'
                      onChange={handleCheck}
                    />{' '}
                    <span className={isChecked(evd.nama_gejala)}>
                      {evd.nama_gejala}
                    </span>
                  </div>
                ))}
              </div>
            </form>
            <div className='flex items-center text-black justify-start mt-4 gap-x-2'>
              <button
                onClick={diagnose}
                className='px-6 py-2 mr-1 bg-green-400 text-sm font-bold border border-sky-950'
              >
                Diagnosis
              </button>
              <button
                onClick={resetCheck}
                className='px-6 py-2 text-sm font-semibold border border-sky-950'
              >
                Reset
              </button>
              <button
                onClick={goToTop}
                className='fixed p-1 bottom-16 rounded-xl md:bottom-2 right-3 text-sm bg-white font-semibold border border-sky-950'
                alt='go to top'
              >
                <IoArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Hasil Diagnosis
                  </Dialog.Title>
                  <div className='mt-2'>{DiagnoseComponent()}</div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Tutup
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Modal Penjelas */}
      <Transition appear show={whyOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto mt-6'>
            <div className='flex min-h-full items-center justify-center p-4 text-center '>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full m-16 md:w-4/5 min-w-3xl transform overflow-hidden rounded-2xl bg-white px-4 py-3 md:p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-md md:text-xl font-medium leading-6 text-black mb-2'
                  >
                    Bagaimana sistem pakar menghasilkan nilai CF dalam proses
                    inferensi?
                  </Dialog.Title>
                  <div className='h-auto'>
                    <pre className='text-sm md:text-xl'>
                      {`Dalam tahap awal untuk mendapatkan nilai CF[H,E]
Berikut ini adalah rumus perhitungannya:`}
                      <strong className='block my-3 ml-5'>
                        CF[H,E] = MB[H,E] - MD[H,E]
                      </strong>
                      {`Nilai ini akan mencerminkan tingkat kepercayaan sistem pakar terhadap
hubungan antara hipotesa H dan evidence E.

Jika terdapat lebih dari satu penyakit yang disebabkan oleh satu gejala,
Rumus di bawah ini akan digunakan untuk menghitung nilai kombinasi CF[H1 ∧ H2,E].`}
                      <strong className='block my-3 ml-5'>
                        CF[H,E] = min(MB[H1,E], MB[H2,E]) - min(MD[H1,E],
                        MD[H2,E])
                      </strong>
                      {`Dalam hal ini, nilai min(MB[H1,E], MB[H2,E]) dan min(MD[H1,E], MD[H2,E])
digunakan untuk mengambil nilai minimum dari MB dan MD yang terlibat.

Jika terdapat banyak gejala yang menyebabkan satu penyakit,
untuk mendapatkan nilai kombinasi CF[H,E1 ∧ E2],
langkah-langkah yang harus diikuti adalah sebagai berikut:
1. Hitung nilai CF[H,E1] antara H dan E1 menggunakan rumus`}
                      <strong className='block my-3 ml-5'>
                        CF[H,E1] = MB[H,E1] - MD[H,E1].
                      </strong>
                      {`2. Hitung nilai CF[H,E2] antara H dan E2 menggunakan rumus`}
                      <strong className='block my-3 ml-5'>
                        CF[H,E2] = MB[H,E2] - MD[H,E2].
                      </strong>
                      {`3. Rumus di bawah untuk menghitung nilai CF[H,E1 ∧ E2]`}
                      <strong className='block my-3 ml-5'>
                        CF[H, E1 ∧ E2] = CF[H,E1] + CF[H,E2] * (1 - CF[H,E1])
                      </strong>
                      {`Rumus ini menggambarkan kombinasi nilai CF antara H dan E1, serta antara H dan E2
dengan memperhitungkan interaksi antara keduanya.`}
                    </pre>
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeAnswer}
                    >
                      Tutup
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default FormDiagnose
