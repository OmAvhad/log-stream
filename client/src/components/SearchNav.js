import React from 'react'
import { CiExport, CiSearch } from 'react-icons/ci'
import { TextInput, Button, Dropdown } from 'flowbite-react'

function SearchNav( { logInterval, setLogInterval }) {
    const handleLogInterval = (value) => {
        setLogInterval(value)
    }

    return (
        <div className='flex flex-row justify-center w-full gap-2 px-2'>
            <div className='flex flex-row w-full'>
                <TextInput placeholder='Search'
                    style={{ 
                        borderTopRightRadius: '0px', 
                        borderBottomRightRadius: '0px',
                    }}
                    className='w-full focus:outline-none'
                />
                <Button
                    outline
                    color="gray"
                    style={{ 
                        borderTopLeftRadius: '0px', 
                        borderBottomLeftRadius: '0px'
                    }}
                    className='border-gray-300 focus:outline-none'
                >
                    <CiSearch size={20}/>
                </Button>
            </div>
            <Dropdown label={logInterval} 
                size="sm" outline
                color="gray"
                className='border-gray-300 focus:outline-none w-60'
                style={
                    {
                        width: '120px',
                        maxHeight: '40px',
                        display: 'inline-flex', /* or inline-flex */
                        whiteSpace: 'nowrap',
                    }
                }
                >
                <Dropdown.Item onClick={() => handleLogInterval('⚡Live')}>⚡Live</Dropdown.Item>
                <Dropdown.Item onClick={() => handleLogInterval('Past 30 mins')}>Past 30 mins</Dropdown.Item>
                <Dropdown.Item onClick={() => handleLogInterval('Past 1 hr')}>Past 1 hr</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleLogInterval('Custom')}>Custom</Dropdown.Item>
            </Dropdown>
            <button className='bg-white text-black p-2 rounded-md border flex flex-row justify-center items-center gap-1'>
                <CiExport />
            </button>
        </div>
    )
}

export default SearchNav
