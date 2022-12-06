import React from 'react';
import { RiVideoAddFill } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi';
import { CgMoreAlt } from 'react-icons/cg';
import { Contacts } from './Contacts';

export const RightSideBar = () => {
  return (
    <div className='hidden md:inline-flex flex-col pt-4 max-w-xl md:min-w-[200px] lg:min-w-[250px]'>
      <div className='flex items-center text-gray-500'>
        <p className='flex text-lg font-semibold flex-grow'>Contacts</p>
        <div className='flex space-x-1 px-2'>
          <div className='rounded-full p-2 hover:bg-gray-200 cursor-pointer'>
            <RiVideoAddFill />
          </div>
          <div className='rounded-full p-2 hover:bg-gray-200 cursor-pointer'>
            <BiSearch />
          </div>
          <div className='rounded-full p-2 hover:bg-gray-200 cursor-pointer'>
            <CgMoreAlt />
          </div>
        </div>
      </div>
      <Contacts
        src='https://images.pexels.com/photos/14421162/pexels-photo-14421162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        name='Malachi Vargas'
        status='Online'
      />
      <Contacts
        src='https://images.pexels.com/photos/14435840/pexels-photo-14435840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        name='John Lamia'
        status='Online'
      />
      <Contacts
        src='https://images.pexels.com/photos/14464893/pexels-photo-14464893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        name='Michaela Biggers'
        status='Offline'
      />
      <Contacts
        src='https://images.pexels.com/photos/14398103/pexels-photo-14398103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        name='Jane Austeer'
        status='Online'
      />
    </div>
  );
};
