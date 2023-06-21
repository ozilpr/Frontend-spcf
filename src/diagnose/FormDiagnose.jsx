import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'

const FormDiagnose = () => {
  const [checked, setChecked] = useState([])
  const [evd, setEvd] = useState([])
  const [hpt, setHpt] = useState([])
  const [rule, setRule] = useState([])
  // const [evdIdChecked, setEvdIdChecked] = useState([])

  // hasil diagnosis
  const [diagnosed, setDiagnosed] = useState([])

  // hasil perhitungan cf

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
    // e.preventDefault()
    let updatedList = [...checked]
    // let updatedEvd = [...evdIdChecked]

    // const idEvd = e.target.getAttribute('data-id')

    if (e.target.checked) {
      updatedList = [...checked, e.target.value]
      // updatedEvd = [...evdIdChecked, e.target.getAttribute('data-id')]
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1)
      // updatedEvd.splice(
      //   evdIdChecked.indexOf(e.target.getAttribute('data-id')),
      //   1
      // )
    }
    setChecked(updatedList)
    // setEvdIdChecked(updatedEvd)
    // console.log(updatedEvd)
  }

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, evd) => {
        return total + ', ' + evd
      })
    : ''

  const resetCheck = () => {
    setChecked([])
  }

  // Return classes based on whether item is checked
  let isChecked = (evd) =>
    checked.includes(evd) ? 'checked-item' : 'not-checked-item'

  // find
  useEffect(() => {
    const filterRules = checked.map((evd) =>
      rule.filter((rls) => evd.includes(rls.tbl_gejala.nama_gejala))
    )

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

    // console.log(uniqueGroupedRules)
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
      // console.log(cfResults)
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
      // console.log(hptId)

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
    // console.log(sortedCFResults)
    setDiagnosed(sortedCFResults)
  }, [checked, hpt, rule])

  // show/close dialog
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // menampilkan hasil diagnosis
  const diagnose = () => {
    // console.log(diagnosed)
    openModal()
  }

  return (
    <div className='flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0'>
      <div className='w-full sm:px-16 px-4 py-10 my-6 overflow-hidden bg-white rounded-lg lg:max-w-4xl'>
        <div className='mb-4'>
          <h1 className=' text-2xl font-bold decoration-gray-400'>
            Pilih gejala-gejala yang sedang dialami oleh kucing persia
          </h1>
          <div className='my-2'>
            <p>Gejala yang dipilih: {checkedItems}</p>
          </div>
          <div className='list-container'>
            {/* <form name='evdForm' onSubmit={diagnose}> */}
            {evd.map((evd, index) => (
              <div key={index + 1}>
                <input
                  name='evd'
                  value={evd.nama_gejala}
                  data-id={evd.gejala_id}
                  // data-kode={evd.kode_gejala}
                  type='checkbox'
                  onChange={handleCheck}
                />
                <span className={isChecked(evd.nama_gejala)}>
                  {evd.nama_gejala}
                </span>
              </div>
            ))}
            <div className='flex items-center justify-start mt-4 gap-x-2'>
              <button
                //   type='submit'
                onClick={diagnose}
                className='px-6 py-2 mr-1 text-sm font-semibold border border-sky-950'
              >
                Diagnosis
              </button>
            </div>
            {/* </form> */}
            <div className='flex items-center justify-start mt-4 gap-x-2'>
              <button
                onClick={resetCheck}
                className='px-6 py-2 ml-1 text-sm font-semibold border border-sky-950'
              >
                Batal
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
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Hasil Diagnosa
                  </Dialog.Title>
                  <div className='mt-2'>
                    {diagnosed.map((d, index) => {
                      if (index === 0) {
                        return (
                          <div key={d.penyakit_id}>
                            <h3>
                              {'Kemungkinan terkena ' +
                                d.nama_penyakit +
                                ' dengan nilai CF sebesar ' +
                                d.cf +
                                '%'}
                            </h3>
                            <p className='text-sm text-gray-500'>
                              {'Detail penyakit: ' + d.detail_penyakit}
                            </p>
                            <p className='text-sm text-gray-500'>
                              {'Solusi penyakit: ' + d.sm_penyakit}
                            </p>
                          </div>
                        )
                      }
                      return null
                    })}

                    <h3 className='mt-2'>Penyakit lainnya:</h3>
                    {diagnosed.map((d, index) => {
                      if (index > 0) {
                        return (
                          <div key={d.penyakit_id}>
                            <p> Nama Penyakit: {d.nama_penyakit}</p>
                            <p> Nilai CF: {d.cf}</p>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>

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
    </div>
  )
}

export default FormDiagnose
