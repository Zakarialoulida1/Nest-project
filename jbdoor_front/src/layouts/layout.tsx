import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../router';


export default function Layout() {
    return <>
        <header>
            <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
                <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">

                    <div className="text-indigo-500 md:order-1">

                        <img className="w-28" src={`http://127.0.0.1:8000/storage/marocExplore.png`} alt="" />
                    </div>
                    <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                        <ul className="flex font-semibold justify-between">

                            <li className="md:px-4 md:py-2 text-[#EF4A81]">
                                <Link to={'/'}>Dashboard</Link>
                            </li>
                         


                        </ul>
                    </div>
                    <div className="order-2 md:order-3">






                        <Link className="text-white mx-2 p-2 bg-[#ffb703] hover:bg-[#ffb703]  hover:border hover:border-[#EF4A81] rounded dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500" to={LOGIN_ROUTE} >Log in </Link>




                        <Link className="text-white mx-2 p-2 bg-[#ffb703] hover:bg-[#ffb703]  hover:border hover:border-[#EF4A81] rounded dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500" to={REGISTER_ROUTE} >Register</Link>




                    </div>

                </div>

            </nav >
        </header >
        <main className={'container'}>
            <Outlet />
        </main>


    </>
}

