import React from 'react'
import { CiExport, CiSearch } from 'react-icons/ci'
import { TextInput, Button, Dropdown } from 'flowbite-react'
import { Link } from 'react-router-dom';

function SearchNav( { logInterval, setLogInterval, columnOptions, setColumnOptions } ){
    const handleLogInterval = (value) => {
        setLogInterval(value)
    }

    const handleSearch = (id, value) => {
        setColumnOptions({
            ...columnOptions,
            [id]: value
        })
    };

    return (
        <div className='flex flex-col justify-center w-full gap-2 px-2'>
            <div className='flex flex-row justify-center w-full gap-2'>
                <div className='flex flex-row w-full'>
                    <TextInput placeholder='Search'
                        style={{ 
                            borderTopRightRadius: '0px', 
                            borderBottomRightRadius: '0px',
                            outline: 'none',
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
                            width: '130px',
                            maxHeight: '40px',
                            display: 'inline-flex', /* or inline-flex */
                            whiteSpace: 'nowrap',
                            outline: 'none',
                        }
                    }
                    >
                    <Dropdown.Item onClick={() => handleLogInterval('Past 30 mins')}>Past 30 mins</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLogInterval('Past 1 hr')}>Past 1 hr</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLogInterval('⚡Live')}>⚡Live</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLogInterval('All')}>All</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleLogInterval('Custom')}>Custom</Dropdown.Item>
                </Dropdown>
                <Link to="/analytics">
                    <button className='bg-white text-black p-2 rounded-md border flex flex-row justify-center items-center gap-1'>
                        Analytics
                    </button>
                </Link>
                <button className='bg-white text-black p-2 rounded-md border flex flex-row justify-center items-center gap-1'>
                    <CiExport />
                </button>
            </div>
            <div className='flex gap-2'>
                <TextInput placeholder='Level' id='level' value={columnOptions.id} onChange={(e) => handleSearch(e.target.id, e.target.value)}/>
                <TextInput placeholder='Message' id='message' value={columnOptions.message} onChange={(e) => handleSearch(e.target.id, e.target.value)}/>
                <TextInput placeholder='Commit' id='commit' value={columnOptions.commit} onChange={(e) => handleSearch(e.target.id, e.target.value)}/>
                <TextInput placeholder='Resource ID' id='resource_id' value={columnOptions.resource_id} onChange={(e) => handleSearch(e.target.id, e.target.value)}/>
                <TextInput placeholder='Trace ID' id='trace_id' value={columnOptions.trace_id} onChange={(e) => handleSearch(e.target.id, e.target.value)}/>
                <TextInput placeholder='Span ID' id='span_id' value={columnOptions.span_id} onChange={(e) => handleSearch(e.target.id, e.target.value)}/>
                <TextInput placeholder='Meta Data' id='meta_data' value={columnOptions.meta_data} onChange={(e) => handleSearch(e.target.id, e.target.value)}/>
            </div>
        </div>
    )
}

export default SearchNav
