import React from 'react'

const SelectBox = ({options, selectedValues, onChange }) => {
  return (
    <>
        <select className='border-2 rounded-lg border-black ' value={selectedValues} onChange={onChange}>
            <option className='text-gray-600' value="" disabled>
            Valyutani tanlang
            </option>
            {
                options.map((option) => {
                    return(
              <option className='border-solid border-9 border-green-600 text-black ' key={option} value={option}>{option}
                        </option>
                    )
                })
            }
        </select>
    </>
  )
}

export default SelectBox